# Sample Bundle · 红山文化 勾云形佩(勾云形器) · 震旦博物馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=aurora-hongshan-cloud-shaped-pendant)

> **反幻觉声明**:本 bundle 仅引用 verified_chunks.json 中本件 artifact_id 且 fetch_status=ok 的 chunk(共 2 条:A 类 1、B 类 1)。凡 license=unknown 或 tier=low 的 chunk,只列 URL + 标题,不引正文。缺源类(C/D/E)在对应节如实标"未到手"。本件无 fetch_status=failed 的 chunk。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 红山文化 勾云形佩(勾云形器) |
| 馆 / 厅 | 震旦博物馆(Aurora Museum,上海) · 「灵光:新石器时代玉器特展」(5F)第二部分 · 红山系 |
| 朝代 | 新石器时代 · 红山文化 |
| 材质 / 尺寸 | **未到手**(本件 2 条 ok chunk 均未给出该件的材质与尺寸) |
| 已知 accession / 编号 | **未到手**(无单件馆方页;chunk 中无编号) |
| 已知来源 / 出处 | **未到手**(本件 chunk 未含出土地或传世出处) |
| 检索关键词 | 红山文化 / 勾云形器 / 勾云形佩 / 震旦博物馆 / 古器物学 / 料工形纹 / Hongshan jade / cloud-shaped |

**说明**:0 节表格中「材质 / 编号 / 出处」三格标"未到手",是因为本件落到 night-run 的两条 ok chunk(A 类研究中心页 + B 类 V&A 负结果)都不含单件级器物信息。这正是本件的特征——它是一件**靠"源的结构"而不是"器物字段"说话**的样本。展期定位「5F 第二部分 · 红山系」与朝代信息取自策展对照(exhibit-list.md),非来自本件 chunk 正文,故不进入 chunk 可追溯的正文引用,仅作识别用。

---

## 1. 来源 A · 馆方一手页面

**chunk**:`A-2f78112c.html` · fetch_status=**ok** · fetch_method=playwright→html · **license=(c)all-rights** · **tier=mid**
**URL**:https://www.auroramuseum.cn/zh/research/antiquarian-research-center
**标题**:震旦古器物学研究中心页

**到手形态**:**有正文截录**(license=(c)all-rights、tier=mid,按硬门可引用,但属馆方版权内容,以下为注明出处的有限截录,不作再分发授权)。

馆方研究中心页自述其方法论核心为**「料、工、形、纹」**:

> 「震旦古器物学以"料、工、形、纹"为研究核心,对古器物进行分项与整合,在探究物源的基础上,还原物质文化与社会生活……使古器物转化为可供研究的物质史料,并进行跨学科合作研究。」(震旦古器物学研究中心页,馆方原文)

页面同时载明该中心**下设研究图书室、古器物学教学标本室**,并已在**北京大学、复旦大学等高校设立教学实践基地**。

**这一节的张力(原则 C/D)**:这是一条**方法论页,不是单件展品页**。馆方在这里 surface 的叙事是"我们用一套自有的『料工形纹』器物学范式来读玉"——它把红山勾云形器放进震旦自己的**学术权威框架**里,而不是放进考古出土脉络里。对本件来说,这恰恰是值得让用户**觉察**的一层:你在展厅看到的"勾云形佩"标签背后,站着的是一套馆方自定义的、与学院考古并行的解读体系。**馆方一手能给的是"范式",给不出的是"这一件的出土脉络"**——后者在本件的 ok chunk 里是空的(见 0 节与第 7 节)。

**工程意义(给 ADR-006)**:震旦官网为 Next.js SPA,本件靠 playwright→html 才取到正文(裸 curl 仅得 HTTP 头)。A 类**可达但只到"研究中心方法论页"这一层,未触及单件展品正文页**——这与 exhibit-list shortfall 标注一致(震旦 4 件均 reportage_confirmed,A 类无独立单件 URL)。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk**:`B-0269b856.json` · fetch_status=**ok** · fetch_method=httpx→json · **license=unknown** · **tier=mid** · excerpt_truncated=true
**URL**:https://api.vam.ac.uk/v2/objects/search?q=Hongshan+jade&page_size=10
**标题**:V&A「Hongshan jade」检索负结果

**到手形态**:**仅元数据 / 负结果**(license=**unknown** → 按硬门不引正文;但 API 返回体本身的 `info.record_count` 是结构性事实,非版权正文,以下据此陈述零命中,不编造任何 object id)。

| 字段 | 值 |
|---|---|
| 检索词 | `Hongshan jade` |
| `record_count` | **0**(`record_count_exact: true`) |
| `records` | `[]`(空) |
| 各 venue(South Kensington / East Storehouse / East Museum / Wedgwood / Young V&A / Dundee)计数 | 全部 **0** |

**这一节就是本件的核心张力(原则 C/D)**:**海外 OA 大馆 V&A 对「红山玉」检索返回真实的零命中。** 这不是"我们没抓到",而是"那里本来就没有"——`record_count_exact: true` 把这个空白钉成了**实据**。

把它和第 1 节并起来看,本件 demonstrate 了一种和「响堂山白石佛」(Sample 2)**完全相反**的源结构:

- 响堂山那一类:**馆方自标出处 → 海外大馆密集对照 → 流散件可跨馆拼合**(收藏结构"满")。
- 红山勾云形器这一件:**馆方只给方法论页 → 海外大馆零命中 → 无对照可拼**(收藏结构"空")。

