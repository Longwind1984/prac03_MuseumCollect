import { test, expect } from '@playwright/test';

/**
 * BUG-001 regression test.
 *
 * Background: artifact.html previously hard-coded MOCK_ARTIFACTS with only
 * houmuwu_ding + he_zun and silently fell back to "后母戊鼎" for every other
 * id. This test clicks 5 random catalog cards and verifies the artifact page
 * actually renders the requested id (NOT 后母戊鼎).
 */

const BASE = '/demos/v3-converged';

test('routing-bug001: random sample of catalog cards does NOT fall back to 后母戊鼎', async ({ page }) => {
  test.setTimeout(60_000);
  const consoleErrors: string[] = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push(`pageerror: ${e.message}`));

  await page.goto(`${BASE}/catalog.html`);
  await page.waitForSelector('.art-card', { timeout: 10_000 });

  const cards = await page.$$('.art-card');
  expect(cards.length).toBeGreaterThan(10);

  // Sample 5 random card indices
  const idxs = new Set<number>();
  while (idxs.size < Math.min(5, cards.length)) {
    idxs.add(Math.floor(Math.random() * cards.length));
  }

  type SampleResult = { id: string; name: string; renderedH1: string; renderedTitle: string; landed_on_houmuwu: boolean; data_missing: boolean; passed: boolean };
  const results: SampleResult[] = [];

  for (const i of idxs) {
    await page.goto(`${BASE}/catalog.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.art-card');
    const card = page.locator('.art-card').nth(i);

    const onclick = await card.getAttribute('onclick') || '';
    const idMatch = onclick.match(/id=([^'"&]+)/);
    const id = idMatch ? idMatch[1] : '__unknown__';
    const name = (await card.locator('.art-card-name').textContent() || '').trim();

    // Navigate directly via URL (more reliable than click which races with onclick=location.href)
    await page.goto(`${BASE}/artifact.html?id=${id}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const h1 = (await page.locator('h1').first().textContent().catch(() => '') || '').trim();
    const title = await page.title().catch(() => '');
    const landed_on_houmuwu = h1.includes('后母戊') || title.includes('后母戊');
    const data_missing = h1.includes('未找到');
    // BUG-001 = silent fallback to 后母戊鼎 when id != houmuwu_ding
    const passed = !landed_on_houmuwu || id === 'houmuwu_ding';

    results.push({ id, name, renderedH1: h1, renderedTitle: title, landed_on_houmuwu, data_missing, passed });
  }

  test.info().annotations.push({ type: 'sample', description: JSON.stringify(results) });

  // CORE assertion: not every sample lands on 后母戊鼎 (this is the BUG-001 signature)
  const allHoumuwu = results.every(r => r.landed_on_houmuwu);
  expect(allHoumuwu, `BUG-001 REGRESSION: all 5/5 clicks landed on 后母戊鼎. Sample: ${JSON.stringify(results)}`).toBe(false);

  // Per-sample assertion: each click should NOT silently swap to 后母戊鼎
  const wrongFallbacks = results.filter(r => !r.passed);
  expect(wrongFallbacks, `Silent fallback to 后母戊鼎 on ids: ${wrongFallbacks.map(r => r.id).join(', ')}`).toHaveLength(0);
});

test('routing-bug001: specific id artifact.html?id=he_zun renders 何尊', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=he_zun`);
  await page.waitForTimeout(1500);
  // h1 is the rendered artifact name (not script content)
  const h1 = (await page.locator('h1').first().textContent() || '').trim();
  expect(h1, `h1 should be 何尊, got: ${h1}`).toContain('何尊');
  expect(h1).not.toContain('后母戊');
});

test('routing-bug001: artifact.html?id=__nonexistent__ shows graceful error', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=__nonexistent__`);
  await page.waitForTimeout(1500);
  // Check the rendered content area, not the script-tag body text
  const content = (await page.locator('#artifact-content, main, body').first().innerText().catch(() => '')) || '';
  // Should NOT silently render 后母戊鼎 as the H1
  const h1 = (await page.locator('h1').first().textContent().catch(() => '') || '').trim();
  expect(h1, `Invalid id should NOT render 后母戊鼎 as h1; got: ${h1}`).not.toContain('后母戊');
  // The graceful error message OR an empty render is acceptable
  const looksGraceful = content.includes('未找到') || content.includes('not found') || h1.length === 0;
  expect(looksGraceful, `Expected graceful "未找到" UI, got h1=${h1}`).toBe(true);
});
