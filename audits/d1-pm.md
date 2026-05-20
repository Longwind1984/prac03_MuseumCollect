# PM Audit (Portfolio Lens) — Day 1

> Auditor 角色: 字节/腾讯/小红书/快手/美团 资深技术招聘 + Hiring Manager 视角。每周筛 50 份 PM 作品集,大部分十秒就关掉。本文是一个 hostile-but-fair 的同行评议,不是鼓励信。
> Audit object: `docs/agent-team-design.md` + `docs/case-study.md v0.1` + `docs/prd-demo-night.md` + `docs/dimensional-map.md` + `docs/motivation-hooks.md` + `docs/gamification-mechanics.md` + 8 个 `component-specs/*.md` + `docs/ai-roadmap.md` + 3 demo + `state/state.md` + 8 个 agent 定义.

---

## 我的 persona: 见过太多 "我做了个 App" portfolio 的招聘 lead

我看一份 portfolio 的判断流程是固定的:

1. **前 10 秒**: 一句话能让我记住吗?(60% 的人直接挂在这一步)
2. **前 2 分钟**: 论点是新的吗?还是 ChatGPT 调味料?
3. **前 10 分钟**: 执行有证据吗?还是 PPT 工程?
4. **面试时**: 我用敌意问题,他能撑住吗?

下面就用这套流程审。

---

## 30 秒 pitch test

候选人能不能在我喝一口咖啡的时间里,让我决定继续往下看?我尝试基于 portfolio surface 起草:

> "我用 8 个 AI agent 跑了一个夜班,产出 3 版完全不同用户画像的高保真青铜器图鉴 demo。核心论点不是'用 AI 写代码',是把**维度拆解 + 形态承载 + 游戏化**做成一个可被 agent team 架构反向支撑的产品哲学 —— 每一个青铜器维度都对应一个独有的产品形态,而 6 视角 cold-context audit loop 本身就是下一轮的迭代触发器。"

**评估这个 pitch**:
- **punchy 度**: 7/10。"8 个 agent 跑一夜出 3 版" 是个能让我抬头的具体数字,"维度 × 形态 × 游戏化三位一体" 是个能记住的口号。
- **原创度**: 8/10。"audit 是触发器,不是 review" + "cold context as feature" 两条我没在别的 portfolio 里见过。
- **可记忆度**: 6/10。还是太长。我去面试桌上五分钟后只会记得 "维度形态化的青铜器收藏" + "agent team 自审"。
- **风险**: 候选人到现在没有一句能在朋友圈一行刷过去的 logline。`case-study.md §0` 写的那句是 70 字,**太长**,需要砍到 20 字以内。

**我会给候选人的建议**: 把 logline 改成 ——
> "我用 8 个 AI agent 把青铜器拆成 10 个维度 × 10 个形态 × 1 套游戏化内核,跑了 3 版 demo,一晚上。"

(45 字,中段顿挫,数字密度高,够朋友圈和简历首行)

---

## 原创论点 inventory

我把整个 portfolio 翻一遍,真正"新"的论点是哪些?

### 论点 1: 维度 × 形态 × 游戏化 三位一体

- **是否新?** ✅ 真的新。市面上文博类 App 没有人做过 dimensional decomposition → 形态映射 → motivation hook 的 explicit chain。故宫 / 国博 / 数字敦煌 都是 catalog + filter,Artsy 是 social,Pokémon GO 用的是地图但没有 dimension。
- **是否炒作?** ❌ 不是炒作。`dimensional-map.md` 1.3w 字、`motivation-hooks.md` 1.9w 字、8 个 `component-specs/*.md` 平均 9000 字/个 — 这不是空话,是 thick documentation。
- **执行证据?** ✅ `time-pillar.md` 描述了"高度严格 ∝ 朝代时长"+"空白段呼吸"两条非显然的设计原则;3 个 demo 实际把这个落到了 HTML(虽然简化)。
- **PM 该怎么夸?** 这是这个 portfolio 唯一一个我可以让面试官记住的产品论点。**这一条值得做成 case-study 的眉题**。

### 论点 2: Audit Loop 是一等公民 + cold context as feature

