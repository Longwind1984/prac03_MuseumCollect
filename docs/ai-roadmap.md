# AI Service Roadmap — MuseumCollect

> **Purpose**: Show the path from tonight's mock to a production recognition service that actually works in a museum. Every phase has an honest feasibility assessment, data needs, accuracy target, latency target, and cost.
>
> **Audience**: Self + a senior engineer who would ask "what evidence do you have this will hit 0.85 precision?" — answers are in §6 (Evaluation) and §3 (data strategy).
>
> **Owner**: AI Engineer · **Date**: 2026-05-20 · **Version**: 0.1

---

## 0. Executive view (one screen)

```
Phase 0 — Mock (NOW, D0-D4)              JS module, deterministic, 8 demo seeds.
                                          ↓ unblocks Builder, scan.html demo
Phase 1 — CLIP retrieval PoC (D5-D7)     CLIP-ViT-B/32 (zero-shot) + Qdrant.
                                          Target: P@5 ≥ 0.60 on 25-item set.
                                          Cost: ~¥40-80/mo. Latency: < 1.5s.
                                          ↓ proves concept, ships C3 checkpoint
Phase 2 — Hybrid (D8-D14)                CLIP + DINOv2 ensemble + Tencent OCR.
                                          Target: P@5 ≥ 0.80 on 100-item set,
                                          P@5 ≥ 0.85 on labeled-photo set.
                                          Cost: ~¥200-400/mo. Latency: < 2s.
                                          ↓ ships at MVP (C4)
Phase 3 — Fine-tuned (Day 30+)           LoRA-tuned CLIP on user-corrected data,
                                          custom OCR for bronze inscriptions.
                                          Target: P@5 ≥ 0.92 on 500-item set,
                                          P@1 ≥ 0.75. Active learning loop.
                                          Cost: ~¥600-1000/mo. Latency: < 1.5s.
```

The honest TL;DR: **Phase 1 is a Saturday-afternoon thing if you have a GPU; Phase 2 is the real MVP and takes ~5-7 days; Phase 3 is the difference between "demo" and "product" and takes ongoing labeling investment.**

---

## 1. Tech stack (full picture)

| Layer | Choice | Why |
|-------|--------|-----|
| **Service framework** | FastAPI + Uvicorn | Async, auto-OpenAPI, ecosystem |
| **Image model (retrieval)** | CLIP-ViT-B/32 → CLIP-ViT-L/14 → DINOv2-ViT-L/14 (ensemble) | CLIP for semantic, DINOv2 for visual sim |
| **Vector DB** | Qdrant (self-hosted Docker) → Qdrant Cloud | Filtering on metadata + HNSW, OSS |
| **OCR** | Tencent Cloud OCR `general_basic` → Bronze-tuned PaddleOCR | TC for general; Paddle for inscriptions |
| **Object detection (Phase 2.5)** | YOLOv8n (artifact bounding box) | Multi-artifact images, label-vs-artifact distinction |
| **Embedding cache** | Redis | Hot-image dedupe, recent-query cache |
| **NSFW gate** | OpenNSFW2 or Tencent IMS | Required for UGC |
| **Image storage** | Tencent COS / S3 | Cheap, CDN-friendly |
| **Inference compute** | Tencent GN7 (T4 GPU) or AWS g4dn.xlarge | T4 = ~¥0.6/hr; sufficient for ≤ 50 RPS |
| **Monitoring** | Prometheus + Grafana | P50/P95 latency, recall@K, error rate |
| **Eval harness** | Custom Python (sklearn metrics + WandB) | Reproducible, version-tagged runs |

Why **CLIP + DINOv2 ensemble** instead of just one?
- CLIP knows that "青铜鼎" means a specific class of object → great for cross-modal text+image query and broad semantic matching
- DINOv2 is purely visual, trained self-supervised; better for "this exact pattern matches that exact pattern" — critical for bronze artifacts where the texture and proportions are the defining features (饕餮纹 vs 夔龙纹 looks similar to general models)
- Ensemble = weighted sum of normalized similarities; ~5-8% P@5 gain in similar fine-grained retrieval literature (iNaturalist, CARS-196).

Why **Qdrant** not pgvector or Faiss?
- pgvector: fine for < 100k vectors, but metadata filtering (dynasty=商) gets clunky.
- Faiss: blazing fast but no metadata filtering, no persistence story.
- Qdrant: HNSW + payload filtering + REST API + good Python SDK + self-hostable for free + cloud upgrade path. Sweet spot for our 500-5000 item scale.

