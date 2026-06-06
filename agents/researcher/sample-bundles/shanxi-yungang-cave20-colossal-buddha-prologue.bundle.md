# Sample Bundle · 云冈第二十窟大佛(佛风遗韵序厅核心展示 / 昙曜五窟系) · 山西博物院

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-yungang-cave20-colossal-buddha-prologue)

> 本件本质是一个**序厅意象**而非一件可拿在手里的馆藏:山西博物院"佛风遗韵"以云冈第 20 窟露天大佛作序厅核心,但大佛本体在大同武州山、不在太原展厅。所以这份 bundle 测的不是"一件展品的元数据全不全",而是 **pipeline 能否替一个"叙事锚点"拼出它的权力史与跨石窟对照** —— 这恰好是原则 C / D 最吃重的一种件。
> 本件 night-run 共 3 条 chunk,**全部 fetch_status=ok**(E 维基 / B Met / C 澎湃),无 failed chunk。**A、D 两类无 candidate sourced**(见第 7 节)。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 云冈第二十窟大佛(佛风遗韵序厅核心展示 / 昙曜五窟系) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵(中国古代佛教造像专题陈列)· **序厅核心意象**(大佛本体在大同云冈,非太原展厅内) |
| 朝代 / 公元年范围 | 北魏(昙曜五窟开凿始于和平元年,460 年)— 见来源 C/E chunk |
| 材质 | 砂岩石窟造像(武州山砂岩;来源 C chunk 提"武州山与武威天梯山均为砂岩结构") |
| 已知编号 | 云冈石窟编号第 16–20 窟为"昙曜五窟",本件为第 20 窟(来源 C/E chunk);世界遗产参考编码 1039(来源 E chunk) |
| 已知来源 / 出处 | 北魏皇室主持开凿;昙曜上奏文成帝开窟五所(来源 C/E chunk) |
| 检索关键词 | 云冈石窟 / 昙曜五窟 / 第二十窟 / 露天大佛 / 帝佛合一 / 武州山 / 大同 / 北魏 / Yungang / 孝文帝礼佛图 / 龙门宾阳中洞 |

**为什么选它(承原则 C/D)**:昙曜五窟 16–20 窟被论为分别象征北魏五帝,是"帝佛合一"国家意识形态最赤裸的物化。选它正中原则 C(觉察叙事背后的权力结构)—— 一座佛像同时是一位皇帝。这给序厅一个不"超市化"的开场。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

candidate 清单(sources_candidates.full30.json)对本件只给了 B/C/E 三类,**没有为本件 source 任何 A 类(馆方一手页)候选**;verified_chunks.json 中本件也无 A 类 chunk。这与 exhibit-list 对山西博物院整体的诚实标注一致:山西博物院官网藏品详情为 SPA 路由、本机检索未能锁定任一佛教造像的真实 collection id。

更根本的是:**本件没有"馆方单件页"可言** —— 它是序厅的一个空间意象,大佛实体属云冈石窟研究院(大同),不属山西博物院藏品库。若要补 A 类,应改向**云冈石窟研究院官方**或**山西博物院"佛风遗韵"展览页**取材,而非藏品详情页。此为 PM 补查项。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk**:source_class=B · license=**CC0** · tier=**mid** · fetch_status=ok · 有正文截录(JSON 元数据)
**URL**:https://collectionapi.metmuseum.org/public/collection/v1/objects/42707

The Met objectID **42707**,实查返回(节录自 chunk 的 excerpt JSON):

| 字段 | 值(逐字取自 chunk) |
|---|---|
| title | "Emperor Xiaowen and his entourage worshipping the Buddha" |
| objectName | Relief Panel |
| period | Northern Wei dynasty (386–534) |
| objectDate | ca. 522–23 |
| medium | Limestone with traces of pigment |
| dimensions | H. 82 in. (208.3 cm); W. 12 ft. 11 in. (393.7 cm) |
| accessionNumber | 35.146(accessionYear 1935,Fletcher Fund) |
| isPublicDomain | true |
| primaryImage | https://images.metmuseum.org/CRDImages/as/original/DP170138.jpg |

**与本件的对照论证(承原则 C/D)**:这是龙门石窟宾阳中洞的"孝文帝礼佛图"浮雕,1935 年入藏 Met。云冈第 20 窟把皇帝化进佛身(帝佛合一);三十年后迁都洛阳,龙门宾阳中洞改用另一种语法 —— 让皇帝**排着仪仗去礼佛**。同一套"佛—权力"叙事从平城(云冈)走到洛阳(龙门),从"皇帝即佛"变成"皇帝拜佛"。这件 Met 浮雕是这条叙事位移在海外的物证,且 CC0 公有领域可直接调图 —— **是本件最强的跨馆 / 跨石窟对照锚点**。

> 注:chunk 的 excerpt 在 json 里截到 1500 字(excerpt_truncated=true),完整 JSON 见 raw_path `data/raw/shanxi-yungang-cave20-colossal-buddha-prologue/B-d3ab915d.json`。本节只引截录可见字段,未续写未见内容。

