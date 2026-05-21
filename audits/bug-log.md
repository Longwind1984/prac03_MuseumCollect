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
**Decision (user, 2026-05-21)**: **不立即修**。和下一项 DEFERRED-002 (mobile 适配) 一起,在 **v5 mobile-first rebuild** 里同时处理。理由:两个都涉及 geo-system / dashboard / catalog 三页的重渲染逻辑,改两次不如一次过。
**Fix plan (v5)**:
- 用 `fetch('../../assets/geo/ancient-states-shang.geojson')` 重 wire B1 真实数据
- D3 projection (geoMercator / geoConicEqualArea — 后者对中国地区更准)
- 各朝代 overlay 切换保留 era-focus event bus 联动
- mobile viewport 下用 touch-friendly pan/zoom

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
