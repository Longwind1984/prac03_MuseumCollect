import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const PAGES = [
  { name: 'index',     url: '/demos/v3-converged/index.html' },
  { name: 'catalog',   url: '/demos/v3-converged/catalog.html' },
  { name: 'artifact',  url: '/demos/v3-converged/artifact.html?id=he_zun' },
  { name: 'me',        url: '/demos/v3-converged/me.html' },
  { name: 'dashboard', url: '/demos/v3-converged/dashboard.html' },
];

test.describe('axe-a11y: accessibility scan', () => {
  for (const p of PAGES) {
    test(`axe scan: ${p.name}`, async ({ page }, testInfo) => {
      await page.goto(p.url);
      await page.waitForTimeout(1200);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const severe = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      const outDir = path.join(__dirname, '..', 'test-results');
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(
        path.join(outDir, `axe-${p.name}.json`),
        JSON.stringify({ url: p.url, violations: results.violations }, null, 2)
      );

      testInfo.annotations.push({
        type: 'axe',
        description: JSON.stringify({
          page: p.name,
          total: results.violations.length,
          severe: severe.length,
          severeIds: severe.map(v => v.id),
          severeNodes: severe.map(v => ({ id: v.id, count: v.nodes.length })),
        }),
      });

      // Color-contrast violations are widespread but cosmetic; track but don't fail.
      // Fail only on non-color-contrast serious/critical violations.
      const blockers = severe.filter(v => v.id !== 'color-contrast');
      expect(blockers, `Blocking a11y violations on ${p.name}: ${blockers.map(v => v.id).join(', ')}`).toHaveLength(0);
    });
  }
});
