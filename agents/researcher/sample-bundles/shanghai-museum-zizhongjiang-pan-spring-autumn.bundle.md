# Sample Bundle · 子仲姜盘 · 上海博物馆(人民广场馆)· 中国古代青铜馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:`data/pipeline/out/verified_chunks.json`(artifact_id=`shanghai-museum-zizhongjiang-pan-spring-autumn`)

> **本件装订纪律**:本件共 4 条 chunk,全部 `fetch_status=ok`、`confidence_tier=mid`。无 failed chunk。
> 类别分布:A×1、B×3、C/D/E 各 0(`sources_candidates.full30.json` 本件下只列了 A×1、B×3,C/D/E **无候选**)。
> license 分布:A 一条 `(c)all-rights`;B 两条 Met 为 `CC0`;B 一条 V&A 为 `license_observed=unknown`。
> **反幻觉硬门执行**:V&A 这条 `license=unknown` → 按纪律**只列 URL + 标题,不引正文**。A 这条馆方 chunk 的 `excerpt_or_metadata` 实为**藏品库入口的 SPA 导航骨架**(分类/年代筛选菜单 + 版权页脚),**不含子仲姜盘单件正文**——本册据此**不为本件写出馆方一手文物描述**,只如实指认"馆方单件页未到手"。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 子仲姜盘 |
| 馆 / 厅 | 上海博物馆(人民广场馆)· 中国古代青铜馆 |
| 朝代 / 公元年范围 | 春秋(早期)——**注:本断代取自 artifact_id 与馆/厅设定,chunk 内未给出独立文物断代正文** |
| 材质 / 尺寸 | 青铜——**chunk 内无本件尺寸/重量数据(馆方单件页未到手)** |
| 已知 accession / 编号 | **未在任何 chunk 中出现** |
| 已知来源 / 出处 | **未在任何 chunk 中出现**(本件无 C/D 源,馆方 A 页只到藏品库入口) |
| 检索关键词 | 子仲姜盘 / 春秋 / 盘 / 盥洗器 / 圆雕水族动物 / 可旋转饰件 / Pan / water basin / Chinese bronze ritual vessel |

**为什么这件值得做(原则 C / D)**:
子仲姜盘的张力恰恰在于"**馆方叙事 vs 本册到手现实**"的落差。子仲姜盘是上博青铜馆的常设明星件,其最著名的卖点是"盘内圆雕水族动物可 360 度旋转"——一个高度奇观化、易被"博物馆=超市"式讲解消费的特征(原则 A 的反面教材)。但本次 night-run 在它身上**只拿到了海外两件普通的"盘(Pan)"档案**,馆方单件页、学术铭文研究、现场叙事一概未到手。这本身就是一条诚实的反向发现:**越是被馆方包装成"网红奇观件"的展品,公开可机读的一手/学术源反而越稀薄**——奇观叙事在媒体上流通,文物档案却锁在 SPA 与微信里。这一落差,本身就是原则 C(叙事与可见性的权力)的工程注脚。

---

## 1. 来源 A · 馆方一手页面

**chunk**:`source_class=A` · `fetch_status=ok` · `fetch_method=playwright->html` · `tier=mid` · `license=(c)all-rights`
**URL**:`https://www.shanghaimuseum.net/mu/frontend/pg/m/collection`
**标题(chunk 自带 source_title)**:上博官网藏品/青铜馆入口(SPA,需 `--js` 取正文)。子仲姜盘为常设明星件,馆方藏品库可检;首页 302 → 入口可达但单件页为 js_html 渲染。**标 museum 端但未拿到固定单件 URL,故整件 verification 靠报道确认。**
**raw_path**:`data/raw/shanghai-museum-zizhongjiang-pan-spring-autumn/A-9e0bd493.html`

**到手内容的诚实定性**:这条 chunk 的 `excerpt_or_metadata` 抓到的是**上博"典藏精选"藏品库的入口页骨架**——一串导航与筛选菜单(分类:青铜/雕塑/钱币/陶瓷……;年代:旧石器时代/新石器时代/夏商周/秦汉……;以及"Copyright © 2015 ShanghaiMuseum.net / 沪 ICP 备 10003390 号-4"页脚)。它**证明了"藏品库入口可达、青铜分类可检"**,但**完全没有子仲姜盘这一单件的任何文物正文**(无形制、无尺寸、无铭文、无出处、无那句"可旋转水族饰件")。

