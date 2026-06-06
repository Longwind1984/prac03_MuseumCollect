#!/usr/bin/env python3
"""
build_index.py — Encode top-K artifacts via OpenCLIP, save embeddings + items registry.

Reads bronze-treasures-v3-segment-*.json from --segments, selects top-K by rarity tier
(国宝 > 一级 > 二级), downloads each item's image_urls[0].direct_url to --image-cache,
runs OpenCLIP ViT-B/32 forward, writes:
  - embeddings.npy  shape (N, 512), float32, L2-normalized
  - items.json      list[dict] aligned by index, keys: id, name, dynasty, rarity, image_path, source_url

Phase 1 reference impl of ai-roadmap.md §6 eval pipeline. ~2 min on CPU.

Sandbox note: requires Wikimedia + HuggingFace reachable (see README.md).
"""
import argparse
import json
import hashlib
import sys
from pathlib import Path
from typing import Iterator

import numpy as np
import requests
import torch
import open_clip
from PIL import Image

RARITY_ORDER = {"国宝": 0, "一级": 1, "二级": 2, "三级": 3, "未定级": 9}


def iter_artifacts(segments_dir: Path) -> Iterator[dict]:
    """Yield every artifact across all v3 segment JSONs."""
    for path in sorted(segments_dir.glob("bronze-treasures-v3-segment-*.json")):
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        artifacts = data.get("artifacts") or data.get("records") or data
        if isinstance(artifacts, dict):
            artifacts = list(artifacts.values())
        for art in artifacts:
            if isinstance(art, dict) and art.get("id"):
                yield art


def select_topk(artifacts: list[dict], top_k: int, accepted_rarity: set[str]) -> list[dict]:
    """Sort by rarity tier, deterministic by id."""
    filtered = [a for a in artifacts if a.get("rarity_tier") in accepted_rarity]
    filtered.sort(key=lambda a: (RARITY_ORDER.get(a.get("rarity_tier", "未定级"), 99), a["id"]))
    return filtered[:top_k]


def first_image_url(art: dict) -> str | None:
    """Pick the most reliable image URL — direct_url field added by v4 photo-fetcher."""
    imgs = art.get("image_urls") or []
    if not isinstance(imgs, list):
        return None
    for img in imgs:
        if isinstance(img, dict) and img.get("direct_url"):
            return img["direct_url"]
        if isinstance(img, str) and img.startswith("http"):
            return img
    return None


def cache_image(url: str, cache_dir: Path) -> Path | None:
    """Download URL to cache_dir/<sha1>.jpg; skip if exists. Returns local path or None."""
    cache_dir.mkdir(parents=True, exist_ok=True)
    name = hashlib.sha1(url.encode()).hexdigest()[:16] + ".jpg"
    local = cache_dir / name
    if local.exists() and local.stat().st_size > 1024:
        return local
    try:
        r = requests.get(url, timeout=30, headers={"User-Agent": "MuseumCollect-PoC/1.0"})
        r.raise_for_status()
        if len(r.content) < 1024:
            print(f"  [skip] tiny response for {url[:60]}", file=sys.stderr)
            return None
        local.write_bytes(r.content)
        return local
    except Exception as e:
        print(f"  [fail] {url[:60]} — {e}", file=sys.stderr)
        return None


def encode_batch(image_paths: list[Path], model, preprocess, device: str) -> np.ndarray:
    """Run CLIP forward, L2-normalize. Returns float32 (N, 512)."""
    tensors = []
    for p in image_paths:
        img = Image.open(p).convert("RGB")
        tensors.append(preprocess(img))
    batch = torch.stack(tensors).to(device)
    with torch.no_grad():
        feats = model.encode_image(batch)
        feats = feats / feats.norm(dim=-1, keepdim=True)
    return feats.cpu().numpy().astype(np.float32)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--segments", type=Path, required=True, help="dir containing bronze-treasures-v3-segment-*.json")
    ap.add_argument("--top-k", type=int, default=25)
    ap.add_argument("--rarity", default="国宝,一级", help="comma-separated rarity tiers to include")
    ap.add_argument("--image-cache", type=Path, default=Path("cache"))
    ap.add_argument("--out-embeddings", type=Path, default=Path("embeddings.npy"))
    ap.add_argument("--out-items", type=Path, default=Path("items.json"))
    ap.add_argument("--model", default="ViT-B-32")
    ap.add_argument("--pretrained", default="openai")
    args = ap.parse_args()

    accepted = set(s.strip() for s in args.rarity.split(","))
    print(f"[1/4] Reading artifacts from {args.segments}…")
    all_artifacts = list(iter_artifacts(args.segments))
    print(f"      {len(all_artifacts)} records loaded")

    selected = select_topk(all_artifacts, args.top_k, accepted)
    print(f"[2/4] Selected top {len(selected)} by rarity ∈ {accepted}")

    items, image_paths = [], []
    for art in selected:
        url = first_image_url(art)
        if not url:
            print(f"  [skip-no-image] {art['id']}", file=sys.stderr)
            continue
        local = cache_image(url, args.image_cache)
        if not local:
            continue
        items.append({
            "id": art["id"],
            "name": art.get("name") or art.get("name_zh"),
            "dynasty": art.get("dynasty") or art.get("period"),
            "rarity": art.get("rarity_tier"),
            "image_path": str(local),
            "source_url": url,
        })
        image_paths.append(local)
    print(f"      {len(items)} images cached locally")

    print(f"[3/4] Loading OpenCLIP {args.model} ({args.pretrained})…")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model, _, preprocess = open_clip.create_model_and_transforms(args.model, pretrained=args.pretrained)
    model.eval().to(device)

    print(f"[4/4] Encoding on {device}…")
    embeddings = encode_batch(image_paths, model, preprocess, device)

    np.save(args.out_embeddings, embeddings)
    with open(args.out_items, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print(f"      embeddings.npy shape={embeddings.shape} dtype={embeddings.dtype}")
    print(f"      items.json {len(items)} records")
    print("Done. Run eval.py next.")


if __name__ == "__main__":
    main()
