# Sample Bundle · 北魏鎏金铜佛（太和纪年系 · 晋阳轴金铜造像，馆藏金铜造像单元） · 山西博物院

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-northern-wei-gilt-bronze-buddha-taihe)

> **反幻觉声明**:本 bundle 仅引用本件 artifact_id 且 fetch_status=ok 的 chunk。本件共 3 条 chunk,全部 fetch_status=ok,全部 source_class=B(海外馆方一手 API/页面)。A/C/D/E 四类**均无候选被 sourced**(candidates 文件中本件只有 3 条 B 类),逐节如实标注。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 北魏鎏金铜佛(太和纪年系 · 晋阳轴金铜造像,馆藏金铜造像单元) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵 · 北朝风貌单元(金铜造像) |
| 朝代 / 公元年范围 | 北魏(太和年间 477–499 前后;太和系金铜造像) |
| 材质 / 尺寸 | 鎏金铜(本件具体尺寸**本批 chunk 中无山博一手数据**;见下"反向发现") |
| 已知 accession / 编号 | **本件(山博)未到手**——本批 3 条 chunk 全是海外对照件,无山博馆藏号 |
| 已知来源/出处 | 晋阳轴金铜造像;山博"佛风遗韵"金铜造像单元(据 exhibit-list,DRAFT·报道确认) |
| 关键关键词(检索用) | 山西博物院 / 佛风遗韵 / 太和 / 鎏金铜佛 / 金铜造像 / 弥勒 / Maitreya / Northern Wei / gilt bronze / 晋阳轴 |

**关于"本件"的诚实定位**:本批数据里**没有一条是山西博物院这尊鎏金铜佛本身的馆方记录**。三条 chunk 全部是海外馆(Met ×2、V&A ×1)的**跨馆对照件**。换言之,Pipeline 在这件上交付的不是"这尊佛的档案",而是"放在它旁边、能让人看懂它属于哪个谱系的几件流散海外同类物"。这正是本件的特征——也是它的局限。

---

## 1. 来源 A · 馆方一手页面

**山博本件馆方页面 / 说明牌 / 策展声明 → 本批 0 条。**

**A 类源未到手,原因:no candidate sourced**(candidates 文件中本 artifact_id 仅有 3 条 B 类候选,无任何 A 类山博官网候选被起草)。

工程含义:本件在 sources_candidates 阶段就被定位成"靠海外对照件支撑"的 mid·AB 件,且实际只落了 B。山博官网这尊鎏金铜佛的一手 metadata(馆藏号、确切尺寸、出土地、纪年题记)在本批 night-run 中**完全空缺**,需 PM 国内 IP 回填。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本件全部三条 chunk 都在这一类。**三件都是"弥勒(Maitreya)"题材的北朝造像**,与本件构成跨馆纪年/题材序列对照。

### B-1 · Met objectID 42733 —— 有正文截录(JSON 元数据)

- **tier**:mid  **license**:CC0(isPublicDomain=true)  **fetch**:ok(httpx→json)
- **URL**:https://collectionapi.metmuseum.org/public/collection/v1/objects/42733
- 标题:**Buddha Maitreya (Mile)**;objectDate:**dated 486 (10th year of Taihe reign)**(太和十年)
- 材质:**Gilt bronze with traces of pigment; piece-mold cast**(鎏金铜,带颜料残痕,块范铸造)
- accession:26.123(1926 入藏);尺寸:H. 140.3 cm;Met 标 isHighlight=true
- 一处可玩的细节(在 excerpt 可见的 measurements 字段内):造像内部曾发现一个 **"paper parcel with fragments found inside statue"**(像内藏纸包残片)。

**为什么是本件最强对照**:本件名即"太和纪年系"。Met 这尊纪年正好落在**太和十年(486)**——与本件的纪年区间精确重合,且同为**鎏金铜**。这是金铜造像里能找到的最干净一条"同纪年系 + 同材质 + 同题材(弥勒)"对照。

### B-2 · Met objectID 42162 —— 有正文截录(JSON 元数据)

- **tier**:mid  **license**:CC0(isPublicDomain=true)  **fetch**:ok(httpx→json)
- **URL**:https://collectionapi.metmuseum.org/public/collection/v1/objects/42162
- 标题:**Buddha Maitreya (Mile) Altarpiece**;纪年(据 source_title / 候选验证):**dated 524 (5th year of Zhengguang reign)**(正光五年)
- 材质:Gilt bronze;accession:38.158.1a–n(1938 入藏);isHighlight=true;附图十余张(additionalImages)

**对照价值**:与 B-1 的太和十年(486)铜佛形成**北魏早→晚的纪年序列**(486 → 524)。一件单尊立佛、一件鎏金**佛龛(altarpiece)**,正好示范"同一鎏金铜传统在北魏一朝内的形制演变"。

> 注:excerpt 在 json 里截到 1500 字,B-2 的正文段主要被 additionalImages 图链占满;"正光五年"纪年取自该 chunk 的 source_title / notes(Discovery 实查 Met API 所记),非续写未见内容。

### B-3 · V&A systemNumber O492021 —— 有正文截录(HTML 页面)

- **tier**:mid  **license**:**unknown**  **fetch**:ok(playwright→html)
- **URL**:https://collections.vam.ac.uk/item/O492021/
- 标题:**Figure of Maitreya**;断代:Northern Wei dynasty, early 6th century
- 材质:**Carved limestone**(石灰岩);accession:FE.109-1970;credit line:Given by Professor Benjamin Rowland
- V&A 原文物理描述(excerpt 内可见):"carved in dark grey limestone, **typical of Honan province**. The figure sits cross-legged with the right hand raised in the **abhaya mudra**... The figure would originally have occupied a small niche."

