# Aesthetic Audit: v3-converged — Day 2
**Date:** 2026-05-21
**Auditor role:** Senior designer with taste. Has seen 故宫文创, SFMOMA app, 字节 design system, Tate digital. First question on any screen: does it deserve "国宝"?

---

## Demos reviewed
- `demos/v3-converged/` (12 pages: index, catalog, artifact, time-pillar, geo-system, pattern-tree, inscription-reader, inscription-special-hezun, purpose-scene, caster-profile, me, scan)
- `demos/v3-converged/css/converged.css`
- `assets/silhouettes/*.svg` (12 files)
- `assets/patterns/*.svg` (25 files)
- Prior: `audits/d1-aesthetic.md`

---

## Snap impressions (one paragraph per page cluster)

**Index / Nav spine (index.html)**
The hero reads as a dark bronze band: `#1a1510` background, `#d4a857` gold accent for the headline "金色记忆", three CTA buttons in a row. The typography is Noto Serif SC 700, 52px — confident and appropriately weighty. The stats column (277 / 195 / 35/277) floated to the right is the single most visually impressive gesture on this page. It turns raw data into a kind of altar dressing. The 7+1 dimension grid below uses white cards with bronze hover, and the three "今日推荐" featured cards use the same dark gradient — this creates a clear dark/light rhythm: dark hero, light grid, dark featured, light progress band, dark footer. **The rhythm holds.** What does not hold: the dim-entry cards use emoji icons (⏳ 🗺 🌿 金 🏺 🛕 👤 📚) as their "icon" element. On a product that wants to be "国宝"-worthy, emoji icons inside 36px `font-size` blocks are a P1 clash — they look like a Notion page, not a museum system.

**Catalog (catalog.html)**
The silhouettes are now loading from `assets/silhouettes/` and the grid looks genuinely different from v1's blob placeholders. Seeing 方鼎 vs 尊 vs 剑 as distinct shapes inside the same 180px cards is a significant upgrade. The rarity halo (gold border + `0 0 8px rgba(212,168,87,.25)` on `.art-card.treasure`) is restrained — it barely glows, it mostly marks. This is correct: 99% of cards are flat, 1% breathe. **The P0 from v1 is substantially fixed here.** However: the fallback for any SVG error is `<span style='font-size:36px;opacity:.3;'>🏺</span>` — a translucent emoji. This is better than v1's gradient block, but still not a real silhouette. Secondary P1.

**Artifact detail (artifact.html — 后母戊鼎)**
This is the most structurally ambitious page: dark hero with silhouette + chop tags + name + dimensions + collect button, then a 2/1 grid of 11 accordion sections (出土, 形制, 纹饰, 铭文, 用途, 学术地位, 流传年表, 相关器物, 资料来源, 铸主). The 国宝 image box gets `box-shadow: 0 0 30px rgba(212,168,87,.4), 0 0 60px rgba(212,168,87,.15)` + gold border. **Seeing 后母戊鼎 here does feel like seeing a 国宝.** The silhouette (`fangding.svg`) inverted to white on a dark background is recognizable and dignified — a real 方鼎 form, not a blob. The `.rarity-badge` "国之重器" in top-right corner (`var(--accent-red)` background, serif font) is exactly right in scale: small enough to be a footnote, red enough to be a signal. This is the standout page of v3.

**Time Pillar (time-pillar.html)**
The D3 proportional-height dynasty bars are the visual centerpiece of this page. Each bar's height encodes actual duration (商 554 years vs 秦 15 years = the 秦 bar is visibly tiny); the collected-density fill overlays on top as a saturated block; unidentified dynasties breathe at opacity .45-.75. Year-axis ticks (`1750BC` → `220AD`) with dashed gridlines create scholarly grid feel. The side-card shows dynasty detail with a progress bar and mini-artifact list. **This is the most "new" visual in v3 and it earns its place.** The dynasty colors (商 `#4a5a3a` olive-dark, 西周 `#a73a2a` brick-red, 战国 `#7a3a2a` maroon) are distinct enough to differentiate but all low-saturation — no neon. One issue: the event dots on the right side use `var(--accent-red)` circles with 9px label text. At the scale of the pillar these labels (`二里头文明肇始`, `武王伐纣`) crowd each other on the 商 and 西周 bands. This is a density/collision problem that hurts the scholarly feel.

