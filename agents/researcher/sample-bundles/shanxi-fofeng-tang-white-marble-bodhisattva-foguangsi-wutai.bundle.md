# Sample Bundle · 唐 白石(汉白玉)菩萨立像(五台山佛光寺一带,俗称'东方维纳斯') · 山西博物院

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-fofeng-tang-white-marble-bodhisattva-foguangsi-wutai)

> **反幻觉声明**:本 bundle 只引用本件 artifact_id 且 fetch_status=ok 的 chunk。`(c)all-rights` 与 `confidence_tier=low` 的 chunk 一律只列 URL + 标题、不引正文。本件 4 条 chunk 全部 fetch_status=ok(无 failed),分布为 A×1 / B×3;C / D / E 三类**无任何 candidate 被采集**,在对应章节如实标注"未到手"。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 唐 白石(汉白玉)菩萨立像(五台山佛光寺一带,俗称'东方维纳斯') |
| 馆 / 厅 | 山西博物院 · 佛风遗韵 · 大唐气度单元 |
| 朝代 / 公元年范围 | 唐(7–8 世纪) |
| 材质 / 尺寸 | 白石(汉白玉);**尺寸未到手**(馆方页面未解析到本件) |
| 已知 accession / 编号 | **未到手**(A 类页面是检索入口,未落到单件 id;候选记 rationale:"唐菩萨立像单件 id 需 PM 站内定位『菩萨立像/唐/白石』") |
| 已知来源 / 出处 | 候选元信息记"五台山佛光寺一带";**馆方一手页面未自验证此出处** |
| 检索关键词 | 山西博物院 / 佛风遗韵 / 大唐气度 / 唐 / 白石 / 汉白玉 / 菩萨立像 / 东方维纳斯 / 三道弯 / S 形 / 薄衣贴体 / 五台山 / 佛光寺 |

**关于这个昵称的张力(原则 C)**:候选 rationale 里这件被选中,正因"东方维纳斯"这个昵称本身——20 世纪用西方维纳斯框架去命名一尊东方造像,是一层值得 surface 的叙事/权力痕迹。但**这句论证是 Strategy-Curator 的选品理由,不是 chunk 正文**;本 night-run 装订阶段无任何一手或学术 chunk 能为这层叙事提供可引文本,故此处只标问题、不展开。

---

## 1. 来源 A · 馆方一手页面

**chunk**:source_class=A · `https://www.shanximuseum.com.cn/sx/exhibition/collection.html?id=1004`
**tier**:mid · **license**:`(c)all-rights` · **fetch_status**:ok(playwright→html) · raw:`data/raw/shanxi-fofeng-tang-white-marble-bodhisattva-foguangsi-wutai/A-9599ef79.html`

**到手形态**:**仅 URL + 标题,不引正文**(license=`(c)all-rights`,按反幻觉硬门只列链接)。

**诚实记录(关于这条 ok 的实际内容)**:
该 URL 虽 fetch_status=ok、HTTP 已验证 301→200,但**抓回的页面正文并不是本件唐代白石菩萨**。可见正文是山西博物院站点的无障碍工具栏 / 导航菜单,加上一件**完全不同的展品**——"举手人物范 · 东周(公元前 770 年—前 221 年)"的说明文字。也就是说 `?id=1004` 这个入口当前解析到的是另一件器物,本件唐菩萨的单件页面 id **未锁定**。

**工程含义(给 ADR-006)**:这正是候选 rationale 早已预警的——"唐菩萨立像单件 id 需 PM 站内定位"。山西博物院是 js_html 单页应用,固定 `id=` 参数不保证落到目标件;**A 类对本件 = 需人在回路站内检索定位单件 id**,不能靠枚举。在拿到正确 id 之前,馆方对本件的名称、材质、尺寸、出处、说明牌文字**一律视为未到手**。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

三件海外 CC0 件,全部 fetch_status=ok,均可引正文(license=CC0、tier=mid,不触发"仅元数据/仅 URL"降级)。这是本件目前**唯一真正拼到内容的一类源**。

### 2.1 Met 39640 · Head of a Bodhisattva

