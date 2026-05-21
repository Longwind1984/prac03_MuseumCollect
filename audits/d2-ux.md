# Audit: UX — 2026-05-21 (Day 2, v3-converged)

> Reviewer persona: 硬核博物馆爱好者，逛过十余次一线博物馆，自己有文物笔记 app。
> 评估方式：冷启动，无设计团队上下文。依次读 index.html → catalog.html → artifact.html → me.html → scan.html → time-pillar.html → geo-system.html → pattern-tree.html → inscription-reader.html → purpose-scene.html → caster-profile.html，再对照 Day-1 UX 报告做 delta 分析。
> v3 版本：单一 demo（demos/v3-converged/），277 件，7+1 维度，穿越模式 event bus。

---

## Demo reviewed

- `demos/v3-converged/` — MuseumCollect v3 Converged（单一 demo，12 个页面）
- 参照：`demos/v1-A-textual-research/`（考据派，Day-1 基准）、`demos/v1-C-explorer/`（探索派，Day-1 基准）
- 参照：`audits/d1-ux.md`（Day-1 P0 问题清单）

---

## Snap impression (first-time user)

**v3 index.html：** 深色 hero（"三千年金色记忆"），右侧三个 stat——277件/195件禁止出境/35/277 已收藏——同屏可见，即时建立规模感。三个 CTA 按钮（浏览图鉴 / 拍照识别 / 我的图鉴）清晰有层级。下方 8 格维度卡墙一目了然，今日推荐三件文物紧随其后。**这是三个版本里第一次让我在首屏感受到"我知道这是什么、能做什么"。** 不过，顶部导航塞了 9 个 link（图鉴/时代柱/地理/纹饰树/铭文/礼制场景/铸主/我的图鉴/识别），加上"穿越模式"按钮，共 10 个项目，在普通宽屏上已经逼近拥挤临界点。

**v3 catalog.html：** 搜索框在最顶部，加上 5 个 tab（形制/时代/地理/纹饰/铭文）+ 3 个 quick-filter（仅已收藏/仅国宝/全部），结构清晰。catalog_grid 显示 33 件 mock（加"+ 244 件更多…"占位卡），每张卡片名称/朝代/形制三行，国宝金边，已收藏橙点标记——**信息密度适当，比 v1-C 的纯 Pokédex 卡墙更易区分**。"形制谱系"tab 是亮点：收折树结构，默认折叠，按需展开，比 v1-A 的平铺 tab 更有空间感。

**v3 artifact.html（后母戊鼎）：** 上半部分黑底 hero + 文物剪影 + 核心 meta 栏（朝代/形制/馆藏）+ 尺寸数字，感觉克制有质感。下方 11 个编号卡片（①基本信息 ②出土信息 ③形制工艺 ④纹饰 ⑤铭文 ⑥用途 ⑦学术地位 ⑧流传年表 ⑨相关器物 ⑩资料来源 ⑪铸主档案），大部分默认展开。**信息量仍然巨大，但有编号序列、两列布局和 details 折叠，比 v1-A 的"七层并列全展开"好很多——只是右列 (⑦-⑪) 有 5 张卡片，全部可见时页面很长**。

**v3 me.html：** "真实进度（无虚假完成率）"这句话本身就是产品立场的宣言，好感强。三段进度条（收藏/铭文/国宝）数值诚实（35/277=12.6%），no fake 90% bars。称号隐式推导（"方鼎专家 — 收藏方鼎 4 件"）比 v1-C 的"差 N 件解锁 X"更有人味。但**页面底部的"事件总线调试"面板（黑底金字，显眼）是内部开发工具，不该对用户可见**——这是第一个 P0。

---

## Critical UX observations

### 1. 穿越模式按钮——标签自相矛盾，且"开"的状态不可感知

按钮 HTML 初始显示"穿越模式 ●"。`cross-dim-wiring.js` 第 111 行：toggle 后改成`'联动 ●'`（开启时）或`'联动 ○'`（关闭时），但初始状态 HTML 里写的是"穿越模式 ●"。用户**第一次点击前，不知道"● 是开还是关"**；点击一次后，变成"联动 ●"——**标签词从"穿越模式"变成了"联动"**，概念不一致。

更严重的是：按钮默认"已开启"（`_linkageEnabled = true`），但没有任何视觉反馈说明它当前生效了。用户 hover 时代柱的商朝，`showLinkageIndicator` 会弹出一个小 div（"联动触发：商 · 饕餮纹/夔龙纹高亮 · 地图切至殷墟"），3.5 秒后消失——这是好设计。**但在 catalog.html、pattern-tree.html 上，联动反馈是图标边框高亮 + scale(1.1)，如果用户没有打开 time-pillar.html 并 hover，他们根本不知道这个"wow 点"存在**。按钮在 9-link 导航栏末尾，存在感弱。

