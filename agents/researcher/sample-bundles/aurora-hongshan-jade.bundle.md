# Sample Bundle · 红山文化 玉神人兽像 · 震旦博物馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:`data/pipeline/out/verified_chunks.json`(artifact_id=`aurora-hongshan-jade`)

> **本件是 3 件 pilot 之一**,故意挑的高难度件:海外对照件预期少,真伪/出土争议本身即产品哲学素材(直接对应 user-voice 原则 C)。
> **与 2026-05-18 Researcher 手做版(`aurora-hongshan-jade-anthropomorphic-figure.md`)的根本差别**:那一版在沙箱里几乎全部 403,只能给 URL 清单 + WebFetch 摘要;**本 night-run 版每一条 ok chunk 都是实际抓到正文/元数据后的截录**——A/D/E 大陆馆方与媒体页这次都落了正文。
> **本次共 8 条 chunk:7 条 `fetch_status=ok`(class A/B/C×2/D/E),1 条 `failed`(class C · MDPI)。** 详见第 6、7 节。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 玉神人兽像(红山文化) |
| 馆 / 厅 | 震旦博物馆(上海陆家嘴) · 5F 古器物学研究中心展厅 |
| 朝代 | 新石器时代 · 红山文化 |
| 材质 | 玉 · 圆雕(*chunk D 仅描述造型,未给材质矿物学定名与尺寸;不补*) |
| 已知 accession / 编号 | **chunk 内 0 条** —— 7 条 ok chunk 没有任何一条给出本件馆藏编号 |
| 已知来源 / 出处 | **chunk 内未见考古出处** —— A/D 馆方与媒体叙事均未提发掘记录;C 类学者源明示该类"从未经科学发掘"(见第 3 节) |
| 检索关键词 | 震旦博物馆 / Aurora Museum / 灵光 / 红山文化 / Hongshan / 玉神人兽像 / jade humanoid figure / 牛河梁 |

**chunk 锚点**:名称+造型描述追到 **chunk D**(`thepaper.cn/...23410012`,ok);馆-厅"5F 古器物学研究中心展厅"追到 **chunk A**(`auroramuseum.cn/.../1008`,ok)。

---

## 1. 来源 A · 馆方一手页面

**chunk**:`source_class=A` · `fetch_status=ok` · `playwright->html` · **license=(c)all-rights** · **tier=mid** · `raw_path=data/raw/aurora-hongshan-jade/A-49245458.html`
**有正文截录**(license 是 all-rights,故此处为研究性引用,**不可入主语料分发**,仅 surface 馆方叙事)。

到手的是震旦"**灵光:新石器时代玉器特展**"(2025-05-16~2026-10-31,5F 古器物学研究中心展厅,特展不另收费)的展页正文。馆方叙事原文要点(追得到 chunk A excerpt):

- 全展"对两百余件……玉器进行梳理规整,遍历**红山文化、良渚文化、龙山时期与齐家文化**,呈现新石器时代'四大文化谱系'"。
- 馆方框架:红山=**东北系统**、良渚=东南系统、龙山=北方系统、齐家=西北系统,称之为"原生型"玉文化区。
- 展览分两部分,第二部分"**重点展出红山文化玉器中的典型器物**"。
- 展页列出的具体器物里有"**红山文化 玦形玉龙**"等,**但没有逐件点到"玉神人兽像"本件**——A 类馆方页给到的是**展览层叙事**,不是本件的单件说明牌。

**张力点(原则 C)**:馆方这段是一套**很完整、很自信的"中华文明起源·四大谱系"宏大叙事**(关键词"灵光""中华文明起源时闪烁");却**完全不触及本件的出土/真伪问题**。这正是第 3 节海外学者源要戳的地方。**馆方页面里玉神人兽像本件无独立 URL、无 accession**——A 类的天花板就到展览叙事为止。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk**:`source_class=B` · `fetch_status=ok` · `httpx->html`(via_vpn) · **license=CC0** · **tier=mid** · `raw_path=data/raw/aurora-hongshan-jade/B-c8263ec9.html`
**有正文截录**,且 **CC0 → 可入主语料**。这是本件 7 条 ok chunk 里**唯一一条干净可分发的对照件**。

