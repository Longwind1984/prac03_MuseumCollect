# ADR-006:开放式发现管道(Open Discovery Pipeline)

- **状态**:**Draft · 待 PM 签字**(Builder 不主动 commit;本文件由 Orchestrator 起,等 PM review 后定稿)
- **日期**:2026-06-06
- **决策者**:项目作者(PM)
- **相关章节**:PRD §1.4 founding insight、§10 内容与知识源、§14.1 需求附录(将新增 F-18/F-19/F-20)、§14.3 ADR 索引
- **依赖**:[ADR-003](./003-knowledge-sources.md)(知识源六层)、[ADR-005](./005-exhibit-discovery.md)(展品发现三层)
- **实测依据**:
  - `agents/researcher/reports/2026-05-18-discovery-pipeline-feasibility.md`(3 件样本工时实测)
  - `agents/researcher/reports/2026-06-06-od2-overseas-oa-reachability.md`(海外 OA + Wikimedia 沙箱 100% 403,**新增**)
  - 3 件 sample bundle:`shanxi-northern-qi-guanyin-pentad.md` / `shanghai-northern-qi-white-marble-buddha.md` / `aurora-hongshan-jade-anthropomorphic-figure.md`

## 背景

ADR-003 定义了"知识源六层 + 五类分级"的**层结构**;ADR-005 定义了"展品在哪个馆"的**发现三层**;两者都不解决一个产品级问题:

> **30 件 × 5 类源 = 150 个 bundle 单元,谁来跑、在哪里跑、如何保证不幻觉、何时认账"跑不完"?**

3 件样本实测后定量观察:

1. **5 类源的自动化可行度严重分层**——B(海外 OA 对照)100% agent / E(数字人文)80% / C(学术)60% / D(现场)40% / A(大陆馆)20%。**单 agent 一把抓 = 在 A/D 类源上必然幻觉**(把"找不到"伪装成"已抓到")
2. **执行环境是 P0 而不是细节**——本 web 沙箱对**全部馆方 OA API + 海外图像 CDN + archive.org + 大陆站点** 100% 返回 `403 host_not_allowed`;白名单只剩 `github.com / raw.githubusercontent.com / pypi.org`(OD-2 mini-spike 实测,2026-06-06)。**Pipeline 必须双环境分体设计,不能假设单一环境跑通**
3. **30 件诚实工时 = 110–150 小时**——其中 PM 国内 IP 段 30–40h 不可压缩。任何"agent 一周搞定 30 件"的承诺都是工时灌水
4. **找不到一手叙事本身就是产品哲学素材**——Sample 3(震旦红山玉神人)海外学者明示"该类件从未经科学发掘出土",馆方说明牌不会写。这是 user-voice 原则 C 的最强落地,**Pipeline 应承担"诚实标边界"的责任,不应过度自动化掉这个 chunk**

本 ADR 在这四条事实约束下,定义 Pipeline 的:**(a) 3 个 sub-agent 角色与契约**、**(b) 5 类源自动化可行度矩阵**、**(c) 双环境分体执行**、**(d) 反幻觉状态机**、**(e) 人在回路边界**、**(f) 30 件诚实工时口径**。

## 候选方案

| 选项 | 描述 | 主优点 | 主缺点 |
| --- | --- | --- | --- |
| A. 单 agent 大模型一把抓 | 一个 prompt 同时做 URL 发现 + 抓取 + 编纂 | 工程简单 | A/D 类源上必然幻觉;无法用 sub-agent 契约约束;无中间产物可审 |
| B. 复用 ADR-005 Tier 0/1/2 | 把 Tier 0 通用爬虫扩展成"5 类源都爬一遍" | 模型已存在 | 把"找位置"与"核位置"混在一层;无反幻觉门;沙箱执行假设不成立 |
| C. 单 agent + checklist | 单 agent 跑,人工拿 checklist 校 | 启动便宜 | 30 件 × 5 类源 = 150 个 checklist 单元,人审破产 |
| **D. 3 sub-agent + 双环境分体 + 状态机**(本 ADR 选) | Discovery / Verifier / Compiler 三角色契约化分离,Phase A(沙箱)/ Phase B(PM 本地)分体执行,chunk 必须带"已验证 URL + content_hash" 才能入册 | 反幻觉契约化、双环境分体契合实测、3 件样本工程化已验证、人在回路边界清晰 | 工程量上 = 写 3 个 sub-agent 的 prompt + 一套 hand-off schema |

