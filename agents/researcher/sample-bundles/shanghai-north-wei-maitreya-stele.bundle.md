# Sample Bundle · 北魏 弥勒/释迦造像碑(造像碑—背屏式石造像组) · 上海博物馆东馆 · 中国古代雕塑馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-north-wei-maitreya-stele)

> 装订说明:本件在 verified_chunks.json 中共 **3 条 chunk,全部 fetch_status=ok**(A×1、B×2),**无 failed chunk**。C/D/E 三类本件无 chunk(详见第 3/4/5 节与第 7 节)。本 bundle 只引用这 3 条,凡正文引用均可回指某条 chunk 的 excerpt_or_metadata 或其顶层字段。

---

## 0. 展品识别

| 字段 | 内容 | 出处 |
|---|---|---|
| 名称 | 北魏 弥勒/释迦造像碑(造像碑—背屏式石造像组) | sources_candidates.full30.json · artifact_name_zh |
| 馆 / 厅 | 上海博物馆东馆 · 中国古代雕塑馆 · 魏晋南北朝单元(北朝造像) | exhibit-list.md |
| 朝代 / 公元年范围 | 北魏(386–534);本件 chunk A 正文判其"已入北魏晚期" | chunk A(上博官网)|
| 材质 / 形制 | 四面刻佛龛的石塔(造像碑—背屏式)。**注:本件具体石材未在到手 chunk 中给出** | chunk A |
| 已知 accession / 编号 | **未到手**(上博官网为 js_html 单页应用,本件 article 页未暴露馆藏 ID) | — |
| 已知来源/出处 | **未到手**(无出土地、无旧藏链) | — |
| 检索关键词 | 上海博物馆 / 上博东馆 / 中国古代雕塑馆 / 北魏 / 造像碑 / 背屏式 / 一佛二菩萨 / 释迦多宝 / 维摩诘文殊 / 飞天 / Buddha Maitreya / Northern Wei | — |

**为什么选它(承自 strategy-curator)**:上博东馆雕塑馆把魏晋南北朝—隋唐造像做成"有形的中国古代雕塑通史",北魏造像碑/背屏式石造像是该单元起点;选它锚住整条北朝—初唐窗口的"起点",与 pilot 件做谱系对照。

---

## 1. 来源 A · 馆方一手页面

**chunk**:`A` · 上博官网雕塑馆魏晋南北朝造像页
`https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00004661`
**tier=mid · license=(c)all-rights · fetch_status=ok · 有正文截录**(raw: data/raw/shanghai-north-wei-maitreya-stele/A-0cd0059c.html)

> license 为 `(c)all-rights`(版权全保留)。下面是馆方一手描述性正文,因属研判核心证据按 mid-tier 截录引用;**不可二次分发,最终 bundle 须复核引用边界**。

馆方对该石塔(造像碑)的四面逐面描述(chunk A 原文截录):

- **正面**:龛中一佛二菩萨像;龛楣饰飞天,裸身、扭腰成九十度、头向右侧、二臂展开成飞舞形态,双手抓一条长飘带随风舒卷。馆方据"脸庞丰润圆满、与北魏早期'瘦骨清像'已成区别",判"其年代已入北魏晚期"。
- **右面**:一佛二菩萨,主尊为阿弥陀佛,袈裟刻法奇特——常见的胸前结带在此成大片三角状袈裟;二侧菩萨赤足而立,左尊冠饰化佛"应为观音的象征"。此龛下部雕骆驼与似羊怪畜,"似将观者带入西域的丝绸之路上迎请佛像的场景"。
- **左面**:二佛,"应为释迦和多宝佛",衣着飘垂、波曲折叠、质感极强,似成相对形式;座下双狮瞪眼张口、昂首翘尾。
- **背面**:文殊、维摩诘相对说法图;下部雕一条张口回首翘尾的龙,"使此件佛像雕刻更具生动和世俗性"。

**这一节在 pipeline / user-voice 上的意义**:
- 这是本件 **唯一一条"有馆方一手正文"的 chunk**——而且密度不低:四面图像志(飞天/阿弥陀+观音/释迦多宝/维摩诘文殊)馆方都点到了。这正是 user-voice 原则 D 想要的"布展者意图的知识结构":馆方在用一件碑讲一部"图像志小通史"。
- 但**馆方叙事的留白也很诚实地暴露了**:正文给了密集的"看什么"(图像辨识),却**完全没给"这是谁的碑、哪来的、什么石头、几号"**——出土地、供养人、纪年、馆藏号全部缺位。馆方在此件上是"审美/图像志叙事"强、"物质/来源/权力归属叙事"弱。这一缺口正好留给来源 B 的纪年标尺件去补。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本件拿到 **2 条 B 类 chunk,均来自 Met 开放 API,license=CC0,tier=mid,fetch_status=ok**。两件都是 Met 收藏的北魏**纪年**"Buddha Maitreya(弥勒)"——本件上博碑无纪年,故 B 类的工程角色是**纪年标尺(dated benchmark)**,给无纪年的上博碑做风格断代外挂。

