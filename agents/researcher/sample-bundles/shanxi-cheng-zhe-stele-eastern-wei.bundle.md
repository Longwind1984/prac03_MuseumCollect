# Sample Bundle · 程哲碑（造像碑，仿石窟式样，造像碑与墓志一体） · 山西博物院（佛风遗韵 · 北朝风貌单元）

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-cheng-zhe-stele-eastern-wei)

> 反幻觉声明:本 bundle 只引用本件 artifact_id 且 fetch_status=ok 的 chunk(共 4 条:A×2、B×1、C×1,均 fetch_status=ok,均 confidence_tier=mid)。license_observed=unknown 的 chunk(C、B)按硬规则只截录其页面已自带的文字,不旁证、不脑补、不近似拼合。本件无 fetch_status=failed 的 chunk;凡"未到手"处均显式标出。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 程哲碑(造像碑,仿石窟式样,造像碑与墓志一体) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵 · 北朝风貌单元 |
| 朝代 / 公元年范围 | 东魏 天平元年(534)— 朝代/纪年来自 exhibit-list 选品论证与馆方报道,**非 chunk 内文逐字确认**(见下注) |
| 材质 | 青石(腾讯报道列"程哲碑(青石、仿石窟式样、造像碑与墓志一体)";chunk A-9d33 正文截录段落本身未复述此句,见 §1 诚实说明) |
| 已知 accession / 编号 | **未找到**。山西博物院官网藏品库走 /sx/collection/detail/id/<N> 路由,本件真实 id 未锁定 |
| 已知来源 / 出处 | 长治东呈村出土,"东魏第一石刻"(来自 exhibit-list 选品论证,非 chunk 内文) |
| 检索关键词 | 程哲碑 / 山西博物院 / 佛风遗韵 / 东魏 / 造像碑 / 墓志 / 仿石窟 / 长治 / Cheng Zhe stele / V&A O74102 / Northern Wei stele |

**选它的理由(原则 C / D)**:程哲碑把"造像碑 + 墓志"合为一体,是"地方士族借佛教造像彰显门第"的物证——北朝士族信仰与权力结构的切片(原则 C)。它的海外对照件不是同一件流散,而是 V&A 一件 520 年北魏四面造像碑(O74102),提供"山西在馆士族碑 vs 伦敦流散道旁碑"的跨馆张力(原则 D)。

---

## 1. 来源 A · 馆方一手页面

本件命中两条 A 类 chunk,均 fetch_status=ok、license_observed=(c)all-rights、confidence_tier=mid。两条都**不是真正的馆方单件页**,诚实区分如下。

### A-1 腾讯新闻"打卡全国省级博物馆4:山西博物院"
- **chunk**:source_class=A,url=`https://news.qq.com/rain/a/20240825A06JEF00`,fetch_status=ok,license=(c)all-rights,tier=mid。**有正文截录**(excerpt_truncated=true,原文更长见 raw_path `data/raw/shanxi-cheng-zhe-stele-eastern-wei/A-9d339749.html`)。
- **性质**:这是媒体打卡长文,被 discovery 选作"存在性证据"——其 rationale 记录"WebFetch 提取确认佛风遗韵列有'程哲碑'(青石、仿石窟式样、造像碑与墓志一体),确认在馆"。
- **诚实说明(关键)**:JSON 里这条 chunk 的 **excerpt_or_metadata 截到的 1500 字是这篇长文的开头**(从"黑神话悟空带火山西旅游"讲到文明摇篮、夏商踪迹的青铜器),**截录段落本身并未出现"程哲碑"三字**。"程哲碑在馆 + 青石 + 仿石窟式样"这一判断来自 discovery 阶段 WebFetch 对全文(非本截录段)的提取,记录在 chunk 的 source_title / notes 里。
  - 据 license=(c)all-rights,本节不整段转述其正文,仅标 URL 与"在馆"这一已被 discovery 记录的结论。
  - 截录段落里能逐字引用、且与本件语境相关的只有馆方层面的背景:山西博物院 2023-04-01 完成基本陈列全面改造,新陈列以"晋魂"为主题,4 楼设佛教造像等艺术专题展厅——这是程哲碑所在"佛风遗韵"陈列的母语境。
