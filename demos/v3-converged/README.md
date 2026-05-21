# MuseumCollect v3 Converged Demo

## Component Spec → Page Mapping

| Component Spec | Implemented In | Notes |
|----------------|---------------|-------|
| `time-pillar.md` (B3) | `time-pillar.html` | D3 vertical pillar, true-proportion heights, dynasty colors, event markers, era-focus emit |
| `geo-system.md` (B1) | `geo-system.html` | D3 SVG map, era overlay switch, excavation/museum/overseas triple view, listens era-focus |
| `pattern-tree.md` (B2) | `pattern-tree.html` | D3 SVG tree, 25 SVG icons from assets/patterns/, era-focus listener highlights nodes |
| `inscription-reader.md` (B4) | `inscription-reader.html` + `inscription-special-hezun.html` | Char-by-char hover, rank display, caster mini-card popup |
| `purpose-scene.md` (B4) | `purpose-scene.html` | 5 ritual scenes, slot fill, rank-level auto-detection |
| `caster-profile.md` (B4) | `caster-profile.html` | D3 force-directed graph, biography cards, listens caster-focus |
| `rarity-halo.md` (global) | All pages via `css/converged.css` | .rarity-treasure / .rarity-first / .rarity-second classes |
| `shape-pokedex.md` (B4) | `catalog.html` | Pokédex form tree, filter chips, grid with silhouettes |

## Event Bus Wiring

Event bus (`../v3-shared/time-pillar/event-bus.js`) is loaded or polyfilled on all cross-dim pages:
- `time-pillar.html` — EMITS `era-focus`
- `geo-system.html` — LISTENS `era-focus`, EMITS `era-focus` (slider)
- `pattern-tree.html` — LISTENS `era-focus`
- `catalog.html` — LISTENS `era-focus`
- `inscription-reader.html` — EMITS `caster-focus`
- `caster-profile.html` — LISTENS `caster-focus`, EMITS `era-focus`
- `me.html` — debug panel shows all events, test buttons
- `scan.html` — EMITS `era-focus` on result

Cross-dim wiring module: `js/cross-dim-wiring.js` — loaded on all pages, provides `window.CrossDimWiring.emitEra()`.

## Visual Design Choices

- **A's scholarly spine**: Noto Serif SC, 米黄 (var(--bg-paper): #f7f2e8), 朱砂 red accents
- **C's polish**: sticky top nav, card grid catalog, rounded corners, soft shadows
- **B's flourishes**: poetic captions (`.poetic-caption`), dark hero sections, inscription long scroll
- **Bronze accent** `#a4732c` throughout

## Anti-Skinner Compliance (v3)

- `me.html`: NO stacked "差N件解锁X" panels. Shows honest 35/277 count, implicit titles derived from actual collection
- No fake 90%+ completion bars. Real percentages only.
- Titles are implicit (derived, not displayed as progress targets)
- At most 1 "almost there" callout per page (none on me.html)

## Mock State

- 35 of 277 artifacts collected (see `js/state.js`)
- Distributed across: 夏×1, 商×10, 西周×8, 春秋×4, 战国×5, 秦×2, 西汉×3, 东汉×2
- Dominant form: 方鼎 → derived title "方鼎专家"
- Inscription rank: 入门 (85 chars recognized)

## What is Stubbed / Deferred to v4

- Mobile responsive layout (explicitly deferred per spec)
- Real GeoJSON terrain loading (geo-system uses SVG polygon approximation)
- Actual data-loader.js fetching all 277 records (loads fine but catalog shows 33 mock items for speed)
- 4× zoom to king-era level in time-pillar
- Craft long scroll (工艺工序长卷) — reduced to craft chips on artifact.html
- Real image URLs (uses silhouette SVGs only)
