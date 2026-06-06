# Sample Bundle · 南涅水石刻 · 北魏造像塔（窖藏石刻造像塔） · 山西博物院（佛风遗韵）

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-nannieshui-northern-wei-votive-pagoda)

> **装订口径(反幻觉)**:本件在 verified_chunks.json 中仅 3 条 fetch_status=ok chunk(B / C / D)。下文每段正文都追得到其中某条 chunk 的 excerpt_or_metadata;凡 chunk 缺失、或 license=unknown / tier=low 的,只列 URL+标题、不引正文,并显式标注。该件无 failed chunk,但 A 类有候选却**未落 ok chunk**(其候选 URL 实际落到了别件),E 类**无候选** —— 两条都在第 7 节如实写。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 南涅水石刻 · 北魏造像塔（窖藏石刻造像塔） |
| 馆 / 厅 | 山西博物院 · 佛风遗韵(中国古代佛教造像专题陈列)· 北朝风貌单元 |
| 朝代 / 公元年范围 | 北魏(386–534);南涅水窖藏纪年北魏永平三年(510)起 —— 来源:chunk D 元信息 |
| 材质 / 形制 | 石刻;窖藏出土,形制分**造像塔 / 造像碑 / 单体造像**三类 —— 来源:chunk D 元信息 |
| 已知 accession / 编号 | **未到手**(本件无馆方一手单件 ID 落入 ok chunk;见第 1、7 节) |
| 已知来源 / 出处 | 山西长治沁县南涅水村窖藏(地名即器名);"晋阳轴"之外的本地民间集资造像 —— 出处叙事见 chunk D 元信息 |
| 检索关键词 | 南涅水 / 沁县 / 造像塔 / 窖藏石刻 / 北魏 / 民间造像 / 二郎山石刻馆 / 山西博物院 / 佛风遗韵 / votive pagoda / Northern Wei stele |

**为什么这件能承载原则 C / D**:
南涅水是**民间集资**的窖藏造像塔群,正好与同省的**云冈皇家石窟**(平城皇室"帝佛合一")构成"官—民"权力结构对照(原则 C)。本件的 bundle 价值不在单件信息量,而在它能不能把"山西窖藏整塔(民间)"与"海外流散单件碑(被拆走的个体)"、"陕西标型碑(学术类型学坐标)"三条线**连成关系网**(原则 D)。下文三类源恰好各占一条线 —— 这也是本件最干净的看点。

---

## 1. 来源 A · 馆方一手页面

**该件 A 类候选**:腾讯新闻《走进山西博物院·佛风遗韵展厅》专题报道 `https://news.qq.com/rain/a/20230907A04WHD00`(候选元信息称:明确记述北朝风貌单元含南涅水造像塔,确认该件在馆陈列)。

**到手情况**:**A 类未到手(无 ok chunk)**。
- 在 verified_chunks.json 中,本 artifact_id 下**没有 A 类 chunk**。
- 该候选 URL(qq.com/...20230907A04WHD00)在 verified_chunks 里确实有一条 ok chunk,但其 `artifact_id` 标的是**别件**(`shanxi-northern-qi-guanyin-pentad`,D 类),其正文未必针对南涅水塔。按硬门"只引本件 artifact_id 且 fetch_status=ok 的 chunk",**本件不借用该条**,也不脑补其内容。
- **失败/缺位原因(如实)**:A 类馆方单件页对本件 = `no ok chunk for this artifact_id`(候选 URL 的 ok chunk 归属到了另一件)。山西博物院官网藏品库为 SPA(详情走 /sx/collection/detail/id/<id>),本件未锁到馆方单件真实 id —— 与 exhibit-list 对该院 A 类的整体诚实标注一致。

**置信度**:不适用(无正文)。**本节不引任何正文**。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk B** · tier=**mid** · license=**CC0** · fetch_status=**ok** · 有正文截录(CC0,可引)。
**源**:Cleveland Museum of Art,*Stele with Maitreya and Attendants*,id=1959.130 / 135586
`https://clevelandart.org/art/1959.130`

**到手内容(摘自 chunk B excerpt,CC0)**:
- 标题:**Stele with Maitreya and Attendants**
- 纪年:**500**(China, **Northern Wei dynasty (386–534)**)
- 页面含 "Visually Similar by AI"、provenance 可能不准确的更正声明等馆方标准模块(CC0 元数据)。
- chunk 元信息标注此件经 CMA API 实查(via_vpn=True),与南涅水北魏早期造像**同代**(CMA 此碑 dated 500;南涅水窖藏最早纪年 510,见 chunk D)。

