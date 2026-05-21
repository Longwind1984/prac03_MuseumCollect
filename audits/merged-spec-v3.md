# Merged Spec — v4 Direction

> Comparative Auditor · 2026-05-21
> 基于: 5 × d2 audit + 5 × next-brief + d1-comparative + merged-spec v1
> 这不是偏好，是 5 位 Auditor 合成结论 + 裁决（仅在分歧处）

---

## TL;DR

v4 需要做三件事，不是更多：

**第一件**，今晚运行一个 Product Owner agent（Opus），写 case-study.md §3 Approach + §4 Outcomes（骨架）+ §5 Reflection（3 条具体教训）。这是整个项目的最高优先级动作。原材料已完备：state.md、iteration-1-changes.md、gamification-mechanics-v3.md §4、dimensional-map-v3.md。

**第二件**，建一个同屏展示跨维度联动的 wow 页面（dashboard.html 或扩展 me.html），把 time-pillar mini + pattern-icon strip + geo mini-map 三组件放在一屏，连接现有的 `era-focus` event bus。这个 wow 页是整个 v3 核心主张唯一没有被兑现的部分。

**第三件**，修复 4 个内容 P0（大克鼎 period、唐兰 1976、FULL_TEXT、debug 面板隐藏）和 2 个视觉 P1（emoji 图标、三星堆 silhouette 映射）。这些合计约 45-60 分钟构建时间。

---

## Critical v3 P0s That BLOCK Portfolio (must fix in v4 close-loop)

### 1. 跨维度联动 — BroadcastChannel 或同屏重设计（最重要）

**问题**: `cross-dim-wiring.js` 使用 `document.dispatchEvent(CustomEvent)`。这是 same-document 事件，在独立标签页之间不传播。time-pillar.html hover 商朝，geo-system.html 不会收到 `era-focus` 事件。"穿越模式"按钮出现在 12 个页面，但跨页面联动是零。

**必须选择以下之一**:

**选项 A（推荐）— 建 dashboard.html 同屏 wow 页面**
- 新建 `demos/v3-converged/dashboard.html`（或称 `explore.html`）
- 页面布局：三栏同屏：左列 = time-pillar mini（D3 柱，200px 高），中列 = pattern-icon strip（按 era 排列的 25 个 SVG 图标），右列 = geo mini-map（180×180 SVG）
- 三组件全部监听同一 `era-focus` event；time-pillar mini 是 emitter
- hover 商朝 → 左柱高亮商代段 + 中列饕餮/夔龙图标 gold border + 右列殷墟点放大
- 这一页是 portfolio demo 的"截图主页"；所有招聘者展示都从这里开始
- 时间估计：2 小时（组件已存在，只需同框 + 事件连通）

**选项 B — BroadcastChannel 跨页面真联动**
- 在 `cross-dim-wiring.js` 中替换 `document.dispatchEvent` 为 `new BroadcastChannel('mc-events').postMessage()`
- 在所有维度页面加 `const bc = new BroadcastChannel('mc-events'); bc.onmessage = e => handleEvent(e.data)`
- 优点：保留每个维度页面独立存在；缺点：recruiter 展示需要同时打开两个标签页，demo 复杂度高
- 时间估计：1.5 小时

**裁决**：选 A。同屏 wow 页面视觉效果更强，demo 路径更简单，是唯一可以截图的展示形式。

### 2. case-study.md §3-§5（PM Auditor: hire signal 当前 ceiling-block）

**问题**: §3 Approach、§4 Outcomes、§5 Reflection 全部是 TBD。三轮迭代未写，但原材料已经完整。

**必须写入的内容**:

§3 Approach（600-900 字）：
1. 8 个有界 agent 角色的架构决策（bounded = auditable）
2. 冷上下文审计机制 + 5/5 独立收敛信号（iteration-1 图像供应链）
3. 6 事件 event bus 协议（gamification-mechanics-v3.md §4）作为 PM 写的工程契约
4. 10→7+1 维度削减的 PM 决策逻辑
5. Opus/Sonnet 成本路由策略

