/**
 * Visual baseline screenshotter — fallback for Lost Pixel in environments
 * where its bundled --headless=old fails (modern Chromium dropped that flag).
 *
 * Uses our installed Playwright (1.56+) directly. Generates pixel-stable PNGs
 * to qa/lost-pixel-baseline/. Compare diffs with `pixelmatch` later.
 *
 * Run: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node scripts/screenshot-baseline.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8765';
const OUT_DIR = path.join(__dirname, '..', 'lost-pixel-baseline');

const PAGES = [
  { path: '/demos/v3-converged/index.html',                  name: 'index' },
  { path: '/demos/v3-converged/catalog.html',                name: 'catalog' },
  { path: '/demos/v3-converged/artifact.html?id=he_zun',     name: 'artifact-he-zun' },
  { path: '/demos/v3-converged/artifact.html?id=houmuwu_ding', name: 'artifact-houmuwu' },
  { path: '/demos/v3-converged/dashboard.html',              name: 'dashboard' },
  { path: '/demos/v3-converged/me.html',                     name: 'me' },
  { path: '/demos/v3-converged/time-pillar.html',            name: 'time-pillar' },
  { path: '/demos/v3-converged/geo-system.html',             name: 'geo-system' },
  { path: '/demos/v3-converged/pattern-tree.html',           name: 'pattern-tree' },
  { path: '/demos/v3-converged/inscription-reader.html',     name: 'inscription-reader' },
  { path: '/demos/v3-converged/caster-profile.html',         name: 'caster-profile' },
  { path: '/demos/v3-converged/purpose-scene.html',          name: 'purpose-scene' },
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  const log = [];
  for (const p of PAGES) {
    const page = await ctx.newPage();
    const url = BASE_URL + p.path;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15_000 });
      await page.waitForTimeout(1800);
      const file = path.join(OUT_DIR, p.name + '.png');
      await page.screenshot({ path: file, fullPage: true });
      const stat = fs.statSync(file);
      log.push({ name: p.name, url: p.path, ok: true, bytes: stat.size });
      console.log('  shot', p.name, '->', stat.size, 'bytes');
    } catch (e) {
      log.push({ name: p.name, url: p.path, ok: false, error: String(e).slice(0, 200) });
      console.log('  FAIL', p.name, ':', String(e).slice(0, 120));
    } finally {
      await page.close();
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, 'baseline-log.json'), JSON.stringify(log, null, 2));
  console.log('--- summary:', log.filter(l => l.ok).length, '/', log.length, 'pages captured');
  await browser.close();
})();
