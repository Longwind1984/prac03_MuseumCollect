# Sample Bundle · 北齐白石佛立像(响堂山系) · 上海博物馆东馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-white-marble-buddha)

> 装订口径:本件 12 条 chunk 全部 fetch_status=ok。但"ok"只代表"抓到了一个响应",不代表"抓到了有效正文"——其中知乎(D)与 archive.org(E)抓回的是风控/占位页,故宫修德寺 PDF(C)抓回的是 0 字图片层。下文逐条诚实区分"有正文截录 / 仅元数据 / 仅 URL"。

---

## 0. 展品识别

| 字段 | 内容 | 出处 chunk |
|---|---|---|
| 名称(媒体/展线称呼) | 北齐 白石佛立像(响堂山系) | exhibit-list / D-thepaper |
| 名称(馆方藏品库题名) | **石佛像**(原名:佛石像) | A · CI00159756 |
| 馆 / 厅 | 上海博物馆东馆 · 中国古代雕塑馆 | A + D |
| 朝代 / 详细年代 | 南北朝 · **北齐**(550–577) | A · CI00159756 |
| 材质 / 尺寸 | 石 · **高144厘米,横80厘米** | A · CI00159756 |
| 工艺 / 外观 | **高浮雕** · 独立造型 | A · CI00159756 |
| 已知 accession / 编号 | **馆方页面未暴露 V/I/RI 馆藏号**(article id = CI00159756,是文章 id 非藏品号) | A |
| 馆方自标产地 / 来源 | **产地:山西;来源:山西省博物院调拨** | A · CI00159756 |
| 主题标签 | 佛、火焰纹、莲花 | A · CI00159756 |
| 检索关键词 | 上海博物馆东馆 / 中国古代雕塑馆 / 北齐 / 白石 / 石佛像 / 响堂山 / Xiangtangshan / 邺城模式 / 龙树背龛 / 笈多 | — |

**装订即发现(本件最值得 PM 看的一条)**:
媒体与本仓库展线把这件叫"白石佛立像(响堂山系)",暗示来源在**河北**(响堂山/邺城域)。但**馆方藏品库一手页面**(A · CI00159756)白纸黑字写的是:产地 **山西**、来源 **山西省博物院调拨**、工艺 **高浮雕**。
也就是说,**馆方自己的结构化字段并不背书"响堂山系/河北"这个叙事**——"响堂山"是媒体报道层(D)叠加的解读,不是藏品库字段。这正是原则 C 要 surface 的那一层:"说明牌/藏品库为什么这样写、不写另一种"。本件不是"馆方自标响堂山 → V&A 闭环",而是**"馆方藏品库标山西 vs 媒体解读响堂山"的张力件**——下文按这个真实张力重写。

> 注:A-CI00159688(第二条上博页面)抓回的是**另一件**——"石佛像 / 东魏 / 高142厘米 / 产地山西 / 山西博物院调拨"。两条 article id 对应两尊邻近陈列的北朝白石/石造像,**编册时不可把 159688 当本件正文引用**,仅作"上博东馆同单元邻件"旁注。

---

## 1. 来源 A · 馆方一手页面 — **有正文截录**

**chunk**:A · `https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00159756`
**tier**:mid · **license**:(c)all-rights · fetch:playwright→html · status:ok

馆方藏品库该件的结构化字段(可逐字追到 chunk excerpt):

- 题名:**石佛像**(原名:佛石像)
- 时代:南北朝 / 详细年代:**北齐**
- 类别:刻石 → 进阶类别:造像
- 尺寸:**高144厘米,横80厘米**
- 材质:石 / 工艺:**高浮雕** / 外观形式:独立造型
- 产地:**山西**
- 来源:**山西省博物院调拨**
- 主题:佛、火焰纹、莲花 / 位置:中国古代雕塑馆

**这条 chunk 的工程价值**:它是**全 bundle 唯一一条把馆方一手结构化字段抓全的源**(playwright 渲染成功,非 403)。它直接推翻了"响堂山系"标签里隐含的河北来源——馆方记的是山西调拨。license 为 (c)all-rights,字段可引用作事实核对,但不可整页转载。