§4 Outcomes（骨架，300 字）：
- 277 件结构化记录、12 个 HTML 页面、25 个 SVG 图标、12 个 silhouette
- 2 个闭环在 24 小时内完成
- API 成本估计（从 token log 提取，约 $30-50）
- 等效人力估计（数据 2 研究员 × 2 周；设计 1 × 1 周；工程 2 × 1 周 = 约 6-8 人周）

§5 Reflection（3 条具体教训，400-600 字）：
1. "10 个维度每个 8k 字 spec 但都是浅层 → 削减到 7+1 加形态映射约束"
2. "冷上下文审计抓到内部人看不到的问题：5 个独立 Auditor 收敛到同一图像问题是质量信号，不只是反馈"
3. "事件总线应该在 3 个 Builder 之前 spec 好；v3 先 spec 后 build，集成摩擦比 v1 低"

**负责 agent**: Product Owner（Opus）。Sonnet 不适合此任务，需要 Opus 级别的叙事能力。

### 3. 内容 P0 修复（4 个文件，约 30-45 分钟）

**a. 大克鼎 period 错误**
- 文件: `data/curated/bronze-treasures-v3-segment-2-xizhou.json`
- 找 `da_ke_ding`，将 `"period"` 从 `"西周晚期(孝王时期)"` 改为 `"西周中期(孝王时期)"`
- 影响: time-pillar 中大克鼎会显示在正确的西周中期段

**b. 何尊唐兰 citation 年份**
- 文件: `demos/v3-converged/inscription-special-hezun.html` line ~141
- 将 `1986` 改为 `1976`，citation 文本改为 `唐兰，《西周时代最早的一件铜器铭文——何尊》，《文物》1976年第1期`

**c. 何尊 FULL_TEXT 字符数修复**
- 文件: `demos/v3-converged/inscription-special-hezun.html`
- FULL_TEXT 常量补全至真实 122 字，或将 counter 的 `totalChars` 改为 `FULL_TEXT.length`（使之与实际内容一致）

**d. 莲鹤方壶 失蜡法 qualifier**
- 文件: `data/curated/bronze-treasures-v3-segment-3-dongzhou.json`
- 找 `lianhe_fanghu`，craft 字段删除 "疑用失蜡法早期工艺"，改为 "对失蜡法的使用有争议，多数学者持否定立场（王有德 1983；Bagley 1990）"

---

## Per-Component v4 Fixes

### time-pillar.html
- **keep**: D3 真比例高度，呼吸动画，dynasty 详情卡，era-focus emit
- **fix**: 事件标签在商/西周密集段落出现字符碰撞（9px 标签叠压）→ 对重叠标签加 y-offset 或缩减显示到 5 个最重要事件
- **add**: 如果 dashboard.html 方案，添加 `time-pillar-mini.js` 轻量版组件（仅柱状，无 side-card），用于 dashboard

### geo-system.html
- **fix P0 aesthetic**: chinaOutline 从 24 点扩展至 80-100 点，必须包含：渤海湾凹陷（东海岸）、东南海岸曲线、台湾岛单独 `<path>`；黄河从甘肃经河套弯折入海，长江从四川东行，各 10-15 点
- **keep**: era overlay 区域、site 圆圈（sqrt(count) × 2.5 大小）、museum 点
- **note**: 这不是需要 TopoJSON 的任务，是用 2-3 小时手工追点的几何任务；关键是"识别为中国"，不是地理精确

### pattern-tree.html
- **keep**: D3 tree 结构，25 图标，era-focus listener，演化路径线条
- **fix**: era bands 的 4% opacity washes 在实际渲染中几乎不可见；提升至 6-7%
- **add (dashboard)**: `pattern-strip.js` 轻量版，只显示当前 era 对应的图标 strip，用于 dashboard

### inscription-special-hezun.html
- **fix P0**: FULL_TEXT 补全 + citation 1976
- **fix P1**: 将 `revealChar()` click-only 机制改为 `IntersectionObserver` 滚动触发；保留点击高亮；`payoff` 在滚动到 `#payoff` 元素时触发，不依赖 click count ≥ 73
- **keep**: 全暗模式美学、逐字拼接文本、现代译文 + 学术注

