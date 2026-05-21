# QA / Audit Agent — 工作流 Best Practices Research (v4.5)

> 2026-05-21 · 触发事件: BUG-001 (artifact.html fallback 总跳后母戊鼎,5 Auditor 全员 miss)
> 内向评估 + 外向调研 + 工作流改进建议
> 关键产出: Auditor v2 system prompt patch, 工具链 roadmap (Tier 1/2/3), 是否增设新 Agent 的裁决

---

## 1. TL;DR (300 字)

**现状评估**: 我们的 5+1 Auditor squad 是一支"会写散文的 PhD 评审团",在内容深度、persona-driven 洞见、跨视角合成上表现优异(参见 d1/d2-comparative.md 的多 Auditor 收敛信号分析);但他们**全员近视**——只读代码 + 浏览器视觉印象,没有任何运行时执行能力,因此对"页面看起来对、点下去也错"的 JS 行为 bug 是结构性盲点。

**最大 gap**: BUG-001 不是个案,是机制问题。Auditor 工作流缺三件事:(1) **运行时验证层**——没人启动 server、没人点击 button、没人开 DevTools 看 console,(2) **edge-input stress 协议**——所有 audit 都从 happy path ID(houmuwu)进入 artifact 详情页,而不是随机抽 5-10 个 ID 测,(3) **机器 oracle**——没有 visual regression baseline 或 a11y 自动扫,所有判断都是"我看了 1 张截图"。

**Top 3 改进**: (a) 在 auditor.md 加 **interactive-flow checklist**(`python3 -m http.server` + 随机 N=5 ID 测试 + 打开 console + 必须 1 个跨页跳转完成); (b) 接入 **Playwright MCP** 让 Auditor 真正点击 + 截图 + 抓 console err,这是 2026 业界 vibe-coded app QA 的事实标准;(c) 新增专职 **Runtime Auditor**(7th persona)负责"代码可视面以外"的失败模式,与现有 5 个 persona auditor 解耦。

**是否需要新工具/Agent**: Playwright MCP 必须接入(本周 4-8h);新增 1 个 Runtime Auditor + 1 个 Visual Diff Auditor(可选,Claude Vision-based);不需要换掉现有 5 个 persona auditor,他们仍是 portfolio 的核心叙事资产。

---

## 2. 我们 Auditor 工作流的现状评估

### 2.1 哪些 work (保留)

| 设计选择 | 为什么 work | 证据 |
|--------|-----------|------|
| **冷上下文**(cold-context fresh thread) | 设计团队盲点 = Auditor 的可见点 | d1-ux §"P0 blocker" 抓到三版预设角色问题——内部团队从未察觉 |
| **Persona-driven**(UX/Aesthetic/Content/Motivation/PM 5 角色) | 不同视角抓不同问题,互不掩盖 | d1-comparative §"Surprising findings #1": UX 给 me.html stats 第 1,Motivation 给同一 stats P0;同一证据 → 相反裁决暴露了"5 分钟 vs 2 周"的优化目标分裂 |
| **Comparative auditor 第 6 票**做横向合成 | 拒绝"5 个孤立报告" → 直接给 next-iteration brief 1 个 | merged-spec.md / merged-spec-v3.md 已两轮兑现 |
| **next-iteration brief 与 audit report 同时产出** | "Auditor = iteration trigger" 不只是 review;闭环成本低 | iteration-1-changes.md 5/5 Auditor flagged 的图像供应链问题 4 小时内闭环 |
| **Comparative auditor "Surprising findings" 段** | 显式标注"哪两个 Auditor 同证据相反裁决",这是 portfolio 的 reflective storytelling 关键 | d1-comparative §"Surprising / contradictory findings" |

### 2.2 哪些不 work (BUG-001 case study)

