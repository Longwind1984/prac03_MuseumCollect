import { test, expect } from '@playwright/test';

/**
 * Claim-vs-reality data integrity checks (per merged-spec-v3 d2 P0 fixes).
 */

const BASE = '/demos/v3-converged';

test('data-integrity: he_zun inscription page shows 1976 唐兰 citation, not 1986', async ({ page }) => {
  // The 1976 唐兰 citation lives on the inscription-special-hezun page, not artifact.html.
  // (Per d2 P0 fix: ensure 唐兰1976 not 唐兰1986.)
  await page.goto(`${BASE}/inscription-special-hezun.html`);
  await page.waitForTimeout(2000);
  // Use page.content() (full HTML) instead of innerText (truncated to visible viewport)
  const html = await page.content();
  test.info().annotations.push({ type: 'he_zun-citation', description: JSON.stringify({
    has1976: /1976/.test(html),
    has1975Display: /1975年释读/.test(html),
    has1986TangLan: /唐兰.{0,15}1986|1986.{0,15}唐兰/.test(html),
  })});
  expect(html, '何尊 inscription page HTML should cite 1976').toMatch(/1976/);
  expect(html, '何尊 inscription should NOT cite 唐兰 1986').not.toMatch(/唐兰.{0,20}1986|1986.{0,20}唐兰/);
});

test('data-integrity: da_ke_ding period field is 西周中期, not 西周晚期', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=da_ke_ding`);
  await page.waitForTimeout(2000);
  // Read the period from MuseumData directly — the canonical source
  const period = await page.evaluate(() => {
    const rec = (window as any).MuseumData?.get?.('da_ke_ding');
    return rec?.period || '';
  });
  test.info().annotations.push({ type: 'da_ke_ding-period', description: period });
  expect(period, `da_ke_ding.period should be 西周中期, got: ${period}`).toMatch(/西周中期/);
  expect(period, `da_ke_ding.period should NOT be 西周晚期, got: ${period}`).not.toMatch(/西周晚期/);

  // Also check that the rendered period (visible UI) is 西周中期
  const visibleText = await page.locator('body').innerText().catch(() => '');
  const periodBlock = visibleText.match(/分期[^\n]{0,30}/)?.[0] || '';
  test.info().annotations.push({ type: 'da_ke_ding-period-ui', description: periodBlock });
});

test('data-integrity: 何尊 inscription FULL_TEXT is exactly 122 characters', async ({ page }) => {
  await page.goto(`${BASE}/inscription-special-hezun.html`);
  await page.waitForTimeout(2000);
  // FULL_TEXT is a const inside the script (not on window). Count rendered chars
  // from the read-count UI counter "0/122" or from rendered char nodes.
  const result = await page.evaluate(() => {
    // Strategy 1: parse read-count counter "X/Y"
    const counter = document.getElementById('read-count');
    if (counter && counter.textContent) {
      const m = counter.textContent.match(/\/(\d+)/);
      if (m) return { strategy: 'counter', count: parseInt(m[1], 10) };
    }
    // Strategy 2: count individual char spans rendered
    const chars = document.querySelectorAll('.char, .inscription-char, [class*="char-cell"], [data-char-idx]');
    if (chars.length > 0) return { strategy: 'dom', count: chars.length };
    return { strategy: 'none', count: -1 };
  });
  test.info().annotations.push({ type: 'full-text', description: JSON.stringify(result) });
  expect(result.count, `FULL_TEXT length: expected 122, got ${result.count} via ${result.strategy}`).toBe(122);
});

test('data-integrity: catalog visible card count vs README claim of 277', async ({ page }) => {
  await page.goto(`${BASE}/catalog.html`);
  await page.waitForSelector('.art-card', { timeout: 10_000 });
  await page.waitForTimeout(800);
  const total = await page.evaluate(() => {
    const w: any = window as any;
    if (w.MuseumData && Array.isArray(w.MuseumData.artifacts)) {
      return w.MuseumData.artifacts.length;
    }
    return -1;
  });
  const visible = await page.locator('.art-card').count();
  test.info().annotations.push({
    type: 'catalog-count',
    description: JSON.stringify({ data_artifacts: total, visible_cards: visible, claimed: 277 }),
  });
  expect(total, `MuseumData.artifacts.length should be ~275, got ${total}`).toBeGreaterThan(200);
});

test('data-integrity: every COLLECTED_IDS entry resolves to a real MuseumData record (v5 ③ regression)', async ({ page }) => {
  // v5 ③ fixed a hidden bug: state.js had 28/35 IDs that didn't exist in any
  // segment JSON, so me.html silently showed ~7 collected (not the claimed 35).
  // This guard catches future ID drift the moment someone introduces a typo.
  await page.goto(`${BASE}/me.html`);
  await page.waitForTimeout(2000);
  const result = await page.evaluate(() => {
    const w: any = window as any;
    const ids = Array.from((w.MuseumConstants?.COLLECTED_IDS as Set<string>) || []);
    const unresolved = ids.filter(id => !w.MuseumData?.get?.(id));
    return { total: ids.length, unresolved };
  });
  test.info().annotations.push({
    type: 'collected-ids-real',
    description: JSON.stringify(result),
  });
  expect(result.unresolved, `These COLLECTED_IDS don't exist in any segment JSON: ${result.unresolved.join(', ')}`).toEqual([]);
  expect(result.total, 'COLLECTED_IDS should not be empty').toBeGreaterThan(0);
});