### me.html
- **fix P0**: 隐藏 `#bus-debug-panel` — 在 `DOMContentLoaded` 末尾加 `if (!new URLSearchParams(location.search).has('debug')) { const dbg = document.getElementById('bus-debug-panel'); if(dbg) dbg.style.display='none'; }`
- **fix P1**: 锁定称号默认隐藏 — 只显示 `unlocked:true` 的称号；底部加 `<button>还有 N 个称号尚待解锁</button>`，点击展开，但不显示解锁条件
- **add (if time)**: 研究路径卡（当收藏 ≥ 10 时显示）— 硬编码 3 个路径对象 `{title, desc, link}`，最小实现

### catalog.html
- **fix P1**: 三星堆 silhouette 映射 — 在 `getSilhouette()` 添加：`'人像': 'sanxingdui_dali_ren'`，`'面具': 'sanxingdui_zongmu'`，`'灯': 'changxin_gongdeng'`
- **fix P1**: "+244 件" 占位卡改为纯文字提示："演示版收录 33 件代表器物，完整版涵盖 277 件"；或实现基础 pagination（每页 33 件）
- **keep**: 搜索框、形制谱系折叠树、tab 结构

### index.html
- **fix P1**: emoji 维度图标替换 — 将 `dim-entry-icon` 中的 emoji 改为 `<img src="../../assets/silhouettes/fangding.svg" ...>` 等对应 SVG；用 `filter: sepia(1) saturate(0.5) brightness(0.6)` 获得铜色效果；纹饰维度特别建议使用 `assets/patterns/taotie.svg`
- **add P0**: Day-0 onboarding overlay — `if (!localStorage.getItem('mc_v3_visited'))` 显示 3 屏全屏叠层：① 0-state 欢迎词（您的收藏是空的，这正是起点）→ ② 扫描引导 → ③ "看到它在 7 个维度点亮"；最后屏有"跳过"和"去扫描"出口

---

## Cross-cutting v4 Must-Do

### 必须做（阻塞 portfolio 交付）

1. **BroadcastChannel 跨页面同步 OR dashboard.html 单屏 wow demo**（见上文 §1，选 A 推荐）
2. **case-study.md §3-§5 写作**（Product Owner / Opus，见上文 §2）
3. **内容 P0 修复**（大克鼎 period + 唐兰 1976 + FULL_TEXT + 莲鹤方壶，见上文 §3）

### 必须做（阻塞 demo 质量）

4. **Debug 面板隐藏**（me.html，15 分钟）
5. **Emoji 图标替换**（index.html 8 个维度卡，30 分钟）
6. **三星堆 silhouette 映射修复**（catalog.html + artifact.html getSilhouette()，15 分钟）

### 强烈建议（提升 demo 体验）

7. **Day-0 onboarding overlay**（index.html，45 分钟）— 三轮未修复，继续拖会影响每一次真实 demo
8. **何尊 scroll-reveal 机制替换**（inscription-special-hezun.html，45 分钟）— 73 点击门槛是实际用户永远到不了的 payoff
9. **地图多边形精化**（geo-system.html，2-3 小时）— Aesthetic P0，任何招聘者看到都会质疑整体设计水平

---

## Highest-ROI v4 Work — Recommendation Rank

**排序依据**: hire signal delta × 实施时间 = ROI

| 优先级 | 工作 | 时间 | Hire Signal Delta | 说明 |
|--------|-----|------|-----------------|------|
| **1** | case-study §3-§5 写作 | 2-3h | +0.8/10 | 这是唯一 D1→D2 分数未动的维度（4/10 静止），单点最高收益 |
| **2** | dashboard.html 跨维度 wow 页 | 2h | +0.5/10 | portfolio 核心论点兑现；现有组件已有，只需同框+连线 |
| **3** | 内容 P0 修复（大克鼎+唐兰+FULL_TEXT） | 30-45min | +0.2/10 | 最短时间修复，影响内容可信度的事实错误 |
| **4** | Day-0 onboarding overlay | 45min | +0.2/10 | 三轮未修复；影响每一次 demo 场景真实性 |
| **5** | debug 面板隐藏 + emoji 图标替换 | 45min | +0.2/10 | 三位 Auditor 独立标注；30 分钟内完全可修复 |
| **6** | 何尊 scroll-reveal 替换 | 45min | +0.15/10 | 73 点击门槛让"最好的 motivation 页"变成大多数用户无法到达的彩蛋 |
| **7** | 地图多边形精化 | 2-3h | +0.1/10 | Aesthetic P0，但非 portfolio 核心；可排在其他优先级之后 |
| **8** | 三星堆 silhouette 映射 + "+244 件"占位修复 | 30min | +0.05/10 | 小 bug，15 分钟，做了好 |

