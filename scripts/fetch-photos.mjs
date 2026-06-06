#!/usr/bin/env node
/**
 * fetch-photos.mjs — Download Chinese bronze 国宝 photos from Wikimedia Commons.
 *
 * USAGE:
 *   node scripts/fetch-photos.mjs
 *   node scripts/fetch-photos.mjs --dry-run       # print URLs without downloading
 *   node scripts/fetch-photos.mjs --id houmuwu_ding  # single artifact
 *   node scripts/fetch-photos.mjs --width 800     # thumbnail width (default 1200)
 *
 * REQUIRES:
 *   Node 18+ (built-in fetch). Zero npm dependencies.
 *   Internet access to upload.wikimedia.org (works on Vercel CI, local machines).
 *   Does NOT work in the MuseumCollect sandbox (upload.wikimedia.org is blocked there).
 *
 * OUTPUT:
 *   assets/photos/<artifact_id>.jpg   (real JPEG, 5 KB – 3 MB each)
 *
 * LICENSE NOTE:
 *   All images sourced under CC0, CC BY 2.0, or CC BY-SA (3.0 / 4.0).
 *   Attribution strings are embedded in data/photo-manifest.json.
 *   CC BY / CC BY-SA files MUST be credited in any public-facing UI.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import * as crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MANIFEST_PATH = join(ROOT, 'data', 'photo-manifest.json');
const PHOTOS_DIR = join(ROOT, 'assets', 'photos');

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const WIDTH = (() => {
  const i = args.indexOf('--width');
  return i !== -1 && args[i + 1] ? parseInt(args[i + 1], 10) : 1200;
})();
const ONLY_ID = (() => {
  const i = args.indexOf('--id');
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
})();

// ── Wikimedia thumb URL builder ────────────────────────────────────────────────
function wikimediaThumbUrl(filename, width = 1200) {
  const name = filename.replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(name).digest('hex');
  const a = hash[0];
  const ab = hash.slice(0, 2);
  const ext = name.split('.').pop().toLowerCase();
  let thumbName = `${width}px-${name}`;
  if (ext === 'svg') thumbName += '.png';
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${encodeURIComponent(name)}/${encodeURIComponent(thumbName)}`;
}

// ── Download helper ────────────────────────────────────────────────────────────
async function downloadFile(url, destPath, artifactId) {
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'MuseumCollect-Bot/1.0 (https://github.com/museumcollect; photo fetch for educational project)' },
    redirect: 'follow',
  });
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} for ${url}`);
  }
  const contentType = resp.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Unexpected content-type "${contentType}" for ${url}`);
  }
  const buf = Buffer.from(await resp.arrayBuffer());
  if (buf.length < 5000) {
    throw new Error(`Suspiciously small response (${buf.length} bytes) — may be an error page`);
  }
  writeFileSync(destPath, buf);
  return { bytes: buf.length, contentType };
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const artifacts = manifest.artifacts;

  if (!existsSync(PHOTOS_DIR)) {
    mkdirSync(PHOTOS_DIR, { recursive: true });
  }

  let targets = artifacts.filter(a => a.wikimedia_filename !== null);
  if (ONLY_ID) {
    targets = targets.filter(a => a.artifact_id === ONLY_ID);
    if (targets.length === 0) {
      console.error(`No artifact found with id "${ONLY_ID}" (or it has no wikimedia_filename).`);
      process.exit(1);
    }
  }

  const results = { ok: [], failed: [], skipped: [] };

  for (const artifact of targets) {
    const { artifact_id, wikimedia_filename, fallback_filename, license, attribution, local_target } = artifact;
    const destPath = join(ROOT, local_target);

    // Skip if already downloaded and >5 KB (not a placeholder)
    if (existsSync(destPath)) {
      const size = readFileSync(destPath).length;
      if (size > 5000) {
        console.log(`  SKIP  ${artifact_id} (already downloaded, ${size} bytes)`);
        results.skipped.push({ artifact_id, bytes: size });
        continue;
      }
    }

    const filenames = [wikimedia_filename];
    if (fallback_filename) filenames.push(fallback_filename);

    let success = false;
    for (const fn of filenames) {
      const url = wikimediaThumbUrl(fn, WIDTH);
      console.log(`  TRY   ${artifact_id} → ${url}`);

      if (DRY_RUN) {
        console.log(`         [DRY-RUN] would write → ${destPath}`);
        results.ok.push({ artifact_id, url, bytes: 0, license, attribution });
        success = true;
        break;
      }

      try {
        const { bytes, contentType } = await downloadFile(url, destPath, artifact_id);
        console.log(`  OK    ${artifact_id} (${bytes} bytes, ${contentType})`);
        results.ok.push({ artifact_id, url, bytes, license, attribution });
        success = true;
        break;
      } catch (err) {
        console.warn(`  FAIL  ${artifact_id} [${fn}]: ${err.message}`);
      }
    }

    if (!success) {
      console.error(`  ERROR ${artifact_id}: all filenames failed`);
      results.failed.push({ artifact_id, wikimedia_filename, fallback_filename });
    }

    // Polite delay between requests
    await new Promise(r => setTimeout(r, 300));
  }

  // ── Report ───────────────────────────────────────────────────────────────────
  console.log('\n========== fetch-photos summary ==========');
  console.log(`  Downloaded : ${results.ok.length}`);
  console.log(`  Skipped    : ${results.skipped.length}`);
  console.log(`  Failed     : ${results.failed.length}`);

  if (results.ok.length > 0) {
    console.log('\n  Downloaded:');
    for (const r of results.ok) {
      const kb = r.bytes ? `${(r.bytes / 1024).toFixed(1)} KB` : 'dry-run';
      console.log(`    ${r.artifact_id.padEnd(30)} ${kb}  (${r.license})`);
    }
  }

  if (results.failed.length > 0) {
    console.log('\n  Failed (manual intervention needed):');
    for (const r of results.failed) {
      console.log(`    ${r.artifact_id}`);
      console.log(`      primary  : ${r.wikimedia_filename}`);
      if (r.fallback_filename) console.log(`      fallback : ${r.fallback_filename}`);
      const cat = artifacts.find(a => a.artifact_id === r.artifact_id)?.commons_category;
      if (cat) console.log(`      browse   : ${cat}`);
    }
    console.log('\n  To fix: visit the Commons category URL above, find the correct filename,');
    console.log('  update data/photo-manifest.json, then re-run this script.');
  }

  if (results.failed.length > 0 && !DRY_RUN) process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
