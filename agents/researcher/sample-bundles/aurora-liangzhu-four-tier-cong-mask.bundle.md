# Sample Bundle · 良渚文化 神人纹四节玉琮 · 震旦博物馆(Aurora Museum)

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=aurora-liangzhu-four-tier-cong-mask)

> **本件 chunk 账本**:候选源只覆盖 B、D 两类;到手 4 条 chunk,**全部 fetch_status=ok,无 failed**。
> 2 × B(V&A O39383 · Met 42962),2 × D(浙江省文旅厅 · 澎湃震旦良渚导读)。
> A / C / E 三类**无候选源被 sourced**(见第 1、3、5 节的显式缺源声明)。
> 反幻觉纪律:本 bundle 每段正文引用都追得到上述 4 条 chunk 之一的 excerpt;不在 chunk 之外补任何内容。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 良渚文化 神人纹四节玉琮 |
| 馆 / 厅 | 震旦博物馆(Aurora Museum)· 5F「灵光:新石器时代玉器特展」第一部分 · 良渚文化(2025-05-16 起) |
| 朝代 / 公元年范围 | 新石器时代 · 良渚文化(距今约 5300–4200 年) |
| 材质 | 玉(透闪石软玉系) |
| 已知 accession / 编号 | **未到手**(震旦官网为 Next.js SPA,本件无独立单件 URL;展品存在性靠馆方授权的澎湃导读确认) |
| 已知来源 / 出处 | 馆方授权报道(澎湃·震旦良渚导读二)点名本展确有「神人纹四节玉琮」一件 |
| 检索关键词 | 良渚 / 神人兽面纹 / 神徽 / 四节玉琮 / 多节琮 / cong / Liangzhu / 震旦博物馆 / 灵光 / 反山 / 玉琮王 |

**为什么这件值得做(对照张力)**:
- 这是震旦(上海一家私立馆)展柜里的一件**多节玉琮**。它一旦放进 pipeline,马上和两条更"重"的叙事线产生张力:
  - 一条是 **大陆国族叙事侧**——浙江省文旅厅那篇讲反山 M12「玉琮王」的官方长文(藏浙博、上过《国家宝藏》、「天下第一琮」)。
  - 一条是 **海外散藏侧**——V&A 与 Met 各自收着一件良渚玉器,题名干净、license 开放、纹饰结构(节数 / 神徽轮廓)与本件同源。
- 把这三方拼在一起,正好 surface 原则 C/D 关心的东西:同一种「神人兽面纹」礼器,**国内被供成"天下第一"的国宝、海外被编号成 CC0 的一件 Pendant**——叙事权力的地理分布,本身就是知识结构的一层。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

- 候选清单里**没有为本件 sourced 任何 A 类(震旦官方单件页)URL**。已知背景:震旦官网为 Next.js SPA,裸 fetch 只能拿到 HTTP 头,不跑 JS 抓不到逐件展品正文页;本件因此没有独立的馆方单件锚点。
- 本 bundle **不**用任何二手内容冒充馆方一手页。本件"在该展存在"这一事实,由第 4 节 D 类的澎湃导读(馆方授权报道)承担,而非 A 类。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

到手 **2 条 chunk,均 fetch_status=ok**。这是本件目前唯一"有海外一手元数据正文截录"的一类。

### B-1 · V&A O39383(玉琮)
- **tier**: mid · **license**: CC-BY(可引正文) · fetch:playwright→html(via_vpn)
- URL: https://collections.vam.ac.uk/item/O39383/
- **有正文截录**(摘自 chunk excerpt,V&A 馆方 briefDescription / physical description):
  - 题名:*Cylinder (cong), Jade, China, ca. 2500 BC, Liangzhu culture*;材质 *Nephrite jade, carved*;展于 China, Room 44。
  - 形制:**深绿色、内部圆筒中空、外方柱"15 sections(15 节)"**;"drilled from both ends, the meeting point in the middle is no more than 3cm in diameter. **One of the tallest cong known to date.**"
  - 纹饰线索:顶端的"collar(中文称 *she* / 射)上,**incised the faint outline of the wings and head of a bird(隐约刻有鸟的双翼与头部轮廓)**"。
  - 馆方还顺带把良渚说成中国新石器时代环太湖流域文化、"over 500 discovered sites"、以"用玉随葬"为最显著特征。
- **与本件相似性**:本件题名是"**四节**玉琮",V&A 这件是"**15 节**"——同属良渚多节琮谱系,**节数差异本身就是 demo 素材**(单节 / 四节 / 十五节是良渚琮的等级 / 演变轴)。V&A 馆方文字明示了"节(section)"作为可枚举结构特征,直接呼应本件题名里的"四节"。

