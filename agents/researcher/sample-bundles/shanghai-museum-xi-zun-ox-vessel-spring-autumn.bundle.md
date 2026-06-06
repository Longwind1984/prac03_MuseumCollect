# Sample Bundle · 牺尊(春秋牺尊) · 上海博物馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-museum-xi-zun-ox-vessel-spring-autumn)

> 装订纪律:本 bundle 只引用本件 artifact_id 且 fetch_status=ok 的 chunk。每段正文都能追到某条 chunk 的 excerpt_or_metadata。license=unknown 或 tier=low 的 chunk 只列 URL+标题,不引正文。缺类源显式声明。**没有到手的内容一律不补、不脑补、不近似拼合。**
> 本件共 4 条 chunk,全部 fetch_status=ok,无 failed chunk。分布:B 类 2 条(Met / CMA),D 类 2 条(澎湃 / 新浪)。A / C / E 类**无 candidate,未到手**。

---

## 0. 展品识别

| 字段 | 内容 | 出处 |
|---|---|---|
| 名称 | 牺尊(春秋牺尊) | candidates `artifact_name_zh`;exhibit-list 第 4 件 |
| 馆 / 厅 | 上海博物馆 · 中国古代青铜馆 | exhibit-list 第 4 件(本件 chunk 内无馆方一手页面,馆-厅来自项目台账,非 chunk) |
| 朝代 | 春秋晚期 | D-澎湃 chunk(`牺尊 春秋晚期`);D-新浪 chunk(`春秋牺尊为春秋晚期的青铜器`) |
| 材质 / 形制 | 青铜,作水牛形,集盛酒/温酒于一体 | D-新浪 chunk(`作水牛形,牛腹中空…可能是一件温酒器`) |
| 尺寸 | 高 33.7 cm,长 58.7 cm,重 10.76 kg | D-新浪 chunk(原文数字) |
| 已知 accession / 编号 | **未到手**(无馆方一手页面 chunk;本件 4 条 chunk 均无上博馆藏号) | — |
| 已知来源/出处 | 1923 年山西浑源县李峪村窖藏出土;留国内最大部分藏上海博物馆 | D-澎湃 chunk + D-新浪 chunk |
| 检索关键词 | 牺尊 / 浑源彝器 / 李峪青铜器 / 浑源李峪村 / Wine vessel Zun / bronze animal zun | 来自各 chunk source_title 与正文 |

**这件为什么值得装(原则 C/D 视角)**:
本件是 ADR-006 里**"跨馆流散件聚合 + 馆方叙事 vs 海外学术张力"双命题的天然标本**。1923 年浑源李峪村一坑窖藏,出土即"散佚海外 / 漂泊他乡",留国内最大部分在上博——这正是原则 C(叙事背后的聚散权力)与原则 D(跨馆知识网络)要 surface 的对象。下面的张力在 chunk 层面真实存在:**国内称"浑源彝器",国外称"李峪青铜器"**(D-澎湃明文),而海外馆(Met / CMA)把同类兽形/尊形酒器编入自己的叙事框架(`Wine vessel (Zun)`、`A Cleveland Bestiary` 兽形主题展)。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced(本件 4 条 chunk 中无 source_class=A,候选清单也未给本件 A 类固定 URL)。**

旁证(非 chunk,仅工程台账):exhibit-list 已记录上博官网藏品库为大陆 SPA(js_html),牺尊"未能锁定可curl的固定单件URL,整件 verification_status 降为 reportage_confirmed"。**因此本 bundle 无任何馆方一手正文,馆藏号、官方说明牌文字、策展声明全部 = 0 条。** 这是诚实缺口,不补。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

本类 2 条 chunk,均 fetch_status=ok、license=CC0、tier=mid → **可引正文 / 元数据**。

