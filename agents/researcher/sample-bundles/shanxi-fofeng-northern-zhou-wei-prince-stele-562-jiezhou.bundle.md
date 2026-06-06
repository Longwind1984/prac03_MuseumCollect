# Sample Bundle · 北周 卫秦王造像碑 / 卫超王造像碑(保定二年562年,运城解州镇出土) · 山西博物院 · 佛风遗韵

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-fofeng-northern-zhou-wei-prince-stele-562-jiezhou)

> **本件诚实底色(先说在前)**:这件只装订到 2 条已验证 chunk —— A 类馆方源根(山西博物院官网首页,`(c)all-rights` → 只列入口、不引正文)+ B 类海外跨件共享对照件(Met 40406,CC0 → 可引元数据)。C / D / E 三类**全无 candidate 被 sourced**,本件按硬门逐条显式标注"未到手"。这不是一件"拼得满"的展品,而是一件诚实暴露 pipeline 边界的展品。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 北周 卫秦王造像碑 / 卫超王造像碑(保定二年562年,运城解州镇出土) |
| 馆 / 厅 | 山西博物院 · 佛风遗韵(中国古代佛教造像专题陈列)· 北朝风貌单元 |
| 朝代 / 公元年 | 北周(保定二年,公元 562 年) |
| 材质 | 石刻造像碑(具体石材/尺寸未在已到手 chunk 中确认) |
| 已知 accession / 编号 | **未到手**(A 类馆方页只取到官网首页,未取得本件单件详情 id) |
| 已知来源 / 出处 | 运城解州镇出土;同地连出卫秦王、卫超王、陈海龙三碑(候选 rationale,见下文标注) |
| 检索关键词 | 山西博物院 / 佛风遗韵 / 卫秦王 / 卫超王 / 解州 / 运城 / 北周 / 保定二年 / 邑社 / 集体造像碑 / 集资造像 |

**为什么这件值得测(选品论证,来自候选 rationale)**:解州镇同地连出"卫"氏家族三碑,是地方豪族信仰网络的实物切片 —— 一个家族/邑社把集体信仰刻进石头,正对应 user-voice 原则 C/D(觉察叙事背后的权力结构 / 读知识结构网络,而非单件奇观)。但这条论证目前**只在候选 rationale 里**,尚未被任何到手正文 chunk 坐实,故只作"为什么选它",不作事实陈述。

---

## 1. 来源 A · 馆方一手页面

**到手 chunk**:1 条,`fetch_status=ok` · `confidence_tier=mid` · `license_observed=(c)all-rights`
**URL**:https://www.shanximuseum.com.cn/sx/index/index.html(playwright→html,已验证可达)
**raw_path**:data/raw/shanxi-fofeng-northern-zhou-wei-prince-stele-562-jiezhou/A-2962a0eb.html

**license 处理**:该 chunk 是山西博物院官网**首页**,`license_observed=(c)all-rights`(版权全留)→ 按硬门**只列入口 URL + 标题,不把首页正文当作本件展品描述引用**。

**这条 chunk 实际证明了什么(诚实区分)**:
- 它证明的是**馆方源根可达**、以及官网导航里"**佛风遗韵**"专题陈列确实存在(首页"基本陈列 → 晋魂陈列"列表中列出"佛风遗韵"为单元之一)。
- 它**没有**给到本件卫秦王/卫超王造像碑的单件详情页、说明牌文字、accession id 或图片。chunk 的 source_title 已自标降级原因:"北周三碑的单件详情 id 需 PM 在站内检索'卫秦王/卫超王/解州'定位,馆方页存在性高但当前未取得直链 id,故 A 类降级标注。"
- 首页正文里出现的"【北齐】释迦七尊像""【北齐】菩萨头像""【北魏】石雕方砚"等是**石刻精粹轮播**,**不含本件**,不可借用为本件描述。

