#!/usr/bin/env python3
"""
test_eval.py — stdlib unittest for eval.py retrieval metrics.

No external deps beyond what eval.py already needs (numpy). Synthesizes a tiny
deterministic 6-item index where the correct answer is known by construction,
then asserts eval logic computes P@1, P@5, intra-class P@1 correctly.

Run: python -m unittest test_eval.py -v
"""
import sys
import unittest
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from eval import cosine_topk, evaluate


def make_synthetic_index():
    """6 items, 2 dynasties × 3 each. Embeddings cluster by dynasty.
    Same-id self-similarity = 1.0 (degenerate).
    Cross-dynasty distance > within-dynasty distance.
    """
    rng = np.random.default_rng(42)
    items = []
    base = []
    for dyn_idx, dyn in enumerate(["商", "西周"]):
        cluster_center = rng.normal(size=(8,))
        cluster_center = cluster_center / np.linalg.norm(cluster_center)
        for i in range(3):
            jitter = rng.normal(scale=0.05, size=(8,))
            v = cluster_center + jitter
            v = v / np.linalg.norm(v)
            base.append(v)
            items.append({
                "id": f"{dyn}_{i}",
                "name": f"{dyn}_{i}_name",
                "dynasty": dyn,
                "rarity": "国宝",
                "image_path": f"cache/{dyn}_{i}.jpg",
                "source_url": f"http://example.test/{dyn}_{i}.jpg",
            })
    return np.array(base, dtype=np.float32), items


class TestCosineTopK(unittest.TestCase):
    def test_self_is_top1_when_in_corpus(self):
        embeddings, _ = make_synthetic_index()
        query = embeddings[0]
        idx = cosine_topk(query, embeddings, k=1)
        self.assertEqual(int(idx[0]), 0)

    def test_topk_ranking_descending(self):
        embeddings, _ = make_synthetic_index()
        query = embeddings[0]
        idx = cosine_topk(query, embeddings, k=6)
        sims = embeddings @ query
        ranked_sims = sims[idx]
        for i in range(len(ranked_sims) - 1):
            self.assertGreaterEqual(ranked_sims[i], ranked_sims[i + 1])

    def test_k_truncates(self):
        embeddings, _ = make_synthetic_index()
        idx = cosine_topk(embeddings[0], embeddings, k=3)
        self.assertEqual(len(idx), 3)


class TestEvaluate(unittest.TestCase):
    def test_loo_p_at_1_is_zero_for_unique_ids(self):
        """Leave-one-out + 1-image-per-id ⇒ P@1 strict is 0 by construction.
        This is the documented degeneration in eval.py docstring."""
        embeddings, items = make_synthetic_index()
        metrics = evaluate(embeddings, items, top_k=5)
        self.assertEqual(metrics["p_at_1"], 0.0)
        self.assertEqual(metrics["p_at_5"], 0.0)

    def test_intra_class_p_at_1_high_when_clustered_by_dynasty(self):
        """Synthetic data clusters by dynasty, so intra-class P@1 should be ~1.0."""
        embeddings, items = make_synthetic_index()
        metrics = evaluate(embeddings, items, top_k=5)
        self.assertGreaterEqual(metrics["intra_class_at_1"], 0.99)

    def test_per_dynasty_breakdown_sums_to_total(self):
        embeddings, items = make_synthetic_index()
        metrics = evaluate(embeddings, items, top_k=5)
        total_n = sum(d["n"] for d in metrics["per_dynasty"].values())
        self.assertEqual(total_n, metrics["n"])

    def test_failures_recorded_for_top5_misses(self):
        embeddings, items = make_synthetic_index()
        metrics = evaluate(embeddings, items, top_k=5)
        self.assertEqual(len(metrics["failures"]), metrics["n"])
        for f in metrics["failures"]:
            self.assertIn("query_id", f)
            self.assertIn("top1_id", f)
            self.assertNotEqual(f["query_id"], f["top1_id"])

    def test_dynasty_signal_with_distinct_clusters(self):
        """Top-1 of any 商 query should be 商 (cluster property)."""
        embeddings, items = make_synthetic_index()
        metrics = evaluate(embeddings, items, top_k=5)
        shang = metrics["per_dynasty"]["商"]
        self.assertEqual(shang["intra1"], 1.0)


class TestEvaluateEdgeCases(unittest.TestCase):
    def test_empty_corpus_returns_zero_metrics(self):
        metrics = evaluate(np.zeros((0, 8), dtype=np.float32), [], top_k=5)
        self.assertEqual(metrics["n"], 0)
        self.assertEqual(metrics["p_at_1"], 0.0)
        self.assertEqual(metrics["p_at_5"], 0.0)

    def test_top_k_larger_than_corpus(self):
        """top-k > n-1 should not blow up; topk_idx is just shorter."""
        embeddings, items = make_synthetic_index()
        metrics = evaluate(embeddings, items, top_k=100)
        self.assertEqual(metrics["n"], 6)


if __name__ == "__main__":
    unittest.main(verbosity=2)
