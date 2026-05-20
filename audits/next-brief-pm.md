# Next Iteration Brief: PM (Portfolio)

> 这份 brief 写给 Product Owner agent + Orchestrator + 用户。
> 目标: 把当前的"thick documentation + 3 demo" 升级为 "recruiter-ready portfolio"。
> 假设: 9 天后 (D10) 就要送给招聘者看, audit-loop / cost-report / case-study 是关键 deliverables.

---

## What to keep (绝对不能丢的资产)

1. **"维度 × 形态 × 游戏化 三位一体" 的产品论点** — 这是 portfolio 最 memorable 的论点,所有 case-study 改版都必须以它为 spine。
2. **`dimensional-map.md` + `motivation-hooks.md` 的"thick documentation" 厚度** — 招聘者读完会觉得"这人真的进去过青铜器学界"。**不要**为了 case-study 简化它,要保留作为 appendix。
3. **3 个 differentiated demo** — 不要再做第四个。三个已经够,关键是后续怎么 synthesize。
4. **`ai-roadmap.md`** — 这是整个 portfolio 里**最 impressive 的 standalone 文档**。在 case-study 里要 explicit 引用,**不能埋在 appendix**。
5. **`agent-team-design.md` 的 §1.1 (cold context as feature) + §1.3 (audit as iteration trigger) 两个核心 reframing** — 这是 multi-agent 部分的灵魂。
6. **builder A/B/C README 的诚实 trade-off** — "我没做 X 因为对这个 persona 不适合" 这种诚实是加分,要 surface 到 case-study。
7. **`state/state.md` + `decision-log.md` 的 event sourcing 形式** — 工程感强,可作为 case-study 附录截屏。

---

## What to change (要返工的部分)

### 1. Logline 砍到 20 字内

**Before** (case-study §0):
> "我用 8 个有边界的 AI agent 跑了一个夜班,产出 3 版 differentiated 高保真 demo,最终孵化出一个面向硬核博物馆爱好者的青铜器收藏小程序 —— 这是一份"AI PM 如何用 AI 协助开发 AI 产品"的实证案例。"

(70 字 — 朋友圈一行装不下,简历首行太挤)

**After (推荐)**:
> "8 个 AI agent · 10 个青铜器维度 · 10 个独有形态 · 3 版差异化 demo · 一晚上。"

(35 字,数字密度高,中段顿挫可背)

或者(更 punchy):
> "把博物馆 App 拆成 10 个维度 × 10 个形态,然后让 8 个 AI agent 跑了一晚。"

(34 字,有动作)

**用户决策点**: 选哪一句作为 portfolio 首页 logline。

### 2. case-study §3 / §4 / §5 必须填实

当前 case-study 里:
- §3 Approach: TBD
- §4 Outcomes: TBD
- §5 Reflection: TBD

这是 portfolio 的**致命空白**。D1 的当下,§3 可以已经写(基于 agent-team-design + 当晚的实际跑法);§4 §5 必须 D10 MVP 后填。

**具体 action**:
- §3 在 D2 内就应该完整,把 agent-team-design 的精华 distil 成 3-5 段 case-study 语调(不是技术语调)
- §4 设计成"数据 + 截图"模板,M5 之前每天填一格
- §5 的 reflection 必须 "honest about trade-offs",我宁可看到 "Audit 6 个视角里 Aesthetic 和 Content 在实际跑里高度重叠,如果再来一次会合并" 这种诚实,不要 "everything was great"。

### 3. agent-team-design 加 "Why not LangChain/AutoGen" 章节

这是 P0 hostile question 防御。当前文档完全没答,面试一问就破功。

**具体补充内容**:
- "AutoGen 强调 conversational agents、CrewAI 强调 role-based pipelines、LangChain 强调 chain composition,这三者的共同假设是 'agent 有 stateful continuity'。"
- "我们的核心反命题: cold context as feature。在框架的 stateful continuity 假设下,'让一个新 agent 假装第一次看' 是反 idiom 的;在 filesystem-based, event-sourced 通信下,这是自然的。"
- "二级原因: framework 强制的 tool-calling 抽象 把 agent-to-agent 通信变成 RPC; 我们要的是 agent-to-filesystem 通信 + orchestrator-as-scheduler。"

(用户的另一个用法: 可以把这一段独立写到一个 `docs/why-not-frameworks.md` 作为 portfolio 附录。)

### 4. agent-team-design 加 cost-tally 真实数字

当前 §5 只有 routing table,缺总额。

**具体补充**:
- D1 night-run 总 token 数 (Opus / Sonnet 分别)
- 等效 USD / ¥
- 对比"全人工开发"的时间杠杆 ("8 个 agent 4 小时 vs 1 个团队 X 周")
- 这一组数字一旦兑现,是 case-study 里最 quotable 的句子