- 馆 / 编号:**Cleveland Museum of Art · 1953.628**
- 题名:**"Amulet in the Form of a Seated Figure with Bovine Head"**(牛首坐姿人形护符)
- 年代 / 归属(馆方原文):**"c. 4700–2920 BCE … Northeast China, Neolithic period, probably Hongshan culture"**
- **CMA 自己加了一句免责声明**(原文截录):*"The information about this object, including provenance, may not be currently accurate."* 并提供"Update or Correct Artwork Information"纠错入口。

**相似性论证(诚实标度)**:**中**。同区(东北)、同期(红山窗口)、同为"人+兽"复合玉造像;但 CMA 件是"牛首坐姿"护符,**与震旦"头树角状物、立耳、阴刻网格纹"的圆雕神人兽像并非同型**——是**类比对照**,不是同窟/同型流散件。chunk B 的 `source_title` 本身就标注"**归属未自验,需 spike(现有 cma.json 未必命中)**"——保留这层不确定。

**值得 PM 注意**:连 CC0 大馆 CMA 都在器物页主动写"provenance 可能不准、欢迎纠错"——**海外馆对红山归属的态度本身是谨慎的**,这与震旦页面的笃定叙事形成第二层张力。

---

## 3. 来源 C · 学术论文 / 学者文章

本件学术源是 chunk 数量最多的一类(C×3:2 ok + 1 failed),也是这件 pilot 的真正重心。

### 3a · OCS 伍尔夫玉器讲座(直接命中本类型)
**chunk**:`source_class=C` · `fetch_status=ok` · `httpx->html`(via_vpn) · **license=unknown** · **tier=mid** · `excerpt_truncated=True` · `raw_path=…/C-8af4c77f.html`

> license=unknown → **按硬门只能引,不可入主语料分发**;但因有正文,可 surface 其核心论断(讲座页公开文字)。

Oriental Ceramic Society《**Jade Humanoid Figures: A Look into Possible Hongshan Culture Origins**》(年度 Woolf Jade Lecture,讲者 **Michel Lee**,瑞典国立世界文化博物馆/远东古物馆 China·Korea·Sven Hedin 藏品策展人)。讲座页原文(追得到 chunk excerpt)直接点出本类型的全部要害:

> *"A type of sculpture with both human and animal features is amongst the most mysterious of jade objects… Based on their style, they have been attributed to the Neolithic Hongshan culture of Northeast China. A small handful have been collected by reputable museums. **However, these anthropomorphic jades have never been excavated scientifically.**"*

并说明讲座方法:用**斯德哥尔摩远东古物馆(MFEA)一件实物的科学检测**,对照"经科学发掘的红山玉"。

**这就是本件的 wow moment 工程底座(原则 C)**:震旦/CMA 标"红山",**都是基于风格归属**;而这一整类"玉神人"**没有一件经科学发掘出土**。馆方说明牌不会写这句,但 AI 能 surface。

### 3b · 南华大学《中國新石器時代玉龍初探》
**chunk**:`source_class=C` · `fetch_status=ok` · `httpx->pdf` · **license=unknown** · **tier=mid** · `excerpt_truncated=True` · `raw_path=…/C-048339eb.pdf`

> license=unknown → 同上,可 surface 不可分发。

江美英(南华大学),《通識教育與跨域研究》第六期(2009-06,pp.77–92)。从"料、工、形、纹"四维比较**红山、良渚、凌家滩、石家河四地出土玉龙**的异同。**注意:这篇讲的是玉龙,不是玉神人兽**——属于**红山玉器系统的旁证学术背景**,不能拿来直接描述本件;价值在于它示范了与震旦"古器物学(料工形纹)"同一套方法论的学界版本。**原文更长,见 raw_path,本处不续写未见内容。**

### 3c · Childs-Johnson《Jades of the Hongshan culture》PDF
**chunk**:`source_class=C` · `fetch_status=ok`(但 **0 chars extracted**)· `curl->pdf` · **license=unknown** · **tier=low** · `raw_path=…/C-e3d41a9e.pdf`

**license=unknown + tier=low + 正文 0 字** → 按硬门**只列 URL + 标题,不引正文**:
- 标题:*Jades of the Hongshan culture*(Elizabeth Childs-Johnson)
- URL:`https://echildsjohnson.wordpress.com/wp-content/uploads/2011/11/jadesofthehongshanculture.pdf`
- 状态:fetch 名义 ok,但 curl(LibreSSL/TLS workaround)抓回后**文本抽取 0 字**(notes: "WARN: 0 chars extracted")。**内容未到手,不引用任何观点**。

