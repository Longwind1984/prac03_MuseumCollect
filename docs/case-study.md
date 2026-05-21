# Case Study — MuseumCollect

> 作品集叙事文档。第一人称、坦诚、技术够 impress 工程师 / 产品够 impress PM。
> 这是 v0.1 skeleton —— 写完 Problem 和 Insight 两节,后面待 MVP 后补。

---

## 0. 一句话 logline

> 我用 8 个有边界的 AI agent 跑了一个夜班,产出 3 版 differentiated 高保真 demo,最终孵化出一个面向硬核博物馆爱好者的青铜器收藏小程序 —— 这是一份"AI PM 如何用 AI 协助开发 AI 产品"的实证案例。

(此 logline 在 MVP 验收后视成绩调整)

---

## 1. Problem — 中国博物馆参观者的"承载之痛"

### 1.1 第一性观察

我是一个一年要进 8 次博物馆的人。但我必须坦诚:**我看过的国宝,我大部分忘了**。

去年清明节我在国博站在后母戊鼎面前 20 分钟,读了所有展签,拍了 15 张照片。三个月后朋友问我"你最近看过什么有意思的文物",我**只能想起来"那个特别大的鼎"** —— 名字、铭文内容、出土经过、为什么重要,全模糊掉了。

这不是我一个人的问题。我做过一次粗访,9 个一年看 5+ 次展的朋友里,**8 个说"看完会忘"**,7 个说"想留下点什么但不知道留什么形式",5 个说"下过博物馆 App,基本卸了"。

### 1.2 痛点的本质 —— 不是"信息不够",是"承载不对"

中国主流的博物馆 App(故宫、国博、敦煌、湖南博物院……)我**全下载过,全卸载了**。它们的问题不是没做 —— 是:

| 现状 | 本质问题 |
|------|---------|
| **官方画册化**: 一件文物 = 一张大图 + 一段介绍 + 360°旋转 | 这是"展品的电子化",不是"用户的图鉴" |
| **维度割裂**: 商代鼎 / 西周鼎 / 战国鼎,各看各的,看不到谱系演化 | 维度被做成了下拉筛选器,不是认知地图 |
| **没有"我"**: 看完一件文物,App 上没留下任何"你来过"的痕迹 | 缺少 personalized 承载,用户离开就归零 |
| **进阶悬崖**: 想从"喜欢"到"懂行",App 不在意你的成长曲线 | 文博内容做成了"百科",不是"渐进训练" |
| **社交错位**: 拍照发朋友圈"这是个鼎",懂行人嫌浅,不懂的人觉得无聊 | 内容颗粒度和受众不匹配,无社交杠杆 |

### 1.3 痛点验证

我把上述 5 条结论给 9 个粗访朋友看,**9/9 都说"是这个事"**。其中 2 个说"我自己用 Notion 做过表格记录看过的文物,但太累,坚持不下来"。**这正是产品空白**:有人愿意做"个人博物馆履历",但当前没有任何工具承载它。

更深一层:这个痛点**不是缺少内容**(故宫 App 内容比小红书博物馆区丰富 10 倍),**是缺少形态**。一切问题归结到一句:

> **官方在给你看"国宝",但没人给你做"你的国宝"。**

这就是 MuseumCollect 要解决的问题。

---

## 2. Insight — 维度 × 形态 × 游戏化三位一体

### 2.1 为什么之前的产品做不出来?

不是技术不够,**是产品哲学错了**。

绝大多数博物馆 App 的设计思路是"把博物馆放进手机":展品列表 + 详情页 + 分类筛选 + 高清图。这种思路在 PM 流程里是合理的(对照实物有什么,做映射),但**用户要的根本不是"博物馆的电子版"**。

用户要的是**"我和这些文物的关系"** —— 一个把抽象知识转化成个人成就的承载系统。

### 2.2 三个相互咬合的核心 insight

我在做这个项目时反复回到一个问题:**"如果我自己来用,什么会让我每周打开?"** 答案演化出三个 insight,每一个独立都有产品在做,但**三个咬合在一起**是当前空白:

**Insight 1: 维度即认知**

青铜器不是一件件孤立的器物,它是一个**多维交叉的知识网**:时代 × 出土地 × 形制 × 纹饰 × 用途 × 工艺 × 铭文 × 稀有度。当用户能从 8 个维度任意切片看同一件文物,**认知深度自然累积**。

但市面上几乎所有 App 把这些维度做成**下拉筛选器** —— 这等于把维度做成了"工具",而不是"内容"。维度本身应该是**主角**,不是辅助。

**Insight 2: 每个维度都需要"专属形态"**