---

## 3. 来源 C · 学术论文 / 学者文章

**chunk**:source_class=C · license=**(c)all-rights** · tier=**mid** · fetch_status=ok · 有正文截录(版权所有,下为短引 + 转述)
**URL**:https://m.thepaper.cn/baijiahao_7697483(澎湃《凉州籍高僧昙曜与云冈石窟》)

> ⚠️ **版权提示**:本源 license_observed=(c)all-rights(澎湃版权所有)。tier=mid、license 非 unknown,按硬规则可短引;但最终 bundle 仅作内部 demo 转述,不得整段转载。

chunk 截录支撑的事实(逐条追得到 excerpt 原文):
1. **昙曜其人**:籍贯凉州(一说罽宾,今克什米尔一带),约卒于 487–489 年间;少年出家修禅、坚守戒律。北魏太武灭佛(太平真君七年,446 年)时,他"誓欲守死……密持法服器物,不暂离身"。
2. **权力线**:文成帝兴安即位、复兴佛教后,特任昙曜为**沙门统**(管理平城僧众)。chunk 引《魏书·释老志》:"和平初,师贤卒。昙曜代之,更名沙门统。"
3. **开窟史**:chunk 引《魏书·释老志》:"昙曜白帝,于京城西武州塞,凿山石壁,开窟五所,镌建佛像各一。高者七十尺,次六十尺,雕饰奇伟,冠于一世。" —— 即今云冈第 16–20 窟。
4. **凉州—平城的工匠迁徙**:据《晋书》,北魏灭北凉(439 年)后迁姑臧城内"僧人工匠 3000 人、老百姓 3 万户到平城",昙曜在迁徙僧团之中。这是云冈砂岩造像技术的凉州来源。

**承原则 C 的张力提示**:这篇澎湃长文的开篇是 2020 年最高领导人考察云冈、强调"铸牢中华民族共同体意识"的政治框架。**这正是原则 C 要 surface 的东西** —— 同一座大佛,北魏拿它做"帝佛合一",当代官方叙事拿它做"民族共同体"。两套权力叙事相隔一千五百年,套在同一块砂岩上。bundle 不替任何一方站台,只把这层叙事性指出来。

> 注:excerpt_truncated=true,完整正文见 raw_path `data/raw/shanxi-yungang-cave20-colossal-buddha-prologue/C-933c3590.html`,本节未续写截录之外内容。

**跨件共享源(仅作指针,不引正文)**:本仓库另有 ok 的 **山西大学云冈学知识库**(ygx.sxu.edu.cn)PDF,chunk 标在别件(guanyin-pentad / nannieshui-pagoda / longmen-buddha-head)。该域名是"云冈学"专题库、与本件高度切题,**可作 C 类补强指针**;但已到手的那几篇 PDF 内容聚焦青州造像与造像碑类型学,**不直接讲第 20 窟**,故此处只列指针、不引正文。PM 可在该库内按"第二十窟 / 昙曜五窟"再检索。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。**

candidate 清单未为本件 source 任何 D 类(现场 / izi.TRAVEL / 公众号长文 / 场域音视频)候选,verified_chunks.json 中本件亦无 D 类 chunk。

工程含义:本件作为序厅意象,最自然的 D 类是**山西博物院"佛风遗韵"序厅的现场说明牌 / 导览**与**云冈石窟现场**两处,二者都需现场或国内 IP 取材,night-run 沙箱未覆盖。此为 PM 现场补采项。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**chunk**:source_class=E · license=**CC-BY-NC-SA** · tier=**mid** · fetch_status=ok · 有正文截录
**URL**:https://zh.wikipedia.org/zh-hans/雲岡石窟(维基百科"云冈石窟"条目)

chunk 截录支撑的事实(逐条追得到 excerpt):
- **世界遗产底座**:参考编码 1039,2001 年(第 25 次会议)登录,面积 348.75 公顷;1961 年列第一批全国重点文物保护单位。坐标 40°06′36″N 113°07′21″E,山西大同云冈区。
- **窟群结构**:东(塔洞)/ 中(昙曜五窟,开凿最早、气魄最大)/ 西(迁洛后晚期)三部分;主要洞窟 51 个,造像 51000 多尊,最大佛像高 17 米。
- **昙曜五窟编号**:chunk 原文"开窟五所(今称为昙曜五窟,编号为 16-20)",与来源 C 互证。
- **风格史**:开凿初期"带有浓厚犍陀罗及笈多王朝的色彩……脸形较为丰腴、肉髻较高、鼻子较高";孝文帝高峰期佛像服饰"近似于南朝士大夫的穿著",五官"世俗化、汉人化"。