### 2.1 Met objectID 61323 · Wine vessel (Zun)
- chunk:source_class=B,fetch_status=ok,**license=CC0,tier=mid**(可引)
- URL:`https://collectionapi.metmuseum.org/public/collection/v1/objects/61323`
- 元数据(摘自 chunk excerpt,JSON 真实字段):
  - `title`: "Wine vessel ( Zun)";`objectName`: "Wine vessel"
  - `period`: "Shang (ca. 1600–1046 BCE)–Western Zhou (1046–771 BCE)";`objectDate`: "13th–10th century BCE"
  - `medium`: "Bronze";`dimensions`: "H. 9 5/8 in. (24.4 cm); Diam. 7 11/16 in. (19.5 cm)"
  - `accessionNumber`: "1985.214.6";`creditLine`: "Gift of Ernest Erickson Foundation, 1985"
  - `isPublicDomain`: true(CC0);`primaryImage` 可下载
- **对照定位(诚实)**:这是一件**商—西周尊形酒器**,**不是**春秋牺尊本件,也非浑源同坑。它进 bundle 的角色是"尊(Zun)这一礼器类目的海外 CC0 锚点 + 可用高清图",用于解释"尊"作为酒礼器的类型,**不可声称与本件同期或同源**。

### 2.2 CMA 1951.151 · Wine Vessel (Zun)
- chunk:source_class=B,fetch_status=ok,**license=CC0,tier=mid**(可引)
- URL:`https://clevelandart.org/art/1951.151`
- 正文(摘自 chunk excerpt,馆方页面文字):
  > "Wine Vessel (Zun) / c. 1000 BCE / China, Western Zhou dynasty (c. 1046–771 BCE)"
  > 页面附"Visually Similar by AI"与勘误声明:"The information about this object, including provenance, may not be currently accurate."
- source_title 注:CMA id 128157,现陈 241A Arts of Ancient China,曾入 **"A Cleveland Bestiary" 兽形主题展**。
- **对照定位(诚实)**:同为西周"尊"形酒器(约公元前 1000),**非春秋、非浑源同坑**。它的价值在于 chunk 注明它曾被馆方编入**兽形/动物造型主题展**——这与本件"牛形酒器"在叙事母题上贴切,可作"海外馆如何把动物造型酒器主题化"的对照样本。CMA 自己也声明 provenance 可能不准,**这一层不确定性应原样转述,不替它补全**。

**B 类小结**:海外到手 2 件,均 CC0 可商用、附高清图。但**两件都是商—西周尊,与本件春秋牺尊不同期、不同坑**。它们撑得起"尊/兽形酒器类型对照",撑不起"同窟流散件虚拟拼合"——本件的"流散聚合"叙事**主要靠 D 类的中文长文(浑源彝器),不靠 B 类**。这点必须对 PM 说清,避免误以为 B 类已交付聚合图。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced(本件无 source_class=C 的 chunk,候选清单未给本件学术 PDF / 学者文章直链)。**

注:D-澎湃 chunk 正文中**转引了**上博研究员周亚、商承祚《浑源彝器图》(1936)、大同市博物馆策展人刘思祺/李思祺的观点——但这些是**媒体长文里的二手转述**,不是独立到手的 C 类学术源。本 bundle 不把它们升格为 C 类,只在第 4 节作为 D 类正文如实呈现。**真正的学术一手(论文 PDF / 学者专著)= 0 条。**

---

## 4. 来源 D · 现场场域 / 媒体长文

本类 2 条 chunk,均 fetch_status=ok。**license=(c)all-rights,tier=mid** → 非 unknown、非 low,可引正文,但因 all-rights **限于短引并注明出处**,不整段搬运。