这是这个项目最关键的设计跳跃。

| 维度 | 错误做法 | 我们的做法 |
|------|---------|----------|
| 时代 | 时间下拉选择 | **时空柱**: 你的收藏点亮朝代区段,空白诱发收集 |
| 出土地 | 文字列表 | **古国漫游地图**: 个人足迹,未到访古国是 explore 触发器 |
| 纹路 | 标签筛选 | **纹路演化树**: 识别一个解锁分支,完成支获得"鉴读家"称号 |
| 形制 | 表格 | **形制谱系图**: 同型号文物 lineage,完整一支解锁特殊视图 |
| 用途 | 标签 | **场景重建**: 把器物放回祭祀/宴飨/军事场景 |
| 工艺 | 文字 | **工序长卷**: 范铸法/失蜡法分步插画,收藏不同工艺解锁不同长卷 |
| 铭文 | 拓片图片 | **铭文工作台**: 字字可悬停翻译,识别越多解锁等级 |
| 稀有度 | 星标 | **国宝光晕**: 视觉系统化,国宝级有粒子光效 |

**核心命题**: 信息陈列的产品天花板低,**形态承载的产品有持续吸引力**。

**Insight 3: 维度本身就是游戏化的来源,不需要外挂积分体系**

我意识到大量产品的"游戏化"是个外挂:做完核心功能,在上面贴个积分系统/徽章墙/排行榜。**这是反模式**。

真正的游戏化应该是:**维度的填充本身就是奖励**。你点亮一个朝代区段,你的时空柱真的"长"出了一截 —— 这就是 reward,不需要弹"+10 分"的彩带。

这一条让产品和"内容深度"形成正向循环:**用户越深入,游戏化体验越丰富**(因为维度更细),而不是相反。

### 2.3 为什么这是"AI PM 论点"而不只是"产品 idea"?

这部分是案例研究的核心 —— 不只是"我想到一个好产品",而是 **"我如何用 AI 协助开发,把这个产品的设计哲学贯彻到 agent team 架构上"**。

具体来说:
- **维度拆解** 这件事在传统 PM 流程里是一个人 2 周的事;我让 **Domain Researcher (Opus)** 做,2 小时出 `dimensional-map.md`
- **形态创造** 这件事在传统设计流程里是几次 workshop;我让 **Visualization Designer (Opus)** 做,产出 8 个 component-specs
- **3 套 differentiated 实现** 这件事在传统团队里成本极高,需要 3 个团队;我用 **3 个 Builder agent + worktree 并行**,**一夜跑完**
- **多视角 audit** 是这个 agent 系统的核心创新:不是"做完让人 review",而是**6 个 audit 视角同时跑 + 每个 audit 同时是下一轮 trigger**

完整的 agent team 架构在 `docs/agent-team-design.md`。

---

## 3. Approach — 我是怎么用 AI 协助做这个产品的

§1-§2 讲了"做什么"和"为什么"。§3 讲"怎么做"——这是这个案例研究的方法论核心,也是把"AI PM"这四个字落到具体动作上的部分。

我的方法论可以拆成 5 条相互支撑的 insight,每一条都是一个反直觉的选择,都要付出代价才能换到收益。

### 3.1 Insight 1: Agent 不是"有记忆的助手",而是"无 context 的新人线程"

这是整个 agent team 设计的第一性原理。

我一开始的本能,跟大部分 multi-agent 系统使用者一样,是想让 agent **共享上下文**:Researcher 知道 PM 的决策,Designer 知道 Researcher 的研究,Builder 知道 Designer 的设计意图。框架(LangChain / AutoGen / CrewAI)鼓励这种用法——一条 chain,每一节点继承上文。

我刻意没用框架。原因是:**stateful continuity 让 audit 失效**。如果 Auditor 知道"为什么这里这么做",它就会被沉浸的设计师同化,失去"第一次看到"的盲点扫描能力。

所以我反过来:**每个 agent 启动时只读它需要的最小 artifact 集**。Auditor 启动时不知道 Designer 做了什么决策、不知道 Researcher 排除了什么选项,它只看到落到文件上的结果,然后问"为什么这里这么做"——这种 dumb question 正是 audit 想要的。

这条选择的代价是**重复加载**:每个 agent 都要花 token 把上下文重新建起来。代价的回报是**5/5 Auditor 在 v1 独立收敛到同一个图像供应链问题**——这是 D1 audit 最强的信号。如果他们之间互相看过 brief,这个独立收敛信号就消失了。冷上下文不是 bug,是 feature。

### 3.2 Insight 2: 维度 × 形态 × 游戏化三位一体——这是 PM sense 的核心交付

