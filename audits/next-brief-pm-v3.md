# Next Iteration Brief: PM (portfolio) — v3 — 2026-05-21

> For: Product Owner agent (Opus) + whoever owns case-study.md next.
> Priority: Write, not build. The raw material is complete. The story is not.

---

## What to keep

- agent-team-design.md — solid, needs only one paragraph added (framework comparison)
- iteration-1-changes.md — this is the best single piece of closed-loop evidence in the portfolio; preserve as-is
- gamification-mechanics-v3.md §4 (event bus protocol) — rare PM-engineering artifact; keep verbatim, just surface it
- case-study.md §1 Problem + §2 Insight — these are strong and should not be revised
- dimensional-map-v3.md's 10→7+1 decision framing — this is a real PM prioritization story; keep the "PM 决策结果" sentence
- Anti-Skinner documentation in gamification-mechanics-v3.md §5 — explicitly listing what was deleted is a portfolio asset

---

## What to change

- **case-study.md §0 logline**: Replace 70-character version with a 20-25 character version that uses the real v3 numbers. The numbers now exist: 277 件 / 8 agent / 7 维度 / 2 nights. The candidate should write this themselves, but the format should be: 1 memorable number + 1 process claim + 1 outcome. Example structure: "[数字] 件 / [机制] agent / [结果] 维度" — the exact wording is a judgment call.
- **agent-team-design.md**: Add §8.1 "Why not LangChain/AutoGen/CrewAI" — 1 paragraph only. Key argument: frameworks assume stateful agent continuity; cold-context-as-feature requires stateless threads; this is an explicit architectural choice, not ignorance of alternatives.

---

## What to add

### case-study.md §3 Approach — Agent Team Design (most urgent)

This section is TBD. It needs to be written. Source material is available in: state.md events, agent-team-design.md, iteration-1-changes.md, dimensional-map-v3.md, gamification-mechanics-v3.md §4.

The section should cover these 5 points in order:

1. **The core architectural decision**: 8 bounded agent roles, not one large assistant. Explain why bounded = auditable.
2. **Cold-context audit as the key mechanism**: Auditors spawn fresh, read only what a first-time reviewer would read. First loop (v1→v2): 5/5 auditors independently flagged the same issue (image supply chain). The overlap of independent findings is the reliability signal.
3. **The event bus protocol as a PM-designed engineering contract**: 6 named events (era-focus / form-select / pattern-focus / caster-focus / site-focus / position-need) with typed payloads, idempotency rules, and a user-facing toggle. This was specced before the builder wrote HTML. Explain this as a PM working at the boundary of product and engineering.
4. **The 10→7+1 dimension cut**: Not a design taste decision. A PM decision: 10 dimensions produced specs that were each 8-11k words but each shallow. 7+1 with deeper per-dimension form-mapping is a prioritization trade-off. Quote the decision log if available.
5. **Cost-aware routing**: Opus for open-ended design/research/audit, Sonnet for deterministic building/data work. Give the actual split from the two night runs if the cost data is available.

Approximate word count: 600-900 words. This is the most important single writing task in the portfolio.

### case-study.md §4 Outcomes — Interim numbers (before MVP)

Do not wait for MVP to write §4. Write an interim version with what exists:

- 277 structured records (5 segments, 11 fields each, with honest TODO flags where data is genuinely uncertain)
- 12 implemented HTML pages in v3-converged, all linked by event bus
- 25 SVG pattern icons + 12 vessel silhouettes (named, recognizable, bronze-colored)
- 2 documented iteration loops in 24 hours
- Estimated API cost: ~$30-50 total for both night runs (pull actual figure from cost-report.md or token logs)
- Equivalent manual effort estimate: list the roles and rough person-days for a traditional team (Data: 2 researchers × 2 weeks; Design: 1 designer × 1 week; Build: 2 engineers × 1 week; Audit: 6 reviewers × 0.5 days) — total ~6-8 person-weeks vs 2 nights.

Note: "Equivalent person-weeks" framing is for the recruiter who asks "what does this actually prove?" It is not a claim of equal quality, it is a demonstration of AI leverage.

### case-study.md §5 Reflection — Specific lessons (not generic)

