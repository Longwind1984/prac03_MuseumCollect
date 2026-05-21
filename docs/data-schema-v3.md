# Data Schema v3 — Bronze Treasures Knowledge Base

> Domain Researcher · 2026-05-21 H1 · Night Run D1 (v3 iteration)
> 数据规范: `data/curated/bronze-treasures-v3.json` (300 件)
> 配套: `dimensional-map-v3.md` · `motivation-hooks-v3.md`
>
> **读者: Data Engineer 团队 (5 个并行 agent)。读完应能直接填字段。**
>
> v3 核心变化:
> 1. 从 v1 的笼统 `story_brief` 1 段文字 → 11 字段结构化深度
> 2. 引入学术编号 (`jicheng_id` / `tushijicheng_id`)
> 3. 关联文物 (`related_artifacts`) 支持跨维度联动
> 4. 反幻觉硬约束 (`data_sources` + `confidence_level` + TODO 留白)

---

## 0. 设计原则

### 0.1 反幻觉三准则

1. **能找到的字段必须有 `source` 字段引用** — Wikipedia EN / Commons / 学术论文 URL
2. **找不到的字段标 `null` + comment 标 TODO**, 不编造
3. **争议字段用 `confidence: "确认" | "争议" | "推测"`** + 注明学派

### 0.2 License 准则

- 文本: Wikipedia (CC BY-SA 4.0) / 公开论文 (CC BY)
- 图: 仅 Wikimedia Commons CC0 / CC-BY / CC-BY-SA / 大英博物馆 CC BY 4.0 / MET Open Access
- ❌ 禁用: Baidu Baike (license 不明)、博物馆官网图 (大多 © All Rights Reserved)
- 每件文物的 `image_urls` 数组中, 每张图必须有 `source`, `license` 显式字段

### 0.3 字段填充率目标

| 字段 | 必填率目标 |
|------|-----------|
| #1 基本信息 | 100% |
| #2 出土发现 | 90% (部分早期出土记录不全) |
| #3 形制详解 | 95% |
| #4 纹饰逐层 | 80% (有些无纹器物) |
| #5 铭文释读 | 100% 标记 (有铭 70% / 无铭 30%, 但都要标) |
| #6 用途历史 | 80% |
| #7 学术地位 | 90% |
| #8 传承流转 | 70% (海外流散文物部分流转不清) |
| #9 关联文物 | 100% (至少 3 个 related id) |
| #10 照片库 | 80% (300 件 × 1-3 张, 部分 license 问题留 TODO) |
| #11 3D/视频 | 30% (重点 50 件 stretch goal) |

### 0.4 向后兼容

v3 schema 在 v1 基础上**扩展, 不破坏**:
- v1 已有字段 (`id`, `name_zh`, `dynasty`, `period`, `excavation_site`, `current_museum`, `size`, `type`, `form_subtype`, `patterns`, `inscription`, `purpose`, `craft`, `rarity_level`, `story_brief`, `image_urls`) **全部保留**
- v3 新增字段以 `excavation_detail`, `form_detail`, `patterns_detail`, `inscription_detail`, `usage_history`, `academic_status`, `provenance_timeline`, `related_artifacts`, `media_3d_video` 等独立 sub-object 形式追加
- 任何使用 v1 schema 的代码 (B/C demo) 不需修改即可读 v3 数据

---

## 1. 字段总览 (11 大类)

```json
{
  "id": "houmuwu_ding",                  // 已有 v1
  "basic": { ... },                      // 字段 #1: 基本信息 (已有 v1)
  "excavation_detail": { ... },          // 字段 #2: 出土发现 (新)
  "form_detail": { ... },                // 字段 #3: 形制详解 (新)
  "patterns_detail": { ... },            // 字段 #4: 纹饰逐层 (扩展 v1)
  "inscription_detail": { ... },         // 字段 #5: 铭文释读 (扩展 v1)
  "usage_history": { ... },              // 字段 #6: 用途历史 (新)
  "academic_status": { ... },            // 字段 #7: 学术地位 (新)
  "provenance_timeline": [ ... ],        // 字段 #8: 传承流转 (新)
  "related_artifacts": [ ... ],          // 字段 #9: 关联文物 (新)
  "image_urls": [ ... ],                 // 字段 #10: 照片库 (扩展 v1)
  "media_3d_video": [ ... ]              // 字段 #11: 3D/视频 (新)
}
```

---

## 2. 字段 #1: 基本信息 (Basic Info)

### 2.1 JSON 路径

```json
{
  "id": "houmuwu_ding",
  "name_zh": "后母戊鼎",
  "name_pinyin": "Hou Mu Wu Ding",
  "name_alt": ["司母戊鼎", "司母戊大方鼎"],
  "dynasty": "商",
  "period": "商代晚期",
  "approx_year": "约公元前1300-1046年",
  "excavation_year": "1939",
  "excavation_site": "河南省安阳市武官村殷墟遗址",
  "ancient_state": "商",
  "current_museum": "中国国家博物馆",
  "size": {
    "height_cm": 133,
    "width_cm": 79.2,
    "length_cm": 112,
    "weight_kg": 832.84
  },
  "type": "食器",
  "form_subtype": "方鼎",
  "rarity_level": "禁止出境"
}
```

### 2.2 字段说明

