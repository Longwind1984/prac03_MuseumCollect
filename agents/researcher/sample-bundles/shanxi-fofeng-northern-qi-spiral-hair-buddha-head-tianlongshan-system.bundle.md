# Sample Bundle · 北齐 螺发佛头(天龙山系造像,高33.5cm) · 山西博物院

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-fofeng-northern-qi-spiral-hair-buddha-head-tianlongshan-system)

> **本件抓取概览**:本件在 verified_chunks.json 共 4 条 chunk,**全部 fetch_status=ok**(B×1 / D×1 / E×2)。A 类(馆方一手)、C 类(学术论文)**无 candidate 入库**。下文每节均标 tier + license,并诚实区分"有正文截录 / 仅元数据 / 仅 URL / 未到手"。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 北齐 螺发佛头(天龙山系造像,高33.5cm) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵 · 北朝风貌单元 |
| 朝代 / 公元年范围 | 北齐(550–577) |
| 材质 / 尺寸 | 砂石/石质螺发佛头,高 33.5cm(名称所载;馆方一手未到手,本件本体材质未由任何 ok chunk 证实) |
| 已知 accession / 编号 | **本件(山西博物院在地件)未找到**;海外对照件 Met objectID 42715 / accession 51.52 已确认 |
| 已知来源/出处 | 天龙山系(天龙山石窟,东魏始凿、北齐续凿,太原西南 36 公里);本件具体窟号未由 ok chunk 锁定 |
| 检索关键词 | 天龙山 / Tianlongshan / 螺发佛头 / 佛首 / 北齐 / Northern Qi / 流散 / 数字复原 / Tianlongshan Caves Project / 巫鸿 / Katherine Tsiang / C.T. Loo / 卢芹斋 |

**说明(反幻觉)**:exhibit-list 第 11 行记此件"出土后曾被误判为唐代杰作、后定为北齐精品",并称材质为砂石——但**该叙述来自选品清单(strategy-curator),不在本件任何 ok chunk 内**,故不在正文展开,仅作识别栏背景。本件**馆方一手描述、说明牌文字、本体尺寸/材质的一手确证均未到手**。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

sources_candidates.full30.json 中本 artifact_id 下**无 A 类(source_class=A)candidate**——即 Discovery 阶段未为本件登记任何山西博物院官方页面 URL。verified_chunks.json 中本件也无 A 类 chunk。

工程含义:本件是"在地件在山博、流散对照件在海外"的典型形态。山博官网针对单件造像的结构化页面在 Discovery 阶段未被定位/入库,A 类需 PM 早晨回路补 candidate(国内 IP 抓山博官网 + 说明牌实拍)。在 A 类落地前,本 bundle 对"馆方叙事"一侧是**空的**——这正是下面 D/E 海外学术叙事"单边发声"的来源,需在评估节诚实标注。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**chunk**:source_class=B · fetch_status=ok · **tier=mid** · **license=CC0** · fetch_method=httpx→json
**URL**:https://collectionapi.metmuseum.org/public/collection/v1/objects/42715
**raw_path**:data/raw/shanxi-fofeng-northern-qi-spiral-hair-buddha-head-tianlongshan-system/B-de7fa75d.json
**有正文截录(JSON 元数据,CC0,可引用)**

The Met objectID 42715,标准化字段(均来自 chunk 内 JSON):

| 字段 | 值 |
|---|---|
| title | Head of a bodhisattva |
| period | Northern Qi dynasty (550–577) |
| objectDate | ca. 565–75 |
| medium | Limestone with pigment |
| dimensions | H. 32 in. (81.3 cm); W. 17 1/2 in. (44.5 cm); approx. D. 12 in. (30.5 cm) |
| accessionNumber / accessionYear | 51.52 / 1951 |
| creditLine | **Gift of C. T. Loo, 1951** |
| department | Asian Art |
| isPublicDomain | true(CC0) |
| primaryImage | https://images.metmuseum.org/CRDImages/as/original/DP170268.jpg |