**给 PM 的一手动作**:馆方藏品库路由 `/sx/collection/detail/id/<N>` 已被发现侧验真可达,但本件真实数字 id 未锁;PM 需用国内 IP 在站内检索框输入"卫秦王 / 卫超王 / 解州"回填单件 id + 说明牌 + 高清图。在拿到精确 id 前,A 类按硬规则**不升级**为 museum_page_confirmed。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**到手 chunk**:1 条,`fetch_status=ok` · `confidence_tier=mid` · `license_observed=CC0` · **跨件共享源**
**URL**:https://collectionapi.metmuseum.org/public/collection/v1/objects/40406(httpx→json,via_vpn=True)
**raw_path**:data/raw/shanxi-fofeng-northern-zhou-wei-prince-stele-562-jiezhou/B-dc4241dd.json
**excerpt 在 json 内截至 ~1500 字(`excerpt_truncated=True`),完整字段见 raw_path,以下仅引已见到的元数据,不续写未见内容。**

**license 处理**:`isPublicDomain=true → CC0` → **可引用元数据正文**。

**已到手的 Met 40406 元数据(逐字段,来自 chunk excerpt)**:

| 字段 | 值 |
|---|---|
| objectID | 40406 |
| objectName | Stele and base |
| title | Stele Commissioned by Helian Ziyue (赫蓮子悅) and a Devotional Society of Five Hundred Individuals |
| culture | China |
| period | Eastern Wei(excerpt 在此截断;source_title 与发现侧记 objectDate 标 "dated 533–43") |
| department | Asian Art |
| accessionNumber | 29.72(accessionYear 1929) |
| isPublicDomain | true(→ CC0) |
| primaryImage | https://images.metmuseum.org/CRDImages/as/original/DP228202.jpg(另有 13 张 additionalImages) |

**与本件的对照张力(原则 C/D)**:
- Met 40406 是一件**东魏(533–43)邑社"五百人"集体造像碑** —— 由 Helian Ziyue(赫莲子悦)与一个五百人规模的"造像邑社/义邑"集体出资发愿。
- 本件解州卫氏三碑,候选 rationale 把它定位为"地方豪族/邑社集中造像"。**两者构成同一制度的两个切片**:一边是海外馆藏、有名有姓的"五百人邑社"集体造像碑(Met,CC0,图像与发愿结构完整);一边是山西本地、家族集中连出三碑的邑社造像(馆方页未到手)。
- 这正是 pipeline 想要 surface 的那种结构:**"集体造像碑"作为北朝民间信仰组织的物证 —— 一块流到纽约、可公开下载高清,一块留在山西、连单件页都还没抓到。** 海外件的"可见"与本土件的"未到手"之间的落差,本身就是一条值得对用户讲的叙事(原则 C)。
- **边界自律**:Met 40406 是**对照件,不是本件**。两者年代不同(东魏 533–43 vs 北周 562)、不是同一造像碑。本节只做"制度对照",不做"同物拼合",不暗示二者出自同坑同窟。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

候选清单(sources_candidates.full30.json)对本件**只登记了 A、B 两类 candidate**,未登记任何 C 类学术源;verified_chunks.json 中本件也无任何 C 类 chunk。故本节无任何可引内容 —— 不旁证、不脑补、不借同专题其他展品的院刊 PDF 充数。

> PM 后续若要补 C:候选侧对"卫秦王/卫超王/解州三碑"的北周纪年造像碑做学术检索是合理方向,但**当前 bundle 不承诺、不预填**。

---

## 4. 来源 D · 现场场域

**D 类源未到手,原因:no candidate sourced。**

exhibit-list 对本件的预期密度标注为 `thin·ABD`,即设计上预期能拿到 A/B/D;但本次 night-run 实际**只装订到 A、B 两条 chunk**,D 类(现场报道 / 馆方公众号长文 / 音频导览等)**无 candidate 被 sourced,也无 chunk 落地**。本节如实记"未到手"。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