这个"空"本身是有叙事价值的:**红山玉(尤其勾云形器这类几何—抽象礼器)没有沿着近代流散—西方收藏的那条路径进入 V&A 这样的殖民—帝国收藏体系**。对一个想"读懂叙事背后权力结构"的用户(原则 C),"为什么伦敦没有这件的对照物"本身就是一个问题,而 pipeline 给出的是一个**可验证的零**,不是一句脑补。

**工程意义(给 ADR-006)**:**负结果是一等公民。** Pipeline 应把 `record_count=0` 作为可入库的有效 chunk(本件已这样做),而不是当成"抓取失败"丢弃。建议 Builder 在 schema 上区分 `fetch_status=ok & result_empty=true`(真零命中,有叙事价值)与 `fetch_status=failed`(没抓到,无结论)。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。** 本件在 sources_candidates.full30.json 中只列了 A、B 两条候选,未投放任何 C 类(学术论文 / 学者文章)候选;verified_chunks.json 中本件也无 C 类 chunk。故本节无任何正文,亦不旁证脑补。

> 备注(不构成引用):若 PM 要补 C 类,红山勾云形器的学术脉络应优先指向"勾云形器功能/分型"的考古学专论与红山玉礼制研究,但**这些在本次 night-run 数据里都不存在**,不在此续写。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。** 本件无 D 类(现场报道 / 公众号长文 / 音频导览)候选,verified_chunks.json 中本件无 D 类 chunk。

> 备注:exhibit-list 显示震旦 4 件的"存在性"是靠馆方授权的澎湃导读(reportage)确认的,但**那条澎湃导读的 chunk 未以本件 artifact_id、fetch_status=ok 落入 verified_chunks.json**,故按硬门**不引**;此处只如实标"未到手",不借策展笔记充当现场源。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。** 本件无 E 类(数字人文 / 跨域 OA / 3D / 数据集)候选,verified_chunks.json 中本件无 E 类 chunk。本节无正文。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**(A、B);C / D / E 均 no candidate sourced |
| 各 chunk 的 tier + license | **A**:tier=mid · license=(c)all-rights · **有正文截录**(馆方版权,有限引用)；**B**:tier=mid · license=unknown · **仅元数据/负结果**(record_count=0) |
| failed chunk | **无**(本件 2 条 chunk 均 fetch_status=ok) |
| 完整度自评 | **薄**(thin·AB,与 exhibit-list 标注一致)。但"薄"在本件不等于"失败"——B 类的零命中是有内容的实据 |
| 给 PM 的 wow moment(一句话) | **"震旦把这件红山勾云形佩放进自己『料工形纹』的器物学框架里讲;而当 AI 去伦敦 V&A 问『有没有红山玉对照』,得到的是一个验证为真的零——红山玉根本没走进那套西方殖民收藏体系。馆方给你范式,海外给你空白,这件展品最有价值的恰恰是『为什么伦敦没有它』。"** |

**与样本库其他件的对照价值**:本件应作为「**收藏结构空白**」的标准样本,与「响堂山白石佛」(满结构、可跨馆拼合)配成一对 demo——一件证明 pipeline 能聚合流散件,一件证明 pipeline 能**诚实呈现"无对照"这件事**。两者合起来才说明 pipeline 不灌水(原则 C/D)。

---

## 7. 反向发现 / 该展品不工作的源

- **A 类只到"方法论页",触不到单件展品页**:震旦官网 Next.js SPA,playwright→html 取到的是研究中心通用页,**不含勾云形器单件的材质 / 尺寸 / 编号 / 出处**。0 节四个字段空,根因在此。**人在回路**:PM 需在馆方站内或展览图册定位单件信息。
- **B 类是"真零命中",不是"抓取失败"**:V&A `Hongshan jade` → `record_count=0`(exact)。这条**该工作的源工作了,只是结果为空**;诚实记录为"海外 OA 缺红山勾云形器对照"。
- **C / D / E 三类:no candidate sourced**:本件 discovery 阶段只投放了 A、B 两条候选,未投放学术 / 现场 / 数字人文候选。这是**候选投放的覆盖缺口**,不是抓取失败。给 ADR-006:对"收藏结构空白"型展品,A+B 两类已能交付核心叙事(范式 vs 空白),但若要支撑原则 D 的"知识结构网络",仍需补 C(勾云形器分型学术)与 E(红山玉数字人文 / 数据集)。
- **本件无 fetch_status=failed 的 chunk** —— 无失败抓取需记录。

---

**主要来源(可追溯 chunk)**:
- A:震旦古器物学研究中心页 — https://www.auroramuseum.cn/zh/research/antiquarian-research-center(fetch_status=ok · license=(c)all-rights · tier=mid · raw:`data/raw/aurora-hongshan-cloud-shaped-pendant/A-2f78112c.html`)
- B:V&A objects search「Hongshan jade」— https://api.vam.ac.uk/v2/objects/search?q=Hongshan+jade&page_size=10(fetch_status=ok · license=unknown · tier=mid · record_count=0 · raw:`data/raw/aurora-hongshan-cloud-shaped-pendant/B-0269b856.json`)

**[ Aurora 红山勾云形佩 · night-run AI 装订 · 2026-06-07 完 ]**
