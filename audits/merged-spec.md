# Merged Spec — v2 Direction

> Comparative Auditor · 2026-05-20 H7.5
> 这份文档是给下一轮 Builder / Designer / Orchestrator 的"决策书"。每一条都基于 5 位 Auditor 的具体 finding,引用 audit file 时已标注。
> 这不是"我的意见", 是 5 位 Auditor 的合成结论 + 我的裁决(只在分歧处)。

---

## TL;DR

**v2 应该是: 以 A 的内核(待补建议 / 引用 / 释读器纪律)为 spine, 用 C 的工程化外壳(top-nav / design system / mobile / 稀有度严格分层)做载体, 嵌入 B 的两页杀手锏(purpose-scene 礼器归位 / ancient-map 流散篇)作为情绪资产, 加一个全新的 0-state 入口和一个真长铭可读组件。三版的 mock seed 和 progression 语言先在产品定义层统一, 再让 Builder 落地。视觉资产层(silhouette SVG / 印章组件 / 引用脚注)做共享, 不再让三版各做一套。**

---

## Core decision: persona strategy for v2

> 这是 v2 启动前必须先回答的问题, 它决定了 Orchestrator spawn 几个 Builder agent。

### (a) 选 ONE persona, polish 到 portfolio-grade
- **优点**: 最聚焦, 4 小时也许能 ship 一个完整闭环, 减少 Builder agent 数量节省 token
- **缺点**: 浪费 day-1 已经做出的 B/C 杀手页(purpose-scene / 流散篇 / sticky nav / 稀有度系统);**portfolio "三版" 的故事被砍掉一半**——PM Auditor 已经识别"做三版而不是一版"是 portfolio 最 unique 的 angle
- **风险**: case-study §3 失去 "我用 multi-agent 跑 differentiated 实现 → 合成 merged-spec" 这条 strongest narrative

### (b) UNIFIED v2 demo + persona-switcher  **(推荐 ★)**
- **机制**: 一套 v2 codebase, 一个 `?density=A|B|C` URL 参数(或顶部小标签)切换"密度档位"。A 档 = 学术严谨密度; B 档 = 沉浸诗意密度; C 档 = 潮玩探索密度。视觉资产层 + 数据层 + 内容层完全共享, 只切 layout + density tokens + 文案 register。
- **优点**:
  - **保留三 persona 故事**: case-study 可以说 "我合成了 3 版, 让用户在自己的密度档位里看到同一套内容的三种语调"
  - **统一 mock seed + progression**: UX P0 协调层问题自然消失 ——用户切换档位不会看到不同段位数字
  - **silhouette SVG / 印章组件 / 引用系统** 一次做完三档共用
  - 应对 PM Auditor V3 (build cost): 三版合一的工程量小于 3 版独立
- **缺点**: 工程难度高一档(需要 density 系统), 4 小时内不一定能完整 ship —— **但 v2 不是 4 小时项目**, 是 v2 sprint 1 (2-3 天)
- **如何启动**: Builder agent 不再按 persona 分, 改按 layer 分(layout-builder / interaction-builder / content-builder)

### (c) Keep 3 demos, converge on shared design system
- **优点**: 不破坏 day-1 资产, Orchestrator 可以并行 spawn 3 agents 各自修 v1 demo
- **缺点**: UX P0 协调层问题持续(三版仍有 inconsistency);**portfolio 风险**: PM Auditor 已警告 "如果 v2 看起来是 ABC 拼贴, 原创度大跌"
- **适用场景**: 如果 v2 时间窗口只有 4-6 小时(单轮 close-loop), 这是最可行的;但中长期(D5)必须升级到 (b)

### 推荐: (b),  but tonight 执行 (c) 作为 close-loop proof

**为什么 split**: PM Auditor 强调 "tonight 必须有 close-loop 证据兑现"(V1 P0)。今晚 4 小时内只够 ship 1-2 个 Builder fix(选项 c), 把 v2 unified codebase 留给 D2-D3。这样:
- 今晚 close-loop: 选 1 个具体 high-leverage fix(见下 §"Confidence and recommendation for tonight"), 由 builder-A 或 builder-C 完成
- D2 morning 用户决策后, Orchestrator 重新 spawn `builder-v2-unified` 一个角色, 开始选项 (b) 落地

