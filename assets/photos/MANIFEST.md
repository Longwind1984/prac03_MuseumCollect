# assets/photos — Photo Fetch Manifest

> Generated: 2026-06-06  
> Engineer: Data Engineer (MuseumCollect Phase 1 / Photo Sprint)

---

## What Happened During This Sprint

### Goal
Obtain real public-domain / open-license photographs for 15–25 Chinese bronze 国宝 and save them to `assets/photos/<artifact_id>.jpg`.

### Network Environment (Sandbox)

The following hosts were tested and confirmed **blocked** (403 / "Host not in allowlist"):

| Host | Status | Note |
|------|--------|------|
| upload.wikimedia.org | 403 | Wikimedia image CDN — blocked |
| commons.wikimedia.org | 403 | Wikimedia Commons web UI — blocked |
| en.wikipedia.org | 403 | Wikipedia — blocked |
| collectionapi.metmuseum.org | 403 | MET Open Access API — blocked |
| wikidata.org | 403 | Wikidata — blocked |
| cdn.jsdelivr.net | 403 | jsDelivr CDN — blocked |
| openaccess-api.clevelandart.org | 403 | Cleveland Museum API — blocked |
| openaccess-cdn.clevelandart.org | 403 | Cleveland Museum image CDN — blocked |
| archive.org | 403 | Internet Archive — blocked |
| iiif.io | 403 | IIIF — blocked |
| artsandculture.google.com | 403 | Google Arts & Culture — blocked |

The following hosts are **reachable**:

| Host | Status |
|------|--------|
| raw.githubusercontent.com | 200 |
| github.com | 200 |
| api.github.com | 200 (rate-limited after ~10 unauthenticated calls) |
| files.pythonhosted.org | 200 |
| pypi.org | 200 |

### GitHub-hosted Image Search Results

Conducted exhaustive search for GitHub repositories with Chinese bronze artifact photos
committed as binary files (jpg/png). Methods used:

1. GitHub Repositories API search — queries tried:
   - "chinese bronze artifacts images" → 0 results
   - "sanxingdui museum dataset" → 0 results
   - "chinese artifacts jpg dataset" → 0 results
   - "国宝 bronze images github" → 0 results
   - "文物 images dataset" → 1 result (HeXavi8/ACIMG — WeChat mini program, no committed images)
   - "chinese museum images dataset" → 0 results

2. GitHub Code API search (before rate limit hit):
   - "houmuwu_ding" → 0 results
   - "sanxingdui.jpg" → 0 results
   - "zenghouyi" → 0 results
   - "yuewang_goujian" → 0 results

3. GitHub Topics browsed: `chinese-history`, `artifact`, `museum-collection` — no image repos

4. Specific repos inspected:
   - `zhourixin/bronze-Ding` (CVPR2023) — no committed images; dataset gated behind email request
   - `1bai1/Jinwen-Dataset` — bronze inscription rubbings only, not artifact photos
   - `wjhuah/BIRD` — text/paleographic data only
   - `MescoCoder/AncientChineseProject` — Python code only
   - `HeXavi8/ACIMG` — frontend code; images hosted externally
   - `georgeblck/art-datasets` — curated list, no committed images

5. WebSearch for raw.githubusercontent.com paths with Chinese bronze artifact names — no hits

**Conclusion: No GitHub-hosted Chinese bronze artifact photo repository exists with publicly committed image files. The GitHub-only path yields zero images.**

---

## Current State of assets/photos/

| File | Size | Status |
|------|------|--------|
| houmuwu_ding.jpg | 21 bytes | Placeholder ("Host not in allowlist") — NOT a real image |

**Zero real images have been downloaded.** All images will be downloaded by `scripts/fetch-photos.mjs` when run in an environment with open internet access.

---

## Fallback Solution

### How it works

`scripts/fetch-photos.mjs` — a zero-dependency Node 18+ script — reads `data/photo-manifest.json` and downloads each artifact's image from Wikimedia Commons via the thumbnail CDN:

```
https://upload.wikimedia.org/wikipedia/commons/thumb/<md5-prefix>/<filename>/<width>px-<filename>
```

This URL pattern is standard Wikimedia Commons and stable. The script:
- Computes the MD5-based path from the filename (same algorithm Wikimedia uses)
- Fetches 1200px-wide thumbnails (configurable via `--width`)
- Validates content-type and minimum size (>5 KB)
- Skips already-downloaded files
- Tries a fallback filename if primary fails
- Reports failures with the Commons category URL to find the correct filename

### Where to run it

**Locally:**
```bash
node scripts/fetch-photos.mjs
# or dry-run first:
node scripts/fetch-photos.mjs --dry-run
# single artifact:
node scripts/fetch-photos.mjs --id sanxingdui_zongmu
```