(实现方式: Orchestrator 维护 `cost/cost-report.md`,每 phase 后写入。)

### 5. 3 demo 的视觉对比图(visual comparison)

当前 demo 是 HTML,招聘者**不会**点链接打开。需要做:
- 一张 6 格截图(每个 demo 2 张:hero + signature page)
- 放在 case-study §3 Approach 中段,作为"差异化"的 evidence
- 文案:"同一份 PRD、同一份 dimensional-map、3 个 builder agents、3 种用户画像 → 3 种自然分叉的实现"

**用户决策点**: 谁来截图 — 用户自己(快) or 一个新 builder agent 跑 playwright (干净)。

### 6. case-study 加 "How to evaluate this portfolio" 一节

(防御 hostile question 的元 framing)

```
## §6 这份 case study 该怎么读?
- 如果你是 AI 团队 PM 招聘 lead: 跳到 §3.4 Agent Team Design + appendix ai-roadmap.md
- 如果你是文化-tech startup founding team: 跳到 §1-2 Problem + Insight + 关注 dimensional-map.md 作为 vertical-agnostic framework
- 如果你是 content/community PM hiring: 跳到 §2.3 motivation-hooks(尤其反 Skinner 部分)
- 如果你想攻击这份 portfolio: 我已经把弱点写在 §5 Reflection 里了 — 欢迎以此为起点 push 我。
```

这种 meta-framing 在 portfolio 里很少见,会让招聘者觉得 "这个候选人懂自我评估"。

---

## What to add (新增 artifact)

### 必须新增 (D2-D5)

1. **`docs/why-not-frameworks.md`** (或写到 agent-team-design 里) — 防 hostile question
2. **`cost/cost-report.md`** — 至少 D1 night run 的实际数据兑现
3. **`audits/*.md` 完整 6 份 + `next-iteration-brief-*.md`** — 证明 audit loop 真跑通 (这个 PM brief 是 6 份之一)
4. **`audits/merged-spec.md`** — comparative auditor 的合并方案,这是 v2 的设计源
5. **case-study v0.2** — Approach 填完, Outcomes 列骨架等填

### 推荐新增 (D5-D10)

6. **`docs/portfolio-screenshots/`** — 至少 12 张截图 (3 demo × 各 4 页)
7. **`docs/mvp-architecture.md`** — 把当前 dimensional-map + ai-roadmap 提炼成一份 "production architecture"
8. **`docs/eval-report.md`** — Phase 1-2 的 CLIP 实测 P@5 数字
9. **`docs/build-cost-estimate.md`** — 10 个组件 dev-day 预估表 (防 V3 vulnerabilities)
10. **A public-facing one-page summary** (`docs/portfolio-summary.html`) — 招聘者点一次性能看完,是 case-study 的"图书馆封面"

### Stretch (D10+)

11. **`docs/why-this-vertical.md`** — 解释为什么选青铜器而不是瓷器/书画 (回答 "Vertical-agnostic 但为什么先做青铜器" 的问题)
12. **`docs/agent-team-design-postmortem.md`** — 跑完 D10 后写 retrospective: 哪些 agent 边界画错了 / 哪些 audit 视角冗余 / 哪些 phase 时间估错
13. **一个 5 分钟的 video walkthrough** (录屏 + voiceover) — 这是国内 PM 招聘里非常稀缺的,但极加分

---

## 具体 actionable for `case-study.md` to make it ready-to-submit

按重要性排序:

### Priority 0 (D2 内必做)

1. **改 logline** — 砍到 35 字内,采用上面 §1 的某一句。
2. **§3 Approach** 写完整 (1500-2500 字):
   - 第一段: 整套 agent team 的 high-level 描述(取自 agent-team-design §0 TL;DR + §1 设计哲学)
   - 第二段: 3 个 critical design decisions (cold context as feature / audit as trigger / cost-aware routing) + 每个 1-2 句 reasoning
   - 第三段: 实际跑法 (Phase 1 → 2 → 3 → 4 → 5 的 timeline + 哪些 agent 并行)
   - 第四段: 一张 8-role topology 图 (从 agent-team-design §2 copy 过来)
   - 第五段: "我刻意不做的 trade-offs" (不用 framework / 不做 stateful agent / 不做 self-modifying agents)
3. **§4 Outcomes 写骨架** (列出 placeholder, 等数据填):
   ```
   - Throughput: 8 agent / 4h / 3 demos / 10 component specs / 10w 字 doc / N 行 HTML
   - Cost: ¥X (Opus token / Sonnet token / 等效 USD)
   - Quality: 6 audits 完成 / 每 audit 的关键发现 / next-iteration-brief 的真实迭代触发数
   - Screenshots: 3 demo 的 6 张截屏
   - 用户测试: (D10 后填) 10 个真实用户的 30-min 上手反馈
   ```
