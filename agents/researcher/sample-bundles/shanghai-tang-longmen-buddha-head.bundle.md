# Sample Bundle · 唐 龙门石窟奉先寺 石佛头像(盛唐开元·伴 唐长安白石供养菩萨) · 上海博物馆东馆 · 中国古代雕塑馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-tang-longmen-buddha-head)

> 反幻觉声明:本 bundle 只引用 verified_chunks.json 中 **fetch_status=ok** 的 chunk;每段正文都追得到某条 chunk 的 excerpt_or_metadata。`license_observed=unknown` 的 chunk 只列 URL+标题,不引正文。跨件共享源已注明。缺的源类显式写"未到手"。

---

## 0. 展品识别

| 字段 | 内容 | 出处 |
|---|---|---|
| 名称 | 唐 龙门石窟奉先寺 石佛头像(盛唐开元·伴 唐长安白石供养菩萨) | sources_candidates.full30.json `artifact_name_zh` |
| 馆 / 厅 | 上海博物馆东馆 · 中国古代雕塑馆 · 隋唐五代单元(盛唐石造像) | exhibit-list.md(上博东馆条目,#5) |
| 朝代 / 公元年范围 | 唐(盛唐,开元约 713–741) | exhibit-list.md(策展元数据) |
| 材质 | 石(石窟造像佛首) | 件名 + 馆方分类术语 |
| 已知 accession / 编号 | **未到手**(verified_chunks 中无本件馆方 ID;见第 1、7 节) | — |
| 已知来源 / 出处 | 媒体口径:出自龙门石窟奉先寺北壁,盛唐开元面貌(**此句来自 exhibit-list 的策展描述,不在任何 ok chunk 正文里 → 仅作识别背景,不作 bundle 引用断言**) | exhibit-list.md |
| 检索关键词 | 龙门石窟 / 奉先寺 / 盛唐 / 开元 / 佛头 / Longmen / Head of Buddha / Tang sculpture / 上博东馆 / 中国古代雕塑馆 | 件名 + 候选 rationale |

**为什么选它(承原则 C/D)**:一件"有明确石窟出处的流散造像"进入大陆馆常设展——龙门奉先寺这种**皇家石窟原位被剥离的佛首**,本身就是"馆方叙事 vs 流散史实"张力的标本。但本次 night-run 实际落地的源,把这条张力**只拼出了半句**:见下文 1、6、7 节。

---

## 1. 来源 A · 馆方一手页面

**计划候选**:`https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00159688`(候选表标 A 类,fetch_hint=js_html,via_vpn=False,rationale:"上博官网雕塑馆相关文章;馆方对盛唐石造像/龙门佛头一手解读")。

**实际结果(诚实降级)**:该 URL 在 night-run 确实被抓到 **fetch_status=ok**,但 **chunk 落在了 artifact_id=`shanghai-white-marble-buddha` 名下**,且 playwright 渲染出来的页面正文是**另一件器物**——

> 原名:佛石像 / 时代:南北朝 / 详细年代:**东魏** / 类别:刻石 / 尺寸:高 142 厘米 / 材质:石 / 产地:山西 / 来源:**山西博物院调拨** / 位置:中国古代雕塑馆
> (source: verified_chunks.json,artifact_id=shanghai-white-marble-buddha,source_class=A,url=…CI00159688,fetch_status=ok,license=(c)all-rights,tier=mid)

即:这个 article id 对应的是雕塑馆里**东魏石佛像**那一尊,**不是**本件盛唐龙门佛头。上博官网是 js_html SPA,雕塑馆系列多个 article id 在同一 cluster 内,候选阶段把 CI00159688 派给了本件,但页面实际内容指向兄弟件。

**结论:本件馆方一手页面 = 未到手。**
- 原因:candidate A URL 实际渲染为另一件展品(东魏石佛像),无任何 ok chunk 正文描述本件盛唐龙门佛头。
- license 注记:即使该页正文,license_observed=`(c)all-rights`(版权所有),按规则也只能转述馆方客观字段、不可整段照录;此处更关键的是**它根本不是本件**。

**给 ADR-006 的工程笔记**:上博雕塑馆"一 article id 一器物"的假设在本 cluster 里**对不齐**——同一隋唐/北朝展厅多件共用相近 article id 段,discovery 阶段按"件名→article id"派发会错配。建议:A 类页落库后必须做 **"页面 original name vs artifact 件名" 一致性校验**,不一致即标 `anchor_mismatch`,不得当本件馆方源用。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本类是本件**唯一真正落到正文的源**,两条 ok chunk,均 CC0:

### 2.1 CMA 141749 · "Mi-lê: Maitreya Buddha(弥勒像)" — 本件自有 chunk

- tier: **mid** · license: **CC0** · 状态:**有正文截录(JSON 元数据)**
- accession 1965.33;tombstone:"Mi-lê: Maitreya Buddha (弥勒像), 683. China, **Tang dynasty (618-907)**. Limestone; overall: 33 x 20.4 cm";creation_date **683**;technique limestone;type Sculpture。
- 题记(馆方录文,节录):底座铭文译"On the eighth day of the second month of the second year of Yung-ch'un, the bhiksu Tz'u-(?) of the temple Hu-chung-ssu had this image of Maitreya and two attendant bodhisattvas made for the devotion of his whole family."(Wai-Kam Ho 译,馆方著录)
- (source: verified_chunks.json,artifact_id=shanghai-tang-longmen-buddha-head,source_class=B,fetch_status=ok)
- **与本件关系(诚实标注)**:这是一件**纪年 683(初唐永淳)的纪年弥勒**,候选 rationale 把它定位为"接住北朝—初唐窗口下沿的纪年标尺"。它**不是**龙门奉先寺件,也不是头部,而是一件**有确切纪年的小型石灰岩造像**——它给本件提供的是"**初唐这一端有铁锚纪年**"的坐标,不是直接对照件。

### 2.2 Met 39640 · "Head of a Bodhisattva", ca. early 8th century — 跨件共享源

- tier: **mid** · license: **CC0** · 状态:**有正文截录(JSON 元数据)**
- objectID 39640;accession 42.25.12(1942);objectName "Head";title "**Head of a Bodhisattva**";culture China;period **Tang dynasty (618–907)**;objectDate "ca. early 8th century"(beginDate 700 / endDate 733);medium **Sandstone with pigment**;dimensions H. 15 3/4 in. (40 cm);isPublicDomain true。
- (source: verified_chunks.json,**artifact_id=shanxi-fofeng-tang-white-marble-bodhisattva-foguangsi-wutai**,source_class=B,fetch_status=ok → **跨件共享源**:该 URL 同时是本件候选表里的 B 类候选,rationale 即"Met 'Head of a Bodhisattva' ca. early 8th c Tang,砂石+彩绘——盛唐造像头部散藏对照,与龙门奉先寺佛头同窗口同'流散'性质",故按规则可引用并注明。)
- **与本件关系(强)**:**盛唐(约 8 世纪初,开元前后)一件流散的造像头部,砂石+彩绘残存,40cm**——窗口、类型(佛/菩萨头)、流散性质都与本件高度同构。这是本 bundle 里**最贴本件叙事**的一条:一颗盛唐石头,头身分离,进了海外馆。

**本类置信度**:中(两条都 CC0、可自动化、字段干净;但**都不是龙门奉先寺原物**,只能做"同窗口/同流散性质"对照,不能做虚拟拼合)。

---

## 3. 来源 C · 学术论文 / 学者文章

**到手**:1 条 ok chunk,但 **license_observed=unknown → 按反幻觉规则,只列 URL + 标题,不引正文**。

- 标题:《青州龙兴寺北齐佛教造像研究》(硕士学位论文,山西大学云冈学知识库)
- URL:`https://ygx.sxu.edu.cn/db/学位/D798549.pdf`
- tier: **mid** · license: **unknown** · 状态:**仅 URL + 标题(不引正文)**
- (source: verified_chunks.json,artifact_id=shanghai-tang-longmen-buddha-head,source_class=C,fetch_status=ok,license=unknown;raw_path=data/raw/shanghai-tang-longmen-buddha-head/C-445ef620.pdf,原文 PDF 更长)
- **诚实定位**:这是一篇**聚焦北齐青州龙兴寺**的论文,候选 rationale 自己也注明"虽聚焦北齐,但是北朝—唐造像谱系与白石/石窟造像方法论底座,与 pilot 共用"。它**不直接讲龙门奉先寺、不直接讲盛唐**;对本件而言是**方法论底座/谱系背景**,不是本件的对口学术。加之 license unknown,本 bundle 不截录其摘要正文。

**本类置信度**:低-中(链接命中且 fetch ok,但选题与本件错位 + license 未知 → 只能挂 URL)。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced**(候选表 sources_candidates.full30.json 中本 artifact_id 下**没有 D 类候选行**;verified_chunks 中本件无 source_class=D 的 chunk)。

> 注:exhibit-list 记录本件身份来自澎湃报道(媒体口径),但该报道**未作为 D 类候选进入本次 night-run 抓取**,因此无任何现场/媒体正文落库,不在本 bundle 作引用。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced**(候选表中本 artifact_id 下**无 E 类候选行**;verified_chunks 中本件无 source_class=E 的 chunk)。

> 龙门石窟有成熟的数字人文资源(龙门数字library、芝大/外馆流散件索引等),但本次 night-run **未为本件 source E 候选**,故此处不臆补。建议列入下一轮 discovery。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **1.5 / 5**。**B 类**实落 2 条正文(CMA 141749 + Met 39640,均 CC0)= 1 类扎实到手;**C 类**有 1 条 ok chunk 但 license unknown + 选题错位 → 只挂 URL,算半类;**A 类**候选 URL 错配到兄弟件 = 未到手;**D / E** 无候选 = 未到手。 |
| 各 chunk 的 tier + license | B-CMA:mid / CC0 / 有正文。 B-Met(跨件共享):mid / CC0 / 有正文。 C-山大PDF:mid / **unknown** / 仅URL。 A-CI00159688:mid / (c)all-rights / **不是本件,作废**。 |
| 哪些源可自动化(给 ADR-006) | B 类海外 OA(Met / CMA JSON API)100% agent、字段干净、CC0 可直接入库——这是本件**唯一**能 100% 自动闭环的部分。 |
| 哪些源必须人在回路 / 需修管线 | A 类:需 **"页面原名 vs 件名"一致性校验**(本次错配);C 类:需补**本件对口学术**(龙门/奉先寺/盛唐)而非借用青州北齐论文;D/E:需 discovery 补候选。 |
| 给 PM 的 wow moment(一句话) | "本件最干净的一条不是上博自己的牌子——上博那一页 AI 抓回来发现讲的是隔壁那尊东魏佛;真正接上'龙门奉先寺佛头'叙事的,是 Met 42.25.12 那颗盛唐砂石菩萨头,40 公分,头身分离,1942 年就在纽约——同一个盛唐窗口、同一种'石头被卸下来流出去'的命运,只是这次馆方牌子没说,海外那颗头替它说了。" |

**对照原则 C/D**:本件本可承载"皇家石窟流散 vs 馆方叙事"的强张力(原则 C),但**馆方一手叙事这次没落地**(A 错配),所以 bundle 现在只剩"海外流散件替本件发声"的半边——这恰恰诚实地暴露了 Pipeline 当前的短板:**当馆方页 anchor 错配时,跨馆对照虽在,但'馆方说了什么'这一侧是空的,张力拼不全。**

## 7. 反向发现 / 该展品不工作的源

1. **A 类 anchor 错配(最重要)**:candidate A URL `…/article/id/CI00159688` fetch_status=ok,但渲染内容是**东魏石佛像(山西博物院调拨,高142cm)**,chunk 落在 artifact_id=shanghai-white-marble-buddha 名下。同 cluster 的 CI00159756 经核也是**北齐**件。**结论:上博官网这批雕塑馆 article id 与"件名"对不齐,本件无可用馆方一手页。**(无 fetch failure,而是**内容错配**——比 403 更隐蔽,需专门校验。)
2. **C 类选题错位 + license 未知**:山大《青州龙兴寺北齐佛教造像研究》PDF fetch_status=ok,但**聚焦北齐青州、非龙门/盛唐**,且 license_observed=unknown,按规则不引正文,仅可作背景挂链。
3. **D / E 类零候选**:候选表本 artifact_id 下无 D、E 行;**不是抓取失败,是 discovery 阶段就没为本件铺这两类**。龙门有现成数字人文资源,属"漏铺",非"不可达"。
4. **本件无 fetch_status=failed 的 chunk**:本件名下 2 条 chunk(CMA 141749 / 山大PDF)均 ok;另两条相关源(上博 A、Met B)以 ok 状态落在别件。故第 7 节无"失败抓取"可报,真正的失败是**A 错配 + C 错位 + D/E 漏铺**这三类**结构性 discovery 缺口**。

---

**主要来源(可追溯)**:
- CMA Open Access API:`https://openaccess-api.clevelandart.org/api/artworks/141749`(acc 1965.33,CC0,ok,本件自有 chunk)
- Met Collection API:`https://collectionapi.metmuseum.org/public/collection/v1/objects/39640`(acc 42.25.12,CC0,ok,**跨件共享源**)
- 山西大学云冈学知识库《青州龙兴寺北齐佛教造像研究》:`https://ygx.sxu.edu.cn/db/学位/D798549.pdf`(ok,license unknown,仅挂链)
- 上博官网 `…/article/id/CI00159688`(ok 但内容=东魏石佛像,**anchor 错配,作废**)
- 识别背景(非 bundle 引用源):agents/strategy-curator/exhibit-list.md;data/pipeline/in/sources_candidates.full30.json

**[ Tang Longmen Buddha-head bundle · night-run 2026-06-07 · Compiler 完 ]**
