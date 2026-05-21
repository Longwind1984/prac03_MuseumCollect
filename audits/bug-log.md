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