---

## 2. Phase-by-phase plan

### Phase 0 — Mock (D0-D4, NOW)

**Status**: Tonight (D0). Deliverable: `ai-service/mock-recognition.js`.

**Goal**: Builders can demo `scan.html` without us. UX flows are validated before any model exists.

**Deliverables**:
- [x] `api-contract.md` (spec)
- [x] `mock-recognition.js` (JS module, 8 demo seeds)
- [x] `mock-server-readme.md` (integration guide)

**Feasibility**: 100% — done by D1 morning.

**Cost**: ¥0.

**Risk**: Mock is forward-compatible with real API; if we change contract later, we'd update both. Low risk because contract was designed to match real CLIP retrieval semantics.

---

### Phase 1 — CLIP zero-shot PoC (D5-D7, C3 checkpoint)

**Goal**: Stand up a real `POST /recognize` with CLIP zero-shot retrieval against the 25-item curated catalog. **Prove the concept**, not productionize.

**Architecture**:
```
[scan.html] ─→ FastAPI ─→ preprocess ─→ CLIP-ViT-B/32 ─→ Qdrant search ─→ Top-K
                       ↓ NSFW gate
                       ↓ resize/normalize
```

**Build steps** (estimated **3 dev days** for AI Engineer):
1. **Day 1**: Set up FastAPI skeleton + Docker. Pull `open_clip` (or `transformers` CLIP). Test on 5 reference images.
2. **Day 2**: Build embedding pipeline: for each of 25 artifacts, embed 3-5 reference photos (from Wikimedia Commons) + the artifact's name+description text (concatenated). Push to Qdrant. Implement `POST /recognize`.
3. **Day 3**: Eval harness: test with 25 held-out photos (different angles/light from same artifacts) + 10 negative examples (non-bronzes). Measure P@1, P@5, R@5. Tune similarity threshold for confidence bands.

**Data needs**:
- 25 artifacts × 3-5 reference images = ~100 images. Already have URLs in `data/curated/bronze-treasures-v1.json`. Need to actually download + verify Wikimedia licenses. **Critical path: image acquisition by D5.**
- 25 test photos (different from reference) — we'll need to source these from Google Images / 故宫数字博物院 / fan-shot photos under fair-use review.

**Accuracy targets** (honest):
- P@1 ≥ 0.40 (top hit is correct 40% of time)
- P@5 ≥ 0.60 (correct hit somewhere in top 5)
- R@5 ≥ 0.60
- These are **conservative** — CLIP zero-shot on a 25-class set with clean photos easily hits 0.7+. We're being honest that bronze artifacts are visually similar (many 鼎s look alike), so we expect harder cases to drag us down.

**Latency target**: < 1500ms server-side.
- CLIP-ViT-B/32 inference: ~80ms on T4 GPU, ~400ms CPU
- Qdrant search over 100 vectors: < 5ms
- Image preprocess + network: 200-500ms
- Total: well under target on GPU; CPU-only is borderline.

**Cost estimate**:
- Tencent GN7 (T4): ¥0.6/hr × 24 × 30 = ¥432/mo at 100% util.
- At demo / dev scale (10% util): **~¥40-80/mo**.
- Or: rent a Cloud Run / spot instance: ~¥20/mo for dev.
- Qdrant: free self-hosted on existing VM.
- Image storage: ~¥5/mo for 100 images on COS.

**Risks & mitigations**:
- **R1: CLIP confuses similar 鼎s** (后母戊 vs 子龙 vs 大盂). **M**: That's actually OK because we return Top-K with confidence reasons; user picks. Phase 2 ensemble + Phase 3 fine-tuning addresses this.
- **R2: Wikimedia images don't represent real museum-visitor photos** (lighting, angle, glass reflections). **M**: Acknowledge; budget for Phase 2 data collection of real-context photos.
- **R3: 25 items is too few to evaluate confidently**. **M**: Add 25-50 distractor items from MET/Smithsonian open APIs to make eval set richer.

**Deliverables**:
- `ai-service/main.py` (FastAPI app)
- `ai-service/Dockerfile`
- `ai-service/scripts/embed_catalog.py` (run-once script)
- `ai-service/eval/eval_report.md` (precision/recall on 25-item set)

