# d3 Runtime Audit — v4.5 Tier 1 QA Tooling

> 2026-05-22 · Tools-integrator (runtime auditor pilot)
> Installed: Playwright 1.56 + axe-core 4.11 + Lost Pixel 3.22 + @axe-core/playwright
> Workspace: `qa/` (npm package, scripts, configs, 6 specs, baselines)

---

## TL;DR

- **Install**: PASS (Playwright/axe/lost-pixel + 120 npm deps; browser already in `/opt/pw-browsers/chromium-1194`, matched playwright 1.56.0)
- **Tests written**: 6 specs, 16 cases total
- **Tests ran**: 16/16; **14 passed, 0 failed, 2 skipped** (skipped: dashboard cross-dim — d3 CDN unreachable in sandbox)
- **BUG-001 status**: FIXED — confirmed (3/3 routing tests pass; nonexistent id shows graceful "未找到" not silent 后母戊鼎)
- **Cross-dim wow**: cannot verify in this env (D3 from jsdelivr blocked); but the test now exists for the next CI run with network
- **Visual baseline**: 12 PNGs captured via fallback script (lost-pixel CLI failed in this env, see §6)

---

## 1. Install status

| Component | Version | Installed | Notes |
|----------|---------|-----------|-------|
| `@playwright/test` | 1.56.0 | yes | Pinned to match `/opt/pw-browsers/chromium-1194` |
| chromium browser | 1194 (141.0.7390.37) | yes | Pre-existing at `/opt/pw-browsers/`; `--with-deps` not run |
| `axe-core` | 4.11.4 | yes | Used via `@axe-core/playwright` 4.11.3 |
| `lost-pixel` | 3.22.0 | yes (CLI broken in env) | See §6 fallback |
| `python3 -m http.server` | 3.x | yes | Auto-spawned by Playwright config on port 8765 |

`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` must be exported for tests to find the matching browser. README documents this.

---

## 2. Test results — 16 cases

| Spec | Cases | Pass | Fail | Skip | Notes |
|------|-------|------|------|------|-------|
| `routing-bug001.spec.ts` | 3 | 3 | 0 | 0 | All catalog ids resolve correctly OR show graceful "未找到" |
| `cross-dim-dashboard.spec.ts` | 2 | 0 | 0 | 2 | D3 CDN unreachable; skipped (test ready for CI) |
| `dead-buttons.spec.ts` | 1 | 1 | 0 | 0 | 7 candidate phantoms enumerated (see §3) |
| `console-errors.spec.ts` | 1 | 1 | 0 | 0 | 0 non-env console errors across 12 pages |
| `axe-a11y.spec.ts` | 5 | 5 | 0 | 0 | color-contrast everywhere (tracked, not blocking — see §4) |
| `data-integrity.spec.ts` | 4 | 4 | 0 | 0 | All 4 d2 P0 content fixes verified live |

Total runtime: 63s · Workers: 2 · Output: `qa/test-results/results.json` + `qa/test-results/html/`

---

## 3. Phantom-button audit (7 candidates)

The dead-button enumerator flagged 7 controls with no `href`, `onclick`, or `data-action` attribute:

| Page | Selector | Text |
|------|---------|------|
| index.html | `button.linkage-toggle` | 穿越模式 ● |
| catalog.html | `button.linkage-toggle` | 穿越模式 ● |
| artifact.html | `button.linkage-toggle` | 穿越模式 ● |
| dashboard.html | `button.linkage-badge` | 联动 ON |
| me.html | `button.linkage-toggle` | 穿越模式 ● |
| time-pillar.html | `button.linkage-toggle` | 穿越模式 ● |
| geo-system.html | `button.linkage-toggle` | 穿越模式 ● |

