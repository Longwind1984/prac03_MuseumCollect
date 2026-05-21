import { test, expect } from '@playwright/test';

const PAGES = [
  '/demos/v3-converged/index.html',
  '/demos/v3-converged/catalog.html',
  '/demos/v3-converged/artifact.html?id=he_zun',
  '/demos/v3-converged/artifact.html?id=houmuwu_ding',
  '/demos/v3-converged/dashboard.html',
  '/demos/v3-converged/me.html',
  '/demos/v3-converged/time-pillar.html',
  '/demos/v3-converged/geo-system.html',
  '/demos/v3-converged/pattern-tree.html',
  '/demos/v3-converged/inscription-reader.html',
  '/demos/v3-converged/caster-profile.html',
  '/demos/v3-converged/purpose-scene.html',
];

// Environmental whitelist (sandbox network limits — NOT real bugs)
const IGNORE_PATTERNS = [
  /favicon/i,
  /Failed to load resource/i,
  /ERR_CERT_AUTHORITY_INVALID/i,     // sandbox can't reach Wikimedia/jsdelivr CDNs
  /ERR_BLOCKED_BY_RESPONSE/i,
  /upload\.wikimedia\.org/i,
  /d3 is not defined/i,              // D3 loads from jsdelivr CDN — blocked in sandbox
];

test('console-errors: zero non-third-party errors across all v3-converged pages', async ({ page }) => {
  type Err = { page: string; text: string };
  const all: Err[] = [];

  for (const url of PAGES) {
    const local: string[] = [];
    page.on('console', m => { if (m.type() === 'error') local.push(m.text()); });
    page.on('pageerror', e => local.push(`pageerror: ${e.message}`));

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    for (const t of local) {
      if (IGNORE_PATTERNS.some(rx => rx.test(t))) continue;
      all.push({ page: url, text: t });
    }

    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
  }

  const fs = require('fs');
  const path = require('path');
  const outDir = path.join(__dirname, '..', 'test-results');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'console-errors.json'), JSON.stringify(all, null, 2));

  test.info().annotations.push({ type: 'console-errors', description: JSON.stringify(all) });

  expect(all, `Console errors found: ${JSON.stringify(all, null, 2)}`).toHaveLength(0);
});
