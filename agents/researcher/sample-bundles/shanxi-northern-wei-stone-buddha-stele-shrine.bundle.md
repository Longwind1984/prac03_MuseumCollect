# Sample Bundle · 北魏石造像碑 / 单体石佛龛（晋东南—晋阳系小型石造像） · 山西博物院 · 佛风遗韵·北朝风貌单元

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-northern-wei-stone-buddha-stele-shrine)

> **诚实前置(读前必看)**:本件在 verified_chunks.json 里 **只有 1 条 chunk**——一条 B 类(CMA 1955.46),tier=mid,license=CC0,fetch_status=ok。
> 展品清单(exhibit-list 第 7 行)对本件**期望覆盖 `mid·ABC`**,且状态是 `DRAFT·⚠️官网未确认`(本件非 3 件 pilot 之一,是 night-run 自动起草)。
> **期望的 A/C 两类、以及 D/E,本轮一条都没落地。** 本 bundle 因此大部分是"未到手"的诚实记录,而不是内容拼装。
> 另一个必须挑明的张力:**本件唯一到手的 chunk,其对照物本身就对不太上**——见来源 B。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 北魏石造像碑 / 单体石佛龛(晋东南—晋阳系小型石造像) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵 · 北朝风貌单元 |
| 朝代 / 公元年范围 | 北魏(386–534) |
| 材质 | 石(造像碑 / 单体造像龛);具体石种、尺寸 **未到手** |
| 已知 accession / 编号 | **未到手**(本件馆方页面未确认,exhibit-list 标 `⚠️官网未确认`) |
| 已知来源 / 出处 | exhibit-list 选品论证称"馆藏一批山西本地(晋东南/晋中)出土的北魏中小型石造像碑与造像龛";**具体出土地、件数、单件归属均未到手**(此为策展起草语,非 chunk 实证) |
| 检索关键词 | 北魏 / 石造像碑 / 造像龛 / 晋东南 / 高平 / 长治 / 民间社邑 / 邑社造像 / votive stele / Northern Wei stele |

**为什么选它(摘自 exhibit-list,非本 bundle 的实证)**:这类民间社邑造像与云冈皇家工程相对,是"国家叙事之外的民间信仰层"(原则 C)。
**⚠️ 但本件至今官网未确认、且 chunk 只有 1 条**——它当前更像一个"待 PM 落实身份的类别占位",而不是一件已锁定的单体展品。这一点 PM 必须先知道。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

- sources_candidates.full30.json 里本件 `artifact_id` 下 **只挂了 1 条 B 类候选(CMA)**,**没有 A 类(山西博物院官网)候选**。
- exhibit-list 第 7 行把本件期望覆盖标为 `mid·ABC`、状态 `DRAFT·⚠️官网未确认`——即"官网页面尚未被定位,A 类本就没接上"。
- 工程含义:本件甚至连 accession 都没有。**它不是"官网 403 抓不到",而是"还没找到该抓哪一页"**——身份未锁。这是比沙箱 403 更靠前的一道坎。PM 早晨核签时,本件第一步不是补内容,而是**先决定它到底指哪几件馆藏、要不要保留**。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**到手:1 条(本件唯一 chunk)。tier=mid · license=CC0 · 有正文截录(但极薄)。**

| 馆 | accession | title | 纪年 / 朝代 | 到手内容 |
|---|---|---|---|---|
| Cleveland Museum of Art (CMA) | 1955.46 | **The New-born Buddha** | 400s CE,Northern Wei (386–534) | CMA artwork page,CC0;excerpt 实为页面骨架 |

CMA 1955.46 到手正文(原样,excerpt 未截断):

> Artwork Page for The New-born Buddha / The New-born Buddha / 400s CE / China, Northern Wei dynasty (386-534) / See Also / Visually Similar by AI / Contact Us / The information about this object, including provenance, may not be currently accurate...(后接"Update or Correct Artwork Information"模板语)