---

## 4. 来源 D · 现场场域

**chunk**:`source_class=D` · `fetch_status=ok` · `httpx->html` · **license=(c)all-rights** · **tier=mid** · `raw_path=…/D-b8470539.html`
**有正文截录**(all-rights → 研究性引用,不可分发)。

澎湃·震旦官方《**观展手账——〈玉神人兽像〉**》(AM 文创号)。这是 7 条 ok chunk 里**唯一逐件描述本件造型**的源,本件识别全靠它:

> *"这件玉神人兽像为**圆雕造型,头上树立角状物,左右生有立耳,耳下有横向对穿的钻孔,脸上浮雕五官,额间、后脑及后颈下方阴刻网格纹**,是红山文化玉器中常见的装饰纹样。整体造型神秘奇特,宛若沉思之状。"*

文中昵称本件"**黄浦江畔的沉思者**"。其余内容是文创周边(笔记本 68 元、明信片、吴棠海《红山玉器》图册 550 元)——**属现场场域/衍生品语料,不是器物学描述**,据实标明、不拔高。

**张力点(原则 C)**:连最贴近本件的馆方文案,叙事重心也是"神秘奇特、沉思之状"+ 卖周边;**对"这件从哪儿出土、是不是真红山"零触及**。馆方场域叙事 = 美学+文创,海外学界叙事 = 真伪+地层学,二者**在同一件器物上完全不相交**——这正是要交付给用户的"叙事网络"裂缝。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**chunk**:`source_class=E` · `fetch_status=ok` · `playwright->html` · **license=(c)all-rights** · **tier=mid** · `raw_path=…/E-d31e3056.html`
**有正文截录**(all-rights → 不可分发)。

中国国家博物馆 2020《**玉出红山——红山文化考古成就展**》专题页正文(馆长王春法序)。**这是跨展览对照,不是震旦本件的源**,价值在于提供"红山=经科学发掘的国家叙事"这一极。原文要点:

- 红山文化"距今约 6500—5000 年前……西辽河流域",**牛河梁遗址**"坛庙冢"祭祀建筑群 + 玉器,被作为"中华民族五千年文明史……有力物证"。
- 展品"160 余件","碧玉 C 形龙""玉玦形龙""玉斜口筒形器""玉勾云形器"等——**全部强调"考古出土""最新考古成果"**。
- 序言带有明确的政治框架(引述领导人关于文物考古的指示、"以史育人""民族凝聚力")。

**双重张力(原则 C,这是本件最强的产品素材)**:
1. **国博 vs 海外学界**:国博这一极建立在**牛河梁科学发掘**之上(底气十足);而 OCS/Michel Lee(第 3a)说"博物馆+私人收藏的玉神人**没一件经科学发掘**"。**国博展的是出土红山,震旦展的是风格归属红山**——同叫"红山",证据等级不同,馆方都不点破。
2. **国家叙事 vs 器物本体**:E 类源把红山玉直接接到"中华文明起源/民族复兴"宏大框架,这正是原则 C 要 surface 的"博物馆叙事背后的权力结构"——可直接对照 A 类震旦页"中华文明起源时闪烁灵光"的同构修辞。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| **5 类源实际到手几类?** | **5 / 5 类都有 ≥1 条 ok chunk**(A·B·C·D·E)。这是 3 件 pilot 里类齐全度最好的一次 night-run——但**质量分布极不均**(见下)。 |
| **各 chunk tier + license + 形态** | A:mid / all-rights / **有正文(不可分发)**;B:mid / **CC0(可分发)** / 有正文;C-OCS:mid / unknown / 有正文(不可分发);C-玉龙:mid / unknown / 有正文(旁证·不可分发);C-CJ:low / unknown / **正文 0 字·仅 URL**;D:mid / all-rights / **有正文(不可分发)**;E:mid / all-rights / 有正文(不可分发)。 |
| **真正能进主语料的有几条?** | **1 条**:chunk B(CMA 1953.628,CC0)。其余 6 条要么 all-rights、要么 unknown license、要么抽取失败——**只能做"馆方叙事 surface"用,不能分发**。这是本件诚实的硬约束。 |
| **pipeline 可自动化的部分** | A/D/E 大陆馆方页这次靠 **playwright/httpx 实际抓到了正文**(比 5 月手做版的全 403 是实质进步);B 海外 OA via_vpn 抓取干净。**100% agent 完成的是"取数据";license 合规分级与张力 surface 仍需人确认**。 |
| **bundle 完整度自评** | **类齐全(5/5)但可分发深度低(1/6 可入语料)**。本件价值不在"语料量",在**叙事张力**:馆方/国博/海外学界三方对"红山归属"的证据态度截然不同,且互不点破。 |
| **给 PM 的 wow moment(一句话)** | "震旦说这件玉神人兽像是红山;国博隔壁那个展用牛河梁的科学发掘证明红山有五千年——可瑞典策展人在 OCS 讲座里说,博物馆里所有这类'玉神人',没有一件是科学发掘出土的,全靠风格判断。三块说明牌,三种底气,谁都没提另外两块。AI 把这三块并排放给你看。" |