- **是否新?** ✅ 在我读到的 multi-agent 系统文章里(Devin / Cursor / Aider / OpenAI Swarm),没人 explicit 提"auditor 同时是下一轮迭代的 trigger"。一般的做法是 critic → revise → ship。这里是 critic → next-iteration-brief → orchestrator 直接 spawn 新一轮 builder/researcher 。这是个**工程上更复杂但产品上更对**的架构选择。
- **cold context 这个 framing 真有意思吗?** ✅ 有。"新人视角是 feature 不是 bug" 这个 reframing,对于做 AI agents 的人来说是个反直觉点。普通工程师会想 "怎么让 agent 有更多 context",这里反过来说 "怎么用 context 缺失帮我看见盲点"。
- **执行证据?** ⚠️ Portfolio 当前还没法证明这个 loop 真的跑通了 — `audits/` 目录在我审之前是空的。这个论点强弱**完全取决于 Phase 4-5 的 auditor reports 是否真的"看见了团队看不见的东西"**。如果出来的 audit 都是"列了一堆小问题",这个论点会瞬间掉到 PPT 工程级别。
- **风险**: 如果 next-iteration-brief 里写的"下一轮该做什么"和 builder 真的回应了,这个论点的执行证据就 closed loop 了。否则就是空头支票。

### 论点 3: 同一个产品,3 版 differentiated demo

- **是否新?** ⚠️ 部分新。"用 multi-agent 做 A/B 测试" 这个 idea 不新(Devin 在 PR 里也并行 spawn 多版本),但 **以"用户画像而非视觉风格"来 differentiate** 是个聪明的选择。考据派 / 沉浸派 / 探索派 这三个画像让 builders 的产品决策天然分叉,而不是 builders 互相抄 prompt。
- **执行证据?** ✅ 3 个 demo 的 README 读下来,我看得到真实的差异化(B 没做 pattern-tree,因为"对沉浸派太工程化";C 没做 inscription deep dive,因为 Z 世代不要)。这不是同一个东西换皮,是产品哲学不同。
- **风险**: A/B/C 都做完之后,**合并方案**是关键。如果 C5 的 MVP 看起来就是 ABC 的拼贴(纸本期刊 hero + 烛火长卷 + Pokédex 卡墙),那就退化成"我做了三个 demo 然后选了一个",原创度大跌。要看 comparative auditor 怎么处理"merged-spec.md"。

### 论点 4: Cost-aware Routing

- **是否新?** ❌ 不新。Cursor / Aider 都做。但**做 portfolio 时 explicit 写出来 + 量化总成本** 是个加分项 — 大部分 PM 候选人不知道有这件事。
- **执行证据?** ⚠️ `cost/cost-report.md` 当前没有(目录是空的)。这个论点是 IOU,要看 MVP 后能不能补出"夜跑实际 token 用了多少 / 等效 ¥ 多少 / vs 全人工 X 天的杠杆是多少"。
- **风险中等**: 缺数会让这个论点变成 talking point,有数会让它变成案例研究里最 quotable 的句子("我用 ¥XX 跑出了相当于 3 个团队 1 周的产出")。

### 论点 5: Event-sourced state + 任何时候可续跑

- **是否新?** ⚠️ 工程上不新,但作为 PM portfolio 论点是新的。大部分 PM 候选人**不会**讨论 agent state 的可恢复性。
- **执行证据?** ✅ `state/state.md` 是 append-only event log,看起来是真的。
- **风险**: 这个论点偏 ops 工程,对 PM 招聘视角的加分有限。**不要把这个放在 case-study 的前三段**。

---

## AI PM angle — 是真的吗?

我对 "AI PM" 这四个字最警惕的是 **"AI 是贴皮还是骨头"**。我用 4 个标尺测:

### 标尺 1: dimensional-map / motivation-hooks 是否真懂青铜器

✅ **是真的懂**。我没有青铜器学位但我看得出来:
- "饕餮→窃曲是神权→礼制→抽象化"这种说法不是百度百科级的,需要看过李学勤或裘锡圭。
- "毛公鼎 499 字 / 史墙盘 284 字"这种数字精确度不是糊弄的。
- 西周三期(早/中/晚)+ 列鼎制度(天子九鼎诸侯七鼎)+ 失蜡法 vs 范铸法,这些拆解是行内人会有的。
- 三星堆作为"独立文明"和殷墟"并列存在"的视角是非中原中心论的,这种学术倾向也透露出 thoughtfulness。

