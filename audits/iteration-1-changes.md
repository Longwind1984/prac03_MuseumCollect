# Iteration 1 — Audit Close-Loop Evidence

> Builder-iterator-v2 · 2026-05-20 H10
> Spec: merged-spec.md TL;DR + §"Confidence and recommendation for tonight"
> Goal: prove the audit→brief→builder close-loop is real, not a PPT claim.

## What triggered this iteration

- **Comparative Auditor** `merged-spec.md` §"Confidence and recommendation for tonight" — flagged silhouette SVG set as "single highest-ROI fix tonight, hits 4 Auditors' P0 simultaneously".
- **PM Auditor** V1 P0 — "tonight 必须有 close-loop 证据兑现 ... 不能 5 audit + 1 merged-spec 写完 + 用户睡着 + 没人 ship 任何东西".
- **5/5 Auditors** flagged image supply chain as P0/P1: Aesthetic [P0-cheap-1, P0-cheap-2], UX [P1], Content [P0 三星堆图], Motivation (implicit, K-factor 归零), PM [Q5].
- **Content Auditor** §6 P0 — 4 hard factual errors (li_gui病句 / 尊盘 taxonomy / 后母戊纹饰 / 三星堆图错位).

## Changes shipped

### Content P0 fixes (4 of 4)

| File | Line/loc | Before | After | Audit citation |
|---|---|---|---|---|
| `demos/v1-B-immersive/js/data.js` | li_gui voice line 60 | `"那一年, 我被一位叫'利'的将领的器物——他参加过武王伐纣"` (病句, "我被…的器物" 不成话) | `"那一年, 我属于一位叫'利'的将领——他参加过武王伐纣"` | Content §6 P0 (line 219) |
| `demos/v1-C-explorer/js/state.js` | GENEALOGY 酒器 → 尊盘 | "尊盘" 作为顶级 type 与 "尊" 并列, 子 "尊盘组合" | "尊盘组合(复合器)" 作为 "尊" 的 subtype, 标记 `composite: true`, 加 `note: "尊置于盘中, 曾侯乙尊盘为代表; 盘亦在水器维度参见"` | Content §6 P0 + §3.3 P1; merged-spec §"Per-component"·form-genealogy |
| `demos/v1-C-explorer/js/state.js` | GENEALOGY 食器 → 簋 | "簋" 只有"方座簋" 1 个 subtype | 加 "四耳簋"、"附耳簋" 2 个 subtype (members 留空, 标记 v1 demo 未收) | Content §6 P1 |
| `data/curated/bronze-treasures-v1.json` | houmuwu_ding patterns | `["饕餮纹", "夔龙纹", "云雷纹", "虎噬人头纹", "蝉纹"]` (虎纹和饕餮平级) | (a) 原 `patterns` 数组保留向后兼容, 改 `"虎噬人头纹"` → `"虎噬人头纹(耳)"`; (b) 新增 `patterns_structured: { main: ["饕餮纹"], secondary: ["夔龙纹","云雷纹"], local: ["虎噬人头纹(耳部装饰)","蝉纹"] }` | Content §5.3 P0 |
| `data/curated/bronze-treasures-v1.json` | sanxingdui_zongmu_mianju image_urls | `https://...Bronze_head_from_Sanxingdui.JPG` (caption 自承 "严格说该具体文件是青铜头像而非纵目面具") | URL=null, source/license=TODO, caption 改为 "原文件经核 = 青铜头像,非纵目面具,已下线...v2 sprint 1 用 silhouette 兜底", 加 `todo` 字段 | Content §2.7 P0; merged-spec §Content corrections (4) |
| `demos/v1-B-immersive/js/data.js` | imageUrlFor map: sanxingdui_zongmu_mianju | wikipedia thumb URL pointing to head, not mask | `null` + 解释注释; B image fallback chain now uses silhouette | Content §2.7; merged-spec content fix #4 |

### Visual assets created (12 silhouette SVGs)

All under `/home/user/prac03_MuseumCollect/assets/silhouettes/`, viewBox `0 0 100 100`, single bronze color (`#a4732c`), well-formed XML (validated via xmllint), recognizable shapes (verified via Playwright screenshot of v1-B me.html).