| Field | Required | Type | 说明 | 取值规范 |
|-------|----------|------|------|---------|
| `id` | ✅ | string | 唯一标识符 | `<name_pinyin_snake_case>` (例 `houmuwu_ding`) |
| `name_zh` | ✅ | string | 中文官方名称 | 优先采用国家文物局认定名 (例 "后母戊鼎" 而非"司母戊鼎") |
| `name_pinyin` | ✅ | string | 拼音 (空格分隔, 首字母大写) | "Hou Mu Wu Ding" |
| `name_alt` | optional | string[] | 别名 / 历史曾用名 | ["司母戊鼎", "司母戊大方鼎"] |
| `dynasty` | ✅ | enum | 朝代 | "夏" / "商" / "西周" / "春秋" / "战国" / "秦" / "汉" |
| `period` | ✅ | string | 时期 (含子分期) | "商代晚期" / "西周早期" / "战国晚期" |
| `approx_year` | ✅ | string | 大致年代 | "约公元前1300-1046年" |
| `excavation_year` | optional | string | 出土年份 | "1939" (不知则 null) |
| `excavation_site` | ✅ | string | 出土地点 | 详细到县/村, 不写省即可 (例 "河南省安阳市武官村殷墟") |
| `ancient_state` | ✅ | string | 古国/文化区 | "商" / "西周" / "曾" / "古蜀" / "楚" / "晋"; 多源用 / 分隔 |
| `current_museum` | ✅ | string | 当前馆藏 | 官方馆名, 简称见 `geo-system.html` 馆名表 |
| `size.height_cm` | ✅ | number | 高 (cm) | 0.1 精度 |
| `size.width_cm` | optional | number | 宽 (cm) | 0.1 精度 |
| `size.length_cm` | optional | number | 长 (cm) | 0.1 精度 |
| `size.weight_kg` | optional | number | 重 (kg) | 0.01 精度 |
| `type` | ✅ | enum | 大类 | "食器" / "酒器" / "水器" / "乐器" / "兵器" / "杂器" |
| `form_subtype` | ✅ | string | 子型 | "方鼎" / "圆鼎" / "方尊" / "鸮尊" / 等; 参照 `dimensional-map-v3.md §1` |
| `rarity_level` | ✅ | enum | 稀有度 | "禁止出境" / "一级文物" / "二级文物" / "三级文物" / "普通馆藏" |

### 2.3 填充指南

**Source**: Wikipedia EN/ZH (各文物条目) + 国家文物局《禁止出境文物目录》(2002/2012/2013 三批 195 件)

**Fallback**:
- 找不到精确出土年: 用 "1930s" / "1950s" 等近似时段
- 找不到精确尺寸: 标 `null` + comment "尺寸 TODO"
- 不确定子型: 标 `form_subtype: "方鼎(待确认)"` + `confidence: "推测"`

**Anti-hallucination**:
- ❌ 不能写"约高 130cm" 当作精确值 — 必须有引用
- ❌ 不能编造"国家文物局认定" — 必须查 2012/2013 名录文件
- ✅ 如不确定, 标 TODO 不编

---

## 3. 字段 #2: 出土发现 (Excavation Detail)

### 3.1 JSON 路径

```json
{
  "excavation_detail": {
    "discoverer": "吴希增 (河南安阳武官村村民, 偶然在田间挖出)",
    "discovery_date": "1939-03-19",
    "discovery_method": "农民田间偶然发现",
    "co_excavated_with": ["其余 28 块陶范碎片"],
    "co_excavated_group_id": "wuguan_cun_1939",
    "dating_evidence": {
      "stratigraphy": "出土于殷墟二期文化层 (王陵区 M260 附近, 但具体墓葬关系不明)",
      "style_phase": "商晚期, 殷墟二期 (武丁后期至祖庚祖甲时期)",
      "inscription_persona": "铭文'后母戊'对应商王武丁王后妇妌庙号",
      "confidence": "确认"
    },
    "significance_of_discovery": "迄今出土最大最重商代青铜礼器, 二战期间为避日军劫掠曾就地回埋; 1946 入藏南京中央博物院, 1959 调归中国国家博物馆"
  }
}
```

### 3.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `discoverer` | optional | string | 谁发现 (人/团队/单位) |
| `discovery_date` | optional | string | YYYY-MM-DD 或 YYYY |
| `discovery_method` | optional | enum | "考古发掘" / "农民偶然" / "盗墓收缴" / "海外收藏家捐赠" / "传世(从未失踪)" |
| `co_excavated_with` | optional | string[] | 同墓/同坑出土的其他器物 |
| `co_excavated_group_id` | optional | string | 同墓器物群 ID (用于 §9 关联文物聚合) |
| `dating_evidence` | optional | object | 断代依据 |
| `dating_evidence.stratigraphy` | optional | string | 地层学依据 |
| `dating_evidence.style_phase` | optional | string | 风格分期 |
| `dating_evidence.inscription_persona` | optional | string | 铭文人物对应 |
| `dating_evidence.14c` | optional | string | 14C 测年 (如有) |
| `dating_evidence.confidence` | ✅ if 有 dating_evidence | enum | "确认" / "争议" / "推测" |
| `significance_of_discovery` | optional | string | 该发现的考古重要性 |

### 3.3 填充指南

**Source**: Wikipedia + 学术论文 (考古简报 / 学术综述) + 博物馆官方介绍

**典型同墓器物群**:
- `fuhao_mu_1976`: 妇好墓 1976 殷墟 M5 (468 件铜器)
- `zenghouyi_mu_1978`: 曾侯乙墓 1978 随州擂鼓墩 (15000+ 件)
- `sanxingdui_k2_1986`: 三星堆二号祭祀坑 1986
- `wuguan_cun_1939`: 后母戊鼎 1939 武官村
- `huayuan_zhuang_2000`: 殷墟花园庄东地 H10 2000
- `shanxi_houma_1980`: 山西侯马晋国铸铜遗址

**Anti-hallucination**:
- ❌ 不能写"1939-03-19" 当作精确日期 (实际上多数文物只知道年份)
- ✅ 不确定具体日期 → 写 "1939"
- ✅ 不确定具体发现者 → "当地村民"

---

## 4. 字段 #3: 形制详解 (Form Detail)

### 4.1 JSON 路径

```json
{
  "form_detail": {
    "main_body": {
      "shape": "长方形深腹, 平沿外折",
      "feature": "四足为方柱形",
      "specifics": "腹壁两侧各有一对兽首立耳"
    },
    "accessories": {
      "ears": "对称立耳, 耳上饰双虎噬人头浮雕",
      "feet": "四足圆柱形, 上端铸饕餮纹",
      "lid": null
    },
    "proportions": {
      "height_to_width_ratio": "1.68:1",
      "rim_to_belly_ratio": "1.42:1",
      "comment": "高耸狭长, 显厚重感"
    },
    "distinctive_features": [
      "中国出土最大青铜礼器, 重 832.84 kg",
      "耳上虎噬人头浮雕极罕见, 仅见于此鼎与司母辛鼎",
      "腹壁主纹分解饕餮, 中线左右对称展开"
    ],
    "craft": {
      "method": "范铸法 (块范法)",
      "specifics": "28 块陶范分铸后合范浇铸",
      "surface_treatment": null
    }
  }
}
```

