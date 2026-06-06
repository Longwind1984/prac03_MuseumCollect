/**
 * Smoke-test the new index.html: load it via http server, check zero console errors,
 * verify hero screenshots all load, then capture a screenshot for visual confirmation.
 *
 * Run: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node qa/scripts/verify-index.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8765';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  const errors = [];
  const failedRequests = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => m.type() === 'error' && errors.push(`console.error: ${m.text()}`));
  page.on('requestfailed', r => failedRequests.push(`${r.url()} — ${r.failure().errorText}`));

  await page.goto(BASE_URL + '/index.html', { waitUntil: 'networkidle', timeout: 15_000 });
  await page.waitForTimeout(1500);

  // Capture verification screenshot
  const outPath = path.join(__dirname, '..', '..', 'assets', 'screenshots', '_index-verify.jpg');
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 80, fullPage: true });

  // Count screenshot <img> that loaded
  const imgs = await page.$$eval('img[src*="screenshots"]', els =>
    els.map(el => ({ src: el.getAttribute('src'), naturalW: el.naturalWidth, naturalH: el.naturalHeight }))
  );
  const okImgs = imgs.filter(i => i.naturalW > 0).length;
  const totalImgs = imgs.length;

  console.log(`page errors: ${errors.length}`);
  for (const e of errors) console.log(`  ${e}`);
  console.log(`failed requests: ${failedRequests.length}`);
  for (const r of failedRequests) console.log(`  ${r}`);
  console.log(`hero images loaded: ${okImgs}/${totalImgs}`);
  console.log(`verify screenshot → ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

  await browser.close();
  process.exit(errors.length > 0 || failedRequests.length > 0 || okImgs !== totalImgs ? 1 : 0);
})();
