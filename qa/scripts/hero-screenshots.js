/**
 * Hero screenshots for portfolio surface (index.html + README + case-study).
 *
 * Captures 5 v3-converged pages at 1920×1080 desktop viewport + 750×1334 mobile,
 * outputs to assets/screenshots/. JPEG quality 82 for size budget < 300 KB each.
 *
 * Run: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node qa/scripts/hero-screenshots.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8765';
const OUT_DIR = path.join(__dirname, '..', '..', 'assets', 'screenshots');

const HEROES = [
  { path: '/demos/v3-converged/dashboard.html',                 name: 'dashboard',       wait: 2500 },
  { path: '/demos/v3-converged/inscription-special-hezun.html', name: 'inscription-hezun', wait: 2000 },
  { path: '/demos/v3-converged/time-pillar.html',               name: 'time-pillar',     wait: 2000 },
  { path: '/demos/v3-converged/geo-system.html',                name: 'geo-system',      wait: 2500 },
  { path: '/demos/v3-converged/me.html',                        name: 'me',              wait: 1500 },
];

async function shoot(ctx, p, suffix) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE_URL + p.path, { waitUntil: 'domcontentloaded', timeout: 15_000 });
    await page.waitForTimeout(p.wait);
    const file = path.join(OUT_DIR, `${p.name}-${suffix}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 82, fullPage: false });
    const bytes = fs.statSync(file).size;
    console.log(`  [${suffix}] ${p.name} -> ${(bytes / 1024).toFixed(1)} KB`);
    return { ok: true, name: p.name, bytes };
  } catch (e) {
    console.log(`  [${suffix}] ${p.name} -> FAIL: ${String(e).slice(0, 120)}`);
    return { ok: false, name: p.name, error: String(e).slice(0, 200) };
  } finally {
    await page.close();
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  const desktop = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  for (const p of HEROES) await shoot(desktop, p, 'desktop');
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true, hasTouch: true,
  });
  for (const p of HEROES) await shoot(mobile, p, 'mobile');
  await mobile.close();

  await browser.close();
})();
