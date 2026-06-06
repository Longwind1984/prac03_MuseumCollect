# Sample Bundle · 良渚文化 神人纹玉勒 · 震旦博物馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=aurora-liangzhu-mask-pendant-le)

> **装订口径(诚实前置)**:本件在 verified_chunks.json 里只有 **2 条 chunk,均 fetch_status=ok**——B 类 CMA(CC0/mid)、D 类 国博(© all-rights/mid)。**A、C、E 三类源没有任何 candidate 被 source**(见 sources_candidates.full30.json:本件只规划了 B+D 两条)。下文凡引正文,均可追到某条 ok chunk 的 excerpt_or_metadata;凡没到手,直接写"未到手",不脑补、不旁证、不拼合。

---

## 0. 展品识别

| 字段 | 内容 | 追溯 |
|---|---|---|
| 名称 | 良渚文化 神人纹玉勒 | candidate.artifact_name_zh;并由澎湃·震旦良渚导读(二)逐件点名(跨件共享源) |
| 馆 / 厅 | 震旦博物馆(Aurora Museum,上海) · 5F 古器物学研究中心 ·「灵光:新石器时代玉器特展」第一部分·良渚文化 | exhibit-list.md 第 58 行 + 澎湃导读(二)正文 |
| 朝代 / 年范围 | 新石器时代 · 良渚文化(澎湃导读原文:距今 5300~4200 年) | 澎湃导读(二)excerpt(跨件共享源) |
| 材质 | 玉(良渚神人兽面纹载体器类之一) | 仅由展览叙事推得;**本件单件材质/尺寸的馆方一手字段未到手** |
| 已知编号 | **未到手**(震旦官网 Next.js SPA,无独立单件 URL;无 accession) | exhibit-list shortfall §震旦 |
| 已知来源/出处 | **未到手**(无墓葬/出土地的本件一手数据) | — |
| 检索关键词 | 良渚 / 神人纹玉勒 / 神人兽面纹 / 神徽 / 玉勒 / Liangzhu / jade pendant / 震旦博物馆 / 灵光特展 | — |

**这件 chunk 实情(供 PM 一眼看穿)**:本件**没有一条 chunk 的 artifact_id 直接命中"神人纹玉勒"本体的描述**。
- B 类(CMA 1991.6)实际是一件**红山文化玉钺**(Ceremonial Disk-Axe / Yue),不是良渚玉勒——pipeline 把它当"红山钺 vs 良渚的跨文化对照"foil 引入。
- D 类(国博)实际是一件**良渚人面纹玉琮**,不是玉勒——作"同一神徽跨器类"的另一馆方实例。
- 唯一直接点名"神人纹玉勒"存在于本展的,是**跨件共享源**(澎湃导读,artifact_id 标在 sibling 件 four-tier-cong-mask 上)。
- 故本 bundle 的诚实定位:**它是一份"神徽语境包",不是"玉勒单件包"**。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

sources_candidates.full30.json 中本件(aurora-liangzhu-mask-pendant-le)**没有规划任何 A 类 candidate**。
exhibit-list.md §震旦 shortfall 已记录系统性原因:震旦官网为 Next.js SPA,裸 curl 只取 HTTP 头(1008 与研究中心页均 200),不跑 JS 抓不到逐件展品正文页,**无独立单件 URL**。
→ 本件无馆方说明牌文字、无馆方策展声明、无 accession 号到手。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk**:source_class=B · fetch_status=**ok** · license=**CC0** · tier=**mid** · `https://clevelandart.org/art/1991.6`

到手 chunk 标题(馆方/pipeline 元信息):
> CMA「Ceremonial Disk-Axe (Yue)」,馆方明标 Hongshan culture · Neolithic(4700–2920 BCE)、Jade、CC0。

到手正文(excerpt 全文,**仅页面骨架级元数据,几乎无器物描述**):
> Ceremonial Disk-Axe (Yue) / c. 4700–2920 BCE / Northeast China, Neolithic period, Hongshan culture (4700–2920 BCE)
> (页面其余为 "See Also / Visually Similar by AI / Contact Us / 信息可能不准确,欢迎纠错" 等模板文字)

**诚实判定**:
- 这条是 **CC0、可引用**,但到手内容**只到"名称+文化+年代"三行**,**没有尺寸、没有纹饰描述、没有 provenance**——属"有正文截录但密度极低"。
- 更重要的张力:**这件 CMA 钺是红山文化,不是良渚**。它能为本件提供的,只是 pipeline rationale 里那个**跨文化对照命题**——"神徽/权力符号刻于'钺'这类兵权象征上,红山与良渚各有其路径"——但**chunk 正文本身并不支持任何关于良渚玉勒的论断**。
- 因此本节**不能**用它去描述"神人纹玉勒长什么样";它只够支撑一个**对照锚点(红山钺·CC0·可商用图像源)**。原则 D 意义上的"跨器类/跨文化网络节点"成立,单件描述价值≈0。