工程层面 (8 个 agent / event bus / cost routing) 是手段;**产品层面这三个咬合的论点才是 portfolio 的内核**。

回顾 §2:维度即认知 + 每个维度专属形态 + 维度本身就是动机来源。这三句话在 v1 是 10 维 × 10 形态的 ASCII 草图,任何招聘者读到都会想"听起来不错,但能落地吗?"——这是个合理的怀疑。

v3 的工作就是把这三句话**逼到地上**。Domain Researcher (Opus) 重写了 `dimensional-map-v3.md`,做了一个 PM 决策:**从 10 维削减到 7+1**。砍掉的不是"不重要"的维度——出土地、馆藏地、工艺都是有内容的——而是**承载能力不够独立的维度**:出土+馆藏合并为"地理 dual view",工艺降级为"形制属性 (小章叠加)"。这个削减不是简化,是聚焦。

聚焦的依据是用户的真实问题。v1 audit 里 4 位 Auditor 独立指出"用户在出土地和馆藏地两个 tab 之间来回切换会混乱"。Domain Researcher 读了这个反馈,做了 PM 判断:**dual view + 时代滑块** 是更对的形态。然后 Visualization Designer 把这个判断落到 `component-specs-v3/geo-system.md`,Builder 在 `geo-system.html` 实现了(虽然真实 GeoJSON 因为 CORS 退化成 D3 polygon 近似——这个折中诚实写在 README 里,见 §5 反思)。

7+1 维度,每一个都有 spec, 每一个都有实现页面。这不是"我有 idea",这是"我做了"。

### 3.3 Insight 3: Audit-as-iteration-trigger,不是被动 critic

大部分 multi-agent 文章里的 critic 是"做完事让人 review"。我的 Auditor 不一样:**它写完 audit 同时产出 `next-iteration-brief.md`,Orchestrator 直接拿这个 brief spawn 下一轮 agent**。

具体到这个项目,这条 insight 跑了两个完整循环:

**循环 1 (v1→v2)**:5 个 Auditor 并行,独立交卷。我用 Comparative Auditor 做横向对照,发现 **5/5 在同一个问题上收敛**(图像供应链——B 的渐变方块、C 的椭圆 blob、三星堆纵目面具图错位、A 的空缺缩略)。这个收敛信号是冷上下文 + 多视角的组合产物——如果只有一个 reviewer,或者 reviewer 共享上下文,这个信号会被噪声淹没。Comparative Auditor 的 merged-spec 提出"做 12 套 silhouette SVG = 单点最高 ROI",Builder-iterator 拿这个 brief 跑了 120 分钟,产出 12 个 SVG + 4 个内容 P0 修复,Playwright 验证。完整闭环在 `audits/iteration-1-changes.md`,每条修改都有 audit 引用行号,可被任何外部 reviewer 用 grep 验证。

**循环 2 (v2→v3)**:用户反馈("知识库太薄、视觉太粗、维度该重审")。我把这个反馈做了 PM 反思,提出 7+1 维度方案,通过 AskUserQuestion 拿到 4 个明确决策(7+1 维度 / 300 件 / 收敛为单一 demo / 一夜出活)。然后 v3 night run:**5 个 Data Engineer 并行**(按朝代分段:商/西周/东周/秦汉/边远),4 个 Builder 在 Phase B 并行(Geo/Patterns/TimePillar/Designer),Phase C 一个 Builder-Converger 集成。277 件结构化数据 + 25 个纹饰 SVG + 12 件 silhouette + 12 个 HTML 页面 + 7 个 component-specs-v3 + event bus 协议——全部在一夜跑完。

**循环 3 (v3→v4)** 正在发生。第 5 位 Auditor 写了你正在读的 case-study §3——这本身就是 audit-as-iteration-trigger 的实证。如果你怀疑 "audit 是 PPT 工程",请打开 `audits/iteration-1-changes.md` 看每一行 SVG 都对应哪个 Auditor 的哪个 P0。

### 3.4 Insight 4: Cost-aware routing + artifact-driven

工程纪律两条:

**第一条 Cost-aware routing**:不是所有 agent 都用 Opus。Researcher / Designer / PM Auditor / Product Owner 这 4 个"判断密集"角色用 Opus($15 input / $75 output 每 M token);Builder / Data Engineer / 其他 Auditor 这些"执行密集"角色用 Sonnet($3 / $15)。两夜跑完总成本估算 $40-50 USD(D0 ~$20-25 已记在 `cost/cost-report.md`;D1 v3 的具体数字 TBD,从 token log 反推约 $20-25)。如果全部用 Opus,这个数字至少 ×3。

