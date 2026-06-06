# Sample Bundle · 红山文化 玦形玉龙(俗称玉猪龙) · 震旦博物馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:`data/pipeline/out/verified_chunks.json`(artifact_id=`aurora-hongshan-jue-shaped-pig-dragon`)

> 装订纪律:本 bundle 只引用本件 artifact_id 且 `fetch_status=ok` 的 chunk。每段引用都追得到某条 chunk 的 `excerpt_or_metadata`。本件共 3 条 chunk,全部 `fetch_status=ok`,全部 `confidence_tier=mid`。无 failed chunk。缺 A、C 两类源,已在第 7 节如实交代。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 红山文化 玦形玉龙(俗称"玉猪龙") |
| 馆 / 厅 | 震旦博物馆(Aurora Museum)· 5F 古器物学研究中心展厅 ·"灵光:新石器时代玉器特展"第一部分(动物形玉雕/玉龙)|
| 朝代 / 公元年范围 | 新石器时代 · 红山文化(陈列文本作"距今约 6500—5300";另一处行文作"距今大约五、六千年")|
| 材质 / 尺寸 | 玉 / **尺寸:本件 chunk 未给** |
| 已知 accession / 编号 | **未到手**(震旦官网单件页未落 ok chunk;见第 1、7 节)|
| 已知来源/出处 | 红山文化范围:以牛河梁遗址为中心,北越西拉木伦河入内蒙古,东越医巫闾山入辽河西岸,南延至燕山以南张家口(D 类导读文本)。**本件具体出土地:chunk 未给**——且导读明言"通过科学考古发现的此类器物数量不足 10 件",多数玦形龙为采集、征集 |
| 检索关键词 | 玦形玉龙 / 玉猪龙 / 红山文化 / 灵光特展 / 震旦博物馆 / Hongshan / 兽面纹玉环 / C型玉龙 / 碧玉C形龙 / Cleveland 1953.628 / bovine head amulet |

**为什么这件能承载原则 C/D**:它是一件**到处都是、却几乎没有一件出自科学考古**的器型(导读自承"不足 10 件");同一器型在大陆被纳入"中华第一龙"的国族叙事(国博 E 类侧),在海外被一家美术馆以 CC0 平静地标成"Hongshan, probably"(CMA B 类侧)。馆方叙事、国族叙事、海外学术叙事在同一个器型上各说各话——这正是原则 C(觉察叙事背后的权力结构)与原则 D(读跨馆的知识结构网络)最干净的载体。

---

## 1. 来源 A · 馆方一手页面

**计划源**:震旦博物馆官网"灵光"特展页 `https://www.auroramuseum.cn/zh/temporary-exhibitions/1008`(候选清单 A 类,`fetch_hint=js_html`,Next.js SPA)。

**到手情况**:**A 类源未到手,原因:no ok chunk in verified_chunks(候选为 Next.js SPA,正文需跑 JS 渲染,本次未落 `fetch_status=ok` 的馆方单件/特展正文 chunk)。**

因此:馆方一手页面**无正文可引**,也**无单件 accession / 尺寸 / 说明牌原文**。本件的"馆方叙事"目前只能经由 D 类的澎湃·震旦官方导读间接取得(见第 4 节);该导读虽是馆方授权文本,但**不是**馆方官网一手发布的单件页。

> 工程提示:这正是震旦四件的共性缺口——存在性等级停在 reportage_confirmed,而非 museum_page_confirmed。ADR-006 对震旦类 SPA 馆应单列"需 JS 渲染"通道,否则 A 类一手页对该馆永远落不到 ok chunk。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk**:`source_class=B` · `url=https://clevelandart.org/art/1953.628` · `fetch_status=ok` · **`license_observed=CC0`** · `confidence_tier=mid` · `fetch_method=httpx->html`(via_vpn=True)。**有正文截录(metadata)**。

克利夫兰美术馆(CMA)单件页,逐字到手字段:

- 标题:**"Amulet in the Form of a Seated Figure with Bovine Head"**(护符,作"牛首人身坐姿"造型)
- 年代:**c. 4700–2920 BCE**
- 文化归属(馆方原文):**"Northeast China, Neolithic period, probably Hongshan culture (4700–2920 BCE)"**
- 许可:CC0
- 馆方自带免责声明(原文):*"The information about this object, including provenance, may not be currently accurate."*——并提供"Update or Correct Artwork Information"纠错入口。

**为什么是本件的对照锚点(原则 C/D)**:这是 pilot 指定的红山玉雕跨馆张力锚点。注意三处对照张力,全部追得到 chunk 原文,无脑补:

1. **归属语气的张力**:CMA 用的是 **"probably Hongshan"**,并主动声明"provenance 可能不准、欢迎纠错"——这是海外 OA 馆典型的"留余地"姿态;与第 5 节国博侧把同器型纳入确定性国族叙事(碧玉C形龙/"中华第一龙")形成对照。
2. **命名的张力**:CMA 命名为"牛首坐像护符(bovine head)",而震旦/大陆侧命名为"玦形玉龙/玉猪龙"——同一类器,海外读"牛/兽",大陆读"龙/猪龙"。命名即叙事。
3. **可用性的张力**:海外这件是 **CC0**,可直接拼图、可商用;而本件大陆侧(D、E 两 chunk)均为 `(c)all-rights`。

> 反幻觉边界:本节只断言 chunk 里实有的字段。CMA 这件**是否与震旦本件器型完全同属"玦形玉龙"**,chunk 未做断言——它标的是更宽的"Hongshan, bovine head seated figure"。本 bundle 不替它收窄,仅作"同文化谱系跨馆对照件"。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced**——候选清单(`sources_candidates.full30.json`)对本件只列了 A/B/D/E 四类,**未列任何 C 类(学术论文/学者文章)候选**,verified_chunks 中本件亦无 C 类 chunk。

因此本节**无任何学术正文可引**,不补、不旁证。

> 工程提示:玦形玉龙的"不足 10 件出自科学考古""C型龙未经科学发掘"这类判断,目前只能引自 D 类馆方授权导读(见第 4 节),而**没有独立学术源交叉印证**。这是该件相对上博白石佛(学术覆盖极密)的明显短板——红山玦形龙的学术对照,ADR-006 应单独补 C 类候选(牛河梁报告、考古学报红山专辑等)。

---

## 4. 来源 D · 现场场域

**chunk**:`source_class=D` · `url=https://www.thepaper.cn/newsDetail_forward_31595817` · `fetch_status=ok` · `license_observed=(c)all-rights` · `confidence_tier=mid` · `excerpt_truncated=True`(原文更长,见 `raw_path: data/raw/aurora-hongshan-jue-shaped-pig-dragon/D-72c62b15.html`)。**有正文截录**,但**许可为全保留**,引用按"馆方授权导读、转述+短引"处理,不整段照搬商用。

澎湃号·震旦博物馆官方《"灵光:新石器时代玉器特展"专题导读(一)——红山文化》。这是**本件存在于该展的现场实据**,且自带馆方学术叙事。到手要点(均可追到 chunk 原文):

- **展览事实**:震旦博物馆 2025-05-16 起,5F 古器物学研究中心展厅,"灵光"特展,展出两百余件玉器,覆盖红山、良渚、龙山、齐家"四大文化谱系"。
- **本件在展位置**:导读"第一部分"主打红山动物形玉雕代表——玉龙,**逐件点名**玦形玉龙、C型玉龙、兽面纹玉环。
- **馆方对本件的叙事**(玦形玉龙条,原文转述):"俗称'玉猪龙',是红山文化时期带有标志性意义的一类玉器……**通过科学考古发现的此类器物数量不足 10 件**,很多为采集、征集";并给出器型演变判断——"兽首占身体比例逐渐缩小,头部纹饰从简单走向复杂,形态从首尾连接逐渐转变为首尾分离"。
- **馆方自带的器型网络**(原则 D 直接命中):导读把玦形玉龙→C型玉龙→兽面纹玉环→"丫"形兽面玉饰串成**一条"角度取像"的变体谱系**——"兽面纹玉环也是'玉龙'的一种变体……是玉工将带有信仰意义的'图腾'应用在不同造型上的产物"。这是馆方主动给出的跨器联结,bundle 不需要外部脑补即可呈现一张红山玉龙变体网。

**叙事张力(原则 C)**:馆方导读在 C型玉龙条里写——"具有'中华第一龙'美誉的'碧玉C形龙'……现收藏于中国国家博物馆""学界大多认为这种'C'型玉龙是玦形玉龙发展到晚期的一种变体"。即:**馆方一边复述'中华第一龙'的国族称号,一边用'学界大多认为……晚期变体'的措辞与之保持学术距离**。这一句里"国族叙事 vs 学术定位"的张力,是本件 surface 给用户的核心观察点——而且它就写在馆方自己的文本里,不是我们外加的。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**chunk**:`source_class=E` · `url=https://www.chnmuseum.cn/zp/zpml/csp/yq/` · `fetch_status=ok` · `license_observed=(c)all-rights` · `confidence_tier=mid`。**到手内容为页面导航结构(列表/筛选项),非本件单件正文**——按反幻觉门,此处**只列结构性元数据,不引器物正文**。

中国国家博物馆"藏品分类 > 玉器"专题页。本次到手的 `excerpt_or_metadata` 是该专题的**导航骨架**:年代筛选(旧石器…新石器…)、质地筛选(玉质…)、品类筛选,以及一串玉器条目名(神面形玉佩、兽面纹饰件、龙形觿、龙纹玦……)。