**这条为什么是 bundle 的张力点(原则 C/D)**:
CMA 这件是一块**被拆离原境、单独流散到海外**的弥勒造像碑(500 年,与南涅水窗口几乎贴合);而南涅水是一**整窖、整塔、留在原地**的民间造像群。同一窗口、同一造像母题,一个"被切成单件进了海外馆的展柜",一个"整窖留在沁县二郎山" —— 这正是"海外流散单件碑 vs 山西窖藏整塔"的对照雏形。**注意**:chunk B 的正文只给到 CMA 此碑自身的年代/题材;它与南涅水的"同代/对照"是 chunk 元信息所标的**编目层判断**,不是说两者同窟或同源 —— 不脑补血缘关系,只做"同窗口、不同命运"的结构对照。

**置信度**:**中**(CC0 单件元数据干净可引;但"可与本件对照"是编目层判断,非考古证据)。

---

## 3. 来源 C · 学术论文 / 学者文章

**chunk C** · tier=**mid** · license=**unknown** · fetch_status=**ok** · **仅列 URL + 标题,不引正文(硬门:license=unknown)**。
**源**:胡文和《(陕西)北魏道(佛)教造像碑、石类型和形象造型探究》,《考古与文物》2007 年第 4 期,山西大学云冈学研究院库
`https://ygx.sxu.edu.cn/db/期刊/kgyww/kgyw2007/0704pdf/070411.pdf`
raw_path:`data/raw/shanxi-nannieshui-northern-wei-votive-pagoda/C-eda42151.pdf`(excerpt_truncated=true,原文更长见 raw_path)

**到手情况**:**仅元数据 / 仅 URL**。
- 该 PDF 的 license_observed=**unknown**,按反幻觉硬门**不引正文段落**,即便 excerpt 里有可读的中文也不在 bundle 里转述其论点。
- 仅保留 chunk 元信息层面的**定位**:这是一篇造像碑/造像塔的**类型学体系化分析**(以陕西耀县药王山等标型碑为坐标),元信息标其"直接支撑南涅水塔的学术坐标"。
- **价值(不依赖正文也成立)**:它给本件提供的是一条"**学术类型学**轴" —— 即把南涅水塔放进北朝造像碑/塔的分类谱系里去读。具体论断需 PM 在回路中打开 PDF 自验(license 确认后方可引用)。

**置信度**:**中**(URL/标题/学术定位可靠;正文因 license=unknown 未引,论点未自验证)。

---

## 4. 来源 D · 现场场域

**chunk D** · tier=**mid** · license=**(c)all-rights** · fetch_status=**ok** · 有可读元信息;**正文 excerpt 在 JSON 中为编码损坏(mojibake),原文见 raw_path**。
**源**:中国文联《中国最大民间石刻陈列馆:山西沁县南涅水石刻馆》(中国艺术报,2010-07-16)
`https://www.cflac.org.cn/ysb/2010-07/16/content_20357390.htm`
raw_path:`data/raw/shanxi-nannieshui-northern-wei-votive-pagoda/D-7b90cfc7.html`

**编码说明(诚实)**:本 chunk 的 `excerpt_or_metadata` 在 JSON 里是损坏的乱码(latin-1/GB 编码错位),**不可作为正文引用**。但其 `source_title` / `notes` 两个元信息字段是清晰可读的中文,且 raw_path 原文(GB18030)完整可读。本节**只引该 chunk 清晰可读的元信息字段所载事实**,不从乱码 excerpt 里"猜读"任何细节。

**到手内容(摘自 chunk D 可读元信息字段)**:
- 南涅水石刻馆位于山西沁县(二郎山),为**中国最大的民间石刻陈列馆**。
- 窖藏纪年:**最早北魏永平三年(510)、最晚北宋天圣九年(1031)**,历时约五百年。
- 形制三分:**造像塔 / 造像碑 / 单体造像**。
- 元信息定性:这是"南涅水石刻最权威的现场综述"(class D 现场场域源)。

**这条为什么属于原则 C(权力结构觉察)**:
这是一篇**官方系统(中国文联/中国艺术报)的现场叙事**,license=(c)all-rights —— 它本身就是"馆方—主流媒体"叙事的一部分。它强调的是"民间石刻之最""现场综述",而**不会**主动去讲"为什么这批民间造像与云冈皇家造像在权力结构上是两条轴"。同伴可以 surface 的,正是这种"说了什么 / 不说什么":官方叙事把南涅水框成"规模之最"的奇观,而原则 C 想看的是它作为**民间集资**造像与皇家石窟的张力。**注意 license=(c)all-rights**:本节只转述已落入可读元信息的客观事实(地点/纪年/形制),不逐字搬运受版权正文长段。