### 4.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `main_body.shape` | ✅ | string | 主体形状 |
| `main_body.feature` | optional | string | 关键特征 |
| `main_body.specifics` | optional | string | 细节 |
| `accessories.ears` | optional | string | 耳部 (鼎/簋常有) |
| `accessories.feet` | optional | string | 足部 |
| `accessories.lid` | optional | string | 盖 (簋/卣常有) |
| `accessories.handle` | optional | string | 提梁 (卣/壶) |
| `accessories.spout` | optional | string | 流 (爵/匜) |
| `proportions.height_to_width_ratio` | optional | string | 高宽比 |
| `proportions.comment` | optional | string | 视觉印象 |
| `distinctive_features` | ✅ | string[] | 3-5 个最显著特征 (用于 catalog filter 和"代表器" 标签) |
| `craft.method` | ✅ | enum | "范铸法" / "失蜡法" / "复合法" |
| `craft.specifics` | optional | string | 工艺细节 |
| `craft.surface_treatment` | optional | string | "错金银" / "鎏金" / "镶嵌绿松石" / null |

### 4.3 填充指南

**Source**: 学术论文 (考古简报中"器型描述" 部分) + 博物馆器物说明牌 + 朱凤瀚《中国青铜器综论》

**典型 `distinctive_features` 写法**:
- ✅ "中国出土最大青铜礼器, 重 832.84 kg" (具体数字 + 来源可查)
- ✅ "耳上虎噬人头浮雕极罕见, 仅见于此鼎与司母辛鼎" (横向对比定位)
- ❌ "气势恢宏, 王者风范" (太抽象, 用户记不住)

**Anti-hallucination**:
- ❌ 不能编造"曲线优美" 等审美 cliche — 必须有学术支撑
- ✅ 若不确定工艺方法, 写 `"method": "范铸法(推测)"` + `confidence: "推测"`

---

## 5. 字段 #4: 纹饰逐层 (Patterns Detail)

> ★ 这是 v3 最重要的扩展, 直接关联 `dimensional-map-v3.md §4` 纹饰演化树

### 5.1 JSON 路径

```json
{
  "patterns": ["饕餮纹", "夔龙纹", "云雷纹", "虎噬人头纹(耳)", "蝉纹"],  // v1 已有, 保留向后兼容
  "patterns_detail": {
    "main": [
      {
        "name": "饕餮纹",
        "icon_ref": "taotie",                // 关联 §4 的 SVG icon 文件名
        "position": "腹壁正面 (中线对称, 分解展开式)",
        "style": "商晚期 II 式, 高浮雕, 巨眼瞠目, 双角 C 形向上",
        "meaning": "兽面神权符号, 殷商'帝廷'神权的视觉化"
      }
    ],
    "secondary": [
      {
        "name": "夔龙纹",
        "icon_ref": "kuilong",
        "position": "腹壁主纹下方 (横向带状)",
        "style": "单足侧视龙, 卷尾",
        "meaning": "次要神兽, 作为饕餮辅纹"
      }
    ],
    "ground": [
      {
        "name": "云雷纹",
        "icon_ref": "yunlei",
        "position": "全器器表底纹 (作画底)",
        "style": "细密回旋, 商晚期标准",
        "meaning": "天界/神域的视觉编码, 商周通用底纹"
      }
    ],
    "local": [
      {
        "name": "虎噬人头纹",
        "icon_ref": "huishirentou",
        "position": "双耳浮雕",
        "style": "双虎张口含人头, 写实立体浮雕",
        "meaning": "极罕见, 仅见此鼎和司母辛鼎; 学界推测象征神权吞噬",
        "rarity": "孤型"
      }
    ],
    "edge": [
      {
        "name": "蝉纹",
        "icon_ref": "chan",
        "position": "腹部边线",
        "style": "简化蝉形, 商晚期常见边纹",
        "meaning": "蝉作为再生/不朽的符号, 商人陪葬常用"
      }
    ]
  }
}
```

### 5.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `patterns` | ✅ | string[] | v1 兼容: 所有纹饰平铺名称数组 |
| `patterns_detail.main` | ✅ | object[] | 主纹 (1-2 个) |
| `patterns_detail.secondary` | optional | object[] | 副纹 (0-3 个) |
| `patterns_detail.ground` | ✅ | object[] | 地纹 (背景, 多为云雷/弦纹) |
| `patterns_detail.local` | optional | object[] | 局部纹 (耳/足/盖) |
| `patterns_detail.edge` | optional | object[] | 边纹 |

每个纹饰对象的字段:

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `name` | ✅ | string | 学术标准名 (例 "饕餮纹" 而非"兽面纹"; 看时代和学派) |
| `icon_ref` | ✅ | string | 关联 `assets/patterns/{icon_ref}.svg` 的 15-25 套 SVG icon |
| `position` | ✅ | string | 位置描述 (腹壁/耳/足/盖/底) |
| `style` | optional | string | 风格描述 (具体特征) |
| `meaning` | optional | string | 学术含义 (引用学派, 不写主观感受) |
| `rarity` | optional | enum | "孤型" / "罕见" / "常见" |

### 5.3 SVG icon_ref 字典 (v3 强制)

```
icon_ref          中文名         覆盖率(估算 300 件)
─────────────────────────────────────────────
taotie            饕餮          ~40%
kuilong           夔龙          ~30%
fengniao          凤鸟          ~25%
yunlei            云雷(地纹)    ~70%
panchi            蟠螭          ~10%
panhui            蟠虺          ~8%
qiequ             窃曲          ~12%
zhonghuan         重环          ~10%
lin               鳞纹          ~15%
chan              蝉纹          ~12%
jiaoye            焦叶          ~8%
xian              弦纹(底)      ~20%
rudine            乳钉          ~5%
wo                涡纹          ~10%
geometric         几何          ~10%
chixiao           鸱鸮          ~3% (妇好系特征)
huishirentou      虎噬人头      ~1% (孤型)
yu                鱼纹          ~5%
gui_pattern       龟纹          ~3%
sanjiao           三角          ~10%
niaoshou          鸟兽合体      ~5%
boqu              波曲          ~8%
shouquan          兽体卷曲      ~3%
yanle             宴乐攻战      ~3% (战国汉)
shoulie           狩猎          ~3%
```