**仍缺的**:馆方完整馆藏号(V/I/RI)未在此页暴露;说明牌长文 / 策展声明 0 条(此页是藏品库条目,不是策展叙事)。

---

## 2. 来源 B · 跨馆对照件(海外 OA) — **有正文截录**(3 条,皆 ok)

**搜索逻辑**:北齐头部/立像石造像,优先"出处文字里点名响堂山"的对照件,用来检验"馆方藏品库标山西"与"国际馆藏标响堂山"之间到底差在哪。

### 2.1 V&A O129249 — wow moment 的核心对照件
**chunk**:B · `https://collections.vam.ac.uk/item/O129249/` · tier:mid · **license:unknown** · truncated=True

> license_observed=unknown,按硬门**只摘录馆方原始字段、不二次演绎**,以下均为 V&A 页面原文短语:
- 题名:Buddha head,550–577 (made)
- 材质:Carved grey limestone with traces of pigment
- Brief description 原文:**"Buddha head … probably from Xiangtangshan, Hebei province, China, Northern Qi dynasty, 550-577."**
- Object history 原文:**"This piece is probably from the Xiangtangshan cave complex in northern China …"**;并自标相似件 "A.27-1914 … similar works at Philadelphia University and Cologne"

**张力点(原则 C/D)**:V&A 把一件北齐佛头明确系到**响堂山(河北)**;上博把本件系到**山西调拨**。两馆对同一窗口、同一"白石/灰岩北齐造像"群,**给出的产地叙事不一样**。这不是"一拼就闭环"的浪漫故事,而是更诚实的发现:**"响堂山系"这个标签在国际馆藏里有出处文字支撑,在上博藏品库字段里却被记成山西**——到底哪个对,或这其实是两套不同的件,正是 bundle 应该交给用户的"知识结构的网络"问题,而不是替馆方拍板。

### 2.2 Met 42704 — 出处文字独立佐证"响堂山"
**chunk**:B · `https://collectionapi.metmuseum.org/public/collection/v1/objects/42704` · tier:mid · **license:CC0**

CC0,字段可引:objectID 42704 / accessionNumber **57.176** / title "Head of a Buddha" / **culture "China (Southern Xiangtangshan)"** / period Northern Qi (550–577) / objectDate ca. 565–75 / medium Limestone with pigment / H. 39.4 cm。isPublicDomain=true,有高清 primaryImage。
→ Met 用 culture 字段直接写 **Southern Xiangtangshan(南响堂)**,是"响堂山"叙事的第二个独立馆藏佐证。

### 2.3 Met 60794 — 同窗口头部
**chunk**:B · `https://collectionapi.metmuseum.org/public/collection/v1/objects/60794` · tier:mid · **license:CC0**

accessionNumber **2001.422** / "Head of a Buddha" / culture "China" / Northern Qi (550–577) / mid-6th century / medium **Limestone with traces of pigment and gilding** / H. 24.1 cm。culture 此件只写到 China,**未点名响堂山**——可作"同窗口但出处更弱"的对照刻度。

### 2.4 CMA 156948 — 北齐大理石造像碑
**chunk**:B · `https://openaccess-api.clevelandart.org/api/artworks/156948` · tier:mid · **license:CC0**

accession **1993.108** / share_license_status **CC0** / tombstone "Stele with Shakyamuni and Maitreya, c. 570s. China, Northern Qi (550-577). **Marble with polychromy**; overall 119 cm" / 在展位置 241C Chinese Buddhist Sculptures。
→ 与本件共享"北齐 + 大理石/白石 + 彩绘残存"的材质叙事;但它是造像碑(stele),非立像,相似度中等。