### 2. Day-1 P0 "0-state / Day-1 新用户"—— 依然未解决

state.js 硬编码了 35 件已收藏，me.html、index.html、catalog.html 全部预设这个状态。新用户（0 件）进来：
- index.html 右侧 stat 显示"35/277 已收藏"——这是别人的数据
- me.html 的"青铜器爱好者"个人页里所有称号、进度条都预设了 35 件的状态
- 如果我是真正的 Day-0 用户，我感觉**这是另一个人的界面**

v1 三版均未解决；v3 也没解决。这是跨两轮迭代的 P0，**现在必须处理**。

### 3. 导航 9+1 = 信息架构过载

顶部 nav 9 个 link + "穿越模式"按钮。在 1280px 宽屏上（中国用户常见分辨率）已经贴到极限；1024px 以下极可能溢出。v1-C 只有 5 个 link（图鉴/时代柱/古国地图/形制谱系/扫描）+ "我的"——**7+1 维度的增加应该放进二级菜单或折叠 dropdown，而不是平铺在顶部**。

更具体：礼制场景、铸主档案是"深度工具"，不是高频入口。把它们从顶级导航下架，改为从 artifact.html 的维度入口进入，可以缓解导航膨胀。

### 4. 穿越模式的 wow 点——单页生效，跨页无效

`era-focus` 事件使用 `document.dispatchEvent(CustomEvent)`，这是同一 document 内的事件；**但 time-pillar.html 和 geo-system.html 是不同的页面**。当我在 time-pillar.html hover 商朝，地图不会同步——因为它们不在同一 window 里。

README 说"各维度组件联动响应"，但实际上跨页面联动是不存在的（没有 SharedWorker / BroadcastChannel / localStorage listener）。me.html 上的测试按钮（"TEST: 商"）能触发同页面的 era-mini-bar 高亮，但无法让 geo-system 跟着变。**这是 P0：功能声称≠功能实现**。

真正可以工作的联动场景：在 **同一个页面内** 同时嵌入多个维度组件（如 me.html 里的 mini 时代柱 + 纹饰网格），hover 时 `era-focus` 触发，同页面的纹饰高亮可以响应。但作为核心卖点展示，这个范围太窄，用户不会自己发现。

### 5. 事件总线调试面板对普通用户可见

me.html 底部有一整个黑底卡片"⚡ 事件总线调试"，包含 TEST: 商 / TEST: 西周 / TEST: 战国 三个按钮，还有 debug log 区域。这是开发者工具，不是产品功能。**对普通用户而言这是破坏沉浸感的噪音**，且占据了 me.html 底部宝贵的屏幕空间。

### 6. catalog.html 的 277 件处理方式是诚实但可用性差的半成品

Grid 显示 33 件，加一张"+ 244 件更多…"虚线占位卡。这张卡点击无反应（无 onclick），只是装饰。用户会问"我怎么看剩下的 244 件"——答案是：没有分页，没有 load more，没有虚拟滚动。README 说 catalog 显示 33 件 mock for speed，但 UI 上没有说明这是 demo 限制还是正常行为。**这张无响应的"+244件"卡会让用户以为是 bug**。

### 7. 铭文释读器——核心 wow 点，但发现路径太长

inscription-reader.html 的字字交互（点击单字→字义解读→铸主浮窗）是整个 demo 里我感受到最强学习愉悦感的环节。但用户要到达这里需要：首页 → 导航点"铭文" → 才能看到。

中途没有任何"诱饵钩子"把我拉到铭文页。v1-A 的铭文释读器是从 artifact.html 有直接链接引导过去的，v3 也保留了这个入口（"→ 进入铭文释读器"），但**这个入口只在 artifact.html 铭文卡片的底部**，需要先展开铭文 details，才能见到。如果我不点开鼎，我不知道铭文有多精彩。

### 8. scan.html——4 件快速演示，但少了"识别后下一步"引导

扫描识别流程（5步进度条→7维度点亮动画）视觉完成度高，比 v1 更清晰。但识别完成后，"加入收藏 + 查看详情 →"按钮是唯一 CTA——**没有"立即查看这件文物在时代柱/地图上的位置"的维度入口**。7 维度点亮列表（时代柱/地理/纹饰/形制/铭文/礼制/稀有度）每一行都是静态文字，没有可点击链接跳转到对应维度页面。这是把"一件器物点亮七个维度"的核心主张具体化的最佳时机，但没有兑现。

---

## Day-1 P0 问题的 delta 评估