### 4.1 澎湃《诗中吉金 其华灼灼——浑源彝器回乡暨〈诗经〉中的青铜器特展》
- chunk:source_class=D,fetch_status=ok,**license=(c)all-rights,tier=mid**
- URL:`https://m.thepaper.cn/newsDetail_forward_2772807`
- 这是本件**原则 C/D 的核心长文**。chunk 正文可追溯的关键事实(短引 + 转述):
  - 上博与大同市博物馆合办青铜大展,上博"浑源彝器"几乎倾囊赴大同展出,**含浑源李峪村出土的牺尊**;系"国内藏最大部分浑源彝器出土 95 年后首次重回出土地展出"。
  - **流散叙事(原则 C 直接命中)**:浑源彝器 1923 年李峪村出土,村民高凤章偶然发现引发哄抢私藏;逢战乱、文保意识淡薄,"部分青铜器或散佚海外,或漂泊他乡";解放前夕文物商贩欲偷运出国,**当时上海市博物馆获知后即派专员赴海关配合查扣**,部分得以留国内,最大部分现藏上博。
  - **馆方叙事 vs 海外学术的命名张力(原则 C 教科书级例子)**:据上博研究员周亚,"国内学者习惯称为浑源彝器,**国外学者普遍称为李峪青铜器**";商承祚 1936《浑源彝器图》收录这批器物。
  - **风格判断**:周亚指浑源含至少三种风格(晋式 / 燕式 / 北方少数民族),"研究这批青铜器等于…对这个地区的文化融合做一个研究";策展人补充李峪青铜器写实+浮雕结合、块范+印模法、华丽纹饰与素面强反差。
- **装订判断**:这条 chunk 是整件 bundle 的叙事支柱,因为它**自带"权力—聚散—命名"三重张力**,正中原则 C/D。但它是 all-rights 媒体稿,**只短引、标注出处,不整段复制**。

### 4.2 新浪收藏《上海博物馆藏春秋牺尊(图)》(转大洋网-广州日报)
- chunk:source_class=D,fetch_status=ok,**license=(c)all-rights,tier=mid**
- URL:`http://collection.sina.com.cn/tqfx/20120312/175959352.shtml`
- 注:本 chunk 的 excerpt_or_metadata 在 JSON 里为 GBK→UTF-8 乱码(mojibake);raw_path `data/raw/.../D-801f6b71.html` 用 gb18030 解码后为同一篇可读正文,以下短引据该 ok 原文,**未续写 chunk 外内容**。
- 可追溯的形制/出土事实(短引 + 转述):
  - **形制与尺寸**:"作水牛形,牛腹中空,牛颈和背脊上有三个孔,中间一孔套有一个锅形器,可以取出";推断为温酒器(锅形器盛酒、空穴注水于牛腹温酒);**高 33.7 cm、长 58.7 cm、重 10.76 kg**;上博称其"集盛酒、温酒为一体,为目前发现的青铜器中唯一的一件"。
  - **纹饰**:牛首/颈/身/腿饰盘绕回旋的龙蛇纹组成兽面纹(兽面衔两蟠龙),牛颈及锅形器上有虎、犀牛等浮雕。
  - **原则 D 的细节**:"这件牺尊的牛鼻上还穿有一环,说明了至少在春秋时期,已经开始使用穿鼻的方法来驯服牛了"——这是把器物读成"驯牛技术史"证据的一句,正合用户"读知识结构而非看奇观"的偏好。
  - 同样复述了李峪村 1923 出土、大部流散海外、上博藏少数珍品的背景。
- **诚实标注**:文中"商晚期的牛尊"一语与标题"春秋牺尊"自相矛盾(疑为媒体编辑笔误),**原样保留、不替它裁断**;断代以澎湃+新浪共同主张的"春秋晚期"为准,但提示读者该来源内部有不一致。

**D 类小结**:这是本件**最实的一类**——形制/尺寸/纹饰/出土流散全部由 D 类 chunk 支撑。代价:两条都是 all-rights 媒体稿、tier=mid,**没有馆方一手或学术一手为它们背书**;断代、"唯一一件""仅知四件"等强主张均为媒体转述,bundle 如实标注其来源等级,不替其升格为定论。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced(本件无 source_class=E 的 chunk,候选清单未给本件数字人文 / 跨域 OA 入口)。**