**这里有两层必须对 PM 挑明的张力:**

1. **对照物对不太上。** 本件名义是"石造像碑 / 单体石佛龛",而 CMA 1955.46 是一件题为 **"The New-born Buddha"(诞生佛 / 太子降生像)的小型像**——题材(佛诞太子)、形制(单体小像而非碑/龛)都与"民间社邑造像碑"不是一回事,只是同处北魏窗口。把它当"跨馆对照"是**主题上的弱关联,不是流散件聚合**。Discovery 起草时把它挂进来,更像"北魏 + CC0 就先占个位"。**这正是 night-run 自动起草需要人复核的典型坑。**
2. **连这一条,正文也几乎是空的。** CMA 这一页(httpx->html)抓到的是**页面外壳**——标题、年代、"Visually Similar by AI""可能不准确请纠错"——**没有尺寸、没有材质、没有 provenance、没有策展描述**。所以本件能"引正文"的,实质只有"名称 + 400s CE + 北魏"三个字段。**不能据此写任何关于本件本身的描述。**

**给 ADR-006 的工程笔记**:CMA 的 `/art/{id}` HTML 页对 CC0 件常常只暴露骨架,**真正的 metadata 在 openaccess-api.clevelandart.org/api/artworks/{id} 的 JSON**(参见同批 shanghai-white-marble-buddha 用的就是 api 端点)。本件 chunk 走了 HTML 而非 API,**密度因此触底**。建议:B 类 CMA 一律走 openaccess-api JSON,不要走 /art/ 页面。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

- 本件 `artifact_id` 下没有 C 类 chunk(failed 也没有)。exhibit-list 期望 `…C`,但候选清单里没接上学术源。
- **可借的跨件共享源(URL 切题、fetch_status=ok,仅列、不替本件背书)**:同为山西北魏/东魏石造像碑题材,姊妹件 `shanxi-nannieshui-northern-wei-votive-pagoda` 下有一条 C 类 OA PDF——
  - 胡文和《(陕西)北魏道(佛)教造像碑、石类型和形象造型探究》,《考古与文物》2007年第4期,山西大学云冈学研究院库:`https://ygx.sxu.edu.cn/db/期刊/kgyww/kgyw2007/0704pdf/070411.pdf`(fetch_status=ok,tier=mid,license=unknown)
  - 该文做的是**造像碑/造像塔的类型学**,与本件"北魏石造像碑/造像龛"题材同源,**可作 PM 后续给本件接学术坐标的起点**。
  - **license=unknown → 按硬门只列 URL + 标题,不引正文。** 且其原文以陕西耀县/泾阳出土碑为主,**与"晋东南"未必同地,不能替本件做实证。**

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。**

- 本件 `artifact_id` 下没有 D 类 chunk。
- **可借的跨件共享源(仅供 PM 参考,URL 切题、ok,但 license=(c)all-rights → 只列 URL+标题,不引正文)**:姊妹件 `shanxi-fofeng-eastern-wei-sengzuan-shakyamuni-prabhutaratna-stele-544` 下有一篇搜狐专文《山西博物院收藏的造像碑》:`https://www.sohu.com/a/705350486_121124392`——它列了"佛风遗韵"展厅**七块北朝造像碑**的清单(王黄罗等造像碑、僧纂碑、程哲碑等)。**本件"石造像碑/造像龛"若真有所指,极可能就落在这份七碑清单里**——这是 PM 给本件**定身份**最该先看的一篇。但它 license=(c)all-rights,**本 bundle 不引其正文,只把 URL 交给 PM。**

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