**Definition of done**: Hits `POST /recognize` with a real photo, gets back ranked candidates including the right one in top-5 ≥ 60% of the time. Latency < 2s P95.

---

### Phase 2 — Hybrid (CLIP + DINOv2 + OCR) — MVP (D8-D14, C4 checkpoint)

**Goal**: Production-quality recognition with three parallel paths. Ships at the C4 MVP checkpoint with 500 artifacts in the catalog (not just 25).

**Architecture additions**:
```
[scan.html] ─→ FastAPI ─→ NSFW gate ─→ mode router
                                       ├─ image path:
                                       │    YOLOv8 crop → CLIP embed + DINOv2 embed
                                       │    ↓
                                       │    Qdrant search (2 collections, ensemble re-rank)
                                       │    ↓
                                       │    dim filter (if dynasty/museum hint)
                                       │
                                       ├─ label path:
                                       │    YOLOv8 detect label → Tencent OCR
                                       │    ↓
                                       │    parse → catalog text search
                                       │
                                       └─ hybrid: run both, merge by max-confidence

                                       → Top-K with match_method + match_reasons
```

**Build steps** (estimated **5-7 dev days**):
1. **Catalog expansion** (Data Engineer task, but blocks AI): 500 artifacts (was 25). Each with 3-5 reference images. ~2000 images total.
2. **DINOv2 integration**: Same pipeline, second collection in Qdrant.
3. **Ensemble re-ranker**: weighted-sum or RRF (reciprocal rank fusion). Tune weights on validation set.
4. **OCR integration**: Tencent Cloud OCR client. Build the label-text → artifact matcher with fuzzy match (Levenshtein on name + dynasty regex + museum keyword).
5. **YOLO label detector**: small custom model (or use a pretrained text-region detector like CRAFT). Or skip this — when in label mode just OCR the whole image.
6. **Dim filter**: If `dimension_hint` provided, filter Qdrant payload before similarity search.
7. **Match reasons generation**: rule-based — compare top candidate's dimensional metadata (type, patterns, dynasty) with extracted features (mode determined; pattern detection is harder, skip for v0). Output 2-3 reason strings.
8. **NSFW**: integrate OpenNSFW2 or Tencent IMS API.
9. **Eval expansion**: 100-photo labeled test set including museum visitor photos (collected during D5-D10).

**Data needs**:
- 500 artifacts × 3-5 images = 1500-2500 reference images. **Critical path**.
- 100-photo labeled test set (held out, never used for embedding). Includes real museum-visitor photos for realism.
- Dimension labels: each artifact in catalog must have type/dynasty/patterns/museum fields populated (already in `bronze-treasures-v1.json`).

**Accuracy targets** (honest, more granular):
- P@1 ≥ 0.65 (clean photos), P@1 ≥ 0.45 (real visitor photos with reflections/angles)
- P@5 ≥ 0.85 (clean), P@5 ≥ 0.75 (visitor) ← MVP gate
- OCR-based label match: P@1 ≥ 0.90 (when OCR succeeds on the label)
- NSFW false-positive rate: < 0.5% on bronze photos
- Distractor rejection: 95% of non-bronze photos correctly trigger `no_match` or `not_a_bronze` error

**Latency target**: < 2000ms P95.
- CLIP + DINOv2 inference parallel: max(80ms, 90ms) = 90ms on T4
- Qdrant 2-collection search: ~10ms
- Tencent OCR (only if mode=label): 300-600ms
- NSFW: 50ms
- Total: 500-1500ms server-side for object mode; 800-2000ms for hybrid.

**Cost estimate**:
- GPU (T4 dedicated): ¥0.6/hr × 24 × 30 = ¥432/mo
- Qdrant Cloud (managed, 500K vectors): ~¥100/mo or self-hosted ¥0
- Tencent OCR: ¥3.45/1000 calls (general_basic). At 5000 OCR calls/mo (~30/day): ~¥17/mo. Reasonable budget cap: ¥100/mo.
- Tencent COS: ~¥20/mo for 2500 images
- NSFW (if using Tencent IMS): ~¥2/1000 calls = ~¥10/mo
- **Total: ~¥250-450/mo** for MVP-scale traffic. Scales mostly with GPU util.