不过 ——
- ⚠️ "字字悬停翻译"对铭文这件事 in practice 比 spec 写的难 100 倍(金文不是现代字,你需要释字 + 跨字字典 + 学派标注)。这一条放在 portfolio 里很美,但如果 demo 真做了,会被识破是 mock(我自己测了 builder A 的 demo,inscription-reader 的字典确实只覆盖约 20 字,README 老老实实承认了这一点 — **这种诚实是加分,不是减分**)。

### 标尺 2: agent-team-design 是否真懂 multi-agent

✅ **是真的懂**。证据:
- §1.1 "agent = 无 context 的新人线程" 这个 reframing 对于做过 multi-agent 系统的人是个 aha,对于跟风者是个奇怪的句子。候选人会的是前者。
- §4 的 4 种协作模式(Sequential Handoff / Parallel Spawn / Curator-Producer / Critic-Refine)是个 reasonable 的 taxonomy,比 LangChain 的 chain 抽象更接近产品现实。
- §5 的 Cost-aware Routing 是 hands-on 的(Opus 给 Researcher/Designer/PM Auditor;Sonnet 给 Builder/Data Engineer);不是 "我都用 Opus" 的炫富。
- §7 的 communication protocol(filesystem + event log + 写 own namespace)是个真正在 agent 实战里发现的痛点(很多人在 prompt 里反复传 state,这里用文件)。

### 标尺 3: ai-roadmap 是否真懂技术

✅ **真懂**。这一份是这个 portfolio 里最让我刮目相看的文档:
- 三阶段(Mock → CLIP zero-shot PoC → CLIP+DINOv2 ensemble + OCR + LoRA)的 phasing 是真实的,不是 "我们会用 GPT-4V"。
- 精度目标 P@5 ≥ 0.60 / 0.80 / 0.92 三档,每档都给了 **诚实的解释** — Phase 1 的 0.60 不是过谦,而是 "CLIP 零样本在 fine-grained 任务上的文献基线就在 0.55-0.75"。这种 calibration 是工程师能识别的真功夫。
- 成本表(¥40-80 / ¥250-450 / ¥800-2000 per month)显然是查过腾讯云价目表的,有具体型号(GN7 T4)。
- 第 10 节 "Why this is a credible plan (not hand-waving)" 这个章节就是写给我看的 — 候选人知道招聘者会问 "你的数有依据吗",提前回答了。

这一份文档单独拎出来就是 portfolio 资产。**应该把这个 ai-roadmap.md 提到 case-study 的核心段落引用**。

### 标尺 4: 3 builder differentiation 是否真在做 AI PM 的事

⚠️ **半真半浮**。"用 multi-agent 并行做 A/B" 这个手法,严格说是 engineering 提效,不是 AI PM 的本职。但是 ——
- builder personas 是 PM 工作(写出 "陈翊安 29 岁北大考古博士" 这种人物画像并 derive 出 builder 的产品决策),不是工程师工作。
- A/B/C 的 README 里能看到 builder agent 真的 "对人设负责" — A 删了"星星稀有度",B 改了"未唤醒"代替"未解锁",C 加了"梗卡片"。这是 product judgment 在被 propagated through agents,不是 prompt copy-paste。
- 这种 "用 multi-agent 强制 differentiation" 的做法,**作为 PM portfolio 的故事很值** — 我可以接面试题 "How would you A/B test a redesign with multi-agent?" 来考察。

---

## Agent team design 作为独立 portfolio artifact 评估

用户明确说 `agent-team-design.md` 本身是一份作品集艺术品。我单独评:

### 论点 crispness

| 子论点 | 评分 | 备注 |
|--------|------|------|
| "8 个有边界的角色" | 8/10 | 配套 §3 表格 + 拓扑图,清晰 |
| "6 个 auditor 视角并行" | 9/10 | 这是最 memorable 的部分,§3.2 表格是面试白板能默画出来的 |
| "4 种协作模式" | 7/10 | reasonable,但 4 种里 Curator-Producer 和 Critic-Refine 在实际里容易混淆,可以更 sharp |
| "cold context as feature" | 9/10 | 这是真 brain food,值得放第一句 |
| "audit as iteration trigger" | 9/10 | 这是 design 的最强 punch,但需要 portfolio 后期补 next-iteration-brief 真的触发了下一轮 builder 的例子 |
| "cost-aware routing" | 7/10 | 数据兑现前是 7,兑现后是 9 |

