# Competitive Landscape · MuseumCollect

**Doc owner**: 项目主理人 / Product Owner agent
**Last updated**: 2026-06-05
**Status**: v1 — initial landscape mapping; needs Sprint 6+ field validation
**Word count**: ~2400

---

## 0. TL;DR

我们对面的不是一个 monolithic 竞争对手,而是**四类玩家 × 各自的局部解**:

| 类别 | 代表玩家 | 他们解决的 | 他们没解决的(= 我们的入口) |
|---|---|---|---|
| **A. 博物馆官方 App** | 故宫数字博物院、国博 App、Smithsonian Open Access | 单馆深度内容、馆藏数字化 | 跨馆 collection、用户拥有感、收集机制 |
| **B. 通用 AI 识别工具** | Google Lens、百度识图、微信扫一扫识物 | 通用物体识别(花、动物、商品) | 文物 vertical 的语义深度、知识图谱、收藏 loop |
| **C. 文博内容平台** | B 站文博 UP 主、小红书"博物馆打卡"、抖音 #国宝 | 内容消费、社交分享 | 结构化数据资产、用户的"个人博物馆" |
| **D. 收集类游戏化产品** | Pokémon GO、Animal Crossing 博物馆、Strava 收集 | 收集成就感的精神模板 | 现实文物 vertical、文化深度 |

**我们的位置**: 类别 A 的内容深度 × 类别 B 的入口便捷 × 类别 C 的社交曝光 × 类别 D 的收集机制 的**交集**。这个交集**目前是空的**。

**Moat 假设**(详见 §4): 不在算法、不在数据、不在 distribution,**在"motivation hook × 维度结构"的产品设计 IP** — case-study §3 / `gamification-mechanics-v3.md`。这是其他 4 类玩家不会做的事(他们各自最优解不在这里)。

---

## 1. 详细竞品矩阵

每个 row 标准:
- **谁是 user**: 主要服务谁
- **核心 jobs-to-be-done**: 他们解决用户的什么(用户视角,不是产品视角)
- **DAU/MAU 量级**(公开估计): scale 参考
- **NSM(推测)**: 他们大概率优化什么
- **跟我们的重叠度**: 0(零冲突)→ 3(高直接冲突)
- **我们的差异化**: 一句话

### 1.1 故宫数字博物院 / 故宫博物院 App

- **User**: 已对故宫高度感兴趣的爱好者、文博工作者
- **JTBD**: 看高清馆藏图、读官方深度内容、规划线下游览
- **量级**: App MAU ~150k(估算,2024 行业报告)
- **NSM(推测)**: monthly active 数 + 高清图浏览深度
- **重叠度**: 2(同 audience,但他们只覆盖 1 馆,我们跨馆)
- **我们的差异化**: 跨馆 collection + 用户拥有感 + 不依赖单一博物馆 IP
- **威胁分析**: ★★(中) — 他们有官方 IP 但**不会做跨馆**(组织边界 + 馆际版权)。他们的最优解是把自己做深、不是做广。

### 1.2 国家博物馆 App / 中国国博

- **User**: 国博访客 + 历史爱好者
- **JTBD**: 看 277 件镇馆之宝(他们的官方策展)+ 路径导览
- **量级**: ~80k MAU(估算)
- **NSM(推测)**: 在馆扫码量
- **重叠度**: 2(我们的"商周青铜"vertical 跟他们镇馆国宝重叠度高)
- **我们的差异化**: 跨馆 + 用户可自己 curate 而非只看官方推荐
- **威胁分析**: ★★(中) — 同故宫,组织边界限制他们做跨馆。

### 1.3 Google Lens / 百度识图 / 微信扫一扫识物

- **User**: 几乎所有手机用户(超通用)
- **JTBD**: 即时识别"这是什么"
- **量级**: Google Lens MAU ~500M+,百度识图 ~30M
- **NSM(推测)**: 识别查询量 + 转化到搜索/购物
- **重叠度**: 3(扫码识别功能直接重叠!)
- **我们的差异化**:
  1. **Vertical depth** — Google Lens 识别"这是一个铜器"; 我们识别"这是商代晚期方鼎,可能是后母戊鼎仿品,大概率 ★★★ 级别"
  2. **Knowledge graph** — 识别完之后给 5 维度结构化信息(年代/工艺/纹饰/文化区/铭文),不是搜索结果
  3. **Collection mechanic** — 识别完之后能"收藏"进个人博物馆,有持久价值
- **威胁分析**: ★★★(高) — **这是最大威胁**。Google 任何时候可以在 Lens 加一个 "Cultural Heritage Mode"。但他们不会做"个人博物馆"(他们的 NSM 是搜索流量,不是 user-owned data)。**他们做 80% 就停,剩下 20% 是我们**。

### 1.4 数字敦煌 / 数字故宫 / Smithsonian Open Access / Europeana