**False positives**: each `.linkage-toggle` is wired via JS event listener (`document.getElementById('linkage-toggle').addEventListener(...)`), not via inline `onclick`. The current heuristic flags any button missing `onclick`/`href`/`data-action`. **Recommendation**: refine the test to also check for a registered listener via `window.getEventListeners()` or run a click and observe DOM change. Not a real bug; surfaces a gap in the heuristic.

Full list: `qa/test-results/phantom-buttons.json`.

---

## 4. Accessibility (axe-core scan)

WCAG 2 AA scan on 5 pages — only `color-contrast` violations found:

| Page | Total | Serious/Critical | Failing rule |
|------|-------|------------------|--------------|
| index | 1 | 1 | color-contrast (14 nodes) |
| catalog | 1 | 1 | color-contrast (36 nodes) |
| artifact | 1 | 1 | color-contrast (14 nodes) |
| me | 1 | 1 | color-contrast (17 nodes) |
| dashboard | 1 | 1 | color-contrast (11 nodes) |

All other rules (alt-text, landmark roles, headings, keyboard, language) pass. The contrast hits are largely from `--text-muted` / `.art-card-meta` / debug overlay text against the cream backgrounds. Tracked as visible-but-not-blocking. The test treats color-contrast as warning, blocks on any other serious/critical (none found).

Raw output: `qa/test-results/axe-{index,catalog,artifact,me,dashboard}.json`.

---

## 5. Console errors — 0 non-env

After whitelisting (1) favicon, (2) `Failed to load resource`, (3) `ERR_CERT_AUTHORITY_INVALID`, (4) `upload.wikimedia.org`, (5) `d3 is not defined` (env-blocked CDN), **0 application errors** across 12 v3-converged pages.

Pre-filter we observed 44 entries — all of them Wikimedia photo CDN cert errors (sandbox has restricted egress) or jsdelivr CDN cert errors for D3.js loads. Document brittleness in §7.

Raw: `qa/test-results/console-errors.json`.

---

## 6. Visual baseline (12 pages)

**Lost Pixel CLI failed** in this environment — its bundled Playwright (1.47.2 inside `lost-pixel/node_modules`) launches Chromium with `--headless=old`, a flag that Chromium 141 has removed. Setting `browserLaunchOptions.chromium.headless: true` in config did not override the `--headless=old` flag (Lost Pixel adds it unconditionally to its internal launch args).

**Fallback**: `qa/scripts/screenshot-baseline.js` uses our own Playwright 1.56 directly to capture 12 PNG baselines. Captured 12/12:

| Page | Size | Health signal |
|------|------|---------------|
| index | 334 KB | full page |
| catalog | 214 KB | full page |
| artifact-he-zun | 369 KB | full page |
| artifact-houmuwu | 460 KB | full page |
| me | 376 KB | full page |
| inscription-reader | 165 KB | full page |
| purpose-scene | 171 KB | full page |
| dashboard | **34 KB** | mostly empty (D3 not loaded) |
| time-pillar | **43 KB** | mostly empty (D3 not loaded) |
| geo-system | **43 KB** | mostly empty (D3 not loaded) |
| pattern-tree | **47 KB** | mostly empty (D3 not loaded) |
| caster-profile | **46 KB** | mostly empty (D3 not loaded) |

The 5 small files (34–47 KB) are a clear visual signal that those pages depend on D3 from jsdelivr and degrade to a near-empty shell when the CDN is unreachable. **Real demo brittleness finding** — see §7.

Baseline lives in `qa/lost-pixel-baseline/`. To diff against future builds, run `node scripts/screenshot-baseline.js` against a new build and pixelmatch the two folders (TODO: small wrapper script).

---

## 7. Real findings (not test bugs — actual signal)

### 7.1 D3.js CDN dependency = single point of failure (P1)

5 of the 12 demo pages (dashboard, time-pillar, geo-system, pattern-tree, caster-profile) load D3 from `https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js`. In any sandbox/CI without outbound HTTPS to jsdelivr, those pages render as empty navigation shells. Recommendation: vendor d3.min.js to `assets/vendor/d3.min.js` (~75 KB minified+gzip). One-line fix that hardens the demo against jsdelivr outages and offline review.