### 该 doc 能撑住什么问题

如果我面试时问下面这些,候选人能不能答得上来?

1. **"为什么是 8 个角色不是 6 个不是 12 个?"** → §3 表格答得上来,但"为什么 builder 是 3 而不是 5?" 需要候选人补一句 "3 是 differentiated personas 的最小覆盖,5 个会出现 noise"。如果候选人当场能答,加分;如果答 "差不多就是 3 ",扣分。
- 文档里没有显式 defense,这是个 **可以被 hostile question 戳穿的 P1 漏洞**。

2. **"你说 audit 是 trigger,但 audit loop 不可能无限递归吧?"** → §4 的 "Loop 都有界(最多 2-3 轮),超界 escalate" 答得上来。✅

3. **"cold context 真的好吗,不会重复工作?"** → 文档 §1.1 答得上 "iteration 永远可重启" 但 **没显式答 "怎么避免重复工作"**。可以补 "通过 filesystem state 保留 artifacts,新 agent 不是从零开始,是从'读已写文件 + 用新人视角审'"。

4. **"为什么不用 LangChain / AutoGen / CrewAI?"** → 文档完全没答。**这是 P0 缺口**。 hiring manager 一定会问 "你为什么自己搭这套而不是用现成框架",候选人没有 talking point 就会很难。可以补一段 "我刻意不用框架,因为它们的抽象(chain / role / task)不允许我做 'cold context as feature' 这个反直觉设计 — 框架强制 stateful continuity"。

5. **"5-6 个 HITL checkpoint 不会太重吗?"** → §6 答得上来。✅

6. **"成本算过吗?"** → §5 routing 表答得上但 **缺总额预估**。可以加一行 "夜跑预算约 ¥X,实际 ¥Y(待补)"。

### 独立评分: agent-team-design.md as portfolio artifact

**7.5 / 10**。
- 加分: cold-context-as-feature 是真 contribution; audit-as-trigger 是真原创; topology 图清晰可白板。
- 扣分: 缺 framework-comparison(P0 hostile question 没准备);缺 cost-tally(预算 vs 实际兑现);缺 retrospective("哪些 agent 边界画错了"现在还是 TBD)。

如果三个扣分项都补齐,可以拉到 9/10。

---

## "我会面试这个候选人吗" 测试

### 场景 A: AI 产品团队 PM(字节豆包 / 腾讯混元 / 智谱 / Moonshot)

✅ **会面**。理由:
- AI 团队 PM 招人最缺的是 "懂 AI 又懂 product 的人"。这个 portfolio 里 ai-roadmap.md 显示候选人能看懂 CLIP/DINOv2/Qdrant + P@5/MRR/ECE,又懂得 product framing(把识别精度和"国宝光晕"挂钩)。这种交叉能力比纯 PM 强 5 倍。
- agent-team-design 显示候选人能用 agent thinking,这是 AI 团队接下来 1-2 年的核心能力栈。
- 我会准备的 hostile question: "你说 audit 是 trigger 不是 review,在多轮迭代里你怎么避免 audit policy 飘?谁定义 audit 的成功?"

### 场景 B: 内容/社区产品 PM(小红书内容 / B 站文化区 / 抖音知识)

⚠️ **可能会面,但分数没那么高**。理由:
- "维度 × 形态 × 游戏化" 论点在内容产品上是有 transferability 的(知乎可以拆"问答维度",B 站可以拆"知识维度")。这是 transferable framework。
- 但是内容产品 PM 更看重 "你是否懂用户增长 / k-factor / 留存曲线"。这个 portfolio 里 motivation-hooks.md 的 hook 6 类法是 transferable,但**用户增长 / 病毒系数 / 商业化** 几乎没碰。
- 候选人需要在 case-study 里加一段 "如果 MVP 跑通,我的 growth model 是什么 + 怎么验证" — 现在这段是缺的。

### 场景 C: 博物馆-tech / 文化-tech startup Strategy

✅✅ **会面 + 推荐到 founding team**。理由:
- 这个 portfolio 就是为这个 vertical 量身定做的。`dimensional-map.md` + `motivation-hooks.md` 直接可以当 startup 的产品哲学文档使。
- "我们不是官方画册的电子版,我们是个人收藏履历 + 多维度认知系统" 是个 fundable 的 thesis statement。

