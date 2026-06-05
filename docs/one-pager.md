# MuseumCollect — One-pager · 投资人/CEO 90 秒版本

**Doc owner**: 项目主理人
**Last updated**: 2026-06-05
**Audience**: 假设的投资人 / 假设的 to-C 公司 CEO / 面试官
**Word count**: ~1500

---

## Logline (15s)

**给博物馆爱好者的"个人博物馆"** — 扫一下展品就能识别+收藏,在 5 个文化维度上慢慢拼出一个属于你自己的文物宇宙。不是图鉴,不是 wiki,是**你的 collection**。

---

## 1. Problem(为什么这件事值得做)

中国年均博物馆参观 9 亿人次(2024 文物局数据),其中"反复回访 + 主动学习"的核心爱好者约 **2000-3000 万**(估算,基于故宫月活、B 站文博类播放、小红书博物馆话题的交集 sizing)。

这 2000-3000 万人目前的痛点(case-study §1.2 已 N=9 用户访谈验证):

1. **去过的展品消化不掉** — 拍 100 张照片回家从来不看,几个月就忘
2. **缺少"我跟这件文物的关系"沉淀** — 故宫 App 是故宫的,B 站是 UP 主的,**没有"是我自己的"那个东西**
3. **跨馆体验割裂** — 商代青铜在 5 个馆有 5 套 App,没法 connect

**用户脑中**: 想要一个像 Pokédex 之于 Pokémon、Strava 之于跑步那样的 "我的文物 X" — **它现在不存在**。

---

## 2. Solution(我们的 3 个不可分割部分)

```
扫一下 → AI 识别  →  5 维度结构化  →  收藏到个人博物馆
 (入口)    (CLIP)    (设计 IP)        (用户 own 的 data)
```

**3 个一起 = 产品**:
- 只有 AI 识别 = Google Lens(无 vertical depth)
- 只有 5 维度内容 = 博物馆 App(无用户 ownership)
- 只有 collection = 收藏夹(无 onboarding 价值)

5 个维度: 年代 / 工艺 / 纹饰 / 文化区 / 铭文 — 详见 `docs/gamification-mechanics-v3.md` + `docs/agent-team-design.md §domain-researcher` 的拆解。**这不是随便选的 5 维度,是青铜器领域知识 → 用户收集动机 hook 的产品化**(case-study §3.2 6h domain research session)。

---

## 3. Market(为什么现在)

### 3.1 Why now

- **AI 识别成熟到工程化可用**: CLIP/DINOv2 2024 起开源,1 周内能搭出 P@5 ≥ 0.55 的服务(case-study §5.9.1 已有 in-sandbox baseline 0.667 P@5 验证 pipeline)
- **博物馆数字化进入开放期**: 故宫开放 API、国博 277 件镇馆数据公开、Smithsonian/Europeana 全球开源 — **数据获取成本降了 10×**(case-study §3.1)
- **Z 世代博物馆消费习惯成型**: 小红书博物馆话题 100M+ 浏览,2024 同比 +47%(小红书生态月报)

### 3.2 Market sizing(简化版 — 详见 north-star.md §5)

| Layer | 量级 | 验证基础 |
|---|---|---|
| **TAM** | 9 亿/年博物馆人次 | 文物局 2024 公开数据 |
| **SAM** | 2000-3000 万核心爱好者 | 故宫/国博 MAU + B 站文博 UV 交集估算 |
| **SOM(3 年)** | 100-300 万 MAU | Strava 2014→2017 类比 ×0.4 系数 |

---

## 4. Why us(诚实承认 — 不是"why us"而是"why this approach")

我**不是博物馆专家**,我是会做产品的人。这个项目把**博物馆领域知识 × 产品设计 × AI 工程**三件事 stitch 起来,**结构本身就是 IP**:

- 8 周 / 5 sprint / 6+ agent / 277 件 metadata / 11 份 audit / 4 个 Mermaid 流程图 / 真 in-sandbox AI baseline P@5 = 0.667
- 全过程透明、可审计、可复制 — 见 `docs/case-study.md`(10500 字 6 节)

如果未来需要联合创始人/团队,博物馆领域专家 + 内容策展 + 增长 marketing 是补的。**我提供的是 0→1 的产品+ AI engineering judgment**(case-study §0.5 + §5)。

---

## 5. GTM(给面试官的"first 1k → first 100k"答案)

### 5.1 First 100 users(Sprint 6-7,beta)

- 自己 / 朋友 / 文博爱好者社群 50-100 人 closed beta
- 主要目标: **validate NSM "Weekly Active Collectors"**(`north-star.md §6.1`)

