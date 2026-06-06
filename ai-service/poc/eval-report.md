# Eval Report — CLIP Retrieval PoC

> **Status: TEMPLATE — headline numbers `[fill after run]`.**
> Will be auto-overwritten by `eval.py` next time it runs end-to-end on a host where
> Wikimedia + HuggingFace are reachable. See `README.md` for the off-sandbox runbook.

## Headline metrics

| Metric | Value | Roadmap §6.3 target |
|---|---|---|
| P@1 (strict id match) | `[fill after run]` | ≥ 0.40 |
| P@5 (id in top-5) | `[fill after run]` | ≥ 0.60 |
| Intra-class P@1 (proxy for 1-image-per-artifact regime) | `[fill after run]` | — |

## Per-dynasty breakdown

| Dynasty | N | P@1 | P@5 | Intra-class P@1 |
|---|---|---|---|---|
| 商 | `[fill]` | `[fill]` | `[fill]` | `[fill]` |
| 西周 | `[fill]` | `[fill]` | `[fill]` | `[fill]` |
| 春秋 | `[fill]` | `[fill]` | `[fill]` | `[fill]` |
| 战国 | `[fill]` | `[fill]` | `[fill]` | `[fill]` |
| 秦汉 | `[fill]` | `[fill]` | `[fill]` | `[fill]` |

## Failure cases (top-5 miss)

`[fill after run]`

## Interpretation

Per `docs/ai-roadmap.md` §6.3, this PoC is **Phase 1 floor**, not production target. The pre-run discussion
of what to look for lives in `IMPLEMENTATION-NOTES.md §3`. The post-run answer to "is the baseline
strong enough to justify Phase 2?" is the headline P@1 number above.

## When this number changes

A real number replaces `[fill after run]` the moment `python eval.py --embeddings embeddings.npy
--items items.json --report eval-report.md` runs successfully on a host with network access. At that
point case-study §5.9 also gets a one-line update pointing at the populated metric.