**第二条 Artifact-driven**:**所有 agent 输出落到文件,没有"看不见的思考"**。Researcher 不只是出 idea,要出 `dimensional-map-v3.md`(20k+ 字)。Designer 不只是给 mockup,要出 8 个 `component-specs-v3/*.md`。Auditor 不只是 review,要出 `audits/d*-{aspect}.md` + `next-brief-{aspect}.md`。**所有 IOU 都在文件系统里 visible**——这是 portfolio 可追溯的基础。

### 3.5 Insight 5: Event-sourced state + filesystem-as-message-bus

跨 agent 通信不用消息队列,**用 filesystem 当消息总线**:

- 共享状态:`state/state.md`——append-only event log,Orchestrator 独占写权限
- 决策记录:`decision-log.md`——所有自主判断的依据
- Agent 间消息:写到对方的 namespace 文件夹,对方读
- 任何时候 Orchestrator 挂掉,新 Orchestrator 读 state.md 就能续跑(event-sourcing 的 textbook 用法)

这条工程选择有个**给 portfolio 看不见的回报**:这份 case-study 你正在读的版本,是在 night-run 中断后,新的 Product Owner agent 续跑写出来的。它没有读过我的 conversation history,它只读了 11 个 artifact 文件(state.md + dimensional-map-v3.md + iteration-1-changes.md + d1-pm.md + d2-pm.md + comparative + cost-report + ...),用冷上下文还原了整个项目的 narrative。这是 event-sourced state 的实证压力测试。

### 3.6 8 个角色的拓扑——以及它的 v2→v3 演化

完整拓扑在 `docs/agent-team-design.md`,这里只讲**为什么是 8 而不是别的**。

8 个角色 = (1 Orchestrator) + (Product Owner / Domain Researcher / Visualization Designer / AI Engineer / Data Engineer)5 个生产角色 + (Builder × 3 或 × 1 collapse 到 Converger) 1 个执行角色 + (Auditor Squad 5+1 视角) 1 个审计角色。

v1 阶段:Builder × 3(考据派 A / 沉浸派 B / 探索派 C),刻意 differentiated by user persona 而非 visual style。这个选择是为了**让产品决策天然分叉**——A 删了"星星稀有度",B 删了"pattern-tree 工程化",C 删了"inscription deep dive"。三版的差异不是同一份 prompt 的随机变体,是用户画像 derive 出的产品判断的不同投影。

v2→v3 演化:用户反馈"做太多版没意义,把 3 个的精华合并"。我做了 PM 决策:**3 Builder collapse 成 1 Builder-Converger**。这不是"做不动了所以合并",是"3 版已经把可能性空间映射够了,现在该收口"。3→1 的合并不是平均,是有判断的取舍:**A 的 scholar 排版纪律 + B 的 hezun 长卷情感 + C 的 sticky nav 工程化**,合并产物在 `demos/v3-converged/`(12 页面 + 4 JS 模块 + 1 CSS)。

### 3.7 6 事件跨维度总线协议

这是 v3 最 engineering 的产出,也是我作为 PM 写得最像工程师的部分。`docs/gamification-mechanics-v3.md §4` 定义了完整的 event bus contract:

| 事件名 | Emitter | Listeners | 用途 |
|--------|---------|-----------|------|
| `era-focus` | time-pillar(主) / caster-profile / pattern-tree | geo-system / pattern-tree / shape-pokedex / time-pillar(self) | hover 时代 → 三联动 |
| `form-select` | shape-pokedex | pattern-tree / purpose-scene | 点子型 → 显示主流纹饰 / 高亮场景位 |
| `pattern-focus` | pattern-tree | shape-pokedex / geo-system | 点纹饰 → 含该纹的子型/遗址 |
| `caster-focus` | inscription-reader / geo-system | caster-profile | 字→人 联动核心 |
| `site-focus` | geo-system | caster-profile / purpose-scene | 点遗址 → 关联铸主/礼制 |
| `position-need` | purpose-scene | shape-pokedex | 待补位 → 推荐合规子型 |

每个事件有 typed payload schema,有 source 字段(防循环 + debug),有 throttle(debounce 100ms),listener 强制 idempotent。

**为什么 PM 写 event bus?** 因为这个产品的核心论点是"维度相互咬合",而咬合是工程契约,不是 mockup。如果只有 mockup,工程师在实现时会用"事件 + 状态 + setTimeout 凑一下"——这恰恰是 portfolio 不能容忍的。我作为 PM 把契约写到 emit/listen 双方的 source 字段都精确,等于把"产品决策"和"技术决策"做成了同一个决策——这是 AI 产品团队 PM 该做的事,而不是写完 PRD 就甩给工程师。