**Geo System (geo-system.html)**
The Builder swapped GeoJSON for D3 polygon. The result: a `chinaOutline` array of 24 hardcoded `[px,py]` pairs traced as a polygon, plus simplified Yellow River and Yangtze as two CatmullRom curves, plus era overlay polygons. **On visual terms, this is the weakest page in v3.** The polygon outline is recognizably "China-ish" but at low resolution it looks like a blob with a dent on the right side. The rivers are two smooth bezier arcs that do not trace any recognizable waterway path. The era overlays (商, 西周, etc.) are simple convex polygons that do not respect actual historical geography. Compare this to what you would see from a real topojson render — the gap is significant. **This did not solve the "cheap geo" problem; it substituted one cheap solution for another.** The background fill (`#f4ebd9` on the map container) and site circles (sized by sqrt(count) * 2.5) are aesthetically fine in isolation. But the map itself is the issue.

**Pattern Tree (pattern-tree.html)**
This page integrates the 25 SVG pattern icons into a D3 tree canvas (900x420px). Each node is a colored circle (r=24) with the pattern SVG embedded via `<image href>`. The icons render as small white-on-color glyphs inside the circles — and they are actually beautiful. The 饕餮纹 icon has proper horn/eye/fang structure. The 凤鸟纹 has long sweeping tail. The 蟠螭纹 is clearly differentiated from 饕餮. The era bands (商/西周/春秋/战国/汉) are faint `opacity:0.04` color washes behind the nodes — present but not distracting. **The pattern icons are the single strongest new asset in v3.** Below the tree, a full 25-icon grid shows all patterns with identified/unidentified opacity states — this is a clean and satisfying "pokedex" display. The icons here are rendered at 24px against white backgrounds with bronze borders for identified ones. At this size the detail is visible and distinctive.

**Inscription pages (inscription-reader.html, inscription-special-hezun.html)**
The standard inscription reader uses a char-cell grid (44x44px, serif 22px characters) with hover tooltips. Recognized characters get `var(--accent-bronze)` color. The dark rank display on the right is a `linear-gradient(135deg, #1a1510, #2a2018)` card — this localized dark-mode panel works because the rest of the page is light paper. The 何尊 long-scroll special page is a full dark-mode experience (`#0f0c08` background). The 64px "宅兹中国" headline gets `text-shadow: 0 0 40px rgba(164,115,44,.6), 0 0 80px rgba(164,115,44,.3)` — this is the one place in v3 where gold glow is fully earned, and it delivers. The char-reveal grid uses 48px characters dimly bronze at rest, brightening gold on reveal with glow. **This page is the aesthetic peak of v3.** It has genuine drama without cheapness.

**Me page (me.html)**
The profile header (dark gradient, bronze avatar with "铜" character, 段位 badge "入门") establishes persona without being juvenile. The "真实进度（无虚假完成率）" section with three honest bars (35/277 = 12.6% for collection) is visually clean and philosophically correct. The implicit titles system in the right sidebar (方鼎专家, 殷商考据者, etc. with basis explanations) is tastefully styled. The mini-time-pillar bar chart in the dim-card is functional but visually redundant — it duplicates the main time-pillar without adding new information. The event bus debug panel in the bottom-right of me.html (dark card with monospace log output) is visually jarring on a user-facing profile page. This should not exist in the demo context of this page.

---

## Critical observations: aesthetic viewpoint

**1. The convergence worked on overall coherence, but the emoji icon problem is a systemic P1.**
Every dim-entry card on index.html uses emoji as icon: ⏳, 🗺, 🌿, 📚, 🛕, 👤. The dim-entry cards are 180px × ~140px tiles — prominent real estate. Emoji at 36px in `font-size` on a "国宝 knowledge universe" product breaks cultural register immediately. These are emoji you would find in a Notion page or a Discord channel. Replace with the actual SVG assets the project now has (silhouettes/patterns for context icons, or purpose-designed line icons for navigation).

**2. The silhouette solution mostly resolves P0 from v1, but the fallback chain is still an emoji.**
The catalog and artifact pages now use `assets/silhouettes/` correctly. Seeing a 方鼎 vs 尊 vs 剑 shape is genuinely meaningful. However, when a silhouette is not available for a form type (e.g., `getSilhouette('人像')` returns `'fangding'` — so 三星堆大立人 renders as a 方鼎 silhouette), and when SVG load fails, the fallback is `🏺` emoji. Both cases are visible in the catalog for the human figure artifacts (三星堆大立人, 三星堆纵目面具). The 大立人 rendering as a 方鼎 silhouette is aesthetically wrong — a standing human figure is one of the most visually distinctive objects in the dataset and it deserves its own silhouette. The `sanxingdui_dali_ren.svg` and `sanxingdui_zongmu.svg` are in the silhouettes folder but are not mapped in `getSilhouette()` in catalog.html.

