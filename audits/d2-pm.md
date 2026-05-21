# PM Audit (Portfolio Lens) — Day 2

> Auditor role: 字节/腾讯/小红书/快手/美团 资深技术招聘 + Hiring Manager 视角。每周筛 50 份 PM 作品集。
> Day 2 audit object: agent-team-design.md + case-study.md + dimensional-map-v3.md + gamification-mechanics-v3.md + component-specs-v3/*.md + iteration-1-changes.md + state/state.md + demos/v3-converged/ + v1 demos + d1-pm.md
> Re-audit goal: has the closed loop between D1 and D2 upgraded the hire signal?

---

## The closed-loop arc I'm reading

v1 night run (3 differentiated demos) → 6-view audit squad → iteration-1-changes.md (12 silhouettes + 4 content fixes) → user decision (7+1 dimensions, 300 records, converge) → v3 night run (277 records + 7+1 dimensional-map + event bus + v3-converged demo) → this audit.

If I were a recruiter, this is the story I need to see. My job today is to evaluate whether the story is now visible, articulate, and defensible.

---

## 30-second pitch test

D1 PM Auditor called the logline too long (70 characters) and asked for a 20-character version. Here is what v3 gives me:

**What the v3 portfolio now lets me say in 30 seconds:**
> "Two night runs. 8-agent architecture. 277 structured records. 7 knowledge dimensions, each with its own product form. Cross-dimensional event bus linking timeline to map to pattern tree. Six cold-context auditors triggered one rebuild in real time. The audit loop itself is the portfolio evidence."

**Crispness vs D1: Meaningfully better.** The 277 real records + converged single demo + event bus as documented artifact have given the pitch three new verifiable handles. The logline in case-study.md §0 is still 70 characters and has not been updated since D0. This is a missed opportunity — the v3 numbers would make a 25-character version natural: "277 件 / 8 Agent / 7 维度 / 一夜两跑". Still no pull quote on the repo README or any landing page.

**Pitch score: 7.5/10** (up from 6/10 at D1). Numbers are real now; logline is still unrevised.

---

## Original 论点 inventory — v3 additions

D1 PM Auditor identified 5 distinct arguments. v3 adds 3 new ones and materially strengthens 2 existing ones.

### 论点 1: 维度 × 形态 × 游戏化 三位一体 (D1 score 8/10)

**v3 status: 9/10. Execution evidence is now dense.**

- v1 had 10 dimensions, each with a spec. v3 made a hard PM decision: cut to 7+1 after auditor feedback. This is not a spec change — it is a product judgment call documented in dimensional-map-v3.md ("聚焦 7+1 是 PM 决策结果"). A recruiter reading this sees PM prioritization under constraint, not just design ambition.
- The Pokédex + size-comparison bar for 形制, the true-proportion dynasty columns for 时代, the dual-view geo system, the 25 SVG icon pattern tree — each is now a real implemented component, not an ASCII diagram. The gap between "spec" and "running HTML" has closed materially.
- **New evidence**: gamification-mechanics-v3.md §4 documents a 6-event cross-component event bus (era-focus / form-select / pattern-focus / caster-focus / site-focus / position-need) with payload schemas. This is engineering documentation that a PM wrote or co-designed. In 2026, a PM who can spec a JavaScript event bus protocol and explain why it beats a central state store is a genuine differentiator.

### 论点 2: Audit Loop as first-class citizen + cold context as feature (D1 score: 5/10 on execution, 9/10 on framing)

**v3 status: Execution now 8/10. This is the biggest single improvement from D1.**

D1 PM Auditor called this a P0 portfolio-killer: "6 视角 audit" but audit files were empty when audited. Now:
- iteration-1-changes.md documents a 120-minute builder-iterator run triggered by 5 auditors independently flagging the same image supply chain issue. The cite trail is explicit: Aesthetic [P0-cheap-1/2] + UX [P1] + Content [P0 三星堆] + PM [Q5] → merged-spec → iteration.
- The v3 dimensional redesign (10 → 7+1) is itself the result of user feedback surfaced through the audit process. The loop ran twice in 24 hours.
- What is still missing: **the next-iteration-brief loop** for v3 has not yet demonstrated itself. The v3 auditors (this session) are the first v3 audit. For full close-loop evidence, there needs to be a v3 builder responding to this brief. If the portfolio is presented before that happens, this argument has one loop proven and one loop pending.

### 论点 3: Same product, 3 differentiated demos by user persona (D1: 7/10)

**v3 status: Resolved differently than expected — and the resolution is itself a portfolio argument.**

The three demos were not merged by picking pieces. They were superseded by a genuine convergence decision driven by user feedback. The v3 README says "A's scholarly spine (Noto Serif SC, 米黄 paper, 朱砂) + C's polish (sticky nav, card grid) + B's flourishes (dark hero, inscription long scroll)." More importantly, the decision to converge came from a documented user checkpoint — not from the comparative auditor's guess. This is a real PM process: user informs architecture, team executes.

This is now a stronger portfolio argument than "3 versions". It is "I ran 3 versions, audited them, surfaced synthesis criteria, brought in the user, and built v3 from the result." That is a PM loop, not a prototyping exercise.

**Remaining risk**: The convergence story is mostly in state.md (the event log) and has not been written up in case-study.md. A recruiter reading only case-study.md sees v0.1 skeleton with §3-§5 as TBD. The convergence story is invisible in the primary portfolio artifact.

### 论点 4: Cost-aware routing (D1: 7/10)

**v3 status: 6.5/10. Still an IOU.**

state.md records "~2.4M tokens" for Night Run D0. Night Run D1 (v3) has no final cost figure in state.md. cost/cost-report.md status unknown. This argument is weaker than it should be at Day 2. The data exists in the token logs — it just has not been pulled into a quotable number.

**Specific deficit**: The "时间杠杆" framing (one person + AI = N person-weeks) is the most hireable version of this argument. If the cost report showed "2 nights + ~$50 in API cost = 277 records + 7 component specs + 12 implemented pages + 6 audit reports", that sentence alone would make this portfolio memorable in a way that "I used multi-agent" never can.

### 论点 5: Event-sourced state, resumable at any point (D1: 7/10)

**v3 status: 7/10. Real, not a highlight.**

state.md is genuinely append-only and the Orchestrator reads it to resume. This is proven. But it remains an engineering detail that a PM should mention in one sentence, not feature as a headline.

### NEW 论点 6: Documented event bus as reusable architecture contract

**v3 status: 8/10. Genuinely new and impressive.**

gamification-mechanics-v3.md §4 contains a formal event bus protocol with:
- 6 named events with typed payload schemas
- emit / listen role assignment per component
- anti-loop rule (idempotent listeners, source field, no reverse emit)
- throttle spec (debounce 100ms)
- user toggle for cross-dim linkage

This level of documentation — a PM writing a component communication protocol — is unusual. It demonstrates that the candidate understands product architecture at the level where product decisions and engineering decisions are the same decision. The "穿越模式 on/off" toggle, which lets power users decouple components, is a product judgment embedded in an engineering spec. This is the kind of thing that impresses senior engineers on a PM interview panel.

**Portfolio gap**: This is buried in gamification-mechanics-v3.md. It needs a callout in case-study.md §3 Approach: "I designed a 6-event cross-component protocol that lets each dimension respond to the others in real time — and I spec'd it before the builder touched a line of code."

### NEW 论点 7: 277 structured records as a demonstration of AI-augmented data production

**v3 status: 7/10. Real, but not yet framed.**

5 parallel Data Engineer agents produced 277 records with 11 fields each, including licensing notes, rarity classification, inscription cross-references, and academic citations. The records acknowledge their own gaps ("TODO: size/excavation_year on 传世 pieces — not hallucinated, genuinely unknown"). The honesty about limits is a signal of quality.

**Portfolio framing gap**: This is a demonstration of AI-augmented content production at a scale that a solo PM could not do manually. But nowhere does the case-study say: "I used AI to produce research-grade data at a pace no manual approach could match — and built in honesty flags where the data is uncertain." That sentence would resonate with any team building AI knowledge products.

### NEW 论点 8: Convergence from 3 divergent exploratory versions to 1 polished synthesis

See 论点 3 updated above. The convergence argument is real. It just needs to be written.

---

## AI PM angle — is it genuine? (re-audit)

D1 gave the candidate 4 tests. Re-testing against v3 material:

**Test 1: Domain knowledge** — v3 dimensional-map adds 铸主 (Caster/Owner) as a first-class dimension. The decision rationale ("青铜器的灵魂不是金属，是那个把它铸出来献给祖先的人") is thematically coherent and would survive a domain expert challenge. The force-directed graph for caster relationships references D3.js with specific edge types (夫妻/父子/君臣). Score: still 9/10, no regression.

**Test 2: Multi-agent architecture** — v3 adds the event bus protocol (see 论点 6 above). The "cold context as feature" argument now has a counterpart: "documented artifact-driven communication as the alternative to stateful context." This pair is now a coherent architecture philosophy, not just a slogan. Score: 9/10 (up from 9/10, strengthened).

**Test 3: Technical depth** — v3 shows: D3 zoom with 1x/2x/4x king-era drill-down in time-pillar, GeoJSON terrain rendering, force-directed graph for caster network, SVG pattern icon generation. The README honestly documents what was stubbed (real GeoJSON CORS issue → SVG polygon approximation). This kind of honest trade-off documentation is what engineers look for. Score: 8/10 (up from original).

**Test 4: 3 differentiated demos as PM process** — Resolved into convergence + checkpoint decision. Score: 8/10.

---

## Agent team design as portfolio artifact — re-evaluation

D1 scored agent-team-design.md at 7.5/10 with 3 deductions:
1. No framework comparison (why not LangChain/AutoGen)
2. No cost tally
3. No retrospective ("哪些 agent 边界画错了")

v3 status on each:
1. **Framework comparison**: Still not in agent-team-design.md. This is still a P0 gap. The v3 run makes the answer more interesting: "We tried to use autonomous agents with full context-sharing and found that cold-context auditors caught more defects. Frameworks that force stateful continuity would have prevented this." This is a real, specific answer waiting to be written.
2. **Cost tally**: v3 night run total is not in any shareable artifact yet. Two nights of token usage, real dollar figure, would be compelling. Still IOU.
3. **Retrospective**: case-study.md §5 Reflection is still TBD. But v3 gives material: "We cut 10 dimensions to 7+1 after user feedback. We found that 3 differentiated builders create more meaningful divergence than 1 builder with 3 personas." These are real retrospective insights. They just have not been written.

**Updated score: 8/10** (up from 7.5/10). The v3 execution has added real weight to the architecture document's claims. But the 3 deductions from D1 are all still outstanding.

---

## Closed-loop evidence quality

The D1 PM Auditor called closed-loop evidence the single most important variable. Here is the v3 state:

**Loop 1 (v1 → v2)**: Fully demonstrated. 5/5 auditors independently flagged the same issue. Comparative auditor merged spec. Builder-iterator shipped 12 SVGs + 4 content fixes in 120 minutes. Playwright-verified. Evidence is in iteration-1-changes.md with explicit audit citation for every change. This loop is real and verifiable.

**Loop 2 (v2 → v3 via user feedback + orchestrator)**: Partially demonstrated. User checkpoint at D1 morning triggered the 7+1 decision, 300-record target, and convergence. This is documented in state.md but not in a recruiter-readable narrative. The loop ran but the story is only in the event log, not in case-study.md.

**Loop 3 (v3 → v4 via this audit)**: Pending. The fact that a PM audit is running in Day 2 and writing a next-brief that will feed a builder is the loop's next step. Whether it closes depends on what happens after this audit.

**Assessment**: Two loops are real, one is pending. For a portfolio, "one loop fully demonstrated + one loop documented in event log" is substantially better than "zero loops" (D1 state). But the portfolio's primary artifact (case-study.md) does not tell any of these loop stories. A recruiter reading only case-study.md sees a D0 skeleton with TBDs.

---

## Critical gaps — v3 audit view

### G1 [P0]: case-study.md §3 §4 §5 are still TBD — portfolio is still an IOU

This was D1's P1 finding. At D2, it is P0. Here is why:

The v3 run has generated enough raw material to fill §3 Approach and make substantial progress on §4 Outcomes. The candidate now has:
- 2 documented iteration loops (v1→v2, v2→v3)
- Specific agent decisions with reasons (10→7+1, 3 builders→1 converger, event bus contract)
- 277 real records with partial cost data
- A working 12-page converged demo

Leaving §3-§5 as TBD means all of this is hidden from the recruiter who reads case-study.md first. The raw material is not the bottleneck. Writing is.

**What needs to happen**: A Product Owner agent (Opus) should write §3 Approach (agent team design narrative, not just a link to agent-team-design.md) and §5 Reflection (honest retrospective with specific lessons) before this portfolio is shown to any recruiter. §4 Outcomes can stay partial until MVP, but should have interim numbers: "277 records structured, 12 pages implemented, 2 iteration loops in 24 hours, estimated $30-40 in API cost."

### G2 [P0]: No 20-character logline / memorable one-liner

D1 called this out. D2 observes: the numbers now exist to make one. The portfolio has 277 / 8 / 7 / 2 as its key numbers. A one-liner should exist and appear in: case-study.md §0, repo README, any portfolio landing page. It does not exist yet.

Suggestion: "8 agents, 2 nights, 277 records, 7 dimensions — a museum app built from the inside out."
(Not final, but the structure exists now. The candidate should write their own.)

### G3 [P0]: Framework comparison ("why not LangChain/AutoGen") still unwritten

Same gap as D1. In 2026, every PM candidate "using AI" will be asked this. The v3 event bus makes the answer more interesting and specific. It is still not written.

### G4 [P1]: Cost tally — two nights of API usage, never totaled

v1 night run: state.md says ~2.4M tokens (~$20-25). v3 night run: no figure in state.md final entry. A combined "two night runs, total ~$50 in API cost, equivalent output" number would be the most quotable sentence in the entire portfolio for a technical audience.

### G5 [P1]: Convergence story not in case-study.md

The three-demo-to-one-converged story is the strongest narrative arc this portfolio has. It goes: diverge deliberately → audit → synthesize → converge. This is a PM skill sequence. It is only in state.md. It needs to be in case-study.md §3.

### G6 [P1]: Event bus protocol not called out in portfolio narrative

See 论点 6 above. This is the most technically impressive thing in v3 from an engineering PM perspective. It is buried in gamification-mechanics-v3.md §4. It should be quoted in case-study.md §3.

### G7 [P1]: 277 records as AI-augmented data production not framed

See 论点 7 above. This needs one paragraph in §3.

### G8 [P2]: v3 demo's 12 implemented pages not called out with screenshots

The README says 12 pages. A recruiter needs to see what the product looks like in 30 seconds. The portfolio has no screenshot set. A 6-grid image (index, time-pillar, geo-system, pattern-tree, inscription-special-hezun, me) placed in case-study.md §4 would be the highest-ROI visual addition.

### G9 [P2]: "What I would do differently" (Reflection) still TBD

v3 gives specific material: "We over-specced 10 dimensions and cut to 7+1 — the PM lesson is spec for coherence, not for completeness." This is a real lesson, not a cliche. It is not written.

---

## Things present in v3 that earn their place

- **Event bus protocol**: A PM writing a JavaScript event contract with payload schemas, idempotency rules, and anti-loop constraints — this earns its place completely.
- **277 records with honest TODO flags**: The data engineers acknowledged their own uncertainty rather than hallucinating. That is integrity in AI output design. Earns its place.
- **iteration-1-changes.md with explicit audit citations**: Every change traced to an auditor report with line numbers. This is how a PM should document AI iteration. Earns its place.
- **Anti-Skinner design discipline documented in v3**: The systematic listing of what was deleted (龙纹 30s 旋转, "差N件解锁X" panels) alongside the rationale is rare. A PM who explicitly documents what they chose not to build is demonstrating judgment, not just output.
- **v3 README honest about deferred items**: "Real GeoJSON terrain loading (geo-system uses SVG polygon approximation due to CORS)" — this kind of honesty is the mark of an engineer-PM, not a slide-deck PM.
- **今日推荐 on index.html**: A content recommendation system ("1 件再读 + 1 件新探索 + 1 件本周明星") wired into the demo homepage. This is a product feature that demonstrates user journey thinking.
- **穿越模式 toggle**: Giving expert users the ability to decouple cross-dimensional linkage is a real product UX decision, not a demo feature. It demonstrates understanding of user control.

---

## Things present that do not earn their place at portfolio-review time

- **8 agent definition files in .claude/agents/**: These are engineering artifacts. Useful for building, not for reading as portfolio material. The architecture diagram in agent-team-design.md §2 is the portfolio version. The raw definition files should not be the primary reference.
- **component-specs-v3 at 8 files x ~3000 words each**: This documentation is too dense for a recruiter. It belongs in the portfolio as "evidence of rigor" (mention it, don't link it as primary reading). case-study.md §3 should summarize the key decisions, not send readers to 24,000 words of spec.
- **night-plan-d0.md and night-plan-d1.md**: Planning documents are internal. They demonstrate process discipline but are not portfolio reads.
- **The v1 demos after v3 exists**: Once the convergence story is written, the v1 demos are evidence of the diverge-then-converge process. They earn their place as cited evidence, but the portfolio should guide a recruiter to them via case-study.md, not leave them as undifferentiated files.

---

## "Would I interview this candidate" test — v3

### AI 产品团队 PM (字节豆包 / 腾讯混元 / Moonshot / 智谱)

**Still yes, and more confidently than D1.**

The v3 event bus protocol is the upgrade. A PM who can spec a cross-component event architecture and explain the choice of browser CustomEvent over a state store is a rare PM. This candidate can sit with engineers on architecture discussions without being a passive listener.

The audit loop close-loop evidence (iteration-1-changes.md) now answers the D1 hostile question "is audit-as-trigger real or PPT?" with a verifiable artifact. That removes one major objection.

The remaining hostile question I would ask: "Your event bus uses `window.dispatchEvent`. What happens when you have 50 components and events start looping? How did you handle this in your implementation?" The spec has an answer (idempotent listeners, source field, no reverse emit, debounce 100ms) but the candidate needs to know it without looking it up.

### 大厂 to-C PM (抖音 / 微信 / 美团)

**Same assessment as D1: unlikely, still not the right portfolio for this audience.** Growth model, funnel metrics, A/B testing framework — these are absent. The portfolio is optimized for depth over breadth.

### 文化-tech startup (博物馆数字化 / 文物保护)

**Strong yes. This portfolio is effectively the founding product vision for a startup.** The case-study §1-§2 alone is a fundable problem statement.

---

## Severity ranking — recruiter view

### [P0 portfolio-killer] Must exist before showing to any recruiter

1. **case-study.md §3 Approach**: Write it. The raw material is in state.md, agent-team-design.md, iteration-1-changes.md, and dimensional-map-v3.md. A Product Owner agent (Opus) should be able to draft it in 1-2 hours. The closed-loop story, the event bus architecture, the 10→7+1 PM decision, and the 277-record AI data production all belong here.
2. **20-character logline**: Write one. Put it in case-study.md §0, repo README.
3. **Framework comparison in agent-team-design.md**: Add 1 paragraph: "Why not LangChain/AutoGen/CrewAI?" Answer: "cold-context-as-feature requires stateless agent threads; frameworks assume stateful continuity."

### [P1 weakens the narrative]

4. **Cost tally**: Pull v1 (~2.4M tokens ~$20-25) + v3 night run numbers. Write one sentence: "Two nights, ~$X total, equivalent to N person-weeks of manual work." Place in case-study.md §4 Outcomes.
5. **Screenshots in case-study.md §4**: 6-grid image of v3-converged pages. Highest-ROI visual addition.
6. **Convergence story**: Write 1 paragraph in case-study.md §3 explaining the v1→v2→v3 arc as a deliberate PM process.
7. **Event bus callout in §3**: One sentence quoting the 6-event protocol as evidence of architecture-level product judgment.
8. **case-study.md §5 Reflection**: Write at least 3 specific lessons (not TBD). v3 has material: 10→7+1 dimension cut, 3 builders→1 converger, cold-context audit finding vs insider blindness.

### [P2 polish]

9. **repo README update**: Currently not reviewed, likely still reflects D0. Should have the new logline + links to case-study + demo.
10. **Component-specs-v3 indexing**: Add a 1-page index doc that summarizes all 7+1 specs in a table for recruiters who want evidence of depth without reading 24k words.
11. **"API cost vs manual effort" table**: In §4 Outcomes, a 3-row table (Phase A data, Phase B design, Phase C build) with estimated equivalent person-days and actual API cost would be the most memorable quantitative evidence in the portfolio.

---

## Hire signal rating — v3

| Dimension | D1 Score | D2 Score | Delta | Notes |
|-----------|----------|----------|-------|-------|
| 30-second pitch | 6/10 | 7.5/10 | +1.5 | Numbers real now; logline still unrevised |
| Original argument strength | 8/10 | 9/10 | +1 | Event bus + convergence + 7+1 decision add weight |
| AI understanding depth | 9/10 | 9/10 | 0 | Maintained |
| Product thinking density | 9/10 | 9/10 | 0 | Maintained; v3 adds discipline (anti-Skinner v3, dimension cut) |
| Execution evidence | 6/10 | 8/10 | +2 | 277 records + 12 pages + event bus wired = substantial proof |
| Case study completeness | 4/10 | 4/10 | 0 | Still §3-§5 TBD — this is the only dimension that did not move |
| Hostile question defense | 5/10 | 6.5/10 | +1.5 | Framework Q still unwritten; loop 1 now defensible |
| Vertical fit (museum-tech) | 10/10 | 10/10 | 0 | Perfect |
| AI product team PM fit | 8/10 | 8.5/10 | +0.5 | Event bus spec pushes this up |
| Large-platform to-C PM fit | 4/10 | 4/10 | 0 | Still needs a growth / metrics angle |

**Comprehensive hire signal (D2 state): 7.8/10**
- Up from 7.0/10 at D1.
- The 0.8 delta is real and earned: closed-loop evidence exists, v3 product decisions are substantive, event bus is a genuine technical contribution.
- The ceiling is 9/10 and is entirely gated on writing: case-study §3-§5, logline, framework comparison. None of these require more building. They require 2-3 hours of a Product Owner agent with the right raw material — all of which now exists.
- If §3-§5 remain TBD indefinitely, the portfolio stays at 7.8/10 and will be beat by a less ambitious candidate who wrote their case study.

**The single most important truth**: This portfolio is not a documentation problem anymore. It is not a build problem. It is a narrative packaging problem. Everything the recruiter needs to be convinced exists as a raw artifact. It has not been assembled into the story a recruiter will read.

---

**Audit version**: v0.2 (Day 2)
**Audit date**: 2026-05-21
**Previous audit**: audits/d1-pm.md (D1, score 7.0/10)