### 5.4 填充指南

**Source**: 朱凤瀚《中国青铜器综论》纹饰章节 + 容庚《商周彝器通考》 + 学术论文

**填充流程**:
1. 阅读文物的纹饰描述 (Wikipedia/学术论文)
2. 区分"主/副/地/局/边" 五层
3. 每层至少 1 个纹饰对象
4. 必须填 `icon_ref` (对照 §5.3 字典)
5. 如出现字典外的纹饰, 在 `patterns_detail.notes` 标 TODO 让 Domain Researcher 补 icon

**Anti-hallucination**:
- ❌ 不能写"兽面" 笼统词, 必须细分 (饕餮/夔/蟠螭/蟠虺等)
- ❌ 不能编造"祥瑞之兆" 等吉祥话 — 商周不是后世"吉祥文化"
- ✅ "学界 X 派认为 ...; Y 派认为 ..." 是合法表述

---

## 6. 字段 #5: 铭文释读 (Inscription Detail)

### 6.1 JSON 路径 (有铭文情况)

```json
{
  "inscription": {                           // v1 已有, 保留
    "has": true,
    "text": "后母戊",
    "char_count": 3,
    "summary": "鼎腹内壁铸铭'后母戊'三字"
  },
  "inscription_detail": {
    "original_text": "後母戊",               // 原文 (繁体/异体)
    "modern_text": "后母戊",                 // 现代汉字隶定
    "vernacular": "(为) 母亲 戊 (而铸)",     // 白话翻译
    "char_count": 3,
    "jinwen_stage": "商代金文 (晚商三期)",
    "jicheng_id": "01703",                   // 《殷周金文集成》编号
    "tushijicheng_id": null,                 // 《图像集成》编号
    "rubbing_url": "https://commons.wikimedia.org/wiki/File:Houmuwu_ding_inscription_rubbing.jpg",
    "rubbing_license": "PD",
    "characters": [
      {
        "char_zh": "后",
        "char_modern": "后",
        "char_jinwen": "𠂊",                // 金文原形 (尽量真字, 无则用 unicode 占位)
        "char_jinwen_svg": null,             // SVG 路径 (50 件 stretch goal)
        "meaning": "君王 / 王后, 商人称女性祖先为'后'",
        "caster_ref": null,                  // 若该字是铸主名, 关联 §7 学术地位的 caster 字段
        "cross_artifacts": ["fuhao_xiaozun"] // 此字也在其他器中出现 (跨器轨迹)
      },
      {
        "char_zh": "母",
        "char_modern": "母",
        "char_jinwen": "𠂉",
        "meaning": "母亲",
        "caster_ref": null,
        "cross_artifacts": ["simu_xin_ding", "fuhao_fang_jia"]
      },
      {
        "char_zh": "戊",
        "char_modern": "戊",
        "char_jinwen": "戊",
        "meaning": "天干第五位, 商人庙号; 此处指武丁王后妇妌庙号",
        "caster_ref": "妇妌",
        "cross_artifacts": []
      }
    ],
    "academic_consensus": "1959 年起郭沫若释为'司母戊', 后世通行; 2011 后中国国家博物馆改名'后母戊', 当前主流学派 (李学勤等) 支持。",
    "academic_controversies": [
      {
        "topic": "'后' vs '司' 释读",
        "schools": [
          {"school": "郭沫若 / 容庚 (主'司')", "view": "'司' 释为'祭祀', 司母 = 祭祀母亲"},
          {"school": "李学勤 / 杜廼松 (主'后')", "view": "'后' 释为'王后', 后母 = 王后母亲"}
        ],
        "references": ["李学勤《新出青铜器研究》"]
      }
    ]
  }
}
```

### 6.2 JSON 路径 (无铭文情况)

```json
{
  "inscription": {
    "has": false,
    "text": null,
    "char_count": 0,
    "summary": "无铭文"
  },
  "inscription_detail": {
    "has": false,
    "note": "商代晚期方尊多数无铭, 此器亦然"
  }
}
```

### 6.3 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `inscription.has` | ✅ | bool | 是否有铭文 (含族徽/日名) |
| `inscription.text` | ✅ if has | string | 原始铭文 |
| `inscription.char_count` | ✅ | number | 字数 (无铭则 0) |
| `inscription_detail.original_text` | ✅ if has | string | 原文 (繁体/异体均可) |
| `inscription_detail.modern_text` | ✅ if has | string | 现代汉字隶定 |
| `inscription_detail.vernacular` | optional | string | 白话翻译 (大意) |
| `inscription_detail.jinwen_stage` | ✅ if has | enum | "商代金文" / "西周早期金文" / "西周中期金文" / "西周晚期金文" / "春秋金文" / "战国金文" |
| `inscription_detail.jicheng_id` | optional | string | 《殷周金文集成》编号 (5 位数字) |
| `inscription_detail.tushijicheng_id` | optional | string | 《商周青铜器铭文暨图像集成》编号 |
| `inscription_detail.rubbing_url` | optional | string | 拓片图 URL (CC license 或 PD) |
| `inscription_detail.rubbing_license` | optional | enum | "CC0" / "CC-BY" / "CC-BY-SA" / "PD" |
| `inscription_detail.characters` | ✅ if has & char_count ≤ 30 | object[] | 字字释读 (字数多的器物可只列高频字) |
| `inscription_detail.academic_consensus` | optional | string | 当前主流学派立场 |
| `inscription_detail.academic_controversies` | optional | object[] | 学术争议 (若有) |

### 6.4 长铭文处理策略

| 字数 | characters 数组要求 |
|------|---------------------|
| 1-30 字 (微短铭) | 必填全部字 |
| 31-100 字 (中铭) | 必填全部字, 但 `cross_artifacts` 字段可只填首次出现的 |
| 101-300 字 (长铭) | 必填首 30 字 + 关键人名/铸主字, 其余可留 TODO |
| 300+ 字 (史诗铭, 毛公鼎 499 / 史墙盘 284) | 必填首 50 字 + 关键字 + 段落分隔 |

