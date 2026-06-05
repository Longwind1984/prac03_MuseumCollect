# ai-service/poc — CLIP retrieval proof-of-concept

> Production-shaped reference implementation of `ai-roadmap.md` §Phase 1 Day 1-3.
> **Status: stub — code is real, has NOT been end-to-end executed in this repo's CI environment.**
> See `eval-report.md` for the explanation and the runbook to populate real numbers.

## What this is

The MuseumCollect roadmap (`docs/ai-roadmap.md`) commits to a phased CLIP/DINOv2 retrieval system. Phase 1 specifies:

- Target: P@1 ≥ 0.40, P@5 ≥ 0.60 on a 25-photo held-out test set
- Stack: OpenCLIP ViT-B/32 (CC-licensed weights), cosine retrieval over precomputed embeddings, no fine-tuning
- Index: top-25 国宝 + 一级 artifacts from `data/curated/bronze-treasures-v3-segment-{1..5}.json`

This directory implements that Phase 1 stack as runnable Python. Four scripts + two markdown:

| File | Purpose |
|---|---|
| `requirements.txt` | Pin: torch 2.x, open_clip_torch 2.32, pillow, numpy, scikit-learn, requests |
| `build_index.py` | Read 5 segment JSONs → pick top-25 by rarity → fetch `image_urls[0].direct_url` → CLIP encode → write `embeddings.npy` + `items.json` |
| `eval.py` | Leave-one-out retrieval over embeddings.npy, compute P@1/P@5 (+ dynasty breakdown), write `eval-report.md` headline numbers |
| `cli.py` | `python cli.py <image>` → top-5 (id, name, dynasty, cosine_distance, confidence_band) |
| `IMPLEMENTATION-NOTES.md` | Architecture decisions + walkthrough — readable WITHOUT running the code |
| `eval-report.md` | §6.3 template, headline numbers `[fill after run]` |

## Why no real numbers in this repo

This PoC was scoped during a Claude Code sandbox session whose outbound network policy blocks:

- `huggingface.co` (OpenCLIP weight host)
- `upload.wikimedia.org` (Wikimedia thumbnail CDN — the source of 239/277 artifact images)
- `openaipublic.azureedge.net` (legacy OpenAI CLIP weight host)
- `download.pytorch.org`

Without weights + image sources reachable, `build_index.py` can't run end-to-end inside the sandbox. The PM judgment was: **publishing a fake P@5 = 0.55 from a toy 5-item demo would be worse than publishing real production-shaped code with honest empty placeholders** — because the audit-as-trigger discipline the rest of this project documents would be violated. See case-study §5.9.

## How to populate real numbers (off-sandbox run)

Prerequisites: a host where `huggingface.co` and `upload.wikimedia.org` are reachable, Python 3.11+, ~2 GB free disk for torch + OpenCLIP weights + ~50 image cache, CPU is fine (~2-5 min total run).

```bash
cd ai-service/poc
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Step 1: fetch images, encode, save embeddings (~2 min)
python build_index.py \
  --segments ../../data/curated \
  --top-k 25 \
  --rarity 国宝,一级 \
  --out-embeddings embeddings.npy \
  --out-items items.json \
  --image-cache cache/

# Step 2: leave-one-out eval, write headline numbers (~30 sec)
python eval.py \
  --embeddings embeddings.npy \
  --items items.json \
  --report eval-report.md

# Step 3: smoke test — recognize one image
python cli.py cache/houmuwu_ding.jpg
```

Then `git add embeddings.npy items.json eval-report.md && git commit -m "ai-service: populate PoC numbers"` and push. case-study §5.9 will auto-reference the populated metrics.

## Honest tradeoffs (these will hit you when you run it)

1. **25-item is the Phase-1 floor, not a meaningful benchmark.** A real retrieval system on 277 items will have very different P@5. Treat this as proof-of-life, not proof-of-product.

2. **Wikimedia thumbnails are 1200px studio shots — NOT visitor photos.** The roadmap §6.3 Tier-3 (visitor camera, mixed lighting, glare on glass cases) is where the model will fail hardest. This PoC doesn't test that.

3. **Single image per artifact = no within-artifact variation** for leave-one-out. The honest eval needs ≥2 angles per artifact; current `image_urls` field usually has 1. Future bootstrap: scrape Tier-2 (museum-page detail shots) for 5-10 priority artifacts before extrapolating.

4. **Cosine distance ≠ confidence.** The `confidence_band` mapping in `cli.py` is a heuristic, not calibrated. Per `ai-service/api-contract.md` §3.1, real production needs temperature-scaled softmax + per-class threshold calibration on a held-out set. Out of scope for Phase 1.

## In-sandbox baseline that DID run — pHash on 12 silhouettes

`phash_baseline.py` is the fallback that **actually ran in the Claude Code sandbox**
where HuggingFace + Wikimedia are blocked. It uses 100% local data
(`assets/silhouettes/*.svg`) and zero ML weights (pure-python perceptual hash).

```bash
pip install cairosvg imagehash pillow numpy
cd ai-service/poc
python phash_baseline.py
```

Result (`phash-eval-report.md`, real numbers, not template):

| Metric | Value |
|---|---|
| Items total | 12 silhouettes |
| Items scorable | 6 (3 two-member families: ding / zun / sanxingdui) |
| Intra-family P@1 | **0.333** |
| Intra-family P@5 | **0.667** |

Honest reading: pHash is a shape-pixel-overlap baseline, not semantic retrieval.
P@1 = 0.33 means 2 of 6 family pairs were correctly matched as nearest neighbor
(fangding → yuanding ✓, fang_zun → xiao_zun ✓; sanxingdui_dali_ren → some other zun ✗).
**CLIP must beat this number to be worth deploying.** That's the entire point of
running a baseline.

## Verification without running the full pipeline

`test_eval.py` covers the retrieval-math layer with stdlib unittest + numpy only
(no torch / HF required). Synthetic 6-item / 2-dynasty / clustered-by-dynasty
index proves:

- `cosine_topk` ranks correctly + truncates to k + finds self at top-1
- `evaluate` reports P@1 = 0 under leave-one-out + 1-image-per-id (documented
  degeneration, not a bug)
- `evaluate` reports intra-class P@1 ≈ 1.0 when synthetic data clusters
  cleanly by dynasty
- Per-dynasty breakdown sums to total
- Edge cases (empty corpus, k > N-1) handled

```bash
pip install numpy   # only dep needed for tests
cd ai-service/poc
python -m unittest test_eval.py -v   # 10 tests, ~12ms
```

This is the AI-eval rigor `qa/tests/` doesn't cover (qa/ is all HTML-page tests).

## See also

- `docs/ai-roadmap.md` §6 — full eval methodology this PoC implements
- `ai-service/api-contract.md` — production API the PoC's CLI would back
- `audits/bug-log.md` — see entry on `mock-recognition.js` dead code
- case-study `docs/case-study.md` §5.9 — why the PoC ships as stub
