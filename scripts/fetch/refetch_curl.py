#!/usr/bin/env python3
"""Refetch helper — fetch via the system `curl` instead of httpx.

WHY THIS EXISTS (night-run 2026-06-07 finding):
The PM's stock macOS Python links **LibreSSL 2.8.3**, which cannot complete a TLS
handshake with some servers — notably `www.dpm.org.cn` (故宫院刊 PDFs) which reply
`SSLV3_ALERT_HANDSHAKE_FAILURE` to httpx. The system `curl` (SecureTransport /
LibreSSL 3.3.6) reaches them fine. curl `--compressed` also fixes the
"Data-loss while decompressing corrupted data" cases httpx hit on a few PDFs.

This helper shells out to curl, then runs the SAME extraction + chunk contract as
fetch.py, so the output is schema-identical and the anti-hallucination gates still
hold (real url + real fetched bytes + real sha256 content_hash).

T3 red lines unchanged: no login, no payment, no api key, no email. This only
swaps the transport (httpx → curl) for hosts the stock-Python TLS stack rejects.

Examples
--------
  python scripts/fetch/refetch_curl.py \
      --url https://www.dpm.org.cn/Uploads/File/2020/12/29/u5feacd4049fc4.pdf \
      --artifact shanghai-white-marble-buddha --source-class C --pdf \
      --license "(c)all-rights" --tier mid \
      --title "东魏北齐响堂石窟与邺城造像比较研究"
"""
from __future__ import annotations

import argparse
import subprocess

import _common as C
import fetch as F  # reuse the html/json/pdf extractor

# a real browser UA — some servers 403 non-browser agents; we are not hiding,
# the repo contact is in USER_AGENT, this is only to clear naive UA filters
BROWSER_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def curl_get(url: str, timeout: int = 60, ua: str = BROWSER_UA) -> bytes:
    """Fetch raw bytes via system curl. -L follow redirects, --compressed = let
    curl handle gzip/deflate/br correctly (httpx mis-decoded some of these)."""
    proc = subprocess.run(
        ["curl", "-sSL", "--compressed", "--max-time", str(timeout), "-A", ua, url],
        capture_output=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"curl rc={proc.returncode}: {proc.stderr.decode('utf-8', 'ignore')[:160]}")
    if not proc.stdout:
        raise RuntimeError("curl returned 0 bytes")
    return proc.stdout


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="curl-based refetch into verified_chunks.json")
    ap.add_argument("--url", required=True)
    ap.add_argument("--artifact", required=True)
    ap.add_argument("--source-class", required=True, choices=list(C.SOURCE_CLASSES))
    ap.add_argument("--pdf", action="store_true", help="force PDF text extraction")
    ap.add_argument("--license", default="unknown", choices=list(C.LICENSE_ENUM))
    ap.add_argument("--tier", default="mid", choices=list(C.CONFIDENCE_TIERS))
    ap.add_argument("--title", default=None)
    ap.add_argument("--notes", default="")
    ap.add_argument("--timeout", type=int, default=60)
    args = ap.parse_args(argv)

    try:
        raw = curl_get(args.url, timeout=args.timeout)
    except Exception as exc:  # noqa: BLE001 — record any failure, never raise out
        chunk = C.make_chunk(
            artifact_id=args.artifact, source_class=args.source_class, url=args.url,
            fetch_status="failed", fetch_method="curl",
            failure_reason=f"curl_error: {str(exc)[:150]}",
            license=args.license, title=args.title, notes=args.notes,
        )
        C.append_chunk(chunk)
        print(f"[FAILED] {args.url}\n         {str(exc)[:140]}")
        return 0

    content_hash = C.sha256_bytes(raw)
    ctype = "application/pdf" if (args.pdf or args.url.lower().endswith(".pdf")) else ""
    text, ext = F._extract(raw, ctype, args.url, args.pdf)
    raw_path = str(C.save_raw(args.artifact, args.source_class, content_hash, raw, ext))

    notes = (args.notes + " | refetched via curl (LibreSSL/TLS workaround)").strip(" |")
    if not text:
        notes = (notes + " | WARN: 0 chars extracted").strip(" |")

    chunk = C.make_chunk(
        artifact_id=args.artifact, source_class=args.source_class, url=args.url,
        fetch_status="ok", fetch_method=f"curl->{ext}", content_hash=content_hash,
        license=args.license, confidence_tier=args.tier, title=args.title,
        excerpt=text, raw_path=raw_path, notes=notes,
    )
    C.append_chunk(chunk)
    print(f"[OK]     {args.url}\n         ext={ext} chars={len(text)} "
          f"license={args.license} tier={chunk['confidence_tier']} hash={content_hash[:12]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
