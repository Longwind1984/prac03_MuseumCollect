# Sample Bundle · 大克鼎 · 上海博物馆(人民广场馆)· 中国古代青铜馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:`data/pipeline/out/verified_chunks.json`(artifact_id=`shanghai-museum-da-ke-ding-western-zhou`)

> **本件装订纪律**:全部 5 条 chunk 均 `fetch_status=ok`、`confidence_tier=mid`。无 failed chunk。
> A、D 两条 `license_observed=(c)all-rights`(版权受限,但非 unknown、非 low tier)——正文以**有出处的引述**形式截录,并逐条标版权受限。B 三条 `CC0`。
> 反幻觉提示:A、D 原始 chunk 的 `excerpt_or_metadata` 在 json 内是乱码(上博/人民网为 GBK/GB2312 编码,采集时解码错位),本册正文据**同一条 chunk 的 `raw_path` 原文件按 GBK 重新解码**取得,未续写 chunk 之外内容。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 大克鼎(膳夫克鼎) |
| 馆 / 厅 | 上海博物馆(人民广场馆)· 中国古代青铜馆 · 一楼青铜陈列室 |
| 朝代 / 公元年范围 | 西周(孝王,公元前 10 世纪末);上博官页定为"西周孝王" |
| 材质 / 尺寸 | 青铜;通高 93.1 cm,口径 75.6 cm,重 201.5 kg(据上博官方"每月一珍"页) |
| 已知 accession / 编号 | **未在任何 chunk 中出现**(上博 chunk 未暴露馆藏号) |
| 已知来源 / 出处 | 光绪中期 陕西省扶风县法门镇任村出土;膳夫克家族窖藏(同出仲义父器、仲姞器等,共百二十余件);潘祖荫旧藏 → 潘达于 1951 捐献 → 1952 入藏上博 |
| 检索关键词 | 大克鼎 / 膳夫克 / 潘达于 / 潘祖荫 / 海内三宝 / 波曲纹 / 蹄足 / 西周册命 / 周原 / 扶风 / Da Ke Ding / Western Zhou bronze ding |

**为什么这件值得做(原则 C / D)**:
大克鼎的核心不是"一口大鼎",而是**铭文本身就是一份西周王权再分配的权力文本**——周王册命一个"膳夫"(管饭食的官)世袭祖职、赏赐土地与奴隶,克铸鼎记功(原则 C)。馆方官页把叙事重心放在"国之重器 / 镇馆之宝 / 海内三宝 / 爱国捐献"上;而铭文里那套"世卿世禄—天子重新册命—显示王权威严"的等级制度,恰好是可以和海外馆**冷处理**的器物档案形成张力的(原则 C/D)。这件是少数"馆方一手叙事极厚 + 海外有真实跨馆同类器"的青铜件。

---

## 1. 来源 A · 馆方一手页面

**chunk**:`source_class=A` · `fetch_status=ok` · `fetch_method=httpx->html` · `tier=mid` · `license=(c)all-rights`(版权受限,但有正文截录)
**URL**:`https://www.shanghaimuseum.net/resource/museum_files/show_files/20151104094055028/index.html`
**标题**:上博官方"每月一珍"大克鼎专题页
**raw_path**:`data/raw/shanghai-museum-da-ke-ding-western-zhou/A-32fcc8af.html`(原文远长于本截录,含图注与延伸阅读)

这是本件最硬的一条——馆方第一手长文,密度极高。**有正文截录(版权受限,引述自馆页)**:

