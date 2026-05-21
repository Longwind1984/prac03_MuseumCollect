# 图像处理 API/工具 性价比横评 v1

> 评估时间:2026-05-21  
> 目标:把 ~277 张 Wikimedia 青铜器原图统一为「博物馆展厅黑底 #1a1a1f + 3-point lighting + sRGB + 青铜本色」  
> 红线:**不可 AIGC 补全文物缺损**(三星堆纵目面具有眼柱则保眼柱,无眼柱不可瞎补)  
> 衡量准则(用户 verbatim):**性价比 = (视觉效果 × 中国大陆可达性 × 红线合规)/ 总成本**

---

## 1. TL;DR(200 字)

**一推荐:Photoroom Image Editing API** ($0.10/张 × 277 ≈ **$27.7**,略超 $20 预算但视觉一致性最高,有 batch + AI shadow + relight 一站式)。  
**二备选:本地 ComfyUI + BiRefNet 去背 + IC-Light v2 重打光 + Real-ESRGAN 超分**(零现金成本,RTX 4090 本地约 4-6h 跑完;不需要的话租 RunPod 4090 community $0.34/h × 5h ≈ **$1.7**)。  
**不要做:Adobe Firefly API**(企业级,$1000/月起步,工程集成 80-120h);**Nano Banana Pro / Wan2.5 image edit**(默认会"AI 想象式补全",红线高危,除非全过 prompt 强约束 + 人工校验)。

**决策矩阵(性价比综合分,满分 25)**

| 方案 | 成本 | 视觉一致性 | 中国可达 | 红线合规 | 实施门槛 | 综合 |
|------|------|----------|---------|---------|---------|------|
| **Photoroom Image Editing API** | 3 | 5 | 3 | 5 | 5 | **21** |
| **本地 ComfyUI + IC-Light v2** | 5 | 4 | 5 | 5 | 2 | **21** |
| Photoroom Remove BG + 手 PS 重打光 | 4 | 4 | 3 | 5 | 3 | 19 |
| RunPod + BiRefNet + IC-Light | 5 | 4 | 5 | 5 | 2 | 21 |
| Pebblely | 4 | 3 | 3 | 3 | 4 | 17 |
| ClipDrop Relight API | 3 | 3 | 3 | 5 | 4 | 18 |
| remove.bg + Firefly | 2 | 4 | 2 | 4 | 3 | 15 |
| Nano Banana Pro | 4 | 5 | 3 | 2 | 4 | 18(红线扣分) |
| 通义万相 Wan2.5 edit | 4 | 4 | 5 | 2 | 4 | 19(红线扣分) |
| 纯 CSS filter(D) | 5 | 1 | 5 | 5 | 5 | 21(但视觉 1 分一票否) |

---

## 2. 方法论

评估 5 维度,各 5 分:
- **成本**:277 张总价 < $5 = 5 分;$5-$20 = 4;$20-$40 = 3;$40-$100 = 2;>$100 = 1
- **视觉一致性**:背景同色度 ΔE、光照统一度、清晰度;参考 MoMA/Smithsonian/卢浮宫标杆
- **中国大陆可达性**:GFW 友好 = 5;偶尔抖动 = 3;需 VPN = 2;封锁 = 1
- **红线合规**:仅技术增强(去背/超分/relight 限定光源)= 5;部分调用会"想象式补全"= 3;默认 LLM 风生图(必补全)= 1
- **实施门槛**:即开即用 API = 5;调本地 GPU/ComfyUI = 2

**红线核心判定**:任何「文生图 / image-to-image with diffusion strength > 0.4」的模型默认会重绘文物本体,**必须避免**。安全的是:背景遮罩 + relight only(不动主体像素)+ 超分(只插值不生成新结构)。

---

## 3. 横向对比表

