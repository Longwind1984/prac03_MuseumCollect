# MuseumCollect — Agent Team Design (v0.2)

> 这份文档既是这个项目的工程设计文档,也是作品集的一部分。
> 它讲的是: 一个 AI PM 候选人,如何把"用 AI 协助开发一个 AI 产品"这件事,做成一个有 PM sense 的协作系统设计。

---

## 0. TL;DR

8 个有边界的 Agent 角色,通过 4 种协作模式,在 5-6 个 Human-in-the-loop checkpoint 之间运行,完成从 PRD 到高保真 demo 到 MVP 的全流程。核心论点:

1. **Agent 是无 context 的新人线程,不是有记忆的助手** — 新人视角是 audit 的 feature,不是 bug
2. **维度拆解 + 形态化承载 + 游戏化机制三位一体** — 这是这个垂类产品最能出彩的内核,也是 agent team 设计的发力点
3. **Audit Loop 是一等公民,不是附加层** — 每个 Auditor 同时是下一轮迭代的 trigger
4. **Cost-aware Routing** — Opus / Sonnet 按角色性质分配,跑完总成本可量化
5. **Artifact-driven** — 所有产出落到文件,无隐形思考,作品集可追溯

---

## 1. 设计哲学

### 1.1 Agent = 无 context 的新人线程

普通用法: 把 Claude 当成一个有记忆的助手,任务接力。
我们的用法: 每次 spawn agent,都是一个**没有项目 context 的新人**。这有两个反直觉的好处:

- **Audit 视角天然客观**: 设计者沉浸时看不见的盲点,新人会问出"为什么这里这么做"这种 dumb question,这正是审计想要的
- **Iteration 永远可重启**: 一轮设计走死了,新 agent 可以重新探索,不会被既有路径绑死

这意味着:
- 每个 agent 启动时,只读取它 **需要的最小 artifact**(不是全项目)
- 每个 audit 是"假装第一次看",刻意不告诉它历史决策的原因

### 1.2 维度 × 形态 × 游戏化 三位一体

文博类产品最大的诱惑是把它做成"维基百科 + 收藏夹"。我们的反命题:

> **每个维度的拆解,都要对应一个能承载它含义的产品形态,并且这个形态本身就提供持续使用的动机**

例:

| 维度 | 错误做法(信息陈列) | 对的做法(形态承载 + 动机驱动) |
|------|---------------------|--------------------------------|
| 时代 | 下拉筛选器 | **个人时空柱** — 收藏点亮朝代区段,空白区段诱发收集动机 |
| 出土/馆藏地 | 文字列表 | **古国漫游地图** — 个人的出土足迹,空白古国诱发"我要去补"|
| 纹路样式 | 二级菜单 | **纹路演化树** — 每识别一个纹路解锁分支,授予"X 类纹饰收藏家"称号 |
| 形制 | 表格罗列 | **形制谱系图** — 同型号文物对照(比如所有"鼎"的子型),完整收藏一支解锁特殊视图 |
| 用途 | 标签 | **场景重建** — 把器物放回祭祀场景,收藏越多场景越完整 |
| 工艺 | 文字说明 | **工序长卷** — 范铸法/失蜡法分步插画,收藏不同工艺的器物解锁不同长卷 |
| 铭文 | 拓片图片 | **铭文释读** — 字字可悬停翻译,识别越多字解锁"铭文鉴读"等级 |
| 稀有度 | 标签 | **国宝光晕** — 国宝级金色,一级银色,出土地稀有有特殊光效 |

游戏化的核心是: 维度本身 = 动机来源,不是另搞一套积分体系。

### 1.3 Audit Loop 是一等公民

普通 multi-agent 系统的 critic 是"做完事让人 review",我们的 Auditor:

- **多视角并行**: UX / Aesthetic / Content / PM (作品集视角) / Motivation / Comparative
- **不只是 review,还是 trigger**: 写完 audit report 就同时产出 `next-iteration-brief.md`,Orchestrator 直接驱动下一轮
- **可以推翻整轮**: 严重问题升级到 Orchestrator,触发底层 Researcher/Designer 重做,而不是只在 Builder 层局部修

