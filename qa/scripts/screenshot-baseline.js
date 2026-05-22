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

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';
const OUT_DIR = path.join(__dirname, '..', 'lost-pixel-baseline');
const DESKTOP_DIR = path.join(OUT_DIR, 'desktop');
const MOBILE_DIR = path.join(OUT_DIR, 'mobile');

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

async function shoot(ctx, p, outDir) {
  const page = await ctx.newPage();
  const url = BASE_URL + p.path;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15_000 });
    await page.waitForTimeout(2000);
    const file = path.join(outDir, p.name + '.png');
    await page.screenshot({ path: file, fullPage: true });
    const stat = fs.statSync(file);
    return { name: p.name, url: p.path, ok: true, bytes: stat.size };
  } catch (e) {
    return { name: p.name, url: p.path, ok: false, error: String(e).slice(0, 200) };
  } finally {
    await page.close();
  }
}

(async () => {
  fs.mkdirSync(DESKTOP_DIR, { recursive: true });
  fs.mkdirSync(MOBILE_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // Desktop pass
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopLog = [];
  for (const p of PAGES) {
    const r = await shoot(desktopCtx, p, DESKTOP_DIR);
    desktopLog.push(r);
    console.log('  [desktop]', p.name, '->', r.ok ? r.bytes + 'b' : 'FAIL');
  }
  await desktopCtx.close();

  // Mobile pass — iPhone SE class
  const mobileCtx = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148',
  });
  const mobileLog = [];
  for (const p of PAGES) {
    const r = await shoot(mobileCtx, p, MOBILE_DIR);
    mobileLog.push(r);
    console.log('  [mobile] ', p.name, '->', r.ok ? r.bytes + 'b' : 'FAIL');
  }
  await mobileCtx.close();

  fs.writeFileSync(
    path.join(OUT_DIR, 'baseline-log.json'),
    JSON.stringify({ desktop: desktopLog, mobile: mobileLog, captured_at: new Date().toISOString() }, null, 2)
  );
  console.log('--- desktop:', desktopLog.filter(l => l.ok).length, '/', desktopLog.length);
  console.log('--- mobile: ', mobileLog.filter(l => l.ok).length, '/', mobileLog.length);
  await browser.close();
})();