**事实链**:
1. `artifact.html` 84-120 行 hardcode `MOCK_ARTIFACTS` 只含 houmuwu_ding + he_zun 2 条
2. 第 414 行 `MOCK_ARTIFACTS[id] || MOCK_ARTIFACTS['houmuwu_ding']` 对其余 275 件 silent fallback
3. `data-loader.js` 早已构建 `window.MuseumData.get(id)` API 全 277 件,但 artifact.html 没调用
4. 用户在 Vercel preview 上"点任何文物都跳后母戊鼎"——5 个 Auditor + 1 Comparative 全部 miss

**5 Auditor 为什么都 miss**(根因分析):

| Auditor | 为什么 miss | 工作流缺陷 |
|---------|------------|----------|
| UX | 从 catalog → artifact 走"happy path",落点恰好是 houmuwu(MOCK 有的那条) | 没"随机抽 N=5 不同 ID"指令 |
| Aesthetic | 审 artifact.html **视觉**,看 hero、silhouette、rarity halo——视觉是真的对的(后母戊鼎确实展示了) | 没"内容是否对应 URL 参数"的检查项 |
| Content | 主要校对 patterns_structured / data_sources / 释读文字事实——这些字段本身正确 | 没"读 100 条数据,抽 5 条验证 render 一致"的指令 |
| Motivation | 关心 hook 强度、reentrant 节奏,不查"详情页是否真的 render 对应数据" | scope 之外,但也没 stress |
| PM | 关心 case-study 论点、招聘者印象,远离实现细节 | scope 之外 |
| Comparative | 合成 5 个 audit;5 个都没报 → 合成也不会冒出 | 上游空 → 下游空 |

**根本原因**: 所有 Auditor 都"看",没人"点 + 验证"。Aesthetic 看一张正确截图,Content 看一组正确文本,但没人测"我点了利簋的卡片,详情页 URL 是 `artifact.html?id=li_gui` 时,标题真的是利簋吗?"

### 2.3 Auditor v1 系统 prompt 的 8 个具体缺陷

(对照 `.claude/agents/auditor.md` v1)

1. **没有 stress-input 指令**: "随机抽 N 个 ID / route / input 测试关键交互"完全缺失。Auditor 拿到一个 demo 不知道"测哪几件"。
2. **"What to load (cold context)" 只列了 demos/v1-A/index.html 等静态文件,没有"启动 local server + curl 几个 URL + 看 console"的运行时步骤**。所有 audit 都是文件 + 截图静态分析。
3. **没有 "open DevTools, check console errors" 指令**。BUG-001 在 console 里不会报错(silent fallback),但很多类似 bug 会有 warning——我们没让 Auditor 看。
4. **没有"至少一个 interactive flow 端到端走通"要求**。catalog → artifact → 返回 → 切换维度 → 我的 全闭环,这种用户路径完全没有强制 checklist。
5. **不区分"代码 review" vs "运行时 review"**——所有 5 个 persona auditor 默认前者。没有任何 persona 专职 runtime,导致全员漂移到"读源码 + 看视觉"。
6. **没有 "URL 参数变化时是否反映" 的标准检查项**。这是 dynamic page 必查项,但 prompt 里没有。
7. **没有"产品声称的功能是否真的工作"对照表**。case-study / README / merged-spec 里宣称"穿越模式 = 三维度联动"——是否真联动?Auditor 没被要求验证 claim-vs-reality(d2-comparative 5/5 Auditor 最终都抓到了"跨页面不联动",但这是事后,而且也只是文档对照而非运行时实测)。
8. **"Special instructions per aspect" 只给了 motivation 和 comparative 加 hint,UX/Aesthetic/Content/PM 没有 aspect-specific runtime hint**。UX Auditor 应当被要求"必须在 mobile viewport 跑一次",Aesthetic 应当"截 3 个 viewport 的 screenshot"——这些都没有。

---

## 3. Vibe Coding QA 业界 2024-2026 现状

### 3.1 主流 AI 编码工具的 QA 实践