---

## 2. 拓扑(8 角色)

```
                ┌──────────────────────────────────────┐
                │  🎯 Orchestrator (Opus, 兼架构师)     │
                │  调度 · 架构 · 状态 · checkpoint      │
                │  → state.md / decision-log.md         │
                └──┬───────────────────────────────┬───┘
                   │                               │
        ┌──── Production ─────┐         ┌──── Audit Loop ────────┐
        │                     │         │                        │
┌───────▼────────┐   ┌────────▼─────┐   │   ┌───────────────┐    │
│ 📋 Product     │   │ 🔬 Domain    │   │   │ 🕵️ Auditor    │    │
│  Owner         │   │  Researcher  │   │   │  Squad        │    │
│  (Opus)        │   │  (Opus) ★    │   │   │  (6个并行,    │    │
│ PRD/旅程/      │   │ 维度拆解     │   │   │   每个 trigger│    │
│ case-study     │   │ 形态映射     │   │   │   next round) │    │
└────────┬───────┘   │ 动机 hook    │   │   │               │    │
         │           └───┬──────────┘   │   │ • UX-Aud      │    │
         │               │              │   │ • Aesthetic-A │    │
         │               ▼              │   │ • Content-A   │    │
         │       ┌──────────────────┐   │   │ • Motivation-A│    │
         │       │ 🎨 Visualization │   │   │ • PM-Aud      │    │
         │       │  Designer (Opus) │   │   │   (作品集视角)│    │
         │       │  ★ 维度→组件     │   │   │ • Comparative │    │
         │       │  + 游戏化形态    │   │   │   (横向比对)  │    │
         │       └──────┬───────────┘   │   └─────┬─────────┘    │
         │              │               │         │              │
         │              ▼               │         ▼              │
         │      ┌──────────────────────┐│   ┌─────────────────┐  │
         │      │ 💻 Builder × 3       ││   │ next-iteration- │  │
         │      │ (worktree 并行)      ││   │ brief.md        │  │
         │      │ 用户画像 differentiated│   │ → 触发新一轮    │  │
         │      │ A: 考据派 / B: 沉浸 ││   └─────────┬───────┘  │
         │      │ 派 / C: 探索派      ││             │          │
         │      └────────┬─────────────┘             │          │
         │               │                           │          │
         │     ┌─────────▼──────────┐                │          │
         │     │ 🤖 AI Engineer     │                │          │
         │     │  (Opus,独立子域)   │                │          │
         │     │ CLIP/OCR/eval      │                │          │
         │     └────────────────────┘                │          │
         │                                           │          │
         └───────────────────────────────────────────┴──────────┘
                                                    │
                          ┌─────────────────────────▼──────────┐
                          │ 🔧 Data Engineer (Sonnet)          │
                          │ 国宝级数据接入(MET/英博/中研院)    │
                          └────────────────────────────────────┘
```

---

## 3. 角色定义

| Agent | 模型 | 核心职责 | 主要产出 |
|-------|------|---------|---------|
| 🎯 **Orchestrator**(兼架构师) | Opus | 调度 + 架构 + 状态 + checkpoint + 成本追踪 | `state.md`, `decision-log.md`, `architecture.md`, `cost-report.md` |
| 📋 **Product Owner** | Opus | PRD、用户旅程、优先级、案例研究 | `prd.md`, `user-journeys.md`, `case-study.md` |
| 🔬 **Domain Researcher** ★ | Opus | 垂类维度拆解 + 形态映射 + 动机 hook | `dimensional-map.md`, `motivation-hooks.md` |
| 🎨 **Visualization Designer** ★ | Opus | 维度形态 → 产品组件 + 游戏化机制 | `component-specs/*.md`, `gamification-mechanics.md` |
| 💻 **Builder** × 3 | Sonnet | 拿 spec 实现高保真 demo(worktree 并行) | `demos/v1-{A,B,C}/` |
| 🤖 **AI Engineer** | Opus | CLIP/DINOv2 检索 + OCR + 精度评估 | `ai-service/`, `evaluation-report.md` |
| 🔧 **Data Engineer** | Sonnet | 国宝级数据接入(MET/英博/中研院) | `data/curated/`, `pipeline/`, `licensing-log.md` |
| 🕵️ **Auditor Squad** × 6 | Sonnet/Opus | 多视角主动审计 + 触发下轮迭代 | `audits/*.md`, `next-iteration-brief.md` |

