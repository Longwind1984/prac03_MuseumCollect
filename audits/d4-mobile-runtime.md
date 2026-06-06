# d4 Mobile Runtime Audit — v4.6 Retrofit 后的 12 页全审

> 2026-05-22 · Runtime Auditor persona / main thread direct
> Trigger: v4.6 mobile retrofit (commits dec08f2 → 3217799)
> Test rig: Playwright 1.56 + Chromium with iPhone-class mobile flags
> Total: 28/28 tests pass (16 prior + 12 new mobile-viewport regression)

---

## TL;DR

| 度量 | Pre-retrofit | Post-retrofit (v4.6) |
|---|---|---|
| Pages reporting `innerW == 375` | 2/12 (dashboard, inscription-hezun) | **12/12** |
| Pages with horizontal-scroll bleed | 10/12 | 0/12 |
| Tap targets ≥ 44px (WCAG 2.5.5) | inconsistent | enforced via mobile CSS block |
| BUG-001 routing | regressed Q1 | **fixed** (auto-test守护) |
| Dashboard 3-component co-occurrence | desktop-only(横向 grid)| **mobile vertical stack** + horizontal artifact-cards strip |
| catalog grid | desktop auto-fill 4-col | **mobile 2-col 小红书 style** |
| Real GeoJSON in maps | inline 17-coord polygons | **B1 phase real GeoJSON** (d3.geoConicEqualArea) |
| Playwright tests | 16 (pre-v4.5) | **28** (12 mobile regression added) |

---

## 1. Mobile viewport audit

Test rig:
```
viewport: { width: 375, height: 667 },
deviceScaleFactor: 2,
isMobile: true, hasTouch: true,
userAgent: iPhone CPU iPhone OS 14_0
```

12 v3-converged pages all report:
- `window.innerWidth == 375`
- `document.documentElement.scrollWidth == 375`
- `document.body.offsetWidth == 375`

Asserted by `qa/tests/mobile-viewport.spec.ts` (12 cases, all green).

### Root-cause analysis pre-fix

Pre-fix: 11/12 pages reported `innerW: 502-1266`. Browser auto-scaled viewport up because `top-nav` element overflowed:
- nav-brand (40px) + 11 nav-links (~720px) + nav-actions (160px) = ~920px content
- viewport meta `width=device-width` set 375, but content overflow → browser uses content as effective viewport, scales down to 375 physical px
- Result: every page rendered at desktop sizes, then squished to ~44% scale → effectively unusable

### Fix architecture

**Single source**: `demos/v3-converged/css/converged.css` `@media (max-width: 768px)` block. No HTML edits to 11/12 pages.

Key rules:
1. **Hard guard against horizontal scroll**: `html, body { overflow-x: hidden; max-width: 100vw; }` — clip any overflowing SVG / wide flex rather than zoom viewport
2. **Nav horizontal scroll**: `.nav-links { overflow-x: auto; flex-wrap: nowrap }`. nav-actions hidden.
3. **Tap targets**: `button, .btn, a.button { min-height: 44px }`
4. **Inline grid override**: `[style*="grid-template-columns"]:not(.dashboard-layout):not(.catalog-grid) { grid-template-columns: 1fr !important }` — reaches inline-styled grids across 13 pages
5. **SVG responsive**: `svg[width] { max-width: 100% !important; height: auto !important }` with dashboard exemptions
6. **Hero typography**: `h1[style*="font-size:52px"] → 34px`, `[style*="padding: 60px"] → 32px 12px`

Page-specific:
- `dashboard.html` `.dashboard-layout`: 2-col grid → vertical flex (time-pillar 360 / map 280 / panel stack)
- `catalog.html` `.catalog-grid`: auto-fill 4-col → fixed 2-col with 180px img cap (小红书 style)
- `inscription-special-hezun.html` `.char-reveal`: 80×80 / font 48 → 50×50 / font 30 (6 cols × 21 rows vs 4 × 31, less sparse)