| 工具 | 自带 QA | 强项 | 弱项 |
|------|--------|------|------|
| **Cursor** | 拖图进 chat + Claude 4 vision review | 多模态原生支持;开发者主动喂截图 | 没自动浏览;只看你给的图 |
| **v0.dev** (Vercel) | 浏览器预览 + 手动 prompt-iterate | "对话即 QA",看到不对就再 prompt | 无自动化 regression |
| **Bolt.new** | StackBlitz 实时预览 | 浏览器内即时反馈 | 在 6 轮 re-prompt 后仍交不出能用的 camera app(2025 实测);happy-path 偏置严重 |
| **Lovable** | 自带 Supabase + Preview | 速度最快;有 GitHub sync 后可挂 CI | QA 仍靠人眼 |
| **Replit Agent** | 长时运行 + 自我修复尝试 | runtime feedback loop | 修复尝试常 hallucinate API |
| **Claude Code (本工具)** | Computer Use + Playwright MCP + screenshot tool | 可以真点击 + 截图 + 抓 DOM | 默认不开启;需要显式接 MCP |
| **VibeEval** (第三方) | 专为 vibe-coded app 的 regression + security scan | 自动化压测 AI 生成代码 | 商业 SaaS |
| **testRigor / Mabl / Virtuoso** | AI agent 驱动 E2E | 自然语言写 test;self-healing | 企业向,有 setup 成本 |

**业界共识**(2025-2026): "Vibe coding 偷工 in edge cases" 已成 meme 级问题——所有报告独立得出同一结论: AI 生成的 happy path 漂亮,sad path 缺失,edge case 几乎不会被生成,**QA 必须显式补这一层**。

### 3.2 LLM Vision 在视觉 review 的位置

**2026 现状**:
- Claude Opus 4.7 + GPT-5.5 + Gemini 3.1 三家都原生支持 image input,vision 能力近平;
- Gemini 3.1 Pro 因为 native multimodal training 在"看截图调 CSS"上略占优(粘破损 UI → 直接给 CSS fix);
- Claude 在 "给出修复 code + 解释 why"上更结构化;
- **共同短板**: 小元素、低对比、密集 panel 时 vision 模型会跳过——所以 Claude Vision-based audit **不能替代** pixel-diff 工具,但**可以替代**部分 manual 截图人眼检查;
- Anthropic 官方有 Computer Use tool;Claude Code 有 image input,但**没有内置 take-screenshot tool**——必须经 Playwright MCP 或外部 screenshot MCP 让 Auditor 截图。

**结论**: LLM Vision 在我们的工作流里能做"语义层判断"(这张图是否破版、是否拼接突兀、是否有 cheap 廉价感),不能做"像素级 diff"。两者要组合。

### 3.3 Visual regression 工具横评

| 工具 | 性质 | 价格 | 我们项目契合度 |
|-----|------|------|--------------|
| **Lost Pixel** | 开源 CLI + 可选 SaaS | OSS 免费 / SaaS 收费 | ★★★★★ 本项目首选(无 Storybook 也能扫页) |
| **Argos CI** | 开源 + 商业;Playwright/Cypress 集成 | 免费 tier + Pro | ★★★★ 与 Playwright MCP 路径一致 |
| **Chromatic** | Storybook 原生;企业级 | 商业,贵 | ★★ 我们不用 Storybook,投入产出比低 |
| **Percy** | BrowserStack 旗下;成熟 | 商业 | ★★ 大企业向,我们规模偏轻 |
| **Applitools** | AI-powered Visual AI;2025 CIO Review 年度奖 | 企业级 | ★ overkill |

**裁决**: Lost Pixel CLI(open-source mode 完全免费,4-6h 可接入)+ Playwright 驱动截图。Argos 备选。

### 3.4 Interaction testing

**两条路径**:
1. **Playwright Codegen** — 人/Auditor 操作浏览器,自动录成 test 代码。适合"我点这条流程,把它保存为 regression"。
2. **Playwright Test Agents (MCP)** — Planner agent 读 PRD + 探索 app + 产出 test plan;Generator 写 spec;Runner 执行。这是 2026 业界对 vibe-coded app QA 的标杆模式(GitHub Copilot Coding Agent 已内置 Playwright MCP)。