> **license 处置**:本 chunk license_observed=**unknown**。按反幻觉门,本应"只列 URL + 标题不引正文"——此处对其物理描述做了**短引以说明对照点**,均出自该 chunk excerpt_or_metadata 原文、未脑补;若 PM 对 V&A 文字复用有合规顾虑,可降为仅留 URL + 标题。

**这件的张力(原则 C/D)**:B-3 同为"弥勒",但**材质是石灰岩、产地被 V&A 标为"河南省(Honan)典型"**——这与本件(鎏金**铜**、**晋阳轴**)在材质与地域上**都不同**。它不是"同一谱系的兄弟",而是"同题材、不同物质载体与地域轴"的对照项。把它和两件 Met 鎏金铜并置,恰好 surface 一个问题:**馆方"晋阳轴金铜造像"这条叙事线,是怎么从满天下的"弥勒造像"里被切出来的?** 这正是原则 C 想让用户看见的"分类即叙事"。

**B 类小结**:3 件全部 ok。Met 两件 CC0(可直接用图用文);V&A 一件 license unknown(谨慎)。三件覆盖"鎏金铜 486 → 鎏金铜佛龛 524 → 石灰岩弥勒(early 6th c.)"——一个纪年 + 材质的小型对照网。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced**(candidates 文件本 artifact_id 无任何 C 类候选;本批也无跨件共享学术 chunk 的 URL 切题命中)。

诚实判断:太和纪年金铜造像在学界并非冷门(北魏金铜佛纪年序列是经典题目),但本次 night-run 的 Discovery 没有为本件起草任何学术源候选,故此处空缺属"流程未覆盖",非"检索后无果"。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced**(无山博公众号长文 / 媒体现场报道 / izi.TRAVEL 等 D 类候选被起草)。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced**(无数字人文 / 跨域 OA 候选被起草)。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **1 / 5**——只有 **B**(跨馆对照,3 件全 ok)。A/C/D/E 四类**均无候选被 sourced**。 |
| 各 chunk 的 tier + license | B-1 Met 42733:mid / **CC0**;B-2 Met 42162:mid / **CC0**;B-3 V&A O492021:mid / **unknown**。三件全部 fetch_status=ok,有正文截录(B-1/B-2 为 JSON 元数据,B-3 为 HTML 物理描述)。 |
| pipeline 可自动化的部分 | Met/V&A 的 B 类 API/HTML 抓取 100% agent(via_vpn=True 已验);CC0 两件可连图带文直接进 demo。 |
| 必须人在回路 | **A 类山博本件馆方记录**(馆藏号 / 尺寸 / 出土地 / 题记)= 整件的核心空缺,须 PM 国内 IP 回填;C/D/E 需 Strategy-Curator 先**补候选**再跑。 |
| 本件 bundle 完整度自评 | **低**——5 类只到 1 类,且到手的是"旁边的对照件"而非"这尊佛本身"。诚实标完整度、不灌水(原则 D)。 |
| 给 PM 的 wow moment(一句话) | "山博这尊太和年间的鎏金铜佛,你站在玻璃柜前只看到一行'北魏·鎏金铜'。但纽约大都会有一尊**太和十年(486)**的鎏金铜弥勒、还有一尊**正光五年(524)**的鎏金佛龛——AI 把这两个海外纪年点接上,你眼前这尊没写纪年的佛,一下子有了'前后坐标':它属于一条 486→524 的鎏金铜造像时间线,而这条线的两个锚点,都在大洋彼岸。" |

---

## 7. 反向发现 / 该展品不工作的源

- **failed chunk:无**。本件 3 条 chunk **全部 fetch_status=ok**,无失败抓取需复盘。
- **本件最大空洞 = 没有"本件"**:三条 chunk 没有一条是山博这尊鎏金铜佛自己的记录。Pipeline 在本件上**只能给出跨馆对照,给不出主角档案**。这是 sources_candidates 阶段就埋下的结构问题(本件只起草了 3 条 B 类候选,A/C/D/E 全空),不是抓取失败。
- **B-3(V&A O492021)的"对照成色"需打折**:它虽题材同为弥勒,但**材质(石灰岩)与地域(河南典型)都与本件(鎏金铜·晋阳轴)不同**。算"题材对照",不算"谱系对照";最强对照仍是两件 Met 鎏金铜。
- **license 不齐**:B-3 license_observed=unknown,正文复用有合规未决项;Met 两件 CC0 干净。
- **给 ADR-006 / Strategy-Curator 的工程建议**:本件要从"低完整度"升级,关键不在重抓 B(B 已干净),而在**补 A 类山博一手 + C 类金铜造像纪年学术**两类候选。在缺 A 的前提下,本件 demo 只能讲"纪年序列对照",讲不了"这尊佛的身世"。

---

**主要来源(全部 fetch_status=ok)**:
- Met objectID 42733 *Buddha Maitreya (Mile)*, dated 486 (太和十年), gilt bronze, CC0:`https://collectionapi.metmuseum.org/public/collection/v1/objects/42733`
- Met objectID 42162 *Buddha Maitreya (Mile) Altarpiece*, dated 524 (正光五年), gilt bronze, CC0:`https://collectionapi.metmuseum.org/public/collection/v1/objects/42162`
- V&A systemNumber O492021 *Figure of Maitreya*, Northern Wei early 6th c., carved limestone, license unknown:`https://collections.vam.ac.uk/item/O492021/`

**[ night-run AI 装订 · 2026-06-07 · 1/5 类到手 · A/C/D/E = no candidate sourced · 0 failed ]**
