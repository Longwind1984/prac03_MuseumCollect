# Sample Bundle · 晋侯稣钟 · 上海博物馆(人民广场馆)中国古代青铜馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-museum-jinhou-su-bells-western-zhou)

> 装订口径:本 bundle 只引用 verified_chunks.json 中本件 artifact_id 且 fetch_status=ok 的 chunk(本件 4 条,全部 ok,无 failed)。每段正文引用都追得到某条 chunk 的 excerpt_or_metadata。凡 chunk 正文里没有的,一律不补。
> 本件全部 4 条 chunk 的 confidence_tier 均为 **mid**;无 high、无 low。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 晋侯稣钟(中新网报道写作"晋侯苏钟",同物异写) |
| 馆 / 厅 | 上海博物馆(人民广场馆)· 中国古代青铜馆 |
| 朝代 / 公元年范围 | 西周晚期(晋献侯,约公元前 9 世纪) |
| 材质 | 青铜(编钟) |
| 已知 accession / 编号 | **未到手**(上博专题页 chunk 未给出馆藏号) |
| 已知来源 / 出处 | 山西曲沃晋侯墓地 8 号墓;全套 16 件中 14 件曾流失香港、由上博抢救回归,另 2 件经科学发掘出土(据 A 类上博专题页 chunk) |
| 检索关键词 | 晋侯稣钟 / 晋侯苏钟 / 晋侯墓地 / 曲沃 / 天马-曲村遗址 / 马承源 / 西周刻凿铭文 / 编钟 / 甬钟 / yongzhong / Lai Zhong bell |

**为什么这件值得做(对 PM / ADR-006 的选品论证)**:
这是少见的"**馆方一手叙事本身就在讲流散与权力**"的件。上博专题页(A 类)把出土、盗掘、香港回购、355 字刻铭、补史定历谱一条线讲全;而中新网(D 类)从另一角度直击"14 件在上海、2 件在山西"的分藏事实。两条 ok 源叠在一起,天然命中 user-voice 原则 C(觉察馆方叙事与权力结构)与原则 D(跨馆/跨地关系网),不需要 Compiler 添油加醋——**张力就在原文里**。

---

## 1. 来源 A · 馆方一手页面

**chunk**:source_class=A · fetch_status=**ok** · tier=**mid** · license=**(c)all-rights** · 有正文截录(excerpt 截至 1500 字,原文更长见 raw_path)
**URL**:https://www.shanghaimuseum.net/mu/asset2/20151230150415016/
**raw_path**:data/raw/shanghai-museum-jinhou-su-bells-western-zhou/A-76ea6e8d.html

**到手内容(逐条追得到 excerpt 原文)**:
- 馆方定性:晋侯稣钟是"**西周晚期晋献侯的随葬编钟**",因墓葬曾遭盗掘,"**其中十四件流失至香港,由上海博物馆抢救回归,另两件经科学挖掘,出土于山西曲沃晋侯墓地 8 号墓**"。
- 遗址背景:1962 年邹衡田野调查锁定翼城-曲沃间的天马-曲村遗址;1979–1990 山西省考古研究所与北京大学考古系 7 次发掘,认定其为早期晋国都城与晋文化发祥地,但因"**没有发现地下出土文献和大型宫殿建筑基址、诸侯陵园**"长期不被学界普遍接受。
- 回购始末:1992 年时任上博馆长**马承源**在香港发现带"晋侯"铭文青铜器,在上海市政府支持下抢救回归;清理中发现两件盨分别与曲村 1 号墓铭文残片、2 号墓青铜残件吻合,**反向坐实曲村墓地即学界寻找多年的晋侯墓地**。
- 编钟本身:1992 年 8 月 8 号墓遭严重盗掘,科学发掘只在墓中发现盗墓者遗漏的两枚编钟;另 14 枚走私出境后现身香港文物市场,"**数月无人问津**",因器为西周样式却带"**之前西周文物上未曾见过的刻凿铭文**",藏家难断真伪。马承源凭研究经验断为西周重器,在香港中文大学张光裕教授帮助下斥巨资抢救回国;铭文联缀后"**叙述西周末年的一次战争经过而未结束**"(excerpt 在此处截断)。

**张力点(原则 C)**:这段馆方叙事把"抢救回归"作为主线情感词反复出现,而**盗掘-走私-文物市场**这条线被叙述为"被克服的背景"。下面 D 类的中新网把同一事件的标题落在"**分隔两地:14 件在上海 2 件在山西**"——同一批钟,馆方框定为"回归",媒体框定为"分藏",这正是可向用户 surface 的叙事-视角对照。

**诚实标注**:license=(c)all-rights → 本节为转述/最短必要引用以追溯 chunk,不作整页转载;馆藏编号、355 字全文释文均**不在本 chunk 截录范围内**,未补。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本件命中两条 B 类 ok chunk,均为 CC0 公共领域,可正文/元数据引用。两件都是**真实的西周/东周钟**,用作"编钟形制 + 礼乐-王权叙事"的跨馆对照,而非晋侯稣钟本体。