**为什么这条是核心张力点(原则 C)**:这件北齐菩萨头的 creditLine 是 **"Gift of C. T. Loo, 1951"**——卢芹斋。一个 provenance 字段本身就是一段流散史:海外馆方用中性的"捐赠/Gift"措辞收纳的,正是 20 世纪上半叶经古董网络流出的造像。Met 的页面把它呈现为"亚洲艺术部一件可公开域(CC0)的菩萨头";本件在山博则是"佛风遗韵"叙事里的一尊在地造像。**同一类器物,两套叙事框:一边是 art object + 捐赠人署名,一边是民族造像史**——这是 surface 给用户的第一组对照,而不需要替任何一方下道德结论。

**截录边界**:Met JSON 在 json 中截到 1500 字(excerpt_truncated=true),尾部 geography/excavation 等字段为空串后被截断;完整记录见 raw_path,本节不续写未见字段。注:本件名称为"佛头(Buddha head)",Met 42715 为"菩萨头(bodhisattva head)"——是**同窗口同流散网络的近邻对照件,非同一尊**,不可当作本件本体的等价描述。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

本 artifact_id 下无 C 类 candidate,verified_chunks.json 也无 C 类 chunk。

补充(不越界):E 类的 CAEA 项目页(下节 5)由 Katherine Tsiang / 巫鸿主持,带有学术方法论色彩,可部分替代"学者语境";但它在数据里登记为 source_class=E(数字人文站),**不计入 C 类已到手**。严格学术论文(故宫院刊、BMFEA、专著章节等)对本件**仍是空缺**,需 PM 回路补 candidate。

---

## 4. 来源 D · 现场场域

**chunk**:source_class=D · fetch_status=ok · **tier=mid** · **license=(c)all-rights** · fetch_method=httpx→html
**URL**:https://sx.chinadaily.com.cn/a/202409/20/WS66ed58b3a310a792b3abd3d8.html
**raw_path**:data/raw/shanxi-fofeng-northern-qi-spiral-hair-buddha-head-tianlongshan-system/D-22c80235.html
**有正文截录(中国日报山西 2024-09 报道,excerpt 截到 1500 字)**

> **license 提示**:本条 license_observed=(c)all-rights(全版权)。按硬门,**low/unknown 才降级为仅 URL**;本条 tier=mid 不属降级档,故可引正文,但行文以转述要点为主、不整段搬运受版权文本。

这篇报道把本件所属的天龙山系"佛首流散→数字归位→实体回归"三段叙事补全(原则 C),chunk 内可追溯的事实点:

- 天龙山石窟群位于太原西郊,别名"无头石窟"——佛首与身体碎片散落世界各地,是中国境内摧残破坏程度最为严重的石窟之一。
- 石窟开凿于东魏(534–550)至唐(618–907);贾晨(太原市文物保护研究院副院长)称其造像形成了独特的"天龙山样式",是佛教石窟逐渐本土化的典型实例。
- 流散链条:1908 年德国建筑师恩斯特·柏石曼到访;1921 年日本考古学家关野贞在《国华》刊调查报告后引发广泛关注;1924–1925 年盗凿洗劫殆尽。日本古董商山中定次郎是主要罪魁,盗取佛首后"合法"售予世界各地藏家与博物馆。
- 数量:chunk 称天龙山 240 余尊造像被盗凿,基本所有佛首被切除;目前在美国、日本、瑞士、意大利、荷兰、德国、法国、加拿大等地约 160 个佛像可确定来自天龙山。
- 数字回归:2014 年起中美科研人员合作收集流失海外佛首的数字信息;太原理工大学艺术学院学术院长赵慧谈数字复原对保留历史文化记忆的意义。
- **叙事张力点(原则 C)**:报道引 2021 年芝加哥大学东亚艺术中心主任巫鸿讲座"以艺术的名义:破坏与重构"——他批评以西方为中心的视觉艺术研究"无视文化的完整性",指出佛像在亚洲是信仰与日常生活的一部分,而非西方眼中供端详、收藏、研究的"艺术品";并把东亚文物破坏与西方/日本殖民政策相联系。

