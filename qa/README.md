# qa/ — v4.5 Tier 1 Runtime QA

Playwright + Lost Pixel + axe-core integrated for the v3-converged demo.

## Setup

```bash
cd qa
npm install
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright install chromium
```

The bundled chromium in `/opt/pw-browsers/chromium-1194` is matched by
`@playwright/test@1.56.0` (pinned). If you upgrade Playwright, also re-pin the
browser revision.

## Run all tests

```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright test
```

The Playwright config auto-spawns `python3 -m http.server 8765` rooted at the
repo. No manual server start needed.

Outputs land in:
- `test-results/results.json`            (machine-readable per-test)
- `test-results/html/`                   (HTML report)
- `test-results/phantom-buttons.json`    (dead-buttons spec output)
- `test-results/console-errors.json`     (zero-error policy output)
- `test-results/axe-<page>.json`         (per-page axe scan)

## Run a single suite

```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright test tests/routing-bug001.spec.ts
```

## Tests

| Spec                          | What it guards                                                                 |
|-------------------------------|--------------------------------------------------------------------------------|
| `routing-bug001.spec.ts`      | Catalog click → artifact page renders the requested id, not 后母戊鼎          |
| `cross-dim-dashboard.spec.ts` | Hover 商 band → era badge + pattern label + map update                        |
| `dead-buttons.spec.ts`        | Enumerate buttons/links with no href/onclick/data-action                       |
| `console-errors.spec.ts`      | Zero non-third-party console.error across 12 pages                             |
| `axe-a11y.spec.ts`            | No serious/critical WCAG 2 AA violations on 5 key pages                        |
| `data-integrity.spec.ts`      | 何尊 1976, 大克鼎 西周中期, 122-char FULL_TEXT, catalog count                  |

## Lost Pixel visual regression

```bash
# Update baseline (run once; commit lost-pixel-baseline/)
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx lost-pixel update

# Compare current against baseline
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx lost-pixel
```

12 pages baselined. Diffs land in `lost-pixel-diff/`.

## Failure modes

- **Chromium download blocked**: this repo expects pre-installed browsers in
  `/opt/pw-browsers`. Without it, tests can't run; install a matching browser
  (chromium-1194 for playwright 1.56.0) or upgrade both.
- **Port 8765 already in use**: kill the existing server or change the port in
  `playwright.config.ts` and `lostpixel.config.ts`.
- **Wikimedia photos 404**: blocked at the CDN; `console-errors.spec.ts`
  whitelists `upload.wikimedia.org` patterns.
