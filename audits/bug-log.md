# Bug Log

## BUG-001 — artifact.html 总跳到后母戊鼎 (P0)
**Discovered**: 2026-05-21 (user-reported via Vercel preview)
**Severity**: P0 — 整个 277 件库都不可详情查看,核心 UX 阻塞
**Root cause**: `demos/v3-converged/artifact.html` 第 84-120 行 hardcoded 一个 `MOCK_ARTIFACTS` 对象**只有 2 个 entry** (houmuwu_ding + he_zun);第 414 行 `MOCK_ARTIFACTS[id] || MOCK_ARTIFACTS['houmuwu_ding']` 对其余 275 件全 fallback。`data-loader.js` 早已 build 好 `window.MuseumData.get(id)` API 加载全 277 件,但 artifact.html 没用。

**Why missed in audit phase**: 5 Auditor 都从 me.html / catalog.html / time-pillar 等入口测试,默认 artifact 详情页的人是用 Builder 写的 catalog 跳转 ID,而 Builder 自己写的 MOCK 里恰好有 houmuwu 这一条 → 表面"工作"。Auditor 没 stress-test 不同 id 的 artifact 跳转。

**Fix shipped**: 2026-05-21
- 删除 MOCK_ARTIFACTS 整个对象
- 改用 `window.MuseumData.get(artifactId)` 配合 `museum-data-ready` event listener
- 加 `normalizeRecord()` 防 segment data 字段 shape 差异(inscription 可能是 bool / craft 可能是 string / data_sources 可能是 object 数组)
- 找不到 record 时显示 "未找到 {id}" + 返回 catalog 链接,不再隐式 fallback

**Verification**: `grep -c MOCK_ARTIFACTS artifact.html` returns 0; normalizeRecord + tryRender + museum-data-ready listener 都已 wire。

**Audit process improvement (todo)**: Auditor 系统提示要加 "随机抽 5+ 个 ID 测试 artifact.html"。这条进入 v4.5 QA audit best practices research task。

---

## DEFERRED-001 — geo-system.html / dashboard.html 仍用 D3 polygon 近似而非真实 GeoJSON (P1)
**Logged**: 2026-05-21 (user-noted after Vercel preview review)
**Severity**: P1 — 视觉廉价感来源,削弱 B1 阶段真实地形 GeoJSON 工作的价值
**Root cause**: Builder-Converger Phase C trade-off — 因 file:// fetch CORS 限制把 B1 的 `assets/geo/*.geojson` 替换成 24-point 内联 polygon approximation。Aesthetic Auditor v3 已 flag 为 P0(programmer geometry 不像地图)。当前 vercel deploy 在 https:// 下应可解 CORS,但 Builder 当时为了"file:// 也能开"而妥协。
**Decision (user, 2026-05-21)**: 和下一项 DEFERRED-002 (mobile 适配) 一起,在 **v5 mobile-first rebuild** 里同时处理。
**Status update (2026-05-22, user reversed)**: "real GeoJSON 是 contained 的,先做"。dashboard.html PARTIALLY FIXED:
- ✅ `_mapProjection` 从 linear projection → `d3.geoConicEqualArea(parallels=[25,47], rotate=[-105,0])`(中国友好)
- ✅ `loadRealGeoData()` async fetch 5 个 GeoJSON 文件 (china-terrain + 4 ancient-states)
- ✅ region 渲染 dual-path: real GeoJSON 优先 + inline GEO_DATA fallback
- ✅ **39 个 region** 真实渲染(含 inline 缺失的 鬼方/羌方/燕国/齐国/鲁国 等)
- ⚠️ B1 GeoJSON 本身简化(7-8K bytes / file,~17 coords / outer ring)— 非 GADM/Natural Earth 详细级
- ✅ **geo-system.html 已升级**(2026-05-22 follow-up):同样 d3.geoConicEqualArea + 真 GeoJSON(china-terrain + 4 ancient-states + 30 excavation-sites + 24 museums)
- 16/16 Playwright test 仍绿
**Resolution (2026-05-22)**: geo-system.html refactor done in same session — both pages now use real B1 GeoJSON. DEFERRED-001 FULLY CLOSED.

## DEFERRED-002 — mobile 适配 (P1)
**Logged**: 2026-05-21 (user explicit deferral throughout v3)
**Severity**: P1 — portfolio 演示是 desktop only,中国用户主战场是 mobile
**Decision (user, 2026-05-21)**: v5 mobile-first rebuild,和 DEFERRED-001 同期。
**Fix plan (v5)**:
- 不是 responsive retrofit,而是 mobile-first 重写 layout
- dashboard 单屏三联动改成 vertical stack + sticky time-pillar
- artifact 详情页改成 sheet + tab(类似小红书/拼多多商品页)
- 礼制场景 / 铸主档案适合 mobile 长卷形式
- 考虑用 Taro 编译到小程序(case-study §5 已提)

---

## RUNTIME-AUDIT-002 — followup fixes for 3 bugs surfaced by d3 vendor unblock
**Logged**: 2026-05-21 (immediately after first d3-runtime audit)
**Severity**: P1 (one), P2 (two)
**Context**: Vendoring d3 to `assets/vendor/d3.v7.min.js` unblocked the 2 skipped tests in d3-runtime. Running them surfaced 3 previously-hidden bugs:

### BUG-002 (P1) — caster-profile: d3 force-graph `node not found: -1`
- **Root cause**: `LINKS` referenced `target:'zhoukangwang'` but no such record in CASTERS (周武王 record also wrongly listed 周康王 as 父子 — 武王是康王祖父,不是父).
- **Fix**: removed dangling LINK edge + corrected 周武王 relations.
- **Verified**: `console-errors.spec.ts` passes (was failing on `pageerror: node not found: -1`).

### BUG-003 (P2) — dashboard: click-lock doesn't add `.active` class
- **Root cause**: CSS defined `.dynasty-band-g.active` rules but JS only set `attr('opacity')`, never added the class. Design-vs-implementation mismatch.
- **Fix**: `updatePillarHighlight()` now sets `class="dynasty-band-g active"` via setAttribute (d3.classed unreliable on SVG `<g>` in some browsers).
- **Verified**: `cross-dim-dashboard.spec.ts` click-lock test passes (was failing because class never updated).

### BUG-004 (P2) — dashboard: 3 scrollable regions missing keyboard focus (a11y)
- **Root cause**: `.pillar-section`, `.pattern-strip`, `.artifact-cards` all have `overflow:auto` but no `tabindex` → axe-core `scrollable-region-focusable` flag.
- **Fix**: added `tabindex="0" role="region" aria-label="..."` to all three.
- **Verified**: `axe-a11y.spec.ts` dashboard scan passes (was failing on 1 serious violation).

### Surprise/clean discovery
- **Sub-finding**: Playwright native click on SVG `<g>` doesn't trigger d3-attached pointer listeners (SVG hit-testing routes to inner `<rect>` instead). Test rewritten to use `d3.dispatch('click')` for SVG element clicks. Documented in test code.
- **Sub-finding**: dashboard auto-focuses 商 dynasty 400ms after load (intentional wow demo effect). Original test clicked 商 → toggled OFF instead of locking. Test changed to click 西周 (no auto-focus) and verifies single-lock semantics (西周 ON, 商 OFF).

### Test status (post-fix)
- **16/16 passed, 0 failed, 0 skipped** (was 14 passed / 2 skipped pre-vendor).