### 2.1 Cleveland Museum of Art · Bell (Lai Zhong)
**chunk**:source_class=B · fetch_status=**ok** · tier=**mid** · license=**CC0** · 有正文截录(459 字,untruncated)
**URL**:https://clevelandart.org/art/1989.3 ·(discovery 记录其对应 CMA id 154710)
**raw_path**:data/raw/shanghai-museum-jinhou-su-bells-western-zhou/B-ebc0240b.html

**fetched 页面正文实际只给到这些(诚实区分)**:
- 题名 **Bell (Lai Zhong)**;年代 **c. 800–700 BCE**;产地 **China, Shaanxi province, Meixian, Western Zhou dynasty (c. 1046–771 BCE)**;许可 **CC0**。
- 页面其余为 CMA 模板样板(See Also / Visually Similar by AI / 信息可能不准确的更正声明),**无释文、无铭文正文**。

**仅元数据 / 来自 discovery 注记(非页面正文)**:chunk 的 source_title 记 CMA 描述"**乐与礼有政治意义、与国家权力不可分**",118 字铭文记主人莱受"天子"世袭官职、为父铸钟祈传后世。**此处必须诚实**:这两句出自 chunk 的 source_title/discovery 注记,**未出现在本次 fetched 的页面正文截录里**,因此本 bundle 只把它当"线索/待核",不当已截录正文引用。

**对照价值**:同为陕西西周钟,若 CMA 描述属实,则"为父铸钟、祈传后世、受王世袭官职"的祖先-王权逻辑与晋侯稣钟(晋侯随葬、记侯王征战)同构——这是最干净的 B 类对照候选,但**铭文同构的论断需 PM 回核 CMA 页面正文后才能写进最终 bundle**。

### 2.2 The Metropolitan Museum of Art · Bell (Yongzhong)
**chunk**:source_class=B · fetch_status=**ok** · tier=**mid** · license=**CC0** · 有元数据截录(JSON,1500 字截断)
**URL**:https://collectionapi.metmuseum.org/public/collection/v1/objects/61053
**raw_path**:data/raw/shanghai-museum-jinhou-su-bells-western-zhou/B-d675f6bb.json

**到手内容(逐条追得到 JSON 字段)**:
- objectID **61053**;accessionNumber **13.220.86**(accessionYear 1913);**isPublicDomain: true**。
- title **Bell (Yongzhong)**;objectName Bell;culture China;period **Eastern Zhou dynasty (770–256 BCE)**;objectDate **5th–3rd century BCE**(objectBeginDate −499 / objectEndDate −200)。
- medium **Bronze**;dimensions **H. 24 in. (61 cm); W. 10 1/8 in. (25.7 cm)**;department Asian Art;primaryImage 等 7 张 CC0 图片直链可用。

**对照价值**:**甬钟(yongzhong)**形制,与晋侯稣钟的编列/编悬制度对照。注意:这是东周件(770–256 BCE),晚于西周晚期的晋侯稣钟,作"形制谱系下延"对照而非同窗口对照。
**discovery 已做的排查(可信度加分)**:chunk 注记记原拟配对的 Met 61052 经查为**清代仿**,已弃用,仅取 61053 真件——这条"主动剔除赝品"的记录值得在 ADR-006 里作为 B 类质控样例保留。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

sources_candidates.full30.json 中本件**没有任何 source_class=C 的候选**(本件候选只覆盖 A/B/B/D),verified_chunks.json 中本件亦无 C 类 chunk。故本节无任何可引用内容,不补旁证。

**给 ADR-006 的工程笔记**:晋侯稣钟的学术文献其实极厚(355 字刻铭、补西周历谱、马承源/裘锡圭等多家释读),但 discovery 阶段未为本件落任何 C 类候选 URL。这是一个**发现缺口而非可达性缺口**——区别于 A/D 那种"有 URL 但沙箱打不开"。建议 PM 优先为本件补 C 类候选(故宫/考古/文物期刊的晋侯稣钟释文 PDF)。

---

## 4. 来源 D · 现场场域

**chunk**:source_class=D · fetch_status=**ok** · tier=**mid** · license=**(c)all-rights** · **仅 URL + 标题(正文截录不可用)**
**URL**:https://www.chinanews.com.cn/cul/2013/04-27/4772658.shtml
**raw_path**:data/raw/shanghai-museum-jinhou-su-bells-western-zhou/D-40f38bb6.html

**诚实状态**:本 chunk 的 excerpt_or_metadata 在 JSON 中为**乱码(编码损坏,疑似 GB2312/GBK 字节被错误解码后落库,已无法在本 JSON 内还原)**。按反幻觉硬门,**不可读的正文一律不引用**。因此本节只引用 chunk 的干净元数据(source_title)与 URL,不引正文。

**可引用的(来自 source_title,干净中文)**:
- 报道标题方向:**"晋侯苏钟因盗掘分隔两地:14 件在上海 2 件在山西"**。
- chunk 注记定性:直击"**盗掘-走私-回购-分藏**"的权力流散全过程,被 discovery 标为原则 C 核心现场材料。