- **license=(c)all-rights → 不做长篇转录,只锚结论 + URL。**

### A-2 山西博物院官方藏品库(路由模板,非本件页)
- **chunk**:source_class=A,url=`https://www.shanximuseum.com.cn/sx/collection/detail/id/8210`,fetch_status=ok,license=(c)all-rights,tier=mid。excerpt_truncated=false。
- **诚实说明(关键)**:这条 chunk 抓到的页面**不是程哲碑,而是 id=8210「义尊」(西周一级文物)**。截录正文是该路由模板渲染出的导航菜单 + 义尊条目("义尊/西周/一级文物,敞口,方唇,扉棱发达...2019年5月山西省公安机关从香港追回/长32cm高34cm")。
- 它在 bundle 里的唯一作用:**证明 `/sx/collection/detail/id/<N>` 路由可达且字段完整**(年代/材质/尺寸/等级俱全)。**程哲碑的真实 id 本次 night-run 未锁定**,故无法给出馆方单件 URL。
- **PM 需补查**:在馆方站内检索框用"程哲碑"定位真实 id;在拿到精确 id 前,A 类按硬规则不升级为 museum_page_confirmed,本件 A 类整体停在 reportage_confirmed。

**A 类小结**:两条 ok chunk 都到手,但**没有一条是程哲碑本件的馆方一手详情页**——一条是媒体长文(且截录段未含本件名),一条是异件(义尊)的路由样例。馆方对程哲碑的一手单件描述 = **未到手**,原因:本件真实 collection id 未锁定(museum_homepage_not_confirmed)。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

- **chunk**:source_class=B,url=`https://collections.vam.ac.uk/item/O74102/`,fetch_status=ok,license=**unknown**,tier=mid,via_vpn=true。**有正文截录**(excerpt_truncated=true,raw_path `data/raw/.../B-ee90180a.html`)。
- **硬规则**:license=unknown → 本节只列 URL + 标题 + 该页**自身已渲染出的客观著录字段**,不做超出页面文字的转述,不脑补。

**V&A O74102「Stele」(China, Room 44)**——页面自带著录(逐字来自 chunk excerpt):
- Materials and techniques:Carved limestone
- Brief description:"Stele, carved limestone, China, Northen Wei dynasty (386–535), dated AD 520"
- Physical description:四面佛教石柱,主像一面为释迦(Sakyamuni)结跏趺坐,另一面为文殊(Manjusri)与维摩诘(Vimalakirti);**26 名信众出资,姓名分行刻于柱体下部**;柱上有含纪年的题记。
- Summary(页面原文要点):此四面灰岩柱是 V&A 最重要的佛教石刻之一;**立于华北陕西南部一条道路旁**,据柱上题记其用意是"让一切过路者无需偏离脚步即可瞻仰佛容,让在此歇脚的旅人无需另觅他径即可礼敬圣像..."。
- Credit line:Purchased with Art Fund support, the Vallentin Bequest, Sir Percival David and the Universities China Committee。

**跨馆张力(原则 C / D)**:
- 这**不是程哲碑的流散件**,是一件独立的北魏(520)四面造像碑。两件都是"造像碑 + 题记(供养人/墓志性文字)合体"的同一类器物,相隔约 14 年(O74102=520,程哲碑=534,东魏天平元年)。
- 可对照的恰是**两套叙事位置**:程哲碑在山西博物院"佛风遗韵"陈列里,被框进"地方士族佛教化"的国家级专题叙事;O74102 是一件原本"立在陕南道旁、供过路人随手礼拜"的民间道旁碑,如今被购藏进 V&A 的"China, Room 44"。同一类器物——士族/邑社出资的造像碑——一件留在原省入馆陈列,一件经 Art Fund 等购藏流散到伦敦。这正是"在馆建制叙事 vs 流散件去语境化"的对照点。
- **license=unknown,故以上只引页面自带著录,未续写截录之外的内容。**

---