可顺延的工程线索(非 chunk,不计入到手):澎湃长文里的"上博×大同回乡展""浑源彝器跨馆分藏"是天然的**跨馆聚合图素材**,若未来接入上博 + 大同市博物馆 + 海外(Met/CMA/已知流散的李峪器)做一张"一坑窖藏 → N 馆"的聚合图,即对应原则 D 的标准产出形态。但**此 bundle 不预支这张图**——E 类此刻为空。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5 类有内容**(B:2 条 CC0;D:2 条 all-rights)。A / C / E **三类全空,均 no candidate sourced** |
| 各 chunk 的 tier + license | Met 61323:CC0 / mid(引);CMA 1951.151:CC0 / mid(引);澎湃:all-rights / mid(短引);新浪:all-rights / mid(短引)。**无 unknown、无 low,故无"仅 URL"降级件;无 failed 件** |
| 有正文截录 / 仅元数据 / 仅 URL | 有正文/元数据:全部 4 条。仅 URL(因 license/tier 降级):0 条。仅 URL(因 failed):0 条 |
| bundle 完整度自评 | **中**。叙事支柱(流散史 + 形制)够硬,但**全靠媒体二手**;馆方一手(A)、学术一手(C)、数字人文(E)三块皆空,海外对照(B)又非同期同坑,**不能声称已交付"流散件虚拟拼合"** |
| 给 PM 的 wow moment(一句话) | **"同一件 1923 年浑源李峪村出土的牛形酒器,国内叫它'浑源彝器'、国外叫它'李峪青铜器'——连名字都分了家;而当年是上海市博物馆赶到海关把它从偷运出国的船上截下来的。馆方说明牌不会写这一句,但澎湃那篇长文写了,AI 替你把'命名权 = 叙事权'这一层捞了出来。"** |

---

## 7. 反向发现 / 该展品不工作的源

- **本件无 failed chunk** —— 4 条全 fetch_status=ok,无失败原因可报。
- **A 类(馆方一手)结构性缺失**:no candidate sourced。台账旁证:上博藏品库为大陆 SPA,牺尊未锁定可 curl 固定单件 URL,整件降为 reportage_confirmed。**后果:本 bundle 全程拿不到上博馆藏号、官方说明牌、策展声明。** 这是本件最大缺口,需 PM 国内 IP / --js 渲染回填。
- **C 类(学术一手)缺失**:no candidate sourced。澎湃文中转引的周亚、商承祚《浑源彝器图》(1936)是**二手转述**,本 bundle 拒绝把它升格为 C 类一手——宁可标"C 类未到手"。
- **E 类(数字人文)缺失**:no candidate sourced。"上博×大同回乡展"是潜在跨馆聚合图素材,但此刻无 chunk,**不预支聚合图**。
- **B 类的"假对照"风险(已主动拆弹)**:Met 61323、CMA 1951.151 是**商—西周尊**,非春秋牺尊本件、非浑源同坑。若不诚实标注,极易被误读成"同源流散件"。bundle 已显式声明它们只承担"尊/兽形酒器类型对照",**不参与本件的同窟拼合叙事**。
- **新浪源的内部矛盾(已原样保留)**:同一篇里"春秋牺尊"与"商晚期的牛尊"并存,疑为编辑笔误;bundle 不替它裁断,只提示读者该 all-rights / mid 源自身不自洽。

---

**到手源清单(全部 fetch_status=ok)**:
- B · Met objectID 61323 *Wine vessel (Zun)*:`https://collectionapi.metmuseum.org/public/collection/v1/objects/61323`(CC0 / mid)
- B · CMA 1951.151 *Wine Vessel (Zun)*:`https://clevelandart.org/art/1951.151`(CC0 / mid)
- D · 澎湃《浑源彝器回乡暨〈诗经〉中的青铜器特展》:`https://m.thepaper.cn/newsDetail_forward_2772807`(all-rights / mid)
- D · 新浪收藏《上海博物馆藏春秋牺尊(图)》:`http://collection.sina.com.cn/tqfx/20120312/175959352.shtml`(all-rights / mid;raw 经 gb18030 解码)

**未到手(显式声明)**:A 类(馆方一手)= no candidate sourced;C 类(学术一手)= no candidate sourced;E 类(数字人文 / 跨域 OA)= no candidate sourced。

**[ night-run AI 装订 · 2026-06-07 · 非最终 bundle ]**