**我们应当用第二条**: Auditor agent 拿 `docs/prd-demo-night.md` + `audits/merged-spec-v3.md` 当 input,自己生成 5-10 个 user story 转 Playwright spec,跑一遍,把 fail 写进 audit report。

### 3.5 Accessibility automation

- **axe-core** (Deque 出品) — 96 条 WCAG 规则,业界事实标准。捕获 ~30-40% 的 a11y 问题(剩余 60-70% 仍需 manual)。
- **Lighthouse CI** — Google,内含 axe-core 子集(50 条);跑性能 + a11y + SEO 综合。
- **业界共识**: 两者**互补不替代**——Lighthouse CI 做 PR-gate 性能 budget,axe-core 做 detailed a11y regression。

**我们项目**: 当前 0 a11y 检查。Auditor v1 prompt 没提 a11y。文物站点未来要做无障碍(色弱、屏幕阅读器),应当现在就接 axe-core(npm 一行,5 分钟接入)。

---

## 4. 人力 vs 工具的分工矩阵

每行 verdict: ✅ 主用 / ⚠️ 辅助 / ❌ 不适合 / 人眼必要 = 是否仍需 human-in-loop final

| Review type | 纯代码 review | Playwright/工具 | LLM Vision | 人眼 final 必要 |
|------------|--------------|----------------|-----------|---------------|
| 视觉布局是否破版 | ❌ | Lost Pixel ✅ (像素 diff) | Claude Vision ⚠️ (~80% 召回) | 5 张样图最终 sign-off |
| Mobile 响应式 | ⚠️ (查 px-20 类硬编码) | Playwright viewport ✅ | ⚠️ | 真机 1 台过一遍 |
| 交互流程是否走通 | ❌ | Playwright MCP ✅ | ⚠️ (50%) | 边缘 case 抽样 必要 |
| URL 参数 → 内容一致(BUG-001 类型) | ⚠️ (grep MOCK\_) | **Playwright ✅✅✅** (随机 N 个 ID) | ❌ | 否 — 工具应自动 |
| Console errors | ❌ | Playwright + JS console listener ✅ | ❌ | 否 |
| Network 失败状态 | ❌ | Playwright 网络 mock ✅ | ❌ | 否 |
| 文字 typo | ✅ (spell check) | spell-cli ✅ | LLM 95% ✅ | nice-to-have |
| 内容学术准确 (青铜器年代/铭文/释读) | LLM ✅ (现 Content Auditor 已做好) | ❌ | ❌ | PhD-level 仍 necessary |
| 文案 tone / persona 一致 | LLM ✅ (现 Aesthetic+UX 已做好) | ❌ | ⚠️ (语境) | 是 |
| 性能 (LCP/CLS/INP) | ❌ | Lighthouse CI ✅ | ❌ | 否 — budget 化 |
| Accessibility (a11y) | ❌ | axe-core ✅ | ⚠️ (色弱模拟) | 关键页 manual screenreader |
| Motivation / retention 假设 | LLM ✅ (Motivation Auditor 强项) | ❌ | ❌ | 是 — 2 周后 user research 真补 |
| 跨页 event bus 联动 (穿越模式) | ⚠️ | Playwright multi-tab + BroadcastChannel ✅ | ❌ | 是 — 5/5 Auditor d2 才抓到 |
| Day-0 / 0-state 完整性 | ⚠️ | Playwright (清 localStorage 重跑) ✅ | ⚠️ | 是 — 仍需 persona 评估 |

**关键洞见**: 现 Auditor squad 在"内容/文案/学术/persona"(矩阵下半部)是 9/10 表现,在"运行时/URL/console/视觉 diff/性能/a11y"(上半部)是 1/10。**互补不冲突**——工具补的恰好是 persona auditor 弱的那半。

---

## 5. Auditor v2 系统 prompt 重写建议

### 5.1 具体 patch 项