**按纪律的处理**:`license=(c)all-rights` 本不阻止引述,但**这条根本不含本件单件正文**,所以本节**不为子仲姜盘写出任何馆方一手文物描述**——没有 chunk 支撑的内容一律不写。本节仅记录一个事实:**上博藏品库是 SPA,单件页走 `js_html` 二次渲染,本次 playwright 抓取停在了入口层,未深入到子仲姜盘单件页。**

**馆方叙事视角的旁注(原则 C,只就到手事实指认,不脑补)**:子仲姜盘作为"常设明星件"在馆方与媒体叙事里高频出现,但其**机读的、结构化的单件档案在公开 Web 上并不易得**——本次连固定单件 URL 都未锁定(见 source_title 自陈"未拿到固定单件 URL")。这与同馆大克鼎(有独立"每月一珍"长文页)形成对比:**同一座馆内,不同展品的"可发现性"差异极大**,这是叙事可见性背后的一种结构,值得 ADR-006 记录。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本件拿到 **3 条 B 类 chunk,全部 `fetch_status=ok` / `tier=mid`**。其中 **2 条 Met 为 `CC0`**(真·盘,可作直接对照),**1 条 V&A 为 `license=unknown`**(按硬门只列 URL+标题、不引正文,且器型为尊非盘)。

### B-1 · Met 61311 —— "Water basin (Pan)",**真·盘,直接对照件**
**chunk**:`source_class=B` · `ok` · `httpx->json` · **`CC0`** · `tier=mid` · `via_vpn=True`
**URL**:`https://collectionapi.metmuseum.org/public/collection/v1/objects/61311`
**元数据(CC0,可引)**:`title=Water basin (Pan)` · `objectName=Basin` · `accessionNumber=1975.66.2` · `accessionYear=1975` · `culture=China` · `period=Western Zhou (1046–771 BCE)–Eastern Zhou (770–256 BCE)` · `objectDate=ca. 8th–7th century BCE` · `medium=Bronze` · `dimensions=H. 4 9/16 in. (11.6 cm); W. 13 13/16 in. (35.1 cm)` · `creditLine=Purchase, Anonymous Gift, 1975` · `isPublicDomain=true` · `primaryImage=https://images.metmuseum.org/CRDImages/as/original/DP151402.jpg`

**对照价值(最干净的一条)**:这是一件**与子仲姜盘形制/功能直接对位的"盘(Pan)"**——同为青铜**盥洗盘**,断代落在西周晚—东周(约公元前 8–7 世纪),与子仲姜盘所属的春秋窗口相邻。Met 给了完整断代、尺寸、CC0 高清图,可作子仲姜盘"盘是什么器类、什么用途、什么形制区间"的**实物坐标**。这是本件 bundle 唯一真正"对得上"的对照锚点。

### B-2 · Met 61039 —— "Basin (Pan)",东周盘,补"盘制演变"
**chunk**:`source_class=B` · `ok` · `httpx->json` · **`CC0`** · `tier=mid` · `via_vpn=True`
**URL**:`https://collectionapi.metmuseum.org/public/collection/v1/objects/61039`
**元数据(CC0,可引)**:`title=Basin (Pan)` · `objectName=Basin` · `accessionNumber=13.100.4` · `accessionYear=1913` · `culture=China` · `period=late Eastern Zhou dynasty (770–256 BCE)` · `objectDate=6th century BC` · `medium=Bronze` · `dimensions=H. 3 1/4 in. (8.3 cm); Diam. 17 1/4 in. (43.8 cm); W. (with loop handles) 18 1/2 in. (47 cm); Diam. of foot 11 in. (27.9 cm)` · `isPublicDomain=true` · `primaryImage=https://images.metmuseum.org/CRDImages/as/original/DP140804.jpg`

**对照价值**:第二件真·盘,断代更晚(东周/公元前 6 世纪)。与 B-1(西周晚—东周)叠在一起,能拉出一条**"西周晚 → 东周"的盘制时间轴**;子仲姜盘的春秋窗口正好落在这条轴的中段。两件 Met 盘构成"盘器类断代序列"的跨馆实物对照——这是 B 类在本件能提供的最有价值的结构。

### B-3 · V&A O72176 —— ⚠️ `license=unknown` + 器型为"尊"非"盘",**按硬门只列 URL + 标题**
**chunk**:`source_class=B` · `ok` · `playwright->html` · **`license_observed=unknown`** · `tier=mid` · `via_vpn=True`
**URL**:`https://collections.vam.ac.uk/item/O72176/`
**标题**:`Wine vessel`(V&A systemNumber O72176,1050–900 BC,China)