- **User**: 研究者、教育者、海外文化爱好者
- **JTBD**: 高保真档案访问 + 学术资源
- **量级**: 数字敦煌 ~10M PV(网站),Smithsonian Open Access ~5M PV
- **NSM(推测)**: 资源下载次数 + 学术引用
- **重叠度**: 1(audience overlap 部分,但产品形态完全不同)
- **我们的差异化**: 我们是"消费/玩耍向",他们是"档案/研究向"
- **威胁分析**: ★(低) — 他们的 NSM 跟我们正交,基本不会迁移到 to-C collection 产品

### 1.5 小红书 / B 站 文博内容(non-product UGC)

- **User**: 18-35 岁年轻文化爱好者(也是我们的核心 target)
- **JTBD**: 看 UP 主讲解 + 跟随 KOL 打卡
- **量级**: 小红书 "博物馆"话题 100M+ 浏览,B 站文博类总播放 ~30M/月
- **NSM(推测)**: 内容消费时长 + 创作者活跃数
- **重叠度**: 2(同 audience,但不同 product format)
- **我们的差异化**:
  1. 小红书/B 站是"看别人的",我们是"建自己的"
  2. 他们是 social feed(被动消费),我们是 collection tool(主动收藏)
  3. **互补而非替代** — 用户可以在 B 站学完之后用 MuseumCollect 整理自己看过的
- **威胁分析**: ★(低,但是关键 distribution channel,见 §3.1 GTM)

### 1.6 Pokémon GO / Animal Crossing(博物馆系统)/ Strava

- **User**: collection mechanic 爱好者(精神模板)
- **JTBD**: 通过收集获得成就感
- **量级**: Pokémon GO 60M MAU(2024),Animal Crossing 累计 4500 万套
- **NSM**: Pokémon caught / Activities uploaded / 不同物种数
- **重叠度**: 0(完全不同 vertical)
- **我们的差异化**: 我们继承 collection mechanic 的精神(case-study §3.2),但 vertical 是文物
- **威胁分析**: ★(零) — 他们是**精神参考**,不是竞争对手

### 1.7 Artsy / Sotheby's app / 拍卖类 app

- **User**: 高净值艺术品爱好者
- **JTBD**: 买卖、估值、知情
- **量级**: Artsy MAU ~1M(估算)
- **NSM**: GMV + 注册用户中位价格区间
- **重叠度**: 1(target 用户有部分重叠在"高端文物爱好者",但 mode 完全不同)
- **我们的差异化**: 他们是 marketplace,我们是 personal collection — 用户不需要真的买卖
- **威胁分析**: ★(零)

### 1.8 "我的世界" / 沙盒类 "I built X" 应用

- **User**: 自我表达爱好者
- **JTBD**: 创造 + 分享自己的作品
- **重叠度**: 1(精神 mode 部分类似 — 自我表达 + 分享)
- **威胁分析**: ★(零)

---

## 2. 竞争压缩矩阵 (6×4)

| 玩家 | Vertical depth(文物深度) | Recognition tech(AI 入口) | Collection mechanic(收集机制) | Acquisition cost(我们要赢的成本) |
|---|---|---|---|---|
| **故宫/国博官方 App** | ★★★★★ | ★ | ★ | 中(audience 重合) |
| **Google Lens / 百度识图** | ★ | ★★★★★ | ☆ | 高(分流入口) |
| **数字敦煌 / Smithsonian** | ★★★★★ | ☆ | ☆ | 低(NSM 正交) |
| **小红书/B 站 UGC** | ★★ | ☆ | ☆ | 低(可合作) |
| **Pokémon GO / Strava** | ☆(文物 vertical 上) | ☆ | ★★★★★ | 零(借鉴对象) |
| **MuseumCollect(我们)** | ★★★★ (青铜先深,其他 vertical 逐步) | ★★★ (CLIP+Phase 2 ensemble) | ★★★★ (5 维度 collection) | — |

**视觉解释**: 没有一家在三个核心维度上都是 ★★★★ 以上 — **这个空位就是我们的产品空间**。

---

## 3. "为什么 X 不会 6 个月内做这个"

这是面试官最容易拷问的: "故宫 App 明天就 ship 这个功能怎么办?"

### 3.1 故宫 / 国博 不会做的 3 个结构性原因

1. **组织边界**: 故宫不会推用户去看国博的藏品,反之亦然。**跨馆 collection 跟博物馆的"独家性"激励反向**。
2. **预算属性**: 博物馆数字化是文化部预算,不是产品创业预算。3 年规划级别的项目周期,不是 8 周 sprint。
3. **NSM 错配**: 他们的 KPI 是"线下访客数 + 文创销售额",to-C app 是 cost center 不是 revenue center。

### 3.2 Google Lens 不会做的 3 个原因