### 场景 D: 大厂普通 PM(字节抖音 / 腾讯微信 / 美团 to-c)

⚠️⚠️ **大概率不会面**。残酷的现实:
- 这个 portfolio 太学术、太垂直、太"博士级"。大厂 to-c PM 招的是 "能在 100W DAU 产品里做迭代实验、看大盘、push 数据" 的人。
- 这里的论点偏 thoughtful product design,不偏 growth hacking。读了 portfolio 的招聘者会想 "他能 push 工程师上线一个增长 ABtest 吗",答案不明显。
- 候选人需要在 portfolio 里另加一个 "增长 / 数据驱动 / AB 测试" 维度的案例,**这个 portfolio 自身不够**。

---

## 3 demo 作为 portfolio assets

### A — 考据派 (`v1-A-textual-research`)

**证明什么**: 这版证明候选人懂"严肃用户的反 Skinner box 红线"。
- 衬线宋体 + 学术引用 [1] 上标 + 朱砂角章 + 段位制铭文识读,这是一个**严格服务 niche 用户**的 demo。
- README 里 "不弹彩带 / 不响铃 / 不用星星稀有度" 这条红线被 hard-coded 进设计,可以截屏作为"我懂 user persona discipline" 的证据。
- ⚠️ 但 A 版牺牲了 craft-scroll 和 purpose-scene,**作为 audit asset 略 thin**。如果作为 portfolio "我能服务硬核用户" 的代表作,够;但作为"功能完整 demo",不够。

### B — 沉浸派 (`v1-B-immersive`)

**证明什么**: 这版证明候选人懂"叙事产品的克制美学"。
- 一屏一件 + 一句诗 + 200 字独白 + 22 位礼器归位场景 + 朱印帳风护照,这是一个**情绪驱动**的 demo。
- README 写 "一屏一件" / "极致留白" / "诗意游戏化" — 这是一种产品哲学,不是常见做法。
- 杀手锏页 `purpose-scene.html`(九鼎归位、士/大夫/诸侯/天子等级判定)是这个 portfolio 里 **最 cinematic、最适合录视频** 的页。简历里可以放这一页截图作为 wow shot。

### C — 探索派 (`v1-C-explorer`)

**证明什么**: 这版证明候选人懂"潮玩游戏化的克制平衡"。
- 故宫文创色 + Pokédex grid + 段位印章 + 梗卡片生成器,这是 Z 世代视觉但**没有掉进抽卡赌场**。
- README 里的 "Anti-Skinner 检查表" 是个非常聪明的 artifact — 它把"我没有做什么"明确列出来,这种 negative space 设计是高分项。
- ⚠️ C 版没做 pattern-tree(spec 优先级 P0),这是个值得 audit 的取舍。

### 三版 vs 一版,证明了什么?

这是这个 portfolio 最 unique 的 angle。**做三版而不是一版,证明的不是"我有时间",而是"我懂得产品的多元解"。**
- 普通 portfolio: "我做了 X 产品" — 暗含"X 是对的"。
- 这个 portfolio: "我做了 X 的三种实现,每种都对应一种用户,然后我审了它们,然后我决定 v2 该怎么合并" — 暗含 "我知道产品没有唯一解,我有 framework 处理多解"。
- 这种 framing 在面试里**碾压性强**。Hiring manager 问 "你怎么平衡 A/B 用户的冲突需求",候选人可以拿三个 demo 作为 evidence。

不过要注意: 三版能不能成为 portfolio asset,**完全取决于 comparative auditor 的 merged-spec.md 是否真的揭示了非平庸的 synthesis**。如果 merged-spec 只是 "A 的字体 + B 的杀手页 + C 的梗卡片",那 portfolio 退化成"我做了三版然后挑了几个零件"。

---

## 弱论点 / vulnerabilities — 我面试时会戳的地方

如果我是 hostile 面试官,我会戳:

### V1 [P0]: "agent team 真的跑通了吗,还是 PPT 工程?"

- 当前 portfolio 里 `state/state.md` 显示到 H6.5 phase 4 在跑(5 auditors parallel),但 `audits/` 在我审之前还是空的,`reviews/` 也空,`cost/cost-report.md` 也空。
- **这是 P0 的诚信问题**: 如果 portfolio 写"6 视角 audit",但 audit 文件不存在,候选人会被秒挂。
- 解决: **必须**让 phase 4-5 真的产出 6 份 audit + next-iteration-brief + 至少 1 轮迭代的证据,否则 portfolio 主论点没法 close-loop。

