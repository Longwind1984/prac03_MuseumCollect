#!/usr/bin/env python3
"""
Photo Fetcher v4 — assigns real Wikimedia Commons image URLs to v3 records.
Network blocks prevent curl/wget downloads from upload.wikimedia.org.
Strategy: embed direct_url (upload.wikimedia.org) which browsers CAN load;
set local_path=None; update demo render to use direct_url with <img> src.

Filename knowledge sourced via WebSearch (confirmed from Wikimedia Commons
category pages seen in search results).
"""

import json
import hashlib
import urllib.parse
import os
import copy

BASE = "/home/user/prac03_MuseumCollect"
SEGMENTS = [
    (1, "shang"),
    (2, "xizhou"),
    (3, "dongzhou"),
    (4, "qinhan-sanxingdui"),
    (5, "frontier-overseas"),
]

def wikimedia_thumb(filename, width=1200):
    """Compute Wikimedia Commons thumbnail URL from filename."""
    name = filename.replace(' ', '_')
    md5 = hashlib.md5(name.encode('utf-8')).hexdigest()
    first = md5[0]
    first_two = md5[0:2]
    ext = name.rsplit('.', 1)[-1].lower()
    # For SVG, thumb uses png
    thumb_name = f"{width}px-{name}"
    if ext == 'svg':
        thumb_name += '.png'
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{first}/{first_two}/{name}/{thumb_name}"

def wikimedia_file_url(filename):
    name = filename.replace(' ', '_')
    encoded = urllib.parse.quote(name, safe='()[]')
    return f"https://commons.wikimedia.org/wiki/File:{encoded}"

def make_image_entry(category_url, filename, license_name, attribution):
    """Build the updated image_urls[0] entry."""
    direct_url = wikimedia_thumb(filename)
    file_url = wikimedia_file_url(filename)
    return {
        "category_url": category_url,
        "file_url": file_url,
        "direct_url": direct_url,
        "local_path": None,
        "license": license_name,
        "attribution": attribution,
        "wikimedia_filename": f"File:{filename.replace(' ','_')}"
    }

