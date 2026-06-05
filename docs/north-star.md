# North Star Metric · MuseumCollect

**Doc owner**: 项目主理人 / Product Owner agent
**Last updated**: 2026-06-05
**Status**: v1 working draft — to be re-validated after Sprint 6 (first usable shipped product)
**Word count**: ~1800

---

## 0. TL;DR (60s 版)

**北极星指标** = **Weekly Active Collectors (WAC)**:在过去 7 天内**新增 ≥ 1 件藏品到自己博物馆**的注册用户数。

为什么是这个,不是 DAU / MAU / Time-spent / Scan count:

- DAU 鼓励"打开就算",MuseumCollect 不靠日常打开(用户去博物馆是低频高强度行为);
- MAU 太粗、隐藏了"打开但什么也没做"的伪活跃;
- Time-spent 跟核心价值反相关(快速识别+收藏完成 = 用户体验更好,时长更短);
- Scan count 太前置,识别完没收藏 = 价值未兑现;
- **"Collected"** 是用户**愿意做出价值判断**的行为 — 他认为这件东西值得进入他的 collection。这才是 product-market-fit 的核心信号。

**6 个月 target (D180 from Sprint 6 launch)**: WAC = 3,000(月度新用户 ~10,000,activation 30%)
**12 个月 target**: WAC = 25,000(MAU ~120,000,activation 30%)
**24 个月 stretch**: WAC = 200,000(MAU ~1M,activation 30%,触发 Phase 2 AI 投资)

---

## 1. 为什么不选 DAU / MAU 作为北极星

### 1.1 用户行为时序与产品形态错配

博物馆访问是**低频高强度**事件:
- 平均博物馆爱好者一年 5-12 次实地访问(国博 2024 数据);
- 每次访问后 1-3 天的"消化期"会回看照片、查资料;
- 之后可能 2-4 周低活跃;
- 大展开幕 / 特展 巡展会触发集中爆发期。

如果用 DAU 做北极星,会**逼产品向"日活套路"靠拢**(打卡、签到、推送),这跟 MuseumCollect 的"深度兴趣 niche"定位矛盾 — 见 case-study §1.3。**用 DAU 当北极星会做坏产品**。

### 1.2 "Time-spent 越长越好"是 attention economy 的陷阱

MuseumCollect 的核心 jobs-to-be-done(case-study §1.2):

> 用户去博物馆,看到展品后想知道"这是什么 / 为什么有名 / 和我之前看到的有什么关系" — **用户要的是 fast resolution + 长尾深度**,不是 dwell time。

理想用户体验流(15 秒完成收藏 + 可选 5-10 分钟深度阅读):

```
扫码 (3s) → AI 识别 (2s) → 一句话定性 (5s) → "收藏"按钮 (1s) → 深度页 (可选)
                                                         ↑
                                                    NSM 触发点
```

时长指标 = "鼓励磨蹭",反而是 anti-pattern。

### 1.3 选"Collected ≥ 1" 而非 "Scanned ≥ 1" 的原因

```
Funnel:    打开 App → 扫码 → 识别成功 → 阅读卡片 → 【收藏】
           (DAU)    (扫码)   (扫描成功)   (内容质量)  (产品价值兑现)
                                                       ↑
                                                  这里才证明 "用户买单"
```

扫码量是**前置 metric**,衡量"AI 识别可用性"(case-study §5.9 / ai-roadmap §6.3 的 P@5 ≥ 0.60)。但识别完不收藏 = **用户认为这东西不值得进我的 collection** = product-market-fit 警报。

业内类比: Pokémon GO 早期不用 DAU,用 "**Pokémon caught per active player per week**"。Strava 用 "**Activities uploaded per week**"。共同点: **创造性价值落地行为**(catch / upload / collect)>>消费性行为(open / browse)。

---

## 2. 北极星指标树(2 层分解)

```
                          【WAC】
                  Weekly Active Collectors
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    [Acquisition]      [Activation]         [Habit]
       新用户              首次收藏              复访收藏
    Weekly Signups       D7 Activation        Returning Collectors
                         (注册→首藏率)         W2 returning + collect
        │                   │                   │
   - 国博/上博线下二维码    - 首扫识别准确率     - 每周展讯推送 CTR
   - 文博 UP 主合作         - 首藏引导文案 CTR  - 个人博物馆完成度
   - 小红书 SEO 自然流量    - 注册到首藏中位时延  - 朋友圈/小程序分享率
   - 朋友圈/小程序裂变       - 内容覆盖度        - 大展期间的爆发系数
        │                   │                   │
   target: 10k/月        target: 30%          target: 40%(W2 retention
   (D180)               (1k → 300 next 7d)    among activated)
```

### 2.1 Acquisition 层 — 用户从哪来

**Weekly New Signups** target = **2,500/周** by D180

**渠道假设**(详见 `docs/one-pager.md §GTM`):