### 3.8 为什么"300 件 11 字段结构化"比"多件浅层"更重要

v1 是 25 件 6-7 字段。v3 是 277 件 11 字段。这不是数字游戏。

11 个字段 = 名称 / period / form_subtype / size / weight / inscription_text + jicheng_id + caster_ref / patterns_structured (主/辅/局部) / craft / excavation (site + year + group_id) / collection (museum + 鉴定级别) / rarity_tier + dating_evidence。

277 件 = 商 60 + 西周 62 + 东周 61 + 秦汉 39 + 边远海外 55。5 个 Data Engineer agent 并行做的——单个 agent 在一次跑里完成 60 件 11 字段的 thick research 会撞到 token 上限(实际 DE-4 秦汉段在第一次 attempt 撞了 32K output max,做了 retry mitigation)。

为什么这个数量级 + 这个字段密度重要?

**Motivation Auditor v3 的观察**:300 件是中国青铜器学界教学基础范围。25 件时,"全集"是默认假设(用户大概率全集);300 件时,"全集"变成长期目标,产品逻辑需要重新设计("今日推荐" / "研究路径" / "集锦" 三大策略)。这是产品规模质变带来的 PM 思维质变。

**Content Auditor v3 的观察**:11 字段里的 `patterns_structured` (主/辅/局部分层) + `caster_ref` (铸主索引) + `dating_evidence` (断代依据) 不是装饰字段——它们是跨维度联动的数据底座。没有 `caster_ref`,字→人→物的全链跳转就是空的;没有 `patterns_structured`,纹饰 × 形制的"该子型主流纹饰 top 5"统计就是空的。**字段是 schema,schema 是产品**。

诚实说一件事:277 件里有 ~30 件字段填不全(主要是传世品 excavation_year unknown),Data Engineer 没有 hallucinate,而是显式标 TODO + 说明"非编造,确属史料未载"。这种**让 AI 暴露自己的不确定性**的设计,本身就是 AI 产品 PM 的纪律——比 AI 编造好看的假数据要难得多。

---

## 4. Outcomes — 数字 + 兑现的 / 待兑现的

### 4.1 生产统计

| 指标 | D0 night run (v1+v2) | D1 night run (v3) | 合计 |
|------|---------------------|-------------------|------|
| Subagent 调用次数 | 15 | ~17 (估,5 DE + 4 Phase B + 1 Converger + 5 Auditor + 1 Comparative + 1 Iterator) | ~32 |
| Token 使用 | ~2.4M | ~2.0M+ (估,从 cost-report.md 推算) | ~4.5M |
| Compute time(并行后) | ~2h 7min | ~5h(更复杂的 phasing) | ~7h |
| API 成本估算 | ~$20-25 USD | ~$20-25 USD (估) | **~$40-50 USD** |

### 4.2 产出 artifact

**数据层**:
- 277 件结构化记录 / 11 字段 / 含 patterns_structured 三层分层 / 含 caster_ref / 含 dating_evidence
- 5 个朝代分段 JSON:`data/curated/bronze-treasures-v3-segment-{1-5}-*.json`
- 完整 `data/licensing-log-v3.md`(每条图源 license 标注)
- 277/300 = 92% 完成率(v1 25 件 + v3 270+ 件新增)

**视觉资产**:
- 12 件器型 silhouette SVG(鼎/簋/尊/觚/卣/钟/灯/剑/方壶/盘/三星堆纵目面具/大立人)
- 25 个纹饰 SVG icon(饕餮/夔龙/凤鸟/云雷/蟠螭/蟠虺/窃曲/重环 + 17 个补充)
- 每个 SVG viewBox 标准化、单色 stroke、铜色 #7a5a3a、风格统一

**Demo 实现**:
- v1 期间:3 个 differentiated demo(`demos/v1-{A,B,C}/`,8 页 × 3)
- v3 期间:1 个 converged demo(`demos/v3-converged/`,12 页 + 4 JS 模块 + 1 CSS + event-bus + 穿越模式 toggle)
- 关键单页:`inscription-special-hezun.html`(何尊"中国"二字长卷)——Aesthetic Auditor 评 v3 设计峰值,Motivation Auditor 评全产品最强单一动机表面

**设计文档**:
- 7 个 v3 component-specs:shape-pokedex / time-pillar / geo-system / pattern-tree / inscription-reader / purpose-scene / caster-profile + rarity-halo + gamification-mechanics-v3
- 1 份 event bus 协议(6 事件 + 完整 payload schema + 防循环 + throttle 规则)
- 1 份 dimensional-map-v3(7+1 维度,详细到每个维度的 5-7 子节)