**Risks & mitigations**:
- **R1: Visitor photos are much harder than Wikimedia photos** (glass glare, partial occlusion, mixed background, multiple artifacts). **M**: Phase 2.5 adds YOLO bbox crop to remove background; Phase 3 adds training data from this exact distribution.
- **R2: OCR fails on Chinese museum labels with rare characters / vertical layout / ornate fonts**. **M**: Tencent OCR's `general_accurate_basic` (higher tier) for tough cases. Cap budget.
- **R3: 500 artifacts requires significant data labeling work**. **M**: Data Engineer owns this; ramp up gradually (50 → 100 → 250 → 500). Don't block AI on full 500.
- **R4: Inference cost on 24/7 GPU**. **M**: Use serverless GPU (Modal/Banana/Tencent SCF GPU) for < 100 req/day; switch to dedicated when usage justifies.

**Deliverables**:
- `ai-service/main.py` v2 (FastAPI with all 3 paths)
- `ai-service/models/ensemble.py` (CLIP + DINOv2 weighted re-rank)
- `ai-service/ocr/tencent_client.py`
- `ai-service/ocr/parser.py` (OCR text → fielded data)
- `ai-service/eval/eval_report_v2.md` (100-photo set, broken down by photo quality)
- `ai-service/scripts/embed_catalog_500.py`

**Definition of done**: 100-photo eval shows P@5 ≥ 0.80 overall, ≥ 0.85 on clean subset, with full hybrid (image + OCR fallback) working end-to-end at < 2s P95.

---

### Phase 3 — Fine-tuned production (Day 30+, post-launch)

**Goal**: Move from "good general model" to "best-in-class for bronze artifacts" via fine-tuning on user-corrected data.

**Architecture additions**:
```
+ LoRA-fine-tuned CLIP (trained on user feedback corrections)
+ Bronze-tuned PaddleOCR (custom dataset of inscription rubbings + label fonts)
+ Active learning loop: low-conf predictions → human review → retrain monthly
+ Model registry (MLflow or WandB Models) with A/B routing
```

**Build steps**:
1. **Active learning harness**: log low-conf predictions + user corrections → labeled dataset accumulates.
2. **LoRA fine-tune** on accumulated dataset (target ≥ 2000 labeled query→artifact pairs). Train weekly/biweekly.
3. **A/B routing**: 10% traffic on new model, monitor P@5; promote if Δ > 2%.
4. **PaddleOCR fine-tune**: collect 500+ museum-label photos with ground-truth transcription. Fine-tune on this. Specifically improves inscription OCR (bronze script characters are very rare in general OCR training).
5. **Pattern recognition (stretch)**: train a multi-label classifier for 饕餮纹 / 夔龙纹 / 凤鸟纹 etc. on cropped pattern regions. Powers the "pattern-tree" gamification.

**Data needs**:
- 2000+ user-corrected (query, correct_artifact_id) pairs. Realistically takes 3-6 months of organic user activity, or 2-4 weeks with a labeled data sprint (Mechanical Turk equivalent: ¥1.5/label × 2000 = ¥3000).
- 500 labeled museum-label photos for OCR tuning.
- 200+ pattern-region crops for pattern classifier (if pursued).

**Accuracy targets**:
- P@1 ≥ 0.75 (clean), P@1 ≥ 0.60 (visitor)
- P@5 ≥ 0.92 (clean), P@5 ≥ 0.85 (visitor) ← Production gate
- Inscription OCR character accuracy ≥ 0.85 (vs ~0.60 for general OCR on bronze script)
- Pattern classification top-3 accuracy ≥ 0.80

**Latency**: same or better (fine-tuned LoRA same inference cost).

**Cost estimate**:
- GPU (likely upgrading to A10 / L4 for higher throughput): ¥1.5-3.0/hr × 24 × 30 = ¥1100-2200/mo at 100% util.
- Realistic monthly with autoscale: ~¥400-800/mo.
- Training compute (weekly LoRA): ~¥200-400/mo
- Active learning labeling: ~¥200-1000/mo (depends on volume)
- OCR / NSFW / storage: ~¥100-200/mo
- **Total: ~¥800-2000/mo** at production scale.

**Risks**:
- **R1: Active learning loop has chicken-and-egg** — need users to label, but users need product to come. **M**: Bootstrap with internal labeling (us) for first 200 corrections; then user feedback takes over.
- **R2: Fine-tuning can hurt rare-class precision** (catastrophic forgetting). **M**: Standard ML hygiene — keep eval set frozen, monitor per-class metrics, regularize.
- **R3: Drift from training data distribution to user-photo distribution**. **M**: Re-eval monthly on a fresh sample.

