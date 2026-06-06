# Sample Bundle · 唐 鎏金铜思惟菩萨像(武周·长安系) · 上海博物馆东馆 · 中国古代雕塑馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:`data/pipeline/out/verified_chunks.json`(artifact_id=`shanghai-tang-gilt-pensive-bodhisattva`)

> **本件 chunk 账面(全部诚实列出)**:本 artifact_id 下共 2 条 chunk,均 `source_class=B`、`fetch_status=ok`、`license_observed=CC0`、`confidence_tier=mid`。两条都是 Met Collection API 的 CC0 元数据(JSON)。**A / C / D / E 四类源本次均未落地正文**(见第 1、3、4、5 节与第 7 节的逐类诚实交代)。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 唐 鎏金铜思惟菩萨像(武周·长安系) |
| 馆 / 厅 | 上海博物馆东馆 · 中国古代雕塑馆 · 隋唐五代单元(唐代金铜造像) |
| 朝代 | 唐(武周,7 世纪末) |
| 材质 / 尺寸 | **未到手**(本件馆方一手页面未落地;两条 ok chunk 均为海外对照件,非本件本体——见下方门槛说明) |
| 已知 accession / 编号 | **未到手**(本件馆方 ID 无 chunk) |
| 已知来源 / 出处 | **未到手**(无本件本体一手 chunk) |
| 检索关键词 | 唐 / 武周 / 思惟菩萨 / 半跏思惟 / 鎏金铜 / 金铜造像 / 上博东馆 / 中国古代雕塑馆 / pensive bodhisattva / 长安 |

> **反幻觉门槛声明(本件最关键的一句)**:`verified_chunks.json` 里本 artifact_id 下的 **2 条 ok chunk 都不是这尊上博鎏金铜思惟菩萨本体**,而是 Pipeline 为它配的两件**海外对照件**(均 Met 馆藏,CC0)。因此本 bundle 中关于"本件材质 / 尺寸 / 编号 / 出处"的字段**全部标"未到手"**——没有一条 chunk 能追到本件本体,我们就不写。下面各对照件的正文,只描述**那件对照件自己**,不外推到本件。

---

## 1. 来源 A · 馆方一手页面

**计划源**(候选清单内,本次 night-run **未落地**):上博官网雕塑馆相关文章 `https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00159756`(`fetch_hint=js_html`,`expected_license=(c)all-rights`,`sandbox_status=not_tested`)。

**A 类源未到手,原因:no ok chunk(候选 sandbox_status=not_tested,本 night-run 未产出该 URL 的 chunk)。** 该 URL 为 JS 渲染单页(SPA),候选记录注明本机 `curl -sI` 同前缀 article id 返回 200 但正文需 JS 执行 / 大陆 IP 落地,本次未取回任何馆方一手正文。馆方对本件的核心叙事(台座中空圆孔 CT 扫描、推测原属群雕胁侍件)在候选 rationale 与 exhibit-list 中有线索,但**那些线索不在任何 ok chunk 里,故本节不引用、不复述为事实**——仅记录"待 PM 国内 IP 回填"。

- **本节仅列 URL,无正文引用**(原因:无本件馆方一手 ok chunk)。
- tier / license:不适用(无 chunk)。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本节是本件**唯一有正文(元数据)落地**的一类。两条 chunk 均 `tier=mid`、`license=CC0`,**有结构化元数据截录**,无人物叙事长文。两件都是 Met 为"思惟 / 菩萨"母题配的对照件,**且两件之间本身张力很大**——一件根本不是中国的,一件根本不是思惟相。诚实标注如下。

### 2a. Met #65397 — *Pensive bodhisattva*(同母题、**跨文化**对照)

- tier:**mid** · license:**CC0**(isPublicDomain=true) · 形态:**有元数据截录**(excerpt 截到 1500 字,在 `"city"` 字段处截断;`classification`/`objectURL`/`tags` 三字段超出截录长度,**原文更长见 `raw_path`**)。
- URL:`https://collectionapi.metmuseum.org/public/collection/v1/objects/65397`
- raw_path:`data/raw/shanghai-tang-gilt-pensive-bodhisattva/B-40adaa64.json`

| 字段 | 值(直接录自 chunk excerpt) |
|---|---|
| title | Pensive bodhisattva |
| objectName | Figure |
| culture | **Korea** |
| period | Three Kingdoms period (57 BCE–676 CE) |
| objectDate | mid-7th century(objectBeginDate 636 / objectEndDate 670) |
| medium | Gilt bronze |
| dimensions | H. 8 7/8 in. (22.5 cm);W. 4 in. (10.2 cm);D. 4 1/4 in. (10.8 cm) |
| accessionNumber | 2003.222(accessionYear 2003) |
| isHighlight | true |
| creditLine | Purchase, Walter and Leonore Annenberg and The Annenberg Foundation Gift, 2003 |
| primaryImage | `https://images.metmuseum.org/CRDImages/as/original/DT11140.jpg` |