**B 类其它候选**:本件无第二条 B 类 candidate。(对照:sibling 件 four-tier-cong-mask 才有真良渚海外对照 V&A O39383、Met 42962——见第 5 节"反向发现"里的跨件提示。)

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

sources_candidates.full30.json 本件无任何 C 类 candidate;verified_chunks.json 内本 artifact_id 下也无 C 类 chunk。
→ 关于"神人纹玉勒""玉勒器类""良渚神徽标准化"的学术段落,**0 条到手**,不补。

---

## 4. 来源 D · 现场场域

**chunk**:source_class=D · fetch_status=**ok** · license=**© all-rights** · tier=**mid** · `https://www.chnmuseum.cn/zp/zpml/kgfjp/202104/t20210415_249733.shtml`

到手内容:中国国家博物馆藏品页「人面纹玉琮」。**注意:这是国博的一件良渚玉琮,不是震旦的玉勒,也不是玉勒器类**——pipeline 用它补"良渚神人/人面纹跨器类的另一馆方实例 + 神徽标准化语境"。

由于该页 license=**© all-rights**(非开放许可),按口径**只做有限度的事实性引用、不长段转录**。可安全转述的馆方事实:
- 国博该「人面纹玉琮」:高 5 厘米、面长 7.5 厘米、射径 7.7 厘米、孔径 6 厘米;1972 年浙江省余杭县长命乡钟介村出土;青灰色扁方柱筒形、内圆外方、四面以折角为中轴雕四组带冠人面纹。
- 馆方叙事将其放进"良渚玉琮 = 重器、象征神权"的框架,并以 1986 年反山 M12「玉琮王」(八组神人兽面神徽、"玉琮王"之誉)作为该器类的叙事高点。
- 馆方提出的一条**可检验规律**:良渚玉琮"节多者纹饰简练、节少者纹饰繁复",但不论高矮都饰神人兽面像,是良渚玉器的"标志"性纹饰。

**诚实判定**:
- 这条对**理解神徽器类生态**有用(原则 D 网络),但它**不是本件(玉勒)的现场/一手数据**;本件的现场场域(震旦展厅、说明牌、馆方导览)**仍为 0 条到手**。
- license=© all-rights → 以上为事实要点转述,**不作整段原文照搬**;原文更长,见 raw_path `data/raw/aurora-liangzhu-mask-pendant-le/D-4b565633.html`(未续写未见内容)。

**跨件共享源(D 性质,artifact_id 标在 sibling `four-tier-cong-mask`,但 URL 切题且 fetch_status=ok,可引)**:
澎湃·震旦官方良渚导读(二)`https://www.thepaper.cn/newsDetail_forward_31749968`(license © all-rights / tier mid / ok)。它是**唯一直接点名"良渚文化 神人纹玉勒"存在于本展**的源,并给出本展叙事框架:
- 展览:震旦博物馆 2025-05-16 起「灵光:新石器时代玉器特展」(5F 古器物学研究中心,200 余件,覆盖红山/良渚/龙山/齐家"四大文化谱系")。
- 良渚段叙事核心:玉器"以琮、璧、钺为中心","原始政教合一"、王权+神权双重;**神人兽面纹是带超自然意义的"神徽",在太湖流域高度一致**,主要出现在琮、琮式管、三叉形器、玉璜、冠形器、锥形器、柱形器、带钩等器物上,经历"由繁到简"的演变。
- 导读把"神人纹四节玉琮"与"神人纹玉勒"**并列点名**为本展具体展品——这是本件"存在于该展"的直接实据(等级:reportage_confirmed,非 museum_page_confirmed)。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