### 6.5 重点长铭器物 (v3 必做完整释读)

| 器物 | 字数 | jicheng_id | 备注 |
|------|------|------------|------|
| 何尊 | 122 | 06014 | "宅兹中或" 杀手锏 (Phase B4 长卷专题) |
| 大盂鼎 | 291 | 02837 | 周康王 |
| 毛公鼎 | 499 | 02841 | 周宣王, 史诗铭 |
| 史墙盘 | 284 | 10175 | 西周中期 |
| 大克鼎 | 290 | 02836 | 周孝王 |
| 散氏盘 | 357 | 10176 | 西周晚期土地契约 |
| 虢季子白盘 | 111 | 10173 | 西周宣王战功 |

### 6.6 填充指南

**Source**:
- 中国社科院考古所《殷周金文集成》 (jicheng_id 必查)
- 张亚初《殷周金文集成引得》
- 学术论文 / 复旦大学出土文献中心数据库

**Anti-hallucination**:
- ❌ 不能编造铭文释读 — 必须有学术出处
- ❌ 不能给"宅兹中或" 配现代意识形态解读 ("中国梦"等)
- ✅ 严格写学界主流释读

---

## 7. 字段 #6: 用途历史 (Usage History)

### 7.1 JSON 路径

```json
{
  "purpose": "祭祀礼器",                  // v1 已有
  "usage_history": {
    "primary_purpose": "祭祀礼器",
    "ritual_scene": "太牢祭祀",           // 关联 §6 用途场景的 5 套场景之一
    "ritual_position": "九鼎首位",        // 在场景中的"位"
    "ritual_grade": "天子之礼",           // 列鼎制度等级
    "user_class": "商王 (祖庚或祖甲)",     // 使用者身份
    "ritual_text_refs": [
      "《周礼·秋官·小行人》",
      "《礼记·王制》九鼎八簋制"
    ],
    "transmission_in_use": "铸成后短期内使用于商王宗庙祭祀, 后随王陵区埋入地下"
  }
}
```

### 7.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `purpose` | ✅ | string | v1 兼容: 笼统用途 |
| `usage_history.primary_purpose` | ✅ | enum | "祭祀礼器" / "燕飨礼器" / "朝聘礼器" / "军礼器" / "葬礼明器" / "实用器" / "乐器" |
| `usage_history.ritual_scene` | optional | enum | "太牢祭祀" / "燕飨礼" / "朝聘礼" / "军礼" / "葬礼" / null |
| `usage_history.ritual_position` | optional | string | 在场景中的具体位置 |
| `usage_history.ritual_grade` | optional | enum | "天子之礼" / "诸侯之礼" / "卿大夫之礼" / "士之礼" / null |
| `usage_history.user_class` | optional | string | 使用者身份 |
| `usage_history.ritual_text_refs` | optional | string[] | 礼制文献引用 |
| `usage_history.transmission_in_use` | optional | string | 使用期间的简史 |

### 7.3 填充指南

**Source**: 《周礼》 / 《礼记》 / 学术论文中"礼器使用研究" 章节

**Anti-hallucination**:
- ❌ 不能编造"九鼎之首" 称号 — 实际上九鼎制是按尺寸递减,不是"首"
- ✅ 严格按《周礼》记载, 不主观增加

---

## 8. 字段 #7: 学术地位 (Academic Status)

### 8.1 JSON 路径

```json
{
  "academic_status": {
    "representativeness": "商代晚期方鼎最高代表; 商代青铜礼器之巅峰",
    "dating_value": "确立商代晚期范铸法工艺标准; 鼎制起源之关键实物",
    "scholarly_consensus": "公认商代最重要礼器; 1939 出土即引发国际关注",
    "primary_caster": "妇妌(武丁王后)的子嗣 (祖庚或祖甲), 商王朝核心",
    "primary_caster_ref": "祖庚_or_祖甲",
    "related_casters": ["妇妌", "武丁"],
    "key_scholars": [
      {"name": "郭沫若", "contribution": "1939-1959 释为'司母戊', 确立早期解读"},
      {"name": "李学勤", "contribution": "2000s 改释为'后母戊', 现行主流"}
    ],
    "key_papers": [
      {
        "title": "司母戊鼎与商代后期王室祭礼",
        "author": "杜廼松",
        "journal": "《文物》",
        "year": 1985,
        "ref": "《文物》1985年第3期"
      }
    ]
  }
}
```

### 8.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `representativeness` | ✅ | string | 在品类中的代表性 (例"商代方鼎之最") |
| `dating_value` | optional | string | 断代学术价值 |
| `scholarly_consensus` | optional | string | 学界主流共识 |
| `primary_caster` | optional | string | 主要铸主 (从铭文或学术推定) |
| `primary_caster_ref` | optional | string | 铸主 ID (关联 §7 铸主档案) |
| `related_casters` | optional | string[] | 相关人物 |
| `key_scholars` | optional | object[] | 关键学者 |
| `key_papers` | optional | object[] | 关键论文 (≤ 3 篇) |

### 8.3 填充指南

**Source**: 学术综述 / 博物馆官方介绍 / Google Scholar

**Anti-hallucination**:
- ❌ 不能虚构"国宝守护者" 等头衔
- ✅ 若不确定铸主, 用"商王 (推定)" + `confidence: "推测"`

---

## 9. 字段 #8: 传承流转 (Provenance Timeline)

### 9.1 JSON 路径

```json
{
  "provenance_timeline": [
    {
      "year": "约 -1200",
      "event": "铸造",
      "location": "商王朝铸造作坊 (殷墟)",
      "actor": "祖庚或祖甲委托",
      "evidence": "铭文'后母戊'"
    },
    {
      "year": "约 -1100",
      "event": "埋藏",
      "location": "殷墟王陵区附近",
      "actor": "商王朝",
      "evidence": "出土于殷墟二期文化层"
    },
    {
      "year": "1939-03",
      "event": "出土",
      "location": "河南安阳武官村",
      "actor": "吴希增 (村民)",
      "evidence": "Wikipedia EN: Houmuwu_ding"
    },
    {
      "year": "1939-1946",
      "event": "回埋避日军",
      "location": "河南安阳",
      "actor": "当地村民",
      "evidence": "1946 重新挖出"
    },
    {
      "year": "1946",
      "event": "入藏中央博物院 (南京)",
      "location": "南京",
      "actor": "中央博物院筹备处",
      "evidence": "档案: 中博 接收 第 X 号"
    },
    {
      "year": "1959",
      "event": "调归中国历史博物馆 (今国博)",
      "location": "北京",
      "actor": "文化部",
      "evidence": "国博官方记录"
    }
  ]
}
```

