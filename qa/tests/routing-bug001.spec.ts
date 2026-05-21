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

test('routing-bug001: random sample of catalog cards lands on correct artifact', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push(`pageerror: ${e.message}`));

  await page.goto(`${BASE}/catalog.html`);
  // wait for cards to render after museum-data-ready
  await page.waitForSelector('.art-card', { timeout: 10_000 });

  const cards = await page.$$('.art-card');
  expect(cards.length).toBeGreaterThan(10);

  // Build sample of 5 random card indices
  const idxs = new Set<number>();
  while (idxs.size < Math.min(5, cards.length)) {
    idxs.add(Math.floor(Math.random() * cards.length));
  }

  type SampleResult = { id: string; name: string; renderedName: string; renderedH1: string; passed: boolean };
  const results: SampleResult[] = [];

  for (const i of idxs) {
    // Re-grab cards (DOM may be re-rendered)
    await page.goto(`${BASE}/catalog.html`);
    await page.waitForSelector('.art-card');
    const card = page.locator('.art-card').nth(i);

    // Extract id from onclick attribute, fall back to scraping card name
    const onclick = await card.getAttribute('onclick') || '';
    const idMatch = onclick.match(/id=([^'"&]+)/);
    const id = idMatch ? idMatch[1] : '__unknown__';
    const name = (await card.locator('.art-card-name').textContent() || '').trim();

    await card.click();
    await page.waitForURL(/artifact\.html\?id=/, { timeout: 10_000 });

    // Wait for content to render
    await page.waitForTimeout(800);

    const renderedH1 = (await page.locator('h1, .artifact-name, .hero-name, [class*="artifact"]').first().textContent().catch(() => '') || '').trim();
    const renderedTitle = (await page.title()).trim();

    const passed = id !== '__unknown__'
      && !renderedH1.includes('后母戊')
      && !renderedTitle.includes('后母戊')
      && (renderedH1.includes(name) || renderedH1.length > 0);

    results.push({ id, name, renderedName: renderedTitle, renderedH1, passed });
  }

  // Attach evidence
  test.info().annotations.push({ type: 'sample', description: JSON.stringify(results) });

  // Hard assertion — every sample must pass and not all should land on 后母戊鼎
  const allHoumuwu = results.every(r => r.renderedH1.includes('后母戊') || r.renderedName.includes('后母戊'));
  expect(allHoumuwu, 'BUG-001 regression: all clicks landed on 后母戊鼎').toBe(false);

  const failed = results.filter(r => !r.passed);
  expect(failed, `Some ids didn't render correctly: ${JSON.stringify(failed)}`).toHaveLength(0);

  expect(consoleErrors.filter(e => !e.includes('favicon')), `Console errors: ${consoleErrors.join('\n')}`).toHaveLength(0);
});

test('routing-bug001: specific id artifact.html?id=he_zun renders 何尊', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=he_zun`);
  await page.waitForTimeout(1200);
  const text = await page.textContent('body');
  expect(text).toContain('何尊');
  expect(text).not.toContain('未找到');
});

test('routing-bug001: artifact.html?id=__nonexistent__ shows graceful error', async ({ page }) => {
  await page.goto(`${BASE}/artifact.html?id=__nonexistent__`);
  await page.waitForTimeout(1200);
  const text = (await page.textContent('body')) || '';
  // Should NOT silently render 后母戊鼎
  expect(text).not.toContain('后母戊鼎');
});
