# Assumptions Register · MuseumCollect

**Doc owner**: 项目主理人
**Created**: 2026-06-06(round-2 cold-audit response)
**Status**: v1 — 每个 load-bearing 数字的 epistemic provenance。所有商业/产品文档的数字以此为 single source of truth。
**Word count**: ~2000

---

## 0. 为什么这份文档存在(直面 round-2 拷问的核心一击)

第二轮 cold-audit 给了我一记最重的拷问,原文:

> "你在 §5.9 拒绝伪造一个 CLIP P@5 数字、说'假数字直接 disqualify',然后在同一周内于商业文档里伪造了 9 个 load-bearing 商业指标、零引用——证明这种'诚实'是选择性表演,不是纪律。"

**这个指控成立。** 我对 AI 工程指标(`ai-roadmap §6.3` 引了 vendor pricing + CUB-200 benchmark)严格,却在 `one-pager.md` / `north-star.md` 里把 CAC ¥12 / LTV ¥60 / 5:1 / SAM 2000-3000万 / activation 30% 当成事实陈述,没有一条引用。这是**双标**。

正确的修复**不是再写一段"诚实承认"**(那恰好是 auditor 同时点名的 "honesty as a shield" 模式)。正确的修复是:**把每个数字的认知状态显式标注出来,能找到真锚点的去找真锚点,找不到的明确降级为"假设 + 验证方法"**。这份 register 就是这个修复。

打标体系:

| Tag | 含义 | 在文档里怎么呈现 |
|---|---|---|
| **[M] Measured** | 本项目内实测的真数字 | 直接陈述 + 指向产出文件 |
| **[B] Benchmarked** | 有外部可引用来源的行业锚点 | 陈述 + 引用链接 |
| **[A] Assumed** | 我的假设,**没有**实证 | 必须显式标 "[假设]" + 给验证方法 |

**铁律**:任何 [A] 数字在任何文档里出现,都必须带 "[假设·见 assumptions-register A#]" 标记,不允许裸奔成事实。

---

## 1. Measured 数字 [M] — 本项目实测

| ID | 数字 | 值 | 来源文件 | 备注 |
|---|---|---|---|---|
| M1 | 结构化文物数据 | 277 件 × 11 字段 | `data/curated/*.json` | grep 可数 |
| M2 | pHash intra-family P@1 | 0.333(2/6 命中) | `ai-service/poc/phash-eval-report.md` | **仅 6 个 scorable item,silhouette 自绘,见 A12 的严重 caveat** |
| M3 | pHash intra-family P@5 | 0.667(4/6) | 同上 | 同上 caveat |
| M4 | Playwright 测试 | 28/28 green | `qa/` | CI 可复现 |
| M5 | 维度数 | 7+1 | `docs/dimensional-map-v3.md` | **不是 5;见 §4 contradiction-fix** |
| M6 | 单元测试 | 10/10 | `ai-service/poc/test_eval.py` | ~12ms |

M2/M3 是真数字,但**它们的认知价值被我在 round-1 高估了** — 详见 A12。

---

## 2. Benchmarked 数字 [B] — 有外部来源

round-2 之前这些是裸奔的;现在补上真引用(2026-06 web 检索)。

| ID | 数字 | 我的用法 | 真实锚点(带源) | 校准结论 |
|---|---|---|---|---|
| B1 | App activation rate | 我设 D7 activation 目标 30% | 全球均值 8.4%;**中位 ~25% / 均值 ~34%**(Business of Apps "App Activation Rates" 2024-26;Plotline "Activation Rates by Industry") | 30% 落在 **中位与均值之间**,可辩护为"略高于中位"。**不是**我原来写的"小红书22%/B站28%/Strava38%"——那三个数我编的,已删 |
| B2 | 移动获客成本 | 我设 blended CAC ¥12 | 全球 CPI:iOS $3.6 / Android $1.22(Unity / Mistplay 2024);中国本土多用非 CPI 模式 | ¥12 ≈ $1.7,落在 Android($1.22)与 iOS($3.6)之间,**作为 blended 量级合理**;但精确 ¥12 仍是 [A] 假设(见 A4) |
| B3 | 小红书博物馆热度 | 证明 "Z 世代博物馆消费成型" | 小红书 MAU 3.5亿(2024 底)、18-34岁占比 >70%;单"广东省博物馆"话题累计浏览 9134.9万;"博物馆"长居小红书出行热词 TOP10(数英 / 千瓜 / 虎嗅 2024) | 原文"100M+ 浏览 +47% 小红书生态月报"是**编的**,已替换为这些真引用 |
| B4 | 故宫数字化体量 | 证明 "博物馆数据开放期" | 故宫 95万件文物数字化、10万件高清公开;"畅游多宝阁"上线单周 500万人次;数字故宫小程序用户 >70% 在 40岁以下(文旅部 / 腾讯 2024) | 真锚点。**但故宫 App 精确 MAU 查无公开数据**——我原来写的"故宫 App MAU ~150k"是猜的,已在竞品文档降级为明确估算(见 A9) |
| B5 | 收集类 app retention | 我设 W2 retention 目标 40% | 团队制挑战(Pokémon GO 型)比个人目标制 30天 retention 高 38%;Strava 新注册用户 Day-4 流失 61%(≈39% 留存)(Amplitude / SurveyMonkey Intelligence 2023) | 40% W2 是 [A] 目标,不是 benchmark。这些锚点只能说明"收集类 retention 可以做到高于社交 app",**不能**证明我们能到 40%(见 A6) |
| B6 | CLIP/DINOv2 工程可行性 | 证明 "1 周搭出可用识别" | `ai-roadmap §6.3` 已引 CUB-200 + OpenCLIP benchmark | 旧文档,引用本就在 |