### 9.2 字段说明

每条 event:

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `year` | ✅ | string | YYYY 或 YYYY-MM 或 "约 -XXXX" |
| `event` | ✅ | string | 事件描述 (动词) |
| `location` | ✅ | string | 地点 |
| `actor` | optional | string | 操作者 (人/单位) |
| `evidence` | optional | string | 证据来源 |

### 9.3 海外流散文物的特殊处理

例: 某青铜器在大英博物馆

```json
[
  {"year": "约 -1100", "event": "铸造", "location": "商王朝"},
  {"year": "约 -1100", "event": "埋藏", "location": "殷墟"},
  {"year": "约 1900", "event": "盗掘", "location": "河南安阳", "actor": "盗墓者", "evidence": "无明确档案"},
  {"year": "1903", "event": "流出国境", "location": "上海港口", "actor": "古董商 X", "evidence": "海关档案"},
  {"year": "1905", "event": "入藏大英博物馆", "location": "伦敦", "actor": "大英博物馆", "evidence": "BM Acquisition Record"},
  {"year": "1905 - 至今", "event": "陈列于大英博物馆 33 号厅", "location": "伦敦"}
]
```

### 9.4 填充指南

**Source**:
- 国内文物: 国博/上博/陕历博等馆的入藏档案 (官方资料)
- 海外文物: 博物馆 Provenance Record (大英博物馆 / MET 都有 Open Data)
- 流散研究: 王世襄《中国流散海外青铜器》

**Anti-hallucination**:
- ❌ 不能虚构"被某八国联军X X" — 必须有档案
- ✅ 不确定 → 留 gap (timeline 里两个 event 之间断开) + `evidence: null`

---

## 10. 字段 #9: 关联文物 (Related Artifacts)

> ★ 这是 v3 跨维度联动的核心数据基础

### 10.1 JSON 路径

```json
{
  "related_artifacts": [
    {
      "id": "simu_xin_ding",
      "name_zh": "司母辛鼎",
      "relation_type": "same_mother_group",   // 关联类型
      "reason": "同为商王武丁妻妾庙号鼎; 司母戊为正室妇妌, 司母辛为妻妾妇好",
      "strength": "strong"
    },
    {
      "id": "fuhao_xiaozun",
      "name_zh": "妇好鸮尊",
      "relation_type": "same_dynasty_close_period",
      "reason": "均出自殷墟二期, 同属武丁中后期王室器",
      "strength": "medium"
    },
    {
      "id": "siyang_fangzun",
      "name_zh": "四羊方尊",
      "relation_type": "same_form_subtype",
      "reason": "同为商代晚期大型方器, 形制风格相近",
      "strength": "medium"
    },
    {
      "id": "fanglei_huishirentou",
      "name_zh": "虎食人卣",
      "relation_type": "same_distinctive_pattern",
      "reason": "同含'虎噬人头' 罕见纹饰, 学界比对常引",
      "strength": "strong"
    },
    {
      "id": "yongding_si",
      "name_zh": "庸鼎四",
      "relation_type": "same_excavation_site",
      "reason": "同出殷墟王陵区 (虽具体墓葬不同)",
      "strength": "weak"
    }
  ]
}
```

### 10.2 关联类型字典

| `relation_type` | 含义 | 用途 |
|-----------------|------|------|
| `same_excavation_group` | 同墓 / 同坑 | 强关联, 用于"同坑兄弟"导航 |
| `same_excavation_site` | 同遗址 (不同墓) | 中关联 |
| `same_mother_group` | 同主人 (如妇好系) | 强关联, 用于铸主档案 |
| `same_caster` | 同铸主 (有铭) | 强关联 |
| `same_form_subtype` | 同子型 (如方尊) | 中关联, 用于形制 Pokédex |
| `same_distinctive_pattern` | 同罕见纹饰 (如虎噬人头) | 强关联 (用于纹饰族) |
| `same_main_pattern` | 同主纹 (如饕餮) | 弱关联 (太普遍) |
| `same_dynasty_close_period` | 同朝代近期 | 中关联 |
| `same_ritual_scene` | 同礼仪场景 (太牢列鼎组) | 强关联 |
| `cited_together_academically` | 学界常共同引用 | 强关联 |
| `contrastive_pair` | 学术对照常组 | 中关联 |
| `derivative_form` | 形制演化关系 | 强关联 |

### 10.3 强度等级

- `strong`: 用户应该看到这条
- `medium`: 用户可看
- `weak`: 不主动推, 但可在"全部相关" 列出

### 10.4 填充要求

- 每件文物至少 3 个 related (避免孤岛)
- 至少包含 2 种不同的 `relation_type`
- 至少 1 个 `strong` 关联
- 可以指向"待补" id (该 id 暂未在 v3 中, 但应在 v4 补全) — 标 `confidence: "推测"`

### 10.5 填充指南

**Source**: 学术综述中"相关器物" 章节 + 同墓器物群知识 + Domain Researcher 横向比对

**典型 strong 关联**:
- 妇好墓 5 件鼎组 (内部相互 related)
- 曾侯乙墓乐器组合 (编钟/编磬/笙鼓等)
- 三星堆青铜面具组合 (纵目/横目/平面)
- 周王列鼎组合 (大盂鼎/大克鼎等)

---

## 11. 字段 #10: 照片库 (Image Library)

### 11.1 JSON 路径