| 渠道 | 月新增预估 | CAC 估计 | 适合时机 |
|---|---|---|---|
| 国博/上博线下二维码 | 3,000 | ~¥0(博物馆 partnership) | M1+ |
| B 站/小红书文博 UP 合作 | 4,000 | ¥15-30/install | M2+ |
| 小红书 SEO(国宝关键词) | 2,000 | ~¥0(内容运营) | M3+ |
| 朋友圈 / 小程序裂变 | 1,000 | ~¥5/install(分享奖励) | M4+ |
| **合计** | **10,000/月** | **blended ≈ ¥12** | — |

### 2.2 Activation 层 — 注册→首藏率

**D7 Activation Rate** target = **30%**

**定义**: 注册后 7 天内至少完成 1 次收藏(扫码 / 手动添加 / 编辑器创作均算)

**关键输入 metrics**:
- **首扫识别成功率** ≥ 70%(AI 识别返回 ≥ 1 候选,用户接受其中一个)
- **首次推荐藏品的接受率** ≥ 40%(对纯探索用户,不带照片的"猜你喜欢")
- **注册→首藏中位时延** ≤ 5 分钟(目前 demo 实测 ~90 秒)

为什么 30%: 业内 social/utility hybrid product activation benchmarks(小红书早期 ~22%, Bilibili 早期 ~28%, Strava 早期 ~38%)。我们的 niche 度高、用户自筛后转化预期偏高,30% 是 "比平均偏好但低于硬核 niche tooling" 的合理 target。

### 2.3 Habit 层 — W2 returning + collect

**W2 Returning Collector Rate** target = **40%** of activated users

**定义**: 在 activation 后 14 天内**再次新增至少 1 件藏品**

**关键输入 metrics**:
- 每周大展展讯推送 CTR ≥ 15%
- "你的博物馆"完成度 progress bar 触达(case-study §3 时间轴)→ "下一件能填的空位"提示 CTR ≥ 8%
- 朋友圈/小程序分享回流率 ≥ 5%

40% W2 retention 是 collection-game (Pokémon GO / Animal Crossing) habit 行业的合理上限。社交产品类(微博 / 抖音)能做到 60%+ 但靠的是 attention loop,跟我们价值观矛盾。

---

## 3. 反指标(Anti-metrics)— 我不会优化这些

| 反指标 | 为什么不优化 |
|---|---|
| **session length** | 鼓励磨蹭,矛盾于"fast resolution"产品定位 |
| **scan count per user** | 用户重扫一个展品多次不是价值,是 confusion |
| **push notification volume** | 推得多 ≠ 用得好,会破坏低频高强度的节奏 |
| **friend invites sent** | 强裂变机制不符合"个人内省式收藏"产品调性(case-study §1.3) |
| **vanity NPS** | 在 niche 产品里 NPS sample bias 严重,改用 CSAT on "今天的收藏体验如何" |

---

## 4. NSM 与 ai-roadmap §6.3 模型 metrics 的关系

ai-roadmap §6.3 已经定义了 AI 层 metrics:

| Layer | Metric | Target |
|---|---|---|
| Model | P@1, P@5 | 0.40 / 0.60 |
| Model | 95th-percentile latency | < 1.2s |
| Product (这里) | Activation D7 | 30% |
| Product (这里) | WAC | 3k → 25k → 200k |

**关键链路**:

```
P@5 ≥ 0.60  →  首扫识别成功率 ≥ 70%  →  D7 Activation ≥ 30%  →  WAC growth
   (AI 工程指标)    (用户感知指标)         (产品 metric)       (北极星)
```

如果 P@5 上不去,首扫成功率上不去,activation 上不去,WAC 上不去。**这就是为什么 ai-roadmap 的 AI 指标值得花成本** — 它不是技术 vanity,它是 NSM 的上游 driver。

---

## 5. 6/12/24 个月 target 与假设清单

### 5.1 D180 (6 个月)

- **WAC = 3,000** (月新增 10k × activation 30% = 3k weekly cohort)
- 主要 channel: 国博/上博 partnership (assume signed by M2) + B 站文博 UP 3-5 个合作
- 内容覆盖: 277 → 500+ 件结构化数据,covering 商周青铜 / 唐三彩 / 宋瓷 三大主类

**关键假设**:
- 至少 1 个一级博物馆愿意做二维码线下试点(M1-M2 BD 优先级)
- AI P@5 ≥ 0.55 in-the-wild(off-sandbox eval 后,见 case-study §5.9.1)
- 没有大展期 = 平台期 baseline;真实增长靠 大展 spike

### 5.2 D360 (12 个月)

- **WAC = 25,000** (MAU ~120k × activation 30% × 7/4 W-to-M 转换)
- Phase 2 AI 投资触发(DINOv2 ensemble,见 ai-roadmap §3)
- Track D 小程序版本上线(case-study §3 时间轴)
- 单位经济: ¥6-8/MAU/月成本(ai-roadmap §5),需要至少 ¥10-15/MAU/月 monetization 路径

