# Sample Bundle · 北齐 释迦七尊像(1954年太原花塔村出土) · 山西博物院

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-fofeng-northern-qi-shakyamuni-seven-figure-altar-huata)

> 反幻觉声明:本 bundle 每段正文引用都追得到本件 artifact_id 且 fetch_status=ok 的某条 chunk 的 excerpt_or_metadata。本件共 4 条 chunk:1 条 failed(D 类 kpfans,504)、3 条 ok(D 腾讯 / B 大都会 / B 克利夫兰)。无 A、C、E 类候选源。**未到手的不补**。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 北齐 释迦七尊像(1954年太原花塔村出土) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵(中国古代佛教造像专题陈列)· 北朝风貌单元 |
| 朝代 / 公元年范围 | 北齐(550–577) |
| 材质 / 尺寸 | 砂石质、贴金彩绘、透雕背光(本件尺寸未在已到手 chunk 中给出;同坑同窗口件如"贴金彩绘释迦坐像 高40厘米"见腾讯长文,但**非本件**,不挪用) |
| 已知 accession / 编号 | **未到手**(山博官网为 SPA,本 night-run 未锁定任一佛教造像真实 collection id) |
| 已知来源 / 出处 | 太原晋源区花塔村(华塔寺废墟),距晋祠东北约 1.5 公里、难老泉泉域;1954 年铺设取水地下管道时出土 |
| 检索关键词 | 释迦七尊像 / 花塔村 / 华塔寺 / 晋阳 / 北齐 / 佛风遗韵 / 山西博物院 / Xiangtangshan / 响堂山 / 邺城 |

**为什么选它(承自 strategy-curator)**:与 pilot 件「观音菩萨五尊像」同坑同窗口的姊妹件——同为 1954 年太原花塔村(华塔寺废墟)一坑出土。本件把"一坑两尊"的流散与聚合叙事补全,直接承载用户原则 C(出土/埋藏背后的权力史)与原则 D(跨件、跨馆的知识结构网络)。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

本件在 sources_candidates.full30.json 中只挂了 1 条候选(D 类 kpfans),Discovery 未给出任何山博官方单件页 URL。这与 exhibit-list 中山博整组的诚实缺口一致:山西博物院藏品库为 SPA(`/sx/collection/detail/id/<id>`),本 night-run 未能锁定任一佛教造像的真实数字 id(Wayback CDX 空、官方 list/search 端点 404)。

→ 工程含义:本件的"存在性 / 本体描述"目前**只能靠 D 类馆方系媒体报道支撑**,没有可引用的馆方一手字段。**accession 与馆方页 URL 需 PM 在馆方站内用中文名「释迦七尊像」回填**。

## 2. 来源 B · 跨馆对照件(海外 OA)

到手 2 件海外 OA 真件,均 fetch_status=ok、license=CC0、tier=mid——**可引正文 / 元数据**。

| 馆 | accession / objectID | title | 产地 / 断代(馆方原文) | 与本件相似性 |
|---|---|---|---|---|
| The Met | objectID 61650(acc. 30.81) | Right hand of Buddha | `culture: China (Northern Xiangtangshan, North Cave)`;`Northern Qi dynasty (550–577)`;`ca. 550–560`;`Limestone with pigment and gilding`;尺寸 H. 52.1 cm | 同窗口、**馆方原文直接锁定响堂山北窟**;同为"石灰岩 + pigment + gilding",与本件砂石贴金彩绘走同一北齐邺城/响堂山造像模式 |
| Cleveland (CMA) | id 94676(1915.334.1) | Seated Amitayus Buddha | `c. 570s`;`China, Northern Qi dynasty (550–577)` | 北齐坐佛海外对照标杆;可与本件北齐佛体造型逐项比对(本件为坐于仰莲座的释迦) |

**张力点(原则 C/D)**:大都会这件只是**一只手**(Right hand of Buddha),却把产地清清楚楚标成"Northern Xiangtangshan, North Cave"——海外馆对一块残件都能给到窟号级 provenance;而本件作为整组七尊造像,在已到手数据里**连一个馆方 accession 都没有**。"一只手有窟号,一整坑没编号"——这正是馆方叙事与海外学术档案之间的不对称。