★ 标记的是 v0.2 中最重的角色 — 这个产品的核心创新在维度形态化和游戏化设计。

### 3.1 Builder 的 differentiated personas(不锁视觉,锁用户画像)

| Builder | 目标用户 persona | 自然导致的产品决策 |
|---------|-----------------|---------------------|
| **A: 考据派** | 青铜器领域研究生/学者 | 严谨数据,详细参考来源,可引用,深度优先 |
| **B: 沉浸派** | 被《国家宝藏》《如果国宝会说话》圈粉的文化爱好者 | 叙事感、情绪化、画面冲击,故事优先 |
| **C: 探索派** | 把博物馆当游戏厅的 Z 世代 | 轻松、可分享、有趣味互动,游戏化最重 |

视觉风格让 Builder 根据用户画像自然推导,不预设。

### 3.2 Auditor Squad 的 6 个视角

| Auditor | 假装是谁 | 关心什么 |
|---------|---------|---------|
| **UX Auditor** | 第一次打开 App 的硬核博物馆爱好者 | 信息层级、找得到吗、流程顺吗 |
| **Aesthetic Auditor** | 有品味的设计师 | 视觉对得起"国宝"吗、廉价/俗气/不连贯之处 |
| **Content Auditor** | 青铜器领域研究生 | 维度拆得对吗、形态映射合理吗、内容深度够吗 |
| **Motivation Auditor** ★ | 早期重度用户 | 我为什么要持续打开?为什么要确认见过?为什么要分享?有持续动机吗? |
| **PM Auditor**(作品集) | 字节/腾讯/小红书招聘者 | 这个能打动我吗?最响亮的 AI PM 论点是什么? |
| **Comparative Auditor** | 比对 3 个版本的资深产品 | 各版长短?最优组合是什么? |

★ Motivation Auditor 是这个项目最关键的 audit 视角。

---

## 4. 协作模式(4 种)

| 模式 | 用在哪 | 例 |
|------|-------|----|
| **A. Sequential Handoff** | 串行依赖 | PM → PRD → Architect 读 PRD → 架构 |
| **B. Parallel Spawn** | 分叉独立任务 | Designer 拍板后,3 Builder + AI Engineer + Data Engineer 并行 |
| **C. Curator-Producer Loop** | 内容质量循环 | Researcher 出 brief → Designer 出 spec → Researcher 审 → revise |
| **D. Critic-Refine Loop**(有界) | 工程/设计质量循环 | Builder 提交 → Auditor review → Builder 改 → 最多 N 轮 |

**关键约束**: Loop 都有界(最多 2-3 轮),超界 escalate 到 Orchestrator,再不行 escalate 到用户(checkpoint)。避免无限烧 token。

---

## 5. Cost-aware Model Routing

| 角色 | 模型 | 理由 |
|------|------|------|
| Orchestrator | Opus | 跨域协调、架构判断 |
| Product Owner | Opus | 产品判断、案例研究撰写 |
| Domain Researcher | Opus | 领域深度、形态创意 |
| Visualization Designer | Opus | 开放性设计、组件创造 |
| AI Engineer | Opus | 模型选型、精度评估 |
| Builder | Sonnet | 执行型编码 |
| Data Engineer | Sonnet | 工程数据任务 |
| Auditor (UX/Aes/Cont/Mot/Comp) | Sonnet | 平衡 |
| Auditor (PM) | Opus | 案例研究高质量 review |

成本预估在每个 checkpoint 后更新到 `cost/cost-report.md`,作品集可量化指标。

---

## 6. Human-in-the-loop Checkpoint

约 10 天的高强度跑(可压缩可拉长):