| 工具 | 单价 USD | 277 张总价 | 主要能力 | 中国大陆 | 红线 |
|------|---------|-----------|---------|---------|------|
| Photoroom Remove BG API | $0.02 | $5.54 | 仅去背 | 需代理 | 安全 |
| **Photoroom Image Editing API** | **$0.10** | **$27.7** | 去背 + relight + AI shadow + 换景 | 需代理 | 安全(可关闭生成模式) |
| remove.bg 200 credits | $0.23/张 | ~$64 | 仅去背 | 需代理 | 安全 |
| Slazzer API | $0.10-0.15 | $28-42 | 仅去背 | 需代理 | 安全 |
| Cutout.pro | ~$0.05/张(包月折算) | ~$14 | 去背 + 简单增强 | 部分可达 | 安全 |
| PicWish API | 50 免费 credits | <$10(若 50 张内免) | 去背 + AI 上色 | 部分可达 | 安全 |
| Pebblely | $19/月 500 张 | $19(一个月用完) | 去背 + 生场景 + 光照 | 需代理 | **高危**(默认重打光会改阴影颜色) |
| ClipDrop Relight API | 2 credits/张,$9/月 50 calls | ~$50(需买 1500 credits) | relight only | 需代理 | 安全 |
| Topaz Gigapixel(本地) | $99 一次性 | $99(超分 only) | 超分 4x-6x | 本地工具,可达 | 安全 |
| Adobe Firefly API | ~$0.08-0.10/张 + $1000/月起 | $1000+ | 全套生成 | 需代理 | 高危(默认 fill 会补全) |
| Nano Banana Pro (Gemini 3) | $0.134/张(batch $0.067) | $18.6-37 | 文本驱动图像编辑 | 需代理 | **高危** |
| 通义万相 Wan2.5 image edit | ~¥0.10-0.30/张(估) | ~¥30-90($4-13) | 文本驱动编辑 | **本土友好** | **高危** |
| 字节豆包 视觉 | 未单独图编 API 公开报价 | - | 主要 LLM | 本土友好 | - |
| Magic Studio(Canva)| 订阅,无独立 API | - | UI 操作为主 | 需代理 | 中等 |
| 本地 rembg(U2Net) | 免费 | $0 | 仅去背,边缘弱 | 全本地 | 安全 |
| 本地 BiRefNet | 免费 | $0 | 去背 SOTA(边缘强) | 全本地 | 安全 |
| **本地 ComfyUI + IC-Light v2 + BiRefNet + Real-ESRGAN** | 免费(若有 GPU)| **$0** | 一站式 | 全本地 | 安全(光源可控) |
| RunPod RTX 4090 community | $0.34/h | ~$1.7(5h) | 跑上面那套 | 需代理但本地下载即可 | 安全 |
| Photoshop Action 批处理 | 已订阅则 $0 | 已订阅 $0 | 人工 + 半自动 | 桌面工具 | 安全 |
| CSS filter(grayscale/sepia) | 免费 | $0 | 仅滤镜 | - | 安全但**杂背景仍在** |

---

## 4. 每方案详评

### 4.1 Photoroom Image Editing API ★ 一推荐
- **官方价**:$0.10/call;Plus Plan starts $20/月含基础额度,超出按 call 算。Image Editing API 一次调用即完成 去背 + relight + AI shadow + 换背景。
- **277 张估算**:$27.7(略超 $20 红线,但物超所值)。如果先做 5 张样图($0.5)、批 232 张($23.2),共 $23.7 ≈ 预算上限。
- **批量**:支持,但无明示批量折扣;高频用户走 Pro $20/月。
- **质量**:e-commerce 级别成熟方案,对青铜/陶瓷等硬质表面相当好;阴影是「AI 智能阴影」可关。可指定背景纯色 hex(`bg_color=#1a1a1f`)。
- **红线**:**安全** — 通过 API 参数控制:`shadow=ai|none`、`background.color=#1a1a1f` 即可。**关键**:**不要**调 `expand=true` 或 `generative=true`(那才会补全)。
- **中国大陆**:站点 photoroom.com 在国内访问通常需代理;API host 也走海外 CDN。**建议在 GitHub Actions / Vercel function 里跑,不要从国内本地直连**。
- **结论**:首选,因为「一站式」+「不调生成模型」=红线可控。

