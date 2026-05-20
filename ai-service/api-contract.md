# MuseumCollect AI Service — API Contract (v0.1)

> **Status**: Mock contract for D0/D1 demo night. Tonight Builders integrate against a JS mock; real service ships post-MVP (see `docs/ai-roadmap.md`).
>
> **Audience**: Builder A/B/C (`scan.html`), future mini-program client, integration partners.
>
> **Owner**: AI Engineer agent · **Date**: 2026-05-20

---

## 0. Design philosophy (read before integrating)

1. **Recognition is 3 parallel paths, not 1.** Image retrieval (CLIP/DINOv2) + label OCR + catalog text search. The client always shows fallback paths if the primary fails.
2. **Top-K candidates, not Top-1.** A museum visitor wants to confirm/correct, not blindly trust. Always return up to 5 ranked candidates with confidence + reason (`match_method`).
3. **Confidence is for humans, not gates.** The server doesn't refuse to answer below a threshold; it labels the response `confidence_band` (`high` / `medium` / `low` / `no_match`) so the client can render appropriately ("我们觉得是X" vs "可能是这3件之一" vs "没匹配到,试试搜索").
4. **All AI is server-side.** Mini-program / H5 client uploads image; server runs embedding + retrieval. No on-device inference.
5. **Latency budget**: P50 < 1.2s, P95 < 2.5s, hard ceiling 5s (timeout → fallback to text search UI).
6. **Mock determinism**: For demo reproducibility, the mock accepts a `demo_seed` param that pins the result. Builders use this to script demo flows.

---

## 1. Base URL & versioning

```
Production base:  https://api.museumcollect.cn/v1
Staging base:     https://api-staging.museumcollect.cn/v1
Mock base:        (none — see mock-server-readme.md, tonight is JS-side mock)
```

All endpoints versioned via path. Backwards-incompatible changes bump to `/v2`.

---

## 2. Authentication (post-MVP)

Tonight: no auth (mock). Post-MVP: bearer token from mini-program login.

```
Authorization: Bearer <jwt-token>
```

Tokens expire 24h. The 401 response includes `WWW-Authenticate: Bearer error="invalid_token"`.

---

## 3. Endpoints

### 3.1 `POST /recognize` — Image-based artifact recognition

**Primary endpoint.** Accepts an image, returns ranked candidates from the catalog.

#### Request