## 3. 来源 C · 学术论文 / 学者文章

- **chunk**:source_class=C,url=`https://ygx.sxu.edu.cn/db/学位/Y639660.pdf`,fetch_status=ok,license=**unknown**,tier=mid。**有正文截录**(excerpt_truncated=true,raw_path `data/raw/.../C-bc66f4d0.pdf`)。
- **硬规则**:license=unknown → 列 URL + 标题 + 摘要级要点,不整段照搬、不超出截录。

**《河洛地区北朝佛教造像碑研究》**(郑州大学硕士学位论文,刘莉莉,指导教师宫大中,2004;PDF 托管于山西大学库 ygx.sxu.edu.cn,编号 Y639660)。

诚实定位:**这篇论文不直接研究程哲碑,也不研究山西(它的对象是河洛/河南地区)**。它对本件的价值是**形制学语境**——它系统描述了与程哲碑同时段、同器类(北朝造像碑)的共性特征。截录摘要里与程哲碑可对话的要点:
- 造像碑是"佛教单体石造像的一种,北朝盛行的民间佛教造像形式之一",将印度题材技艺与中国石刻传统、少数民族审美与汉文化融合。
- 碑龛形制以"螭龙顶长方体扁平状碑"为本地典型,自北魏晚期出现,至东西魏、北齐北周兴盛——**这正是程哲碑(东魏)所处的形制谱系**;龛形以帷幔式方形龛、尖楣拱形龛最具特色。
- 题材受洛阳龙门 + 河北南北响堂山两大风格影响,以释迦、弥勒、三世佛、释迦多宝并坐、七佛为主,另有胁侍、护法、供养人、佛经故事。
- 按风格演变分两期:北魏后期至东西魏(本件所属)风格明显"汉化",人物多"秀骨清像";北齐北周受邺都影响转向"丰满健壮"。
- 造像题记"既保留大量史料,又再现北朝书法艺术风貌"——与程哲碑"造像 + 书法 + 墓志一体"的卖点同构。

**为什么这条对原则 C 有用**:论文把造像碑明确定性为"**民间**佛教造像形式"、"供养人多头戴笼冠表现普通民众审美"——这给程哲碑的"地方士族碑"叙事提供了一个学术对照轴:它到底是"民间集资"还是"士族门第工程"?馆方"佛风遗韵"陈列若强调前者(民众信仰)、弱化后者(士族权力),就是一个可被 surface 的叙事选择。**注:此对照是 bundle 层面的分析提示,论文原文并未点名程哲碑,不可当作论文对本件的直接论断。**

- **license=unknown,故仅摘要级转述,未逐句照搬;原文更长见 raw_path。**

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。**

verified_chunks.json 中本件**没有任何 source_class=D 的 chunk**(无现场导览音频、izi.TRAVEL 频道、观众实拍长文等)。exhibit-list 对本件标注的覆盖是 `mid·ABC`——即选品阶段就只规划了 A/B/C 三类,D/E 未列入候选。现场场域信息(说明牌实拍、展厅动线、观众视角)需 PM 在馆内或大陆媒体长文中补采。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

