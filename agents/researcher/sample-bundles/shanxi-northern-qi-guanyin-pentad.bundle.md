# Sample Bundle · 北齐观音菩萨五尊像(华塔村出土) · 山西博物院

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:`data/pipeline/out/verified_chunks.json`(artifact_id=`shanxi-northern-qi-guanyin-pentad`)

> 装订口径(反幻觉硬门):本 bundle 只引用本件 `artifact_id` 且 `fetch_status=ok` 的 chunk;`license_observed=unknown` 或 `confidence_tier=low` 的 chunk **只列 URL+标题、不引正文**;缺类显式标注;`failed` chunk 在第 7 节如实写失败原因。本件共 6 条 chunk:**5 ok + 1 failed**,覆盖 A / C / D / D / E 五条,**B 类源 0 条**。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 北齐观音菩萨五尊像(华塔村出土) |
| 馆 / 厅 | 山西博物院 · 「晋魂」基本陈列「佛风遗韵」展厅(北朝风貌单元) |
| 朝代 / 公元年范围 | 北齐(550–577) |
| 材质 / 尺寸 | 石(具体材质/尺寸**未在本件任一 ok chunk 中给出**) |
| 已知 accession / 编号 | **未到手**(本件无任一 chunk 给出馆藏号) |
| 已知来源/出处 | 华塔村出土(出自 `exhibit-list.md` 标注;**本件 ok chunk 内未复述"华塔村"字样**——见下注) |
| 检索关键词 | 山西博物院 / 佛风遗韵 / 北朝风貌 / 北齐 / 观音 / 五尊像 / 华塔村 / 晋阳轴 / 邺城模式 / 青州样式 |

**装订诚实注**:
- 本件是 3 件 pilot 之一,**不在 `sources_candidates.full30.json` 的 candidates 内**;名称取自 night-run 交接清单与 `exhibit-list.md` 第 1 行(「北齐观音菩萨五尊像(华塔村出土)」/「佛风遗韵」/「晋阳轴」)。
- 馆方一手页面(chunk A)抓到的是「佛风遗韵」展厅**整体器物清单表**,表中**没有**一行字面写「观音五尊像」或「华塔村」——最接近的是第 7 行「白石雕菩萨立像 北齐天保四年(569年)」。因此**本件的精确馆藏定位在 ok chunk 里尚未坐实**,这一点必须对 PM 透明,不得用展厅泛叙叙事"近似拼合"成本件描述。

---

## 1. 来源 A · 馆方一手页面

**chunk**:`A-379146f5.html` · `source_class=A` · `fetch_status=ok` · `confidence_tier=mid` · `license_observed=(c)all-rights` · URL `https://www.shanximuseum.com/sx/exhibition/exhibition/id/4079`
**到手形态**:**有元数据(器物清单表),无策展正文**。

山西博物院「佛风遗韵」展览页(id/4079)抓回的是一张**展品清单表**(序号/名称/时代/质地/数量/来源/备注)。因 license 为 all-rights,以下仅作为**馆方公开的器物元数据**转录,不二次解读:

| 序号 | 名称 | 时代 | 质地 | 数量 | 来源 |
|---|---|---|---|---|---|
| 1–5 | 四面造像塔 | 北朝 | 石 | 各 7 | 山西省沁县南涅水村出土 |
| 6 | 晋人写经 | 东晋 | 纸 | 1 | 山西省太原市征集 |
| 7 | 白石雕菩萨立像 | 北齐天保四年(569年) | 石 | 1 | (来源栏空) |
| 8 | 释迦立像 | 东魏 | 石 | 1 | 山西省交城县王村慈民寺征集 |
| 9 | 交脚弥勒菩萨像 | 东魏 | 石 | 1 | 山西省大同市征集 |
| 10 | 释迦立像 | 北周 | 石 | 1 | 山西省万荣县征集 |
| 11 | 周亮智造释迦立像 | 北周天和四年(569年) | 石 | 1 | 山西省稷山县大郝村征集 |
| 12 | 菩萨立像 | 北齐 | 石 | 1 | 山西省平遥县岳壁村征集 |