**3. The geo page is the outstanding aesthetic liability — the polygon "China" is cheap.**
The time-pillar, pattern-tree, and artifact pages all reach a quality bar that could appear in a serious product demo. The geo page does not. A 24-point polygon with two bezier "rivers" does not read as a map; it reads as a programmer's approximation. At the scale of a 520px container, the outline has visible straight edges between points. The era overlays are convex hulls that bear no resemblance to 商/西周/春秋/战国 actual territories. For a portfolio demo, this is the page a recruiter or investor would pause on and say "why does the map look like a geometry exercise?" The fix is not GeoJSON complexity — it is adding 50-80 more carefully placed polygon points and tracing recognizable river paths, which would take 2-3 hours manually.

**4. The 国宝 halo in catalog vs artifact pages has a split personality.**
In catalog.html, a 国宝 card gets: `border: 1.5px solid var(--accent-gold)` + `box-shadow: 0 0 8px rgba(212,168,87,.25)`. Barely visible — intentionally restrained. In artifact.html, the 国宝 image box gets: `box-shadow: 0 0 30px rgba(212,168,87,.4), 0 0 60px rgba(212,168,87,.15)` + gold border. This escalation from catalog (faint hint) to detail page (visible glow) is actually correct design — it mirrors the "approach the object" experience. But the `.rarity-treasure` class in converged.css (used for cards elsewhere) specifies `box-shadow: 0 0 12px rgba(212,168,87,.5)` — brighter than the catalog but dimmer than the artifact page. These three levels need explicit naming and documentation: `rarity-hint` (catalog), `rarity-present` (section view), `rarity-featured` (artifact hero). The inconsistency will confuse the next developer and cause visual drift.

**5. The hezun special page is genuinely excellent and visually distinct from the rest of v3.**
When the whole product uses `--bg-paper: #f7f2e8` light mode, the 何尊 scroll page breaks to full `#0f0c08` dark. This page break is earned — "宅兹中国" is the product's single most important content moment, and giving it a different visual universe is the right call. The 64px bronze-glow headline + char-reveal grid (48px characters, bronze at rest, gold on reveal with glow) is the closest this product gets to a "wow" moment. This page should be the one screenshot in any demo presentation.

**6. The converged style coherence is 85%: not Frankenstein, but has leftover DNA.**
The nav is clean, single serif font (Noto Serif SC), bronze accent, paper background — this is A's spine as planned. The card system (rounded 12px, border-light, shadow-sm hover) is C's polish. B's "poetic captions" appear in two places: `me.html` ("商晚期，是您目前最深耕的年代。") and the pattern-tree subtitle. These are the only B residue and they are correctly small/italic/right-aligned — they do not fight the A/C majority. The one remaining coherence failure is the inline `style` attribute frequency. `artifact.html`, `index.html`, `me.html` are dense with `style="font-size:...; color:..."` inline attributes. This was acceptable as scaffolding but creates visual fragility — a future developer editing inline styles will inevitably introduce off-token colors.

---

## Things missing that I expected

- **A true placeholder silhouette for human-figure artifacts.** The product has `sanxingdui_dali_ren.svg` in the silhouettes folder but catalog.html does not map it. Three star artifacts (三星堆大立人, 三星堆纵目面具) get a 方鼎 silhouette — wrong shape, wrong culture.
- **A map with recognizable topography.** Even a 150-point polygon with proper coastal outline, Bohai bay indent, Taiwan, and accurately traced Yellow/Yangtze rivers would read as "China" unambiguously.
- **A system for nav overflow.** At 1024px width, the 9 nav links + logo + 穿越模式 button span does not wrap gracefully. On a laptop at 80% zoom this would overflow.
- **Visual density cues on the purpose-scene page.** What I saw in the 80-line excerpt showed a dark scene container with dashed vessel slots. This page's aesthetic depends heavily on whether the vessel silhouettes rendered in the slots are recognizable. The drag-source items using `assets/silhouettes/` images is positive — but the page felt texturally thin.

---

## Things present that don't earn their place