- **定位 / 形制**:"西周孝王(公元前 10 世纪末)…高 93.1 厘米,口径 75.6 厘米,重 201.5 千克…光绪中期陕西省扶风县法门镇任村出土。"鼎"口沿微敛,方唇宽沿,腹略鼓而呈下垂之势…大立耳,蹄足,形制厚重",是"西周中期圆鼎的典型式样"。
- **纹饰(可与来源 B 对照的关键)**:颈部"三组变形兽面纹,间隔以六道棱脊";鼎腹"宽大的波曲纹"(旧称环带纹);馆方明确说"波曲纹的出现打破了兽面纹的对称规律…是西周时期审美观念的一大变化"。
- **铭文 / 权力文本(原则 C 直接命中)**:内壁铸铭"28 行…共计 290 字";内容"第一段是克赞扬其祖师华父…第二段则详细记载了周王册命克的仪式以及赏赐的内容…并赏赐以礼服、土地和奴隶"。馆方自己点出制度层:"西周时期的职官授受,采用的是世卿世禄的世袭制…贵族的官职虽出于世袭,但必须经过天子郑重的重新册命,以显示王权的威严。"
- **流传史(馆方叙事重心)**:出土于"陕西省扶风县法门镇任村,为一任姓村民挖土时偶得",同出窖藏"共计百二十余件";潘祖荫旧藏 → 1937 潘达于埋入庭院"安然躲过了日军先后 7 次的搜查" → "1951 年 10 月 9 日,双鼎落户上海" → 1952 入藏上博。

**馆方叙事的视角(原则 C 旁注,不脑补、只就 chunk 内文字指认)**:这条 chunk 里,馆方把大克鼎放进"晚清海内青铜器三宝""镇馆之宝""爱国捐献"的叙事框架(全文以"百世流芳"收尾)。铭文那段"赏赐土地和奴隶""世卿世禄"的等级制度,馆方虽**有写出**,但落点是"研究西周奴隶制的重要史料",叙事主线仍是器物贵重与捐献情怀——这正是后续节次值得用海外档案去对照的张力点。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本件拿到 **3 条海外 OA chunk,全部 `fetch_status=ok` / `CC0` / `tier=mid`**。但这里有一处**必须诚实指出的错配**,见下。

### B-1 · Met 42172 —— ⚠️ 是"爵",不是"鼎"
**chunk**:`source_class=B` · `ok` · `httpx->json` · `CC0`
**URL**:`https://collectionapi.metmuseum.org/public/collection/v1/objects/42172`
**元数据(CC0,可引)**:`title=Ritual Wine Vessel (Jue)` · `objectName=Wine vessel` · `accessionNumber=24.72.9` · `period=Western Zhou dynasty (1046–771 BCE)` · `objectDate=late 11th century BCE` · `medium=Bronze` · `dimensions=H. 25.1 cm` · `creditLine=Munsey Fund, 1931` · `isPublicDomain=true` · `objectURL=https://www.metmuseum.org/art/collection/search/42172`

> **诚实标注**:这条是西周青铜**爵(酒器)**,**不是鼎**。它能做的对照只是"同朝代(西周)、同材质(青铜)、同礼器系统"的**器类旁证**,**不能**作为大克鼎"鼎形制/蹄足/兽面纹"的直接对照件。discovery 阶段是用 `q=Chinese bronze ritual vessel ding` 检索 Met 返回的真实 ID,但返回项落到了爵——属"关键词命中、器型错配"。本册不把它当鼎用。

### B-2 · CMA 2003.2 —— 西周鼎(Ding),形制可对照
**chunk**:`source_class=B` · `ok` · `httpx->html` · `CC0`
**URL**:`https://clevelandart.org/art/2003.2`(CMA id 162576)
**到手正文(极薄,仅页面骨架)**:"`Tripod (Ding)` / `1000s BCE` / `China, Western Zhou dynasty (c. 1046–771 BCE)`"。
**对照价值**:**同为西周的鼎(Ding)**,与大克鼎构成"西周鼎制"同窗口对照。但 chunk 只抓到标题+断代,**无出处、无尺寸、无纹饰描述**(CMA 这条 HTML 抓取只落了页面框架,正文为空),所以只能做"器型/断代"层级的对照,不能做纹饰细比。

### B-3 · CMA 1960.288 —— 商末鼎,做"鼎制演变"对照
**chunk**:`source_class=B` · `ok` · `httpx->html` · `CC0`
**URL**:`https://clevelandart.org/art/1960.288`(CMA id 136423)
**到手正文(同样极薄)**:"`Tripod Cauldron (Ding)` / `1200–1100 BCE` / `China, Shang dynasty (c. 1600–c. 1046 BCE)`"。
**对照价值**:**商代鼎**,与西周晚期大克鼎正好拉出一条"商末 → 西周"的**鼎制演变轴**——这对应来源 A 馆页里那句"鼎…一直作为商周青铜礼器中的主要器类…即便在以酒器组合为主的商代也有较大量的铸造和使用"。馆页讲演变史是"文字论述",CMA 两件是"实物坐标",二者可互证。同样**仅标题+断代**,无更深正文。