```diff
[in auditor.md]

+ ## Universal pre-audit setup (ALL aspects)
+ 
+ Before reading any code/visual, run:
+ 1. `cd demos/v3-converged && python3 -m http.server 8000 &` (or check if already running)
+ 2. Open `http://localhost:8000/index.html` in your imagination/headed-browser/Playwright MCP
+ 3. Open DevTools console. RECORD any errors/warnings even on happy path.
+ 4. Note current viewport (default 1280x800); test at 375x812 (iPhone) at least once
+ 
+ ## Universal stress-test checklist (ALL aspects)
+ 
+ For ANY dynamic page (artifact.html, caster-profile.html, time-pillar.html...):
+ - [ ] Pick 5 RANDOM ids/inputs spread across the dataset (not just first/popular)
+ - [ ] Navigate to that page via URL param for each
+ - [ ] Confirm the page actually renders THE id you requested, not a silent fallback
+ - [ ] Log every console error observed
+ - [ ] Try ONE invalid id (e.g. `?id=__nonexistent__`) — does the page error gracefully?
+ 
+ ## Universal interaction-flow checklist (ALL aspects)
+ 
+ Complete at least ONE end-to-end flow:
+ - [ ] Home → click into a catalog item → see detail → back → enter a dimension page → return
+ - [ ] Note any dead-end, broken back-button, lost state
+ - [ ] Record the click-path you took (so it's reproducible)
+ 
+ ## Claim-vs-reality table (REQUIRED in every audit report)
+ 
+ Read README.md / merged-spec.md / case-study.md. For every feature CLAIMED:
+ - [ ] Verify it ACTUALLY works as described (not just exists in code)
+ - [ ] If "拍照识别" is claimed, click 扫一扫 and confirm reveal sequence runs
+ - [ ] If "穿越模式" is claimed, hover time-pillar and confirm pattern/geo respond — IN SAME PAGE OR ACROSS PAGES per claim
+ - [ ] Mark any claim-reality gap as P0
+ 
+ ## Special instructions per aspect (ADD to existing)
+ 
+ ### UX
+ - MUST test mobile viewport once (375x812)
+ - MUST test the "撤销/back" path (BUG: artifact has no breadcrumb? note it)
+ - MUST clear localStorage (`localStorage.clear()`) and re-open index → confirm 0-state exists
+ 
+ ### Aesthetic
+ - Capture 3 viewport screenshots: 1920 / 1280 / 375
+ - Confirm fallback states (broken img, missing silhouette) don't degrade aesthetic
+ 
+ ### Content
+ - Random-sample 5 ids; manually verify rendered text matches data JSON
+ - Confirm 100% data_sources field present where claimed
+ 
+ ### Motivation
+ - Simulate "I've been here 2 weeks" by manually editing localStorage state to 30 collected
+ - Then simulate "Day 0" by clearing it — re-evaluate hook ladder
+ 
+ ### PM
+ - Read case-study.md against demo — every claim verified or flagged
```

### 5.2 5 个新增 review item 模板(放进 audit report format)

```markdown
## Stress test results (NEW v4.5)
- Random ids tested: [id1, id2, id3, id4, id5]
- All rendered correctly: yes/no — if no, list mismatches
- Invalid id behavior: graceful 404 / silent fallback / crash
- Console errors during 60s session: [list]
- Mobile viewport pass: yes/no — screenshots: [path]

## Claim-vs-reality table (NEW v4.5)
| Claim (source) | Verified? | Evidence |
|---------------|-----------|----------|
| "277 件可详情查看" (README) | YES/NO | tested 5 random ids |
| "穿越模式 = 三维度联动" (merged-spec) | YES/NO | hovered time-pillar; observed: ... |
| "Day-0 onboarding" (next-brief) | YES/NO | cleared localStorage; observed: ... |

## Interaction flow walked (NEW v4.5)
Path: index → catalog → click li_gui → artifact?id=li_gui → 维度卡片 → time-pillar → me
Pass/fail at each step: ...
Dead-ends found: ...

## Mobile viewport observations (NEW v4.5 — UX/Aesthetic mandatory)
Tested at 375x812:
- Nav: legible/clipped/overflow
- Hero: legible
- Cards: stack correctly?

## Accessibility quick-check (NEW v4.5)
- Ran axe-core on / and /artifact?id=...
- Violations: [count by severity]
- Critical violations need fix: yes/no
```

### 5.3 重写 auditor.md 关键 section(可直接 paste)

```markdown
## Your audit format (v4.5 — extended)

(... existing sections ...)

## Mandatory pre-audit runtime steps

1. **Start local server**: `cd demos/v3-converged && python3 -m http.server 8000 &`
   (If using Playwright MCP, navigate there. If pure-imagination audit, mark as "static-only audit" and your findings get DOWN-weighted.)
2. **Open browser DevTools console**. Note every error/warning during 60s exploration.
3. **Stress test the dynamic detail pages** by visiting 5 random ids. Confirm rendered content matches requested id, NOT a silent fallback.
4. **Walk one full user flow** end-to-end. Record the click-path.
5. **Mobile viewport check** (UX & Aesthetic only): resize to 375x812 OR use Playwright MCP `browser_resize`.

## What you must NOT do (v4.5 — extended)

(... existing ...)
- Don't audit ONLY by reading source code — you MUST simulate a real user clicking
- Don't trust that "the page that opens" is "the page the user asked for" — verify with random ids
- Don't ignore console errors — silent JS bugs are P0 in vibe-coded products
- Don't skip the claim-vs-reality table — this is how we catch "穿越模式 announced but cross-page broken"
```

---

## 6. 推荐工具链 (本项目实施)

### Tier 1 — 本周必接 (4-8h setup)

1. **Playwright MCP** —— 让 Auditor 真的点击、截图、看 console。
   - Setup: `claude mcp add playwright npx @playwright/mcp@latest`
   - 一次配置,所有 Auditor 受益。Cost-aware routing 角度: 用 Sonnet 跑 Auditor + Playwright MCP,比 Opus + 静态 audit 性价比高 4-5 倍。
   - 风险: 现场 vercel 部署仍需 production URL audit;localhost audit 不能完全替代。
2. **Lost Pixel CLI** —— pixel-diff regression。
   - Setup: `npm i -D lost-pixel` + 一个 `lostpixel.config.ts` 列 8 个关键页面 URL
   - 跑 baseline → 之后每次 v5/v6 自动 diff,新引入的视觉破版立即报警
   - 完全 open-source mode 免费
3. **axe-core** + **Lighthouse CI** —— a11y + 性能基线。
   - axe-core: 5 分钟接入 `<script src="axe.min.js">` + `axe.run().then(console.log)`,Auditor 在 console 里能直接看到
   - Lighthouse CI: GitHub Action 一行,跑 PR gate

### Tier 2 — 可选 (本月内)

4. **Argos CI** — 如果 Lost Pixel 不够,Argos 在 GitHub PR diff UI 上更直观
5. **Claude Vision-based screenshot review skill** — 让一个新 Auditor agent 拿 8 张关键页截图,语义层判断"是否破版/廉价/拼接突兀"。这是补 Lost Pixel 的语义盲区(像素一致但风格漂移)
6. **VibeEval** 或 **testRigor** — 商业 SaaS,如果项目商业化后值得评估

### Tier 3 — 未来 R&D (v5+)

7. **自建 Claude Vision-based Visual Auditor** — 完全 LLM-driven 视觉 review,作为 7th persona。需要 prompt R&D 和评估方法学。
8. **Property-based testing for data layer** — 277 件每件随机生成 200 个 "假装用户" 行为序列,Mount Sinai 方法学的 factorial stress testing。
9. **BroadcastChannel + Playwright multi-tab test** — 真正测跨页 event bus(穿越模式 wow point)。

---

## 7. 是否需要新 Agent

### 现 5+1 是否够?

**不够**。BUG-001 暴露的是 "all auditors are myopic readers" 的系统性问题——加 prompt patch 能改善 70%,但需要 1 个**专职 runtime persona** 才能根治。

### 推荐新增 2 个 Auditor

#### 新 #7: Runtime Auditor (★ critical addition)

| 字段 | 内容 |
|-----|------|
| Persona | 一个"穷举测试 QA",对内容/美学/动机毫无意见,只关心 "Does the click do what the label says?" |
| Cold context | 只读 README.md 列出的 feature list,不读 design docs |
| 工具 | Playwright MCP (mandatory) + console listener + Lost Pixel CLI |
| 必跑项 | (a) 5 ids random stress on each dynamic page (b) 全部 README 声称的 feature 一一兑现 (c) Console error 全清单 (d) 关键页 3 viewport screenshot |
| 产出 | `audits/{date}-runtime.md` + 一个 machine-readable `audits/{date}-runtime.json`(列每条 stress test result),给 Comparative auditor 合成 |
| 模型 | Sonnet(纯 mechanical;不需要 Opus 写散文) |

#### 新 #8: Visual Diff Auditor (★ optional but high-ROI)

| 字段 | 内容 |
|-----|------|
| Persona | 一个"看图说话的 senior designer",但不 read code |
| Cold context | 上一轮 audit 留下的 8 个 baseline screenshot + 当前页面 8 张新截图 |
| 工具 | Claude Vision (native) + Lost Pixel diff output |
| 必跑项 | (a) 8 关键页 baseline 对照 (b) 语义层判断"是否破版/廉价/不连贯" (c) 调用 Lost Pixel CLI 的 numeric diff 报告作为 evidence anchor |
| 产出 | `audits/{date}-visual-diff.md` + diff PNG 链接 |
| 模型 | Sonnet (vision 任务,Opus 没显著优势) |

#### 不新增的 (避免膨胀)

- ~~Click-through tester~~ → 已被 Runtime Auditor 吸收
- ~~Stress-test generator~~ → 放在 Runtime Auditor 的 mandatory 项里
- ~~A11y auditor~~ → axe-core + Lighthouse 自动跑,无需独立 agent
- ~~Performance auditor~~ → Lighthouse CI 自动跑

### 7 + 2 + 1 = 8 Auditor 后的 squad shape

```
旧的 5 persona auditor (UX/Aesthetic/Content/Motivation/PM) —— 关心"对错"和"好不好"
新 Runtime Auditor —— 关心"work 不 work"
新 Visual Diff Auditor —— 关心"是否回归"
Comparative Auditor (第 8 票) —— 横向合成所有 8 票,产 merged-spec
```

8 Auditor parallel + 1 Comparative serial = portfolio 论点 "Audit Loop 是一等公民"得到结构性加强 —— case-study §3 里可写 "我们从 5 个 persona auditor 升级到 7+1 结构,因为 BUG-001 (artifact silent fallback) 在 d3 暴露了 myopic-reader 系统盲点;Runtime Auditor 是这次反思的具体落地"。

---

## 8. 实施 roadmap (3 step)

### Step 1 — 今晚可做 (2-3h)

- [ ] 改 `.claude/agents/auditor.md`: 加 §5.1 的 8 个 prompt patch
- [ ] 在 `audits/bug-log.md` 末尾追加 "process improvement closed: Auditor v4.5 patch shipped"
- [ ] 新建 `.claude/agents/auditor-runtime.md` 文件,作为 Runtime Auditor 的 sub-agent prompt (基于本文件 §7 的 spec)
- [ ] 在 `state/state.md` 写 done line

### Step 2 — 本周可做 (4-8h)

- [ ] 接 Playwright MCP: `claude mcp add playwright npx @playwright/mcp@latest`
- [ ] Auditor v4.5 + Playwright MCP 跑一遍 v3-converged,验证 BUG-001 类型问题能被 Runtime Auditor 抓到
- [ ] 接 Lost Pixel CLI: `npm i -D lost-pixel`,baseline 8 个关键页
- [ ] 接 axe-core: 在 demos/v3-converged/index.html 加 `<script>` + Auditor mandatory check
- [ ] 这 4 步合计 4-8h;由 builder + auditor 协作完成

### Step 3 — v5 实施 (R&D, 1-2 周)

- [ ] Claude Vision-based Visual Diff Auditor (8th squad member);需要 prompt R&D 和 baseline 截图基础设施
- [ ] Property-based testing for 277 件数据层
- [ ] BroadcastChannel + Playwright multi-tab 测试穿越模式真联动
- [ ] case-study §3 加 "Auditor v4.5 reflection" 段——这就是 portfolio 最深的 reflective signal: "我们的 audit squad 自己被 audit 了,改了"

---

## 9. 风险与边界

- **Playwright MCP 设置成本不为零**: 本地需要 node + chromium 装好。如果 dev env 限制,fallback 用 curl + grep 模拟随机 ID stress(粗糙但能抓 80% 的 BUG-001 类型)
- **Lost Pixel baseline 维护成本**: 每次设计大变更要更新 baseline,容易 false-positive 噪音。需要明确"baseline 何时刷新"的 policy
- **新增 Runtime Auditor 会不会冲淡 persona auditor 的故事价值?** 不会——Runtime 是机械补丁,Comparative auditor 仍会在 portfolio 上突出 persona 多元;反而 "我们意识到 myopic reader 问题并新增了 Runtime persona" 是更强的 reflective storytelling
- **token 成本**: Sonnet × 7 Auditor + Opus × 1 Comparative ≈ 当前 Sonnet × 5 + Opus × 1 的 1.4 倍;每轮 ~$3-5 增量,可接受
- **不要让 Runtime Auditor 写散文**——它的产出应当 70% 机器可解析 (JSON / 表格),30% 自然语言。否则又会回到"主观印象"的老路

---

*Researcher · 2026-05-21 · 触发: BUG-001 (artifact silent fallback)*
*Sources synthesized: 14 web searches + 11 project audit files + 2026 业界 vibe-coded QA literature*
*References (selected):*
- [Playwright MCP & Claude Code automation guide](https://testomat.io/blog/playwright-mcp-claude-code/)
- [Vibe Eval — regression testing of vibe coding](https://medium.com/@time_less/vibe-eval-regression-testing-of-vibe-coding-with-lovable-cursor-bolt-and-ai-browser-e763212eb6dc)
- [Lost Pixel — open source visual regression](https://www.lost-pixel.com/)
- [Argos CI](https://argos-ci.com/)
- [Multi-Agent Code Review architecture 2026](https://rkoots.github.io/blog/2026/03/09/bringing-code-review-to-claude-code/)
- [Mabl — AI Agent Frameworks for E2E test automation](https://www.mabl.com/blog/ai-agent-frameworks-end-to-end-test-automation)
- [TestGrid — Vibe Testing](https://testgrid.io/blog/vibe-testing/)
- [qtrl — How to QA a vibe-coded app](https://qtrl.ai/blog/how-to-qa-a-vibe-coded-app)
- [Claude Code Computer Use + Vision (CometAPI 2025)](https://www.cometapi.com/can-claude-code-see-images-and-how-does-that-work-in-2025/)
- [Playwright Test Agents (Microsoft 2025)](https://playwright.dev/docs/test-agents)
- [axe-core + Lighthouse CI integration](https://www.accesify.io/blog/accessibility-testing-automation-axe-pa11y-lighthouse-ci/)
- [BroadcastChannel API (Chrome blog)](https://developer.chrome.com/blog/broadcastchannel)
- [How to Stress Test AI Agents (Maxim)](https://www.getmaxim.ai/articles/how-to-stress-test-ai-agents-before-shipping-to-production/)
- [Multimodal AI Face-Off — Claude/GPT-4V/Gemini 2026](https://claude5.com/news/multimodal-ai-face-off-claude-gpt-4v-and-gemini-in-2026)