| Checkpoint | 时点 | 内容 | 你决定的 |
|-----------|------|------|---------|
| **C0** | Day 0 启动 | Orchestrator 制订全周计划 | 仅签字开跑 |
| **C1** | Day 1 早晨 | 高保真 demo × 3 + 维度图 + 组件 spec + 6 份 audit | 选哪个/合并哪部分/调整哪个维度 |
| **C2** | Day 3 早晨 | 综合 demo v2 + 技术架构 + 数据 schema + 50 件内容 | 架构拍板、内容口味校准 |
| **C3** | Day 5 早晨 | AI 服务 PoC(20 件检索精度报告) + 小程序骨架 | AI 模型选型最终拍板 |
| **C4** | Day 8 早晨 | 端到端 MVP(500 件入库 + 完整识别 + 收藏闭环) | Beta 体验、bug 优先级 |
| **C5** | Day 10 早晨 | 上线版本 + 作品集案例研究文档 | 是否发布、案例研究修改 |

---

## 7. 通信协议

```
Communication = filesystem + event log
State         = /state.md (append-only,Orchestrator-owned)
Decisions     = /decision-log.md (Orchestrator 记录所有自主决策)
Artifacts     = /{namespace}/* (每个 agent 有写入命名空间)
Audits        = /audits/{date}-{aspect}.md + next-iteration-brief.md
Cross-agent reads = 任意读,只写自己 namespace
Resumption    = SendMessage to alive agent IDs (state.md 追踪)
Wake-up       = background agent 完成通知触发 Orchestrator 续跑
```

**事件溯源(event sourcing)**: Orchestrator 任何时候挂掉,新 Orchestrator 读 `state.md` 就能续跑。这是工程级别的健壮性设计。

---

## 8. 这个 Agent Team 设计在作品集中的论点

| 简历/案例研究的句子 | 对应这里的设计点 |
|---------------------|-----------------|
| "把 AI 拆成 8 个有边界的角色" | §2 拓扑,§3 角色定义 |
| "Audit Loop 是一等公民,6 个视角并行 trigger 下一轮" | §3.2 Auditor Squad, §4 模式 D |
| "把'无 context'当 feature 用" | §1.1 设计哲学 |
| "维度 × 形态 × 游戏化 三位一体" | §1.2,§3 Researcher + Designer |
| "Cost-aware,夜跑 / 白天可量化" | §5 Routing |
| "Event-sourced state,任何时候可续跑" | §7 通信协议 |
| "5-6 个 Human-in-the-loop checkpoint" | §6 |

---

## Appendix A: 关键文件清单

```
/home/user/prac03_MuseumCollect/
├── docs/
│   ├── agent-team-design.md      ← 本文件
│   ├── night-plan-d0.md          ← 今晚执行计划
│   ├── prd.md                    ← PM 产出
│   ├── dimensional-map.md        ← Researcher 产出 ★
│   ├── motivation-hooks.md       ← Researcher 产出 ★
│   ├── component-specs/*.md      ← Designer 产出 ★
│   ├── gamification-mechanics.md ← Designer 产出 ★
│   ├── architecture.md           ← Orchestrator 产出
│   └── case-study.md             ← PM 产出(作品集)
├── .claude/
│   ├── agents/                   ← 8 个 agent 定义
│   │   ├── orchestrator.md
│   │   ├── product-owner.md
│   │   ├── domain-researcher.md
│   │   ├── visualization-designer.md
│   │   ├── builder.md
│   │   ├── ai-engineer.md
│   │   ├── data-engineer.md
│   │   └── auditor.md
│   └── ...
├── state/
│   ├── state.md                  ← event log
│   └── decision-log.md
├── demos/
│   ├── v1-A-textual-research/    ← Builder A 产出
│   ├── v1-B-immersive/           ← Builder B 产出
│   └── v1-C-explorer/            ← Builder C 产出
├── audits/                       ← 6 个 audit + next-iteration-brief
├── reviews/                      ← agent 间相互 review
├── cost/cost-report.md
├── data/curated/
└── content/
    ├── artifacts/                ← 20-30 件国宝详情
    └── dimensions/               ← 8 个维度的内容
```