- 本件 `artifact_id` 下没有 E 类 chunk。exhibit-list 期望覆盖 `…C`(未含 E),所以 E 缺位与期望一致,但仍属"未到手"。
- 无可直接套用的跨件共享 E 源(姊妹件的 E 类如云冈维基条目,主题是云冈皇家石窟,与本件"民间小型造像碑"叙事相反,**不挪用**)。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **1 / 5**(仅 B,且 B 只有 1 条、正文是页面骨架) |
| 各 chunk 的 tier + license | B(CMA 1955.46):tier=mid,license=CC0,fetch_status=ok,**有正文截录但极薄(仅名称+年代+朝代)** |
| 有正文 / 仅元数据 / 仅 URL | **有(薄)正文 1 条**;A/C/D/E 全部"未到手";跨件共享源 2 条(C 的 OA PDF、D 的搜狐专文)仅列 URL 不引正文 |
| 这件展品 bundle 完整度自评 | **低(三件 night-run 中最弱的一类形态)**——身份未锁、官网未确认、唯一对照物题材都对不上 |
| 给 PM 的 wow moment 一句话 | 这件**反着出彩**:"清单上写着它期望覆盖 A/B/C 三类、海外对照是 CMA 一件北魏佛像——可真抓下来,A/C 根本没接源,而那件 CMA 是尊『太子降生像』,跟『民间造像碑』压根不是一类。**AI 没有替它编一段像样的解说,而是直接告诉你:这一条目前还站不住,先别信清单上那个 `mid·ABC`。**"这正是反幻觉门要的诚实。 |

---

## 7. 反向发现 / 该展品不工作的源

- **本件无 failed chunk**——不是"抓失败",而是**"压根没接够源"**:A/C/D/E 四类在候选清单里就没有本件的条目(no candidate sourced),唯一的 B 类也只抓到 CMA 页面外壳。
- **身份未锁是最根本的"不工作"**:exhibit-list 把本件标为 `DRAFT·⚠️官网未确认`,且名称本身是一个**类别**("一批晋东南/晋中北魏中小型石造像碑与造像龛")而非**单件**。没有 accession、没有确定出土地、没有件数。**Pipeline 无法对一个"类别占位"做单件级聚合。**
- **唯一到手对照物的题材偏移**:CMA 1955.46 "The New-born Buddha"(诞生佛)与"民间社邑造像碑"题材不符——这是 Discovery 自动起草"北魏+CC0 先占位"的副作用,需人工剔除或替换。
- **CMA 抓取路径选错**:走了 `/art/1955.46` 的 HTML(只出骨架),没走 openaccess-api JSON,导致连这一条都几乎无正文。
- **给 PM 的最小行动**:本件早晨核签第一步**不是补内容,是先定身份**——(a) 它指"佛风遗韵"七碑清单里的哪一(几)块?(候选入口:第 4 节那篇搜狐七碑专文);(b) 锁定后补 A 类山博官网页 + 把 B 类对照换成真正的北魏造像碑(如 CMA 1959.130「Stele with Maitreya and Attendants」500 年,已在姊妹件中 ok·CC0);(c) 若无法落到具体单件,考虑从 30 件清单中**降级或删除**本条。

---

**主要来源**:
- Cleveland Museum of Art 1955.46「The New-born Buddha」(400s CE,北魏):`https://clevelandart.org/art/1955.46`(fetch_status=ok,CC0,tier=mid;本件唯一 chunk,正文为页面骨架)
- 跨件共享(仅列,不引正文):胡文和《北魏道(佛)教造像碑、石类型探究》PDF `https://ygx.sxu.edu.cn/db/期刊/kgyww/kgyw2007/0704pdf/070411.pdf`(挂 nannieshui 件,license=unknown)
- 跨件共享(仅列,不引正文):搜狐《山西博物院收藏的造像碑》七碑清单 `https://www.sohu.com/a/705350486_121124392`(挂 sengzuan-stele-544 件,license=(c)all-rights)
- 选品论证出处(非 chunk 实证):`agents/strategy-curator/exhibit-list.md` 第 7 行;`data/pipeline/in/sources_candidates.full30.json`

**[ Sample Bundle · shanxi-northern-wei-stone-buddha-stele-shrine · night-run 2026-06-07 完 ]**