**诚实标注**:
- Met chunk 的 excerpt 在 JSON 里被截断(excerpt_truncated=True),已引用字段均出现在截录可见段内;`primaryImage` 高清图链接为 `images.metmuseum.org/CRDImages/as/original/DP170109.jpg`,CC0。
- CMA chunk 的 excerpt 实际只截到了页面骨架文字(标题 / 断代 / "Visually Similar by AI" / 勘误声明),**未含正文描述段**;故本件只引其断代与材质级元数据,不替它续写造型描述。

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

本件无任何 C 类候选(学术论文 / 学者文章)进入 sources_candidates。响堂山 / 邺城 / 曲阳白石方向在姊妹样本(上博白石佛)里曾命中故宫院刊、佛光山、Met *Wisdom Embodied* 等独立学术源;但**那些 chunk 的 artifact_id 不在本件名下,且本件 night-run 未对它们做跨件引用**。按反幻觉硬门,不把别件的学术链接挪到本件冒充"已到手"。

→ 工程含义:若要补 C 类,PM 可复用上博白石佛 bundle 已锁定的响堂/邺城院刊 PDF 直链,但需作为**跨件共享源**显式标注、且重新校验 URL 切题性。

## 4. 来源 D · 现场场域

到手 1 条 ok(腾讯新闻长文)+ 1 条 failed(kpfans 专文,见第 7 节)。

**腾讯新闻《晋祠侧畔花塔村,为什么埋藏有几十尊精美绝伦的佛造像》**
`https://news.qq.com/rain/a/20211207A00XIK00`
fetch_status=ok · tier=mid · **license=(c)all-rights**(版权所有 → 仅作来源指引与最小必要引用,不整段转载;原文更长,见 raw_path `data/raw/.../D-6b12ec7a.html`,excerpt_truncated=True)

这是本件唯一拿到正文的"现场/背景"源,直接支撑花塔村一坑造像的埋藏成因叙事(原则 C):
- 这批造像"都来自同一个地方:太原晋源区花塔村",距晋祠东北仅 1.5 公里,地处难老泉泉域;山博"佛风遗韵"展厅这一组材质有青石、汉白玉、砂石,年代横跨北齐、东魏、唐。
- 出土史有两条线索并存:清顺治五年(1648 年)菜农田茂凿井蓄水,意外掘出白石造像、"拖出一佛又现一佛"、当日得五尊次日又得二尊;以及 1954 年铺设化工厂从难老泉取水的地下管道时,山西省文物管理委员会在华塔寺废墟一带挖出石雕造像七十余尊,汉白玉居多。
- 1955 年《文物参考资料》郭勇《山西太原西郊发现石刻造像简报》记录了同坑邻件的纪年(武定三年、兴和二年背刻年号)——这把"花塔村一坑"放进了**东魏—北齐连续窗口**。

**叙事张力(原则 C)**:腾讯这篇把"为什么这几十尊会被埋进一个坑"当作主线——废寺、泉域、地下管道施工、菜农凿井——埋藏本身是一段被偶然性和水利工程反复扰动的历史。这正是说明牌通常**不写**的那一层:展厅给你"北齐 / 砂石 / 贴金彩绘",而坑的故事(谁埋的、为何埋、谁先挖出来)留在馆外的长文里。

**诚实区分**:腾讯长文虽是本件背景的最佳到手源,但它是**馆方系媒体的二手叙事**,且其逐尊配图(如"贴金彩绘释迦坐像 高40厘米""释迦头像 高33.5厘米")指向**同坑其它件**,不是本"七尊像"本体;本 bundle 未把这些他件尺寸安到本件头上。

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