**承原则 D 的网络连接**:维基这条做的是"数字人文底座" —— 它把第 20 窟放进一张可机读的网(世界遗产编码、坐标、窟号、风格谱系),让 pipeline 能把"犍陀罗 / 笈多 → 云冈 → 孝文帝汉化"这条样式迁移线,和来源 B 的"云冈帝佛合一 → 龙门礼佛图"那条权力迁移线**接成同一张知识结构网**。这正是 bundle 要交付的"展品之间的关系",而非单件信息。

> 注:license=CC-BY-NC-SA,引用需署名维基且非商用;excerpt_truncated=true,完整条目见 raw_path `data/raw/shanxi-yungang-cave20-colossal-buddha-prologue/E-ff153fc8.html`。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 到手且有正文截录**:B(Met CC0)、C(澎湃 (c)all-rights)、E(维基 CC-BY-NC-SA),**全部 fetch_status=ok**。**A、D 两类 no candidate sourced**(非抓取失败,是 night-run 未为本件投放候选)。 |
| 各 chunk 的 tier + license | B:mid / **CC0**(最干净,可直接调图);E:mid / CC-BY-NC-SA(署名非商用);C:mid / **(c)all-rights**(版权所有,仅短引)。三条全部 mid tier,**无 low**;**无 license=unknown**,故三条均可引正文。 |
| 哪些可 100% agent 自动化 | B(Met JSON API,via_vpn=true)+ E(维基静态 HTML)= 纯 agent;C(澎湃静态 HTML)= agent 取回但版权受限,只能转述。 |
| 必须人在回路 | A(改向云冈石窟研究院 / 山博展览页)+ D(序厅现场 + 云冈现场)两类需 PM 国内 IP / 现场补采。 |
| 完整度自评 | **中**。叙事骨架(帝佛合一权力史 + 跨石窟对照 + 数字人文底座)三条腿齐全且互证,足以撑起序厅;但缺馆方一手与现场两类,且 B 是龙门对照件、非云冈本体的海外件。 |
| 给 PM 的 wow moment(一句话) | "**这件大佛同时是一位皇帝 —— 昙曜五窟把北魏五帝化进了五尊佛身;三十年后皇室迁都洛阳,龙门宾阳中洞那块『孝文帝礼佛图』改让皇帝排着仪仗去拜佛,如今 CC0 躺在大都会博物馆。AI 把平城的『皇帝即佛』和洛阳的『皇帝拜佛』接成同一条权力叙事的位移线 —— 你站在山博序厅那尊大佛前看不到这条线,但 pipeline 看到了。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **本件无 failed chunk**:verified_chunks.json 中本件 3 条全部 fetch_status=ok,无失败需诚实记录的抓取项。
- **A 类(馆方一手):no candidate sourced** —— 根因是本件是"序厅意象"而非馆藏单件,**山西博物院藏品库里根本没有这件的单件页**;且山博官网为 SPA、本机未锁定任何佛教造像真实 collection id(与 exhibit-list 对山博的整体诚实标注一致)。补法不在山博藏品库,而在**云冈石窟研究院官方**或**山博"佛风遗韵"展览页**。
- **D 类(现场场域):no candidate sourced** —— 序厅说明牌与云冈现场都需国内 IP / 现场,night-run 沙箱未投候选。
- **跨件共享源的边界**:山西大学云冈学知识库(ygx.sxu.edu.cn)虽切题且 ok,但已到手 PDF 不直接讲第 20 窟,**不能拿来当本件正文**,只能作 C 类补查指针 —— 宁可标"仅指针、未到手具体段落",不"近似拼合"。
- **B 类的诚实边界**:Met 42707 是**龙门**宾阳中洞的对照件,**不是云冈第 20 窟本体的海外流散件**(露天大佛本体未流散、仍在原址)。它是"叙事对照"而非"同物对照" —— bundle 不能把它说成"本件的海外另一半"。

---

**主要来源(全部取自 verified_chunks.json 本件 ok chunk)**:
- 维基百科"云冈石窟"(E,CC-BY-NC-SA,mid):https://zh.wikipedia.org/zh-hans/雲岡石窟 · raw: `data/raw/shanxi-yungang-cave20-colossal-buddha-prologue/E-ff153fc8.html`
- The Met objectID 42707 "Emperor Xiaowen and his entourage worshipping the Buddha"(B,CC0,mid):https://collectionapi.metmuseum.org/public/collection/v1/objects/42707 · raw: `data/raw/shanxi-yungang-cave20-colossal-buddha-prologue/B-d3ab915d.json`
- 澎湃《凉州籍高僧昙曜与云冈石窟》(C,(c)all-rights,mid):https://m.thepaper.cn/baijiahao_7697483 · raw: `data/raw/shanxi-yungang-cave20-colossal-buddha-prologue/C-933c3590.html`
- 跨件共享源指针(未引正文):山西大学云冈学知识库 ygx.sxu.edu.cn(chunk 标于别件)

**[ Sample Bundle · 云冈第二十窟大佛 · night-run 2026-06-07 完 ]**