```json
{
  "image_urls": [                           // v1 兼容字段
    {
      "url": "https://upload.wikimedia.org/wikipedia/commons/x/xx/Houmuwu_ding_full.jpg",
      "source": "Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "license_url": "https://creativecommons.org/licenses/by-sa/4.0/",
      "caption": "后母戊鼎全景, 国博展柜",
      "credit": "User:Editor at Wikimedia Commons",
      "view": "overview"                    // overview / detail_pattern / detail_inscription / scene
    },
    {
      "url": "https://upload.wikimedia.org/wikipedia/commons/y/yy/Houmuwu_ding_pattern_detail.jpg",
      "source": "Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "caption": "腹壁饕餮纹局部, 高浮雕",
      "view": "detail_pattern"
    },
    {
      "url": "https://upload.wikimedia.org/wikipedia/commons/z/zz/Houmuwu_ding_inscription.jpg",
      "source": "Wikimedia Commons",
      "license": "PD",
      "caption": "腹内壁'后母戊'三字铭文拓本",
      "view": "detail_inscription"
    }
  ]
}
```

### 11.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `url` | ✅ | string | 直接指向图片文件 (不是 category 页) |
| `source` | ✅ | string | "Wikimedia Commons" / "British Museum Open Data" / "MET Open Access" |
| `license` | ✅ | enum | "CC0" / "CC-BY" / "CC-BY-SA" / "PD" / "British Museum CC-BY-NC-SA" / 其他 |
| `license_url` | optional | string | License URL (合规要求) |
| `caption` | ✅ | string | 中文说明 |
| `credit` | optional | string | 拍摄者/上传者 |
| `view` | ✅ | enum | "overview" / "detail_pattern" / "detail_inscription" / "detail_accessory" / "scene" / "rubbing" |

### 11.3 v3 要求

- 每件文物 1-3 张图
- 至少 1 张 "overview" 全景
- 国宝级 (禁出境 + 一级) 必须 ≥ 2 张
- 长铭器物必须含 1 张 "detail_inscription" 或 "rubbing"

### 11.4 License 红线

✅ 允许:
- Wikimedia Commons CC0 / CC-BY / CC-BY-SA
- British Museum CC BY-NC-SA 4.0 (商用需另行授权, 但 portfolio demo 允许)
- MET Open Access (CC0)
- 国立故宫博物院 Open Data (CC0)
- Smithsonian Open Access (CC0)
- 国家文物局发布的官方图 (查具体许可)

❌ 禁止:
- Baidu Baike 图 (license 不明)
- 国内博物馆官网图 (大多 © All Rights Reserved)
- 私人摄影博客图 (除非明确 CC license)

### 11.5 填充指南

**Source**:
- 主要: Wikimedia Commons (`https://commons.wikimedia.org/wiki/Category:<artifact_name>`)
- 次要: 大英博物馆 Collection Online / MET / Smithsonian
- 找不到: 留 TODO `image_urls: []` + comment "TODO: 寻找 CC 图源"

---

## 12. 字段 #11: 3D / 视频 (Media 3D/Video) — 50 件 stretch goal

### 12.1 JSON 路径

```json
{
  "media_3d_video": [
    {
      "type": "3d_model",
      "url": "https://sketchfab.com/3d-models/houmuwu-ding-xxx",
      "source": "Sketchfab",
      "license": "CC-BY",
      "creator": "国博数字化项目 / Sketchfab user",
      "embed_url": "https://sketchfab.com/models/xxx/embed",
      "caption": "后母戊鼎 360° 数字模型"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=xxx",
      "source": "国博官方视频",
      "license": "Standard YouTube License (仅 embed)",
      "caption": "后母戊鼎纪录片片段 5 分钟",
      "duration_sec": 312
    }
  ]
}
```

### 12.2 字段说明

| Field | Required | Type | 说明 |
|-------|----------|------|------|
| `type` | ✅ | enum | "3d_model" / "video" / "ar_anchor" |
| `url` | ✅ | string | 资源 URL |
| `source` | ✅ | string | 来源 |
| `license` | ✅ | enum | 见 §11.4 + "Standard YouTube License (embed only)" |
| `embed_url` | optional | string | embed URL (iframe 用) |
| `caption` | ✅ | string | 说明 |
| `duration_sec` | optional | number | 视频时长 (秒) |

### 12.3 v3 重点 50 件 (stretch)

按知名度 + 数字化可能性优先排序:
- 三星堆: 纵目面具 / 大立人 / 太阳轮 / 黄金权杖 (4 件)
- 曾侯乙墓: 编钟 / 鉴缶 / 尊盘 / 8 鼎 (10 件)
- 妇好墓: 鸮尊 / 司母辛鼎 / 妇好钺 / 妇好觥 (5 件)
- 殷墟系列: 后母戊鼎 / 子龙鼎 / 大方鼎 (5 件)
- 重要单器: 何尊 / 利簋 / 毛公鼎 / 大盂鼎 / 大克鼎 / 四羊方尊 / 四羊首铜瓿 (~15 件)
- 海外名器: 大英羊首罍 / 大都会盉 / 弗利尔毛公鼎拓本 (~10 件)

### 12.4 填充指南

**Source**:
- Sketchfab (`https://sketchfab.com/search?q=<artifact>+bronze`)
- 国博 / 故宫 / 上博的数字文物库 (查 license)
- YouTube 官方频道
- 部分博物馆官方 AR 应用 (Smithsonian)

**Anti-hallucination**:
- ❌ 不能写"高质量 3D 模型" 当占位 — 必须有真实 URL
- ✅ 找不到 → 留 `media_3d_video: []` 不算缺陷 (3D 不在必填范围)

---

## 13. data_sources 字段 (全器物级)

### 13.1 JSON 路径

```json
{
  "data_sources": [
    {
      "field": "basic.size, excavation_year, excavation_site",
      "source": "Wikipedia EN: Houmuwu_ding",
      "url": "https://en.wikipedia.org/wiki/Houmuwu_ding",
      "license": "CC BY-SA 4.0"
    },
    {
      "field": "inscription_detail.characters",
      "source": "中国社科院考古所《殷周金文集成》01703",
      "url": null,
      "license": "学术引用"
    },
    {
      "field": "patterns_detail",
      "source": "朱凤瀚《中国青铜器综论》第 4 章",
      "url": null,
      "license": "学术引用"
    },
    {
      "field": "provenance_timeline",
      "source": "国博官方介绍 + Wikipedia EN",
      "url": "https://www.chnmuseum.cn/...",
      "license": "fact citation"
    }
  ]
}
```

### 13.2 要求