## 7. 反向发现 / 该展品不工作的源

- **failed chunk(class C · MDPI)**:`https://www.mdpi.com/2076-0752/12/5/206` *Jade for Bones in Hongshan Craftsmanship*,**license=CC-BY(原则上最干净可分发的 OA)**,但 `fetch_status=failed`,`failure_reason=edge_blocked_akamai`。notes 原文:Akamai/Cloudflare 边缘墙对 httpx 与 headless Chromium 都返回 JS challenge / `errors.edgesuite.net` 页,**全文未取到,需真实交互浏览器会话(超出 night-run 范围)**。→ 这是本件最可惜的一条:**应分发的 CC-BY 全文被 CDN 反爬挡住**,建议 PM 用真人浏览器会话补抓。
- **class C · Childs-Johnson PDF**:fetch 名义 ok 但**文本抽取 0 字**(curl->pdf,LibreSSL workaround)。等同未到手,**已按硬门降级为仅 URL+标题**。建议换 pdf 解析路径或人工重抓。
- **本件馆藏编号 / accession**:7 条 ok chunk **0 条**给出。震旦为私立馆,公开页无系统化 ID——与 5 月手做版盘点一致。
- **本件考古出处**:chunk 内**无任何发掘记录**;A/D 馆方叙事回避,C 海外学者明示"该类从未科学发掘"。**这不是缺陷,是本件的核心叙事素材**(原则 C)。
- **可分发性整体偏低**:6 条有正文的 ok chunk 里,**5 条因 all-rights 或 unknown license 不可入主语料**;唯一可分发的是 CMA(CC0)那条对照件,而它与本件并非同型。→ ADR-006 应把"私立馆 + 大陆媒体 + 学者个人站/学会页"这一组合标为**典型的'能 surface 不能分发'区**。
- **license=unknown 的两条 C 源(OCS、玉龙 PDF)**:按硬门虽有正文也仅作 surface,**未来需人工核 license 才能决定能否分发**。

---

**主要来源(全部追得到本件 ok chunk;failed 单列)**:
- 震旦"灵光"特展页(class A · all-rights · ok):`https://www.auroramuseum.cn/zh/temporary-exhibitions/1008`
- CMA 1953.628 Amulet…Bovine Head(class B · **CC0** · ok · 可分发):`https://www.clevelandart.org/art/1953.628`
- OCS《Jade Humanoid Figures》讲座(class C · unknown · ok):`https://orientalceramicsociety.org.uk/events/jade-humanoid-figures-a-look-into-possible-hongshan-culture-origins`
- 澎湃·震旦《观展手账──〈玉神人兽像〉》(class D · all-rights · ok):`https://www.thepaper.cn/newsDetail_forward_23410012`
- 国博《玉出红山》专题页(class E · all-rights · ok):`https://www.chnmuseum.cn/portals/0/web/zt/202010ychsh/`
- 南华大学《中國新石器時代玉龍初探》PDF(class C · unknown · ok · 旁证):`https://libap.nhu.edu.tw:8081/Ejournal/2011000604.pdf`
- Childs-Johnson《Jades of the Hongshan culture》PDF(class C · unknown · tier=low · **正文 0 字·仅 URL**):`https://echildsjohnson.wordpress.com/wp-content/uploads/2011/11/jadesofthehongshanculture.pdf`
- **[failed]** MDPI Arts《Jade for Bones in Hongshan Craftsmanship》(class C · **CC-BY** · **failed: edge_blocked_akamai**):`https://www.mdpi.com/2076-0752/12/5/206`

**[ aurora-hongshan-jade · night-run AI 装订完 · 2026-06-07 · Compiler ]**