sources_candidates.full30.json 本件无任何 E 类 candidate;本 artifact_id 下无 E 类 chunk。
→ 无数字人文/跨域 OA 资源到手,不补。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**(B + D)。A、C、E 均 no candidate sourced。 |
| 各 chunk 的 tier + license + 内容形态 | B(CMA 1991.6):CC0 / mid / **有正文截录但仅"名称+文化+年代"三行,且对象是红山钺非良渚玉勒**。 D(国博人面纹玉琮):© all-rights / mid / **有正文,但对象是国博玉琮非本件,按版权只做事实转述**。 跨件共享源(澎湃导读二):© all-rights / mid / ok / **点名本件存在 + 展览神徽叙事**。 |
| 本件 chunk 是否描述了"神人纹玉勒"本体? | **没有。** 三条可用源没有一条给出玉勒单件的材质/尺寸/纹饰/出处。本 bundle 是"神徽语境包",不是"玉勒单件包"。 |
| 完整度自评 | **低-偏弱**(三件 pilot 邻件中最薄的一类:无 A/C/E、B 仅元数据且对象错位、D 为他件)。诚实标完整度,不灌水。 |
| 给 PM 的 wow moment(一句话) | "**这件'神人纹玉勒',我们的数据集里没有它本人的任何一张正脸——CMA 给的是一件红山的钺,国博给的是一件良渚的琮,只有那篇澎湃导读在一行字里把它和'四节玉琮'并排点了个名。但恰恰是这串'查不到本体'本身在说话:良渚的'神徽'是一套刻在琮、钺、勒、冠形器上反复出现的标准化符号——所以你站在这件玉勒前,真正该看的不是它,而是它和旁边那件玉琮共用的同一张神人兽面;而'琮王'被供在浙博、被搬上《国家宝藏》,这件勒却连一个馆方单件页都没有——同一套神权符号,谁被叙事点亮、谁停在阴影里,这就是原则 C 的现场。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **failed chunk**:本件 verified_chunks.json 内 **无 fetch_status=failed 的 chunk**(2/2 均 ok)。本件的"缺",不是抓取失败,而是**源覆盖本身就稀**(A/C/E 根本没规划 candidate)。
- **B 类对象错位(最关键的反向发现)**:CMA 1991.6 在元信息里被当作本件的海外对照,但它**是红山文化玉钺,不是良渚玉勒**。pipeline 的对照逻辑(红山钺↔良渚)是策展命题,**不是器物层面的同类件**。下游若不读 rationale、只看 source_class=B 就当"本件海外对照件",会误导。→ 工程建议:schema 上为对照 chunk 增 `comparand_relation`(same_object / same_type / same_motif / cross_culture_foil)字段,避免把"跨文化命题"误读成"同类对照"。
- **D 类对象错位**:国博「人面纹玉琮」也不是本件,是"同神徽跨器类"的他馆他件;且 © all-rights,不能整段转录。
- **真良渚海外对照其实存在,但被挂在 sibling 件上**:V&A O39383(Cylinder/cong,Liangzhu,ca.2500 BC,CC-BY,ok)与 Met 42962(Liangzhu Pendant,CC0,ok)都在数据集里,artifact_id 标的是 `aurora-liangzhu-four-tier-cong-mask`。→ 若要给本件凑一个"真良渚 OA 对照",可按跨件共享源规则**复用 Met 42962(其类目正是 jade pendant,与'玉勒'最接近)**;本 night-run 未擅自并入,留 PM 决定是否把它正式归到本件。
- **震旦本身不可程序化**:Next.js SPA,无单件 URL,无 accession。本件的 A 类与单件一手数据在当前 pipeline 下**结构性拿不到**,需 PM 跑 JS 渲染或现场补。
- **澎湃可达性二义**:thepaper.cn 裸 curl HEAD 403(Cloudflare),WebFetch 可取正文;本 chunk 即 WebFetch 路径取得,标 ok。

---

**主要来源(可追溯清单)**:
- CMA「Ceremonial Disk-Axe (Yue)」1991.6:`https://clevelandart.org/art/1991.6`(B / CC0 / mid / ok;raw `data/raw/aurora-liangzhu-mask-pendant-le/B-54c098b8.html`)
- 国博「人面纹玉琮」:`https://www.chnmuseum.cn/zp/zpml/kgfjp/202104/t20210415_249733.shtml`(D / © all-rights / mid / ok;raw `data/raw/aurora-liangzhu-mask-pendant-le/D-4b565633.html`)
- 澎湃·震旦良渚导读(二)〔跨件共享源,artifact_id=aurora-liangzhu-four-tier-cong-mask〕:`https://www.thepaper.cn/newsDetail_forward_31749968`(D / © all-rights / mid / ok)
- 〔反向发现里提及、未并入本件〕V&A O39383 `https://collections.vam.ac.uk/item/O39383/`(CC-BY/ok)、Met 42962 `https://collectionapi.metmuseum.org/public/collection/v1/objects/42962`(CC0/ok)——均标在 sibling 件。

**[ Sample Bundle · aurora-liangzhu-mask-pendant-le 完 · night-run 2026-06-07 ]**