**与本件的关系(只说候选 rationale 已写、不外推)**:候选 rationale 把它定位为"东亚半跏思惟菩萨**同型对照**(Met 归三国 / 统一新罗系),撑'武周长安思惟像'的国际样式叙事;**注意:非中国件,定位为'同母题跨文化对照'而非中国出土对照**"。也就是说,这件是**朝鲜半岛**的鎏金铜思惟像——尺寸仅 22.5cm,与本件"高约 11cm 的小型鎏金铜思惟"在材质 / 母题 / 体量量级上同属一个东亚金铜思惟像谱系。**但它不能用来推断本件的任何具体属性**。

### 2b. Met #42718 — *Bodhisattva, probably Avalokiteshvara (Guanyin)*(身姿演化对照)

- tier:**mid** · license:**CC0**(isPublicDomain=true) · 形态:**有元数据截录**(excerpt 在 `"creditLine": "The Sackle…"` 处截断;creditLine 余下文字、`classification`/`GalleryNumber`/`objectURL`/`tags` 超出截录,**原文更长见 `raw_path`**)。
- URL:`https://collectionapi.metmuseum.org/public/collection/v1/objects/42718`
- raw_path:`data/raw/shanghai-tang-gilt-pensive-bodhisattva/B-86a514d3.json`

| 字段 | 值(直接录自 chunk excerpt) |
|---|---|
| title | Bodhisattva, probably Avalokiteshvara (Guanyin) |
| objectName | Figure |
| culture | China |
| period | Northern Qi dynasty (550–577) |
| objectDate | ca. 550–560(objectBeginDate 550 / objectEndDate 560) |
| medium | **Sandstone with pigment** |
| dimensions | H. 13 ft. 9 in. (419.1 cm);连座 H. 14 ft. 9 in. (449.6 cm) |
| accessionNumber | 65.29.4(accessionYear 1965) |
| isHighlight | false |
| primaryImage | `https://images.metmuseum.org/CRDImages/as/original/DP213356.jpg` |

**与本件的关系(只说候选 rationale 已写、不外推)**:候选 rationale 称其为"中国本土菩萨造像(**非思惟相**,作北朝→唐菩萨身姿演化对照件)"。须诚实点出**两层落差**:① 它是**北齐砂岩**(sandstone)的**巨型立像**(逾 4 米),与本件"唐代小型鎏金铜思惟像"在年代(早约 150 年)、材质(石 vs 铜)、体量(米级 vs 厘米级)、姿态(立像 vs 半跏思惟)上**全部不同**;② 它撑的是"北朝菩萨 → 唐菩萨"的**纵向演化轴**,不是同型对照。作为"演化序列的上游锚点"可用,但**它本身并不像本件**。

> **B 类小结(原则 C/D 视角)**:Pipeline 给本件配的两件海外对照,恰好暴露一种**有用的张力**——一件把"思惟相"母题拉到**朝鲜半岛**(国际样式横轴),一件把"中国菩萨造像"拉回**北齐砂岩巨像**(本土演化纵轴)。两者都**不是**上博那尊唐代小铜像本体,但合起来勾出本件所处的坐标系:**一个横跨东亚、纵贯北朝到唐的金铜 / 石造思惟与菩萨像网络**。这正是"跨馆流散件聚合 / 母题对照"(原则 C/D)能 surface 的东西——**前提是诚实承认:本件本体我们一条 chunk 都没拿到。**

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。** 本件候选清单(4 条)中**没有任何 C 类(学术论文 / 学者文章)候选**,verified_chunks 中也无本件 C 类 chunk。

- 无 URL、无正文。tier / license:不适用。
- 工程含义:本件的学术覆盖在 night-run 阶段为空白,与同窗口的"白石佛 / 响堂山"件(学术热点、故宫院刊 + 佛光山 + Met OA 多源命中)形成鲜明落差——"唐代金铜思惟像 + CT 检测重写身份"这条线的学术源**需要后续 discovery 单独补候选**,本 bundle 不补、不脑补。

---

## 4. 来源 D · 现场场域

**计划源**(候选清单内,本次 night-run **未落地**):知乎《上博东馆参观全记录:中国古代雕塑馆》`https://zhuanlan.zhihu.com/p/13821187870`(`expected_license=(c)all-rights`,`expected_density=low`)。

**D 类源未到手,原因:no ok chunk(候选记载本机 `curl -sI` 403,host 限制;大陆 IP 可达 per pilot meta)。** 候选 rationale 提到该现场记录"含思惟菩萨 CT 扫描细节复述",但**该正文不在任何 ok chunk 里**——故本节**只列 URL,不引正文、不复述 CT 细节为事实**。