**对本件的意义(诚实标注)**:
- 这张表**确实是馆方一手页面**,但**它没有锁定本件「观音五尊像」**——表里既无"观音"也无"五尊",也无"华塔村"。**本件与表中哪一行对应、是否就是第 7 行,在 ok chunk 范围内无法证实**。
- 工程含义:`id/4079` 是展览页而非藏品详情页(`source_title` 自带提示「先抓 robots.txt 核合规,再看能否枚举 collection/detail/id/{N}」)。**要坐实本件,需要顺着 detail/id/{N} 枚举到单件详情页**——这一步本次未做到。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**B 类源未到手,原因:no candidate sourced**(本件在 `verified_chunks.json` 中 B 类 chunk 数 = 0,Discovery 阶段未为本件投放任何海外 OA 跨馆候选)。

工程笔记:本件「华塔村出土 / 晋阳轴」是 1954 年太原出土的"一坑多尊"组合(`exhibit-list.md` 第 8 行记其姊妹件「释迦七尊像」同坑同窗口、并标了 metmuseum.org / CMA 线索),理应存在海外流散对照件的发现空间;但**该线索来自 `exhibit-list.md`,不来自本件任一 chunk**,按硬门不在此引为正文,仅作为"B 类应补投候选"的 Discovery 待办登记。真正的跨馆对照在本件**尚是空白**。

---

## 3. 来源 C · 学术论文 / 学者文章

本件有 2 条 C 类 chunk:1 条 ok(license unknown)、1 条 failed。

### 3.1 山西大学云冈学知识库学位论文 · ok 但 license=unknown → 仅列 URL+标题
**chunk**:`C-445ef620.pdf` · `source_class=C` · `fetch_status=ok` · `confidence_tier=mid` · `license_observed=unknown` · `excerpt_truncated=true` · URL `https://ygx.sxu.edu.cn/db/学位/D798549.pdf`
**标题(抓到)**:《青州龙兴寺北齐佛教造像研究》(硕士学位论文)

> license 为 unknown → **按硬门只列 URL+标题,不引正文**。该 PDF 抓到了摘要级文本(主题为"青州样式"北齐造像的造型/技法/着色),但其与本件「晋阳轴 / 华塔村」组合的直接相关性**未在元数据层确认**——青州属山东半岛,与晋阳轴并非同一造像谱系,**不能作为本件的对照学术依据**。仅登记 URL 供 PM 人工判读相关性。

### 3.2 社科院考古《东魏北齐佛教造像艺术与邺城模式》· failed
见第 7 节。

**对本件的意义**:学术层目前**0 条可引正文**——唯一 ok 的 C 类因 license 未知被门掉,且谱系相关性存疑;另一条 failed。**本件的学术覆盖在本次为空。**

---

## 4. 来源 D · 现场场域

本件有 2 条 D 类 chunk,均 ok,但**只有 1 条带真实正文**。

### 4.1 腾讯新闻「佛风遗韵」展馆分享 · ok · 有正文截录
**chunk**:`D-b2a9da18.html` · `source_class=D` · `fetch_status=ok` · `confidence_tier=mid` · `license_observed=(c)all-rights` · `excerpt_truncated=true` · URL `https://news.qq.com/rain/a/20230907A04WHD00`
**到手形态**:**有策展叙事正文**(license all-rights、tier=mid,可引用作展厅语境,但**不是本件的单件说明牌**)。

抓到的是「佛风遗韵」改陈后的**展厅总述**,几条与本件**同展厅语境**(非单件描述)的馆方原话:

- 展厅定位:「『佛风遗韵』展厅面积983平米…分为序厅、『北朝风貌』『大唐气度』和『宋明世相』三个单元,展出…文物144件(组),其中40件为新增重量级展品,浓缩了北朝至明清1500余年间山西地区的佛教艺术,见证了佛教中国化、世俗化的历史进程。」
- 馆方叙事框架:「在展览结构上,更加突出**佛教中国化**不同阶段在山西地区的发现和成就。」
- 展陈手法:「选择石窟和庙堂两种展览方式营造展陈氛围…从序厅进入第一单元,仿佛走进佛教洞窟,气势恢宏的**云冈石窟第二十窟大佛**迎面而来…」

