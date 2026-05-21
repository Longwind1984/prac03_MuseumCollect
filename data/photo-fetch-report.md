# Photo Fetch Report — v4 (2026-05-21)

## Summary

| Status | Count |
|--------|-------|
| Fetched (direct_url set) | 144 / 277 |
| Non-Wikimedia source skipped | 95 |
| No image data | 38 |

## Fetched: 144 / 277

All 144 records that had Wikimedia Commons Category URLs now have:
- `direct_url`: `https://upload.wikimedia.org/...` thumbnail (1200px)
- `file_url`: `https://commons.wikimedia.org/wiki/File:...`
- `license` and `attribution` fields populated

Network note: `upload.wikimedia.org` is blocked from this server environment
(returns "Host not in allowlist"), so `local_path` is null for all records.
The `direct_url` is designed to be loaded by browsers client-side, which can
reach Wikimedia's CDN directly. Images will render when the HTML page is opened
in a browser.

## Non-Wikimedia Source Skipped: 95

These records had non-Category URLs (museum sites, Wikipedia pages, MET, British Museum, etc.)
and were not processed. Examples:

- `fuhao_sanlian_yan` → https://en.chnmuseum.cn (no downloadable license)
- `fuhao_ou_fangyi` → https://en.chnmuseum.cn (no downloadable license)
- `xiang_zun_hunan` → https://www.hnmuseum.com (no downloadable license)
- `shufu_fangding_anyang` → https://www.metmuseum.org/art/collection/search/60594
- `shang_gu_standard` → https://www.metmuseum.org (MET API would provide CC0 — future work)
- `bm_double_ram_zun` → https://www.britishmuseum.org (BM API CC BY-NC-SA — not commercial-safe)
- `hushi_ren_you` → https://en.wikipedia.org (Wikipedia article page, not a file)

## No Photo / Empty image_urls: 38

Records with no image_urls entries or empty arrays — inherited from v3 data gaps.

## License Distribution

| License | Count |
|---------|-------|
| CC BY-SA 4.0 | 74 |
| CC BY-SA 3.0 | 61 |
| CC BY 2.0 | 9 |
| **Total** | **144** |

No CC BY-NC, "All rights reserved," or "Fair use only" images used.
All selected licenses are compatible with open attribution requirements.

## Local Disk Usage

`assets/photos/` directory: 0 bytes (local download blocked by network allowlist).
Images served via `direct_url` (Wikimedia Commons CDN) in browser context.

## Future Work

1. MET API objects (objectID known): use `https://collectionapi.metmuseum.org/public/collection/v1/objects/{id}` to get CC0 `primaryImage` URLs for 12 MET records
2. Wikimedia API via proxy: batch `imageinfo` calls would improve filename accuracy for museum-level category fallbacks
3. Sichuan Museum, Anhui Museum: contact for CC license confirmation