**给 PM / ADR-006 的工程笔记(B 类)**:
- 本件 B 类最干净的产出是 **CMA 两件鼎构成"商→周鼎制演变"对照轴**——这恰好能把馆方 A 文里的"演变史叙述"落成可视的跨馆实物序列。
- **但 B 类有一处采集质量问题要回写 Builder**:(1) Met `q=...ding` 返回的是爵,关键词检索未做器型校验;(2) CMA 两条 HTML 只抓到页面骨架,丢了 provenance/dimensions——`clevelandart.org/art/<acc>` 这种应改走 **CMA Open Access JSON API**(`openaccess-api.clevelandart.org/api/artworks/?...`)而非 HTML 抓取,才能拿到完整字段。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

`sources_candidates.full30.json` 中本件 `artifact_id` 下**没有任何 C 类候选**(只列了 A×1、B×3、D×1)。`verified_chunks.json` 中本件也无 C 类 chunk。本节**不引用任何正文**——按纪律,无 chunk 即不写内容。

> 工程含义(给 ADR-006):大克鼎是金文/西周册命制度研究的超高频对象,学术 OA 理应极密(铭文释读、潘氏旧藏考、出土年份的光绪十五/十六年之争等)。本次 night-run **未对本件铺 C 类 discovery**,这是覆盖缺口而非"学界冷门"。建议 P0 补 C 类候选(如金文数据库、铭文释读论文、潘达于捐献史专文)。

---

## 4. 来源 D · 现场场域

**chunk**:`source_class=D` · `fetch_status=ok` · `httpx->html` · `tier=mid` · `license=(c)all-rights`(版权受限,有正文截录)
**URL**:`http://www.people.com.cn/24hour/n/2013/1109/c25408-23487661.html`
**标题**:人民网《上海博物馆中的"青铜时代"》(来源:新民晚报,2013-11-09)
**raw_path**:`data/raw/shanghai-museum-da-ke-ding-western-zhou/D-51cddc0b.html`

这是一篇把大克鼎放进**上博整座青铜馆陈列体系**里讲的媒体长文。**有正文截录(版权受限,引述自报道)**:

- **建筑—镇馆之宝的互文**:"上海博物馆远远看去,形似一只青铜巨鼎。这只青铜巨鼎的造型就来源于上博的镇馆之宝——西周青铜重器大克鼎"——这条把"上博建筑外形 ← 大克鼎"的关系点出来了,是现场叙事里很好用的一句(馆 A 文未提)。
- **大克鼎复述**:"通高 93 厘米,口沿下饰兽面纹三组,器腹则是宽阔的波曲纹…内壁铸有铭文 290 字,详细记述周王对克官职的任命,并赏赐其财物和奴隶"——与来源 A 数字一致,可作交叉印证(独立媒体源复述,数据吻合)。
- **跨件网络(原则 D,把大克鼎放进上博青铜叙事网)**:同文还串了上博青铜馆其余重器——晋侯稣钟"完整的应该有 16 枚…上海博物馆收藏了其中的 14 枚",由马承源在香港古玩市场识真购回,"另两枚钟…现陈列于山西博物院";子仲姜盘"盘内的圆雕饰物可以 360 度旋转";牺尊、吴王夫差盉、西汉透光铜镜等。**这正是"跨展品/同馆网络"的一手叙事素材**(原则 D),且其中"晋侯稣钟 14+2 分藏沪/晋"与本仓库另一件 `shanghai-museum-jinhou-su-bells` 直接呼应。

**诚实区分**:这是 2013 年媒体报道,非馆方一手、非现场说明牌;`(c)all-rights`。它的价值是"现场氛围 + 跨件网络叙事",不是文物档案权威源。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

