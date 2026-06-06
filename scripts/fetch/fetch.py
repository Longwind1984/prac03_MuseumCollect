#!/usr/bin/env python3
"""Local Verifier fetcher — fetch ONE url, verify, record a chunk.

Phase B of the Open Discovery Pipeline (docs/ADR/006-open-discovery-pipeline.md).
Auto-detects html / json / pdf. Use --js to render JavaScript-heavy pages
(many Chinese museum sites are SPAs and return an empty body to plain HTTP).

Examples
--------
  # CC-BY open-access journal article (full text is safe to keep)
  python scripts/fetch/fetch.py \
      --url https://www.mdpi.com/2076-0752/12/5/206 \
      --artifact aurora-hongshan-jade --source-class C \
      --license CC-BY --tier high \
      --title "Jade for Bones in Hongshan Craftsmanship"

  # a PDF (academic paper hosted by a museum)
  python scripts/fetch/fetch.py \
      --url https://www.dpm.org.cn/Uploads/File/2020/12/29/u5feacd4049fc4.pdf \
      --artifact shanghai-white-marble-buddha --source-class C --pdf

  # a JavaScript-rendered museum page (needs a headless browser)
  python scripts/fetch/fetch.py \
      --url https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00159756 \
      --artifact shanghai-white-marble-buddha --source-class A --js \
      --license "(c)all-rights" --tier mid

T3 red lines: never register, pay, bind a card, or email an institution to get
content. If a URL needs a login or a paid wall, record it as failed with
failure_reason="needs_login_or_paywall" and tell the PM. Do not work around it.
"""
from __future__ import annotations

import argparse
import sys
import time

import _common as C


def _http_get(url: str, timeout: int = 30) -> tuple[bytes, str]:
    import httpx

    headers = {"User-Agent": C.USER_AGENT, "Accept-Language": "zh-CN,zh,en"}
    with httpx.Client(follow_redirects=True, timeout=timeout, headers=headers) as client:
        resp = client.get(url)
        resp.raise_for_status()
        return resp.content, resp.headers.get("content-type", "")


def _js_get(url: str, timeout: int = 45) -> tuple[bytes, str]:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            page = browser.new_page(user_agent=C.USER_AGENT)
            page.goto(url, wait_until="networkidle", timeout=timeout * 1000)
            html = page.content()
        finally:
            browser.close()
    return html.encode("utf-8"), "text/html"


def _extract_pdf(raw: bytes) -> str:
    import io

    import pdfplumber

    out = []
    with pdfplumber.open(io.BytesIO(raw)) as pdf:
        for page in pdf.pages[:40]:  # cap pages; full file is in raw_path anyway
            out.append(page.extract_text() or "")
    return "\n".join(out).strip()


def _extract(raw: bytes, ctype: str, url: str, force_pdf: bool) -> tuple[str, str]:
    """Return (text, ext). ext in {pdf, json, html}."""
    low = url.lower()
    if force_pdf or low.endswith(".pdf") or "application/pdf" in ctype:
        return _extract_pdf(raw), "pdf"
    if "application/json" in ctype or low.endswith(".json"):
        try:
            parsed = __import__("json").loads(raw)
            return __import__("json").dumps(parsed, ensure_ascii=False, indent=2), "json"
        except Exception:
            pass
    # default: treat as HTML, pull the main article text
    import trafilatura

    text = trafilatura.extract(raw.decode("utf-8", "ignore")) or ""
    return text.strip(), "html"


def fetch_one(
    url: str,
    artifact_id: str,
    source_class: str,
    *,
    use_js: bool = False,
    force_pdf: bool = False,
    license: str = "unknown",
    title: str | None = None,
    author: str | None = None,
    year: str | None = None,
    tier: str = "mid",
    polite_delay: float = 1.0,
    notes: str = "",
) -> dict:
    """Fetch one URL, build + persist a chunk, return it."""
    method = "playwright" if use_js else "httpx"
    try:
        if polite_delay:
            time.sleep(polite_delay)
        raw, ctype = (_js_get(url) if use_js else _http_get(url))
    except Exception as exc:  # noqa: BLE001 — we WANT to record any failure
        reason = type(exc).__name__
        msg = str(exc)
        if "403" in msg:
            reason = "http_403"
        elif "404" in msg:
            reason = "http_404"
        elif "Timeout" in reason or "timeout" in msg.lower():
            reason = "timeout"
        chunk = C.make_chunk(
            artifact_id=artifact_id, source_class=source_class, url=url,
            fetch_status="failed", fetch_method=method, failure_reason=f"{reason}: {msg[:160]}",
            license=license, title=title, author=author, year=year, notes=notes,
        )
        C.append_chunk(chunk)
        print(f"[FAILED] {url}\n         {reason}: {msg[:160]}")
        return chunk

    content_hash = C.sha256_bytes(raw)
    text, ext = _extract(raw, ctype, url, force_pdf)
    raw_path = str(C.save_raw(artifact_id, source_class, content_hash, raw, ext))

    if not text and ext == "html" and not use_js:
        notes = (notes + " | empty text from plain HTTP — retry with --js").strip(" |")

    chunk = C.make_chunk(
        artifact_id=artifact_id, source_class=source_class, url=url,
        fetch_status="ok", fetch_method=f"{method}->{ext}", content_hash=content_hash,
        license=license, confidence_tier=tier, title=title, author=author, year=year,
        excerpt=text, raw_path=raw_path, notes=notes,
    )
    C.append_chunk(chunk)
    print(
        f"[OK]     {url}\n"
        f"         class={source_class} ext={ext} chars={len(text)} "
        f"license={license} tier={chunk['confidence_tier']}\n"
        f"         hash={content_hash[:12]} raw={raw_path}"
    )
    return chunk


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Fetch one URL into verified_chunks.json")
    ap.add_argument("--url", required=True)
    ap.add_argument("--artifact", required=True, help="artifact id / slug this source belongs to")
    ap.add_argument("--source-class", required=True, choices=list(C.SOURCE_CLASSES))
    ap.add_argument("--js", action="store_true", help="render with a headless browser")
    ap.add_argument("--pdf", action="store_true", help="force PDF text extraction")
    ap.add_argument("--license", default="unknown", choices=list(C.LICENSE_ENUM))
    ap.add_argument("--tier", default="mid", choices=list(C.CONFIDENCE_TIERS))
    ap.add_argument("--title", default=None)
    ap.add_argument("--author", default=None)
    ap.add_argument("--year", default=None)
    ap.add_argument("--delay", type=float, default=1.0, help="polite delay before request (s)")
    ap.add_argument("--notes", default="")
    args = ap.parse_args(argv)

    fetch_one(
        args.url, args.artifact, args.source_class,
        use_js=args.js, force_pdf=args.pdf, license=args.license, tier=args.tier,
        title=args.title, author=args.author, year=args.year,
        polite_delay=args.delay, notes=args.notes,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