**Deliverables**: ongoing. Quarterly model updates with eval reports.

---

## 3. Data strategy (cross-cutting)

This is the most under-discussed lever in AI products. Spelling it out:

### 3.1 Three image tiers

| Tier | Source | Use | Risk |
|------|--------|-----|------|
| **Reference** | Wikimedia Commons, MET API, museum digital collections | Embedding index (the "answer set") | Clean, biased toward studio shots |
| **Test (clean)** | Held-out Wikimedia, NPM Taipei, Smithsonian | Eval — best-case accuracy | Same distribution as reference |
| **Test (visitor)** | Real museum-visitor photos (Xiaohongshu, RedNote, B站 frames, friends' photos) | Eval — real-world accuracy | The distribution we actually serve. Must be ≥ 30 photos per artifact for stable metrics. |

**Critical insight**: Almost all open-source recognition demos benchmark on Tier 1+2, then fail in production because users only ever shoot in Tier 3 conditions. We instrument Tier 3 eval from Phase 1.

### 3.2 Licensing posture

- **Wikimedia Commons**: ✅ CC-BY-SA preferred. Verify per-file. Already documented in `data/raw/sources.md`.
- **Museum official**: ⚠️ usually copyrighted. Use for **internal reference** (not displayed to users), or contact museum for permission, or use only for embedding (not display).
- **User photos (Tier 3 collection)**: ⚠️ scrape with attribution + fair-use claim; or commission a labeling sprint (paid contributors); or solicit from users via in-app "贡献你的照片" feature with explicit consent.
- **Self-shot**: ✅ Best. Take a weekend to visit 国博 / 上博 with a phone — you get 100s of realistic photos.

### 3.3 Annotation schema

Each photo entry:
```json
{
  "photo_id": "uuid",
  "artifact_id": "houmuwu_ding",   // ground truth
  "tier": "reference" | "test_clean" | "test_visitor",
  "source": "wikimedia" | "self_shot" | "user_submitted",
  "license": "CC-BY-SA-4.0" | "fair_use" | "user_consent",
  "context": "studio" | "museum_glass" | "museum_open" | "label_only",
  "quality_tags": ["clean_background", "partial_label_visible", "reflection", "low_light"],
  "url_or_path": "..."
}
```

This metadata lets us slice eval metrics by context (P@5 on `museum_glass` photos specifically).

---

## 4. Inference latency budget (detailed)

For Phase 2 production target of < 2000ms P95:

| Component | Budget (P95) | Notes |
|-----------|--------------|-------|
| Network in (5MB upload) | 200ms | China mainland, 4G typical |
| NSFW gate | 50ms | OpenNSFW2 on CPU, or batched API call |
| Preprocess (resize/normalize) | 50ms | PIL/cv2, CPU |
| CLIP embedding | 100ms | T4 GPU, batch=1 (no batch in serving) |
| DINOv2 embedding (parallel) | 100ms | T4 GPU, parallel to CLIP |
| Qdrant search (×2 collections) | 30ms | HNSW, m=16, ef=64 |
| Ensemble re-rank + filter | 5ms | In-memory |
| OCR call (if label mode, parallel) | 600ms | Tencent Cloud round-trip |
| Match reason generation | 10ms | Rule-based |
| Response serialization + send | 50ms | JSON |
| **Total (object mode)** | ~600ms | Comfortable under target |
| **Total (label mode)** | ~1200ms | Still comfortable |
| **Total (hybrid)** | ~1500ms | Where most variability is |
| Safety margin (cold start, GC) | 500ms | Allotted |
| **P95 ceiling** | **2000ms** | Aligned with spec |

If we miss this — what we'd cut first: DINOv2 (saves 100ms), drop the parallel OCR (saves 600ms when label mode wasn't needed), use a smaller CLIP variant (ViT-B/32 vs L/14).

---

## 5. Cost projection (full lifecycle)

| Phase | Compute | Storage | OCR | Other | **Total/mo** |
|-------|---------|---------|-----|-------|--------------|
| Phase 0 (mock) | 0 | 0 | 0 | 0 | **¥0** |
| Phase 1 (PoC) | ¥40-80 (dev GPU) | ¥5 | 0 | 0 | **¥50-100** |
| Phase 2 (MVP) | ¥250-450 (GPU 24/7) | ¥20 | ¥30-100 | ¥50 monitoring | **¥350-600** |
| Phase 3 (production, 10k MAU) | ¥400-800 (autoscale GPU) | ¥50 | ¥100-300 | ¥200 (eval/training/labeling) | **¥800-1500** |
| Phase 3 (production, 100k MAU) | ¥2000-4000 | ¥200 | ¥500-1500 | ¥500 | **¥3000-6500** |

