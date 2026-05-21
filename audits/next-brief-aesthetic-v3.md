# Next Iteration Brief: Aesthetic — v3 → v4
**Date:** 2026-05-21
**For:** Next Builder/Designer

---

## What to keep

- **converged.css token system.** `--bg-paper`, `--accent-bronze #a4732c`, `--accent-gold #d4a857`, `--accent-red #a73a2a` — this palette is correct. Do not change these values.
- **Noto Serif SC as the body font.** The product reads scholarly and warm. Do not switch to sans-serif.
- **The silhouette system.** The 12 distinct SVG silhouettes are a significant asset. Keep the `getSilhouette(form_subtype)` lookup pattern; just expand the mapping table.
- **The artifact.html 国宝 halo treatment.** `0 0 30px rgba(212,168,87,.4)` + `0 0 60px rgba(212,168,87,.15)` on the hero image box is the right level of drama for a 国宝 moment. Do not reduce it.
- **The hezun special page dark mode.** The full `#0f0c08` dark + `text-shadow: 0 0 40px rgba(164,115,44,.6)` bronze glow on "宅兹中国" is the product's single strongest aesthetic moment. Protect it.
- **The time-pillar proportional height bars.** The visual rhythm of 商 (tall) → 秦 (tiny sliver) → 西汉 (medium) is immediately legible. Keep this.
- **The pattern SVG icons.** 25 accurate line-drawing icons of real bronze patterns. These are the strongest new creative assets.

---

## What to change

1. **Replace all emoji navigation icons with SVG.** The `dim-entry-icon` on index.html (⏳ 🗺 🌿 🏺 🛕 👤 📚) must become actual SVG icons. Use the pattern/silhouette aesthetic (thin stroke, line-drawing, bronze color). Alternatively: use simplified versions of the silhouettes relevant to each dimension (e.g., 方鼎 silhouette for "图鉴", a clock/pillar for "时代柱").

2. **Fix the geo page map polygon.** The current 24-point polygon reads as programmer geometry. Add at minimum: Bohai Gulf indent (east coast), recognizable southwest, Taiwan island as a separate `<path>`. Trace the Yellow River from Gansu eastward through the bend and to the sea. Trace the Yangtze from Sichuan eastward. This is traceable work, not cartography expertise. Target: 80-120 polygon points for the outline, 10-15 points per river. Accept that it will still be a simplified map — but it must be recognizable as China at 520px.

3. **Remove the event bus debug panel from me.html visible UI.** Move `#bus-debug-panel` and `#bus-debug-toggle` behind a dev flag (e.g., only show if `?dev=1` in URL params). The me.html profile page should tell the user's story, not expose wiring.

4. **Map the missing silhouettes.** In `getSilhouette()` in both `catalog.html` and `artifact.html`, add:
   - `'人像': 'sanxingdui_dali_ren'`
   - `'面具': 'sanxingdui_zongmu'`
   - `'灯': 'changxin_gongdeng'`
   - `'量器': 'fangding'` (acceptable approximation)

5. **Name the three 国宝 halo tiers in converged.css.** Currently: catalog uses `.art-card.treasure` (8px glow), shared `.rarity-treasure` class (12px), artifact hero (30+60px inline). Add explicit CSS comments and a third class `.rarity-hero` with the 30/60px values, so the next developer doesn't invent a fourth tier.

---

## What to add

- **One decorative element on the dim-entry cards.** Currently the cards are bare white with bronze hover. Add a thin `var(--accent-bronze)` left-border bar (3-4px) to the active/hover state — this is the `section-title::before` pattern already in converged.css, applied to cards.
- **A pattern icon as the "纹饰树" dimension entry icon.** The 饕餮纹 SVG is the most recognizable cultural symbol in the entire asset library. Use it as the icon for the pattern-tree nav entry instead of 🌿.
- **Subtle paper texture on the hero.**  The index hero currently has two `radial-gradient` glow orbs (bronze + red) on the dark background. Add a very faint `background-image: url("data:image/svg+xml,...")` noise SVG at `opacity: 0.03` to give the dark surface micro-texture. This prevents the hero from reading as flat CSS gradient.

---

## Specific actionable instructions for the next Builder/Designer

1. In `index.html` line 128: change `dim-entry-icon` emoji strings to `<img src="../../assets/silhouettes/fangding.svg" ...>` etc. per dimension. Style with `filter: invert(0) sepia(1) saturate(0) hue-rotate(0) brightness(0.4)` on light background to get a bronze-ish line icon.

2. In `geo-system.html` `chinaOutline` array: replace the current 24 points with a 90-point polygon that traces recognizable Chinese geography. The key shape markers are: (a) northeast concave coast, (b) Bohai Gulf dent at roughly `[0.60, 0.28]`, (c) southeast coast curvature, (d) Taiwan as separate small `<path>`. Yangtze should cross at roughly y=0.45 through the middle third of the map.

3. In `me.html`: wrap the entire bus debug card in `if (new URLSearchParams(location.search).get('dev') === '1') { ... }` before appending to DOM.

4. In `getSilhouette()` in both `catalog.html` and `artifact.html`: add the four form mappings listed above under "What to change."

5. In `converged.css`: add after `.rarity-treasure { ... }`:
   ```css
   /* Tier 3: artifact hero full treatment */
   .rarity-hero-image {
     box-shadow: 0 0 30px rgba(212,168,87,.4), 0 0 60px rgba(212,168,87,.15);
     border: 2px solid var(--accent-gold);
   }
   ```
   Then replace the inline style in `artifact.html`'s `.artifact-image-box.treasure` with this class.

---

## What success looks like next round

- Open geo-system.html: a visitor immediately recognizes the shape as China, not a geometry exercise.
- Open index.html: the 7+1 dim-entry grid has SVG icons that feel culturally coherent with the product; no emoji.
- Open me.html: a clean profile page with no debug panel visible.
- Open catalog.html, filter to 三星堆 site: 三星堆大立人 and 纵目面具 show their own unique silhouettes (human figure, frontal mask), not a 方鼎.
- The visual bar from artifact.html to hezun special page still holds as the two peaks of the experience.

---

## Open questions for the user

1. **Emoji icons:** Should we use custom SVG line icons (requires more design work) or adapt existing silhouettes as dim icons? The latter is faster but slightly unusual.
2. **Geo map fidelity target:** Is a hand-drawn simplified polygon acceptable if it reads as China, or does the user want real topographic quality (which requires either a TopoJSON file or a designer spending 4-6 hours on the path)? The current solution is clearly not at either bar.
3. **Debug panel:** Should the event bus debug be removed from the demo entirely, or kept as a dev-mode URL param feature (useful for showing to technical interviewers)?
4. **Purpose-scene page:** Is the current vessel-slot drag-and-drop interaction rendering correctly with silhouettes? This page's aesthetic quality is hard to assess from markup alone — needs a browser render to confirm the silhouettes are loading and the dark scene reads as intended.