---

## Shared foundation (cross-cutting must-do)

> 这些是 4 位以上 Auditor 独立点出的问题, **必须解决, 否则任何 persona 策略都不成立**。

### 1. 图像供应链 / silhouette SVG 套 (10 套器型)
- **来源**: Aesthetic [P0-cheap-1, P0-cheap-2] + UX [P1] + Content [P0 三星堆图错位] + Motivation 隐式 + PM [Q5]
- **内容**: 鼎 / 簋 / 尊 / 觚 / 卣 / 钟 / 编钟 / 灯 / 剑 / 异形(三星堆面具)。单色 1.5px stroke 线描风格 (参考故宫数字文物库)。**不假装是图片, 诚实地说"这是它的影子"**。
- **共用**: B 的 `bronze-placeholder` 直接换;C 的 `placeholderSvg` 按 `a.type` 切换;A 的 `thumb-box` 暗灰版用于"待录入"
- **实施**: 25 件 × 30 分钟 = 12 小时, 可并行 ——**今晚单点 close-loop 的最佳候选**(详见 §"Confidence...")

### 2. Day-1 / 0-state design
- **来源**: UX [P0 blocker] + Motivation 隐式 + Aesthetic 隐式 + (PM 隐含通过 "mvp tangible artifact")
- **内容**: 0 收藏时, 三版的 index/catalog/me 应该长什么样;onboarding 3 屏 carousel ("你不是收藏家, 你是图鉴的主人" / "扫一下 → 5 维度同时点亮" / "从一件你拍过的文物开始")
- **风险**: 如果 v2 ship 时仍假定 7-9 件预设收藏, 所有"用户角色代入感"批评(陈翊安/苏念/阿K 不是我)持续存在

### 3. 统一 design tokens / 印章组件 / 稀有度视觉规则
- **来源**: Aesthetic 全文 + Motivation [v2 success criteria]
- **基线**: 以 A 的 `scholar.css` token 命名规范为基础 (`--paper / --ink / --bronze / --vermilion / --jade / --indigo / --rule-dark`), 把 B/C 的颜色/间距 token 全部映射上去
- **三档 hue**: `gold-treasure #d4a857` (国宝, 明亮) / `gold-formal #c9a85f` (一级, 中) / `gold-aged #8a6b3d` (普通铸件, 暗哑) ——色彩本身承载稀有度
- **印章组件**: A `.seal.jade` + B 大字 + 红框 + C `.rank-badge` 三套统一成一个, 3 size variant + 3 hue variant
- **稀有度规则**: 普通/三级/二级**完全无光晕**(只 border color), 一级仅 1px box-shadow, 国宝 conic-gradient + 朱砂章 + halo-spin 30s (来自 C, **教科书段**)
- **留白态组件**: A 的"未录入虚化" / B 的"未唤醒" / C 的"待踏足" 统一为一个组件 + 三种 persona variant + **统一语义: 是"待"不是"锁"**