**B 类小结**:3 个海外馆(V&A / Met×2 / CMA)4 条 OA chunk 全部 ok,其中 3 条 CC0 可放心引字段+高清图,V&A 那条 license=unknown 故只摘原文短语。**海外馆藏对"响堂山"叙事有文字支撑(V&A brief、Met culture 字段),恰好与上博藏品库的"山西"字段构成可呈现的对照。**

---

## 3. 来源 C · 学术论文 / 学者文章 — **1 条有正文,2 条降级**

### 3.1 故宫院刊《东魏北齐响堂石窟与邺城造像比较研究》— **有正文截录**
**chunk**:C · `https://www.dpm.org.cn/Uploads/File/2020/12/29/u5feacd4049fc4.pdf` · 唐仲明/王亚楠 · tier:mid · license:(c)all-rights · curl→pdf · truncated=True

可引正文要点(均在 excerpt 内):
- 论文主旨:比较**响堂石窟**与**北吴庄埋藏坑**两类造像,指出"响堂石窟代表了东魏–北齐统治阶层的佛像信仰;北吴庄造像反映了邺城当地普通僧俗信众的信仰"。
- 地理:"响堂石窟位于河北省邯郸市峰峰矿区……南响堂距离邺城不过三十多公里……在地理空间上可视为邺城文化圈内的造像。"
- 提到"邺城模式"(何利群)、"龙树背龛式"等概念。
→ 这条给本件提供了**响堂山/邺城叙事的学术底座**:它解释了"响堂山系"为什么是个真问题(皇家石窟 vs 民间埋藏坑的等级差),也因此让"上博标山西"的反差更值得追。**原文更长见 raw_path,本处不续写未见内容。**

### 3.2 故宫院刊《故宫藏曲阳白石造像中龙》— **正文乱序,仅作 URL+主题引用**
**chunk**:C · `https://www.dpm.org.cn/Uploads/File/2024/03/06/u65e7e53c3f5ed.pdf` · tier:mid · license:(c)all-rights · curl→pdf

PDF 抽出的文本**字序错乱**(竖排 PDF 抽取错位,见 excerpt 呈竖读乱码),仅能确认主题为"曲阳白石造像 / 龙纹 / 曲阳修德寺窖藏 / 会昌灭佛"。**按硬门不就乱序文本做事实演绎**,仅列为"曲阳白石造像"这一关键产地线索的题名级引用(白石主产区曲阳—河北,与本件'白石'材质相关)。

### 3.3 故宫院刊《河北曲阳修德寺遗址》— **仅 URL + 标题(扫描件,0 字)**
**chunk**:C · `https://www.dpm.org.cn/Uploads/File/2020/05/18/u5ec24b1565d1c.pdf` · **tier:low** · license:(c)all-rights
notes:`0 chars extracted … no extractable text layer (scanned/image PDF) — URL+title citable only`
→ **confidence_tier=low,按硬门只列 URL + 标题,不引正文。** 价值:曲阳修德寺是华北白石造像最重要遗址之一,URL 留给 PM 人工 OCR。

---

## 4. 来源 D · 现场场域 — **1 条有正文,1 条风控占位**

### 4.1 澎湃 2024-03-15《现场︱在上海看一部中国古代雕塑通史》— **有正文截录**
**chunk**:D · `https://www.thepaper.cn/newsDetail_forward_26689360` · tier:mid · license:(c)all-rights · httpx→html · truncated=True

可引正文要点:
- 雕塑馆 2024-03-16 试开放,共展出 289 件/套立体造型文物,约三分之一首次公开。
- 展线五大板块:商周秦汉 / 魏晋南北朝 / 隋唐五代 / 宋辽金大理国 / 元明清;"在展厅中心位置突出了南北朝佛造像的对比展示"。
- excerpt 图注明确出现 **"展览现场 北齐 白石佛像"**——即本件在报道里的现场称呼。
- 上博副馆长陈杰受访谈通史陈列与裸展形式;首次展出"上世纪40年代末从日本追索回国的云冈石窟造像残件"。

