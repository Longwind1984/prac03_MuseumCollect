import { test, expect } from '@playwright/test';

/**
 * Mobile viewport regression — guards the v4.6 mobile retrofit.
 *
 * Pre-fix: 11/12 v3-converged pages forced browser to scale viewport up to
 * 855px because top-nav (11 links) overflowed at 375. All page content
 * rendered desktop-sized + scaled down → unusable on phone.
 *
 * Post-fix (commit dec08f2): converged.css @media (max-width: 768px)
 * applies html/body overflow-x:hidden + nav-links horizontal-scroll.
 * Every page should report docW == innerW == 375 on an iPhone-class viewport.
 *
 * This test runs against all 12 demo pages. If a regression introduces
 * overflow (a new wide SVG, fixed-width container, etc), this will catch it.
 */

const BASE = '/demos/v3-converged';

const PAGES = [
  'index.html',
  'catalog.html',
  'artifact.html?id=he_zun',
  'me.html',
  'dashboard.html',
  'time-pillar.html',
  'geo-system.html',
  'caster-profile.html',
  'pattern-tree.html',
  'inscription-special-hezun.html',
  'purpose-scene.html',
  'scan.html',
];

// Use chromium with mobile viewport flags instead of webkit-based devices preset
// (devices.iPhone N preset would require @playwright/browsers webkit, not installed here).
test.use({
  viewport: { width: 375, height: 667 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148',
});

for (const path of PAGES) {
  test(`mobile-viewport: ${path} fits 375px without horizontal overflow`, async ({ page }) => {
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const dims = await page.evaluate(() => ({
      innerW: window.innerWidth,
      docW: document.documentElement.scrollWidth,
      bodyW: document.body.offsetWidth,
    }));
    // iPhone SE class: 375x667. Allow ±10px slop for scrollbar quirks.
    expect(dims.innerW, `${path} innerWidth`).toBeLessThanOrEqual(385);
    expect(dims.docW, `${path} document scroll width`).toBeLessThanOrEqual(385);
    expect(dims.bodyW, `${path} body width`).toBeLessThanOrEqual(385);
  });
}