### B-2 · Met 42962(良渚 Pendant)
- **tier**: mid · **license**: CC0(可引正文 / 公有领域) · fetch:httpx→json(via_vpn)
- URL: https://collectionapi.metmuseum.org/public/collection/v1/objects/42962
- **有正文截录**(Met Collection API JSON,关键字段):
  - `title`: Pendant · `objectName`: Pendant · `culture`: China
  - `period`: **"Neolithic period, Liangzhu culture (ca. 3200–2000 BCE)"** · `medium`: Jade
  - `accessionNumber`: 11.190.248 · `accessionYear`: 1911 · `creditLine`: "Gift of Samuel T. Peters, 1911"
  - `dimensions`: H. 3 1/2 in. (8.9 cm); Diam. 7/16 in. (1.1 cm) · `isPublicDomain`: true · 有 primaryImage 高清图直链
- **与本件相似性**:这是一件良渚**配饰类玉器(Pendant)**而非琮,作为"第二件海外良渚对照"增强跨馆密度——它把对照从"同器型(琮)"扩展到"同纹饰文化谱系下的不同器类"。注意:此件是 Pendant,**不是琮**;不可拿来当"和本件同器型"用,只能作"同文化、CC0 可复用、可入跨馆聚合图"的一格。

**B 类小结(tier+license)**:V&A=mid/CC-BY、Met=mid/CC0。两条都是**真海外馆一手元数据 + 正文截录**,license 干净。这是本件 pipeline 跑得最顺的一类:URL 切题、playwright/httpx 直取、可 100% agent 自动化。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

- 本件候选清单里**没有为其 sourced 任何 C 类(学者论文 / 长文)URL**。verified_chunks.json 中本件也无任何 C 类 chunk。
- 诚实标注:良渚神人兽面纹 / 多节琮在学界并不冷门(方向明等有大量微雕工艺研究),但 night-run 阶段**没有为本件落地过任何学术 chunk**,故此处不写任何论文内容——宁可写"未到手",不旁证脑补。
- 留给 PM 的动作:C 类是本件最值得补的缺口(B 已强、D 已强,补 C 即可三类成型)。

---

## 4. 来源 D · 现场场域

到手 **2 条 chunk,均 fetch_status=ok**。两条都是 `license_observed=(c)all-rights`、`tier=mid`——**版权保留**,因此本节只做**短引 + 转述其叙事**,不整段复制原文;原文更长,见各自 raw_path。

### D-1 · 浙江省文旅厅「玉琮王,穿越五千年凝视」
- **tier**: mid · **license**: (c)all-rights(版权保留,仅短引 + 转述) · fetch:httpx→html
- URL: http://wwj.zj.gov.cn/art/2024/11/6/art_1639077_59062446.html
- raw_path: data/raw/aurora-liangzhu-four-tier-cong-mask/D-b756b855.html(原文更长)
- **这条讲的不是本件,而是"参照系里那件最重的琮"**——反山 M12 出土、现藏**浙江省博物馆之江馆**的「玉琮王」。chunk 内可追到的事实:
  - 它被称"天下第一"琮、上过央视《国家宝藏》;**重达 6.5 千克**;直槽上雕了**8 幅火柴盒大小的完整神徽**,神人脸 / 冠帽与神兽眼鼻嘴用浅浮雕、神人上肢与神兽下肢用阴线刻,是良渚微雕杰作。
  - 微雕之细:所长方向明量过,**兽眼眼珠只有二三毫米**;chunk 里还记了"用什么钻刻"的悬案(麻雀肢骨截面约 1–3mm、狗尾巴草管钻的实验考古),目前**未定论**。
  - 文章开头的"侧光"细节(策展人给玉琮王打侧光让观众"拍出良渚神人凝视")——这是一条**很好的现场叙事钩子**,但它属于**浙博之江馆现场,不是震旦**。
- **跨件共享源说明**:此 chunk 的 artifact_id 标在本件,但它实际描述的是浙博玉琮王。它在本 bundle 里的角色是**国族叙事侧的对照参照**(原则 C 的"权力地理张力"),**不能**被读成"震旦这件就是玉琮王"。本件(四节)与玉琮王(反山 M12)是两件不同的琮。

### D-2 · 澎湃·震旦「灵光:新石器时代玉器特展」良渚导读(二)
- **tier**: mid · **license**: (c)all-rights(版权保留,仅短引 + 转述) · fetch:httpx→html
- URL: https://www.thepaper.cn/newsDetail_forward_31749968
- raw_path: data/raw/aurora-liangzhu-four-tier-cong-mask/D-0e3c568f.html(原文更长)
- **这是本件"在该展存在"的直接实据**,也是最贴近馆方叙事的一条。chunk 内可追到的事实:
  - 震旦博物馆 **2025-05-16 起**在 5F 古器物学研究中心开「灵光:新石器时代玉器特展」,200 余件,覆盖红山 / 良渚 / 龙山 / 齐家"四大文化谱系"。
  - 导读正文在器物清单里**逐件点名**:"良渚文化 **神人纹四节玉琮**""良渚文化 神人纹玉勒"——**本件题名与该展直接对上**。
  - 导读的良渚叙事:玉琮"有**单节、多节之分**,是良渚等级最高、功能最复杂的礼器";神人兽面纹是"带有超自然意义的'神徽'""在长江中下游太湖流域表现出高度的一致性,是这一地区的统一信仰",且**纹饰经历了"由复杂繁琐到重点突出"的演变**。
  - 导读还点出良渚是"以神权为纽带的文明模式""至高王权和威严神权的双重权利,是原始政教合一的表现"——**这句馆方/作者的话本身就是原则 C 可拆解的叙事**。
