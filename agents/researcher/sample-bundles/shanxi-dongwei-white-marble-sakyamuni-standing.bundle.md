# Sample Bundle · 东魏白石雕释迦立像（秀骨清像、褒衣博带） · 山西博物院（佛风遗韵 · 北朝风貌单元）

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-dongwei-white-marble-sakyamuni-standing)

> **本件诚实底色(先把话说在前)**:这件展品在 verified_chunks.json 里只有 **3 条** chunk,其中 **2 条 ok**(均为 B 类海外**对照件**,非本件本身)、**1 条 failed**(C 类学术 PDF)。A / D / E 三类**根本没有 candidate**。也就是说——*关于本件展品自身,pipeline 这一轮没有取到任何一手正文*;能拼到的全部是"用海外流散件给本件做材质/产地/残损对照"的侧面证据。下面逐节如实标注,绝不拿对照件的属性冒充本件的属性。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 东魏白石雕释迦立像(秀骨清像、褒衣博带) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵(中国古代佛教造像专题陈列)· 北朝风貌单元 |
| 朝代 / 公元年范围 | 东魏(534–550;北朝) |
| 材质 | 白石(汉白玉 / 曲阳系白石)—— *此为候选清单 artifact_name_zh 与 exhibit-list 的标定,本轮无馆方一手页面或对照 chunk 复核* |
| 已知 accession / 编号 | **未到手**(山西博物院藏品库为 SPA,本轮未锁定真实 collection id;见 §1) |
| 已知来源 / 出处 | **未到手**(无馆方一手 chunk;"曲阳系白石"为候选清单 rationale 的推断,非本轮已验证) |
| 检索关键词 | 东魏 / 白石 / 汉白玉 / 曲阳 / 修德寺 / 释迦立像 / 秀骨清像 / 褒衣博带 / 山西博物院 / 佛风遗韵 |

**为什么这件值得做(承原则 C/D)**:候选清单给的选品论证是——"秀骨清像、褒衣博带"是北魏孝文帝汉化改制后造像"去胡化、士大夫化"的标志样式,是**汉化政治在艺术上的投影**。这是一个干净的"叙事—权力"切口(原则 C)。但必须诚实:**这一论证目前停留在选品 rationale 层,本轮 pipeline 没有取到任何能支撑它的一手或学术正文**——它是"为什么选",不是"已经拼到"。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

verified_chunks.json 中本件**没有任何 A 类 chunk**;候选清单 sources_candidates.full30.json 里本件也**没有列出 A 类 candidate**。

工程上下文(来自 strategy-curator shortfall,非本件 chunk):山西博物院官网藏品库为 SPA(`/sx/collection/detail/id/<id>`),Discovery 阶段未能锁定任何佛教造像的真实数字 id(Wayback CDX 空、官方 list/search 端点 404)。因此本件**连一个可下载的馆方单件 URL 都没有进入候选**。

→ 对 ADR-006:本件是"A 类彻底缺位"的诚实样本。PM 若要补 A,需在山西博物院站内检索框用中文名再定位真实 id。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本节是本件**唯一有 ok 内容的来源**。但请注意一个硬事实:**两条 B 类 chunk 都不是本件本身,而是海外馆的对照件**——一件北魏砂岩造像、一件北魏佛首。它们的价值在"对照"(材质对照、残损对照),不在"等同"。

### 2.1 Met · objectID 42719 · Buddha Dipankara (Randengfo)
- **tier**:mid  **license**:CC0  **fetch_status**:ok  **形态**:**有元数据正文截录**
- URL:`https://collectionapi.metmuseum.org/public/collection/v1/objects/42719`
- raw_path:`data/raw/shanxi-dongwei-white-marble-sakyamuni-standing/B-7bf23c3c.json`(excerpt 在 json 里截到 1500 字,原始 JSON 更长见 raw_path)

可引用的馆方字段(逐条追得到 excerpt):