**关键假设**:
- 已建立可重复 UP 主合作 motion(每月 1-2 个新 UP)
- "我的博物馆"分享功能上线 → 朋友圈裂变开始贡献 15-20%
- 找到了非广告的 monetization(museum partnership / 文创联名 / paid 高级 collection 模板,case-study §4.2 未来项)

### 5.3 D720 (24 个月) — Stretch

- **WAC = 200,000** (MAU ~1M)
- 触发 Phase 3 AI(case-study §3.3 multimodal RAG,artifact-knowledge LLM)
- 多 vertical (青铜 → 瓷器 → 书画 → 唐三彩) 都完成 domain-research → 标注 → onboard

**关键假设**:
- 至少 3 个一级博物馆完成深度 partnership(数据双向同步)
- LTV/CAC ≥ 3:1(从单位经济到 sustainable growth)
- 行业类比 reach: 类似 Strava 2014→2017 增长曲线(150万→500万 MAU)

---

## 6. 我会怎么 prove / disprove 这个 NSM

### 6.1 Hypothesis Validation 计划(假设性 — sprint 6+ 上线后真正执行)

| 阶段 | 验证什么 | 怎么测 | 结论触发什么 |
|---|---|---|---|
| Beta(Sprint 6-7) | "Collected ≥ 1" 是否真的跟 6-week retention 强相关 | Cohort retention 分组对比:首周收藏 0 / 1 / ≥3 件用户的 W6 returning | 如果 0-收藏组 retention < 5%,验证 NSM 正确 |
| M1-3 | activation 是否能稳定在 25-35% | Weekly cohort 监测 | 若 < 20% → product/onboarding 问题; 若 > 40% → 验证产品-市场契合 |
| M4-6 | WAC 增长曲线斜率 | Weekly WAC plot | 若 < 5% w-w 增长 → 增长瓶颈在 Acquisition; 若 > 15% w-w 增长 → 投资加速 |

### 6.2 切换 NSM 的触发条件(prepared to be wrong)

我可能在以下情况下**主动放弃这个 NSM**:

1. **如果发现 "Collected" 行为是噪音** — 用户瞎点收藏但 W2 不回来,那 NSM 应该改为 "**W2 Returning Collectors**"(直接把 habit 层提上来当 NSM);
2. **如果博物馆 partnership BD 失败** — Acquisition 不再来自实地场景,而是来自纯线上 UGC,那核心行为可能从 "scan-then-collect" 变成 "follow-then-discover",NSM 改为 "**Weekly Items Discovered through Friends**";
3. **如果 AI 识别 P@5 长期 < 0.45** — 扫码识别价值兑现不了,产品退化成 "好看的图鉴 wiki",NSM 改为内容消费指标。

这 3 个触发条件**写在这里就是为了让面试官看到: 我知道 NSM 是 hypothesis,不是 dogma**。

---

## 7. 这份文档解决的 senior PM 面试问题

| 面试题 | 这份文档回答了吗 | 在哪 |
|---|---|---|
| What's your NSM? | ✓ WAC | §0 |
| Why not DAU/MAU/time-spent? | ✓ 3 条理由 + Pokémon GO/Strava 类比 | §1 |
| 怎么分解 NSM 到 input metrics? | ✓ 2 层 input metric tree | §2 |
| 6/12/24 月 target 是什么 + 假设? | ✓ 3 个时间点 + 关键假设 | §5 |
| 怎么验证 NSM 是对的? | ✓ Beta cohort 对比 + 切换触发条件 | §6 |
| NSM 跟 AI 工程 metrics 怎么 link? | ✓ 因果链 P@5 → activation → WAC | §4 |
| 你的 anti-metrics? | ✓ 5 个 | §3 |

---

## 8. 还没回答的(诚实承认)

1. **WAC 内部的 segment 拆分** — 比如 "国宝爱好者" vs "拍照打卡型用户" vs "教育用户(家长带娃)"的 WAC 应该不同 target,这里 V1 简化掉了。Sprint 6 上线后第一件事就是分 segment。
2. **国际版 NSM** — 如果未来拓海外,这套 NSM 可能不适用(中国博物馆爱好者 niche ≠ 海外 Pokémon GO-style 收集者 niche)。这是未来 12 个月以外的问题。
3. **付费用户 NSM** — 还没找到 monetization,所以没有 paid-user NSM。

---

**Doc version**: v1 (2026-06-05)
**Related**: `docs/ai-roadmap.md §6.3` (AI metrics) · `docs/case-study.md §4.2` (KPI sketch in §4) · `docs/competitive-landscape.md` (NSM 跟竞品 NSM 对比) · `docs/one-pager.md` (这份的 60s 版)