**来源链接**(B1-B5,2026-06 web 检索):
- B1: businessofapps.com/data/app-activation-rates · plotline.so/blog/activation-rates-mobile-apps-by-industry
- B2: unity.com/glossary/cost-per-install · business.mistplay.com/resources/user-acquisition-cost
- B3: huxiu.com(小红书 MAU 3.5亿)· 数英 2024复盘 · CSDN(广东省博物馆话题 9134万)
- B4: mct.gov.cn(故宫数字化成果)· tencent.com(数字故宫)
- B5: amplitude.com/blog/pokemon-go-lost-players-won-game · SurveyMonkey Intelligence

---

## 3. Assumed 数字 [A] — 我的假设,无实证

**这是 round-2 拷问命中的核心区。这些数字之前在文档里被当成事实陈述了。现在它们被诚实地标为假设 + 给出验证方法。**

| ID | 假设 | 值 | 原来在哪裸奔 | 为什么这么设(rationale) | 怎么验证(validation) | thesis 敏感度 |
|---|---|---|---|---|---|---|
| A1 | SAM(核心爱好者) | 2000-3000万 | one-pager:18 | 无干净推导。基于"博物馆年 9亿人次 × 反复回访者占比"的粗估 | 上线后用真实留存用户反推可寻址池;或买一份艾瑞/QuestMobile 文博人群报告 | **高** — 整个市场故事建立在此 |
| A2 | SOM(3年 MAU) | 100-300万 | one-pager:60 | "Strava ×0.4 系数"——**0.4 是我编的**,无依据 | M12 真实增长曲线外推;砍掉 ×0.4 这种伪精确 | 中 |
| A3 | D7 activation | 30% | north-star:22 | 锚定 B1(中位25%/均值34%),设在中间偏上 | Beta cohort 实测(`north-star §6.1`) | **高** — NSM 漏斗核心 |
| A4 | blended CAC | ¥12 | one-pager:98 | 锚定 B2 量级,但 per-channel ¥0/5/15-30 是逐个猜的 | M1-3 真实投放回收数据 | **高** — 单位经济核心 |
| A5 | LTV(D365) | ¥40-80 | one-pager:94-98 | **无 ARPU × lifetime 推导**;产品零收入 | 需先有 monetization(A7)+ retention 曲线才能算 | **高** |
| A6 | W2 retention | 40% | north-star:90 | 锚定 B5 方向(收集类高于社交),但 40% 具体值是目标不是推导 | Beta cohort(`north-star §6.1`) | 中 |
| A7 | ARPU(文创分销) | ¥3-8/月 | one-pager:107 | "5%月购买率 × ¥80客单 × 10%分成"——三个输入全是猜的 | 需真实 GMV 数据;M6-12 验证 | 中 |
| A8 | LTV/CAC | 5:1 | one-pager:99 | **两个假设数(A4 A5)的商,不该盖 ✓**。已改为"若 A4/A5 成立则 ~5:1" | A4 + A5 都验证后才成立 | **高** — 最被攻击点 |
| A9 | 故宫 App MAU | ~150k | competitive-landscape:43 | 猜的。真实只有 B4 的数字化体量 | 第三方 App 数据平台(QuestMobile) | 低(竞品参照,非自身指标) |
| A10 | 国博 App MAU | ~80k | competitive-landscape:50 | 同 A9,猜的 | 同上 | 低 |
| A11 | 内容生产 target | 500+ 件 by D180 | north-star:178 | 基于 5 DE 并行的产能粗估 | sprint 产能实测 | 低 |
| A12 | infra 成本 | ¥3000-6500/mo @100k MAU | ai-roadmap:343 | `ai-roadmap §5` 有 per-recognition ¥0.011 锚点,但 **per-recognition → per-MAU 的桥没搭**(见 §4 contradiction-fix #4) | 真实流量 × 真实单价 | 中 |

---

## 4. Cross-document contradictions(round-2 发现的 bug,已修)

round-2 audit 还查出 6 处文档间数字打架。这些是**纯 bug**,不是认知问题,已逐条修:

| # | 矛盾 | 原状 | 修法 | 状态 |
|---|---|---|---|---|
| C1 | **维度数** | one-pager/competitive 写"5 维度(年代/工艺/纹饰/文化区/铭文)",但 case-study 最自豪的决策是"10→7+1,**砍掉工艺**、**铸主提为一级**" | 全部改为 canonical 7+1(形制/时代/地理/纹饰/铭文/用途/铸主 + ★稀有度),与 `dimensional-map-v3.md` 对齐。注:v3 设计文档(gamification/motivation)里的"Hero + 5 维度卡片"是**详情页 UI accordion 默认展示 5 张卡的布局决策**(防信息过载,见 gamification §6.3),不是 taxonomy claim,已核查保留 | ✅ 已修 |
| C2 | **WAC 月/周算错** | north-star:173 "WAC=3000(月新增10k × 30%)"把**月度**激活数标成**周度**活跃数 | 统一:月新增 10k → 月激活 3k → 按 7/4 周月转换,WAC ≈ 700/周 起步;6/12/24 月 target 重算 | ✅ 已修 |
| C3 | **activation 既知又未知** | north-star 一边用 benchmark"论证"30%,一边把"activation 是否稳定 25-35%"列为待验证 hypothesis | 统一口径:30% 是 [A3] **假设目标**(锚定 B1),M1-3 验证。不再表述为"已论证" | ✅ 已修 |
| C4 | **两套成本模型不接** | `ai-roadmap` ¥0.011/recognition vs `north-star` ¥6-8/MAU/月,无桥 | 标为 A12,显式承认桥没搭;给出搭桥公式(recognition/MAU/月 × 单价)留待真流量 | ✅ 已标注 |
| C5 | **P@5 目标漂移** | `ai-roadmap` gate 0.60,`north-star`/`one-pager` 悄悄放成 0.55 | 统一:lab benchmark target = 0.60;in-the-wild 预期 0.55(显式区分两者,不再混用) | ✅ 已修 |
| C6 | **pHash P@5 当 CLIP P@5 卖** | one-pager:50 "in-sandbox baseline 0.667 P@5" 紧挨着"CLIP P@5≥0.55",暗示二者可比 | 显式标注:0.667 是 **pHash on silhouette 的 intra-family** 数,**与 CLIP-on-photo 不可比**(见 A12/M2) | ✅ 已修 |

---

## 5. 这份 register 的维护规则

1. **新增任何 load-bearing 数字** → 必须先在此登记 + 打 tag,才能进其他文档
2. **[A] → [M] 升级**:每次 sprint 后,把已被真实数据验证的假设升级,并更新所有引用文档
3. **季度 re-audit**:可重跑 round-2 的 audit prompt,检查是否有新的裸奔数字溜进来
4. **诚实测试**:一个外部 reviewer grep 任意数字,都应能在 3 跳内查到它是 [M]/[B]/[A] 及其依据

---

## 6. 给面试官的一句话回应

> 面试官问:"你拒绝伪造 AI 数字,却编了一堆商业数字,这不是双标吗?"
> 我答:**"成立,这正是 round-2 audit 抓到我的。修复不是道歉,是这份 assumptions-register —— 12 个商业数字现在全部打了 [M]/[B]/[A] 标:能找真锚点的(activation 25%/34%、CPI、小红书 3.5亿 MAU)我补了引用;找不到的(SAM、LTV/CAC 5:1)我明确降级为假设并写了验证方法。我对 AI 数字的纪律,现在同样施加在商业数字上。一个数字裸奔成事实,在我这是 bug,不是风格。"**

---

**Doc version**: v1 (2026-06-06)
**Related**: 被本文约束的所有数字所在文档 — `one-pager.md` / `north-star.md` / `competitive-landscape.md` / `ai-roadmap.md` / `case-study.md §7`
**下次更新触发条件**:任一 [A] 被真实数据验证 → 升级为 [M];或下一轮 cold-audit 发现新裸奔数字