| Met 字段 | 值 |
|---|---|
| objectName / title | Stele · "Buddha Dipankara (Randengfo)" |
| accessionNumber | 65.29.3(accessionYear 1965) |
| period / objectDate | Northern Wei dynasty (386–534) · **dated 495** |
| medium | **Sandstone** |
| dimensions | H. 127 in. (322.6 cm); W. 75 in. (190.5 cm); D. 28 in. (71.1 cm) |
| isPublicDomain | true(primaryImage CC0 可用) |

**对照张力(chunk notes 自带,原则 D · 跨材质/跨产地对照)**:这是一件**北魏纪年(495)砂岩立像**。和本件标定的"东魏白石"放在一起,构成 chunk 自己点出的那组对照——**"砂岩 vs 白石""海外 vs 山西"**。一个在纽约、有 CC0 高清图、有精确纪年与尺寸;一个在太原、本轮连 accession 都没拿到。**对照本身就 surface 了一件事:同一信仰系统的造像,在海外被结构化、可程序化地公开,在馆方一手层却对 pipeline 关着门。** 这正是原则 C 想让用户"觉察"的那层不对称。

> 诚实边界:Met 这件是北魏(495)、砂岩,本件标定东魏、白石——**朝代和材质都不同**。它是对照件,不能用它的纪年/尺寸/材质去描述本件。

### 2.2 V&A · O492022 · Head of Buddha
- **tier**:mid  **license**:**unknown**  **fetch_status**:ok  **形态**:**仅列 URL + 标题(license=unknown,按硬门不引正文)**
- URL:`https://collections.vam.ac.uk/item/O492022/`
- 标题:Head of Buddha(V&A systemNumber O492022)

按反幻觉硬门:`license_observed=unknown` → **只列 URL + 标题,不引正文**。chunk 里虽抓到了 HTML(accession CIRC.292-1950、Northern Wei、carved stone 等),但许可状态未知,本 bundle **不转录其正文字段**,仅记录其存在,供 PM 在合规确认后再用。

**它本来想承载的对照(来自 chunk notes,可引)**:这是一件北魏**佛首**流散件,定位是补"**立像 vs 仅存佛首**"的残损叙事对照——本件是相对完整的立像,V&A 这件只剩一颗头。一个石窟/作坊系统的造像被拆成"身在此处、首在彼馆"的碎片,是跨馆流散件聚合叙事(原则 D)最直白的形态。但本轮**只能把这条线索记下,不能展开**,因为许可未知。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手(failed),原因:ConnectError — EOF occurred in violation of protocol (_ssl.c:1129)。**

- 唯一 C 类 chunk:荣宝斋《玉石梵像—曲阳修德寺遗址出土北朝隋唐佛教造像之考察》
- URL:`https://rongbaozhai.cn/index.php?a=show&c=index&m=shukan&modelid=28&showid=51&shukanid=7`
- **tier**:mid  **license**:(c)all-rights  **fetch_status**:**failed**(SSL 握手即断,raw_path 空,excerpt 空)

这条本是本件学术对照里**最切题的一条**——曲阳修德寺正是"曲阳系白石造像"的核心出土地,直接对应本件标定的"曲阳系白石"。但抓取在 SSL 层就失败(EOF in violation of protocol),**没有取到任何正文**。

→ 对 PM:该 URL 由 Discovery 经 WebSearch 命中、未单独 curl 复核;night-run httpx 实抓 SSL 失败。PM 需国内 IP / curl 复核可达性。**在它到手之前,本件"曲阳系白石"这条最关键的学术支撑是空的。**

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。**

verified_chunks.json 中本件无 D 类 chunk;候选清单中本件无 D 类 candidate。本轮没有澎湃 / 公众号 / izi.TRAVEL 等现场长文进入流程。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