**chunk**:source_class=B · `https://collectionapi.metmuseum.org/public/collection/v1/objects/39640`
**tier**:mid · **license**:CC0 · **fetch_status**:ok(httpx→json,via_vpn=True) · excerpt_truncated=True · raw:`…/B-7a226e13.json`

可追溯 excerpt 的元数据字段(JSON 原文):

| 字段 | 值 |
|---|---|
| title | Head of a Bodhisattva |
| accessionNumber | 42.25.12(accessionYear 1942) |
| culture | China |
| period | Tang dynasty (618–907) |
| objectDate | ca. early 8th century(objectBeginDate 700 / objectEndDate 733) |
| medium | Sandstone with pigment |
| dimensions | H. 15 3/4 in. (40 cm); W. 8 in. (20.3 cm); D. 7 1/2 in. (19.1 cm) |
| isPublicDomain | true → CC0 |

> excerpt 在 json 里被截断(excerpt_truncated=True),上表只列已到手字段;后续字段未见,不续写。

**与本件的对照**:同为唐代菩萨(盛唐窗口,8 世纪初),海外件可作"盛唐丰润写实样式"的对照标杆。**张力**:Met 这件 medium 是 **Sandstone(砂岩)**,而本件馆方/候选记为**白石(汉白玉)**——同一窗口、同一题材,材质谱系不同,这本身就是个值得对照的点。但因本件馆方一手页面未到手(见 §1),"白石 vs 砂岩"的对照目前**只能单边成立**(海外件有实据,本件材质无一手实据)。

### 2.2 CMA 1962.162 · Bodhisattva Guanyin

**chunk**:source_class=B · `https://clevelandart.org/art/1962.162`
**tier**:mid · **license**:CC0 · **fetch_status**:ok(httpx→html,via_vpn=True) · raw:`…/B-8096e547.html`

可追溯 excerpt 正文:

> Bodhisattva Guanyin / late 500s–early 600s / China, late Northern Qi (550–577) or early Sui dynasty (581–618)

**与本件的对照**:隋至初唐菩萨立像海外标杆;候选 rationale 用它做本件"三道弯(S 形)体态"的**样式连续性**上游一端(北齐末—隋)。注意:chunk 正文只给到年代与文化归属,**未到手尺寸 / 材质 / 出处**(CMA 页面正文还附了一句标准免责声明:出处信息"may not be currently accurate")——故"三道弯体态相似"是基于题材与窗口的合理对照,**而非 chunk 里逐字写出的形态描述**,此处不替它脑补体态文字。

### 2.3 CMA 1964.152 · Amida Buddha

**chunk**:source_class=B · `https://clevelandart.org/art/1964.152`
**tier**:mid · **license**:CC0 · **fetch_status**:ok(httpx→html,via_vpn=True) · raw:`…/B-9c3b0aac.html`

可追溯 excerpt 正文:

> Amida Buddha / 581–618 / China, Sui dynasty (581-618)

**与本件的对照**:补全"隋"这一过渡窗口,衔接北齐→隋→唐的造像谱系(对应用户原则 D:读懂跨件的知识结构网络)。同样,chunk 正文只到年代/文化层,材质、尺寸、出处未到手。

**B 类小结(给 ADR-006)**:Met API + CMA HTML 两条路径在 night-run 沙箱里**走通了**(均 via_vpn),拿到了真实 CC0 元数据/正文。这三件已经实质交付了一张"隋→唐菩萨样式谱系"的对照雏形(CMA Guanyin 北齐末-隋 → CMA Amida 隋 → Met Bodhisattva 盛唐)。但**它们都是"对照件"而非本件**——bundle 的中心展品(山西这一尊)目前**只有海外的邻居,没有自己的脸**。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced**(本件在 `sources_candidates.full30.json` 中仅有 A×1 + B×3 候选,Discovery 阶段未为本件采集任何 C 类候选;verified_chunks 中本件也无 C 类 chunk)。

不补:不引入任何未在 chunk 中出现的曲阳白石 / 五台山 / 佛光寺 / "东方维纳斯"命名史的论文内容。该层留给 PM 早晨补源。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced**(本件无 D 类候选、无 D 类 chunk)。