- **共享性**:此 chunk 同时点名"神人纹玉勒",故它也是兄弟件 aurora-liangzhu-shenren-jade-le 的共享源。

**D 类小结(tier+license)**:两条均 mid/(c)all-rights。一条(澎湃)锚定本件在展、给纹样演变叙事;一条(浙江文旅厅)提供国族叙事侧的"玉琮王"对照。**因版权保留,本节只短引转述,未整段复制**——符合反幻觉门的"license 谨慎"原则。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

- 本件候选清单**没有 sourced 任何 E 类(数字人文 / 跨域 OA)URL**,verified_chunks.json 中本件也无 E 类 chunk。此处不写任何内容。
- 备注:良渚有"良渚古城遗址数字资源 / 浙博数字馆"等潜在 E 类入口,但 night-run 阶段未对本件落地,故诚实留空。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5 实际到手**(B 海外对照 2 条 · D 现场场域 2 条);A / C / E 三类 **no candidate sourced**,已在各节显式声明 |
| 各 chunk 的 tier + license | B-1 V&A:mid / CC-BY(有正文)· B-2 Met:mid / CC0(有正文)· D-1 浙江文旅厅:mid / (c)all-rights(仅短引转述)· D-2 澎湃:mid / (c)all-rights(仅短引转述) |
| 失败 chunk? | **0 条 failed**——本件 4 条 chunk 全部 fetch_status=ok |
| 自动化程度(给 ADR-006) | B 类(V&A playwright / Met json API)= 100% agent;D 类(静态 html)= agent 可取,但**版权保留**,只能转述不能整段入库;A/C/E 缺口需 PM 二次 sourcing |
| bundle 完整度自评 | **中**:海外对照(B)与现场叙事(D)都成立且互相咬合,但**缺 A 馆方一手 + C 学术 + E 数字人文**,深度不及白石佛那种五源全到的样本。诚实标:这是一件"两条腿很稳、缺另外三条腿"的 bundle |
| 给 PM 的 wow moment(一句话) | "你正站在震旦这件**四节**玉琮前——它在伦敦 V&A 有个**十五节**的远房同类(馆方自己数过'15 sections'),在纽约 Met 有件被编成 CC0、由 1911 年一位捐赠人送进来的良渚玉饰;而在杭州,同一种神人兽面纹被供成 6.5 公斤、上过《国家宝藏》的'天下第一'玉琮王。**同一个神徽,在三座城被讲成三种东西:一件特展品、两件可下载的编号物、一件国宝**——你刚才路过没读出来的,正是这层叙事的地理。" |

---

## 7. 反向发现 / 该展品不工作的源

- **A 馆方一手单件页 = 结构性不可达**:震旦官网 Next.js SPA,本件无独立单件 URL;裸 fetch 只取 HTTP 头。**本件的"在展"靠 D 类澎湃导读(馆方授权报道)兜底,而非 A 类**——这是本件 metadata 的根本缺口,accession / 馆藏号 / 高清图都因此为空。
- **C / E 两类:night-run 未为本件 sourced 任何候选**。不是"抓失败",而是"压根没投候选"——ADR-006 应区分这两种空(failed vs no-candidate),本件属后者。
- **D 类版权保留的天花板**:两条 D 都是 (c)all-rights。它们能给叙事、给现场钩子,但**不能整段进可复用语料库**;pipeline 对这类只能"短引 + 指 raw_path",不能当 CC0 那样自由编册。
- **跨件混淆风险(已规避)**:D-1 描述的是浙博「玉琮王」(反山 M12),不是震旦这件四节琮;chunk 的 artifact_id 虽标本件,但**两件是不同器物**。本 bundle 已把它显式降格为"国族叙事侧的对照参照",未让它冒充本件——这是本件最容易被自动拼合脑补搞错的地方,特此标注。
- **节数别被脑补对齐**:本件题名"四节",V&A 是"15 节",Met 是 Pendant(非琮)。三者同文化、不同形制 / 节数;**可作谱系对照,不可作"同一件的不同照片"**。

---

**主要来源(本件 4 条 ok chunk)**:
- V&A O39383(玉琮):https://collections.vam.ac.uk/item/O39383/ — B / mid / CC-BY
- Met 42962(良渚 Pendant):https://collectionapi.metmuseum.org/public/collection/v1/objects/42962 — B / mid / CC0
- 浙江省文旅厅「玉琮王,穿越五千年凝视」:http://wwj.zj.gov.cn/art/2024/11/6/art_1639077_59062446.html — D / mid / (c)all-rights
- 澎湃·震旦良渚导读(二):https://www.thepaper.cn/newsDetail_forward_31749968 — D / mid / (c)all-rights

**[ Sample Bundle · aurora-liangzhu-four-tier-cong-mask · night-run 2026-06-07 完 ]**