---

## 2. Test coverage matrix

| Spec | Cases | Status | Notes |
|------|-------|--------|-------|
| routing-bug001 | 3 | ✅ | BUG-001 守护:random 5 catalog cards do not all fall back to 后母戊鼎 |
| data-integrity | 4 | ✅ | 1976 / 西周中期 / 122 chars / 277 records |
| console-errors | 1 | ✅ | 0 non-env errors across 12 pages |
| dead-buttons | 1 | ✅ | 7 phantoms enumerated, JS listeners verified |
| axe-a11y | 5 | ✅ | only color-contrast P2 violations (92 nodes, tracked) |
| cross-dim-dashboard | 2 | ✅ | 商 hover + 西周 click-lock (d3 vendored, no skip) |
| **mobile-viewport** | **12** | ✅ | NEW v4.6 — every page fits 375 |

Total: **28/28 passed, 0 failed, 0 skipped** (run time ~58s)

---

## 3. Real findings still open (P1/P2 backlog)

| ID | Severity | Description |
|----|----------|-------------|
| WCAG-color-contrast | P2 | 92 color-contrast violations across 5 pages (mostly low-contrast bronze accents on cream bg). Tracked in axe-a11y test annotations |
| time-pillar.html SVG | P2 | mobile auto-scales SVG to 100% width but internal layout is desktop-oriented. v5 mobile-first should render time-pillar as vertical timeline strip native to mobile |
| caster-profile.html force-graph | P2 | 10 nodes + 7 links in d3.forceSimulation at fixed 700×420 viewBox. mobile sees scaled-down version with overlapping nodes |
| pattern-tree.html | P2 | d3 tree layout assumes wide horizontal canvas |
| Mobile touch gestures | P3 | no pinch-zoom on map / no swipe-collect / no haptic feedback. v5 scope |
| DEFERRED-002 残余 | P2 | true mobile-first rebuild (Taro / 小程序 portage) is v5-defined work |

DEFERRED-001 (real GeoJSON) — **fully closed** in this session.

---

## 4. Performance notes

- d3 now vendored at `assets/vendor/d3.v7.min.js` (274K). No CDN dependency, no offline failure.
- GeoJSON fetch (geo-system): 7 files × 6-22K each = ~70K total, parallel Promise.all. Negligible impact.
- Mobile CSS additions: ~125 lines in converged.css. No runtime cost beyond browser layout.

---

## 5. Process meta-finding

**The v4.6 sprint validates §5.7 thesis ("audit squad audited itself")**:
- v4.5 Playwright suite found d3 SPOF + catalog stale IDs + dashboard click-lock CSS/JS mismatch + a11y scrollable + 3 more issues during the same-day vendor-d3 expansion.
- v4.6 added 12 mobile-viewport tests that immediately turned 11/12 pages from un-shippable to passing.
- **Each retrofit was followed by a Playwright re-run; no regression in 28 cases across 9 commits.**

This is the iterative cycle the v3 audit squad couldn't produce because it was read-only.

---

## Next-iteration brief (for whoever picks this up next)

1. **v5 mobile-first rebuild candidate**: replace SVG-heavy desktop layouts (time-pillar / caster-profile / pattern-tree) with mobile-native renders. Reuse the data, replace the spatial metaphor.
2. **Real users on mobile**: portfolio §5.6 Track C — 5-10 朋友 on mobile, structured interview, measure motivation-hooks KPIs in real mobile conditions.
3. **Touch gestures**: pinch-zoom on map, swipe-to-collect on catalog cards, haptic feedback on key char reveal.
4. **Performance audit**: First Contentful Paint / Largest Contentful Paint on 3G throttle. The 12 demo pages haven't been measured.
5. **CI integration**: GitHub Actions to run `qa/` Playwright on every PR; visual regression via Lost Pixel once `--headless=old` upstream bug is patched.
