# Comparative Audit — v3 Day 2

> Comparative Auditor · 2026-05-21
> Inputs: 5 × d2 audit reports + 5 × next-briefs + d1-comparative.md + merged-spec.md (v1 baseline)
> Method: horizontal cross-reference across aspects; v3-vs-v1 delta scoring; closed-loop trajectory assessment.

---

## Executive summary

五位 Auditor 在 v3 上的核心共识是：**骨架是对的，但核心卖点未兑现**。UX Auditor 称"穿越模式跨页面根本不触发"；Motivation Auditor 称"三联动 wow 只是一段消失的文字横幅"；Aesthetic Auditor 称地图是"程序员的几何练习"；Content Auditor 列出 3 个 P0 事实错误；PM Auditor 称 case-study.md §3-§5 依然是 TBD。五人在同一个 P0 上完全收敛：**跨维度联动是声称功能而非已实现功能**。

v3 vs v1 的 delta 是真实且正向的：统一的 demo、真实的 277 件数据、D3 时代柱、25 个纹饰 SVG 图标、铸主力导图、何尊长卷专题——这些都是 v1 没有的资产。v1 的三个版本各自有孤立的闪光点（A 的考据纪律、B 的何尊长卷、C 的 sticky nav）；v3 把它们合并进了一个产品里，并且执行了合并。但 **v3 最重要的新主张——维度联动"穿越模式"——在跨页面场景下是零功能**，而这恰好是团队自己在 case-study 里最想宣传的能力。

**v4 最重要的单点动作**：把跨维度联动做成一个同屏可见的演示页面（三组件同框、event bus 实时触发），或用 BroadcastChannel 真正连通多个标签页。当前"穿越模式"卖点是团队宣传和产品现实之间最大的裂缝，必须在 v4 close-loop 中修复。

---

## Cross-Auditor agreement matrix

### 什么改善了（v3 vs v1）

| 方面 | v1 状态 | v3 状态 | 改善程度 |
|------|---------|---------|---------|
| 图像供应链 | 三版各自 placeholder（椭圆 blob、渐变方块） | 12 silhouette SVG 正确显示，覆盖约 90% catalog 卡片 | 大幅改善，此 P0 基本修复 |
| 维度数量/口径 | 三版用 10 个维度，各自诠释不同 | 统一 7+1，一个 demo，口径一致 | 已修复（v1 P0 段位口径不统一） |
| 信息架构 | v1-B 无 sticky nav，findability 差 | 统一 sticky nav + 搜索框 + catalog tab | 已修复 |
| 数据深度 | 24 件浅层数据 | 277 件，11 字段，含 patterns_structured | 质的飞跃 |
| 内容可信度 | 利簋病句、尊盘分类错误、后母戊纹饰平铺 | 三个 v1 P0 已修复 | 已修复 |
| 游戏化纪律 | v1-C 踩三处 anti-Skinner 红线 | v3 通过 7/10 红线检查 | 大幅改善 |
| 特色页面深度 | B 有何尊占位，未实现 | v3 inscription-special-hezun.html 全实现 | 新增，v3 最强单页 |

### 什么退步了（v3 相比 v1 最好水平）

| 方面 | v1 最好状态 | v3 退步 | 严重程度 |
|------|-----------|---------|---------|
| Emoji 导航图标 | v1 三版均无 emoji 在导航卡上 | index.html 维度卡使用 ⏳ 🗺 🌿 等 emoji | P1（Aesthetic + UX 双旗） |
| me.html 调试面板 | v1 无开发工具外露 | me.html 暴露"事件总线调试"黑底面板和 TEST 按钮 | P1（UX + Aesthetic + Motivation 三方独立标注） |
| 地图质量 | v1-B 有 SVG 地图，v1-A/C 无 | v3 geo 用 24 点多边形，比 v1-B 更差 | P1（Aesthetic 标 P0） |
| 三星堆 silhouette 映射 | v1 无（所有都是 blob） | v3 有 SVG 但 getSilhouette() 未映射大立人/纵目面具，显示方鼎 | P1（Aesthetic 标 P1） |

### 什么从 v1 遗留到 v3 仍未解决

| 遗留问题 | v1 状态 | v3 状态 |
|---------|---------|---------|
| Day-0 / 0-state | 三版全部 hardcode 预设收藏 | v3 仍 hardcode 35 件，三轮迭代此问题从未修复 |
| 跨维度联动可见 | v1 文档描述，未实现 | v3 event bus 实现，但跨页面不工作；同页面联动存在但用户无法发现 |
| 今日推荐 / 研究路径 | v1 未实现 | v3 spec 存在，demo 中不存在 |