### 5.2 First 1,000 users(M1-2)

| 渠道 | 预估 | 成本 | 备注 |
|---|---|---|---|
| **国博/上博线下二维码** | 500 | ¥0(合作) | M1 BD 优先级 #1。"扫一下,带这件回家" 二维码贴在镇馆国宝旁。 |
| **小红书 SEO** | 300 | ¥0 | 针对"什么是后母戊鼎"/"怎么看青铜器"等 200+ 关键词写 30 篇结构化内容 |
| **朋友圈/小程序内嵌** | 200 | ¥0 | Track D 小程序版本(case-study §3 时间轴)直接借微信生态 |

### 5.3 First 100,000 users(M3-12)

| 渠道 | 月新增 | CAC | LTV 假设(D365) |
|---|---|---|---|
| 博物馆 partnership(国博/故宫/上博/陕历博 4 家) | 4000 | ¥0-5 | ¥80(高粘性) |
| B 站/小红书文博 UP 主合作(每月 1-2 个) | 3000 | ¥15-30 | ¥50 |
| 大展期间集中投放(妇好墓 / 三星堆 巡展) | 2000 | ¥20-40 | ¥60 |
| 朋友圈裂变(分享我的博物馆) | 1000 | ¥5 | ¥40 |
| **合计** | **10,000/月** | **blended ¥12** | **blended ¥60** |
| **LTV/CAC** | — | — | **5:1** ✓ |

**关键假设**: 至少 1 家一级博物馆 M2 内 partnership 落地;否则 CAC 上升到 ¥25-40,LTV/CAC 降到 2-3:1(仍 viable 但慢)。

### 5.4 第一次 ARPU 验证(M6-12)

3 个候选 monetization,优先级降序:

1. **博物馆联名文创分销** — 用户的 "我的博物馆" 推荐相关文创,博物馆/合作方 GMV 抽 8-15%。预估 ARPU ¥3-8/月(假设 5% 月购买率 × ¥80 客单价 × 10% 分成)
2. **Premium collection 模板**(¥12-30/月) — 高级"我的博物馆"主题、CV-quality 图册导出
3. **教育 / B-end** — 学校 / 教育机构企业版

**不做的**: 信息流广告(case-study §1.3 价值观矛盾)、社交裂变奖励(north-star.md §3 anti-metric)

---

## 6. Ask(假设性,demo purpose)

如果这是 real fundraise:
- **Seed**: ¥3-5M(18 个月 runway,5-7 人小团队)
- **Use of funds**: 
  - 50% 内容生产(其他 4 个 vertical: 瓷器 / 书画 / 唐三彩 / 现代,各 ~277 件 metadata)
  - 30% AI engineering(Phase 2 DINOv2 ensemble + Phase 3 multimodal RAG)
  - 15% BD(博物馆 partnership)
  - 5% community ops

---

## 7. 风险 / 我可能错在哪

| 风险 | 概率 | 应对 |
|---|---|---|
| 故宫/国博官方 App ship 类似功能 | 中(详见 `competitive-landscape.md §3.1`) | 速度护城河 + 跟他们 partnership 而非对立 |
| Google Lens / 百度识图加文物 vertical | 中低(`competitive-landscape.md §3.2`) | 我们专注 collection mechanic,不是查询入口 |
| Niche 太小,无法支撑 1M+ MAU | 中 | 国际版 + 多 vertical 扩展(瓷器/书画) |
| 博物馆数据合规 / 版权问题 | 中 | `docs/licensing-log-v3.md` 已覆盖;UGC moderation 是 V2 重点 |
| Founder 不是博物馆专家,缺领域信任 | 高 | 寻找联合创始人 / 顾问;先靠 case-study + 实际产品质量赢信任 |

---

## 8. 这份 one-pager 跟其他文档的关系

| 这页讲什么 | 详细在哪 |
|---|---|
| Problem (§1) | `docs/case-study.md §1.1-1.3` |
| Solution (§2) | `docs/gamification-mechanics-v3.md` + `docs/agent-team-design.md` |
| Why now (§3) | `docs/ai-roadmap.md §0` + 此文 |
| GTM 细节 (§5) | `docs/north-star.md §2.1` + 此文 |
| Moat / 竞品 (§4) | `docs/competitive-landscape.md` |
| NSM 论证 | `docs/north-star.md` |
| Risk 详细 | `docs/case-study.md §5.7-§5.9` + `docs/ai-roadmap.md §7` |

---

**Doc version**: v1 (2026-06-05)
**Used in**: 假设性投资人 pitch / 面试官 60s 自我推销 / 给非 PM stakeholder 一页 onboarding