本件无 E 类(数字人文 / 跨域 OA)候选进入 sources_candidates,本 night-run 也未自验证任何 E 类页面。芝大响堂山项目、国博邺城展专题页等在姊妹样本里被点名,但**均不在本件 chunk 名下**,不挪用。

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5 有正文截录**(B 跨馆对照 2 件 CC0;D 腾讯长文 1 件,all-rights 故最小引用)。A / C / E **三类 0 候选、0 到手**。 |
| 各 chunk 的 tier + license | Met 61650:tier=mid · **CC0**(可引);CMA 94676:tier=mid · **CC0**(仅截到骨架文字,引元数据);腾讯长文:tier=mid · **(c)all-rights**(可引但最小必要);kpfans:tier=mid · failed(无 excerpt) |
| 哪些可自动化 | B 跨馆对照(Met/CMA 单件 API/HTML 直取)= 100% agent;D 腾讯长文抓取 = agent(本次 httpx->html 即 ok) |
| 必须人在回路 | A 馆方页 accession + 本件馆方单件 URL(山博 SPA,需 PM 站内检索中文名回填 id);C / E 需 PM 决定是否引入跨件共享源 |
| 完整度自评 | **偏低**(三类源 0 候选)。本件的价值不在"源的广度",而在**一条干净的跨馆张力**:残手有窟号、整坑无编号。 |
| 给 PM 的 wow moment 一句话 | "你眼前这一坑北齐造像,馆里连件编号都没给齐;可大都会博物馆里一只北齐佛的右手,产地却精确标着『响堂山北窟』——同一个北齐造像世界,一只流散的手在纽约有窟号,一整坑在太原却没编号。" |

## 7. 反向发现 / 该展品不工作的源(含 failed chunk 的诚实原因)

- **kpfans 专文(D 类,本件唯一'本体描述底稿'候选)** — `https://www.kpfans.com/article/Ervbw8G39p.html`,fetch_status=**failed**,failure_reason:`504 Gateway Timeout`(源站偶发超时,httpx 单次)。这条本应是最贴本件的"释迦七尊像"逐项本体描述(仰莲座、全身贴金施赭红彩、舟形背光浮雕宝塔飞天、底座莲花化生托博山炉、背面彩绘佛像),但**正文未到手**,故本 bundle 全程未引用其任何描述——以上括注内容仅来自 chunk 的 source_title/notes 字段(候选元信息),**不是已抓取的正文**,PM 需重抓后方可作为本体描述底稿。
- **馆方 accession / 馆方单件 URL** — 0 条。山博官网 SPA,本 night-run 未锁定任何佛教造像真实 id。
- **A / C / E 三类** — sources_candidates 对本件根本没排候选源(no candidate sourced),不是抓取失败,是发现阶段就空缺。**这本身是给 ADR-006 的信号**:同坑姊妹件(观音五尊像)是 pilot、源更全,而本"七尊像"的源覆盖明显更薄;30 件不应承诺统一深度,应承诺"诚实标完整度,不灌水"。
- **同坑他件尺寸不可挪用** — 腾讯长文里多尊纪年/尺寸属花塔村同坑其它造像,非本件;已显式不拼合。

---

**主要来源**:
- 腾讯新闻《晋祠侧畔花塔村,为什么埋藏有几十尊精美绝伦的佛造像》:`https://news.qq.com/rain/a/20211207A00XIK00`(ok · all-rights · 仅最小引用 · raw `data/raw/shanxi-fofeng-northern-qi-shakyamuni-seven-figure-altar-huata/D-6b12ec7a.html`)
- The Met objectID 61650 *Right hand of Buddha*(Northern Xiangtangshan, North Cave):`https://collectionapi.metmuseum.org/public/collection/v1/objects/61650`(ok · CC0)
- Cleveland Museum of Art 1915.334.1 *Seated Amitayus Buddha*:`https://clevelandart.org/art/1915.334.1`(ok · CC0 · 仅骨架文字到手)
- kpfans《北齐·释迦七尊像(山西博物院)》:`https://www.kpfans.com/article/Ervbw8G39p.html`(**failed · 504 Gateway Timeout**)

**[ night-run AI 装订 · 2026-06-07 · 实到 2/5 类(B + D),正文 ok chunk 3 条 ]**