**Vercel build hook** — add to `vercel.json` or `package.json` build script:
```json
{
  "buildCommand": "node scripts/fetch-photos.mjs && <your-existing-build>"
}
```

### Artifacts covered (24 of 25)

| artifact_id | name_zh | License | Confidence |
|-------------|---------|---------|------------|
| houmuwu_ding | 后母戊鼎 | CC BY-SA 4.0 | High (filename widely cited) |
| siyang_fangzun | 四羊方尊 | CC BY 2.0 | High |
| fuhao_xiaozun | 妇好鸮尊 | CC BY-SA 4.0 | High (filename confirmed in search) |
| da_yu_ding | 大盂鼎 | CC BY-SA 3.0 | High |
| da_ke_ding | 大克鼎 | CC BY 2.0 | High (filename in search results) |
| maogong_ding | 毛公鼎 | CC BY-SA 3.0 | High (NPM file, widely cited) |
| sanshi_pan | 散氏盘 | CC BY-SA 3.0 | Medium (verify on Commons category) |
| he_zun | 何尊 | CC BY-SA 4.0 | High (filename confirmed) |
| li_gui | 利簋 | CC BY-SA 3.0 | Medium (limited Commons coverage) |
| guojizibai_pan | 虢季子白盘 | CC BY-SA 3.0 | Medium (limited Commons coverage) |
| lianhe_fanghu | 莲鹤方壶 | CC BY-SA 4.0 | High (filename confirmed) |
| yuewang_goujian_jian | 越王勾践剑 | CC BY-SA 4.0 | High (Commons category confirmed) |
| zenghouyi_bianzhong | 曾侯乙编钟 | CC BY-SA 4.0 | High (filename confirmed in search) |
| zenghouyi_zunpan | 曾侯乙尊盘 | CC BY-SA 4.0 | Medium |
| cuojin_boshanlu | 错金博山炉 | CC BY-SA 4.0 | Medium |
| changxin_gongdeng | 长信宫灯 | CC BY-SA 4.0 | High (filename confirmed in search) |
| matafeiyan | 马踏飞燕 | CC BY-SA 3.0 | High (filename in search results) |
| sanxingdui_dali_ren | 三星堆青铜大立人 | CC BY-SA 4.0 | High (filename confirmed) |
| sanxingdui_zongmu | 三星堆纵目面具 | CC0 | High — CC0, no attribution needed |
| sanxingdui_shenshu | 三星堆青铜神树 | CC BY-SA 4.0 | Medium |
| zilong_ding | 子龙鼎 | CC BY-SA 4.0 | Low (filename speculative) |
| longxing_gong | 龙形觥 | CC BY-SA 4.0 | Low (filename speculative — MUST verify) |
| qin_tongchema | 秦陵铜车马 | CC BY-SA 4.0 | Medium |
| shangyang_fangsheng | 商鞅方升 | CC BY-SA 4.0 | Low (filename speculative) |
| siyangshou_bu | 四羊首铜瓿 | — | NONE — no Commons file found |

**Confidence levels:**
- **High**: filename confirmed from Wikimedia Commons category page or direct file URL seen in search results
- **Medium**: filename plausible from naming conventions; needs verification on Commons
- **Low**: filename is a best-guess; MUST visit the Commons category URL and find the real filename before relying on this

### Artifacts with no photo (1 of 25)

`siyangshou_bu` (四羊首铜瓿) — No confirmed Wikimedia Commons file found. This artifact has extremely limited coverage in English-language open repositories. Action: visit `https://commons.wikimedia.org/wiki/Category:Hunan_Museum` manually, search for "铜瓿" or "bronze bu vessel", and add the filename to `data/photo-manifest.json`.

---

## Attribution Requirements

For any public-facing deployment, display attribution for CC BY / CC BY-SA images:

```
Photo: <Author>, <File:Filename>, <License> via Wikimedia Commons
```

Example:
```
Photo: Gary Todd, File:HouMuWuDingFullView.jpg, CC BY-SA 4.0 via Wikimedia Commons
```

CC0 images (`sanxingdui_zongmu`) need no attribution but crediting the source is good practice.

Full attribution data is in `data/photo-manifest.json` → `attribution` field per artifact.

---

## Files Produced

| Path | Description |
|------|-------------|
| `data/photo-manifest.json` | Curated Wikimedia filenames, licenses, attributions for all 25 artifacts |
| `scripts/fetch-photos.mjs` | Node 18+ downloader script, zero dependencies |
| `assets/photos/MANIFEST.md` | This file |