本件 `artifact_id` 下无 E 类候选,`verified_chunks.json` 中亦无 E 类 chunk。本节不引用任何内容。

> 工程含义:大克鼎有明显的数字人文抓手未被 night-run 覆盖——铭文 290 字可接 **CBETA 之外的金文/甲骨金文数据库**、潘氏捐献可接地方文献、"周原—扶风"可接考古 GIS。这些都是 P0 可补的 E 类,本次属覆盖缺口。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 到手**(A 馆方一手长文有正文;B 海外 OA 三件有元数据;D 媒体长文有正文)。**C、E 两类 0 候选、0 chunk。** |
| 各 chunk tier + license | A:mid /(c)all-rights;B×3:mid / CC0;D:mid /(c)all-rights。**无 low、无 unknown、无 failed。** |
| 哪类是"有正文截录" | A(馆页全文,需 raw 重解码)、B-2/B-3 CMA(仅标题+断代,极薄)、D(报道全文)。 |
| 哪类是"仅元数据" | B-1 Met(完整 CC0 元数据,但器型错配,见 §2)。 |
| 哪类是"仅 URL" | 无(本件 5 条全部 ok 且有内容)。 |
| 本件完整度自评 | **中-中高**。馆方一手极厚(A)、媒体网络叙事好(D)是亮点;但海外对照含一处器型错配(B-1)、CMA 两件正文过薄、C/E 整类缺位。 |
| 给 PM 的 wow moment(一句话) | "**上博这栋楼本身就是照着大克鼎的样子盖的;而克鼎那 290 字铭文,讲的是周王把一个'管饭的膳夫'册命成世袭贵族、连土地带奴隶一起赏下去——你以为在看一口国宝大鼎,其实站在一份三千年前的'王权任命状'前面。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **没有 failed chunk**:本件 5 条 chunk 全部 `fetch_status=ok`,无失败原因可报。
- **B-1 Met 42172 器型错配(最重要的一条反向发现)**:discovery 用 `q=Chinese bronze ritual vessel ding` 检索 Met,返回真实 ID 42172,但该件实为**爵(Jue, wine vessel)而非鼎**。关键词命中、器型未校验 → 它不能当鼎的对照件。建议给 B 类检索加 `objectName`/`classification` 的器型回校。
- **CMA 两件正文过薄**:`clevelandart.org/art/2003.2`、`/1960.288` 用 HTML 抓取只落到页面骨架(标题+断代),provenance/尺寸/纹饰全失。应改走 CMA Open Access JSON API。
- **馆藏号未到手**:上博 A 页 chunk 全文未暴露大克鼎馆藏编号,本册 §0 该字段留空——不脑补。
- **C / E 整类缺位**:非"该展品不工作",而是 night-run 未铺这两类 discovery。大克鼎在金文学术/数字人文上理应极密,属覆盖缺口,P0 应补。
- **A、D 编码坑**:上博(GBK)、人民网(GB2312)抓取后,`verified_chunks.json` 里的 `excerpt_or_metadata` 是乱码;正文须回到 `raw_path` 按 GBK 重新解码才能用。建议 Builder 在采集环节统一探测 `charset` 并转 UTF-8 落库,否则下游(包括本 Compiler)每次都要回 raw 重解。

---

**主要来源(均据本件 verified_chunks,fetch_status=ok)**:
- 上博"每月一珍"大克鼎页(A,(c)all-rights):`https://www.shanghaimuseum.net/resource/museum_files/show_files/20151104094055028/index.html`
- Met 42172 Ritual Wine Vessel (Jue)(B,CC0,⚠️器型错配):`https://collectionapi.metmuseum.org/public/collection/v1/objects/42172`
- CMA 2003.2 Tripod (Ding) 西周(B,CC0):`https://clevelandart.org/art/2003.2`
- CMA 1960.288 Tripod Cauldron (Ding) 商(B,CC0):`https://clevelandart.org/art/1960.288`
- 人民网《上海博物馆中的"青铜时代"》(D,(c)all-rights):`http://www.people.com.cn/24hour/n/2013/1109/c25408-23487661.html`

**[ Sample Bundle · 大克鼎 · night-run 2026-06-07 完 ]**