4. **§6 加 "How to read this case study"** — 元 framing (见上 §6)

### Priority 1 (D5-D7)

5. **§5 Reflection 初稿** — 至少先写 "What worked / What I would redo" 两段。Honest 一点。
6. **加 appendix link 到 portfolio 关键 artifact**:
   - `dimensional-map.md` (作为 vertical understanding 的证据)
   - `ai-roadmap.md` (作为 technical depth 的证据)
   - `agent-team-design.md` (作为 process design 的证据)
   - `audits/merged-spec.md` (作为 synthesis 能力的证据)

### Priority 2 (D10)

7. **加 demo 公网链接** — 如果用户能 deploy 一个 (Vercel / Cloudflare Pages 静态部署,3 个 demo 都放上)
8. **加 5-min video walkthrough 链接** — 录屏 + 旁白,讲一遍 portfolio thesis
9. **加 LinkedIn-ready 一行 pitch**: "I built X to test whether AI agents can preserve product-thinking-density at scale. Here's the post-mortem."

---

## What success looks like at next checkpoint (C2 / D3)

读了 case-study v0.2 + audit loop 的 6 份 audit + merged-spec 之后,我应该能:

- [ ] 30 秒内复述 portfolio 主论点(维度 × 形态 × 游戏化 + cold-context-as-feature + audit-as-trigger)
- [ ] 找到 agent-team-design 的 framework comparison 章节(防 hostile question)
- [ ] 看到至少一组 cost-tally 数字 (Opus X / Sonnet Y / total ¥Z)
- [ ] 看到 6 份 audit 报告 + 至少 1 个 audit→next-iteration→builder 的 close-loop 例子
- [ ] 看到 comparative auditor 的 merged-spec 是非平庸的 synthesis (不是 "ABC 拼贴")
- [ ] case-study §3 完整 / §4 §5 骨架到位

如果 D3 还有一项是空,本 PM auditor 会在 D5 的 re-audit 给出更悲观的评分。

---

## Open questions for the user (升级到 morning report)

### Q1: portfolio 的 north-star metric 是什么?

招聘 conversion 不是单一的 — 你要 founding-team / AI-PM / content-PM 哪一种 fit 优先?
- 如果是 founding-team: 强化 vertical-agnostic framework + startup growth model + commercial viability
- 如果是 AI-PM (e.g. 字节豆包): 强化 ai-roadmap + cost-tally + 技术深度防御
- 如果是 content-PM (e.g. 小红书): 强化 motivation-hooks 6 类法 + K-factor + 增长模型

**我推荐**: 按 AI-PM 优先,因为这是 portfolio 当前最自然 fit + 招聘市场最 hot 的赛道。但请用户确认。

### Q2: D10 真上线还是只做 demo?

- 真上线 (公网可访问 MVP): hire signal 从 7 拉到 8.5
- 只到 demo: hire signal 卡在 7

成本: 真上线需要后端 + AI service + 小程序 / web 端 +至少 100 件真实数据 + 微信小程序审核 (3-5 天).

请用户决定。

### Q3: 是否做 5-min video walkthrough?

国内 PM 招聘里很少见,但极加分。需要用户:
- 录屏 + 中文旁白
- 可托管在 B 站(免费,有版权风险)或自家 OSS

如果用户做了,可以放在 portfolio 首页第一个 link。

### Q4: 3 个 demo 的最终命运?

- 选项 A: 放到 portfolio 里作为"思考过程"展示,v2 完全 redesign
- 选项 B: 把 ABC 合并成 v2,作为"我的 synthesis 结果" 展示
- 选项 C: 全部丢掉,只把 MVP 当 portfolio

**我推荐**: 选项 B + comparative auditor 的 merged-spec 作为"如何 synthesize" 的证据。

### Q5: case-study 用什么语言?

- 全中文 + 一句话英文 logline (面向国内 hiring)
- 全英文 + 中文摘要 (面向多元 hiring)
- 双语 (代价高但保险)

国内厂的 hiring 普遍可以读英文,但 PM 候选人交中文版被认为更"接地气"。我推荐**全中文 + 英文 one-pager (300-500 字)**。

### Q6: 是否需要把 portfolio 整理到一个 standalone 网站?

- GitHub Pages / Notion public page / 个人独立站
- 优势: 招聘者只需点一个链接 (不需要 clone repo)
- 成本: 1-2 天 (主要是 Notion 排版 / 静态站点构建)

**我推荐**: D8-D10 做这件事,Notion public page 即可。

---

**Brief version**: v0.1 (Day 1)
**Brief date**: 2026-05-20
**Brief author**: PM Auditor (portfolio lens)
**Next re-brief recommended**: D5 (post Phase 2 audit loop close)