### 2a. Met 42162 — Buddha Maitreya (Mile) Altarpiece(纪年 524 正光五年)
`https://collectionapi.metmuseum.org/public/collection/v1/objects/42162`
**tier=mid · license=CC0 · fetch_status=ok · 元数据(部分截录)**
(raw: data/raw/shanghai-north-wei-maitreya-stele/B-4297140a.json;chunk excerpt 在 1500 字处截断,截到的部分恰为高清图 URL 列表)

可从 chunk 直接确认的字段:`objectID=42162`、`accessionNumber=38.158.1a–n`、`accessionYear=1938`、`isPublicDomain=true`、`primaryImage`(images.metmuseum.org/CRDImages/as/…/DP217575.jpg)+ 十余张 additionalImages 高清直链。
chunk 顶层 `source_title` 记其身份为:**"Buddha Maitreya (Mile) Altarpiece" dated 524(正光五年)北魏,纪年标尺件,与上博无纪年北朝造像碑做风格断代对照**。

> **一处需复核的元数据冲突(诚实标注)**:本 chunk 的 `source_title`/`notes` 把 42162 记为"石灰岩造像龛";但其 raw_path 的 Met 原始记录 `medium=Gilt bronze`(鎏金铜)。两者矛盾。本 bundle **不替任一方下结论**,按 chunk 可确认字段只保留"北魏纪年 524 的弥勒造像龛 + CC0 高清图",材质留待最终复核。

### 2b. Met 42733 — Buddha Maitreya (Mile)(纪年 486 太和十年)
`https://collectionapi.metmuseum.org/public/collection/v1/objects/42733`
**tier=mid · license=CC0 · fetch_status=ok · 元数据(excerpt 内含核心字段)**
(raw: data/raw/shanghai-north-wei-maitreya-stele/B-047b4803.json)

可从 chunk excerpt 直接确认的字段:
`title="Buddha Maitreya (Mile)"`、`period="Northern Wei dynasty (386–534)"`、`objectDate="dated 486 (10th year of Taihe reign)"`、`medium="Gilt bronze with traces of pigment; piece-mold cast"`、`dimensions="H. 55 1/4 in. (140.3 cm)…"`、`accessionNumber="26.123"`、`accessionYear=1926`、`isPublicDomain=true`、`objectName="Figure"`、`culture="China"`、`primaryImage`(…/DP170102.jpg)。

**对照论证(只用上面两条 chunk + 来源 A 正文,不外推)**:
- 上博这件碑馆方判"已入北魏晚期"但**无确切纪年**;Met 这两件给出两个硬纪年锚点——**太和十年(486)**(42733,H140cm 大型金铜弥勒)与 **正光五年(524)**(42162)。一头一尾正好夹住北魏中后期"太和改制→孝明帝晚期"这条时间轴,可作为给上博碑做相对断代的标尺区间。
- 三件共享同一题材语义场:**弥勒(Maitreya)/释迦造像**。上博碑馆方点出"释迦和多宝佛""阿弥陀+观音"的图像志,Met 两件则是同窗口被命名为"弥勒"的纪年单体——同一信仰系统里"碑式集合叙事"对"单体纪年大像"的两种物质形态。

**张力(user-voice 原则 C/D)**:海外馆(Met,CC0)把这两件北魏弥勒做成**字段化、纪年明确、高清图全开放**的数据点;上博馆方页面给的是**审美化、图像志细读、却隐去纪年/来源/编号**的叙事。同一段北魏佛教艺术,"馆方叙事 vs 海外数据"的差异不在内容真假,而在**它们各自选择 surface 什么**——一边给你"看懂这条飘带怎么飞",一边给你"这是哪一年、几号、谁的旧藏、可自由使用"。这正是本件最值得对 PM 点出的一层。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no ok chunk in verified_chunks.json for this artifact。**