## 决策

**选 D。Open Discovery Pipeline 按以下 6 块定义:**

### 1. 三个 sub-agent 的契约(三角色不能合并)

```
┌─ Phase A · 任何环境(含 web 沙箱)──────────────────────────────┐
│                                                                  │
│   ① Discovery sub-agent(探源)                                  │
│      input:    artifact 名 + 朝代 + 出土地 + 关键词              │
│      output:   sources_candidates.json                           │
│                每条 = {url, source_class A/B/C/D/E,              │
│                        rationale, expected_license,              │
│                        expected_content_density: high/mid/low}   │
│      约束:     **绝对不抓**,只列候选 + 写论证 + 标期望         │
│                                                                  │
│   ② B 类源 grep(本地)                                          │
│      input:    artifact 关键词                                   │
│      output:   b_class_hits.json                                 │
│                {museum, accession, title, license, image_id}     │
│      约束:     `data/sources/*.json` 本地 grep,**不出网**       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                                ↓ hand-off
┌─ Phase B · PM 本地 Claude Code CLI(国内 IP + 海外 OA 都能通)──┐
│                                                                  │
│   ③ Verifier sub-agent(核源)                                  │
│      input:    sources_candidates.json + b_class_hits.json       │
│      output:   verified_chunks.json                              │
│                每 chunk = {url, fetched_at, content_hash,        │
│                            source_class, license_observed,       │
│                            confidence_tier: high/mid/low,        │
│                            excerpt_or_metadata}                  │
│      约束:     **逐 URL 抓 + 落本地 + hash**;失败的标 reason   │
│                **任何无 url 或 hash 缺失的 chunk 拒绝下传**     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                                ↓ hand-off
┌─ Phase A 或 B 任一 ─────────────────────────────────────────────┐
│                                                                  │
│   ④ Compiler sub-agent(编册)                                  │
│      input:    verified_chunks.json + bundle 模板                │
│      output:   `agents/researcher/sample-bundles/{slug}.md`     │
│      约束:     **拒绝 high-tier 无 URL chunk**(反幻觉硬门)    │
│                **必须显式标"本件 X 类源未到手,原因 Y"**         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 2. 五类源自动化可行度矩阵(冻结,Pipeline 默认起点)

| 类 | 名 | agent 化程度 | 沙箱可干否 | PM 本地必需否 | Pipeline 默认动作 |
|---|---|---|---|---|---|
| **B** | 跨馆海外 OA 对照(本仓库已落地 6 个 extractor) | **100%** | ✅ | 否 | **Pipeline 默认起点**:任何件先跑 B,看命中数 |
| **E** | 数字人文 / 跨域 OA(BMFEA / 数字敦煌 / 山大云冈学 / CBETA / 芝大响堂山) | **80%** | ❌(全 403) | 是(PM 本地抓) | Discovery agent 列 URL → PM 本地 Verifier 抓 |
| **C** | 学术论文(dpm.org.cn / CNKI 短引 / MDPI / DOAJ) | **60%** | ❌(全 403) | 是(PDF 下载 PM 本地) | C1 URL 发现 agent ✓ / C2 PDF 抓 PM 本地 |
| **D** | 现场场域(馆方公众号 / 大陆媒体长文 / 馆方策展声明) | **40%** | ❌(全 403 + 微信 ToS) | 是(微信公众号必须人工) | agent 找索引 → 人工读 / 摘 |
| **A** | 馆方一手页面(大陆馆 / 海外 OA 馆) | 大陆 20% / 海外 100% | ❌ | 是 | agent 写爬虫脚本 → PM 本地执行 |

### 3. 双环境分体执行(本 ADR 真正的 P0)

**OD-2 mini-spike 实测(2026-06-06)**:本 web 沙箱出口白名单只剩 `github.com / raw.githubusercontent.com / pypi.org`。所有馆方 OA API(api.artic.edu / api.harvardartmuseums.org / www.penn.museum)、所有图像 CDN(commons.wikimedia / upload.wikimedia)、archive.org、所有大陆站点均返回 `403 host_not_allowed`。

由此**强制**双环境分体:

- **Phase A · 任何环境(含 web 沙箱)**:Discovery + B 类源 grep + Compiler 装订
- **Phase B · PM 本地 Claude Code CLI**:Verifier 全部抓取动作
- **Hand-off 契约**:Phase A → Phase B 的 input = `sources_candidates.json + b_class_hits.json`;Phase B → Phase A 的 output = `verified_chunks.json`;两份 schema 写死,版本化

**OD-1(切 P2 的时机)**:**T1 ADR-006 签字后立即切**。在 PM 本地未跑通前不进入 30 件 batch。建议 1–2 件样本走完整双环境一次,测出 hand-off schema 痛点,再放大。

### 4. 反幻觉状态机(契约级别)

Pipeline 内每个 chunk 都有状态机:

```
[discovered] ──(Verifier 抓成功)──→ [verified, has_url, has_hash]
     │                                       │
     └──(抓失败)──→ [failed, reason: 4xx/timeout/license_blocked]
                                             │
                                             ↓
                              Compiler 看到 [verified] 才允许:
                                - high tier(原文截录)
                                - mid tier(摘要 ≤100 字)
                                - low tier(URL only,链接)
                              Compiler 看到 [failed] 必须:
                                - 在 bundle 中显式写一段
                                  "X 类源未到手,原因 Y"
                              Compiler **绝对不允许**:
                                - 从 [discovered] 直接生成 chunk
                                - 用其它源"脑补"该类
```

**硬约束**:
- 没有 `url` 字段的 chunk → 拒绝入册
- 没有 `content_hash` 的 chunk → 不能进 high tier
- license 字段在 schema 内做 enum 校验:`CC0 / CC-BY / CC-BY-NC-SA / © all-rights / unknown`,**unknown** 默认走 low tier
- 来源类 A/B/C/D/E 必须明示;不能写"综合"

### 5. 人在回路边界(明确什么不让 agent 做)

**必须 PM 决策 / 执行的**:
1. **T3 红线**:任何 agent 不得自主注册账号 / 充值 / 绑卡 / 对外发邮件 / 联系馆方 / 在社交平台以项目名义发帖。涉及 T3 的步骤,Pipeline 必须 escalate 到 PM 签字
2. **微信公众号订阅 + 文章摘抄**:Pipeline **不抓**;只列文章索引,人工读
3. **馆方 3D / 数字敦煌实名注册申请**:Pipeline **不申请**;ADR-006 Phase 1 不动,Phase 2 决定
4. **大陆媒体长文 + 馆方策展声明 + 真伪争议 chunk 的最终人格化措辞**:agent 起草,**PM 最终签字**(原则 C 落地的最敏感环节)
5. **30 件清单的劝退决定**:Sample 3 类型件(私立馆 / 冷窗口 / 真伪争议)是否保留,**Curator 起草 + PM 签字**;agent 不自决

**Pipeline 可自决的**:
- B 类源命中数判定 + 报告
- Discovery sub-agent 的 URL 候选生成
- Verifier 的逐 URL 抓 + hash + license enum 校验
- Compiler 的模板装订
- failure 标注 + reason 写入

### 6. 30 件诚实工时(对 PM 通报口径)

参考 `2026-05-18-discovery-pipeline-feasibility.md` §3:

| 维度 | 数字 |
|---|---|
| 单件平均工时(3 件样本外推) | 7h |
| 30 件无减折 | 210h |
| 复用红利(北朝—初唐窗口重叠 10–15 件) | -30% → 150h |
| agent 化深做后(B/E/C 自动化) | -25% → **110–115h** |
| 其中 PM 国内 IP 段(不可压缩) | **30–40h** |
| PM full-time(40h/周)+ agent 全力 | 3 周 |
| **PM 兼职(每天 1.5h 国内 IP)+ agent 跑剩余 70%** | **6–8 周(基线)** |
| 网络/反爬/PM 时间稀缺最差情形 | 10–12 周 |

**通报口径(对 PM)**:
- **6 周内**:25 件 metadata + 18 件较完整 bundle + 8 件 wow moment 工程化雏形
- **30 件全部 = Sample 2 完整度**:≥ 10 周,**且前提是清单经过 B 类源筛过**
- **绝不承诺**:"agent 一周搞定 30 件" / "全部件等深" / "Pipeline 全自动"

## 理由

1. **三角色不能合并**——Sample 1/2/3 实测中,Discovery 错(列错 URL)、Verifier 错(抓回错内容)、Compiler 错(从未抓到的源脑补文本) **是三种不同的错**,需要三种不同的契约约束。合并成单 agent 会让幻觉发生在层间,**不可审**。
2. **双环境分体是实测强制**——不是设计偏好。OD-2 实测显示沙箱出口白名单只剩 GitHub 系 + pypi,Verifier **根本跑不动**。把分体写进决策(而非"后果与风险"),是把现实约束摆在 P0 位置。
3. **B 类源是 Pipeline 唯一可在沙箱独立完成的环节**——这是宝贵的"沙箱内可独立交付"产能;应当 Day 1 起就把所有 30 件先跑一遍 B,看命中分布,**用 B 类源命中数反向校准清单**(Sample 3 这类 B=0 件,要标"叙事 wow > 数据 wow",或与 Curator 商量是否劝退)。
4. **反幻觉状态机契约化 > prompt 里写"请不要幻觉"**——3 件样本中已暴露的最容易幻觉点是"把找不到伪装成已抓到"。状态机把这条变成 schema 层硬约束,Compiler 拒绝不合规 chunk,**不依赖 agent 自觉**。
5. **人在回路边界明示 = T3 红线的工程化**——PRD 与 handoff 反复强调"不许 agent 注册 / 付费 / 发信",但实际跑起来 agent 容易把"申请 API key = 一封邮件"当成日常动作。ADR-006 把这条变成 Pipeline 的硬 escalate 触发点,**任何 agent 触到 T3 即停**。
6. **30 件诚实工时口径写进 ADR**——把 110–150h / 6–8 周写在决策文档里,而不是私下口头,**抵御后续任何"agent 一周搞定"的内外部压力**。

## 反模式(明确禁用)

- ❌ 单 agent 一把抓(违反三角色契约)
- ❌ "先跑海外 OA,大陆段后议"(OD-2 实测已关掉这条路径:海外 OA 在沙箱同样 403)
- ❌ "Pipeline 全自动,人工只验收"(30 件中至少 30–40h 是 PM 国内 IP 不可压缩工时)
- ❌ "找不到时用其它源脑补"(反幻觉状态机硬拒绝)
- ❌ 微信公众号 / 三毛游 / izi.TRAVEL / 小红书 / 抖音 KOL 内容自动抓取(ToS + 平台封杀,沿用 ADR-003 显式禁用)
- ❌ V&A main index 扩量、Met / 明清 / 占位源扩量(Curator 已 flag,需 KPI 命中论证 + Curator 签字)
- ❌ agent 自决"是否申请 API key / 注册账号"(T3 红线,必须 escalate PM)
- ❌ 把 [discovered] 状态的 chunk 直接交付 Compiler(状态机硬约束)

## 与 PRD 的同步项(待 v1 revise 时落实)

§14.1 需求附录新增三个模块:
- **F-18 Pipeline · Discovery sub-agent(URL 候选 + 论证)**·P0
- **F-19 Pipeline · Verifier sub-agent(抓取 + hash + license enum)**·P0 · 需 PM 本地 CLI
- **F-20 Pipeline · Compiler sub-agent(bundle 装订 + 反幻觉硬门)**·P0

§14.3 ADR 索引:本 ADR-006 状态由「Draft」更为「已签发」(PM 签字后)。

§1.4 founding insight 段下加 USP 段(本 ADR 不直接落,但是 T2 任务):
- 候选 B + C 合并版(Researcher 倾向):**"30 件 × 5 类源 = 150 单元。Pipeline 实测每件平均稳定到手 2–3 类;部分件只能到手 1 类。我们不承诺『AI 替你搞定一切』,我们承诺『AI 告诉你能拼到什么 + 拼不到什么 + 为什么拼不到 —— 后者本身就是中国文博数字化现状的产品哲学』"**
- USP 段定稿前 T2 任务依赖本 ADR 签字

§10 内容与知识源主体下新增 §10.5 "Pipeline 双环境分体",引用本 ADR。

## 不写入本 ADR 的范围(显式 out-of-scope)

为防止 ADR scope 蔓延,以下事项**本次不定**,各自留位:

- **embedding 模型选型**(text-embedding-3 / BGE-M3 / 智谱 / 其它)—— 等数据接通后另议
- **chunk 粒度 / overlap / 切片策略** —— 等 verified_chunks.json 累积到 ≥10 件再校
- **向量库选型**(pgvector / Qdrant / 本地 sqlite-vss)—— 不在 Pipeline 设计层
- **prompt 模板细节** —— 三角色 prompt 由 Builder 在 ADR 签字后起草,本 ADR 只定契约
- **国内 LLM 厂商选择**(智谱 / Kimi / DeepSeek 等)—— 见 `2026-05-18-cn-llm-api-reachability.md`,等 PM 切 P2 后决
- **30 件最终清单**(山博 15 + 上博 5 + 上博东馆 5 + 震旦 5)—— Curator 在本 ADR 签字后 + B 类源命中分布出来后校准

## 后果与风险

- **后果一**:Pipeline 工程量 = 写 3 个 sub-agent prompt + 一套 hand-off schema + 反幻觉状态机校验器。Builder 估 8–12h(不含 30 件 batch 跑)
- **后果二**:PM 本地 Claude Code CLI 成为 Verifier 唯一执行环境;PM 必须保证本地有效运行(网络 / Claude API key / Python 环境)。这是 Pipeline 的运维 SPOF
- **后果三**:`verified_chunks.json` schema 一旦定下,后续任何 fetch 工具(curl / requests / Playwright)都必须按这个 schema 输出,跨工具适配成本由 Builder 负责
- **风险一**:**PM 本地若也因网络 / 反爬卡某些大陆馆**,A 类源 20% 自动化估算会再下调。建议 PM 切 P2 后第一件事:用 5 分钟测 5–6 个关键大陆 URL,确认本地实际可达性
- **风险二**:**反幻觉硬门会让 bundle "看起来很穷"**(很多 chunk 标"未到手 + 原因")。这是产品哲学(原则 C)的预期表现,但 PM 心理要先认账,**不要看到第一件 bundle 出现 3/5 类源缺失就退回去 loosening 状态机**
- **风险三**:**3 个 sub-agent 的 prompt 工程化质量**直接决定 Pipeline 真实可用度。建议 Builder 起草后,Researcher + Curator + User-voice 三角色 review(对应 3 件样本各自暴露过的错点)
- **风险四**:**Hand-off schema 版本化** —— Phase A / Phase B 跨环境跑,schema 一旦变更两边要同步;建议第一版冻结 schema 后,改动走 ADR-006 amendment
- **未来重审条件**:
  1. harness 开放 OA API / 馆方 / Wikimedia 白名单(Verifier 可回流沙箱执行)
  2. 任一国内头部馆推出真正可机器化 API
  3. 30 件 batch 跑完后,实际工时与本 ADR 估算偏差 > 50%
  4. 反幻觉状态机出现 false-reject 高发(Compiler 把合规 chunk 拒了)

## 验收条件(本 ADR 签字后,Builder 启动门槛)

- [ ] PM 签字本 ADR(状态由 Draft → Accepted)
- [ ] PM 切 P2(本地 Claude Code CLI),并跑通 3 个 curl 自验(AIC + Harvard + Penn 中任一 1 200 即可)
- [ ] Curator 校准 30 件清单,B 类源命中分布出来(Phase A 在沙箱内可独立交付)
- [ ] Builder 起草 3 个 sub-agent prompt + hand-off schema v1,提 PR
- [ ] Researcher + Curator + User-voice 三角色 review
- [ ] 用 1–2 件样本跑双环境完整一遍,确认 hand-off 跑通
- [ ] 进入 30 件 batch

## 相关 ADR

- [ADR-001:产品形态选择「屏为主」](./001-form-factor.md) - 已签发
- [ADR-003:一期切片调整与知识源使用许可](./003-knowledge-sources.md) - 已签发(本 ADR 在其六层基础上加 Pipeline)
- [ADR-005:展品发现自动化(三层管道)](./005-exhibit-discovery.md) - 已签发(本 ADR 处理"哪些件已知"之后的"每件怎么填" 问题,与 ADR-005 不重叠)

[ Draft 完 · 2026-06-06 · 等 PM 签字 ]