**诚实区分**:候选清单设此源的本意,是取国博侧"碧玉C形龙"的国族叙事页,用于和馆方/学术对"第一龙"定位作对照。但**本次 chunk 只抓到了专题页的列表/筛选层,没有抓到'碧玉C形龙'单件正文**。因此:

- 第 4 节里"碧玉C形龙=中华第一龙、藏于国博"的说法,**目前只有 D 类(澎湃导读)一个出处**,E 类国博页**未能提供独立印证正文**。
- 本节不替国博页补写任何器物描述。只能记录:国博玉器专题页可达(`fetch_status=ok`),但**对本件叙事的实际增量=仅站点结构,接近 0**。

> 工程提示:E 类此 URL 是"专题入口页"而非"碧玉C形龙单件页"。要兑现"国博国族叙事侧"的对照价值,ADR-006 需把候选 URL 收窄到单件页,否则只能抓到一棵导航树。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 有 ok chunk**(B、D、E);其中**真正有可引正文的=2 类(B 单件 metadata + D 馆方导读正文)**,E 仅到手导航结构。A、C **两类零 chunk**。 |
| 各 chunk 的 tier + license | B:`mid` / **CC0**(唯一开放许可,可拼图)· D:`mid` / `(c)all-rights`(馆方授权导读,转述+短引)· E:`mid` / `(c)all-rights`(仅结构,不引正文) |
| 有正文截录 / 仅元数据 / 仅 URL | **有正文截录**:D(馆方导读,`excerpt_truncated=True`)· **仅元数据/单件字段**:B(CMA 标题/年代/文化/CC0)· **仅结构(等同仅 URL 价值)**:E(国博导航树) |
| 本件 bundle 完整度自评 | **中**。强在 D 馆方导读自带器型谱系+国族/学术张力,且 B 是干净 CC0 锚点;弱在 A(馆方一手页)、C(学术)双缺,E 名不副实,**全件 3 条 chunk 全 `mid` tier、无 `high`**,且无任何尺寸/编号。 |
| 给 PM 的 wow moment(一句话) | "同一类红山玉龙,克利夫兰把它叫'牛首坐像'、标 CC0、还主动说'我们也可能搞错';国博把它的同族叫'中华第一龙';而震旦的官方导读在同一段里既复述'第一龙'这个称号、又用'学界大多认为……晚期变体'跟它保持距离——三家馆对同一个器型说了三种话,这三种话之间的缝,就是这件玉龙真正值得看的地方。" |

---

## 7. 反向发现 / 该展品不工作的源

- **A 类(震旦官网一手页)未到手** —— 原因:候选 `auroramuseum.cn/.../1008` 为 Next.js SPA,正文需 JS 渲染,本次 night-run 未产出 `fetch_status=ok` 的馆方单件/特展正文 chunk。后果:**无 accession、无尺寸、无说明牌原文**;本件"馆方叙事"全部经 D 类导读间接取得,存在性等级停在 reportage_confirmed。
- **C 类(学术论文)未到手** —— 原因:**no candidate sourced**,候选清单对本件根本未列 C 类源。后果:"科学考古不足 10 件""C型龙未经发掘""玦形龙晚期变体"等关键判断**无独立学术交叉印证**,目前单靠 D 类馆方导读一个出处。
- **E 类名实不符** —— 国博玉器专题页 `fetch_status=ok` 但只抓到导航/筛选骨架,**没抓到'碧玉C形龙'单件正文**;其计划中的"国族叙事对照"价值本次**未兑现**(增量≈仅站点结构)。
- **本件无 `fetch_status=failed` 的 chunk** —— 3 条全部 ok,故无失败原因可列;真正的"不工作"在于**缺类(A/C)与抓错粒度(E 抓到入口页而非单件页)**,而非抓取失败。
- **无尺寸 / 无编号 / 无出土地** —— 三条 ok chunk 里都没有本件的物理尺寸、馆藏号或具体出土地点。D 类只给红山文化的宏观分布范围,不给本件出处;按反幻觉门,**留白,不补**。
- **跨件共享源**:本次本件未引用任何标在别件 artifact_id 上的共享源(如响堂山 PDF 等);若后续要为玦形玉龙补 C 类,牛河梁/红山考古报告类共享源可在切题且 ok 时按"跨件共享源"引入。

---

**本件已引用的 chunk(全部 `fetch_status=ok`)**:
- B · CMA `https://clevelandart.org/art/1953.628`(CC0,mid)
- D · 澎湃·震旦官方导读 `https://www.thepaper.cn/newsDetail_forward_31595817`(`(c)all-rights`,mid;`raw_path: data/raw/aurora-hongshan-jue-shaped-pig-dragon/D-72c62b15.html`)
- E · 国博玉器专题 `https://www.chnmuseum.cn/zp/zpml/csp/yq/`(`(c)all-rights`,mid;仅结构)

**[ Sample Bundle · aurora-hongshan-jue-shaped-pig-dragon · night-run 2026-06-07 完 ]**