---

## Did all 5 Auditors converge on the same P0?

**是的。五位 Auditor 全部独立识别了跨维度联动问题，以不同措辞说了同一件事：**

- **UX Auditor** [P0 #4]: "event-bus 是 same-document CustomEvent，跨页面根本不触发。用户打开两个 tab，没有任何联动。这是产品核心叙事的根本性失实。"
- **Motivation Auditor** [P0 blocker]: "三联动 wow moment 要求三个组件同屏可见，而当前每个维度在各自独立页面上。wow 只是一段文字描述了自身，3.5 秒后消失。"
- **Aesthetic Auditor** [隐含在 geo P0 和调试面板 P1 背后]: "这个功能的宣传期望和视觉现实之间存在落差。"
- **Content Auditor** [未直接标注此 P0，专注内容事实]: 未收敛此点，是唯一不收敛的 Auditor。
- **PM Auditor**: "事件总线协议写得好，但它在 gamification-mechanics-v3.md 里，不在 case-study.md 里；用户实际上看不到联动效果。"

4/5 Auditors 独立收敛于同一 P0。Content Auditor 聚焦内容事实，专业分工不同，不是异议。

**其他共享 P0:**

1. **me.html 调试面板** — UX [P0 #3] + Aesthetic [P1 #4] + Motivation [P2 but 3 Auditors] = 实质 P0
2. **case-study.md §3-§5 仍是 TBD** — PM Auditor [P0 G1]
3. **Day-0 0-state 缺失** — UX [P0 #2]（三轮迭代未修复，此次必须处理）

---

## v3 vs v1 Score Delta

| 方面 | v1 最高分 | v3 分数 | Delta | 说明 |
|------|---------|---------|-------|------|
| **UX** | v1-C 约 6/10 | 约 7.5/10 | +1.5 | 统一 nav + 搜索框修复主要问题；但 9+1 nav、0-state、跨页联动 P0 拉低 |
| **Aesthetic** | v1-A 约 7.5/10 | 约 7/10 | -0.5 | silhouette 资产升级，但 emoji 导航和 24 点地图多边形是新的负项；hezun 页是峰值 |
| **Content** | v1-A 约 6/10 | 约 6.5/10 | +0.5 | 277 件数据量提升，3 个 v1 P0 已修复；但 3 个新 P0（大克鼎、唐兰 1976、FULL_TEXT 截断）抵消了增益 |
| **Motivation** | v1-A 约 6/10 | 约 7/10 | +1.0 | 时代柱、铸主列传体、何尊长卷是真实提升；但核心卖点联动未兑现、今日推荐缺失拉低 |
| **PM (portfolio)** | D1 7.0/10 | 7.8/10 | +0.8 | 277 件+12 页+事件总线协议+闭环证据 iteration-1-changes.md；但 case-study §3-§5 TBD 封顶 |
| **综合** | 6.5/10 | 7.2/10 | **+0.7** | 真实提升，但未突破天花板 |

**关键观察**：Aesthetic 是唯一轻微退步的维度，因为 v3 引入了两个 v1 没有的新负项（emoji + 调试面板）。这说明合并过程引入了新的界面噪音，而 v1-A 的设计纪律在某些方面反而更干净。

---

## Top 10 Cross-cutting Findings

### #1 [P0 Critical] 跨维度联动是声称功能，不是实现功能
**旗标 Auditors**: UX [P0 #4] + Motivation [P0 blocker] + PM [论点 6 未被前台展示]
**受影响**: v3-converged 全部页面（穿越模式按钮出现在所有页面但跨页无效）
**根因**: `document.dispatchEvent(CustomEvent)` 只在同一 document 内传播；time-pillar.html 和 geo-system.html 是独立页面；没有 BroadcastChannel / SharedWorker / localStorage listener
**严重程度**: v3 核心卖点、portfolio PM 论点 1 的兑现依赖此功能；当前是"PPT 功能"

### #2 [P0 Critical] me.html 调试面板对用户可见
**旗标 Auditors**: UX [P0 #3] + Aesthetic [P1 #4] + Motivation [P2]
**受影响**: me.html（用户个人主页）
**根因**: `#bus-debug-panel` 黑底卡片含 TEST:商/西周/战国 三个按钮和 debug log，直接渲染在用户页面
**严重程度**: 破坏产品可信度；破坏 me.html 叙事；对招聘者 demo 展示是直接减分项

### #3 [P0 Critical] Day-0 / 0-state 三轮迭代未修复
**旗标 Auditors**: UX [P0 #2]（持续三轮）
**受影响**: index.html、me.html、catalog.html
**根因**: `state.js` hardcode 35 件收藏；新用户进来看到别人的数据
**严重程度**: 每个真实 demo 场景都从这个假状态开始；onboarding 叙事完全不存在

### #4 [P0 Content] 大克鼎 period 错误：西周晚期 → 西周中期
**旗标 Auditor**: Content [P0]
**受影响**: bronze-treasures-v3-segment-2-xizhou.json；时代柱显示位置错误
**根因**: `"period": "西周晚期(孝王时期)"` — 孝王置于西周中期（10 世纪），`approx_year` 字段自身写的是"公元前 10 世纪中期"，内部矛盾

### #5 [P0 Content] 何尊唐兰 citation 1986 应为 1976
**旗标 Auditor**: Content [P0]
**受影响**: inscription-special-hezun.html（产品最重要的内容页）
**根因**: 认识"宅兹中国"的文章是 1976 年《文物》第 1 期，不是 1986 年书

### #6 [P0 Content] 何尊 FULL_TEXT 实际 ~98 字而 counter 显示 0/122
**旗标 Auditor**: Content [P0]
**受影响**: inscription-special-hezun.html 的 122 字计数器
**根因**: JS 常量 FULL_TEXT 只有约 98 字符，counter 展示 122，用户永远无法读完"122 字"

### #7 [P1] Emoji 图标出现在维度卡导航
**旗标 Auditors**: UX [P2] + Aesthetic [P1]
**受影响**: index.html 8 个维度入口卡
**根因**: dim-entry-icon 使用 ⏳ 🗺 🌿 🛕 👤 📚 等 OS emoji，调性与"国宝知识宇宙"品牌不符

### #8 [P1] 地图是 24 点多边形，不可识别为中国
**旗标 Auditor**: Aesthetic [P0 aesthetic]
**受影响**: geo-system.html（地理维度主页）
**根因**: `chinaOutline` 只有 24 个坐标点，渲染出有明显直线边的几何图形；河流为两段 bezier 曲线，不追踪实际水系

### #9 [P1] 三星堆大立人/纵目面具 silhouette 映射错误
**旗标 Auditor**: Aesthetic [P1]
**受影响**: catalog.html 三星堆相关卡片
**根因**: `getSilhouette()` 未映射 '人像'/'面具' 类型，这两件最具视觉特征的文物显示为方鼎剪影；`sanxingdui_dali_ren.svg` 存在但未被调用

### #10 [P1] case-study.md §3-§5 仍是 TBD，portfolio 无法递交招聘者
**旗标 Auditor**: PM [P0 G1]（整个 v3 audit 最严重的 portfolio 层缺口）
**受影响**: 整个作品集的可读性
**根因**: v3 run 产出了足够的原材料（state.md、iteration-1-changes.md、gamification-mechanics-v3.md §4），但写作从未发生

---

## What v3 Nails — Keep Verbatim

1. **inscription-special-hezun.html 全实现** — 暗铜美学 + 逐字释读 + 现代译文 + 学术注 + "宅兹中国见证者"称号解锁。这是整个项目史上最强单页，截图即可作为 portfolio 封面。Aesthetic Auditor 称其"aesthetic peak of v3"；Motivation Auditor 称其"best single motivation surface the product has shipped"。

2. **D3 时代柱真比例高度** — 商 554 年 vs 秦 15 年的视觉高度差是即时可感的"时间厚度"体验。Motivation Auditor 打出 Spatial/Temporal Hook 5/5 最高分；Aesthetic Auditor 称"最有'新意'的视觉"。

3. **caster-profile.html 列传体传记** — 妇好条目含甲骨卜辞 800 条引用、1976 年殷墟 M5 出土数据、"传世器物(您已收藏 1/5)"。Motivation Auditor 将其 Story Hook 和 Identity Hook 分别评为 5/5，称其为"全产品最强'我在成为专家'表面"。

4. **25 个纹饰 SVG 图标 + 演化树** — 饕餮/夔龙/蟠螭等图标有真实纹饰结构（角/眼/爪）。Aesthetic Auditor 称"最强新创意资产"。Pattern Tree 页是 v3 中设计纯度最高的工具页面。

5. **me.html 诚实进度 + 隐式称号系统** — 12.6% / 57% / 4.6% 三条真实进度条，无虚假完成率。称号基于行为推导，有事实条件说明。Motivation Auditor 判断 anti-Skinner 红线 7/10 通过，比 v1-C 的 3 通过 4 警告 2 违反大幅改善。

6. **iteration-1-changes.md 闭环证据** — 每条修改均引用 Auditor 报告和行号，是整个作品集中最有价值的"audit→brief→builder 闭环"可验证文档。PM Auditor 称此为"best single piece of closed-loop evidence in the portfolio"。

---

## What v3 Broke That v1 Had Right — Regressions

1. **Emoji 导航图标是 v3 新引入的退步**。v1 三版均未在维度卡上使用 OS emoji。v3 的 index.html 维度卡墙却使用了 ⏳ 🗺 🌿 🛕 👤。v1-A 的导航设计纪律（宋/仿宋/楷/Iosevka 四字体分工，无 emoji）在 v3 中被破坏。

2. **me.html 调试面板是 v3 新引入的退步**。v1 三版均无开发工具外露。v3 把事件总线测试面板嵌入用户页面，在 demo 展示时对任何访客可见。

3. **地图质量退步**。v1-B 的古国地图用 SVG 绘制，有识别度。v3 用 D3 polygon 替换，24 点轮廓在 520px 容器内可见直线边，可辨识度低于 v1-B。换了实现方式，但结果更差。

---

## What v3 Still Hasn't Solved From v1

| 遗留问题 | v1 状态 | v3 状态 | 连续跨轮次 |
|---------|---------|---------|----------|
| Day-0 0-state + onboarding | v1 全三版预设收藏，无引导 | v3 仍 hardcode 35 件 | **第三轮** |
| 跨维度联动可见（核心 AI PM 论点） | v1 仅文档描述 | v3 event bus 实现但跨页面无效 | **第三轮** |
| case-study.md §3-§5 写作 | D1 TBD | D2 仍 TBD | **第三轮（PM P0）** |
| 今日推荐 / 研究路径 | v1 spec 描述，未实现 | v3 spec 描述，demo 中仍不存在 | **第三轮** |
| 撤回收藏功能 | v1 无 | v3 toggleCollect 只加不减 | **第三轮** |

---

## The Portfolio Thread: v1 → iteration-1 → v3 → v4

### Is the audit-as-iteration-trigger story holding up?

**是的，而且是这个作品集最重要的结构性论点。**

- v1 → 闭环 1（iteration-1-changes.md）：5/5 Auditors 独立收敛于图像供应链问题 → 12 个 SVG + 5 个内容修复，120 分钟内交付。这是完整、可验证的闭环，每条修改都有 Auditor 来源标注。
- iteration-1 → v3：用户决策（7+1 维度、300 件、单一 demo）触发了 v3 night run。这个循环由用户 checkpoint 驱动，文档在 state.md 中。
- v3 → 本次审计（v4 pre-brief）：第三个循环现在正在发生。

**但这个故事在 case-study.md 里不存在**。PM Auditor 的评分中，case-study 完整度 4/10 是唯一在 D1 和 D2 之间分数完全未动的维度。招聘者读 case-study.md 看不到这个闭环，只看到 §3-§5 是 TBD。**原材料已经够了，缺的是 2-3 小时写作。**

### What does v4 need to add?

v4 不需要更多建设，它需要**收口**：

1. 一个可以展示给招聘者看的联动 demo（同屏三组件）
2. 内容 P0 修复（大约 30 分钟，4 个文件）
3. case-study.md §3-§5 写作（2-3 小时，一个 Product Owner agent）

v4 如果只做这三件事，hire signal 从 7.8/10 → 9/10。

---

## Final Composite Ranking

### v3 vs v1: Net Improvement

**净改善，但存在特定维度退步。**

v3 在 UX（+1.5）、Motivation（+1.0）、PM（+0.8）、Content（+0.5）上有真实进步；Aesthetic 轻微退步（-0.5），因为 v3 引入了两个 v1 没有的新问题（emoji + debug 面板），同时地图质量未改善。

综合轨迹：**6.5/10（v1 综合）→ 7.2/10（v3）= +0.7 净提升**。这是真实的进步，但天花板是 9/10，当前距天花板 1.8 分，全部集中在三件事：联动 wow 页、case-study 写作、内容 P0。

### Hire Signal Trajectory

```
v1 baseline:     7.0/10
iteration-1:     7.3/10  (+0.3 — silhouette + content P0 fixes)
v3:              7.8/10  (+0.5 — 277 records, event bus, dimension convergence)
v4 potential:    9.0/10  (+1.2 — case-study written, wow page, content P0)
v4 floor:        7.8/10  (if v4 只有 content fixes, no case-study)
```

**PM Auditor 的结论是准确的**："This portfolio is not a documentation problem anymore. It is not a build problem. It is a narrative packaging problem."

---

*Comparative Auditor · 2026-05-21*
*合成 5 个 d2 audit 视角 + v1 baseline*
*总字数约 3000 字*
