"""Shared helpers for the local Verifier fetch scripts.

Phase B of the Open Discovery Pipeline (see docs/ADR/006-open-discovery-pipeline.md).
Runs on the PM's LOCAL machine, which — unlike the cloud sandbox — has real
internet access. Nothing in here registers an account, pays, or emails anyone
(those are T3 red lines; if a page demands login, STOP and ask the PM).

Output contract: every fetch appends one "chunk" to
    data/pipeline/out/verified_chunks.json
A chunk with no URL is rejected. A chunk with fetch_status="ok" but no
content_hash cannot be trusted as high-tier (the Compiler enforces this gate).
"""
from __future__ import annotations

import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path

# ---- paths (resolved relative to repo root, not CWD) -----------------------
# this file = <repo>/scripts/fetch/_common.py  → parents[2] = <repo>
REPO_ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = REPO_ROOT / "data" / "raw"                      # gitignored: big raw evidence
IN_DIR = REPO_ROOT / "data" / "pipeline" / "in"           # cloud -> local shopping lists
OUT_DIR = REPO_ROOT / "data" / "pipeline" / "out"         # local -> cloud deliverable
VERIFIED_CHUNKS = OUT_DIR / "verified_chunks.json"

# ---- controlled vocabularies (anti-hallucination contract) -----------------
SOURCE_CLASSES = ("A", "B", "C", "D", "E")
LICENSE_ENUM = ("CC0", "CC-BY", "CC-BY-NC-SA", "(c)all-rights", "unknown")
CONFIDENCE_TIERS = ("high", "mid", "low")
FETCH_STATUSES = ("ok", "failed")

# a polite, identifiable UA — we are not hiding who we are
USER_AGENT = (
    "MuseumCollect-RAG-Verifier/0.1 (research; contact via repo "
    "longwind1984/prac03_museumcollect) httpx"
)

EXCERPT_MAX = 1500  # chars kept inline; full text always lives in raw_path


def slugify(text: str) -> str:
    text = re.sub(r"[^\w\-]+", "-", (text or "").strip().lower())
    return re.sub(r"-{2,}", "-", text).strip("-") or "untitled"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def ensure_dirs() -> None:
    for d in (RAW_DIR, IN_DIR, OUT_DIR):
        d.mkdir(parents=True, exist_ok=True)


def make_chunk(
    *,
    artifact_id: str,
    source_class: str,
    url: str,
    fetch_status: str,
    fetch_method: str = "",
    content_hash: str = "",
    license: str = "unknown",
    confidence_tier: str = "mid",
    title: str | None = None,
    author: str | None = None,
    year: int | str | None = None,
    excerpt: str = "",
    raw_path: str = "",
    failure_reason: str = "",
    notes: str = "",
) -> dict:
    """Build one verified-chunk record, validating the controlled vocabularies.

    Raises ValueError on contract violations so bad data never reaches disk.
    """
    if not url:
        raise ValueError("chunk rejected: url is mandatory (anti-hallucination rule)")
    if source_class not in SOURCE_CLASSES:
        raise ValueError(f"source_class must be one of {SOURCE_CLASSES}, got {source_class!r}")
    if license not in LICENSE_ENUM:
        raise ValueError(f"license must be one of {LICENSE_ENUM}, got {license!r}")
    if confidence_tier not in CONFIDENCE_TIERS:
        raise ValueError(f"confidence_tier must be one of {CONFIDENCE_TIERS}")
    if fetch_status not in FETCH_STATUSES:
        raise ValueError(f"fetch_status must be one of {FETCH_STATUSES}")
    if fetch_status == "ok" and not content_hash:
        # not fatal, but high-tier requires a hash; downgrade loudly
        confidence_tier = "low"
        notes = (notes + " | auto-downgraded: ok without content_hash").strip(" |")
    return {
        "artifact_id": artifact_id,
        "source_class": source_class,
        "url": url,
        "fetched_at": now_iso(),
        "fetch_status": fetch_status,
        "fetch_method": fetch_method,
        "content_hash": content_hash,
        "license_observed": license,
        "confidence_tier": confidence_tier,
        "source_title": title,
        "author": author,
        "publish_year": year,
        "excerpt_or_metadata": (excerpt or "")[:EXCERPT_MAX],
        "excerpt_truncated": len(excerpt or "") > EXCERPT_MAX,
        "raw_path": raw_path,
        "failure_reason": failure_reason,
        "notes": notes,
    }


def append_chunk(chunk: dict) -> None:
    """Append a chunk to verified_chunks.json, de-duping by (url, content_hash)."""
    ensure_dirs()
    data: list[dict] = []
    if VERIFIED_CHUNKS.exists():
        try:
            data = json.loads(VERIFIED_CHUNKS.read_text("utf-8"))
        except json.JSONDecodeError:
            data = []
    key = (chunk["url"], chunk.get("content_hash", ""))
    data = [c for c in data if (c["url"], c.get("content_hash", "")) != key]
    data.append(chunk)
    VERIFIED_CHUNKS.write_text(json.dumps(data, ensure_ascii=False, indent=2), "utf-8")


def save_raw(artifact_id: str, source_class: str, content_hash: str, raw: bytes, ext: str) -> Path:
    """Write raw fetched bytes under data/raw/<artifact>/ (gitignored evidence)."""
    ensure_dirs()
    folder = RAW_DIR / slugify(artifact_id)
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"{source_class}-{content_hash[:8]}.{ext}"
    path.write_bytes(raw)
    # return a repo-relative path string for the chunk record
    return path.relative_to(REPO_ROOT)