### 4. 维度联动可视化 (核心 AI PM 论点的兑现)
- **来源**: UX [§"What to add" #6] + Motivation [§"What to add" #1 维度组合 unlock] + PM [论点 1 的兑现]
- **内容**: 点"加入收藏" → 视觉上看到 (1) 时空柱该朝代 +1 (2) 古国地图该地点亮 (3) 纹饰树该节点变色, 三件事**同一个动效, 同时发生**。这是 PM 论点 1 "维度 × 形态 × 游戏化" 的核心可视化, **三版都只在文档里描述, 没真做出来**。
- **位置**: 嵌入 `_partials/artifact-detail.html`(伪)模板的"加入收藏"按钮逻辑

### 5. Mock seed + progression 语言统一 (产品定义层任务)
- **来源**: UX [P0 协调层] + Aesthetic [P2 mock 数字] + Content + PM [V1]
- **新文档**: `docs/v2-progression-spec.md`, 内容包括:
  - 段位规则: "识字数"为单一变量, 阈值 50/150/400/1000/2500 字, 段位名 初窥/入门/一段/二段/.../大宗师
  - 称号规则: 隐式, 基于维度覆盖(如"夔龙派初识" = 识 3 种夔龙变体, "海内三宝集" = 收齐大盂鼎+大克鼎+毛公鼎)
  - 国宝率: 非 headline 数字, **不做"行业 4%"对照**, 不做排行榜
  - mock seed 数字: 反"齐整"化 ——具体见 Aesthetic §C-10
- **影响**: 这是 Builder 启动前的前置任务, 由 Product Owner agent 或用户决策

### 6. 长铭文阅读 = 故事豁然 (motivation 杀手锏 hook 的兑现)
- **来源**: Motivation [P2 missed upside, "highest-leverage v2 deliverable"]
- **内容**: 选何尊 122 字(短易做)或大盂鼎 291 字(中难), 字字 reveal + hover 释义 + 终末 payoff("您 现在 读完 了 武王 命令 盂 一段 的 完整 册命 文 —— 这 就 是 西周 早期 王 权 直接 表达 的 样 子")
- **为什么重要**: motivation-hooks.md §1.8 写了, 三版都没实现, **这是最 Skinner-immune、最 portfolio-defensible 的 expert hook**

---

## Per-component v2 fixes

| Component | v2 fix |
|-----------|--------|
| **time-pillar** | 留 A 的 1500px 真比例 + 朱砂引用边事件 + empathy 文案("夏代 史料 稀少 非 用户 之过");**新增**: 点 朝代 → "时代故事卷" 5-8 件 narrative (motivation-hooks §1.1 已 spec 未实现);事件密度从 v1 的 5 个增到 15+ |
| **ancient-map** | 留 B 的"穿越至 [朝代]"toggle + 流散篇全文案 + 朝圣护照 朱印帳风;**新增**: 跨维度组合 unlock 实时计算(`collected ∩ {商晚期 × 三星堆}` 触发"二重文明见证者"), 只在新触发时显示, 不做永久 badge |
| **pattern-tree** | 留 A 的拓片放大镜 `.loupe-disc` 圆形朱砂边;**新增**: 拓片家族 cross-artifact 视图 ("您 已 收集 6 张 含 夔龙纹 的 拓片 ——形成 一个 家族");**修**: 纹饰拓片线描风格 SVG 替换占位图 |
| **form-genealogy** | 修 C state.js GENEALOGY taxonomy: "尊盘" 归"尊"子型、簋的子型加四耳簋/附耳簋 (Content P1), 参考马承源系或朱凤瀚系不要自造;留 A 的同型对照墙第 4 格朱砂虚线"待补";**新增**: `taxonomic_function` 字段明确 form/function 分离 (Content §3.2) |
| **inscription-reader** | 留 A 的三栏切换 + 段位制框架;**修**: 段位机制不再是"字数累计 → tier"自动门, 改为用户在长铭文里 hover 一字 → 加入"识读档案", 段位是 hover 字数 × 在不同器中出现 ×, 不是单纯计数 (Motivation §"What to change");**新增**: JINWEN_DICT 从 20 字扩到 200 字, 至少覆盖 7 件长铭器物高频字 |
| **rarity-halo** | 留 C 的 5 级严格分层 (普/三/二无光, 一仅边, 国宝 halo-spin) + `.guo-bao-stamp` 内白边;**修**: 加回 5 级 ——把 C state.js rarityTier 二分法改回 A 的 `treasure-forbidden` 5 级 (Content [P1]) ——禁出境 195 件单独一级 |
| **craft-scroll** | 留 B 的火苗 SVG `<animate>` morph;**修**: 莲鹤方壶 craft 字段去掉"可能含失蜡法早期工艺"(Content §5.2 学界主流否认) |
| **purpose-scene** | 留 B 的 22 位太牢礼 + 火苗 + 等级判定 (P0 不能动);**修**: disabled toggle pills "燕飨/军礼/葬礼" 隐藏或挪 footer (Aesthetic [P1-incoherence-3]);**新增**: 扩展到 4 场景(已 spec) |
| **pilgrimage-passport** | 留 B 的朱印帳风 -3deg 旋转 印章 + dashed 外圈 + "流散篇 / 本应在家"叙事;**修**: 与 me.html 的"贵宾印章"功能重叠部分合并 (UX) |
| **国宝独白 / monologue** | 留 B 的第一人称叙事 + drop-cap 楷书 + 鎏金;**修 P0**: li_gui 独白病句 ("我被一位叫'利'的将领的器物" → "我属于一位叫'利'的将领");**修 P1**: 何尊"中国 = 国家最初的名字" → "中央之地 最初的 写法";**修 P1**: 妇好鸮尊"夜里看得清楚"加学术依据 cite (张光直 商代神话);**新增**: 独白要 ladder ——根据 collected_count 切换 3-5 种开场, 第 2 周用户不再看到 day-1 同一首诗 (Motivation §"What to add" #3) |

---

## Per-page v2 spec

> 8 pages × 继承哪一版 + 具体 fix

### `onboarding.html` (新增 — v2 首次访问)
- **继承**: 无(0-state 是新设计)
- **设计**: 3 屏 carousel, 可跳过。屏 1 "你 不是 收藏家, 你 是 图鉴 的 主人";屏 2 "逛 博物馆 → 扫 一下 → 一件 文物 在 5 个 维度 同时 被 点亮";屏 3 "从 一件 你 拍过 的 文物 开始"
- **视觉**: 复用 C 的 explorer.css palette + B 的"等过三千年"氛围词 (Aesthetic 推荐"暗黑 + 留白纸两主题")

### `index.html` (落地页)
- **继承**: C 的整体结构 (sticky top-nav + hero card 自动翻面 + 4 stat 同屏 + fade-up.delay 入场)
- **修复** (引用 audit file:line):
  - 删 C `index.html` "NEXT MILESTONE / 再 收 3 件 → 解锁 '商代 食器 子图鉴'" 整 block (Motivation [P0])
  - 改 C logo "青" 字渐变方块 → 朱砂单色方块 + 白字 (Aesthetic [P1-incoherence-1])
  - A `index.html:38-42` 把 "陈翊安 / 北大 / 甲编 No.00837" 改为 `data.js: USER` 占位 (UX brief #2)
- **新增**: 0-state 分支 ——`collected_count === 0` 时, hero 替换为 "开始 你 的 第一次 扫描" CTA + 3 张明星文物试试卡

### `catalog.html` (图鉴)
- **继承**: C 的 sticky nav + filter chips + silhouette-wrapper 剪影态 + "待踏足" 标签
- **修复**:
  - A `catalog.html:36-39` view-tab CSS 加 active 状态背景色 (UX [P1])
  - 移植 A 的三视图切换语义("按朝代 / 出土 / 形制") + B 的"按用途"作为第 4 视图 ——四视图合并 (UX brief)
- **新增**: 顶部全局搜索(UX [P1]);"按争议筛选" view (Content §5.3)

### `artifact.html` (详情页 — v2 旗舰页)
- **继承**: 默认折叠 + 用户主动展开。第一屏 = Hero + 5 维度卡片网格 (用 C 样式); 4 个可展开 accordion: 铭文释读 (A) / 同型对照 (A) / 工艺长卷 (B) / 国宝独白 (B)
- **修复**:
  - B 独白 li_gui 病句 (Content P0)
  - A `artifact.html` 7 组件并列默认全展开 → 折叠 accordion
  - C 中 `📖` emoji `artifact.html:99` → `<span class="text-xs text-stone-500 tracking-widest">STORY</span>` (UX brief #5)
- **新增**:
  - "断代依据" 块 (Content [P0]): `dating_evidence: {stratigraphy, co_excavated_with, style_phase, inscription_persona, 14c}` 渲染为表格
  - "集成号" 引用 (jicheng_id) 在引文表里 (Content §4.4)
  - 加入收藏按钮的"维度联动" toast (Shared #4)

### `me.html` (个人页 — 改动最大)
- **继承**: C 的卡墙稀有度光晕 + B 的 "苏念之卷"印章姿态 + C 的 "🌿 不必 每天 打开" banner
- **修复 (核心 motivation 重做)**:
  - **删 C `me.html:60-92` 5-stat headline grid** → 替换为 A 的 "待 补 · 研究 断面 建议" 三段具名缺口 + 候选器物 (Motivation [P0])
  - **删 C `me.html` "下一步 可解锁" + "即将 解锁" + 索引页"NEXT MILESTONE"** 三处 stack ——这是 C 踩 anti-Skinner 红线最严重的部分 (Motivation [P0])
  - **删 B "已得的称号"列表的 8 个 → cap 3** + 隐藏其余 "查看全部 N 个" (Motivation §"What to change", gamification-mechanics §6)
  - 替换 B 静态妇好鸮尊独白 → 按 collected_count % 5 切换的 3-5 种开场 (Motivation §"What to add" #3)
- **新增**:
  - "本 周 您 主要 在 西周 中期" 一行 weekly 行为叙述 (Motivation §"What to add" #2)
  - 撤回 / 编辑收藏 `⋯` 菜单 (UX [P1])
  - "复制 我的 图鉴 URL" 按钮 (UX brief #7)

### `time-pillar.html`
- **继承**: A 的 1500px 真比例柱 + 右侧 5+ 历史事件 + empathy 文案
- **修复**: B 的 sticky pillar 模式作为"诗意 mode"选项
- **新增**: 点 朝代 → "时代故事卷" 5-8 件 narrative (motivation-hooks §1.1, 三版都没实现)

### `ancient-map.html`
- **继承**: B 的 "穿越至 [朝代]" toggle + 流散篇 + 朝圣护照 (整页几乎完整复用 B)
- **修复**: 把"贵宾印章 / 流散篇 / 朝圣护照"三者关系搞清楚 ——me.html 显示个人印章, ancient-map 显示流散叙事, pilgrimage-passport 作为独立 collection (UX [P1])
- **新增**: 跨维度组合 unlock 实时计算 (Motivation §"What to add" #3)

### `scan.html`
- **继承**: A 的 8 mock seed (含原始 API 响应) + C 的 900ms 弹簧 reveal + B 的诗意 loading 文案
- **修复**: 统一 mock seed 为 6 种 ——houmuwu (高置信) / fuhao (中置信 3 候选) / ocr_houmuwu / inscription_he_zun / lowconf / nomatch (UX brief #8)
- **新增**: "DAY-1 WOW · 同时点亮" 动效在 first 3-5 次后 auto-dampen (Motivation §"What to keep" C-scan)

---

## Content corrections (from Content Auditor)

### Hard P0 errors to fix (今晚或 v2 sprint 1 必修)
1. **`demos/v1-B-immersive/js/data.js:60` li_gui 独白病句**
   - 当前: `"那一年, 我被一位叫'利'的将领的器物——他参加过武王伐纣"`
   - 改为: `"那一年, 我属于一位叫'利'的将领——他参加过武王伐纣"`
2. **`demos/v1-C-explorer/js/state.js` GENEALOGY taxonomy 错误**
   - 当前: "尊盘" 作为顶级器型 与 "尊" 并列
   - 改为: "尊盘组合" 归入 "尊" 子型; 同时给"簋"加四耳簋/附耳簋 子型
3. **`data/curated/bronze-treasures-v1.json` 后母戊鼎 patterns 字段**
   - 当前: `["饕餮纹", "夔龙纹", "云雷纹", "虎噬人头纹", "蝉纹"]` (五者并列, 把虎纹和饕餮平级)
   - 改为: `{"main": ["饕餮纹"], "secondary": ["夔龙纹", "云雷纹"], "local": ["虎噬人头纹(耳)", "蝉纹"]}` 区分主纹/辅纹/局部纹
4. **`bronze-treasures-v1.json:805` 三星堆纵目面具 image_urls**
   - 当前自承: "严格说该具体文件是青铜头像而非纵目面具"
   - 改为: 找到真正的纵目面具图; 或删除该条 URL 改用 placeholder
5. **`bronze-treasures-v1.json:914` 四羊首铜瓿**
   - 当前: 全字段 TODO
   - 改为: 填全(湖南博物院 1959 入藏, 商代晚期, 出土 宁乡黄材); 或从 v1 直接删除压到 24 件

### New academic dimensions to add (v2 schema 扩展)
- `dating_evidence: {stratigraphy, co_excavated_with, style_phase, inscription_persona, 14c, confidence}` (Content §4.1)
- `jicheng_id` / `tushijicheng_id` (《集成》/《图像集成》编号) (Content §4.4)
- `co_excavated_group_id` (同墓器物群 id) ——把妇好墓 5 件、曾侯乙墓 3 件、三星堆 3 件挂在同一 group (Content §4.2)
- `controversies: [{topic, schools, references}]` (学术争议 first-class) (Content §4.5)
- `inscription_rubbing` (拓本 URL 或 SVG) (Content §4.3)

### v2 sprint 2-3 (内容深化)
- JINWEN_DICT 从 20 字扩到 200 字(7 件长铭器物高频字)
- A 版增加 "字体阶段对照" 组件(选定一字 → 6 期字形演化 + 集成号)
- 同墓器物群视图 (妇好墓 / 曾侯乙墓 / 三星堆 K2)
- 拓本占位 (5 件长铭器物 Wikimedia Commons PD 拓本)

---

## Motivation system v2 fixes

### 必须删 (踩团队自己 anti-Skinner 红线)
1. **C me.html 的 "下一步 可解锁" + "即将 解锁" + index.html "NEXT MILESTONE"** 三处 stack ——gamification-mechanics §5.3 明确禁止 "差 N 件 解锁 X" 红字
2. **C me.html "国宝率 100% (行业 4%)"** ——vanity metric, Week 2 会随 catalog 膨胀而崩。降级为 A 的 quiet footnote
3. **C 的 5-stat headline grid** ——XP-shaped HUD, 替换为 A 的 "待 补 建议" panel

### 必须加 (跨 demo 共识)
1. **A 风格的 "待 补 · 研究 断面 建议"** 推广到所有 demo me.html 顶部位置 (Motivation "Keep verbatim")
2. **"Knowledge gap as progress" pattern** ——把进度的语言从"百分比 / X件" 改为 "您 当前 录入 集中 于 商晚期" + "您 已 覆盖 范铸法 9 件 但 失蜡法 0 件" (action-shape, not check-shape)
3. **"Almost there" affordance 重新定义**: 团队 anti-Skinner 红线允许 "almost there" 的语言, 但禁止 "差 N 件 / 字 解锁 X" 的红字紧迫感。v2 规则:
   - 单页最多 **1 个** "almost there" callout
   - 永远在 "用户 刚 做了 action 之后" 触发, 不在 first load
   - 语言改为 "您 当前 可 选择 的 研究 方向 → 大盂鼎 (西周早期, 含 您 未识字 若干)" 而不是 "再 3 件 解锁"

### 长铭文阅读组件 (v2 sprint 1 highest leverage)
- 选 何尊 122 字 或 大盂鼎 291 字
- 字字 reveal + hover 释义 (用 JINWEN_DICT) + 终末 narrative payoff
- **这是 portfolio close-loop 最强的 single deliverable** (Motivation "single highest-leverage v2 deliverable")

### B 的独白要 ladder
- 妇好鸮尊 monologue 按 `collected_count % 5` 切换 3-5 种开场 (mock 即可, 信号大于成本)
- 演示 "App 随用户成长" ——破除 Motivation §"P0 motivation collapse" 中"static narratives 第 4 周塌掉"的风险

### 跨维度组合 unlock 实时计算
- 现在 C 有静态 "二重文明 见证者 · 已达成" callout, **没实时计算**
- v2: `collected ∩ {商晚期 × 三星堆}` etc. 实时计算, 只在新触发时显示 callout, 用 localStorage 持久化 `last_seen_unlock_ts`

---

## Portfolio strengthening (PM Auditor priorities)

> PM Auditor 把"close-loop 兑现"列为 hire signal 的关键变量 (V1 P0)。当前 portfolio 7.0/10, close-loop 真兑现拉到 8.5/10。

### 最重要: demonstrate audit→brief→builder close-loop (one concrete iteration tonight)
- **必须**: 今晚 builder 真的响应至少 1 条 audit brief, 产出一个 commit / 一个新文件
- **不能**: 5 audit + 1 merged-spec 写完 + 用户睡着 + 没人 ship 任何东西

### Tonight 可执行的 single best fix
- **首选**: **生成 silhouette SVG 套 (10 套器型)** + 把 B 的 `bronze-placeholder` 和 C 的 `placeholderSvg` 接上
  - **理由**: 同时修 4 位 Auditor 的 P0/P1, 单点最高 ROI, 4-6 小时可完成, 闭环最干净
  - **Builder**: 可以让 builder-A 或 builder-B(熟悉 v1 demo css), 或新 spawn 一个 `builder-visual-assets` 单任务 agent
  - **接出物**: `assets/silhouettes/{ding,gui,zun,gu,you,zhong,bianzhong,deng,jian,yixing}.svg` + 三版 demo 各自 import 替换
- **备选 1**: **修 4 个 P0 内容错误** (li_gui 病句, GENEALOGY 尊盘, 后母戊纹饰列表, 三星堆图错位)
  - **理由**: 单点修复, 1 小时内可完成, 但 ROI 低于 silhouette (因为不解决视觉廉价问题)
  - **接出物**: 4 个 diff
- **备选 2**: **改 C me.html 删 3 处 anti-Skinner violation** + 改造为 A 风格"待补建议"
  - **理由**: 这是 Motivation Auditor 的 P0 No.1, 修复 portfolio "C 踩自己红线"的痛点
  - **风险**: 改动 me.html 全 layout, 不是单点, 4 小时可能不够

### Also need (D2-D5)
- `cost/cost-report.md`: D1 night-run 实际 Opus/Sonnet token + 等效 ¥ + 时间杠杆数字 (PM brief §4)
- `docs/case-study.md` §3 Approach 完整(D2 内), §4 Outcomes 骨架, §5 Reflection 初稿
- `docs/why-not-frameworks.md`: 防 PM V2 hostile question (LangChain/AutoGen/CrewAI)
- 20 字 logline (PM brief §1): 推荐 "把 博物馆 App 拆成 10 个 维度 × 10 个 形态, 然后让 8 个 AI agent 跑了 一晚"

---

## Open questions for user (escalate to morning-report)

> 这些问题产品决策权在用户。Comparative Auditor 给推荐, 但用户拍板。

### Q1: persona 策略选 (a) (b) 还是 (c)?
- **推荐**: (b) UNIFIED demo + persona-switcher
- **理由**: 保留 portfolio "3 版" 故事, 同时解决 UX P0 协调层问题
- **风险**: 工程量大, 4 小时不够, 需要 v2 sprint 1 (2-3 天)
- **fallback**: 如果时间紧, 今晚先 (c), 明早决策 (b)

### Q2: 长铭文阅读组件是否纳入 v2 sprint 1?
- Motivation Auditor 列为 "single highest-leverage v2 deliverable"
- 何尊 122 字(短易做) vs 大盂鼎 291 字(中难) 选哪个?
- **推荐**: 何尊 (122 字 + "宅兹中国"杀点), 工程量 2 天可 ship

### Q3: silhouette SVG 资产 ——内部画 还是 外包 还是 用 LLM (Claude 4.7 + image gen)?
- 25 件 × 30 分钟 = 12 小时内部画
- 设计实习生外包 ¥3000-5000
- LLM 生成 (Claude 4.7 + image gen) 可能 1-2 小时但**质量不可控**
- **推荐**: 今晚用 LLM 先 ship 10 套器型粗版作 close-loop proof, D3-D5 找设计实习生重做 refined 版

### Q4: 三版 mock seed + progression 语言由谁先定义?
- 这是产品定义层任务, Builder 不能自己决定
- **推荐**: Product Owner agent 在 D2 morning 内产出 `docs/v2-progression-spec.md` (用户 review), Builder D2 下午开始用

### Q5: 国宝独白下一批怎么写?
- 文学水准高(B 现有的 10 件)但有 3 处事实细节偏差
- 用户决策: (a) 请文案 + 内容审核双签 (b) 直接 prompt LLM + 内容审核人工 review (c) Builder-B 自己写
- **推荐**: (b), 用 LLM 起草 + Content Auditor 风格 review pass (从 5 audit 里抽 Content auditor 角色, 给 prompt review-only)

### Q6: 是否真上线 MVP (D10)?
- PM Auditor: 真上线 hire signal 7→8.5, 只到 demo 卡 7
- 成本: 后端 + AI service + 小程序 / web 端 + 100 件真实数据 + 微信小程序审核 (3-5 天)
- **推荐**: D10 上线 Vercel/Cloudflare Pages 静态部署(纯前端, 不做后端), demo + screenshots 链接放 portfolio。微信小程序版作为"下一里程碑"列入 case-study §4

### Q7: A 版预设角色 "陈翊安 / 苏念 / 阿K" 是否要保留?
- UX 强烈建议**不要**(劝退非陈翊安的用户)
- 但作为 portfolio 故事的"差异化 evidence", 三个 persona 是 PM Auditor 论点 3 的核心
- **推荐**: v2 unified 版 ——用户起名 + 选偏好 + 产品根据偏好动态调整密度。Persona "陈翊安/苏念/阿K" 只活在 case-study 文档里, **不出现在产品本身**

---

## Confidence and recommendation for tonight

### Is there enough time tonight to trigger ONE more close-loop iteration?

**YES**, 如果选对了 single fix, 4 小时内可以闭环。

### Recommended single fix tonight

**Generate silhouette SVG 套 + replace placeholder in B & C** ★

**Why this fix**:
1. **修 4 位 Auditor 的 P0/P1**: Aesthetic [P0-cheap-1, P0-cheap-2] + UX [P1] + Content [P0 三星堆图] + Motivation 隐式
2. **单点高 ROI**: 一组资产同时服务三版 demo, 是 Aesthetic auditor 推荐的 "shared foundation #1"
3. **可在 4 小时内完成**: 10 套器型 × 30 分钟 SVG 制作(LLM 起草 + 人工 refine) + 30 分钟接入 B 和 C 的 placeholder + 30 分钟测试
4. **可见的 visual proof**: D2 morning 用户看 C 的卡墙不再是 7 张同一椭圆 blob, 是 7 种不同器型剪影 ——立刻可看, 不需要解释
5. **PM Auditor 兑现**: 这是 "audit→brief→builder close-loop" 的最直观证据, V1 P0 漏洞瞬间堵住
6. **不破坏 day-1 资产**: 不删任何东西, 只加资产层, 三版各自添 import path

**具体 builder 任务清单**:
- [ ] 生成 `assets/silhouettes/ding.svg, gui.svg, zun.svg, gu.svg, you.svg, zhong.svg, bianzhong.svg, deng.svg, jian.svg, yixing.svg` (10 套, 单色 1.5px stroke 线描风格)
- [ ] 改 `demos/v1-B-immersive/css/immersive.css` `.bronze-placeholder` ——支持 `data-type="ding|gui|..."` 加载对应 SVG, 删 radial-gradient 渐变方块
- [ ] 改 `demos/v1-C-explorer/js/state.js` `placeholderSvg` ——按 `a.type` 切换 10 套器型 silhouette
- [ ] 改 `demos/v1-A-textual-research/css/scholar.css` `.thumb-box` ——暗灰版 silhouette 用于"待录入"
- [ ] Playwright 三版 catalog/me 页 0 错误
- [ ] state.md append `[2026-05-20 Hx] [builder-visual-assets] DONE — silhouette SVG 套 × 10 + 三版 placeholder 替换`

**Spawn 哪个 builder agent**:
- 新建一个 `builder-visual-assets` 单任务 agent (Sonnet 即可, 视觉资产不需要 Opus)
- 或复用 builder-C (最熟 v1 demo 的 placeholder 代码)

### If no time

If 4 小时不够, 把 silhouette 任务 D2 morning 第一件做。今晚至少 ship **Content P0 修复**(li_gui 病句 + GENEALOGY 尊盘 + 后母戊纹饰列表 + 三星堆图错位):
- 1 小时内 4 个 diff
- 但 ROI 显著低于 silhouette(不解决视觉廉价 + 不解决 portfolio close-loop 证据)

### If user wakes up before fix completes

**清楚地说明**: 5 audit + merged-spec + d1-comparative 已完成, single fix 推荐 silhouette SVG 套, builder 已 spawn / 未 spawn, 等用户确认。**不要假装兑现了**没兑现的 close-loop ——PM Auditor 警告"IOU 兑现"是 V1 P0。

---

*Comparative Auditor 合成 5 个 audit 视角 · 总字数约 4200 字 · 2026-05-20 H7.5*