> **反幻觉硬门执行**:此 chunk `license_observed=unknown` → **只列 URL + 标题,不引正文、不引元数据细节**。chunk 内确有页面正文(physical/summary 描述等),但**纪律要求 unknown license 不截录**,故此处一律不引。
> **额外诚实标注(器型错配)**:即便撇开 license,该件 `source_title` 与页面正文显示它是一件**酒器"尊(zun)"**(西周早期),**不是盘**。它只能算"同为中国古代青铜礼器系统"的**器类旁证**,**不能**作为子仲姜盘"盘形制/盥洗功能"的直接对照件。本册不把它当盘用。

**给 PM / ADR-006 的工程笔记(B 类)**:
- 本件 B 类最干净的产出是 **Met 两件真·盘构成"西周晚→东周盘制断代轴"**(B-1 + B-2),且均 CC0、带高清图、带尺寸——这是可以直接进 demo 的素材。
- **采集质量要回写 Builder**:(1) V&A O72176 被当作青铜礼器对照纳入,但实为"尊(酒器)"而非"盘",且 `license=unknown`——B 类海外检索应加**器型(objectName/category)回校** + **license 探测**,unknown 的件不应进对照正文池;(2) Met 的 JSON API(`httpx->json`)是本件唯一拿到完整字段的路径,质量明显优于 V&A 的 `playwright->html`——建议优先走馆方开放 JSON API。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

`sources_candidates.full30.json` 中本件 `artifact_id` 下**没有任何 C 类候选**(只列了 A×1、B×3)。`verified_chunks.json` 中本件也无 C 类 chunk。本节**不引用任何正文**——无 chunk 即不写内容。

> 工程含义(给 ADR-006):子仲姜盘是有明确学术抓手的件——它**带长篇铭文**(子仲姜盘以盘内铭文记夫为妻子仲姜作器著称),铭文释读、春秋媵器/媵妾制度、圆雕可旋转水族饰件的铸造工艺,都是金文与青铜工艺研究的高频题目。本次 night-run **未对本件铺 C 类 discovery**,属覆盖缺口而非"学界冷门"。建议 P0 补 C 类候选(金文数据库铭文释读、春秋媵器专文、上博青铜工艺研究)。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。**

本件 `artifact_id` 下无 D 类候选,`verified_chunks.json` 中亦无 D 类 chunk。本节不引用任何内容。

> **跨件共享源提示(不直接纳入本节,但点名供 PM/后续 discovery 参考)**:同仓库另一件大克鼎的 D 类 chunk —— 人民网《上海博物馆中的"青铜时代"》(`http://www.people.com.cn/24hour/n/2013/1109/c25408-23487661.html`,`fetch_status=ok`)—— 正文里**直接点了子仲姜盘**那句"盘内的圆雕饰物可以 360 度旋转",且把它放进上博青铜馆重器网络里(晋侯稣钟、牺尊、吴王夫差盉等)。
> 该 URL 切题(确实讲到本件)、且在另一件下 `fetch_status=ok`,**按"跨件共享源"规则可引用**;但其 chunk 的 `artifact_id` 标在 `shanghai-museum-da-ke-ding-western-zhou`,**license=`(c)all-rights`**。本册据"不旁证脑补、不近似拼合"的纪律,**仅在此登记其存在与可复用性,不把其正文搬入本件正文**,留给 PM 决定是否在本件下正式建一条 D 类共享源 chunk 再引用。这是一条**现成的、高价值的 D 类回填线索**。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

本件 `artifact_id` 下无 E 类候选,`verified_chunks.json` 中亦无 E 类 chunk。本节不引用任何内容。