```http
POST /v1/recognize
Content-Type: multipart/form-data
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | file (jpg/png/webp) | yes | Max **5 MB**, max **4096×4096** pixels. Server resizes to 384px short edge internally. |
| `mode` | string | no | `object` (default for full-artifact shots) / `label` (museum label crops) / `auto` (server picks). Default `auto`. |
| `top_k` | int | no | Number of candidates to return. Default `5`, max `10`. |
| `min_confidence` | float | no | Drop candidates below this threshold. Default `0.0` (return all). |
| `dimension_hint` | string | no | Optional: `dynasty=商`, `museum=国博`, `type=鼎` — narrows search. Comma-separated multi-hint OK. |
| `demo_seed` | string | no | **Mock only.** Forces deterministic result. Builders use this. Examples: `houmuwu`, `siyang`, `low_conf`, `no_match`. |
| `client_version` | string | no | For telemetry. Example: `miniapp/1.2.0`. |

#### Response — `200 OK`

```json
{
  "request_id": "req_8f3a7c12e9",
  "mode_used": "object",
  "confidence_band": "high",
  "candidates": [
    {
      "artifact_id": "houmuwu_ding",
      "name_zh": "后母戊鼎",
      "name_pinyin": "Hou Mu Wu Ding",
      "dynasty": "商",
      "current_museum": "中国国家博物馆",
      "rarity_level": "国宝",
      "thumbnail_url": "https://cdn.museumcollect.cn/thumbs/houmuwu_ding_256.jpg",
      "confidence": 0.94,
      "match_method": "clip_retrieval",
      "match_reasons": [
        "形制: 方鼎 (高匹配)",
        "纹饰: 饕餮纹 + 云雷纹 (高匹配)"
      ]
    },
    {
      "artifact_id": "zilong_ding",
      "name_zh": "子龙鼎",
      "name_pinyin": "Zi Long Ding",
      "dynasty": "商",
      "current_museum": "中国国家博物馆",
      "rarity_level": "国宝",
      "thumbnail_url": "https://cdn.museumcollect.cn/thumbs/zilong_ding_256.jpg",
      "confidence": 0.72,
      "match_method": "clip_retrieval",
      "match_reasons": [
        "形制: 圆鼎 (中匹配 — 与方鼎差异)",
        "纹饰: 饕餮纹 (高匹配)"
      ]
    }
  ],
  "ocr_text": null,
  "elapsed_ms": 847,
  "model_version": "clip-vit-b32-ft-bronze-v0.3"
}
```

#### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `request_id` | string | Server-side trace ID. Quote in bug reports. |
| `mode_used` | string | What the server actually ran: `object` / `label` / `hybrid`. |
| `confidence_band` | string | `high` (top candidate ≥ 0.85), `medium` (0.60-0.85), `low` (0.40-0.60), `no_match` (< 0.40). **Client renders differently per band.** |
| `candidates` | array | 0..top_k results, sorted by `confidence` desc. Empty array if `no_match`. |
| `candidates[].artifact_id` | string | Stable ID matching `data/curated/bronze-treasures-v1.json`. |
| `candidates[].confidence` | float | 0.0-1.0. |
| `candidates[].match_method` | string | `clip_retrieval` / `ocr_text_match` / `hybrid` / `dimension_filter`. Used to explain the result. |
| `candidates[].match_reasons` | array of string | Human-readable reasons (1-3 items). Optional but recommended for UX. |
| `candidates[].thumbnail_url` | string | 256×256 thumbnail. Always served. |
| `ocr_text` | string \| null | If `mode_used` includes label-reading, the raw OCR text. Null otherwise. |
| `elapsed_ms` | int | Server-side processing time (excludes network). |
| `model_version` | string | For evaluation / A/B tracking. |

#### Error responses

| HTTP | `error_code` | Cause | Client should |
|------|-------------|-------|---------------|
| 400 | `image_too_large` | > 5MB or > 4096px | Show "图片过大,请压缩后重试" |
| 400 | `image_invalid` | Corrupt / unsupported format | Show "图片格式不支持,请上传 jpg/png" |
| 400 | `missing_image` | No `image` field | Treat as form bug |
| 413 | `payload_too_large` | Reverse-proxy rejected | Same as 400 image_too_large |
| 422 | `nsfw_detected` | NSFW guard tripped | Show "此图片不适合识别,请上传文物图" (don't reveal which categories) |
| 422 | `not_a_bronze` | Image likely not a bronze artifact (e.g. selfie, scenery) | Fall through to "看起来不是青铜器,请试试 [catalog search]" |
| 429 | `rate_limited` | > 30 req/min per user | Show "识别太频繁,请稍后再试" with Retry-After header |
| 500 | `internal_error` | Server bug | Show "服务暂时不可用,请重试" + retry once |
| 503 | `model_unavailable` | Model not loaded / cold start | Auto-retry once with backoff, then show error |
| 504 | `timeout` | > 5s processing | Fall through to fallback UX (manual search) |

**Standard error body**:
```json
{
  "request_id": "req_xxx",
  "error_code": "image_too_large",
  "message": "Image exceeds 5MB limit (received: 7.3MB)",
  "details": {"received_mb": 7.3, "max_mb": 5}
}
```

#### `confidence_band` UX guidance (for Builders)

| Band | What to show |
|------|-------------|
| `high` (top ≥ 0.85) | "**这是 [X]**" big card + collect button. Show #2/#3 as "你也可能在看" sub-cards. |
| `medium` (0.60-0.85) | "**可能是这几件之一**" — show top 3-5 as equal-weight cards. User picks. |
| `low` (0.40-0.60) | "**有点像 [X],但不太确定**" — top 1 + prominent "都不对?搜搜看" link to /catalog/search. |
| `no_match` (< 0.40 or empty) | "**没找到匹配 — 试试这些办法**" → catalog search / OCR mode / 拍照建议. |

---

### 3.2 `POST /ocr` — Label-text recognition (optional, label-only flow)

Some users want to scan **just the museum label** (text plate beside the artifact). This endpoint OCR's the label and matches it against the catalog.

In practice, most flows use `POST /recognize` with `mode=label` (which internally calls OCR + catalog match). `POST /ocr` is exposed separately for:
- Debugging the OCR layer
- Apps that want raw OCR text + catalog match as separate concerns
- Power users who want to copy/edit the OCR text before matching

#### Request

```http
POST /v1/ocr
Content-Type: multipart/form-data
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | file | yes | Same limits as `/recognize`. |
| `language` | string | no | `zh` (default) / `zh+en` / `auto`. |
| `match_catalog` | bool | no | If `true` (default), also returns matched artifacts. If `false`, only raw OCR text. |

