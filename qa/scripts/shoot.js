/* Multi-page, dual-viewport screenshot tool for the redesign.
   Usage: BASE_URL=http://127.0.0.1:8765 node qa/scripts/shoot.js page1.html page2.html ...
   Defaults to a representative set. Outputs to /tmp/shots/. */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8765';
const PREFIX = process.env.PAGE_PREFIX || '/demos/v3-converged';
const OUT = process.env.OUT || '/tmp/shots';
const pages = process.argv.slice(2).length ? process.argv.slice(2)
  : ['dashboard.html','catalog.html','artifact.html','time-pillar.html','geo-system.html','scan.html','me.html'];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = [];
  for (const vp of [{name:'desktop',w:1280,h:900},{name:'mobile',w:375,h:812}]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
    for (const p of pages) {
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      page.on('console', m => m.type()==='error' && errs.push(m.text()));
      const url = BASE + PREFIX + '/' + p;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
        await page.waitForTimeout(900);
        // detect horizontal overflow (the mobile failure mode)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        const out = path.join(OUT, `${p.replace('.html','')}-${vp.name}.jpg`);
        await page.screenshot({ path: out, type:'jpeg', quality: 78, fullPage: true });
        report.push(`${vp.name.padEnd(7)} ${p.padEnd(22)} overflow=${overflow}px errs=${errs.length}${errs.length?' :: '+errs[0].slice(0,80):''}`);
      } catch (e) {
        report.push(`${vp.name.padEnd(7)} ${p.padEnd(22)} LOAD-FAIL ${String(e.message).slice(0,80)}`);
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(report.join('\n'));
})();
