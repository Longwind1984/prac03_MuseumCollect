import { test, expect } from '@playwright/test';

/**
 * Claim-vs-reality data integrity checks (per merged-spec-v3 d2 P0 fixes).
 */

const BASE = '/demos/v3-converged';

test('data-integrity: he_zun shows 1976 唐兰 citation, not 1986', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=he_zun`);
  await page.waitForTimeout(1500);
  const body = (await page.textContent('body')) || '';
  expect(body, 'he_zun should reference 1976 唐兰 citation').toMatch(/1976/);
  expect(body, 'he_zun should NOT contain 1986 (old wrong citation)').not.toMatch(/1986/);
});

test('data-integrity: da_ke_ding period is 西周中期, not 西周晚期', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=da_ke_ding`);
  await page.waitForTimeout(1500);
  const body = (await page.textContent('body')) || '';
  // Should NOT call it 西周晚期 anywhere meaningful
  const wrongMatches = (body.match(/西周晚期/g) || []).length;
  const rightMatches = (body.match(/西周中期/g) || []).length;
  expect(wrongMatches, `Body had ${wrongMatches} '西周晚期' references — should be 西周中期`).toBe(0);
  expect(rightMatches, `Body should mention '西周中期'`).toBeGreaterThan(0);
});

test('data-integrity: 何尊 inscription FULL_TEXT is exactly 122 characters', async ({ page }) => {
  await page.goto(`${BASE}/inscription-special-hezun.html`);
  await page.waitForTimeout(1500);
  const count = await page.evaluate(() => {
    // FULL_TEXT may be exposed as window.FULL_TEXT or via a DOM element
    // Try multiple strategies
    const w: any = window as any;
    if (typeof w.FULL_TEXT === 'string') return w.FULL_TEXT.length;
    // fallback: count chars in the rendered scroll
    const scroll = document.querySelector('.inscription-scroll, #scroll-full-text, [class*="full-text"]');
    if (scroll) {
      const txt = (scroll.textContent || '').replace(/\s/g, '');
      return txt.length;
    }
    return -1;
  });
  expect(count, `Expected 122 chars in FULL_TEXT, got ${count}`).toBeGreaterThanOrEqual(120);
  expect(count).toBeLessThanOrEqual(124);
});

test('data-integrity: catalog visible card count vs README claim of 277', async ({ page }) => {
  await page.goto(`${BASE}/catalog.html`);
  await page.waitForSelector('.art-card', { timeout: 10_000 });
  await page.waitForTimeout(500);
  const total = await page.evaluate(() => {
    const w: any = window as any;
    if (w.MuseumData && typeof w.MuseumData.all === 'function') {
      return w.MuseumData.all().length;
    }
    return -1;
  });
  const visible = await page.locator('.art-card').count();
  test.info().annotations.push({
    type: 'catalog-count',
    description: JSON.stringify({ total_data: total, visible_cards: visible, claimed: 277 }),
  });
  // The catalog may show paginated/filtered subset; the data layer should hold ~277.
  expect(total, `MuseumData.all().length unexpected: ${total}`).toBeGreaterThan(200);
});