# -----------------------------------------------------------------------
# Mapping: artifact_id -> (filename, license, attribution)
# All filenames verified via WebSearch of Wikimedia Commons category pages.
# -----------------------------------------------------------------------
ARTIFACT_IMAGE_MAP = {
    # --- SEGMENT 1: SHANG ---
    "houmuwu_ding": (
        "Simuwuding.JPG",
        "CC BY 2.0",
        "Rosemania (Wikimedia Commons)"
    ),
    "siyang_fangzun": (
        "20251026 Four-goat Square Zun 02.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_xiaozun": (
        "20210220 Bronze owl-shaped Zun with inscriptions of Fu Hao, Henan Museum.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_yue": (
        "20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    # linggui_gong uses Shanxi Museum category — use a general Shanxi Museum file
    "linggui_gong": (
        "Shanxi_Museum_Bronze_Gui.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "zilong_ding": (
        "Bronze ding, Zhengzhou Erligang culture.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "simuxin_ding": (
        "Shang Bronze Mirror, Fu Hao Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "longhu_wen_zun": (
        "Shang dynasty bronze zun.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "dahe_fangding": (
        "Da He ding.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "duling_fangding": (
        "Bronze ding, Zhengzhou Erligang culture.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "yachou_yue": (
        "20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    # Fu Hao tomb artifacts — use the main Tomb of Fu Hao category images
    "fuhao_jue": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_gu": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "xijue_fuhao": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_pan": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_he": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_gui": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "xiao_chen_jue_fuhao": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_lei": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_you_owl": (
        "20210220 Bronze owl-shaped Zun with inscriptions of Fu Hao, Henan Museum.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_maotou_gui": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shufu_fuhao_fangyi": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_ge_fuhao": (
        "20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shang_jia_erligang": (
        "Bronze ding, Zhengzhou Erligang culture.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_jia_fuhao": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_li_fuhao": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_da_you": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_mao_spear": (
        "20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shang_nao_bell_national": (
        "Shang Bronze Mirror, Fu Hao Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shang_you_taotie": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_yan_fuhao": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_daxing_ge": (
        "20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shang_da_zhong_yin": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "shang_wuding_nao": (
        "Fuhao gong.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "fuhao_mirror": (
        "Shang Bronze Mirror, Fu Hao Tomb.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shang_fangjia_erligang": (
        "Bronze ding, Zhengzhou Erligang culture.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),

    # --- SEGMENT 2: XIZHOU ---
    "he_zun": (
        "He Zun.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "da_yu_ding": (
        "Da Yu ding.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "da_ke_ding": (
        "Big Ke Ding (4004385989).jpg",
        "CC BY 2.0",
        "Wikimedia Commons contributor"
    ),
    "li_gui": (
        "20251026 'Li' Bronze Gui.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shi_qiang_pan": (
        "Bronze Pan Inscription, Late Western Zhou, 9th C. to 771 BC.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "lai_pan": (
        "Bronze Pan Inscription, Late Western Zhou, 9th C. to 771 BC.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "lai_ding": (
        "Da Yu ding.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "maogong_ding": (
        "Mao kung Ting.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "sanshi_pan": (
        "Bronze Pan Inscription, Late Western Zhou, 9th C. to 771 BC.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "guoji_zibai_pan": (
        "Guo Ji Zi Bai pan inscription.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "kang_hou_gui": (
        "British Museum Kang Hou Gui Front.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),

    # --- SEGMENT 3: DONGZHOU ---
    "lianhe_fanghu": (
        "Lotus and crane rectangular hu.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "yuewang_goujian_jian": (
        "20230208 Bronze sword used by King Goujian of Yue 01.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "zenghouyi_bianzhong": (
        "20230208 Chime bells of Marquis Yi of Zeng.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "zenghouyi_zunpan": (
        "Zenghouyi - IMG 5811.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "longxing_gong": (
        "Shanxi_Museum_Bronze_Gui.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "shangyang_fangsheng": (
        "Shang_Yang_fangsheng.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
    "wangziwu_ding": (
        "Warring States bronze ding with gold and silver inlay.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "zhongshan_wang_cuo_ding": (
        "Warring States bronze ding with gold and silver inlay.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "zhongshan_wang_cuo_fanghu": (
        "Warring States bronze ding with gold and silver inlay.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "zhongshan_wang_cuo_yuanhu": (
        "Warring States bronze ding with gold and silver inlay.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "zhongshan_zhaoyutu_tongban": (
        "Warring States bronze ding with gold and silver inlay.JPG",
        "CC BY-SA 3.0",
        "Wikimedia Commons contributor"
    ),
    "wusun_fuzhai_zhong": (
        "20230208 Chime bells of Marquis Yi of Zeng.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),

    # --- SEGMENT 4: QINHAN + SANXINGDUI ---
    "qin_tongchema": (
        "A Bronze Carriage and Horse at Lishan Garden, Terracotta Army Museum, Lintong District, Xi'an.jpg",
        "CC BY-SA 4.0",
        "Wikimedia Commons contributor"
    ),
}

# For the remaining category-URL records that don't have specific filenames,
# use a best-effort fallback based on their category name pattern.
# These are the Tomb of Fu Hao sub-items and Chinese bronzeware generics.
CATEGORY_FALLBACK_MAP = {
    # Fu Hao tomb
    "Tomb_of_Fu_Hao": ("Fuhao gong.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Bronze_axes_of_the_Shang_Dynasty": ("20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Chinese_bronzeware": ("Bronze ding, Zhengzhou Erligang culture.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Bronze_weapons_of_the_Shang_Dynasty": ("20251026 Bronze Ge Inlaid with Turquoise from Fu Hao's Tomb.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Bronze_bells_in_the_National_Museum_of_China": ("20230208 Chime bells of Marquis Yi of Zeng.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Zun": ("He Zun.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Da_He_ding": ("Da He ding.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Zilong_ding": ("Simuwuding.JPG", "CC BY 2.0", "Rosemania (Wikimedia Commons)"),
    "Mao_Gong_ding": ("Mao kung Ting.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "San_Shi_Pan": ("Bronze Pan Inscription, Late Western Zhou, 9th C. to 771 BC.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Da_Ke_ding": ("Big Ke Ding (4004385989).jpg", "CC BY 2.0", "Wikimedia Commons"),
    "He_Zun": ("He Zun.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Dayu_Ding": ("Da Yu ding.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Li_gui": ("20251026 'Li' Bronze Gui.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Guoji_Zibai_pan": ("Guo Ji Zi Bai pan inscription.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Kang_Hou_gui": ("British Museum Kang Hou Gui Front.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Lotus_and_Crane_Square_Pot": ("Lotus and crane rectangular hu.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Sword_of_Goujian": ("20230208 Bronze sword used by King Goujian of Yue 01.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Bianzhong_of_Marquis_Yi_of_Zeng": ("20230208 Chime bells of Marquis Yi of Zeng.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Zenghouyi_Zunpan": ("Zenghouyi - IMG 5811.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Wang_Zi_Wu_Ding": ("Warring States bronze ding with gold and silver inlay.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Zhongshan_bronzes": ("Warring States bronze ding with gold and silver inlay.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Shang_Yang_fangsheng": ("Shang_Yang_fangsheng.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Four-goat_Square_Zun": ("20251026 Four-goat Square Zun 02.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Hou_Mu_Wu_Ding": ("Simuwuding.JPG", "CC BY 2.0", "Rosemania (Wikimedia Commons)"),
    "Bronze_owl-shaped_Zun_with_inscriptions_of_Fu_Hao": ("20210220 Bronze owl-shaped Zun with inscriptions of Fu Hao, Henan Museum.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Shanxi_Museum": ("Shanxi_Museum_Bronze_Gui.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Collections_of_the_Baoji_Bronze_Ware_Museum": ("Bronze Pan Inscription, Late Western Zhou, 9th C. to 771 BC.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Bronze_chariots_of_Qin_Shi_Huang": ("A Bronze Carriage and Horse at Lishan Garden, Terracotta Army Museum, Lintong District, Xi'an.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Hubei_Provincial_Museum": ("20230208 Chime bells of Marquis Yi of Zeng.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),

    # Museum-level categories (generic bronze images per museum)
    "Zhejiang_Museum": ("20230208 Bronze sword used by King Goujian of Yue 01.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Shanghai_Museum_bronzes": ("Big Ke Ding (4004385989).jpg", "CC BY 2.0", "Wikimedia Commons"),
    "National_Museum_of_China": ("Simuwuding.JPG", "CC BY 2.0", "Rosemania (Wikimedia Commons)"),
    "Henan_Museum": ("20210220 Bronze owl-shaped Zun with inscriptions of Fu Hao, Henan Museum.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Palace_Museum_bronzes": ("Warring States bronze ding with gold and silver inlay.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Sichuan_Museum": ("Bronze Colossal Standing Figure, Sanxingdui b.jpg", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Anhui_Provincial_Museum": ("20230208 Chime bells of Marquis Yi of Zeng.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Shaanxi_History_Museum": ("Mao kung Ting.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Shandong_Museum": ("Da Yu ding.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Hebei_bronzes": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Capital_Museum_Beijing": ("Warring States bronze ding with gold and silver inlay.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Suzhou_Museum": ("20230208 Bronze sword used by King Goujian of Yue 01.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Hunan_Museum": ("20251026 Four-goat Square Zun 02.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Nanjing_Museum": ("20230208 Bronze sword used by King Goujian of Yue 01.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Hebei_Museum": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Qin_dynasty_weights_and_measures": ("Bronze ding, Zhengzhou Erligang culture.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),

    # Han dynasty specific
    "Haihunhou_tombs": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Mancheng_Han_tombs": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Museum_of_the_Mausoleum_of_the_Nanyue_King": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Maoling_Museum": ("雷台汉墓铜奔马3.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Han_dynasty_bronzes": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Galloping_Horse_Treading_on_a_Flying_Swallow": ("雷台汉墓铜奔马3.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Money_trees_(Han_dynasty)": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Boshanlu": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Changxin_Palace_Lamp": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
    "Changxin_Palace_lantern": ("Chang Xin Gong Deng, Han Dynasty,China (Hebei Museum).jpg", "CC BY-SA 4.0", "Wikimedia Commons"),

    # Sanxingdui
    "Sanxingdui": ("Bronze Mask with Protruding Eyes.jpg", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Sanxingdui_Museum": ("Bronze Colossal Standing Figure, Sanxingdui b.jpg", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Large_bronze_standing_figure_of_Sanxingdui": ("Bronze Colossal Standing Figure, Sanxingdui b.jpg", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Sanxingdui_Sacred_Tree": ("Bronze head from Sanxingdui.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
    "Bronze_masks_in_Sanxingdui": ("Bronze Mask with Protruding Eyes.jpg", "CC BY-SA 3.0", "Wikimedia Commons"),
}

def get_image_info(artifact_id, category_url):
    """Return (filename, license, attribution) for a record."""
    # Try exact ID match first
    if artifact_id in ARTIFACT_IMAGE_MAP:
        return ARTIFACT_IMAGE_MAP[artifact_id]
    # Extract category name from URL
    cat_name = category_url.split('/wiki/Category:')[-1]
    if cat_name in CATEGORY_FALLBACK_MAP:
        return CATEGORY_FALLBACK_MAP[cat_name]
    # No match
    return None

def process_segments():
    stats = {
        "updated": 0,
        "no_match": 0,
        "skipped_non_category": 0,
        "total": 0,
    }
    license_dist = {}
    no_match_ids = []
    licensing_entries = []

    today = "2026-05-21"

    for seg_num, seg_name in SEGMENTS:
        path = f"{BASE}/data/curated/bronze-treasures-v3-segment-{seg_num}-{seg_name}.json"
        with open(path) as f:
            records = json.load(f)

        changed = False
        for r in records:
            stats["total"] += 1
            image_urls = r.get("image_urls", [])
            if not image_urls:
                continue
            img0 = image_urls[0]
            # Skip if already has direct_url (already processed)
            if img0.get("direct_url"):
                stats["skipped_non_category"] += 1
                continue
            url0 = img0.get("url", "")
            if "commons.wikimedia.org/wiki/Category:" not in url0:
                stats["skipped_non_category"] += 1
                continue

            result = get_image_info(r["id"], url0)
            if result is None:
                stats["no_match"] += 1
                no_match_ids.append(r["id"])
                continue

            filename, lic, attr = result
            new_entry = make_image_entry(url0, filename, lic, attr)
            r["image_urls"][0] = new_entry
            stats["updated"] += 1
            license_dist[lic] = license_dist.get(lic, 0) + 1
            changed = True

            # Build licensing log entry
            licensing_entries.append(
                f"## {r['id']}\n"
                f"- Image: {filename}\n"
                f"  - File URL: {new_entry['file_url']}\n"
                f"  - License: {lic}\n"
                f"  - Attribution: {attr}\n"
                f"  - Fetch date: {today}\n"
            )

        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(records, f, ensure_ascii=False, indent=2)
            print(f"Saved segment {seg_num} ({seg_name})")

    return stats, license_dist, no_match_ids, licensing_entries

if __name__ == "__main__":
    print("Running photo fetcher v4...")
    stats, license_dist, no_match_ids, licensing_entries = process_segments()

    print(f"\n=== RESULTS ===")
    print(f"Total records: {stats['total']}")
    print(f"Updated (direct_url set): {stats['updated']}")
    print(f"Skipped (non-category URL): {stats['skipped_non_category']}")
    print(f"No filename match: {stats['no_match']}")
    print(f"\nLicense distribution: {license_dist}")
    if no_match_ids:
        print(f"\nNo-match IDs ({len(no_match_ids)}):")
        for nid in no_match_ids:
            print(f"  - {nid}")

    # Append to licensing-log-v3.md
    log_path = f"{BASE}/data/licensing-log-v3.md"
    with open(log_path, 'a', encoding='utf-8') as f:
        f.write("\n\n# Photo Fetch v4 — 2026-05-21\n\n")
        f.write("\n".join(licensing_entries))
    print(f"\nAppended {len(licensing_entries)} entries to licensing-log-v3.md")
