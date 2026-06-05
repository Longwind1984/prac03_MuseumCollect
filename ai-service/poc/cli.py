#!/usr/bin/env python3
"""
cli.py — Single-image retrieval CLI.

Usage:
    python cli.py <image_path> [--top-k 5] [--embeddings embeddings.npy] [--items items.json]

Output (text):
    [1] houmuwu_ding · 后母戊鼎 · 商代 · cos_dist=0.12 · confidence=high
    [2] simu_xin_ding · 司母辛鼎 · 商代 · cos_dist=0.21 · confidence=medium
    ...

Confidence band mapping (heuristic, see api-contract.md §3.1 for production calibration):
    cos_dist < 0.15      → high
    0.15 ≤ cos_dist < 0.25 → medium
    0.25 ≤ cos_dist < 0.35 → low
    cos_dist ≥ 0.35      → no_match
"""
import argparse
import json
from pathlib import Path

import numpy as np
import torch
import open_clip
from PIL import Image


def confidence_band(cos_dist: float) -> str:
    if cos_dist < 0.15:
        return "high"
    if cos_dist < 0.25:
        return "medium"
    if cos_dist < 0.35:
        return "low"
    return "no_match"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("image", type=Path)
    ap.add_argument("--top-k", type=int, default=5)
    ap.add_argument("--embeddings", type=Path, default=Path("embeddings.npy"))
    ap.add_argument("--items", type=Path, default=Path("items.json"))
    ap.add_argument("--model", default="ViT-B-32")
    ap.add_argument("--pretrained", default="openai")
    args = ap.parse_args()

    items = json.loads(args.items.read_text(encoding="utf-8"))
    corpus = np.load(args.embeddings)

    model, _, preprocess = open_clip.create_model_and_transforms(args.model, pretrained=args.pretrained)
    model.eval()
    img = preprocess(Image.open(args.image).convert("RGB")).unsqueeze(0)
    with torch.no_grad():
        q = model.encode_image(img)
        q = q / q.norm(dim=-1, keepdim=True)
    q = q.cpu().numpy().flatten().astype(np.float32)

    sims = corpus @ q
    distances = 1.0 - sims
    order = np.argsort(distances)[: args.top_k]

    for rank, idx in enumerate(order, start=1):
        it = items[int(idx)]
        d = float(distances[idx])
        print(f"[{rank}] {it['id']} · {it.get('name')} · {it.get('dynasty')} · "
              f"cos_dist={d:.3f} · confidence={confidence_band(d)}")


if __name__ == "__main__":
    main()