**叙事张力(原则 C/D)**:这条馆方原文把山西北朝造像史**装订进一条"佛教中国化 / 世俗化"的主线**——一个自上而下、强调"在山西地区的发现和成就"的国家级叙事框架。它**全程不提"流散""被盗""海外收藏"**。把它与第 5 节那条芝大响堂山的 chunk 并置,正是本件最值得 surface 的对照:**同一个北齐佛教造像世界,馆方叙事讲的是"中国化的成就史",海外学术项目讲的是"被切割盗运、流散欧美日台的损毁史"。** 这不是谁对谁错,而是叙事视角与权力位置的差别——这正是该展品能承载原则 C 的地方。

**诚实边界**:此 chunk 的正文是**展厅级**的,**没有一句直接描述本件「观音五尊像」**(它详写的单件是万荣解氏弥勒坐像的唐/宋跨代题记,与本件无关)。因此它只能作为**本件所在展厅的策展语气样本**,不能当作本件说明牌。

### 4.2 知乎现场观展 · ok 但正文是反爬拦截 → 仅列 URL+标题
**chunk**:`D-2d2bb04e.html` · `source_class=D` · `fetch_status=ok` · `confidence_tier=mid` · `license_observed=(c)all-rights` · URL `https://zhuanlan.zhihu.com/p/696076437`
**到手形态**:`fetch_status` 虽为 ok,但 `excerpt_or_metadata` 实际是知乎反爬返回的 JSON:`{"error":{"message":"您当前请求存在异常,暂时限制本次访问…","code":40362}}`。**无任何正文** → 仅登记 URL+标题(「现场观展」),不引。这是一个"抓取成功但内容是拦截页"的典型坑,Discovery 的 `fetch_status=ok` 判定**未识别软封禁**。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**chunk**:`E-36ce9d1d.html` · `source_class=E` · `fetch_status=ok` · `confidence_tier=mid` · `license_observed=unknown` · `excerpt_truncated=true` · `via_vpn=true` · URL `https://xts.uchicago.edu/zh-hans/content/概览`
**标题(抓到)**:芝加哥大学「响堂山项目」概览(邺城轴跨域对照)
**到手形态**:**license=unknown → 按硬门只列 URL+标题,不引正文。**

> 这条是本件唯一一条经 VPN 才抓到(`via_vpn=true`)的境外数字人文源。**因 license_observed=unknown,硬门要求不引正文**——故此处**不**转录其关于"流散一百多件造像散布欧洲/日本/台湾/美国""1909 年起劫掠"等内容。仅登记:芝大响堂山项目是北齐邺城轴造像的**跨馆流散件聚合数据库**,其概览页可达(VPN),内容待 license 核定后方可引用。

**对本件的意义(原则 D · 跨馆网络)**:即便不引正文,**这条 chunk 的存在本身**就指向本件最有价值的一层——北齐造像的"跨馆流散聚合"。响堂山项目对应的是**邺城轴**;而本件是**晋阳轴**(华塔村,太原)。**两轴并非同一石窟系统**,所以这条 E 类源对本件是"**邻域对照**"而非"直接出处"——它说明 pipeline 在该窗口能摸到跨域 OA 数据库,但**还没摸到晋阳轴/华塔村自己的那张流散聚合表**。诚实结论:E 类**到手了一个相邻坐标,没到手本件坐标**。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **形式上 4/5 有 ok chunk**(A / C / D / E),**B 类 0 条**。但按"可引正文"口径,**实际只有 1 类(D)交付了真实馆方正文**;A 仅器物清单元数据;C、E 因 license unknown 仅 URL;另一条 D 是反爬拦截页。 |
| 各 chunk 的 tier + license | A:mid / all-rights(元数据可列)。C-thesis:mid / **unknown**(仅 URL)。D-腾讯:mid / all-rights(**正文可引**)。D-知乎:mid / all-rights(内容=拦截页,仅 URL)。E-响堂山:mid / **unknown**(仅 URL)。C-社科院:**failed**。 |
| 本件完整度自评 | **低–中**。展厅语境(D)有了,但**单件「观音五尊像」本身的馆方描述、材质尺寸、馆藏号、跨馆对照——全部为空**。这与样本 1/2 的"白石佛立像"形成反差:那件有 V&A 自标响堂山的干净闭环,本件**连单件详情页都没枚举到**。 |
| 给 PM 的 wow moment(一句话) | **「馆方在『佛风遗韵』里把这段北齐造像史讲成一部"佛教中国化、世俗化的成就史",一个字不提流散;而我们顺着同一个北齐世界往外一摸,就摸到芝加哥大学响堂山项目——那边的同一段历史,标题叫『一百多件造像被切割盗运、流散欧美日台』。同一批石头,两种叙事,差的不是事实,是谁在讲、站在哪讲。」** |