**注意**:这条**有正文**,但截到 1500 字处,excerpt 里**没有出现"响堂山 / V&A / 塞努奇 / 日本对照"那段馆方解读**(该段在更早期 sample 的二手摘要里被引用过,但本次抓回的 thepaper 截录里追不到)。**按硬门:本 bundle 不复述"馆方点名 V&A/塞努奇/日本"那句,因为本次到手的 chunk 里截不到。** 它只支撑到"现场称北齐白石佛像 + 南北朝对比展示"。原文更长见 raw_path。

### 4.2 知乎《现场观展记录》— **仅 URL(风控占位页,无内容)**
**chunk**:D · `https://zhuanlan.zhihu.com/p/13821187870` · tier:mid · license:(c)all-rights · status:ok
但 excerpt 是知乎风控 JSON:`{"error":{"message":"您当前请求存在异常,暂时限制本次访问"…}}`。
→ **status=ok 但零有效正文,只列 URL,不引内容。** 典型"ok ≠ 有料"。

---

## 5. 来源 E · 数字人文 / 跨域 OA — **仅 URL(占位页)**

**chunk**:E · `https://archive.org/details/wisdomembodiedch0000metr`(Met 2010 *Wisdom Embodied*,Denise Leidy)· tier:mid · **license:unknown** · status:ok
但 excerpt 是 archive.org 的 Wayback 占位 / 导航文本("108 Previews … No suitable files to display here … Uploaded by station28.cebu"),**没有书的正文**。
→ license=unknown **且** 无有效正文 → **只列 URL + 标题,不引内容。** notes 已标 `likely_gfw_blocked`,国内 IP 基本必墙;这本造像专著的正文留给 PM 在可达环境取。

**E 类其余子类(数字敦煌 / CBETA / 国博邺城展专题 / 芝大响堂山项目)**:本次 night-run 的 verified_chunks 里**没有为本 artifact_id sourced 这些 candidate**。→ 见第 7 节"未到手"诚实记录。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际"抓到有效正文"几类? | **A / B / C / D 四类有正文**(A 馆方字段全 / B 3 条 OA / C 1 篇院刊 / D 1 篇澎湃);**E 仅 URL**。→ **有正文 4 / 5;含 E 占位则 chunk 全 12 条 status=ok** |
| 各 chunk tier + license 速查 | A:mid·(c)all-rights(正文)· B-V&A:mid·**unknown**(只摘原文)· B-Met×2:mid·**CC0** · B-CMA:mid·**CC0** · C-响堂比较:mid·(c)all-rights(正文)· C-曲阳龙:mid·(c)(乱序,题名级)· C-修德寺:**low**·(c)(仅URL)· D-澎湃:mid·(c)(正文)· D-知乎:mid·(c)(占位)· E-archive:mid·**unknown**(占位) |
| 哪些可 100% agent 自动化 | **B 跨馆对照(CC0 字段+高清图)= 完全自动**;**A 馆方藏品库字段(playwright 渲染成功)= 自动**;**C/D PDF/HTML 正文抽取 = 自动但需质检(竖排 PDF 会乱序、扫描件会 0 字)** |
| 必须人在回路 | C-修德寺扫描件 OCR;E-archive.org 正文(需可达环境);D-知乎风控(需登录/真人) |
| 本件完整度自评 | **中-中高**:馆方一手字段拿全是亮点,但"响堂山叙事"在本次 chunk 里只在 V&A/Met 出处字段与故宫院刊里成立,在上博藏品库字段里反而是"山西" |
| 给 PM 的 wow moment(一句话) | **"这件上博挂牌叫'北齐白石佛立像·响堂山系',可它自家藏品库写的产地是『山西·山西省博物院调拨』;而伦敦 V&A 和纽约 Met 的同窗口北齐佛头,出处字段却都写着『probably Xiangtangshan / Southern Xiangtangshan(河北响堂山)』。同一段历史,馆方的字段、媒体的标签、海外馆的著录,三方说法并不一致——AI 把这三层叠在一起给你看,正是你站在展柜前看不到的那层叙事张力。"** |

---