- **The event bus debug panel on me.html** (`#bus-debug-panel`) is embedded visibly in the right column with test buttons labeled "TEST: 商", "TEST: 西周". This is scaffolding that should be hidden behind a dev-mode toggle, not presented as a first-class card. It breaks the user-profile page's narrative.
- **The `stat-num` Noto Serif SC font on the hero stats column.** `font-family: 'Noto Serif SC', serif` on `font-size: 36px; font-weight: 700` numbers looks correct for "277" and "195". But "35/277" with `<span style="font-size:18px; color:#666;">` for the denominator is typographically inconsistent — the denominator style is inline with a hex color that is not part of the token system.
- **The repeating-linear-gradient "hatched bronze mesh" behind purpose-scene.** `background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(164,115,44,.05) 10px, rgba(164,115,44,.05) 11px)` at 5% opacity is invisible in practice. If it is meant to evoke a bronze texture, it needs to be at least 8-10%. If invisible, remove.
- **The `dim-entry-icon` emoji system.** Already flagged above as P1, but also: the icon "金" for the inscription dimension is a single Han character, not an emoji. This inconsistency (emoji vs Chinese character as icon) within the same grid is a subtle incoherence.

---

## Severity ranking

### [P0 — visual liability that could kill a demo]
1. **Geo page D3 polygon map.** At 520px height, the 24-point polygon with straight visible edges reads as programmer geometry, not a map. Any recruiter/investor/journalist seeing this in a portfolio will question the design standard of the entire demo. This is the only P0.

### [P1 — breaks the visual register]
2. **Emoji icons (⏳ 🗺 🌿 🛕 👤 📚) as dim-entry navigation icons on index.html.** On a 国宝-level cultural product, these are tonally wrong. Every other dimension has custom SVG assets; the navigation layer should not use OS emoji.
3. **Wrong silhouette for 三星堆大立人 / 纵目面具.** These are the most visually distinctive artifacts in the catalog. Showing them as 方鼎 silhouettes is factually and aesthetically wrong.
4. **Event bus debug panel visible on me.html.** This is a developer tool in a user-facing profile page. It destroys the page's narrative on first glance.
5. **SVG fallback to `🏺` emoji.** Better than v1's gradient block, but still not acceptable for a premium product demo.

### [P2 — polish to earn "国宝" taste bar]
6. **Three-tier 国宝 halo inconsistency** (catalog 8px vs converged.css 12px vs artifact.html 30+60px). Name the tiers explicitly in CSS.
7. **Event label collision on time-pillar** (商/西周 dynasty bands have dense overlapping 9px event text on the right side).
8. **Inline style proliferation** across artifact.html, me.html, index.html — these should be tokenized before any v4 work.
9. **Purpose-scene hatched background at 5% opacity** (invisible; either raise to 8%+ or remove).
10. **Nav overflow at <1200px width** — 9 links + logo + toggle will collide.

---

## v3 vs v1: net aesthetic assessment

| Dimension | v1 best | v3 |
|-----------|---------|-----|
| P0 image supply chain | Not fixed (C blob, B gradient) | **Fixed for ~90% of catalog** (real silhouettes) |
| 国宝 visual weight | C best, B risky | **Artifact.html is the best yet** — 国宝 feels like 国宝 |
| Geo page | All three versions had cheap geo | **Still cheap**, different technique |
| Typography / font | A was the gold standard | **Maintained** (Noto Serif SC, consistent token system) |
| Coherence | A single-hand, B/C slightly Frankenstein | **85% coherent** — one shared CSS, one consistent palette |
| Pattern icons | None (v1 had zero SVG icons) | **New asset, genuinely strong** |
| Silhouettes | None (v1 C had generic blob) | **Strong, with 3 mapping gaps** |
| Hezun special page | B was the only "wow" page | **Hezun scroll is v3's standout** |
| Bronze color usage | C tasteful, B overused | **Tasteful in v3** — accent not accent-everything |
| Navigation | A: all three were adequate | **Sticky nav is cleaner than all v1 versions** |
| Emoji on nav | Not present in v1 | **New regression — P1** |
| Debug UI on me.html | Not present in v1 | **New regression — P1** |

**Overall:** v3 is a genuine upgrade over v1 in the supply chain (silhouettes/patterns) and in systemic coherence. The artifact detail page and hezun scroll page are the two strongest aesthetic moments in the entire project's history. The geo page is a persistent liability. The two new regressions (emoji icons, debug panel) are fixable in under an hour.

**Rank v3 vs v1-A/B/C:**
v3 sits above v1-C and below v1-A in aesthetic ambition, but above both in completeness. v1-A's scholarly rigor was never matched in v3 (Noto Serif SC is a fine choice but not as considered as A's four-font hierarchy). v1-B's cinematic peak (宗庙之夜 purpose-scene) is matched by v3's hezun scroll page. v3's systemic coherence is the best of any version to date.

---

*Auditor: aesthetic*
*Cold context: yes*
*Date: 2026-05-21 D2*