候选清单未对本件登记 E 类 candidate,verified_chunks.json 中本件无 E 类 chunk。本节无可引内容。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**(A 仅入口 URL+标题不引正文;B CC0 元数据可引)。C / D / E 三类 = 0,均"no candidate sourced"。 |
| 各 chunk 的 tier + license | A:`mid` / `(c)all-rights`(→ 仅 URL+标题);B:`mid` / `CC0`(→ 元数据可引,**跨件共享对照源**)。**两条都不是 high tier,本件没有任何 high-confidence 正文。** |
| 有正文截录 / 仅元数据 / 仅 URL | **有元数据正文**:B(Met 40406 字段);**仅 URL+标题**:A(馆方首页,版权全留);**仅 URL**:C/D/E 连 URL 都没有(未 sourced)。 |
| 完整度自评 | **低**。这是 night-run 三件中偏薄的一件 —— 馆方单件页未锁 id、学术/现场/数字人文三类空缺。 |
| 给 PM 的 wow moment(一句话) | "**这件北周造像碑馆方页我们连单件 id 都还没抓到,但 Met 上有一块东魏『五百人邑社』集体造像碑(CC0、14 张高清图、有发愿人赫莲子悦的名字)—— 同一种『一群普通人集资把信仰刻进石头』的制度,一块在纽约可随便下载,一块在山西连页面都还没打开。**" |

---

## 7. 反向发现 / 该展品不工作的源

- **本件无 failed chunk**:verified_chunks.json 里本件 2 条 chunk **全部 `fetch_status=ok`**,无 fetch 失败记录。
- **A 类馆方单件页"抓得到站、抓不到件"**:山西博物院官网为 SPA;`/sx/collection/detail/id/<id>` 路由发现侧已验真(样例 id 8210/961/展览页 1004 可达),但本件卫秦王/卫超王造像碑的**真实数字 id 未锁** —— Wayback CDX 对该域返回空、Zhihu 403、官方 list/search 端点 404(SPA 路由)。结论:**A 类只能给到官网首页源根 + 站内检索关键词,单件 id 必须 PM 国内 IP 站内检索回填**;在此之前 A 类不升级为 museum_page_confirmed。
- **C / D / E 三类系统性缺位**:不是抓取失败,而是**候选阶段就没为本件 source 这三类**(no candidate sourced)。pipeline 在这件上的真实形态是"A 源根 + B 一条海外对照",远不到一份成熟 bundle 的密度。
- **B chunk 自身的边界**:Met 40406 excerpt 在 ~1500 字截断(`excerpt_truncated=True`),`period` 字段恰好在 "Eastern Wei" 处被切;完整 objectDate("dated 533–43")来自 source_title 与发现侧验证记录,**完整 JSON 见 raw_path**,本 bundle 未续写截断后的未见字段。
- **诚实结论**:本件适合作为 ADR-006 的"**下限样本**"—— 用来说明"并非每件都能拼满 5 类",以及"A 类馆方页在 SPA 站点上的 id-锁定瓶颈"和"C/D/E 候选缺位"这两类真实缺口,而**不灌水补齐**正是符合 user-voice 原则的诚实做法。

---

**主要来源**:
- 山西博物院官网首页 / 检索入口:`https://www.shanximuseum.com.cn/sx/index/index.html`(A,`(c)all-rights`,仅入口)
- Met objectID 40406 *Stele Commissioned by Helian Ziyue and a Devotional Society of Five Hundred Individuals*(Eastern Wei, dated 533–43):`https://collectionapi.metmuseum.org/public/collection/v1/objects/40406`(B,CC0,跨件共享对照源)
- 候选登记 / 选品论证:`data/pipeline/in/sources_candidates.full30.json`(artifact_id 同上,仅 A/B 两类 candidate)
- 展品对照清单第 10 行:`agents/strategy-curator/exhibit-list.md`(`thin·ABD` 预期密度;DRAFT·报道确认)

**[ Sample Bundle · night-run 2026-06-07 · Compiler 完 ]**
