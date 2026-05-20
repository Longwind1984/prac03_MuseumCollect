# Decision Log

> Orchestrator records every autonomous decision here. User can rollback any of these in the morning.

Format:
```
## [Decision ID] [Date] [Phase] [Agent]
**Context**: what triggered this decision
**Options considered**: list
**Decision**: chosen option
**Reasoning**: why
**Rollback impact**: what changes if user rolls back
```

---

## Pre-launch decisions (made jointly with user)

### D0-001 — Tonight's vertical
- Decision: 青铜器 single category, no diversification to 佛造像/陶瓷
- Reasoning: User chose depth over breadth

### D0-002 — Demo tech stack
- Decision: HTML + Tailwind CDN + vanilla JS + D3.js
- Reasoning: Fastest to build, easiest to compare side-by-side, browser-openable

### D0-003 — Builder differentiation
- Decision: 3 Builders with differentiated user personas (考据派/沉浸派/探索派), no preset visual style
- Reasoning: User wants Builder freedom, but Orchestrator adds persona to ensure differentiation

### D0-004 — Autonomy boundary
- Decision: Orchestrator full self-decision + decision-log, no pause on ambiguity except 根本性 user-level questions
- Reasoning: User chose efficiency over conservative pause

### D0-005 — Gamification as first-class citizen
- Decision: Motivation Auditor added to squad (5 → 6 auditors); Researcher and Designer must produce motivation-hooks.md and gamification-mechanics.md
- Reasoning: User explicit emphasis after v0.2 propose