- **本节仅列 URL,无正文引用**。tier / license:不适用(无 chunk)。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。** 本件候选清单中**无任何 E 类候选**,verified_chunks 中亦无本件 E 类 chunk。

- 无 URL、无正文。tier / license:不适用。
- (注:第 2 节两件 Met CC0 件自带 Getty AAT / Wikidata 受控词表 tag——Contemplation / Buddhism / Bodhisattvas / Avalokiteshvara——这是潜在的跨域 OA 链接点,但它们挂在**对照件**上,不构成本件本体的 E 类源,故不计入。tag 详情见各 raw_path。)

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **1 / 5**。仅 **B 类**有正文(元数据)落地(2 条 ok chunk,均 CC0 / mid)。A、D 有候选但未落地(仅 URL,not_tested / 403);C、E 无候选(no candidate sourced)。 |
| 各 chunk 的 tier + license | 两条均 `tier=mid` / `license=CC0` / `fetch_status=ok`。**均为结构化元数据,非长文叙事**;两条均 `excerpt_truncated=true`,尾部字段见 raw_path。 |
| 有正文截录 / 仅元数据 / 仅 URL | **仅元数据**:Met #65397、#42718(B)。**仅 URL**:上博官网(A)、知乎现场记(D)。**完全无**:C、E。 |
| 本件 bundle 完整度自评 | **低**。本件最致命的缺口是:**没有任何 chunk 追得到本件本体**——所有 ok chunk 都是对照件。这与"白石佛"样本(馆方叙事密、海外数据极密)形成反差,诚实记录、不灌水。 |
| 给 PM 的 wow moment(一句话) | "**这尊上博唐代小铜思惟像我们一条本体数据都没抓到,但 Pipeline 已经替它在 Met 找好了两个坐标:一件是朝鲜半岛的鎏金铜思惟像、一件是 4 米高的北齐砂岩菩萨——一横一纵,把'思惟相'这个母题钉在了跨越东亚、贯穿北朝到唐的网里。馆方说明牌只讲这一尊,AI 已经把它该挂的网先织好了——只等本体数据回填。**" |

---

## 7. 反向发现 / 该展品不工作的源(含 failed chunk 的诚实原因)

- **本件无 `fetch_status=failed` 的 chunk**——失败发生在更早的"未产出 chunk"阶段:A(上博官网,SPA,not_tested)与 D(知乎,本机 403)**根本没进入 fetch / 没产出 chunk**,而非 fetch 后失败。故无 failed chunk 可在此罗列失败正文,只能记录"未到手"。
- **最大反向发现:本件 ok 数据 = 0 条本体**。`verified_chunks.json` 里本 artifact_id 下 2 条 ok chunk **全部是对照件**(Met #65397 / #42718),没有一条是上博那尊唐鎏金铜思惟菩萨本身。**这是本件 night-run 最该让 PM 看到的事实**:Pipeline 能把对照网先织好,但**本体一手数据(材质 / 尺寸 / 编号 / CT 叙事)全卡在 A(SPA 官网)+ D(403 大陆源)两道墙后**,需人在回路(国内 IP / VPN)回填。
- **对照件的"非中国 / 非思惟"落差是诚实记录、不是缺陷**:Met #65397 是 Korea 件、#42718 是北齐立像非思惟相——两件都**不能**用来推断本件属性。把它们当"同型对照"会越界;本 bundle 仅按候选 rationale 标注其对照定位。
- **C / E 两类完全空白(no candidate sourced)**:本件的学术源与数字人文源在 discovery 阶段就没产出候选,需后续单独补 discovery,不在本 night-run 范围内补。

---

**主要来源(本 bundle 实际引用的 ok chunk)**:
- Met Collection API #65397 *Pensive bodhisattva*(Korea, gilt bronze):`https://collectionapi.metmuseum.org/public/collection/v1/objects/65397` · raw:`data/raw/shanghai-tang-gilt-pensive-bodhisattva/B-40adaa64.json` · CC0 / mid / ok
- Met Collection API #42718 *Bodhisattva, probably Avalokiteshvara (Guanyin)*(China, Northern Qi, sandstone):`https://collectionapi.metmuseum.org/public/collection/v1/objects/42718` · raw:`data/raw/shanghai-tang-gilt-pensive-bodhisattva/B-86a514d3.json` · CC0 / mid / ok

**未到手(仅候选,无 ok chunk,不引正文)**:
- A 上博官网雕塑馆文章:`https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00159756`(SPA / not_tested)
- D 知乎《上博东馆参观全记录:中国古代雕塑馆》:`https://zhuanlan.zhihu.com/p/13821187870`(本机 403)
- C / E:no candidate sourced

**[ Sample Bundle (night-run AI 装订) 完 · 2026-06-07 · 1/5 类到手,本体 0 条,诚实标完整度低 ]**