候选清单(sources_candidates.full30.json)里本件确有一条 C 候选——故宫院刊《东魏北齐响堂石窟与邺城造像比较研究》(`https://www.dpm.org.cn/Uploads/File/2020/12/29/u5feacd4049fc4.pdf`,与 pilot 共用、计划 7 字段短引不全文向量化)——但该 URL **在本件 artifact_id 下没有产出 fetch_status=ok 的 chunk**,本次 night-run 未取到正文。按反幻觉门:**仅登记候选 URL + 标题,不引任何正文**。该 PDF 主题为"东魏北齐",与本件"北魏"窗口偏晚,学术相关性也需在补取后再判。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced(本件在 candidates 中无 D 类候选,verified_chunks.json 中亦无 D chunk)。**

(exhibit-list 的上博东馆条目提到四件展品身份来自澎湃现场报道,但那是 strategy-curator 选品阶段的证据链,**未作为本件 artifact_id 的 D-class chunk 落入 verified_chunks.json**,故按门槛不在此引用。)

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced(本件在 candidates 中无 E 类候选,verified_chunks.json 中亦无 E chunk)。**

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**(A×1 有正文截录;B×2 CC0 元数据)。**C 仅候选 URL 无正文;D、E 无候选。** |
| 各 chunk 的 tier + license | A:mid · (c)all-rights(有正文,引用受限);B-42162:mid · CC0(部分元数据,材质字段有冲突待复核);B-42733:mid · CC0(核心元数据齐,含纪年/尺寸/编号)。**三条全 mid,无 high-tier;无 low-tier 被降级。** |
| 哪些可全自动化 | B 类 Met CC0 API:100% agent(via_vpn=true 已成);A 类上博 article 页:js_html 单页,本次取到正文但**馆藏 ID/来源字段未渲染出**,需人在回路或带渲染的抓取补 ID。 |
| 完整度自评 | **中**。图像志叙事(A)够细、纪年标尺(B)干净,但**本件缺出土地/供养人/纪年/馆藏号/石材**,且无 C/D/E,谱系深度撑不起来。诚实标"未到手",不灌水。 |
| 给 PM 的 wow moment(一句话) | "上博这块北魏碑,馆方逐面教你看飞天怎么飞、释迦多宝怎么并坐,却**只字不提它哪年造、几号、谁的旧藏**;而 AI 在 Met 的开放数据里翻出两尊有纪年的北魏弥勒(太和十年 486、正光五年 524、CC0 高清全开),正好把这块无纪年的碑夹进一段可断代的时间轴里——馆方给你审美,海外数据给你坐标。" |

## 7. 反向发现 / 该展品不工作的源

- **本件无 fetch_status=failed 的 chunk** —— 3 条全部 ok,这一节没有"失败原因"可写,据实记录"无失败 chunk"。
- **A 类(上博官网)的真实短板不是抓不到,而是抓到了也没编号**:CI00004661 取回了四面图像志正文,却没渲染出馆藏 accession / 出土来源——上博 article 页是 js_html 单页应用,关键 metadata 不在首屏 HTML。→ ADR-006:上博件应把"正文叙事"与"ID/来源回填"拆成两步,后者需带渲染抓取或 PM 国内 IP 回填。
- **C 候选(故宫院刊响堂 PDF)本次空手**:候选在册但未产出 ok chunk;且其主题为"东魏北齐",对本件"北魏"窗口是邻接而非命中,补取后仍需判相关性,不宜当成本件学术底座。
- **D / E 整类无候选**:本件在选品阶段没有被配现场源(izi.TRAVEL / 公众号长文)与数字人文源(数字敦煌 / 国博邺城专题 / CBETA),所以"谱系网络"这一层(原则 D 的第 4 层"跨馆网络")在本件目前只能靠 B 类两件 Met 撑,聚合厚度有限。
- **B-42162 材质字段冲突**(notes 记"石灰岩" vs raw 记"Gilt bronze"):提示 candidate 注释与馆方原始记录之间存在人工标注误差,最终 bundle 须以馆方原始字段为准并复核。

---

**主要来源(本件 3 条 chunk)**:
- 上海博物馆官网雕塑馆魏晋南北朝造像页:`https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00004661`(A · (c)all-rights · ok)
- Met API #42162 *Buddha Maitreya (Mile) Altarpiece*(dated 524):`https://collectionapi.metmuseum.org/public/collection/v1/objects/42162`(B · CC0 · ok)
- Met API #42733 *Buddha Maitreya (Mile)*(dated 486):`https://collectionapi.metmuseum.org/public/collection/v1/objects/42733`(B · CC0 · ok)

**[ Sample Bundle · shanghai-north-wei-maitreya-stele · night-run 2026-06-07 完 · 2/5 类到手,3/3 chunk ok,无 failed ]**
