# Cost Report — Night Run D0 (2026-05-20)

> Token usage by sub-agent. Maintained by Orchestrator.
> All subagents = Sonnet (per agent-team-design.md cost-aware routing).
> Orchestrator (main session) = Opus.

---

## Per-agent token usage

### Phase 1 — Foundation (3 agents parallel)
| Agent | Tokens | Wall-clock |
|---|---|---|
| Product Owner | 45,206 | ~7 min |
| Domain Researcher | 66,887 | ~10 min |
| Data Engineer | 129,111 | ~12 min |
| **Subtotal** | **241,204** | ~13 min (parallel) |

### Phase 2 — Design (2 agents parallel)
| Agent | Tokens | Wall-clock |
|---|---|---|
| AI Engineer | 97,911 | ~9 min |
| Visualization Designer | 140,755 | ~19 min |
| **Subtotal** | **238,666** | ~19 min (parallel) |

### Phase 3 — Builders (3 agents parallel)
| Agent | Tokens | Wall-clock |
|---|---|---|
| Builder A (考据派) | 250,859 | ~24 min |
| Builder B (沉浸派) | 267,558 | ~25 min |
| Builder C (探索派) | 234,443 | ~20 min |
| **Subtotal** | **752,860** | ~25 min (parallel) |

### Phase 4 — Auditor Squad (5 parallel + Comparative)
| Agent | Tokens | Wall-clock |
|---|---|---|
| UX Auditor | 181,587 | ~7 min |
| Aesthetic Auditor | 159,957 | ~11 min |
| Content Auditor | 185,456 | ~9 min |
| Motivation Auditor | 189,446 | ~6 min |
| PM Auditor | 135,475 | ~7 min |
| Comparative Auditor | 143,304 | ~12 min |
| **Subtotal** | **995,225** | ~24 min (parallel + Comparative seq) |

### Phase 5 — v2 Iteration (close-loop)
| Agent | Tokens | Wall-clock |
|---|---|---|
| Builder Iterator | 174,107 | ~16 min wall-clock (~120 min actual work) |
| **Subtotal** | **174K** | |

---

## Totals (final)

- **Subagent tokens (Phase 1-5)**: **2,401,962** (~2.4M)
- **15 subagent invocations** total

## Wall-clock (final)

- Setup: 30 min
- Phase 1: 13 min (parallel)
- Phase 2: 19 min (parallel)
- Phase 3: 25 min (parallel) 
- Phase 4: 24 min (parallel + Comparative seq)
- Phase 5: 16 min (single agent)
- **Total night run: ~2h 7min compute time** (compressed via parallelism from ~6-7h sequential equivalent)

---

## Insights (作品集素材)

### Cost-aware routing in practice
- 14 distinct subagent invocations
- 100% Sonnet (no Haiku triggered tonight, no extra Opus beyond main session)
- Effective parallelism: Phase 1 3-way parallel saved ~20 min, Phase 3 3-way parallel saved ~50 min, Phase 4 5-way parallel saved ~40 min vs sequential

### Token-to-deliverable ratio
~2.4M tokens produced:
- 1 PRD + 3 personas + 1 case-study skeleton
- 10 dimensional map entries + 6 motivation types + 5 cross-dim combos
- 25 国宝 structured records + licensing log
- 10 component specs + gamification mechanics doc
- API contract + JS mock + AI roadmap
- 3 working HTML demos (8 pages × 3 = 24 pages + components + CSS + JS)
- 6 audit reports + 6 next-iteration briefs + comparative + merged-spec
- 1 v2 iteration (in progress)

That's roughly **170K tokens per major deliverable on average**, but ranges from 40K (compact specs) to 270K (full Builder run).

### Anti-pattern noted (for future runs)
- Each commit cycle (stop hook) triggers main-session token spend; over 20 commits tonight likely ~50-100K main-session tokens just for state/commit/push. Future: batch state updates, reduce commit frequency where safe.

### Real-money estimate (rough)
Assuming public API pricing approximations:
- Sonnet input ~$3/M, output ~$15/M (70/30 split): ~$5+$10 = **~$15 for subagents**
- Opus input ~$15/M, output ~$75/M for main session (~200K): **~$5-8**
- **Total night run**: **~$20-25 USD** for 3 high-fidelity demos + complete agent team artifacts + full audit cycle + close-loop iteration

(This is a rough estimate, not official billing. Actual Claude Code billing may differ.)