## 7. 反向发现 / 该展品不工作的源(含失败/占位的诚实原因)

- **本件无 fetch_status=failed 的 chunk**——12 条全 status=ok。但"ok"含三种实质失败,如实记录:
  - **D-知乎 p/13821187870**:status=ok 但抓回知乎风控 JSON(`请求存在异常,暂时限制本次访问`),**零有效正文**。
  - **E-archive.org wisdomembodied**:status=ok 但抓回 Wayback 占位页(`No suitable files to display here`),**无书正文**;notes 标 `likely_gfw_blocked`。
  - **C-修德寺 PDF**:status=ok 但 `0 chars extracted — scanned/image PDF`,已 downgrade 到 tier=low,**只可引 URL+标题**。
- **C-曲阳白石造像中龙 PDF**:抽取文本竖排乱序,正文不可直接引用,只能用到题名级("曲阳白石/龙纹/会昌灭佛"主题)。说明 pipeline 的 **PDF 文本层质检**必须在 Verifier 阶段做,不能只看 status。
- **A 类未到手的部分**:馆方**完整馆藏号(V/I/RI)**与**说明牌/策展长文**仍 0 条——CI00159756 只是藏品库条目页,不含策展叙事。
- **B 类共享源**:Met 42704 culture 字段 = "China (Southern Xiangtangshan)",Met 把响堂山写进 culture 而非 provenance,属**跨件共享的响堂山线索**;URL 切题且 fetch ok,已引用并注明。
- **E 类候选未 sourced**:芝大响堂山项目(xts.uchicago.edu)、国博 2019 临漳邺城佛造像展专题、数字敦煌、CBETA——本次 night-run 的 verified_chunks 中**为本 artifact_id 没有这些 candidate(no candidate sourced)**;早期 researcher sample 提过这些 URL,但它们不在本件已验证数据里,**故本 bundle 不引用、不脑补其内容**,留作下一轮 source 列表。

---

**主要来源(本 bundle 实际引用,全部来自 verified_chunks.json · artifact_id=shanghai-white-marble-buddha)**:
- A 上博藏品库:`https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00159756`(石佛像/北齐/144cm/产地山西/山西省博物院调拨)— 有正文
- B V&A O129249:`https://collections.vam.ac.uk/item/O129249/`(Buddha head, probably Xiangtangshan)— license unknown,仅原文短语
- B Met 42704:`https://collectionapi.metmuseum.org/public/collection/v1/objects/42704`(57.176, China Southern Xiangtangshan)— CC0
- B Met 60794:`https://collectionapi.metmuseum.org/public/collection/v1/objects/60794`(2001.422)— CC0
- B CMA 156948:`https://openaccess-api.clevelandart.org/api/artworks/156948`(1993.108, Stele Shakyamuni+Maitreya)— CC0
- C 故宫院刊《东魏北齐响堂石窟与邺城造像比较研究》:`https://www.dpm.org.cn/Uploads/File/2020/12/29/u5feacd4049fc4.pdf` — 有正文
- C 故宫院刊《故宫藏曲阳白石造像中龙》:`https://www.dpm.org.cn/Uploads/File/2024/03/06/u65e7e53c3f5ed.pdf` — 乱序,题名级
- C 故宫院刊《河北曲阳修德寺遗址》:`https://www.dpm.org.cn/Uploads/File/2020/05/18/u5ec24b1565d1c.pdf` — tier low,仅 URL
- D 澎湃《在上海看一部中国古代雕塑通史》:`https://www.thepaper.cn/newsDetail_forward_26689360` — 有正文("北齐 白石佛像"现场图注)
- D 知乎观展记录:`https://zhuanlan.zhihu.com/p/13821187870` — 风控占位,仅 URL
- E archive.org *Wisdom Embodied*:`https://archive.org/details/wisdomembodiedch0000metr` — 占位页,仅 URL

**[ Sample Bundle (night-run AI 装订) · shanghai-white-marble-buddha · 2026-06-07 完 ]**
