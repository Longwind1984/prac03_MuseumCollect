# AIGC 图片统一处理 Pipeline

## 用户视觉要求(2026-05-21,用户原话)

> "最终需要的效果是不同的器物之间应该有一个同样的背景色、同样的清晰度、同样的色调、同样的处理方案,在视觉上看上去统一,但同时又有各个器物的差异化、识别度。"

参考标杆:MoMA / Smithsonian Open Access / 卢浮宫数字馆藏 / 故宫文创 — 馆藏目录页那种"看一眼就是同一个系列"的视觉一致性。

---

## 目录架构(image-fetcher 完成后由 organize agent 重组)

```
assets/photos/
├── raw/                       # 原始下载(EXIF + 原色 + 原分辨率)
│   ├── houmuwu_ding.jpg       # 1200px width thumb from Wikimedia
│   ├── siyang_fangzun.jpg
│   └── ...
├── web-300/                   # catalog grid 用(300px wide, sRGB, jpg)
│   ├── houmuwu_ding.jpg
│   └── ...
├── web-600/                   # dashboard 银幕卡用(600px wide)
│   ├── houmuwu_ding.jpg
│   └── ...
├── aigc-canonical/            # ★ AIGC 处理后落地 — 当前为空,待 v5
│   ├── README.md              # 标准说明(下方)
│   └── (空,等 AIGC pipeline 产出)
└── manifest.json              # 全表索引:每个 id 的 raw / web-300 / web-600 / canonical 状态
```

`assets/photos/aigc-canonical/README.md` 内容要点:
- 这一目录的图必须满足下方"统一规格"
- 任何手动 / AIGC 处理产物 commit 到这里
- demo 渲染优先级:canonical > web-600 > web-300 > silhouette

---

## 统一规格(AIGC 处理目标)

| 维度 | 规格 |
|------|------|
| **背景色** | 单色平涂,#1a1a1f(深空灰)or #0e0e12(近黑)— 文物展厅黑底质感 |
| **背景一致性** | 所有图必须**精确**同色,容差 < ΔE 3。背景内不可有阴影/渐变/纹理 |
| **去背** | 文物轮廓干净,无残留地面 / 展架 / 玻璃反光 |
| **光照** | 模拟博物馆 3-point lighting:主光 45° 上方暖白(2800K)+ 补光弱柔白 + 轮廓光勾边 |
| **色调** | 青铜本色为主(#8a6a3c-#c2935a 之间),不强行偏黄或偏红;锈色(铜绿)忠实保留,不过度饱和 |
| **清晰度** | 主体最长边 ≥ 1000px;细节(纹饰刻线、铭文)清晰可读 |
| **格式** | JPG quality 85 / sRGB / EXIF 保留 contributor + license |
| **构图** | 居中,主体占画面 70-80%;留 10% 安全边距 |
| **比例** | 统一 4:5 竖版(适配 catalog card)+ 1:1 方版(适配 dashboard 银幕卡)各一份 |

---

## AIGC 工具链建议(v5 实施)

### 选项 1: 商用 API(快,质量稳)
- **Photoroom API** — 去背 + 替换背景 → 90% 用例够用,~$0.02/image,277 件 ~$5.5
- **Remove.bg + Adobe Firefly fill** — 去背 + 重打光,~$10 total
- **Topaz Gigapixel AI** — 清晰度增强,对低分辨率 Wikimedia 图必备

### 选项 2: 本地 ControlNet pipeline(慢,可控,免费)
- **rembg / BiRefNet** — 去背(开源,GPU 加速)
- **ComfyUI + Flux/SDXL + ControlNet (depth+canny)** — 重打光 + 保留轮廓
- **Real-ESRGAN x4** — 超分到 1200px

推荐工作流:
```
raw/<id>.jpg
  ↓ rembg → 文物 PNG + alpha
  ↓ ComfyUI ControlNet depth → 重打光 + 统一背景
  ↓ Real-ESRGAN → 超分到 1200px
  ↓ ImageMagick → 4:5 + 1:1 两版 crop + sRGB 标准化
  → aigc-canonical/<id>-portrait.jpg + <id>-square.jpg
```

### 选项 3: Nano Banana(国产视觉模型)— 待评估

---

## 差异化保留原则

统一只在**背景 / 光照 / 色调标定**层,**不动**:
- 器物本身的形态、纹饰、锈色、铭文(这些是核心识别度)
- 真实的损伤、修复痕迹(学术诚实)
- 文物年代特征(商代青铜不能"加饰"看起来像东周)

**红线**: 不可"想象式补全"。如三星堆纵目面具的眼柱完整存留即保留,缺损部分保留缺损,不可由 AIGC 补全为完整(那是文物造假)。

---

## Manifest 字段约定

每个 record 的 `image_urls[0]` 在 raw 完成后形如:
```json
{
  "category_url": "https://commons.wikimedia.org/wiki/Category:Hou_Mu_Wu_Ding",
  "wikimedia_filename": "File:Houmuwu_Ding_in_NMC.jpg",
  "direct_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/.../1200px-Houmuwu.jpg",
  "license": "CC BY-SA 4.0",
  "attribution": "Mountain (Wikimedia contributor)",
  "raw_path": "assets/photos/raw/houmuwu_ding.jpg",
  "web_300_path": "assets/photos/web-300/houmuwu_ding.jpg",
  "web_600_path": "assets/photos/web-600/houmuwu_ding.jpg",
  "canonical_path": null,
  "processing_history": [
    { "stage": "raw_fetch", "date": "2026-05-21", "by": "image-fetcher-v4" }
  ]
}
```

当 AIGC pipeline 处理完后:
```json
  "canonical_path": "assets/photos/aigc-canonical/houmuwu_ding-portrait.jpg",
  "processing_history": [
    { "stage": "raw_fetch", "date": "2026-05-21", "by": "image-fetcher-v4" },
    { "stage": "aigc_canonical", "date": "2026-05-25", "by": "user|comfyui-flux-rembg-realesrgan", "params": "..." }
  ]
```

---

## 实施时序

| 阶段 | 任务 | Agent | 状态 |
|------|------|-------|------|
| v4 H4 | 拉 Wikimedia raw 图 | image-fetcher | 跑中 |
| v4 H5(完成后) | 重组目录 raw/+web-300/+web-600/+空 canonical/,生成 manifest.json | organize-and-archive agent | 待 |
| v5 (后续) | AIGC 处理 raw → canonical(统一风格) | 用户决定:手动 / 商用 API / 本地 ControlNet | 待 |
| v5 (后续) | demo 渲染优先级改为 canonical > web-600 > web-300 > silhouette | builder | 待 |

---

## 为什么不让 image-fetcher 一次性都做

image-fetcher 已经 launched,正在跑(不可中途加约束)。即便我们能加,把 raw 抓取 + 多分辨率 + 统一风格 AIGC 处理塞同一个 agent 也:
1. 超 1h 跑时,32K output max 风险增加
2. AIGC 处理需要 GPU + 商用 API key,主流 agent 环境难以保证
3. AIGC 风格目标需要**用户视觉反馈**确认(几张样图试调),不应一次性 batch

正确策略:**raw fetch → 重组 → 视觉样图试调 → 用户 OK → batch AIGC**。这一文档锁定整个 pipeline 设计。