#### Response — `200 OK`

```json
{
  "request_id": "req_5b2e3f",
  "ocr_text": "后母戊鼎\n商代晚期 约公元前1300-1046年\n1939年河南安阳武官村出土\n中国国家博物馆藏",
  "ocr_confidence": 0.96,
  "extracted_fields": {
    "name": "后母戊鼎",
    "dynasty": "商",
    "period_hint": "商代晚期",
    "excavation_year": "1939",
    "excavation_site": "河南安阳武官村",
    "current_museum": "中国国家博物馆"
  },
  "candidates": [
    {
      "artifact_id": "houmuwu_ding",
      "name_zh": "后母戊鼎",
      "confidence": 0.99,
      "match_method": "ocr_text_match",
      "match_reasons": ["名称完全匹配", "馆藏地匹配"],
      "thumbnail_url": "https://cdn.museumcollect.cn/thumbs/houmuwu_ding_256.jpg"
    }
  ],
  "elapsed_ms": 612
}
```

`extracted_fields` uses a lightweight rule-based parser over the OCR text (regexes for dynasty/year/museum keywords). When the parser is unsure, fields are `null`.

#### Errors

Same shape as `/recognize`. Additional codes:
- `ocr_no_text_found` — OCR returned empty (image had no readable text). Status 422.
- `ocr_low_quality` — Confidence < 0.5. Still returns text but flags it. Status 200 with warning field.

---

### 3.3 `GET /catalog/search` — Text search fallback

When CV and OCR both fail (or the user wants to manually browse), the client falls back to a text search. **This is the ultimate safety net** — Builder must wire it up so no scan ever ends in a dead-end.

#### Request