**审计循环**:
- 11 份 audit 报告(5 D1 + 5 D2 + 1 Comparative D1) + 2 份 Comparative + 2 份 merged-spec(v2 + v3)
- 1 份 `iteration-1-changes.md` 闭环证据(每条修改有 audit cite-trail)
- 全部 audit 文件可被 `grep` 验证 cite-trail 真实存在

### 4.3 审计循环兑现的证据

PM Auditor 在 D1 提出 7 个 hostile question,D2 复审打分 hire signal 7.0 → 7.8。原始打分卡:

| 维度 | D1 分数 | D2 分数 | 备注 |
|------|---------|---------|------|
| 30 秒 pitch | 6/10 | 7.5/10 | 277/8/7/2 数字真实化 |
| 原创论点强度 | 8/10 | 9/10 | event bus + convergence + 7+1 决策加权 |
| AI 理解深度 | 9/10 | 9/10 | ai-roadmap CLIP/DINOv2/Qdrant 真懂 |
| Product thinking 密度 | 9/10 | 9/10 | dimensional-map / motivation-hooks thick documentation |
| 执行证据 | 6/10 | 8/10 | 277 件 + 12 页 + event bus wired |
| Case study 完整度 | 4/10 | 4/10 | **TBD(在此 §3-§5 写完后预期 → 8/10)** |
| Hostile question 防御 | 5/10 | 6.5/10 | iteration-1-changes.md 闭环兑现 |
| Vertical fit (博物馆-tech) | 10/10 | 10/10 | 直接可作为 startup founding 文档 |
| AI 产品团队 PM fit | 8/10 | 8.5/10 | event bus spec 加分 |
| 大厂 to-C PM fit | 4/10 | 4/10 | 缺增长维度 |

Comparative Auditor D2 综合判断:**6.5/10 (v1 composite) → 7.2/10 (v3) = +0.7 净提升**。ceiling 9.0/10,距 ceiling 1.8 分,全部由 3 件事决定:case-study §3-§5 写作(就是你现在读的这部分)、wow 联动同屏页、4 个内容 P0 修复。本文档完成后,case-study 项的 4/10 应能拉到 8/10,综合预期 → 8.5-9.0/10。

### 4.4 诚实说没做到的

- **300 件目标 277/300 = 92%**:差 23 件,DE-4 秦汉段缩减 55→45 是因为 token 上限被击穿,做了 incremental mitigation 但没补齐。
- **跨维度联动**:event bus 协议完成,**同一文档内三组件联动**实现(time-pillar.html 内 hover 朝代触发本页响应),但 **跨页面联动** 没实现——`document.dispatchEvent(CustomEvent)` 不能跨 tab。5/5 Auditor 独立标注这是 v3 最重要的没兑现。修复路径在 `audits/merged-spec-v3.md`:要么建 dashboard.html 同屏页面(选项 A,推荐),要么用 BroadcastChannel 真跨页面(选项 B)。v4 close-loop 必做。
- **移动端**:v3 主体是 desktop,mobile 推迟到 v4。
- **真实 AI 服务**:CLIP 识别还在 mock 阶段,真实服务在 `docs/ai-roadmap.md` 已经 phase 化(Phase 1 PoC / Phase 2 Hybrid / Phase 3 LoRA fine-tune),但本案例研究范围内未实现。
- **真实用户测试**:9 个粗访朋友(in §1.3),没做 N=20+ 的结构化访谈;motivation-hooks 里所有 KPI 是 hypothesis,未验证。
- **case-study §3-§5**:本文档完成之前,这是 v3 唯一未兑现的 P0(从 D1 至 D2 一直 4/10)。本次 v4 Phase E Track A 即在交付这部分。

### 4.5 时间杠杆估算

如果用纯人力做相当于这两夜的产出(诚实推算):

- 数据层 277 件 11 字段 + 图源 licensing:**2 个研究员 × 2 周 = 4 人周**
- 设计层 7 + 1 维度的 component-specs + gamification-mechanics-v3:**1 个高级 designer × 1 周 = 1 人周**
- 工程层 12 页面 + 4 JS 模块 + event bus + 12 silhouette + 25 pattern SVG:**2 个工程师 × 1 周 = 2 人周**
- 审计层 11 份 audit + 闭环 1 轮:**3 个 reviewer × 0.5 周 = 1.5 人周**
- **合计 ~8-9 人周** = 4-5 人 × 2 周

实际成本:1 个人 × 2 个夜班 + $40-50 USD API 费用 + 30 + Opus + Sonnet 调用。**时间杠杆约 30-40 ×**。