Write at least 3 specific lessons with the "we learned X because of Y" structure. Source material is in the audit reports and state.md. Suggested starting points:

1. "We over-specced 10 dimensions and shipped 3 shallow demos. The PM lesson: spec for coherence (each dimension needs a unique form), not for completeness (covering all possible categories). 7+1 with form-mapping constraints is a better brief than 10 with flexibility."
2. "Cold-context audit discovered what insider review missed. The 5/5 auditor convergence on image supply chain was the signal — not that images were missing (we knew that) but that 5 reviewers with zero prior context all named it as the blocking issue. Independent flagging rate is a quality signal we can use to triage."
3. "The event bus protocol should have been specced before the 3 builders were spawned. We specced it in v3 before the converger built — that ordering (contract first, implementation second) reduced integration friction. For the next run: write the inter-component protocol before any builder starts."
4. (Optional) "The 3-builder differentiation worked better than expected for divergence and worse than expected for convergence. The personas (考据派/沉浸派/探索派) created real product differentiation but made the merge decision hard. Next time: run 2 builders differentiated by persona, 1 builder explicitly tasked with the merge from the start."

Approximate word count: 400-600 words.

---

## Specific actionable instructions for the Product Owner agent

1. Open case-study.md. Write §3, §4, §5 using the above as a brief. Do not invent data — only use what exists in state.md, iteration-1-changes.md, dimensional-map-v3.md, gamification-mechanics-v3.md §4, and the audit files. Where data is unknown (exact cost figures), write a placeholder: "(待补: 从 cost-report.md 提取实际数字)".

2. Revise case-study.md §0 logline to ≤ 25 characters. Use actual v3 numbers. The logline must work as a standalone line in a resume bullet point, a LinkedIn post, and a case study title. Test it by reading it aloud — if it takes more than 3 seconds, it is too long.

3. In agent-team-design.md, after §8 (the claims table), add §8.1 titled "Why not LangChain/AutoGen/CrewAI". Write 1 paragraph only. The core argument is stateless threads enabling cold-context-as-feature. Acknowledge these frameworks are good tools for different use cases (stateful multi-step pipelines) but that the design philosophy here required a different choice.

4. Do NOT rewrite §1 Problem or §2 Insight — they are strong as written.

5. Do NOT add screenshots to case-study.md yourself — flag as "(待补: 6-grid screenshot from v3-converged demo)" so a human or separate agent can add them.

---

## What success looks like next round

A recruiter can:
1. Read case-study.md from §0 to §5 in 15 minutes and understand the complete story: problem, insight, architecture approach, results, reflection.
2. Find a one-line logline that they will remember when recommending the portfolio to a hiring manager.
3. Answer the question "why not just use LangChain?" by pointing to one paragraph.
4. See a rough cost figure that contextualizes the AI leverage claim.
5. See at least 3 screenshots of the v3-converged demo without navigating any file system.

If those 5 conditions are met, the portfolio's hire signal will reach 8.5-9/10 for AI product team PM roles.

---

## Open questions for the user

1. **Cost data**: Is cost-report.md populated? If not, can you pull the token usage from the API logs for both night runs and give an approximate USD figure? This is the single most quotable number for the "AI leverage" argument.

2. **Logline**: What is the one-line version you would actually say at a party when someone asks "what did you build?" That version is the logline. The case study version is a polished edit of that. If you write it, I will match it — do not let an agent write your personal pitch.

3. **§5 Reflection "would redo"**: Of the 3 specific lessons I drafted above, which 1 do you most want to keep? Any you disagree with? The reflection section will be judged by how honest it is — if it reads like a generic "I learned to iterate faster", it will hurt the portfolio.

4. **Timeline**: Is there a target date for showing this portfolio to a recruiter? If so, the PM agent writing §3-§5 should run before that date. If the portfolio is being shown in the next 1-2 weeks, §3-§5 are P0. If it is 2+ months away, the MVP outcomes data can be collected first.

5. **Framework comparison tone**: The "why not LangChain" paragraph will be read by engineers. The tone should be "I evaluated and chose differently" not "LangChain is wrong." Does the candidate want to make a stronger critique (naming specific limitations) or a more neutral statement of design philosophy? The stronger critique is more memorable but carries more risk of being wrong in front of an interviewer who uses LangChain.