| File | What it depicts | Used for which artifacts |
|---|---|---|
| `fangding.svg` | Square-mouth four-leg ding (2 vertical ear handles, 4 legs visible) | houmuwu_ding |
| `yuanding.svg` | Round-bowl three-leg ding (2 ear handles, 3 cylindrical legs) | da_yu_ding, da_ke_ding, maogong_ding, zilong_ding (+ form_subtype "鼎" catch-all) |
| `xiao_zun.svg` | Owl-shape zun (2 pointed ear tufts, round head + body, 2 feet) | fuhao_xiaozun (+ form_subtype "鸮") |
| `fang_zun.svg` | Square zun with flared mouth + 2 ram-horn shoulders | siyang_fangzun, he_zun, zenghouyi_zunpan, siyangshou_bu (+ form "尊") |
| `sanxingdui_zongmu.svg` | Mask with cylindrical protruding eyes + flared wing-ears + slot mouth | sanxingdui_zongmu_mianju (replaces deleted bad image) |
| `sanxingdui_dali_ren.svg` | Standing figure: conical headdress, extended arms, layered robe, pedestal base | sanxingdui_dali_ren, sanxingdui_shenshu, matafeiyan, qin_tongchema |
| `yuewang_jian.svg` | Vertical sword: pommel disc + ribbed handle + guard + pointed blade | yuewang_goujian_jian (+ form "剑") |
| `changxin_gongdeng.svg` | Kneeling palace servant with raised left arm holding lamp shade | changxin_gongdeng (+ form "灯") |
| `gui.svg` | Round bowl with 2 ear-handles + square pedestal base (方座簋) | li_gui (+ form "簋") |
| `bianzhong.svg` | Single chime bell: hanging loop + scalloped bottom + decorative bumps | zenghouyi_bianzhong (+ form "钟") |
| `pan.svg` | Broad shallow basin with flared rim + ring foot | sanshi_pan, guoji_zibai_pan, shangyang_fangsheng (+ form "盘") |
| `fanghu.svg` | Square pot with lotus-petal lid + standing crane on top + side handles | lianhe_fanghu, cuojin_boshanlu, longxing_gong (+ form "壶") |

12 SVGs > the 8 stated as priority. Each is a single solid-color path (or compound), single fill color, no fancy detail. **Beats the prior placeholder (椭圆 blob) on the recognizability axis flagged by Aesthetic Auditor P0-cheap-2.**

### Wiring changes

| Demo | File | Change |
|---|---|---|
| **v1-C-explorer** | `js/state.js` | Added `SILHOUETTE_BY_ID` map (25 artifacts), `silhouetteKeyFor(a)` (id-first, form_subtype keyword fallback), `silhouetteFillFor(a)` (rarity tint), `precacheSilhouettes()` async loader; rewrote `placeholderSvg(a)` to inline cached SVG body (stripped from outer `<svg>` tag) into the 200×240 placeholder w/ rarity-tinted fill via regex `replace(/fill="#a4732c"/g, fill)`. `load()` now awaits `silhouettesReady` so consumers (catalog.html, me.html, artifact.html, scan.html, time-pillar.html, ancient-map.html, form-genealogy.html, index.html — all 8 pages) get fully-rendered silhouettes when they call `MC.placeholderUrl(a)`. |
| **v1-B-immersive** | `js/data.js` | Added `SILHOUETTE_BY_ID` map (same 25 artifacts), `silhouetteKeyFor(a)` (same fallback logic), `silhouetteUrl(a)` returns `../../assets/silhouettes/{key}.svg`. Exported 3 new symbols. Also nulled `sanxingdui_zongmu_mianju` image URL (per Content P0). |
| **v1-B-immersive** | `js/ui.js` | Rewrote `imageOrPlaceholder(artifact, opts)`: silhouette SVG `<img>` is now layered behind the (still-present) wikimedia `<img>`. When wikimedia loads, the silhouette is hidden via onload handler (`prev.style.display='none'`). When it 404s, silhouette stays visible. When `imageUrlFor` returns null, only silhouette renders. Either path = no more gradient block. |
| **v1-B-immersive** | `css/immersive.css` | Softened `.bronze-placeholder` background gradient (was a strong radial+linear, now subtle) and moved `::before` name label from full-overlay center to bottom 8px caption strip. This stops the name label from drowning the new silhouette. |
| **v1-A-textual-research** | (skipped intentionally) | A's `thumb-box` is an empty rectangular outline = part of A's scholarly "待补" restraint. Adding silhouettes would dilute A's wins as Auditor-judged best aesthetic. Documented as deferred. |

## Verification

- [x] Each silhouette SVG opens in browser (`curl http://localhost:8123/assets/silhouettes/{name}.svg` = 200 for all 12)
- [x] All 12 SVGs are well-formed XML (xmllint passes)
- [x] v1-C catalog.html now shows differentiated shapes — Playwright found 22 placeholder cards rendering, sample SVG contains the actual fangding path (`M 24 14 L 24 26 ... Z`) not the prior `<ellipse rx="68" ry="84">` blob
- [x] v1-B me.html has all 12 owned-artifact placeholders wired to correct silhouette files (Playwright extracted `img[src*=silhouettes]` from each `.bronze-placeholder`, all 12 hit correct file: fangding/xiao_zun/sanxingdui_dali_ren/gui/fang_zun/fanghu/yuewang_jian/changxin_gongdeng)
- [x] All 4 content P0 errors fixed and verified:
  - li_gui voice no longer contains "我被一位叫" (病句), now contains "我属于一位叫" (fix)
  - 尊盘组合 is now a child of `尊`, not a top-level type peer; `composite: true` flag added
  - houmuwu_ding `patterns_structured` exists with hierarchical main/secondary/local separation; flat `patterns` array preserved for backward compat
  - sanxingdui_zongmu_mianju image_urls[0].url = null, source/license = TODO