### V2 [P0]: "你这套和 LangChain/AutoGen/CrewAI 有什么区别?"

- 文档完全没答。
- 我面试时一定问,候选人没准备就会很难看。
- 解决: 在 `agent-team-design.md` 加 §X "Why not LangChain/AutoGen?" 写 1-2 段 — 重点强调 "stateful continuity assumption 让 cold-context-as-feature 无法实现"。

### V3 [P1]: "维度形态化听起来很 cool,但实际开发成本你算过吗?"

- `dimensional-map.md` 描述了 10 个组件,每个 spec 8-11k 字 — 但**没有任何 effort estimate**。
- 一个面试官会问 "10 个组件全做完要多少 dev 月,合理吗?"
- 解决: 在 case-study 或 agent-team-design 里加一段 "Build cost estimate" 表格 — 每个组件预估 dev 天 + 复用率 + 优先级。

### V4 [P1]: "你的 motivation hooks 都是 hypothesis,有任何用户测试吗?"

- `motivation-hooks.md` 里的"判定指标" 写得很具体(空白段点击转化 > 15% 等),但**没有实际数据**。
- 面试官会问 "你怎么验证这些 hook 真的 work,不是你自己拍脑袋?"
- 解决: case-study 里 explicit 写 "Outcomes" 一节,等 MVP 后填真实 KPI;并 acknowledge "当前所有 hook 都是 hypothesis,验证计划见 §X"。

### V5 [P1]: "MVP 你的真实计划是什么?这个 portfolio 是 paper 还是 product?"

- 当前 portfolio 是 D0-D1 的产物,看着像"我做了一个夜跑然后给你看 demo"。
- `agent-team-design §6` 写到 D10 上线,但**到我审的这一刻**(D1),距离 MVP 还有 9 天的工程。
- 招聘者会问 "这就是 demo,还是 product?如果是 product,链接在哪?"
- 解决: case-study 里明确两个 milestone — "Demo Night D0-D1 (现在)" + "MVP D10 (上线)",并放 demo 链接 + 截屏给招聘者一个 tangible artifact。

### V6 [P2]: "夜跑 cost 是多少?"

- `cost-report.md` 空。
- 面试官的标准追问。
- 解决: 至少给个 rough estimate "Opus token X / Sonnet token Y / 等效 ¥Z" 在 case-study Outcomes 段。

### V7 [P2]: "你这套架构能不能复用到其他 vertical(瓷器、佛造像)?"

- 文档没显式答。但 dimensional-map 的 "10 个维度 / 形态映射 / motivation hook" framework **是 vertical-agnostic 的**。
- 解决: case-study 里加一句 "the framework is vertical-agnostic — 套到瓷器只需重写 dimensional-map,framework 不变"。这是 startup founder 视角喜欢听的话。

---

## Severity ranking — 招聘视角

### [P0 portfolio-killer] 必须在 D5 前补

1. **Audit loop 真的跑通**: 6 份 audit + next-iteration-brief 真的存在,且 builder 真的响应了至少 1 条 brief。否则 "audit as trigger" 是空论。
2. **Framework comparison**: 显式回答 "为什么不用 LangChain/AutoGen/CrewAI"。
3. **20 字 logline**: 当前 70 字 logline 太长,做成朋友圈一行 + 简历一行的版本。

### [P1 weakens narrative]

4. **Cost-tally**: 实际 token 用量 + 等效 ¥ + 时间杠杆数字。
5. **Build cost estimate**: 10 个组件的工程预估。
6. **MVP tangible artifact**: 公网可访问的 demo + screenshots。
7. **case-study §3 §4 §5**: Approach / Outcomes / Reflection 三段填实(当前 TBD)。
8. **Comparative auditor 的 merged-spec**: 让 v2 看起来不是简单拼贴。

### [P2 polish]

