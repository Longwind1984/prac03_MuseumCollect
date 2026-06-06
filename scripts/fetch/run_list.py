#!/usr/bin/env python3
"""Batch-fetch a shopping list (sources_candidates*.json) into verified_chunks.json.

Phase B convenience wrapper around fetch.py. Reads a candidates file produced by
the cloud Discovery step and fetches each item, honouring its `fetch_hint`.

IMPORTANT — the Verifier is a checker, not a firehose. Default mode is --dry-run
(prints the plan only). Add --go to actually fetch. After a real run, SPOT-CHECK
the results in data/pipeline/out/verified_chunks.json; do not trust them blind.

Examples
--------
  # see the plan, fetch nothing
  python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json

  # actually fetch, but only the items reachable from a mainland-CN network
  python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json --go

  # fetch only one artifact's sources
  python scripts/fetch/run_list.py <file> --go --artifact shanghai-white-marble-buddha

`fetch_hint` understood: "json_api" | "static_html" | "js_html" | "pdf" |
"login_or_paywall" (skipped, T3) | "likely_gfw_blocked" (attempted, may fail).
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import _common as C
import fetch as F


HINT_FLAGS = {
    "pdf": dict(force_pdf=True),
    "js_html": dict(use_js=True),
    "static_html": dict(),
    "json_api": dict(),
    "likely_gfw_blocked": dict(),
}


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("candidates_file")
    ap.add_argument("--go", action="store_true", help="actually fetch (default is dry-run)")
    ap.add_argument("--artifact", default=None, help="only this artifact id")
    ap.add_argument("--source-class", default=None, choices=list(C.SOURCE_CLASSES))
    ap.add_argument("--delay", type=float, default=1.5)
    args = ap.parse_args(argv)

    path = Path(args.candidates_file)
    if not path.is_absolute():
        path = C.REPO_ROOT / path
    items = json.loads(path.read_text("utf-8"))
    if isinstance(items, dict):  # allow {"candidates": [...]} or a bare list
        items = items.get("candidates", [])

    planned = 0
    for it in items:
        if args.artifact and it.get("artifact_id") != args.artifact:
            continue
        if args.source_class and it.get("source_class") != args.source_class:
            continue
        hint = it.get("fetch_hint", "static_html")
        if hint == "login_or_paywall":
            print(f"[SKIP·T3] {it['url']}  (needs login/paywall — leave to PM)")
            continue
        planned += 1
        flags = HINT_FLAGS.get(hint, {})
        if not args.go:
            print(f"[PLAN] {it.get('source_class')} {hint:18} {it['url']}")
            continue
        F.fetch_one(
            it["url"], it["artifact_id"], it.get("source_class", "C"),
            license=it.get("expected_license", "unknown"),
            tier="mid",
            title=it.get("source_title") or it.get("rationale"),
            polite_delay=args.delay,
            notes=f"hint={hint}; {it.get('rationale','')}"[:240],
            **flags,
        )

    print(f"\n{'DRY-RUN' if not args.go else 'DONE'} — {planned} item(s) "
          f"{'planned' if not args.go else 'attempted'}. "
          f"Output: {C.VERIFIED_CHUNKS.relative_to(C.REPO_ROOT)}")
    if not args.go:
        print("Add --go to fetch for real. Spot-check results afterwards.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