**置信度**:**中**(地点/纪年/形制三项有可读元信息支撑;正文 excerpt 因编码损坏未用,更细的现场描述需查 raw_path)。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类未到手,原因:no candidate sourced。**
- 本件在 sources_candidates.full30.json 中只有 A / B / C / D 四类候选,**没有 E 类候选**,verified_chunks.json 中也无本件 E 类 chunk。
- 故本节**无正文、无 URL**。若后续要补 E 轴,自然候选是:山西博物院/南涅水数字展、造像题记→CBETA 经文映射、北朝造像跨馆 accession 聚合索引 —— 但这些**均未在本次 night-run 数据内**,此处不列具体链接以免脑补。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 有 ok chunk**(B / C / D)。其中 **B 有 CC0 正文可引**;**C license=unknown → 仅 URL+标题**;**D 正文 excerpt 编码损坏 → 仅引可读元信息事实**。**A 有候选但无本件 ok chunk;E 无候选**。 |
| 各 chunk 的 tier + license | B:mid · CC0(可引正文);C:mid · unknown(仅 URL);D:mid · (c)all-rights(仅可读元信息,正文乱码) |
| 哪些可 agent 自动化(给 ADR-006) | **B 跨馆对照(CMA CC0 API)** = 100% agent;**C/D 的 URL 发现** = agent。但 **C 正文(license 确认)、D 正文(GB 编码重抓)、A 馆方单件 id** 三处都需人在回路 / 修管线。 |
| 本件 bundle 完整度自评 | **中-偏低**。三类各占一条好轴(海外流散单件 / 学术类型学 / 官方现场综述),关系网骨架成立;但**两条轴的正文都被门挡住**(C 的 unknown、D 的乱码),真正"可引的正文"只有 CMA 一件。比白石佛那件(B 类 28 件命中)薄得多。 |
| 给 PM 的 wow moment(一句话) | "南涅水是一**整窖**留在沁县二郎山的**民间**造像塔;而克利夫兰那块 500 年的弥勒碑,是同一窗口里被切成**单件、流散到海外展柜**的个体 —— 同代、同母题,一个整窖留乡、一个单件离散,这就是'山西窖藏整塔 vs 海外流散单件'最干净的一组对照,而且它直接顶着云冈皇家叙事讲'官—民'那条权力轴(原则 C)。" |

---

## 7. 反向发现 / 该展品不工作的源

- **A 类(馆方一手页)对本件 = 无 ok chunk**:候选是腾讯新闻馆方报道(qq.com/...20230907A04WHD00),但该 URL 的 ok chunk 在 verified_chunks 里**归属到了别件**(shanxi-northern-qi-guanyin-pentad,D 类)。按硬门不借用,故本件 A 类实际为空。**原因:no ok chunk for this artifact_id(候选 URL 落到了另一件)**。山西博物院官网为 SPA,本件未锁馆方单件真实 id —— 需 PM 国内 IP 在藏品库按中文名定位 id 后回填。
- **C 类(胡文和考古论文 PDF)license=unknown → 被门挡住**:PDF 抓取 ok、内容看着切题,但因 license 未知,按反幻觉硬门**整篇不引正文**。这是"抓到了却不能用"的典型 —— 需 PM 确认 PDF 版权/可引性后才能把类型学论点写进最终 bundle。
- **D 类(中国文联现场综述)JSON excerpt 编码损坏**:这条 fetch_status=ok,但存进 verified_chunks 的 `excerpt_or_metadata` 是 GB/latin-1 错位的乱码,只有 source_title/notes 两个元信息字段可读,raw_path(GB18030)原文完整。**工程意义**:管线在落库时丢了原始页面的字符集声明 —— 建议 Builder 在 fetch→store 环节按页面 charset(本例 GB18030)显式解码再入库,否则 (c)all-rights 的现场综述类源会大面积"ok 但不可读"。
- **E 类:no candidate sourced**(本件无 E 候选,本次不补)。
- **本件无 fetch_status=failed 的 chunk**:三条候选(B/C/D)都 ok,失败面不在"抓取",而在"门"(C 的 license、D 的编码、A 的归属)。

---

**主要来源(本件 ok chunk,共 3)**:
- CMA(B,CC0):`https://clevelandart.org/art/1959.130` —— *Stele with Maitreya and Attendants*, 500, Northern Wei
- 山西大学云冈学研究院库 / 胡文和(C,license=unknown,**仅 URL**):`https://ygx.sxu.edu.cn/db/期刊/kgyww/kgyw2007/0704pdf/070411.pdf`
- 中国文联 / 中国艺术报(D,(c)all-rights,正文乱码→raw_path):`https://www.cflac.org.cn/ysb/2010-07/16/content_20357390.htm`(raw:`data/raw/shanxi-nannieshui-northern-wei-votive-pagoda/D-7b90cfc7.html`)

**[ night-run AI 装订 · 2026-06-07 · 非最终 bundle ]**