注:exhibit-list 把本件源覆盖记为 `mid·ABD`,即"期望"含 D;但 night-run 实际采集到的候选只有 A、B,D 类**期望存在而未落地**。如实标"未到手"。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced**(本件无 E 类候选、无 E 类 chunk)。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**(A、B);其中 **A 仅 URL(license all-rights 且页面未解析到本件)**,**B 是唯一拼到内容的一类**(3 件 CC0 正文/元数据) |
| C / D / E | **0 / 3**,全部 `no candidate sourced`(非抓取失败,是 Discovery 未为本件起候选) |
| 各 chunk 的 tier + license | A:mid · `(c)all-rights`(仅 URL);B-Met 39640:mid · CC0(元数据,excerpt 截断);B-CMA 1962.162:mid · CC0(正文);B-CMA 1964.152:mid · CC0(正文) |
| failed chunk | 无(本件 4 条全部 fetch_status=ok) |
| bundle 完整度自评 | **偏低**——中心展品(山西本件)零一手内容;能拼出的只是一圈海外对照件 |
| 给 PM 的 wow moment 一句话 | "**这尊被叫作『东方维纳斯』的山西唐代白石菩萨,我们目前一句馆方自己的话都没拿到——`id=1004` 抓回来的竟是另一件东周的『举手人物范』。但 AI 已经在 Met 和克利夫兰把它的海外邻居排好了队:北齐末的观音、隋的阿弥陀、盛唐的菩萨头,一条隋→唐的样式谱系就摆在那儿,只等山西这尊本尊的脸补进来——而那张脸,得 PM 进站内把单件 id 找对了才有。**" |

**对 ADR-006 的判断**:本件是"**海外对照先于本馆一手**"的典型形态——和 Shanghai 北齐白石那件(馆方策展声明自带跨馆线索)正好相反。那件是"馆方先开口、海外来印证";这件是"海外排好队、馆方还没开口"。两种形态都应被 ADR-006 接受为合法产出,且都印证同一条结论:**bundle 完整度跨件差异极大,应承诺『诚实标完整度、不灌水』而非统一深度**。

---

## 7. 反向发现 / 该展品不工作的源

- **山西博物院 A 类入口(`collection.html?id=1004`)对本件不工作**:HTTP 200 但 js_html 单页应用的固定 `id=` 参数解析到的是**另一件展品(东周『举手人物范』)**,不是本件唐菩萨。`fetch_status=ok` 在这里**只代表"页面抓到了",不代表"抓到了对的页面"**——这是 night-run 一个重要的反向发现:**ok ≠ on-target**,装订阶段必须逐条核对 excerpt 是否真讲本件。本件因此在名称之外的所有馆方字段(编号 / 材质实据 / 尺寸 / 出处 / 说明牌文字)**全部为空**。
- **本件无任何 failed chunk**(4 条全 ok),所以第 7 节没有"抓取失败"可写;真正的缺口不是"抓失败",而是 **A 抓偏 + C/D/E 根本没起候选**。
- **C / D / E 三类对本件 = no candidate sourced**:不是源不可达,是 Discovery night-run 没为本件生成这三类候选。PM 早晨补源时,这三层(尤其 C 类"东方维纳斯"命名史 / 曲阳白石学术、与 E 类数字人文)是本件从"一圈海外邻居"走向"有自己叙事"的关键补口。

---

**主要来源(可追溯清单)**:
- 山西博物院 · 佛风遗韵检索入口:`https://www.shanximuseum.com.cn/sx/exhibition/collection.html?id=1004`(A,`(c)all-rights`,ok 但解析到非本件,仅列 URL)
- Met objectID 39640 *Head of a Bodhisattva*:`https://collectionapi.metmuseum.org/public/collection/v1/objects/39640`(B,CC0,accession 42.25.12,Tang,Sandstone with pigment)
- CMA 1962.162 *Bodhisattva Guanyin*:`https://clevelandart.org/art/1962.162`(B,CC0,late Northern Qi or early Sui)
- CMA 1964.152 *Amida Buddha*:`https://clevelandart.org/art/1964.152`(B,CC0,Sui 581–618)

**[ Sample Bundle (night-run AI 装订) 完 · artifact_id=shanxi-fofeng-tang-white-marble-bodhisattva-foguangsi-wutai · 2026-06-07 ]**