---

## 7. 反向发现 / 该展品不工作的源

1. **社科院考古《东魏北齐佛教造像艺术与邺城模式》(C 类,failed)**
   - chunk:`source_class=C` · `fetch_status=failed` · `failure_reason=http_404_dead_url` · URL `http://kaogu.cssn.cn/zwb/kgyd/kgsb/201909/t20190903_4966923.shtml`
   - 实测:httpx 返回 403;curl(浏览器 UA)返回 nginx「404 Not Found」正文——**文章已在 cssn.cn 上迁移/过期**。Discovery 需重新寻找活镜像。这条是本件**唯一一条本应直接命中的学术源**(邺城模式正是北齐造像谱系核心),它的死链使本件学术层彻底落空。

2. **本件单件馆藏详情页 = 未枚举到**:A 类只到展览页 `id/4079`(器物清单),**没有走到 detail/id/{N} 单件页**,故本件**馆藏号、材质、尺寸、单件说明牌全部 0 条**。

3. **B 类(海外 OA 跨馆对照)= 候选未投放**:Discovery 没为本件生成任何 B 类候选,跨馆流散聚合在本件**完全空白**(尽管姊妹件「释迦七尊像」在 `exhibit-list.md` 已有 Met/CMA 线索可供补投)。

4. **知乎现场观展 = 抓到拦截页**:`fetch_status=ok` 但正文是反爬 JSON(code 40362)。**Discovery 的 ok 判定未识别"软封禁/拦截页"** —— 建议为 fetch 增加"拦截页指纹"校验,否则会把空内容误标为成功。

5. **license unknown 卡住两条最有价值的源**:C-thesis 与 E-响堂山均 ok 且有实质文本,却因 `license_observed=unknown` 被硬门挡在正文之外。**本件的瓶颈与样本 1/2 不同:不是沙箱 403,而是 license 未核定。** 建议 ADR-006 为这两类(高校学位库 PDF、境外大学数字人文项目)各做一次 license 性质判定,一旦判明可引,本件完整度可显著提升。

---

**主要来源(本件 ok chunk)**:
- 山西博物院「佛风遗韵」展览页(A,元数据可列):`https://www.shanximuseum.com/sx/exhibition/exhibition/id/4079`
- 腾讯新闻「佛风遗韵」展馆分享(D,正文可引):`https://news.qq.com/rain/a/20230907A04WHD00`
- 山西大学云冈学库《青州龙兴寺北齐佛教造像研究》(C,license unknown,仅 URL):`https://ygx.sxu.edu.cn/db/学位/D798549.pdf`
- 知乎现场观展(D,内容=拦截页,仅 URL):`https://zhuanlan.zhihu.com/p/696076437`
- 芝大响堂山项目概览(E,license unknown,仅 URL):`https://xts.uchicago.edu/zh-hans/content/概览`

**失败源**:
- 社科院考古 邺城模式(C,failed · http_404_dead_url):`http://kaogu.cssn.cn/zwb/kgyd/kgsb/201909/t20190903_4966923.shtml`

**[ Sample Bundle · shanxi-northern-qi-guanyin-pentad · night-run 2026-06-07 完 ]**