9. **dimensional-map §3 馆藏地** 现在权重和质感都不够,如果不做 P2 应该在文档里明确删除。
10. **agent-team-design §3.1 (Builder personas) §3.2 (Auditor squad)** 表格可以再压缩一行,移到 §0 TL;DR 后,让"6 视角 + 8 角色"一屏可见。
11. **3 个 demo 的视觉对比图**: 一张 6-grid 截屏(每版 2 图)放在 case-study 里 — 招聘者 30 秒内看完就走的概率最高。
12. **Reflection 段的"Would redo"** 现在是 TBD,写实点比写虚的"would redo X" 更得分(具体到"audit squad 6 个 → 应该是 4 个,Aesthetic 和 Content 视角重叠了")。

---

## 这个 portfolio 在国内 PM 招聘的 unique selling proposition (USP)

**USP**: "我是一个能用 AI agent team 跑端到端产品的 PM,但我的论点不是'用 AI 写代码',而是'用 AI 的 process 反向证明我的 product thinking'。"

具体来说:
- 普通 AI PM 候选人: "我做了一个 ChatGPT 的应用"。
- 这个候选人: "我用 agent team 把'垂类产品的维度形态化'这个论点跑了 3 个变体,然后用 6 视角 audit 找出非平庸的合并方案,整套系统本身就是我作为 AI PM 的工作样本"。

这套 framing 在 2026 年(post-AI-tooling-普及)的招聘市场里**稀缺度仍然高**。大部分 PM 候选人会被 "AI 应用 PM" 的标签卷死,这个候选人有可能 stand out 因为他展示的是**用 AI 当 collaborator 的方法论**,不是 AI 当 feature。

但是 — 这个 USP 能不能落地,完全取决于:
- agent-team-design 是否撑得住 hostile question(V1-V2)
- audit loop 是否真的跑通(V1)
- 是否有 tangible MVP(V5)

三个都打勾,USP 就能撑住;有一个不打勾,USP 退化成"夸夸文档"。

---

## Bottom-line: hire signal 评分

| 维度 | 评分 | 备注 |
|------|------|------|
| 30 秒 pitch test | 6/10 | 论点有,但 logline 太长 |
| 原创论点强度 | 8/10 | 维度×形态×游戏化 + audit-as-trigger 是真原创 |
| AI 理解深度 | 9/10 | ai-roadmap 写得最好,显示真懂技术 |
| product thinking 密度 | 9/10 | dimensional-map / motivation-hooks 是 thick documentation |
| 执行证据(截至 D1) | 6/10 | 3 demo 真存在,但 audit/cost/MVP 还是 IOU |
| 案例研究完成度 | 4/10 | case-study v0.1 还是骨架,Approach/Outcomes/Reflection 都 TBD |
| 经得起 hostile question | 5/10 | V1-V2 是 P0 漏洞,V3-V5 是 P1 漏洞 |
| 对垂类(博物馆-tech)的 fit | 10/10 | 直接可以拿去 startup 做 founding PM |
| 对 AI 产品团队 PM 的 fit | 8/10 | 强 |
| 对大厂 to-c PM 的 fit | 4/10 | 偏 thoughtful,缺增长 |

**综合 hire signal (当前 D1 状态): 7.0/10**
- 如果只看 portfolio surface 的 thick documentation + 3 个真 demo: 已经在 70% 候选人之上。
- 如果 D10 MVP 真上线 + audit loop close-loop + framework comparison 补齐: 可以拉到 8.5/10,进入"主动捞简历"行列。
- 如果 D10 没上线 + audit 是空话: 退到 5.5/10,和 "我也做了个 AI side project" 持平。

**hire signal 的关键变量**: 不在产品质量(已经很好),不在文档密度(已经过剩),而在**执行 close-loop**。candidate 接下来 9 天能不能把 IOU 兑现,决定了这个 portfolio 是 8 分还是 5 分。

---

## 我作为招聘者的最后一句

> "这个候选人不是缺产品脑子,是缺把产品脑子兑现成 verifiable artifact 的纪律。如果他能在 D10 之前把 audit-loop / cost-tally / MVP-link / hostile-question-defense 这四件事 close-loop,他会从 '有想法的 PM' 升级到 'AI PM 第一波 niche 招聘的 top decile'。如果 D10 之前还是 IOU,这个 portfolio 是个聪明的 paper,不是 hire。"

---

**Audit version**: v0.1 (Day 1)
**Audit date**: 2026-05-20
**Re-audit recommended**: D5 (post Phase 2 of audit loop) + D10 (MVP)