本件无 source_class=E 的 chunk。exhibit-list 标注 `mid·ABC`,数字人文/跨域 OA(如造像碑题记→CBETA 经文映射、书法字例库、3D 数据)未进入本件候选。可作为 PM 补源方向:程哲碑"集造像与书法双绝",题记文本若能 OCR 入库,是少见的"佛教图像 + 北朝书法 + 墓志文本"三栖数字人文切片。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 有 ok chunk**(A、B、C);**D、E 无候选(no candidate sourced)** |
| 各 chunk 的 tier + license + 内容形态 | A-1 腾讯报道:tier=mid / license=(c)all-rights / **有正文截录但截段未含本件名**,只锚"在馆"结论;A-2 馆库路由:tier=mid / (c)all-rights / **正文是异件「义尊」**,仅证路由可达;B V&A O74102:tier=mid / **license=unknown** / 有正文截录,只引页面自带著录;C 河洛论文:tier=mid / **license=unknown** / 有正文截录,摘要级转述 |
| 本件 bundle 完整度自评 | **中-偏低**。三类源都"到手了一条 ok chunk",但**没有一条真正是程哲碑本件的一手描述**:A 没有本件馆方页(id 未锁)、A 截段未含本件名;B 是同类异件(非流散件);C 是异地(河洛)同类形制研究。本件目前**靠跨件/同类语境拼,不靠本件直证**。 |
| 给 PM 的 wow moment(一句话) | "**程哲碑这件'造像碑+墓志一体'的东魏石刻,本身就是地方士族把门第刻进佛教功德的物证;而伦敦 V&A 那件 520 年的四面造像碑,据它柱上题记原本只是'立在陕南道旁、让过路人随手礼拜'的民间道旁碑——同一类器物,一件被山西博物院收进'佛风遗韵'的国家专题叙事,一件被 Art Fund 购藏进伦敦 Room 44。AI 能把这两套叙事位置并排摆给你看,而你走过展厅时只看得到其中一边。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **本件无 fetch_status=failed 的 chunk**——4 条 chunk 全部 fetch_status=ok。下列是"ok 但不命中本件"的诚实问题,以及未到手的源类:
- **A 类馆方单件页:实质未到手。** `/sx/collection/detail/id/<N>` 路由已验真(id/8210=义尊 GET 200,字段完整),但**程哲碑真实 id 本次 night-run 未锁定**。失败链路记录在 exhibit-list:Wayback CDX 对该域返回空、Zhihu 403、silkroads.org.cn 返回 000、官方 list/search 端点 404(SPA 路由)。→ 标 museum_homepage_not_confirmed,PM 需站内检索框补查 id。
- **A-1 截录段落与本件名不对齐。** 腾讯报道 chunk 的 1500 字截段是文章开头(青铜/史前部分),**未逐字出现"程哲碑"**。"在馆 + 青石 + 仿石窟"来自 discovery 阶段对全文的 WebFetch 提取(记录在 source_title/notes),非本截录段。引用时已据此降级,不把全文结论当作截段直证。license=(c)all-rights 进一步限制只能锚结论、不能长录。
- **A-2 抓到的是异件。** id=8210 是义尊(西周),不是程哲碑;这条只证路由可达,不证本件内容。
- **B / C 的 license=unknown。** V&A O74102 与河洛论文两条均 license=unknown,故只列著录/摘要、不长篇转录;V&A 条款需 PM 确认(via_vpn=true,本机经 VPN 抓取)。
- **B 不是流散件,C 不是本地件。** 必须诚实区分:V&A O74102 是同类**异件**(北魏 520,陕南道旁碑),不是程哲碑的流散部分;河洛论文研究的是**河南**造像碑,不直接论及程哲碑或山西。两者都只能提供"同类形制/同类叙事"的对照,不能当作本件的一手证据。
- **D、E 两类:no candidate sourced。** 选品阶段(exhibit-list 标 mid·ABC)未规划 D/E,故无现场场域、无数字人文/跨域 OA 候选。本件题记书法(造像+书法+墓志三栖)是数字人文的天然切口,建议 PM 列入补源。

---

**主要来源(全部 fetch_status=ok)**:
- 腾讯新闻《打卡全国省级博物馆4:山西博物院》:`https://news.qq.com/rain/a/20240825A06JEF00`(A / (c)all-rights / 截段未含本件名,只锚"在馆")
- 山西博物院藏品库路由样例(id/8210=义尊):`https://www.shanximuseum.com.cn/sx/collection/detail/id/8210`(A / (c)all-rights / 异件,证路由)
- V&A O74102「Stele」:`https://collections.vam.ac.uk/item/O74102/`(B / license unknown / 同类异件对照)
- 《河洛地区北朝佛教造像碑研究》(刘莉莉,郑州大学硕士论文,2004):`https://ygx.sxu.edu.cn/db/学位/Y639660.pdf`(C / license unknown / 同类形制语境)

**[ Sample Bundle · 程哲碑 · night-run 2026-06-07 完 · Compiler ]**