**为什么这条值钱**:它是本 bundle 里唯一带"现场场域 + 中文公共叙事"的源。它和来源 B 的 Met"Gift of C. T. Loo"形成最直接的对撞——**B 用一个署名字段把流散写成捐赠,D 用一整段报道把同一过程写成劫掠**。这正是产品要 surface 的"馆方叙事 vs 海外学术/民族叙事"张力(原则 C/D),而本件因 A 类缺位,这组对撞目前是"D/E 海外学术叙事一侧充分、山博馆方一侧暂缺"的不对称状态——评估节会标。

**截录边界**:excerpt 截到 1500 字(excerpt_truncated=true),末句停在"当石…";完整见 raw_path,不续写。

---

## 5. 来源 E · 数字人文 / 跨域 OA

本件 E 类有 **2 条 ok chunk**,均 tier=mid / license=CC-BY-NC-SA / fetch_method=httpx→html,是本件最权威的数字复原对照源。

### 5.1 Tianlongshan Caves Project 官方站
**URL**:https://tls.uchicago.edu/ · **tier=mid** · **license=CC-BY-NC-SA**
**raw_path**:data/raw/.../E-fe4d1e0c.html · **有正文截录(excerpt_truncated=true)**

chunk 内可追溯要点:天龙山(Heavenly Dragon Mountain)石窟位于山西中部、太原西南 36 公里;今日残损严重、大量造像缺失,参观者已无从想象旧观;许多造像现存于世界各地博物馆,但脱离了原初的历史、空间与宗教语境。芝加哥大学艺术史系东亚艺术中心(CAEA)于 2013 年启动 Tianlongshan Caves Project,做石窟与造像的研究及数字成像,目标是记录归档造像、编纂可识别碎片及其原属位置的数据。该 chunk 还提及该区古称并州(Bingzhou)/晋阳(Jinyang),自东周已为历史城市,6 世纪石窟营建时晋阳为"次都"性质(原文在 1500 字处截断)。

### 5.2 CAEA 项目主页(方法论 + 流散语境)
**URL**:https://caea.uchicago.edu/projects/long-term-projects/tianlongshan-caves-project · **tier=mid** · **license=CC-BY-NC-SA**
**raw_path**:data/raw/.../E-143e56f6.html · **有正文截录(excerpt_truncated=false,本段为完整 excerpt)**

chunk 全文要点:天龙山项目是继响堂山(Xiangtangshan)佛教石窟项目之后的延伸,是关于天龙山佛教石窟的国际合作研究,产出了中国境外造像及石窟本身的图像与 3D 模型数据库。天龙山石窟营建于 6–8 世纪,与响堂山一样,其造像在 20 世纪早期遭严重破坏、多被取走流入国际艺术市场。项目成果包括:把昔日造像图像与其原属窟位相匹配、对石窟做数字重建、对现存于中国境外的破损造像做修复(数字归位);成果以网站发布,并于 **2019 年 9 月在太原市博物馆**做了大型展览。