### 4.2 本地 ComfyUI + BiRefNet + IC-Light v2 + Real-ESRGAN ★ 二备选
- **成本**:已有 GPU 则 $0;租 RunPod 4090 community $0.34/h,277 张全跑约 4-5h = **$1.4-1.7**。
- **质量**:BiRefNet 2025 SOTA,对青铜锈色细节/铭文刻线保留度高于商业 API;IC-Light v2 是「mask-conditioned relighting」,**只改光不改主体几何**(红线天然合规);Real-ESRGAN 把 1000-1200px 提到 2000-2400px 清晰度足够。
- **红线**:**最安全** — IC-Light v2 用 mask + 光源条件相做 relight,主体像素不变(diffusion strength 可设 0,只做光照混合)。三星堆面具有几个眼柱就出几个。
- **中国大陆**:全本地,无需任何海外服务;模型从 HuggingFace 镜像(hf-mirror.com 国内可达)下载即可。
- **门槛**:**最高** — 需要装 ComfyUI、ControlNet、IC-Light v2 节点、BiRefNet 模型、Real-ESRGAN 模型,首次配环境 2-4h,跑通 workflow 1-2h。
- **建议**:portfolio piece 视为加分项,但 demo night 前没时间则放弃,走 Photoroom。
- **batch 用量**:单张 4090 上 BiRefNet 350ms + IC-Light 8s + ESRGAN 4s ≈ 13s/张 × 277 ≈ 60 min 纯 GPU 时间;含 I/O + workflow overhead 实际 4-5h。

### 4.3 Pebblely
- $19/月 500 张,277 张一个月用完。
- **致命**:其「生场景」是 diffusion 重新生成背景 + 反射 + 阴影,会**改变文物表面光照分布**,导致锈色伪饰(原本绿锈被生成模型理解为「饰物」补全)。**红线高危**。
- 仅适合「我有清晰主体只想配个好看场景」,不适合「严肃文物档案」。

### 4.4 ClipDrop Relight API
- 2 credits/张,$9/月 50 calls 起,跑 277 张需要更高档套餐 ≈ $50-80。
- 单独 relight 工具,需先用别的 API 去背 → 两套钱。
- 性价比劣于 Photoroom Image Editing(后者一调全做)。

### 4.5 remove.bg + Adobe Firefly Generative Fill
- remove.bg 单价 $0.23/张 × 277 = **$64**;Firefly API 是企业产品,$1000/月起,工程集成 80-120h $8000-18000(SudoMock 估算)。
- **直接放弃** — 价格 + 集成成本 + 红线(Firefly fill 会想象式补全)三杀。

### 4.6 Nano Banana Pro (Gemini 3 Pro Image)
- 官方 $0.134/张,Batch API 24h 处理价格减半 $0.067/张 × 277 = **$18.6**(达 $20 预算)。
- **致命红线**:LLM-driven image edit,即使 prompt 写「只换背景不动主体」,实际输出**主体像素会被重绘**。三星堆面具的眼柱可能被「想象」加上对称的;铭文可能被「修补」(看起来更工整但=造假)。
- 想用必须每张人工 diff 比对,277 张人工校验时间反超手工 PS。

### 4.7 通义万相 Wan2.5 image edit
- 阿里百炼提供,**中国大陆原生友好**,价格约 ¥0.10-0.30/张(根据 wan2.5 通用图像编辑,实际计费按 dashscope 配额)。
- 同样 LLM-driven edit,**红线同 Nano Banana** — 默认会重绘主体。
- 用法上需严格写 prompt + 人工校验,工作量大。

### 4.8 字节豆包 / 商汤 SenseMirage
- 当前(2026-05)公开未见独立、稳定的「图像编辑 + relight」API 报价表;主推 LLM/视频。**跳过**。

### 4.9 Topaz Gigapixel(超分单点工具)
- 一次性 $99,本地批跑,质量是行业金标。**不是主方案,但作为「最后一步超分」的可选补充**(尤其有些 Wikimedia 原图只有 600-800px,需要补到 1000px+)。
- 替代:Real-ESRGAN(免费)质量已经接近。

### 4.10 PicWish / Cutout.pro / Slazzer 小厂
- 价格便宜但**边缘质量** + **API 稳定性** + **国内可达性**都比 Photoroom 差,且只解决去背,不解决统一 relight。**不推荐主用**,可作为 5 张样图试色对照组。

### 4.11 Photoshop / Affinity Action 批处理(选项 C)
- 人工做 5 张参考(每张 15-30 min)+ 余 272 张 Action 跑。
- 致命:**去背环节** PS 自动选区对青铜复杂轮廓(如方鼎四足、剑格细缝)成功率约 60-70%,余下需要人工 mask,平摊 5-10 min/张,272 张 = 22-45h **不可接受**。
- 仅适合后期 5-10 张样图微调。

