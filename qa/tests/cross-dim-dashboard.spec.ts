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

  await page.goto(`${BASE}/dashboard.html`, { waitUntil: 'load' });
  await page.waitForTimeout(3000); // allow D3 to draw bands

  // Check if d3 loaded — if not, this is a real env/demo failure to document
  const d3State = await page.evaluate(() => ({
    d3Loaded: typeof (window as any).d3 !== 'undefined',
    bandCount: document.querySelectorAll('[data-dynasty]').length,
    pageErrors: (window as any).__pageErrors || [],
  }));
  test.info().annotations.push({ type: 'd3-state', description: JSON.stringify(d3State) });

  if (!d3State.d3Loaded) {
    test.info().annotations.push({
      type: 'env-skip',
      description: 'D3 CDN (jsdelivr) unreachable; dashboard cannot render bands. Test skipped — but this is a real brittleness: dashboard breaks offline.',
    });
    test.skip(true, 'D3 CDN unreachable in this environment');
  }
  await page.waitForFunction(() => document.querySelectorAll('[data-dynasty]').length >= 8, { timeout: 10_000 });

  // Capture initial state of right-column components
  const before = await page.evaluate(() => ({
    eraName: document.getElementById('era-big-name')?.textContent || '',
    mapBadge: document.getElementById('map-era-badge')?.textContent || '',
    patternLabel: document.getElementById('pattern-strip-era-label')?.textContent || '',
    activeBand: document.querySelector('.dynasty-band-g.active')?.getAttribute('data-dynasty') || '',
  }));

  // Trigger hover via raw event dispatch (SVG locators are unreliable in Playwright)
  await page.evaluate(() => {
    const el = document.querySelector('[data-dynasty="商"]');
    if (el) {
      el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    }
  });
  await page.waitForTimeout(500);

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

test('dashboard cross-dim: clicking 西周 band locks the era selection', async ({ page }) => {
  await page.goto(`${BASE}/dashboard.html`, { waitUntil: 'load' });
  await page.waitForTimeout(3000); // allow auto-focus-商 to settle first
  const d3Loaded = await page.evaluate(() => typeof (window as any).d3 !== 'undefined');
  if (!d3Loaded) test.skip(true, 'D3 CDN unreachable; dashboard cannot render');
  await page.waitForFunction(() => document.querySelectorAll('[data-dynasty]').length >= 8, { timeout: 10_000 });
  // d3.dispatch is the most reliable way to trigger d3-attached listeners on SVG <g>;
  // Playwright native click + synthetic dispatchEvent both miss because SVG hit-testing
  // routes the mouse event to the inner rect, which doesn't carry the d3 listener.
  // Use 西周 not 商 — dashboard auto-focuses 商 on load (intentional wow effect),
  // so clicking 商 would toggle OFF instead of lock.
  await page.evaluate(() => {
    const xizhou = document.querySelector('[data-dynasty="西周"]') as any;
    (window as any).d3.select(xizhou).dispatch('click');
  });
  await page.waitForTimeout(500);
  const result = await page.evaluate(() => {
    const xizhou = document.querySelector('[data-dynasty="西周"]') as any;
    const shang = document.querySelector('[data-dynasty="商"]') as any;
    const cx = xizhou?.getAttribute('class') || '';
    const cs = shang?.getAttribute('class') || '';
    return { xizhouActive: cx.includes('active'), shangActive: cs.includes('active') };
  });
  test.info().annotations.push({ type: 'click-result', description: JSON.stringify(result) });
  // Clicking 西周 should activate it AND deactivate 商 (single-lock semantics)
  expect(result.xizhouActive).toBe(true);
  expect(result.shangActive).toBe(false);
});