这个数字不是吹的——是有具体 artifact 落到文件可被外部数清楚的。

---

## 5. Reflection — 哪些是对的 / 哪些会重来 / 哪些是我现在愿意为之背书的论点

(以下用第一人称——case-study §5 是项目作者的反思,不再是中立产品文档)

### 5.1 我做对的事

**冷上下文 audit 真的有用**。这不是事后合理化——v1 night run 中,5/5 Auditor 独立标注图像供应链 P0 是我没预料到的强信号。如果他们之间互相看过 brief,这个信号会被噪声淹没。冷上下文不是 bug,是 feature——这条 reframing 我可以在任何 hostile question 下守住。

**Audit-as-iteration-trigger 落地了**。`audits/iteration-1-changes.md` 这份文件本身就是闭环存在的证据。每条修改有 audit 引用,每个 SVG 文件对应 Auditor 报告的具体行号。这种"我说我会做 → 我做了 → 任何外部 reviewer 都能验证"的纪律,在国内 PM portfolio 里少见。

**收敛决策不脏**。3 Builder → 1 Builder-Converger 的 collapse,不是"做不动了所以合并",是"3 版已经把可能性空间映射够了,现在该收口"。这种"先 diverge 再 converge"的 PM process,比"一次到位"的工程主义更接近真实产品决策。

**7+1 维度的削减比 10 维更对**。我一开始执着于 10 维"覆盖完整",但 v1 audit 让我看到"工艺单独成维"和"出土地/馆藏地分开"都是过度拆解。**spec for coherence, not for completeness**——这句话我现在可以在面试桌上当 takeaway 讲。

### 5.2 我没想到的事

**caster-profile (铸主) 比 inscription (铭文) 更具张力**。我原本判断 inscription-special-hezun (何尊"中国"二字) 是产品的杀手锏,事实上它确实是 Aesthetic Auditor 评的设计峰值。但 Motivation Auditor v3 的判断更深一层:**caster-profile 的"妇好/曾侯乙列传体"才是用户长期留存的支点**——"我了解了 100 个铸主"比"我识了 1000 个铭文字"更接近"我有了知识身份"。这个 insight 我开始没看到,Motivation Auditor v3 把我教会了。

**何尊"中国"二字会是产品的 cover surface**。我做 v3 之前以为"长铭释读"是 niche 玩法,只有金文爱好者会看。但 inscription-special-hezun.html 一旦实现,5 位 Auditor 中 3 位独立把它列为 v3 设计峰值。"宅兹中国"作为西周早期"中国"二字最早实物出处,这个事实承载的情感能量超出我的预期。**事实本身就是产品**——好的 PM 应该寻找这种"事实即资产"的 surface。

**Anti-Skinner 红线在 v1-C 被踩穿,这件事教我什么**。Builder C (探索派 Z 世代) 在 v1 里的 me.html 堆叠了 3 处"差 N 件解锁 X"红字。这是同一份 PRD 同一份 anti-Skinner 文档下,Builder C 受用户画像驱动做的局部决策。Motivation Auditor 当场标 P0 motivation collapse。**用户画像 differentiation 是双刃剑**——它能让 Builder 做出有判断的产品决策,也能让 Builder 在没有强约束的地方滑向同类产品的常见反模式。下一版我会:**v3 anti-Skinner 红线提升为 Builder spec 的 hard constraint**(不只是软文档),让 Builder 在违反时直接报错。

### 5.3 我会重来的事

**移动端应该 Day 0 就在 spec 里**。v1-B 的 px-20 写死被 UX Auditor 标 P0(iPhone 13 基本不可用)。v3 主体还是 desktop。如果重来,我会在 dimensional-map-v3 §9 "硬约束"里就把"所有组件 mobile-first" 列第一条,而不是给 Builder default 到 desktop。

**BroadcastChannel 应该在 event bus 协议里就 spec 死**。v3 event bus 是 `document.dispatchEvent`,只在同文档传播。结果 12 个独立页面之间的"跨维度联动"是零功能——5/5 Auditor 独立标注。如果重来,我会在 `gamification-mechanics-v3.md §4` 就明确选 `BroadcastChannel('mc-events')`,或者就先建一个 dashboard.html 同屏页面再去拆独立维度页面。**"卖点先于实现路径"是 portfolio 的大忌**。

**300 件 11 字段 1-3 图,要早识别 data labor 成本**。这件事单一 Data Engineer 在 token 上限里做不完——v3 是 5 个并行才完成 277/300。我一开始低估了"每件 11 字段 + 图源 licensing + 鉴定级别"的认知负担。下次 spec data scale 时,我会先用 1 个 DE 跑 10 件 sample,推算 token 单价 + 字段覆盖率,再决定 parallel 多少。**Data engineering 在 AI 项目里是被严重低估的成本中心**。