verified_chunks.json 中本件无 E 类 chunk;候选清单中本件无 E 类 candidate。芝大响堂山项目、数字敦煌、CBETA 等数字人文源**本轮均未对本件起草 candidate**。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **1 / 5 有 ok 正文内容**(仅 B:Met 元数据可引);其中 B 的另一条(V&A)因 license=unknown 降级为仅 URL+标题。**A / D / E 三类零 candidate;C 类 failed。** |
| 各 chunk tier + license + 形态 | Met B:mid / CC0 / **有元数据截录**。V&A B:mid / unknown / **仅 URL+标题**。荣宝斋 C:mid / (c)all-rights / **failed 无正文**。 |
| 本件自身有没有一手内容? | **没有。** 0 条 A,0 条本件自身的 chunk。能拼的全是海外**对照件**,且两件对照件朝代/材质都与本件标定不完全一致(Met 北魏砂岩、V&A 北魏佛首)。 |
| bundle 完整度自评 | **低**(本批最薄的一类样本之一)。和已验 pilot"北齐白石佛立像(响堂山系)"的 3/5 相比,本件实际是"对照件勉强 1 类",差距很大。 |
| 给 PM 的 wow moment 一句话 | "**这件东魏白石释迦,我们手上一个字的馆方资料都没有——连编号都拿不到。但纽约大都会一件北魏砂岩立像有 CC0 高清图、有'公元495年'的精确纪年、有到毫米的尺寸;伦敦 V&A 还躺着一颗同系统的北魏佛首。同一个信仰系统的造像,在海外是结构化、可下载、对 AI 敞开的;在它的本馆,对 pipeline 是一扇关着的门。AI 能看见的,恰恰是这道门两边的不对称。**"(原则 C:叙事/权力的不对称) |

---

## 7. 反向发现 / 该展品不工作的源(诚实清单)

- **C 类 荣宝斋曲阳修德寺 PDF(failed)** —— `rongbaozhai.cn` 在 httpx 抓取时 **SSL 握手即断**(`ConnectError: EOF occurred in violation of protocol (_ssl.c:1129)`),raw_path 与 excerpt 全空。这是本件**最痛的一处失败**:它本可坐实"曲阳系白石"的学术归属,却一个字没拿到。PM 需 curl / 国内 IP 复核。
- **A 类馆方页(no candidate)** —— 山西博物院藏品库 SPA,Discovery 未锁定本件真实 collection id,本件连候选 URL 都没有。**accession / 出处 / 馆方说明牌全部为空。**
- **D / E 两类(no candidate)** —— 本轮对本件未起草任何现场场域、数字人文 candidate。
- **两条 B 类对照件的"对照"风险** —— Met 42719 是**北魏(495)砂岩**、V&A O492022 是**北魏佛首**,二者与本件标定的"东魏白石立像"在**朝代、材质、器型**上都有差异。它们能做"材质对照 / 残损对照"的引子,但**不能用来描述、推断本件自身的任何属性**。本 bundle 已严格只在"对照"语境下使用它们。
- **V&A 许可门(unknown)** —— O492022 的 license_observed=unknown,本轮**只登记其存在,不转录正文**;在 PM 完成合规确认前,这条线索不可展开。

---

**到手源清单(可追溯)**:
- Met API objectID 42719(B,CC0,ok):`https://collectionapi.metmuseum.org/public/collection/v1/objects/42719` · raw:`data/raw/shanxi-dongwei-white-marble-sakyamuni-standing/B-7bf23c3c.json`
- V&A O492022(B,unknown,ok,仅 URL+标题):`https://collections.vam.ac.uk/item/O492022/` · raw:`data/raw/shanxi-dongwei-white-marble-sakyamuni-standing/B-86dce871.html`
- 荣宝斋《玉石梵像—曲阳修德寺遗址出土北朝隋唐佛教造像之考察》(C,(c)all-rights,**failed**):`https://rongbaozhai.cn/index.php?a=show&c=index&m=shukan&modelid=28&showid=51&shukanid=7`

**[ Sample Bundle · 东魏白石雕释迦立像 · night-run AI 装订 · 2026-06-07 · 完 ]**