- [x] No new JS errors introduced — Playwright `pageerror` listener clean on both C/catalog and B/me.html (pre-existing CDN cert-authority errors and D3 load 404 in form-genealogy.html are unrelated to this iteration)
- [x] state.js still loads in a vanilla Node sandbox (exports 21 symbols, silhouetteKeyFor resolves all test cases correctly including form_subtype fallback)
- [x] bronze-treasures-v1.json still valid (25 artifacts, all required fields parse)

## Time taken

- Context loading + spec reading: ~10 min
- Content P0 fixes (4 sites, multi-file): ~15 min
- Silhouette SVG generation (12 files, hand-coded path geometry): ~45 min
- Wiring changes (C state.js + B data.js + B ui.js + B css): ~25 min
- Playwright verification + screenshot review + currentColor→hardcoded-fill fix: ~15 min
- This iteration report + state.md append: ~10 min
- **Total: ~120 min** (within the 2-hour stated budget; Tasks 1+2+3 all done)

## What was deferred (out of tonight's scope)

- **A 的 thumb-box silhouette wiring** — Skipped per brief's "if unsure, SKIP A" guidance. A's empty thumb-box is a purposeful scholarly "待补" visual. Add silhouettes there would dilute A's aesthetic wins; decision documented for D2 discussion.
- **断代依据 (dating_evidence) schema** — Content Auditor §4.1 P0 missing, but a schema task is Researcher domain per brief's "What you must NOT do" list. Deferred to v2 sprint 1 product-owner pass.
- **JINWEN_DICT 扩展 20→200 字** — Out of Iter 1 scope; depends on content depth + product-owner sign-off (merged-spec §"v2 sprint 2-3").
- **B hero 区诗化文案削减** — Aesthetic [P0-cheap-3] not in this iter's scope (was content+visual only, not editorial copy decisions).
- **C me.html anti-Skinner cleanup** — Motivation [P0] biggest fix but would touch 100+ lines and re-layout; deferred to a separate `builder-motivation-fix` iteration per merged-spec recommendation.
- **Refinements to two SVGs** — `xiao_zun.svg` has leftover zero-opacity eye circles that don't contribute; `changxin_gongdeng.svg` lamp shade could be slimmer. These are visible-but-not-broken; pass Aesthetic gate but a designer should polish in D3+.
- **Tinting per-rarity in B's `<img src>` path** — currently the SVG fill is hardcoded bronze `#a4732c`. C inlines the SVG and can per-rarity-tint via regex on cached body. B uses `<img>` and gets static color (any user-side CSS can't reach into svg DOM). Acceptable for iter-1.

## Files touched (absolute paths)

```
created:
  /home/user/prac03_MuseumCollect/assets/silhouettes/fangding.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/yuanding.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/xiao_zun.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/fang_zun.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/sanxingdui_zongmu.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/sanxingdui_dali_ren.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/yuewang_jian.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/changxin_gongdeng.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/gui.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/bianzhong.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/pan.svg
  /home/user/prac03_MuseumCollect/assets/silhouettes/fanghu.svg
  /home/user/prac03_MuseumCollect/audits/iteration-1-changes.md  (this file)

modified:
  /home/user/prac03_MuseumCollect/demos/v1-B-immersive/js/data.js  (li_gui voice, silhouette map+helpers, null sanxingdui image)
  /home/user/prac03_MuseumCollect/demos/v1-B-immersive/js/ui.js    (imageOrPlaceholder layers silhouette beneath wikimedia)
  /home/user/prac03_MuseumCollect/demos/v1-B-immersive/css/immersive.css  (softened bronze-placeholder gradient + repositioned name label)
  /home/user/prac03_MuseumCollect/demos/v1-C-explorer/js/state.js  (taxonomy: 尊盘 + 簋; silhouette helpers; placeholderSvg rewrite)
  /home/user/prac03_MuseumCollect/data/curated/bronze-treasures-v1.json  (houmuwu_ding patterns; sanxingdui_zongmu_mianju image_urls)
```

## Audit-citation evidence chain

Every change has a direct line citation in audit files. If a future reviewer asks "why was this changed", the cite-trail is:
- **Silhouette set existence**: merged-spec.md §"Confidence and recommendation for tonight" → "首选: 生成 silhouette SVG 套" → cites Aesthetic [P0-cheap-1, P0-cheap-2] + UX [P1] + Content [P0 三星堆图] + Motivation 隐式 + PM [Q5]
- **li_gui病句**: d1-content.md §2.5 "P1 文案错误" + §6 "P0 factual error"
- **尊盘 taxonomy**: d1-content.md §3.3 "❌ P1 形制 taxonomy 错误" + §6 P0
- **后母戊 patterns**: d1-content.md §5.3 "后母戊鼎纹饰列表" + §6 P0
- **三星堆 image**: d1-content.md §2.7 + licensing-log.md line 127 + §6 P0

All cite-chains are verifiable by `grep` against the audit files. No fabrication.

---

*Builder-iterator-v2 · 2026-05-20 H10 · ~120 min from spec read → ship*