**为什么 E 是本件 wow moment 的工程底座(原则 D)**:这两条 chunk 提供的不是"单件多信息",而是**关系网**——同一窟号 → 散落 N 个海外馆的索引能力。它与响堂山项目同源(CAEA 的"先响堂、后天龙"链条),意味着山博这尊在地佛头,可经天龙山项目数据库与其"失散的同窟兄弟"做虚拟拼合。这正是"跨馆流散件聚合"(原则 C/D)能落地的数据基础。**注意双语站点的 license=CC-BY-NC-SA**:可引文字、可深链,但 3D 模型本体复用受 NC 限制,产品侧不能直接搬运模型资产。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **3 / 5 实际到手**(B 有 CC0 正文元数据 + D 有正文截录 + E 两条有正文截录);**2 / 5 完全空缺**(A、C 均 no candidate sourced) |
| 各 chunk 的 tier + license | B:mid / CC0(可引)· D:mid / (c)all-rights(可转述,不整段搬)· E-5.1:mid / CC-BY-NC-SA(可引文字、NC 限模型)· E-5.2:mid / CC-BY-NC-SA(完整 excerpt) |
| 失败 chunk | **0 条 failed**;本件 4 条全部 fetch_status=ok |
| 哪些可 100% agent 自动化 | B Met JSON API(CC0,最干净)· E 两条静态 HTML(via_vpn=True)· D 中国日报山西(via_vpn=False,沙箱可达) |
| 哪些必须人在回路 | **A 山博官网/说明牌**(no candidate,PM 国内 IP 补)· **C 学术论文**(no candidate,PM 补故宫院刊/BMFEA/专著) |
| 完整度自评 | **中**——海外/数字人文侧(B/D/E)很密且全 ok,但**馆方在地侧(A)与严格学术侧(C)双缺**,叙事是"海外学术单边充分"的不对称形态 |
| 给 PM 的 wow moment(一句话) | "**山博这尊北齐螺发佛头,旁边说明牌不会告诉你它的同窟兄弟此刻在哪——但 Met 那件北齐菩萨头的来源栏写着『Gift of C. T. Loo, 1951』,芝大天龙山项目的数据库正把这些散到八个国家、约 160 尊的佛首一一数字归位;你站在这尊『有头』的造像前,AI 能拼出那片『无头石窟』和它流散的全网。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **A 类(馆方一手)= 空缺,原因:no candidate sourced**。Discovery 未为本件登记任何山西博物院官方 URL。后果:本 bundle 缺"馆方叙事"一侧,无法做"说明牌为何这样写、不写另一种"(原则 C)的直接对照——目前只能呈现海外/数字人文一侧。**最高优先回路项**。
- **C 类(学术论文)= 空缺,原因:no candidate sourced**。无故宫院刊/BMFEA/专著章节入库。E 类 CAEA 页带学术色彩但登记为 E,不补 C 的位。
- **本件本体的一手确证缺失**:材质(砂石)、高 33.5cm、"曾误判为唐"等说法仅见于 strategy-curator 选品清单,**无任何 ok chunk 佐证**,故正文未采信,仅列识别栏背景。本件的窟号、出土经过亦未被任何 ok chunk 锁定。
- **同名不同件风险(已规避)**:Met 42715 是"菩萨头(bodhisattva)",非本件"佛头(Buddha)";为同窗口同流散网络的近邻对照件,已在来源 B 标注,不得当作本件本体描述。
- **license 限制**:D(中国日报)为(c)all-rights,产品侧只能转述要点、不能整段搬运;E 两条为 CC-BY-NC-SA,3D 模型资产受 NC 约束,不能直接复用。
- **0 条 failed chunk**:本件无抓取失败记录可报——失败面体现在"两类源根本没有 candidate",而非"抓了没抓到"。

---

**主要来源(本件 ok chunks)**:
- Met objectID 42715 *Head of a bodhisattva*(B,CC0):`https://collectionapi.metmuseum.org/public/collection/v1/objects/42715`
- 中国日报山西《天龙山石窟佛首的数字回归与重生》(D,(c)all-rights):`https://sx.chinadaily.com.cn/a/202409/20/WS66ed58b3a310a792b3abd3d8.html`
- Tianlongshan Caves Project 官方站(E,CC-BY-NC-SA):`https://tls.uchicago.edu/`
- CAEA 项目主页(E,CC-BY-NC-SA):`https://caea.uchicago.edu/projects/long-term-projects/tianlongshan-caves-project`

**[ Sample Bundle · 北齐 螺发佛头(天龙山系) · Compiler night-run 2026-06-07 完 ]**