At 100k MAU we'd revisit: switch to spot GPU instances, run our own OCR (PaddleOCR), introduce embedding cache for repeat queries → likely 30-40% cost reduction.

**Cost per recognition** (Phase 2):
- Fixed: ~¥200/mo (GPU base) / 30000 reqs/mo = ¥0.007/req
- Variable: ~¥0.003/req (OCR avg) + ~¥0.001/req (NSFW) = ¥0.004/req
- **Total: ~¥0.011/recognition** — viable even at free-tier user scale.

---

## 6. Evaluation methodology

### 6.1 Metrics

| Metric | Formula | Why |
|--------|---------|-----|
| **Precision@K** | `|relevant ∩ top-K| / K` (averaged) | Is the right answer in our top-K? Direct UX correlate. |
| **Recall@K** | `|relevant ∩ top-K| / |relevant|` | For artifacts with 1 ground truth = same as P@K, but we use it for multi-correct cases (e.g. "this could be 莲鹤方壶 #1 or #2 since they're a pair"). |
| **MRR (Mean Reciprocal Rank)** | `mean(1 / rank_of_correct)` | Penalizes correct-but-low-ranked more than P@K. |
| **NDCG@5** | Discounted gain | If we expose confidence as ordering, NDCG validates the ordering itself. |
| **Confidence calibration (ECE)** | Expected Calibration Error | When we say "94% confident" — is it actually right 94% of the time? Critical for honest UX. |
| **NSFW FPR** | False positives on bronze test set | Production blocker if too high. |
| **Distractor rejection rate** | % of non-bronzes correctly returning `no_match` | Tests the safety net. |

### 6.2 Evaluation cadence

| Cadence | Action |
|---------|--------|
| Per-PR (every model code change) | Run Phase 1 (25-item) eval; CI blocks if P@5 drops > 3% from baseline. |
| Per-model-update (LoRA training run) | Full 100-item Phase 2 eval; document in `eval/eval_report_<date>.md`. |
| Monthly | Refresh visitor-photo test set with 20 new samples (drift detection). |
| Quarterly | Full benchmark vs competitor APIs (Google Vision, Baidu OCR, Alibaba Cloud) on same test set. |

### 6.3 Eval report template

```
# Eval Report YYYY-MM-DD — model: clip-vit-b32-ft-bronze-v0.X

## Test set
- N artifacts: 100
- N photos: 387 (avg 3.87 per artifact)
- Tiers: 120 reference, 130 clean, 137 visitor

## Headline metrics
- P@1: 0.XX (clean), 0.XX (visitor)
- P@5: 0.XX (clean), 0.XX (visitor)
- MRR: 0.XX
- ECE: 0.XX (calibration)

## Breakdown by dynasty
[table: dynasty x P@5]

## Breakdown by artifact type
[table]

## Failure mode analysis
- N failures sampled; top categories of mistake; example image links.

## Comparison vs previous version
[Δ table]

## Recommendation
[ship / hold / investigate]
```

Every model version produces this. It's the proof of progress.

---

## 7. Risk register (top 8)

| # | Risk | Severity | Likelihood | Mitigation |
|---|------|----------|-----------|-----------|
| 1 | Visitor photos (Tier 3) precision is way worse than Tier 1/2 — we ship with overconfident metrics | High | High | Tier-segmented eval from Phase 1. Don't ship MVP on Tier 2 numbers alone. |
| 2 | Wikimedia/museum image licenses ambiguous; have to take down corpus | High | Medium | Conservative license filter at ingest; documented in `licensing-log.md`. |
| 3 | Real museums often have glass + reflections; CLIP doesn't generalize well | Medium | High | Phase 2: glare-aware preprocessing; Phase 3: fine-tune on glass-photo data. |
| 4 | GPU cost balloons with user growth | Medium | Medium | Cache embeddings for hot artifacts; serverless GPU for spiky traffic; explore Tencent SCF GPU. |
| 5 | OCR fails on archaic bronze script (金文) — relevant for inscription-based search | Medium | High (in scope) | Phase 3 custom PaddleOCR; or partner with academic 金文 OCR projects (e.g. 殷周金文集成 + ML). |
| 6 | NSFW model false-positives on bronze artifacts (boobs-of-a-ding artifact?) | Low | Low | Test specifically; tune threshold. |
| 7 | Demo-day inference fails on stage (latency spike, server crash) | High | Medium | Always have mock as fallback; pre-warm GPU; pin a known-good model version. |
| 8 | Catalog drift (artifact_ids change, embeddings stale) | Medium | Medium | Embedding refresh pipeline tied to catalog version; old IDs aliased. |

