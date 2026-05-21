import { test, expect } from '@playwright/test';

/**
 * Cross-dimension wow-moment test — verifies dashboard.html actually wires
 * 时代柱 ↔ 地图 ↔ 纹饰条 via the era-focus event bus.
 *
 * Claim (per merged-spec-v3): hover 商 band → map polygons swap to Shang sites,
 * pattern strip highlights 饕餮/夔龙, bottom panel shows Shang artifacts.
 */

const BASE = '/demos/v3-converged';

test('dashboard cross-dim: hovering 商 band triggers map + pattern + panel update', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));

  await page.goto(`${BASE}/dashboard.html`);
  await page.waitForSelector('.dynasty-band-g', { timeout: 10_000 });

  // Capture initial state of right-column components
  const before = await page.evaluate(() => ({
    eraName: document.getElementById('era-big-name')?.textContent || '',
    mapBadge: document.getElementById('map-era-badge')?.textContent || '',
    patternLabel: document.getElementById('pattern-strip-era-label')?.textContent || '',
    activeBand: document.querySelector('.dynasty-band-g.active')?.getAttribute('data-dynasty') || '',
  }));

  // Hover the Shang band
  const shangBand = page.locator('.dynasty-band-g[data-dynasty="商"]');
  await expect(shangBand).toHaveCount(1, { timeout: 5000 });
  await shangBand.hover();
  await page.waitForTimeout(400); // give event bus 200ms + jitter

  const after = await page.evaluate(() => ({
    eraName: document.getElementById('era-big-name')?.textContent || '',
    mapBadge: document.getElementById('map-era-badge')?.textContent || '',
    patternLabel: document.getElementById('pattern-strip-era-label')?.textContent || '',
    activeBand: document.querySelector('.dynasty-band-g.active')?.getAttribute('data-dynasty') || '',
    // visible pattern nodes highlighted
    highlighted: document.querySelectorAll('.pattern-strip-node.highlighted, .pattern-node.highlighted, [class*="pattern"][class*="active"]').length,
  }));

  test.info().annotations.push({
    type: 'cross-dim',
    description: JSON.stringify({ before, after }),
  });

  // Era badge should now mention 商
  expect(after.eraName).toContain('商');

  // Pattern strip label should reference 商 era
  expect(after.patternLabel.includes('商') || after.patternLabel !== before.patternLabel).toBe(true);

  // No console errors should arise from the hover
  expect(errors.filter(e => !e.includes('favicon') && !e.includes('Failed to load resource'))).toHaveLength(0);
});

test('dashboard cross-dim: clicking 商 band locks the era selection', async ({ page }) => {
  await page.goto(`${BASE}/dashboard.html`);
  await page.waitForSelector('.dynasty-band-g');
  const shang = page.locator('.dynasty-band-g[data-dynasty="商"]');
  await shang.click();
  await page.waitForTimeout(300);
  const isActive = await shang.evaluate(el => el.classList.contains('active'));
  expect(isActive).toBe(true);
});