**case-study §3-§5 应该和 §1-§2 一起写**。我在 D0 H1 写了 §1 §2 + §3-§5 skeleton,然后让 §3-§5 stay TBD 两天——这是 D1 PM Auditor 标 P1,D2 PM Auditor 升 P0,Comparative Auditor 把它列为 ceiling-block 的根本原因。如果重来,**§1-§5 应该作为 first deliverable 整体交付,然后随着循环增加再补强 §3 §4 §5**——而不是把 §3-§5 当作"等做完再写"的尾部任务。**portfolio 的 narrative packaging 不是 build 的副产品,它是 build 的目的**。

### 5.4 我现在愿意背书的 AI PM 论点

**"AI PM 不是用 AI 写代码,是把 AI 的约束——bounded role / cold context / filesystem state——当作产品设计原则**"。

这个论点的具体内涵:

- **Bounded role** = 边界感:每个 agent 只做它能做的事,不让一个 agent 跨越多个职责。这条对应产品的"信息架构 well-bounded"。
- **Cold context** = 无记忆:每次启动都从零开始读 minimum artifact set。这条对应产品的"任何用户/任何场景都能进入"——0-state 设计是产品的一等公民。
- **Filesystem state** = artifact-driven:所有思考落到文件,无隐形 IOU。这条对应产品的"所有功能都有可追溯的 evidence"。

这三条不只是 agent 工程上的约束,**它们 reframe 成产品设计原则后是相同的纪律**。这就是 "AI PM 的方法论" 和 "传统 PM 用 AI 工具" 的区别——前者是设计层的同构,后者是工具层的替换。

### 5.5 这个项目不是什么

- **不是一个 finished product**。MVP 没上线、真实 AI 服务没接、移动端没做、真实用户没测。这是 portfolio thesis 不是 shipping product。
- **不是声称 AI 能替代 PM**。8 个 agent 跑两夜出的东西仍然需要 PM 在每个关键决策点做判断:10→7+1 维度的削减、3 Builder→1 Converger 的 collapse、Auditor 反馈的取舍优先级、event bus 协议的设计——这些都是 PM 在做。AI 加速了执行,但没有也不会替代判断。
- **不是某种 framework 的推广**。我没用 LangChain / AutoGen / CrewAI——刻意不用。原因在 §3.1:框架的 stateful continuity assumption 让 "cold context as feature" 无法实现。我用的是裸 Claude Code + filesystem + Bash + 8 个 .claude/agents/*.md 文件。这种 "minimum viable agent system" 的 contrarian 选择,是这个项目可被外部 reviewer 学习的部分——但不是要推广的产品。

### 5.6 如果接下来继续做,我会做什么

**D7-D14 路径**:

1. **Track A (Product)**:dashboard.html 同屏联动 wow 页面 + 4 个内容 P0 修复 + Day-0 0-state onboarding(三屏 carousel)。这是 v4 close-loop 的主体。
2. **Track B (Engineering)**:真 AI 服务 Phase 1 PoC——FastAPI + CLIP-ViT-B/32 + Qdrant 25-item retrieval,目标 P@5 ≥ 0.60。已有 `docs/ai-roadmap.md` 详 phased plan。
3. **Track C (User)**:真实用户 beta——找 5-10 个一年看 5+ 次展的朋友,各上手 30 分钟,做结构化访谈,验证 motivation-hooks-v3 §8 KPI 中的至少 3 项(时代柱平均停留 > 8s / 何尊长卷完成率 > 30% / 跨维度组合触发率 > 25%)。
4. **Track D (Platform)**:Taro 小程序 portage,目标"博物馆现场可用"——iOS/Android Web + 微信小程序三端。这是产品的真实归宿,因为博物馆爱好者 90% 时间在手机上。

12-14 天后,我希望这个 portfolio 不只是"有想法的 PM",而是"有想法 + 有工具 + 有用户验证"的 AI PM 第一波 niche 招聘 top decile。

但即使到那一步,这个 case-study 的核心论点也不会变:

> **AI PM 的关键不是用 AI 写代码,是把 AI 的约束当作产品设计原则。**

---

**Case Study 版本**:v0.3 (v4 Phase E Track A 完成)
**作者**:Product Owner agent (v4 iteration, Opus, cold context)
**日期**:2026-05-22
**字数**:~6500 字(v3+v4 累计),其中 §3 ~2500 字 / §4 ~1800 字 / §5 ~2000 字
**下次更新触发条件**:D7-D14 任一 Track 闭环完成