### 4.12 纯 CSS filter(选项 D)
- 0 成本但「**杂背景仍在**」违反用户「同样的背景色」要求 — **不达标**。可作为 PWA 的 fallback CSS(当 canonical 缺失时套个深灰 overlay 凑合显示),**不是 canonical 制作方案**。

---

## 5. 红线检查表

| 操作 | 主体像素是否会变 | 红线风险 | 推荐用法 |
|------|----------------|---------|---------|
| 去背 mask(rembg/BiRefNet/Photoroom Remove BG) | 否(只输出 alpha) | 安全 | 全部 |
| 纯色背景填充 | 否(只填外像素) | 安全 | 全部 |
| AI shadow 投影合成 | 否(地面像素生成,非主体) | 安全 | 可用,但参数 `shadow=ai` 控强度 |
| IC-Light v2 mask-relight | **否**(只调每像素亮度/色温) | 安全 | 推荐 |
| Real-ESRGAN 超分 | 是,但只插值/锐化,无新结构 | 低风险 | 推荐,但保留原图 |
| Topaz Photo AI denoise | 同上 | 低风险 | 可选 |
| Photoroom **Image Editing** 默认调用 | 取决于参数 | 中等 — `bg_color` 指定为纯色 + `expand=false` + `generative=false` 安全 | 必须显式关 generative |
| Photoroom Image Editing `expand=true` | **是** | **高危** | 禁用 |
| Pebblely 生场景 | **是**(主体边缘会被反射/阴影改色) | 高危 | 禁用 |
| Adobe Firefly Generative Fill | **是** | 高危 | 禁用 |
| Nano Banana Pro edit | **是**(LLM 重绘) | 高危 | 禁用 |
| 通义万相 Wan2.5 edit | **是** | 高危 | 禁用,除非 mask 严格限定区域 |
| ComfyUI img2img(diffusion strength > 0.2) | **是** | 高危 | 禁用 |

**核心原则:任何带「生成」字样的功能默认关闭;只用「分割 + 滤镜 + 重打光 + 超分」四类操作。**

---

## 6. 最终推荐 + 实施步骤

### 推荐:Photoroom Image Editing API(主)+ Real-ESRGAN(本地后处理超分)

**为什么**:
1. **红线**:API 调用显式参数控制,不触发 generative。
2. **成本**:$27.7,虽超 $20 但与「本地 ComfyUI 4-6h 折人力成本」相比仍更划算(portfolio 时间宝贵)。
3. **门槛**:HTTP POST 即可,十几行 Python 跑完。
4. **样图反馈快**:5 张样图 $0.5,30 分钟内可看到效果。

### 实施步骤(3-5 步)

1. **样图试调**(预算 $0.5,时间 30 min):  
   选 5 张代表器:后母戊鼎、越王勾践剑、三星堆大立人、何尊、曾侯乙编钟。每张用 Photoroom Image Editing API 跑 1 次,参数:`bg_color=#1a1a1f`,`shadow=ai_soft`,`generative=false`,`expand=false`,`size=1200x1500`(4:5)。

2. **用户视觉评审**:把 5 张样图并排放进 `assets/photos/aigc-samples/`,让用户挑出最不满意的 → 调参数(色温 / shadow 强度 / mask feather)再跑 1-2 轮。

3. **批量跑**(预算 $25,时间 1-2h):  
   写 `scripts/photoroom-batch.py` 读 `manifest.json` 里所有 `raw_path`,并发 5 (Photoroom 默认 RPS 限制宽松),输出到 `aigc-canonical/<id>-portrait.jpg`(4:5)+ `<id>-square.jpg`(1:1 一次第二次调用)。落地后更新 manifest `canonical_path` + `processing_history`。

4. **本地超分**(预算 $0,时间 30 min):对低分辨率(<1000px)那批用 Real-ESRGAN x2 提到 1200px+。

5. **抽检 + commit**:抽 20 张人工肉眼检查红线(尤其三星堆纵目面具、损坏件、有铭文件),通过后 git commit。

### 备用方案(如果 Photoroom 效果不达 ΔE3)

