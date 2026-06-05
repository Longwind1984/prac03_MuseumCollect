# Implementation Notes — CLIP PoC

> Architecture decisions + code walkthrough for readers who want the design without running it.
> Companion to `README.md` (which is for runners) and `eval-report.md` (which is for results).

## 1. Why OpenCLIP ViT-B/32 specifically

Phase 1 (per `docs/ai-roadmap.md` §6) explicitly de-scopes fine-tuning. Three constraints drove the model choice:

| Constraint | Implication |
|---|---|
| CPU-runnable for PoC | ViT-B/32 = 86M params, ~50ms/image on CPU. ViT-L/14 (~300M) would be 3× slower. |
| Weight licensing must be permissive | `openai` pretrained = MIT-licensed; `laion2b_s34b_b79k` is also CC0-adjacent. Avoid `metaclip_*` (commercial restriction risk for portfolio). |
| Bronze artifacts are visually dense | 32-patch resolution is sufficient for form-level retrieval (鼎 vs 簋 vs 尊). For pattern-level (饕餮 vs 夔龙) we'd want larger patches — but that's Phase 2. |

**Not chosen, with reason**: DINOv2 — superior pure-visual embedding but Phase 2's hybrid (CLIP for global semantics + DINOv2 for fine-grained form) makes more sense than swapping CLIP out for DINOv2 alone. Architectural decision per `docs/ai-roadmap.md` §3.

## 2. Why L2-normalize embeddings (`build_index.py:84`)

After normalization, cosine similarity reduces to dot product (`corpus @ query` in `eval.py:18`). This is ~2× faster than computing cosine each query, important for the leave-one-out eval which does N queries against N-1 corpus. Cost: small numerical precision loss on the unit sphere, negligible at ViT-B/32 scale.

## 3. Why leave-one-out instead of held-out test set

The roadmap §6.3 specifies "25 held-out photos of the SAME artifacts at different angles". That requires ≥2 images per artifact. Our `data/curated/` has `image_urls: [{direct_url: ...}]` with one URL per artifact for ~239/277 records (per `data/photo-fetch-report.md`).

So Phase 1 PoC, with what's actually on disk, can only do leave-one-out — which **degenerates** when each artifact has 1 image (the held-out item's id is by definition not in the remaining index). That's why `eval.py` reports both:

- **P@1 / P@5**: strict id match. With 1 image/artifact, these will be **near zero by construction** — that's expected, not a bug.
- **Intra-class P@1**: did the model return a same-dynasty neighbor as nearest? This *is* meaningful: it tests whether CLIP's image embedding encodes dynasty-level visual structure.

Honest characterization of the eval: it's measuring "does CLIP cluster bronze artifacts by dynasty, given 25 single-image points?" Not "can CLIP recognize this specific 鼎." That gap is closed in Phase 2 with bootstrapped Tier-2 multi-angle photography (`README.md` Tradeoff 3).

## 4. Why pick top-25 by rarity (`build_index.py:55`)

Three competing selection strategies were considered:

| Strategy | Pro | Con |
|---|---|---|
| Top-25 by rarity (国宝 + 一级) | Each item is well-photographed in Wikimedia; cleaner data | Skewed toward late Shang / early Western Zhou (where 国宝 cluster) |
| Stratified by dynasty (5 per dynasty) | Tests dynasty-coverage hypothesis directly | Many lesser-known artifacts have line-drawings, not photos → garbage embeddings |
| Random 25 from 277 | Closest to production use | Random sample's metrics are noisy |

Rarity-first won because **data quality dominates everything else at 25 items**. The dynasty skew is documented explicitly in `eval-report.md`'s per-dynasty table so a reader can see the distribution.

## 5. Why precomputed `embeddings.npy` instead of in-browser CLIP

Three options for serving the PoC in `scan.html`:

| Option | Pros | Cons | Decision |
|---|---|---|---|
| In-browser CLIP via tensorflow.js | Real-time, no server | 50-100 MB JS bundle, WebGL flaky on mobile, ~3× slower than CPU | **No.** Demo budget = 0 added MB. |
| Precomputed top-5-by-seed JSON | Tiny (~5 KB), drops behind existing `demoScan(id)` | Limited to seed artifacts, no true upload | **Yes for Phase 1** if we wired it. |
| Server-side `/recognize` endpoint | Production-shaped, real CLIP | Needs FastAPI deployment, weights on host | Phase 2 milestone. |

The PoC stub doesn't actually wire to `scan.html` (per case-study §5.9 reasoning) — the production path is option 3, and option 2 would be a one-off port. We document the design without locking it in.

## 6. What `cli.py` does that's load-bearing for the AI PM story

`cli.py` is the single file that proves the architecture closes end-to-end. It takes a real image path, runs the same `model.encode_image` as `build_index.py`, computes cosine against the precomputed corpus, and emits `(id, name, dynasty, cos_dist, confidence_band)` — which is **exactly the response shape** in `ai-service/api-contract.md §3.1`.

Confidence band mapping is **uncalibrated heuristic**. For production, the bands would come from a held-out calibration set (Tier 1 + Tier 2 + Tier 3 mixed) with thresholds tuned to hit per-band FPR targets. The fact that this PoC ships an honest heuristic + a comment pointing to the calibration question is more valuable to a recruiter than a fake calibrated number — see case-study §5.9.

## 7. What this PoC does NOT do (and why each omission is intentional)

1. **No fine-tuning.** ai-roadmap.md Phase 3 commits to LoRA on bronze-specific data. PoC is zero-shot. Reason: zero-shot CLIP baseline is the only meaningful number to publish before Phase 3 work begins. Fine-tuning before establishing baseline is a Goodhart trap.

2. **No OCR.** Phase 2 §2 plans Tencent OCR for label-photo flows. PoC is image-retrieval only. Reason: OCR is a separate service with its own eval methodology; mixing the two confounds the result.

3. **No negative examples (`no_match`).** Roadmap §6.3 requires 10 negatives (non-bronze photos that should return `no_match` band). PoC doesn't synthesize them. Reason: distribution-correct negatives require curation effort (decoy images from porcelain/jade/coins); deferred to Phase 1 Day 4-5.

4. **No multi-query batching.** `cli.py` does 1-image-at-a-time. Reason: 50ms latency is fine for demo. Production `/recognize` endpoint would batch 8-16 concurrent.

5. **No Qdrant.** ai-roadmap.md Phase 2 calls for Qdrant vector DB. PoC uses raw `corpus @ query` — at 25-1000 items this is faster than network round-trip to Qdrant. Reason: Phase 1 doesn't need it, and adding it just to look professional would be cargo-culting.

## 8. How a reader can verify each of the above without running it

- §1 ViT-B/32 choice → `requirements.txt` pin, `build_index.py:147`
- §2 L2-norm → `build_index.py:84-85`
- §3 leave-one-out → `eval.py:35-45`
- §4 rarity selection → `build_index.py:55-58`
- §5 design decision matrix → this doc; no code yet
- §6 cli.py contract → `cli.py:48-52` matches `ai-service/api-contract.md §3.1`
- §7 omissions → grep `cli.py` for "no fine-tune"; verify no `qdrant` import anywhere

The case-study §5.9 references this file as evidence that the PoC architecture is well-considered, even if the numbers aren't published yet.