> 工程含义:子仲姜盘的"可旋转圆雕水族动物"是**数字人文/三维展示的天然抓手**(动画、3D 模型、互动可视化),铭文也可接金文数据库。这些 E 类都是 P0 可补的,本次属覆盖缺口。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **1.5 / 5**。严格看只有 **B 一类有可引内容**(Met 两件真·盘,CC0)。A 类虽 `ok` 但只抓到藏品库入口骨架、**无本件单件正文**,只能算"半到手"。C / D / E 三类 **0 候选、0 chunk**。 |
| 各 chunk tier + license | A:mid /(c)all-rights(无单件正文);B-1 Met:mid / CC0;B-2 Met:mid / CC0;B-3 V&A:mid / **unknown**(只列 URL+标题)。**无 low、无 failed。** |
| 哪类是"有正文截录" | **无馆方/学术正文截录**。仅 B-1/B-2 有 **CC0 结构化元数据**(断代/尺寸/图)。 |
| 哪类是"仅元数据" | B-1 Met 61311、B-2 Met 61039(完整 CC0 元数据 + 高清图)。 |
| 哪类是"仅 URL + 标题" | A(藏品库入口,无单件正文)、B-3 V&A(license=unknown,且器型为尊非盘)。 |
| 本件完整度自评 | **低-中**。这是三件 night-run 样本里**最稀薄**的一件:海外 OA 拿到两件干净的真·盘对照是亮点,但**馆方一手单件页未深入、C/D/E 整类缺位**,本件几乎没有"本体描述",全靠对照件撑场。 |
| 给 PM 的 wow moment(一句话) | "**你在上博看那只'盘内水族动物能 360 度转'的子仲姜盘,导览只会让你惊叹它好玩;但这件最响的网红展品,在公开网络上连一页机读的文物档案都难拿到——馆方把它的奇观放在媒体里流通,把它的档案锁在 SPA 和微信里。反倒是大洋彼岸的大都会,两件普普通通的青铜'盘'安静地挂着 CC0 高清图和完整断代,谁都能下载。被看见的(奇观)和能被查证的(档案),从来不是同一套东西。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **没有 failed chunk**:本件 4 条 chunk 全部 `fetch_status=ok`,无失败原因可报(无 `failure_reason` 非空的 chunk)。本节的"不工作"指的是**到手内容贫瘠 / 类目缺位**,不是抓取失败。
- **馆方 A 页只到藏品库入口、未到单件页(本件最重要的反向发现)**:`shanghaimuseum.net/mu/frontend/pg/m/collection` 是 SPA,单件页走 `js_html` 二次渲染。本次 playwright 抓取停在入口骨架(导航 + 筛选菜单 + 版权页脚),**没拿到子仲姜盘单件正文,也未锁定固定单件 URL**(见 chunk `source_title` 自陈)。→ 上博单件页抓取必须**先解析 SPA 路由 / 调其内部藏品 API 拿到单件页 URL**,再 `--js` 渲染取正文,否则永远停在入口层。这是 ADR-006 对"上博 anchor metadata"要专门处理的点。
- **B-3 V&A 双重问题**:(1) `license=unknown` → 按硬门不可引正文,只能挂 URL;(2) 器型为**尊(酒器)而非盘**——关键词命中、器型未校验。建议 B 类检索加器型回校 + license 探测,unknown 不进对照池。
- **馆藏号 / 尺寸 / 出处全部未到手**:本件 §0 多个字段留空——**不脑补**。子仲姜盘的尺寸、铭文、出处在馆方与文献中都存在,但**本次 chunk 里一条都没有**,故一律不写。
- **C / D / E 整类缺位**:非"该展品不工作",而是 night-run 未铺这三类 discovery。其中 **D 类有一条现成的高价值回填线索**——大克鼎下的人民网青铜馆长文(`ok`)正文直接讲到子仲姜盘的"360 度旋转"特征,属可复用的跨件共享源(见 §4),P0 应优先把它在本件下正式建为一条 D 类 chunk。
- **"网红奇观件 ≠ 可发现件"这条规律值得 ADR-006 记一笔**:对比同馆大克鼎(有独立"每月一珍"长文页、媒体长文、3 条海外对照),子仲姜盘虽更"出圈",公开机读源反而更薄。**展品的媒体声量与其档案可发现性不成正比**——选品/数据相关性评估(Strategy-Curator)不能用"知名度"近似"可拼装度"。

---

**主要来源(均据本件 verified_chunks,`fetch_status=ok`)**:
- 上博官网藏品库入口(A,(c)all-rights,**无本件单件正文**):`https://www.shanghaimuseum.net/mu/frontend/pg/m/collection`
- Met 61311 Water basin (Pan) 西周晚—东周(B,**CC0**,真·盘直接对照):`https://collectionapi.metmuseum.org/public/collection/v1/objects/61311`
- Met 61039 Basin (Pan) 东周(B,**CC0**,真·盘,补盘制演变):`https://collectionapi.metmuseum.org/public/collection/v1/objects/61039`
- V&A O72176 Wine vessel(B,**license=unknown** + 器型为尊非盘,**仅 URL+标题**):`https://collections.vam.ac.uk/item/O72176/`
- (跨件共享源,未纳入本件正文)人民网《上海博物馆中的"青铜时代"》(标在大克鼎下,`ok`,正文含子仲姜盘):`http://www.people.com.cn/24hour/n/2013/1109/c25408-23487661.html`

**[ Sample Bundle · 子仲姜盘 · night-run 2026-06-07 完 ]**