---

## v4 Night Plan Suggestion (close-loop budget)

**三个并行 Track，总时间约 3-4 小时**

### Track A — Product Owner agent (Opus, 2-3h)
**任务**: 写 case-study.md §3 + §4 + §5
- 读: state.md（完整 event log）+ iteration-1-changes.md + gamification-mechanics-v3.md §4 + dimensional-map-v3.md + 本 merged-spec §2
- 不要重写 §1 + §2（PM Auditor 明确说这两节强，勿改）
- 不要添加 screenshots（标 placeholder 即可）
- 输出: case-study.md 完整版，§3 600-900 字，§4 300 字骨架，§5 3 条具体教训

### Track B — Builder (Sonnet, 1.5h)
**任务（顺序执行）**:
1. 内容 P0 修复（大克鼎 period + 唐兰 1976 + FULL_TEXT）（30min）
2. me.html debug 面板隐藏 + 锁定称号默认隐藏（15min）
3. index.html emoji 图标替换为 SVG（30min）
4. catalog.html 三星堆 silhouette 映射 + "+244 件"提示修改（15min）
5. 如有时间：Day-0 onboarding overlay（最小实现，45min）

### Track C — Builder (Sonnet, 2h)
**任务**: 建 `demos/v3-converged/dashboard.html`
- 三栏同屏：time-pillar mini（D3，200px）+ pattern-icon strip（era-filtered 25 icons）+ geo mini-map（180×180 SVG）
- 连接现有 `cross-dim-wiring.js` event bus（不需重写，只需 import + listen/emit）
- hover time-pillar mini 的朝代段 → 三组件同时反应
- 加入 sticky nav（复用 converged.css），标题"维度全景 · 穿越联动"
- 这一页是 demo 展示时的第一页，所有 portfolio 展示从这里开始

**Track A 和 B/C 完全并行，不互相依赖。**

---

## Open Questions for User (escalate to morning report)

1. **跨维度联动的展示方式**：选择 dashboard.html 同屏方案（Track C，视觉更强，demo 更简洁）还是 BroadcastChannel 跨页面方案（保留独立页面，但 demo 复杂度更高）？这个选择影响 Builder 的整个 Track C 工作方向。

2. **case-study §5 Reflection 中"什么是您最不想重来的决策"**：PM Auditor 建议写 3 条具体教训（10→7+1 削减、冷上下文审计机制、event bus 先 spec 后 build）。但 Reflection 的价值在于用候选人自己的声音说。这 3 条您是否认可？是否有第 4 条您觉得更真实的教训？

3. **成本数据**：state.md 记录 Night Run D0 约 2.4M tokens（约 $20-25）。Night Run D1（v3）尚无数字。从 API 日志中可以查到 v3 的 token 消耗吗？这个数字对于 case-study §4"AI leverage 等效人力"论点是最重要的单一可引用数据。

4. **何尊铭文 scroll-reveal**：当前 click-per-character 机制要求 73 次点击才能到达 payoff。改为 IntersectionObserver scroll-reveal 会改变"每个字是独立的微注意力"的用户体验意图。您是否认可这个改变？还是倾向于保留点击机制但加一个"全部展开"快捷按钮？

5. **地图精化的时间投入**：Aesthetic Auditor 将 24 点多边形列为 P0，认为会让招聘者"暂停并质疑整体设计水平"。但精化需要 2-3 小时手工追点。相比 dashboard.html（直接解决最重要的 portfolio 论点），地图精化的 ROI 排在第 7 位。您是否接受在 v4 close-loop 中跳过地图精化，将其推迟到 v5？

---

*Comparative Auditor · 2026-05-21*
*Merged Spec for v4*
*基于 5 位 d2 Auditor 合成*