切换到本地 ComfyUI + IC-Light v2:
1. 装 ComfyUI + ComfyUI-Manager,装 BiRefNet 节点 + IC-Light v2 节点 + Real-ESRGAN 节点
2. 用 OpenArt 现成的「Relight with IC-Light and Background as Lighting Source」workflow 改造:背景换 #1a1a1f 纯色,光源用 3-point 模拟图(自己造一张 1024x1280 的「左上 45° 暖白 + 右下补光 + 顶部轮廓光」位图作 light_source)
3. RunPod 启 4090 community 实例 ~$0.34/h
4. 5h 跑完 277 张

---

## 7. 样图 plan(commit 前必跑)

**5 张样图器物**(覆盖各种难度):
1. **后母戊鼎** — 大件、对称、有铭文 → 测背景平整度 + 铭文清晰度
2. **越王勾践剑** — 长条、剑格有错金纹 → 测细节锐度 + 金色保真
3. **三星堆大立人** — 全身雕像、有底座 → 测多组件去背
4. **何尊** — 中型尊、有「宅兹中国」铭文 → 测铭文 OCR 级清晰
5. **曾侯乙编钟** — 多个组件群组照 → 测最难场景(可能放弃此组,改单钟特写)

**评审标准**(用户视觉):
- 背景同色度肉眼无差 → 用 photoshop 取色器对 5 张取背景 hex 验证 ΔE < 3
- 主体清晰度肉眼可读铭文(若原图有)
- 阴影方向一致(全部主光 45° 左上)
- 锈色不夸张(铜绿不偏荧光)
- 主体居中、比例 70-80%

**评审过 → batch;不过 → 切换备用方案 / 调参数。**

---

## 8. 风险 & 备用计划

| 风险 | 概率 | 对策 |
|------|------|------|
| Photoroom 中国直连不通 | 高 | 在 GitHub Actions / Vercel function 跑 |
| Photoroom batch 跑到一半 401/超额 | 低 | 写脚本支持断点续传,缓存已成功结果 |
| 5 张样图色温不一致 | 中 | 调 `lighting.temperature` 参数 OR 改本地 ComfyUI |
| 文物轮廓被去背误吃(如薄壁青铜) | 中 | 该几张走 BiRefNet 重做 |
| 预算超 $30 | 中 | 接受(portfolio 一次性投入合理),或本地兜底 |

---

## Sources

- [Photoroom API Pricing](https://www.photoroom.com/api/pricing)
- [Photoroom API Documentation - Pricing](https://docs.photoroom.com/getting-started/pricing)
- [Photoroom Image Editing API](https://www.photoroom.com/api/edit-image)
- [remove.bg Pricing](https://www.remove.bg/pricing)
- [Adobe Firefly API Pricing 2026 (SudoMock)](https://sudomock.com/blog/adobe-firefly-api-pricing-2026)
- [Topaz Gigapixel Pricing](https://www.topazlabs.com/pricing)
- [RunPod RTX 4090 Pricing](https://www.runpod.io/gpu-models/rtx-4090)
- [BiRefNet vs rembg vs U2Net (dev.to)](https://dev.to/om_prakash_3311f8a4576605/birefnet-vs-rembg-vs-u2net-which-background-removal-model-actually-works-in-production-4830)
- [Cloudflare blog - segmentation benchmarks](https://blog.cloudflare.com/background-removal/)
- [Nano Banana Pro Pricing](https://pricepertoken.com/pricing-page/model/google-gemini-3-pro-image-preview)
- [通义万相 wan2.5 image edit API ref](https://help.aliyun.com/zh/model-studio/wan2-5-image-edit-api-reference)
- [Clipdrop Pricing](https://clipdrop.co/pricing)
- [Pebblely Pricing](https://pebblely.com/pricing/)
- [Cutout.pro Pricing 2026 (Flowith)](https://flowith.io/blog/cutout-pro-pricing-2026-pay-per-use-vs-subscription/)
- [Slazzer Pricing](https://www.slazzer.com/pricing)
- [IC-Light V2 ComfyUI Tutorial](https://comfyui-wiki.com/en/tutorial/advanced/ic-light-v2)
- [IC-Light V2 Background-as-Light Workflow (OpenArt)](https://openart.ai/workflows/risunobushi/relight-with-ic-light-and-background-as-lighting-source/UPKc0ak0YJibwbDff85i)
- [ComfyUI-IC-Light GitHub (kijai)](https://github.com/kijai/ComfyUI-IC-Light)
- [rembg GitHub](https://github.com/danielgatis/rembg)