**对照价值(原则 C / D)**:这正是与 A 类馆方叙事最强的张力源——馆方说"抢救回归",媒体标题说"分隔两地"。**但因正文乱码,本 bundle 不能引用任何报道细节**;若要进最终 bundle,PM 需用国内 IP 以正确编码重抓 chinanews 原文。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

sources_candidates.full30.json 与 verified_chunks.json 中本件均无 source_class=E 的候选/chunk。不补。

**给 ADR-006 的工程笔记**:晋侯稣钟天然适合 E 类(355 字刻铭可做"铭文→释文→历谱"数字人文映射,编钟可做音律/三维数字化),但本轮无候选。E 与 C 一起构成本件的两处"发现缺口"。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 类到手**:A(有正文截录)、B(两件,CC0,Met 有完整元数据 / CMA 仅样板正文+元数据)、D(仅 URL+标题,正文乱码不可用)。**C、E 两类无候选,完全缺**。 |
| 各 chunk 的 tier + license | A: mid /(c)all-rights;B-CMA: mid / CC0;B-Met: mid / CC0;D: mid /(c)all-rights。**全件无 high、无 low;两条 CC0 可放心引用,两条 (c)all-rights 仅转述/标 URL**。 |
| 哪些可 100% agent 自动化 | **B 类(CMA/Met 的 CC0 JSON/页面)**:agent 直取,且 discovery 已自动剔除 Met 赝品配对。**A 类专题页**:本轮 night-run 已 ok 取到正文,可 agent。 |
| 哪些必须人在回路 | **D 中新网**:需 PM 以正确编码重抓(当前 chunk 正文乱码);**C / E**:需 PM/discovery 先补候选 URL,本轮根本没源可抓。 |
| 这件展品的 bundle 完整度自评 | **中**。馆方一手叙事极强(A 类正文密度高),但学术(C)与数字人文(E)整类空缺,D 类正文损坏——可讲一个完整故事,但只靠 A 单腿支撑正文,B 是旁证对照,尚不够"四面合围"。 |
| 给 PM 的 wow moment(一句话) | "**同一套晋侯稣钟,上博的专题页讲的是『十四件流失香港、被我们抢救回归』,中新网的标题讲的是『分隔两地:14 件在上海、2 件在山西』——AI 把馆方的『回归』和媒体的『分藏』并排放给你,你就看见同一批钟上,两种叙事在抢同一个动词。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **failed chunk**:本件在 verified_chunks.json 中 **4 条全部 fetch_status=ok,无 failed chunk**。无失败原因可报。
- **C 类(学术):no candidate sourced** —— 发现阶段未为本件落任何 C 类 URL。这是本件最大缺口:晋侯稣钟学术文献极厚却一条没抓,属"发现遗漏",建议 PM 优先补。
- **E 类(数字人文):no candidate sourced** —— 同上,无候选。
- **D 中新网正文乱码** —— chunk fetch_status=ok,但 excerpt_or_metadata 为损坏编码(疑似 GBK 字节被按非 GBK 解码落库),正文不可读;本 bundle 据此只用其干净 source_title + URL,**未引用任何报道细节**。修复路径:以 GB2312/GBK 正确解码重抓 chinanews,或换正文可用的镜像。
- **馆藏编号未到手** —— A 类专题页 chunk 截录范围内未出现晋侯稣钟的上博馆藏号;355 字刻铭全文释文亦不在截录内(excerpt 在"叙述西周末年的一次战争经过而未结束"处截断)。两者均**未补**,待 PM 回核馆页或学术释文。
- **CMA 铭文/礼乐-王权论断的来源分层** —— "乐与礼与国家权力不可分""118 字铭文受天子世袭官职"出自 chunk 的 discovery 注记(source_title),**不在本次 fetched 的 CMA 页面正文截录中**;本 bundle 已将其降级为"线索/待核",未当作已截录正文使用。

---

**主要来源(均为本件 fetch_status=ok 的 chunk)**:
- 上海博物馆「每月一珍」晋侯稣钟专题页:`https://www.shanghaimuseum.net/mu/asset2/20151230150415016/`(A · mid · (c)all-rights · 有正文)
- Cleveland Museum of Art, Bell (Lai Zhong):`https://clevelandart.org/art/1989.3`(B · mid · CC0 · 正文仅样板+元数据)
- The Met, Bell (Yongzhong) objectID 61053:`https://collectionapi.metmuseum.org/public/collection/v1/objects/61053`(B · mid · CC0 · 完整 JSON 元数据)
- 中国新闻网「晋侯苏钟因盗掘分隔两地」:`https://www.chinanews.com.cn/cul/2013/04-27/4772658.shtml`(D · mid · (c)all-rights · 正文乱码,仅 URL+标题可用)

**[ Sample Bundle · 晋侯稣钟 · night-run 装订完 · 2026-06-07 ]**