---

## 8. Open architectural questions (for D5 / C3 checkpoint discussion)

1. **Hosted vs self-hosted Qdrant?** Self-hosted saves money but ops burden. Recommendation: self-host on existing VM until > 100k vectors, then evaluate.
2. **Where does YOLO bounding-box detection fit?** It's a "phase 2.5" but might bump to phase 2 if visitor photos prove unmanageable without it.
3. **Do we need separate models for "object" mode vs "label" mode, or can a single multimodal model do both?** Probably separate (CLIP for object, OCR for text); fusion later. Revisit at C3.
4. **Pattern recognition (the "纹路演化树" feature) — is that AI Engineer's scope or domain researcher's curation?** Suggest: curated tagging in catalog (Phase 1-2); AI classifier as Phase 3 stretch.
5. **Closed-set (only 500 known artifacts) vs open-set recognition (any bronze artifact, including ones not in catalog)?** Tonight: closed-set. Phase 3 stretch: add a "this looks like a 鼎 but I don't recognize this specific one" mode.

---

## 9. Phase gates (Definition of Done per phase)

| Phase | Ships when... |
|-------|--------------|
| Phase 0 | Builder integrates `mock-recognition.js` in `scan.html` without help. Mock returns 4 distinct demo scenarios cleanly. |
| Phase 1 (C3) | P@5 ≥ 0.60 on 25-item set. Latency < 2s P95. Live `POST /recognize` endpoint reachable by Builder. |
| Phase 2 (C4) | P@5 ≥ 0.80 on 100-item set (mixed tiers). All 3 paths (object/label/search) wired. NSFW gate in place. Latency < 2s P95. Eval report published. |
| Phase 3 (post-launch) | P@5 ≥ 0.92 (clean) / ≥ 0.85 (visitor) sustained over 30 days. Active learning loop producing weekly retrains. Per-tier breakdown stable. |

---

## 10. Why this is a credible plan (not hand-waving)

1. **Numbers grounded**: CLIP ViT-B/32 zero-shot P@5 on similar fine-grained tasks (CUB-200, FGVC-Aircraft) is published 0.55-0.75. We're projecting 0.60 for our zero-shot baseline — reasonable.
2. **Cost grounded**: Tencent GN7 pricing real (¥0.62/hr T4 spot). Tencent OCR pricing real (¥3.45/1000 calls). Numbers match their pricing page.
3. **Latency grounded**: CLIP ViT-B/32 single-image inference benchmarks at 50-100ms on T4 (Hugging Face benchmarks). Qdrant HNSW < 5ms for ≤10k vectors is well documented.
4. **Eval methodology is the actual one used in modern retrieval literature** (P@K, MRR, NDCG, ECE for calibration) — not invented.
5. **Phasing is conservative**: each phase has a clear gate, and earlier phases don't depend on the success of later ones. If Phase 3 doesn't pan out, Phase 2 is still a shippable product.
6. **The hard parts are called out**: visitor-photo distribution gap, OCR on bronze script, license risk, GPU cost at scale. We name them, not paper over them.

---

## 11. Appendix: links to deeper reading

- CLIP paper: https://arxiv.org/abs/2103.00020
- DINOv2 paper: https://arxiv.org/abs/2304.07193
- Qdrant docs: https://qdrant.tech/documentation/
- Tencent Cloud OCR: https://cloud.tencent.com/document/product/866/33526
- Fine-grained retrieval benchmarks (CUB-200): https://www.vision.caltech.edu/visipedia/CUB-200.html
- LoRA fine-tuning CLIP: https://arxiv.org/abs/2210.09465 (relevant)
- Active learning for retrieval: standard ML curriculum

---

**Owner**: AI Engineer · **Last updated**: 2026-05-20 · **Next review**: C3 (D5 morning)
**Version**: 0.1 — first cut after PRD / dimensional-map ingestion