1. **TAM 错配**: 文博 vertical 全球用户 ~5000 万级别,Lens 服务 5 亿用户的核心是商品识别(变现路径清晰)。文物 vertical CPM = 0,Lens 团队没有 OKR 推动力。
2. **数据闭环**: Lens 是 query-and-leave,他们不维护用户的"我看过哪些"。这跟 Google 整体"don't be sticky"哲学一致。
3. **本地化**: 中国市场 Google 不存在; 国内做 Lens 等价物的百度 / 微信扫一扫团队都没把文博列为 vertical 优先级。

### 3.3 小红书 / B 站 不会做的 3 个原因

1. **平台 NSM**: 他们是 attention platform,做 collection tool 等于把用户从 feed 里"抽出去做事",跟 feed 时长指标矛盾。
2. **内容 vs 工具**: 他们的 motion 是"创作者 → 内容 → 消费者",不是"工具 → 用户私域数据"。这是组织能力错配。
3. **如果他们做了**: 大概率是话题运营 + #国宝打卡# 标签,不是结构化产品 — 这反而对我们是 GTM 利好(distribution channel,不是 substitute)。

### 3.4 谁是真正的潜在威胁(诚实承认)

最可能在 12 个月内做相似产品的:

- **一个垂直创业公司** — 比如某文博出身的产品经理离职做这个(我自己就是 case)
- **微信小程序生态** — 某文博相关小程序里加 collection 模块
- **教育类 to-C App** — 学而思 / 猿辅导 之类的延伸文化产品

**我们的防御**:
1. **Speed to depth**: 8 周建好的青铜 vertical(case-study §3.2 标注质量)对手要 3-6 个月复制
2. **Compound IP**: motivation hook × 维度结构是设计 IP,不容易抄(抄外形容易,抄"为什么这样组合"难)
3. **Network of museums**: 一旦签下 2-3 家一级博物馆 partnership,后来者很难再签同样的

---

## 4. 我们的护城河假设(刻意 falsifiable)

### 4.1 候选 moat 列表(从最弱到最强)

| Moat 候选 | 强度 | 评价 |
|---|---|---|
| AI 算法 | ★ | 弱 — CLIP 公开,2 年内必被超越 |
| 数据(图片+元数据) | ★★ | 弱 — Wikimedia + 博物馆 open access 都是公开数据 |
| 内容(策展、文案) | ★★★ | 中 — 我们的内容质量好但可被复制 |
| 用户数据(个人博物馆) | ★★★★ | 中强 — 用户已积累的 collection 切换成本高 |
| Network effect(藏品分享) | ★★★★ | 中强 — 朋友的 collection 才有意义,但弱于社交 app |
| **产品设计 IP**(motivation hook × 维度结构) | ★★★★★ | **强** — 这是其他人不会想到的整体设计语言 |
| Museum partnership | ★★★★ | 中强 — 排他性 partnership 是真护城河,但 BD 难度大 |

### 4.2 主 moat 假设

> **设计 IP 是 V1-V2 的 moat,museum partnership + user data 是 V3+ 的 moat。**

为什么不指望 AI 算法:case-study §5.9 已经说过,P@5 ≥ 0.60 是任何团队 1 个月能做到的工程指标,不是壁垒。

### 4.3 怎么验证 moat 假设

- **设计 IP**: 6 个月内观察是否有 ≥ 2 个明显模仿者出现(说明设计语言有价值);其中是否 ≥ 1 个能完整复制(说明 moat 弱)
- **User data**: D90 cohort 的 churn rate 如果 < 20%(已收藏用户高粘性),验证 user-owned data 是 moat
- **Partnership**: D180 是否能 sign ≥ 1 家一级博物馆(故宫/国博/上博/陕历博/南博)排他性合作

---

## 5. 给面试官的一句话回应

> 面试官问: "Why won't 故宫 App ship this in 6 months?"
> 我答: **"因为他们的最优解是把单馆做深,不是把跨馆做广 — 组织 incentive 和我们正交。我们的入口反而是和故宫/国博成为 distribution partner 而不是 substitute。**真正的 6-12 个月威胁是某个文博出身的小创业公司,所以我们的速度护城河靠'青铜 vertical 8 周建到生产级数据'(case-study §3.2)和'设计 IP 不易抄'(`docs/north-star.md` + `gamification-mechanics-v3.md` 的整体语言)。这两条我有 evidence;算法和数据我承认不构成 moat。"

> 面试官追问: "Google Lens 怎么办?"
> 我答: **"Lens 做 80% 就停 — 他们识别完不维护'我看过哪些',因为 Google 的整体哲学是 don't be sticky。剩下的 20%(structured knowledge graph + personal collection)是我们的产品空间。 Lens 是漏斗的上一层,不是直接竞争。"**

---

**Doc version**: v1 (2026-06-05)
**Related**: `docs/north-star.md` (我们的 NSM 跟竞品 NSM 对比) · `docs/one-pager.md §3 moat` · `docs/case-study.md §1.3` (target user definition)