### 7.2 Catalog ids vs. data layer (latent BUG-001 cousin)

`demos/v3-converged/catalog.html` uses a hand-written `CATALOG_ITEMS` array (~33 ids) instead of `window.MuseumData.artifacts`. Three of those ids (`da_sheng_pan`, `guoji_zibo_pan`, `yuewang_zhouji_jian`) **do not appear in any of the 5 segment JSON files**, so clicking those cards lands on `artifact.html?id=<id>` → "未找到 该文物" (now graceful, post-BUG-001 fix). But the catalog still **advertises** artifacts that don't exist. This is a content/data mismatch worth fixing.

Verified via Playwright in `routing-bug001.spec.ts` (the random-sample test occasionally lands on these ids and now passes because the "未找到" UI handles them).

### 7.3 Wikimedia photo CDN intermittently blocked

44 console errors from `upload.wikimedia.org` image loads. These are cert errors in this sandbox (egress restricted), but on a real user's machine they'd be sporadic 4xx/5xx. The catalog/artifact pages already fall back to silhouettes when the photo fails, so this is "expected degraded" not a bug.

### 7.4 Color-contrast WCAG fails on every page

92 total nodes across 5 pages fail axe-core `color-contrast` rule. Largely `.art-card-meta` (small grey 10px text on cream) and the time-pillar dynasty labels (low-opacity bronze on cream). Cosmetic but a real a11y gap for portfolio claims.

---

## 8. Time spent (rough)

| Phase | min |
|-------|-----|
| Step 0 — read context (research doc, bug-log, dashboard source) | 6 |
| Step 1 — npm install + browser version dance (chromium-1194 ↔ playwright 1.56) | 10 |
| Step 2 — playwright.config.ts + qa scaffold | 4 |
| Step 3 — 6 specs (16 cases) | 25 |
| Step 4 — Lost Pixel config + diagnose CLI breakage + fallback script | 15 |
| Step 5 — test loops, refine selectors for SVG, isolate env vs real failures | 20 |
| Step 6 — README + this report | 8 |
| **Total** | **~90 min** |

---

## 9. Next manual steps

1. Vendor `d3.min.js` to unblock the 5 D3-dependent pages in offline/CI environments
2. Switch `catalog.html` from hardcoded `CATALOG_ITEMS` to `window.MuseumData.artifacts.map(...)` — same fix pattern as the BUG-001 cure for `artifact.html`
3. Run `npx playwright test` in CI on every PR (config already produces `test-results/results.json` + HTML report)
4. Replace lost-pixel with the `scripts/screenshot-baseline.js` fallback OR upgrade Lost Pixel ≥3.23 when it supports new headless mode
5. Add a non-color-contrast a11y enhancement sweep (bump `.art-card-meta` to `--text-muted` darker shade, etc.)

---

## 10. Acceptance vs. brief

| Brief requirement | Result |
|------|------|
| Install Playwright + Lost Pixel + axe-core | YES |
| Actually run them (not just write configs) | Playwright YES; Lost Pixel CLI NO (broken in env, fallback used) |
| 6 tests written in `qa/tests/` | YES (16 cases) |
| BUG-001 regression test | YES — `routing-bug001.spec.ts`, 3/3 pass |
| Cross-dim wow test | written; skipped in this env (D3 CDN) |
| Phantom button audit | YES — 7 enumerated, false-positives documented |
| Console errors | YES — 0 non-env |
| Axe a11y on 5 pages | YES — 5/5 ran, color-contrast tracked |
| Data integrity (1976, 西周中期, 122 chars, ~277) | YES — 4/4 pass |
| Lost Pixel baseline | YES (via fallback script, 12/12 pages) |
| Markdown report | this file |
| Machine-readable JSON | `audits/d3-runtime.json` |
| README | `qa/README.md` |