- 至少 3 条 sources
- 必须涵盖 basic / patterns_detail / inscription_detail 三大类
- 每条 sources 必须有 `field` 指明覆盖范围

---

## 14. 完整 v3 schema 模板

```json
{
  "id": "houmuwu_ding",

  "name_zh": "后母戊鼎",
  "name_pinyin": "Hou Mu Wu Ding",
  "name_alt": ["司母戊鼎", "司母戊大方鼎"],
  "dynasty": "商",
  "period": "商代晚期",
  "approx_year": "约公元前1300-1046年",
  "excavation_year": "1939",
  "excavation_site": "河南省安阳市武官村殷墟遗址",
  "ancient_state": "商",
  "current_museum": "中国国家博物馆",
  "size": {
    "height_cm": 133,
    "width_cm": 79.2,
    "length_cm": 112,
    "weight_kg": 832.84
  },
  "type": "食器",
  "form_subtype": "方鼎",
  "patterns": ["饕餮纹", "夔龙纹", "云雷纹", "虎噬人头纹(耳)", "蝉纹"],
  "inscription": {
    "has": true,
    "text": "后母戊",
    "char_count": 3,
    "summary": "鼎腹内壁铸铭'后母戊'三字"
  },
  "purpose": "祭祀礼器",
  "craft": "范铸法",
  "rarity_level": "禁止出境",
  "story_brief": "...",
  "image_urls": [ ... ],

  "excavation_detail": { ... },         // §3
  "form_detail": { ... },               // §4
  "patterns_detail": { ... },           // §5
  "inscription_detail": { ... },        // §6
  "usage_history": { ... },             // §7
  "academic_status": { ... },           // §8
  "provenance_timeline": [ ... ],       // §9
  "related_artifacts": [ ... ],         // §10
  "media_3d_video": [ ... ],            // §12

  "data_sources": [ ... ]               // §13
}
```

---

## 15. Anti-Hallucination 总则

### 15.1 三条铁律

1. **能找到的, 必有 source URL** — 在 `data_sources` 显式标注
2. **找不到的, 标 null + TODO** — 不编造
3. **争议的, 注明学派 + confidence** — 不一边倒

### 15.2 常见幻觉模式 (避免)

| 幻觉模式 | 例子 | 修正 |
|---------|------|------|
| 编造尺寸 | "高约 130cm" 当精确值 | 找不到精确 → null |
| 编造铸主 | "由某商王亲铸" 无史料 | "商王 (推定)" |
| 编造发现细节 | "1939-03-19" 精确日期无档案 | "1939" |
| 编造纹饰含义 | "象征至高无上的王权" cliche | 引用具体学派 |
| 编造关联文物 | 凭名字相似乱关联 | 只列学术常引的对照 |
| 编造铭文释读 | 给铭文意识形态解读 | 严格学界主流 |
| 美化语言 | "气势磅礴, 王者风范" | 具体特征 + 学术定位 |

### 15.3 Critic Loop 流程

Phase A 期间, Content Auditor 抽样 30 件 (10% of 300) 检查:
1. 每个字段是否有 source
2. 关键事实是否与 source 一致
3. 是否有"美化语言" 或"编造细节"
4. License 是否合规

抽样失败件 → Data Engineer 必须 fix 后才能提交。

---

## 16. 字段填充优先级 (300 件 / 7h 内)

### 16.1 P0 (必填, 缺则不算合格)
- `basic` 全部字段
- `patterns_detail.main` (至少 1 个主纹 + icon_ref)
- `inscription.has` (有/无铭文必须标)
- `purpose`
- `rarity_level`
- `related_artifacts` (至少 3 个)
- `data_sources` (至少 3 条)
- `image_urls` (至少 1 张)

### 16.2 P1 (强烈推荐, 80%+ 填充率)
- `excavation_detail.discovery_date / method`
- `form_detail.distinctive_features`
- `patterns_detail.secondary / ground`
- `usage_history.primary_purpose`
- `academic_status.representativeness`
- `provenance_timeline` (至少 3 个 event)

### 16.3 P2 (可选, 50% 填充率)
- `inscription_detail.characters` (有铭长铭必填; 短铭可填可不填)
- `academic_status.key_scholars / key_papers`
- `provenance_timeline` 详细 (5+ events)
- `image_urls` (2-3 张)

### 16.4 P3 (Stretch, 30% 填充率)
- `media_3d_video` (50 件)
- `patterns_detail.local / edge`
- `inscription_detail.characters` 完整释读 (长铭 7 件)
- `academic_status.academic_controversies`

---

## 17. Data Engineer 5 个 agent 分工 (来自 night-plan-d1)

| Agent | 范围 | 文物数 |
|-------|------|--------|
| DE-1 | 商代 (5 v1 升级 + 55 新) | 60 |
| DE-2 | 西周 (7 v1 升级 + 55 新) | 62 |
| DE-3 | 东周春秋战国 (6 v1 升级 + 55 新) | 61 |
| DE-4 | 秦汉 + 三星堆 (7 v1 升级 + 55 新) | 62 |
| DE-5 | 边远文化 + 海外馆藏 (55 新) | 55 |
| **总计** | **25 v1 升级 + 275 新** | **300** |

每个 agent 按本 schema 填充 60 件, 平均 4-5 分钟/件 → 4-5 小时完成。

---

## 18. 验证 checklist (Data Engineer 自查)

每件文物提交前自查:
- [ ] `id` 唯一, snake_case
- [ ] 必填字段全部填充 (§16.1)
- [ ] 至少 3 个 `related_artifacts`
- [ ] 至少 3 条 `data_sources`
- [ ] 至少 1 张 image_urls + license 合规
- [ ] `patterns_detail.main` 至少 1 个, 含 `icon_ref` (对照 §5.3)
- [ ] `inscription.has` 明确 (true/false)
- [ ] 若 has=true, `inscription_detail.jicheng_id` 有值 (除非真找不到)
- [ ] 无编造细节 (date / numbers / scholars)
- [ ] 无 cliche 语言 ("气势恢宏" 等)

---

> 完。Data Engineer 按本 schema + `night-plan-d1.md §A` 的 5 人分工开工。Domain Researcher 在 Phase A 中段做 schema 一致性 spot check, 在 Phase A 末段做 30 件抽样审核。