```http
GET /v1/catalog/search?q=后母戊&dynasty=商&limit=10
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `q` | string | yes | Free-text query. Searches name (zh/pinyin/en) + alt names + excavation site + museum + inscription text. |
| `dynasty` | string | no | Filter: 商 / 西周 / 春秋 / 战国 / 秦 / 西汉 / 东汉. |
| `type` | string | no | Filter: 食器 / 酒器 / 水器 / 兵器 / 乐器 / 杂器 etc. |
| `museum` | string | no | Filter: substring match on `current_museum`. |
| `rarity` | string | no | `国宝` / `一级` / `二级` / `三级`. |
| `limit` | int | no | Default 20, max 50. |
| `offset` | int | no | For pagination. |

#### Response — `200 OK`

```json
{
  "request_id": "req_search_abc",
  "query": "后母戊",
  "total": 1,
  "results": [
    {
      "artifact_id": "houmuwu_ding",
      "name_zh": "后母戊鼎",
      "name_alt": ["司母戊鼎", "司母戊大方鼎"],
      "dynasty": "商",
      "current_museum": "中国国家博物馆",
      "rarity_level": "国宝",
      "thumbnail_url": "https://cdn.museumcollect.cn/thumbs/houmuwu_ding_256.jpg",
      "match_score": 0.98,
      "match_field": "name_zh"
    }
  ],
  "elapsed_ms": 23
}
```

Searches are diacritic / casing / pinyin-tolerant. Backend: simple inverted index over the catalog JSON (BM25 or pg_trgm in production; in-memory in mock).

---

### 3.4 `GET /catalog/{artifact_id}` — Detail lookup (helper)

After recognition returns `artifact_id`, the client uses this to render the full detail view. **This is the same data as `data/curated/bronze-treasures-v1.json[artifact_id]` — the spec is included here for completeness.**

```http
GET /v1/catalog/houmuwu_ding
```

Returns the full record (see `data/curated/bronze-treasures-v1.json` schema; all fields preserved).

---

## 4. Cross-cutting concerns

### 4.1 Rate limits

| Tier | Limit | Note |
|------|-------|------|
| Anonymous (mock/H5) | 30/min, 200/day | Per IP |
| Logged-in user | 60/min, 500/day | Per user |
| Demo seed (`demo_seed` set) | Unlimited | For demo/dev only |

429 response includes `Retry-After: <seconds>` header.

### 4.2 Image preprocessing (server-side)

1. Strip EXIF (privacy).
2. Auto-orient by EXIF rotation, then strip.
3. Resize: short edge → 384px (CLIP standard).
4. Center-crop to 384×384.
5. Normalize per CLIP mean/std.

Client SHOULD upload original resolution (server downsamples better than client). But if bandwidth is a concern, client MAY pre-resize to 1024px max.

### 4.3 NSFW / content safety

Every uploaded image runs through a lightweight NSFW classifier before CLIP. If flagged, request returns `422 nsfw_detected` and the image is **not** logged. This protects against accidental selfies, scenery, or worse.

For known-safe demos (`demo_seed` param), NSFW is skipped.

### 4.4 Telemetry & feedback (post-MVP)

Each recognition response includes a `request_id`. Client may POST feedback:

```http
POST /v1/feedback
{
  "request_id": "req_8f3a7c12e9",
  "selected_candidate": "houmuwu_ding",  // or null if user rejected all
  "correct_artifact_id": "houmuwu_ding",  // if user corrected
  "feedback_type": "confirmed" | "corrected" | "rejected" | "skipped"
}
```

This drives:
- Active learning (corrected pairs → retraining batch)
- Per-artifact precision metrics
- Confidence calibration

Implement post-MVP; tonight's mock ignores feedback.

### 4.5 Determinism / mock seeds

The mock layer (and dev environment) honors `demo_seed`. Predefined seeds for Builder demos:

| Seed | Behavior |
|------|----------|
| `houmuwu` | High-conf return of 后母戊鼎 (0.94) + 子龙鼎 (0.72) |
| `siyang` | High-conf return of 四羊方尊 (0.91) + 四羊首铜瓿 (0.68) |
| `fuhao` | Medium-conf return of 妇好鸮尊 (0.78) + 龙形觥 (0.55) + 莲鹤方壶 (0.42) |
| `lianhe` | Medium-conf 莲鹤方壶 (0.81) + 曾侯乙尊盘 (0.61) |
| `lowconf` | Low-conf single result for ambiguity demo (0.48 — "可能是 X") |
| `nomatch` | Empty candidates, `confidence_band: no_match` |
| `ocr_houmuwu` | Triggers OCR path, returns label-style result |
| `inscription_he_zun` | Returns 何尊 via inscription "中国" keyword |

Builders use these to script the 4 demo scenarios in `scan.html` (see `mock-server-readme.md`).

---

## 5. SLAs (production targets)

| Metric | Target | Hard limit |
|--------|--------|-----------|
| `/recognize` P50 latency | < 1200ms | — |
| `/recognize` P95 latency | < 2500ms | — |
| `/recognize` P99 latency | < 4000ms | 5000ms timeout |
| `/ocr` P50 latency | < 800ms | — |
| `/catalog/search` P95 | < 100ms | — |
| Availability | 99.5% (planned) | — |
| Catalog freshness | < 1h between data push → query | — |
| Precision@5 (target, see roadmap) | ≥ 0.85 by D8 MVP | — |

---

## 6. Versioning & deprecation

- Minor changes (add field) — non-breaking. Clients ignore unknown fields.
- Breaking changes — new path version (`/v2`). Old version supported ≥ 90 days. Announced in `decision-log.md`.
- `model_version` is independent of API version (model can change without API change).

---

## 7. Tonight integration cheatsheet (Builders, read this)

For tonight's static HTML demos, you do NOT call a real server. Instead, you import `mock-recognition.js` (provided) and call:

```js
const result = await mockRecognize({
  image: file,           // File or Blob, or null for demo_seed mode
  mode: 'auto',
  demo_seed: 'houmuwu',  // pin a scenario
  top_k: 5
});
// result is shaped EXACTLY like the /recognize response above.
```

Three things you must implement in `scan.html`:

1. **Image picker** (3-4 preset thumbnails on the page; clicking picks one and binds a `demo_seed`).
2. **Loading state** (~800ms simulated; the mock sleeps for realism).
3. **Result rendering with `confidence_band` branches** (see §3.1 UX guidance). Top candidate + Top-2/3 as secondaries.

The mock returns the EXACT same shape as the future real API, so when we swap to a real backend in D5+, your code keeps working unchanged.

See `mock-server-readme.md` for the JS snippet + how to wire it.

---

## 8. Open questions (for AI Engineer post-D1)

1. Should we expose a `/embed` endpoint for clients that want to compute embeddings client-side? (Probably no — keeps model proprietary.)
2. Should `match_reasons` come from rule-based dim matching or LLM explanation? (Lean rule-based for cost; LLM optional for "explain why" feature.)
3. Should we support video frames / live scanning? (Post-MVP; same endpoint, just send frames.)
4. How to handle multi-artifact images (e.g. a showcase with 3 bronzes)? (Future: bounding box detection + per-box recognize.)

---

**Spec version**: 0.1 (mock)
**Will firm up at**: C3 (Day 5 morning) — real model PoC
**Owner**: AI Engineer