---

## Appendix B: v4.5 Audit Squad Upgrade — 5+1 → 6+1

> 2026-05-22 · Triggered by BUG-001 (artifact.html silent fallback affecting 275 of 277 records, missed by all 5 persona Auditors + Comparative in v3 review)

### Why this upgrade exists

In the v3 review round, all 5 persona Auditors (UX / Aesthetic / Content / Motivation / PM) plus the Comparative Auditor delivered passing reviews of `demos/v3-converged/`. A user then opened the deployed preview, clicked any artifact other than 后母戊鼎 or 何尊, and got... 后母戊鼎 every single time. Root cause: `artifact.html` lines 84-120 hardcoded a 2-entry `MOCK_ARTIFACTS` object with silent `|| MOCK_ARTIFACTS['houmuwu_ding']` fallback for the other 275 records.

**The systemic gap exposed:** all 5 persona Auditors were *myopic readers* — they read source, looked at one or two pages, and rendered verdicts based on what the happy path showed them. None of them clicked more than 2 artifact IDs to verify per-record correctness. The audit squad audited the audit squad. This appendix documents the result.

### The squad is now 6+1, not 5+1

```
旧 5 persona auditor (UX / Aesthetic / Content / Motivation / PM) — opinions about content & form
NEW Runtime Auditor (7th, defined in .claude/agents/auditor-runtime.md) — only does mechanical execution, no opinions
Comparative Auditor (8th in numbering but synthesizer role) — binding-bound to Runtime's findings
```

The Runtime Auditor (`.claude/agents/auditor-runtime.md`) is the only auditor with **mandatory tool execution**. It uses Sonnet (not Opus — fast and tool-heavy, not prose-heavy). Its dual output is `audits/{date}-runtime.json` (machine-readable test results, binding) + `audits/{date}-runtime.md` (human narrative).

### The 8-item MANDATORY VERIFICATION CHECKLIST

Every auditor (persona + runtime) now executes 8 mandatory checks before writing a report:

1. **多 ID stress test** — ≥5 random IDs sampled across the dataset, each navigated to, each verified to render correctly
2. **Console errors** — zero allowed in a passing audit
3. **End-to-end flow** — ≥1 full user journey walked step-by-step
4. **Claim-vs-reality table** — every product claim from README/case-study/merged-spec tested against the running app (✅/⚠️/❌)
5. **Mobile viewport spot-check** — 375×667 or 375×812, screenshots of hero + one key interaction
6. **Dead button audit** — every visible button verified to trigger something, phantom buttons = P1+
7. **Routing parity** — every URL-param-reading page tested with ≥3 valid + 1 invalid value
8. **Data dependency proof** — every "N records / N collected" claim verified by counting actual rendered records

The Runtime Auditor executes Checks 1-8 at higher rigor (10 IDs, 3 flows, all README claims) plus 3 runtime-only checks:

9. **Network tab inspection** — any 404 / failed fetch / >2s request flagged
10. **LocalStorage state cleanup test** — clear → refresh → expect Day-0 state intact
11. **Time-pillar emit → downstream listen latency** — < 200ms threshold for cross-component event propagation

### Binding rule

Runtime Auditor's `runtime.json` is **binding** for the Comparative Auditor. If Runtime says "broken", Content/Aesthetic/Motivation/PM cannot overrule it with "looks fine in screenshot". Persona Auditors decide whether a demo is *good*. Runtime Auditor decides whether the demo *exists*.

### BUG-001 retrospective in one line

The audit squad audited the audit squad. v4.5 is what came out. Don't let v4.6 need a v5.5 because someone read instead of clicked.

### Portfolio implication

The case-study reflection now has a third concrete lesson available: *"我们的 audit squad 自己被 audit 了 — 因为 5 个 persona auditor 都是 myopic readers, 错过了一个 P0 silent fallback。我们增加了 Runtime Auditor (7th persona) 和 8-item mandatory checklist。这是 portfolio 最强的 reflective signal: 我们不只设计 audit loop, 我们让 audit loop 自我审计了"。*