| v1 P0 | v3 状态 | 评分 |
|---|---|---|
| 三版都缺 Day-1 / 0-state | 依然 mock 35件，无 Day-0 状态 | **未修复** |
| B 版移动端不可用 | v3 README 明确"移动端 deferred to v4" | 已知问题，已承认 |
| 三版段位/称号口径不统一 | 单一 demo，口径统一 | **已修复** |
| A 版 catalog tab 视觉太弱 | v3 tab 有下划线 + active 状态，清晰 | **已修复** |
| B 版 findability 弱 | 已有统一 sticky nav | **已修复** |
| 无搜索框 | catalog.html 有搜索框 | **已修复** |

---

## Things missing that I expected

- **Day-0 onboarding**：第一次打开，0 收藏，如何引导我进入收藏流程？连一行"现在扫描你的第一件文物"都没有
- **"撤回收藏"**：artifact.html 的 toggleCollect 函数只增加，不删除（代码里 `if (!now) collect(id, ...)`，从没设置 uncollect 分支）
- **跨页面真联动**：穿越模式的"联动"是同页面事件，不是真正的跨维度穿越
- **scan.html 识别结果维度链接**：7 维点亮列表无链接
- **catalog.html 的 load-more / 分页**："+244 件"占位卡无功能
- **breadcrumb**：artifact.html 无面包屑，从深层跳到深层，回退靠浏览器

## Things present that don't earn their place

- **me.html 的"事件总线调试"面板**：开发工具，占用用户空间，破坏沉浸
- **穿越模式按钮的双标签问题**："穿越模式 ●" 初始化 → 点一次变 "联动 ●" → 措辞混乱
- **index.html 维度卡格里的 emoji 图标**（⏳ 🗺 🌿 🛕 👤 📚 🏺）— v1-C emoji 调性不一致的问题在 v3 部分延续；这些维度卡是精品入口，配 emoji 与宋体+青铜色的整体调性冲突

---

## Severity ranking

### P0 — Blockers

1. **穿越模式跨页面无效**：核心卖点功能在跨页场景下不可工作。event-bus 是 same-document CustomEvent，跨页面根本不触发。**用户打开两个 tab（time-pillar + geo），没有任何联动**。这是产品核心叙事的根本性失实。
2. **Day-0 / 0-state 依然缺失**：三轮迭代，此问题从未修复。新用户进来看到别人的 35 件收藏，完全没有入门引导。需要最低限度的"开场三步"：选个称呼 → 扫描第一件 → 看到第一个维度点亮。
3. **me.html 事件总线调试面板暴露给用户**：这是非预期的开发者工具泄漏，破坏产品可信度。

### P1 — High friction

4. **顶部导航 9+1 个项目**：超过认知负荷上限，礼制场景/铸主/铭文应降级为二级入口或 artifact.html 内入口。
5. **catalog 的"+244 件"占位无响应**：用户会认为是 bug，需要改成分页 or 明确提示"demo 仅展示 33 件"。
6. **scan.html 识别结果缺维度链接**：7 维点亮列表是静态文字，错失了将用户引导进深度内容的最佳入口。
7. **撤回收藏不可用**：toggleCollect 只加不减。

### P2 — Nice-to-have

8. 穿越模式按钮标签词不一致（初始"穿越模式"→点后"联动"），需统一到"联动"或"穿越"一个词。
9. 维度卡 emoji 与整体宣纸调性不一致，建议换成线描文字图标（如"时"代替 ⏳）。
10. artifact.html 右列 5 张卡片（⑦-⑪）默认全展开，右列等效于一个长 scroll，建议 ⑧⑨⑩⑪ 默认折叠，仅展开⑦学术地位。
11. breadcrumb 缺失，特别是 artifact → catalog 回退路径。

---

## Bottom-line: v3 vs v1

**v3 比 v1 整体提升明显**。

- **findability 大幅改善**：统一 sticky nav 解决了 v1-B 的最大问题；搜索框、tab 视觉改善解决了 v1-A 的 P1；维度卡墙 8 格比 v1 的三维度更完整
- **信息层级进步**：artifact.html 引入 details 折叠 + 编号序列；catalog 的形制树折叠比 v1-A 的平铺好
- **诚实设计**：me.html 无假进度条是正确决定，称号隐式推导比"差 N 件解锁"更有人味
- **scan.html 的 7 维点亮动画**是 v3 新增的 wow 点

但 **P0 清单没有清零**：
- Day-0 0-state 跨三轮仍未解决
- 跨页联动是声称功能但未实现
- me.html 调试面板暴露

**综合排名：v3 UX 完成度 > v1-C > v1-A > v1-B**，约比 v1-C 提升 30%。但剩余 P0 足以让一个真实 demo night 场景失去说服力。
