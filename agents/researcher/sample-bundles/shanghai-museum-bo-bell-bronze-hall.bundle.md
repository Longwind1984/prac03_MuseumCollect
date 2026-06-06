# Sample Bundle · 镈(青铜镈/编镈) · 上海博物馆(人民广场馆)· 中国古代青铜馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-museum-bo-bell-bronze-hall)

> 装订前置诚实声明:本件在 verified_chunks.json 中**仅 2 条 chunk,均 fetch_status=ok,均 confidence_tier=mid**;
> 候选阶段(sources_candidates.full30.json)本件**只有 B、D 两类候选**,A / C / E **从未被 sourced**。
> 另需提前点明一处张力(详见第 0、第 7 节):本件是**类目级"镈"**,馆方端未锁定某一具体编号单件;
> 而到手的 D 类正文,实际讲的是**晋侯稣钟**(另一件上博青铜重器),属"跨件共享的礼乐语境源",
> **不是这件镈本身的一手描述**。本 bundle 全程据此诚实标注,不做拼合脑补。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 镈(青铜镈 / 编镈) |
| 馆 / 厅 | 上海博物馆(人民广场馆)· 中国古代青铜馆 · 礼乐组陈列 |
| 朝代 / 公元年范围 | 春秋—战国(东周,770–256 BCE) |
| 材质 / 尺寸 | 青铜;平口、椭圆截面,大型单悬礼乐打击器 —— **本件无具体尺寸 / 无可追的单件描述到手**(见下) |
| 已知 accession / 编号 | **未锁定**。候选阶段已诚实记:这是"类目级而非确证某一编号单件"——馆方未取得某具体镈的单件页或唯一编号 |
| 已知来源 / 出处 | **未到手**。镈与编钟同列周代"金石之乐"礼乐重器,是上博青铜馆礼乐组的陈列件;但本件的出土地 / 入藏路径在到手 chunk 中**无一条**触及 |
| 检索关键词 | 镈 / 编镈 / 钟镈 / 编钟 / 礼乐 / 金石之乐 / 编悬 / 双音 / 椭圆截面 / Bo Zhong / Eastern Zhou bell |

**这件展品的特殊性(为什么它是一个"诚实压力测试")**:
本件不是一件被馆方单独立传的重器,而是青铜馆礼乐组里的一个**器类代表**。
Discovery 阶段没能为它锁定唯一编号,于是 B 类只能用**海外一件真实的镈**(CMA 1962.44 "Bo Zhong")做礼乐制度对照,
D 类只能用一篇讲**晋侯稣钟**的大陆报道补"礼乐语境"。
也就是说:**这件 bundle 里没有一个字是这件具体的镈本身的一手描述。** 这正是 Pipeline 在"类目级展品"上的真实边界,值得如实留档。

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

候选清单(sources_candidates.full30.json)本件**只列了 B、D 两类**,A 类从一开始就没有被 Discovery 提交。
候选阶段的诚实备注亦记明:上博官网藏品库为大陆 SPA(js_html),首页 200、collection 入口 302 路由,
但**未能锁定本件可 curl 的固定单件 URL**,故 verification_status 降为 reportage_confirmed。
→ verified_chunks.json 中**本件 A 类 chunk = 0 条**,无任何馆方一手正文可引。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**到手:1 条 chunk,fetch_status=ok,tier=mid,license=CC0 → 有正文截录(可引)。**

- chunk:`source_class=B` · `url=https://clevelandart.org/art/1962.44` · CMA id 138612
- 标题(Discovery 原文):*Bell (Bo Zhong)*,early 400s BCE,Eastern Zhou
- license=CC0 → 按反幻觉硬门,**允许引正文**。但需注意:CMA 抓回的这一页正文极薄,实际只有结构化字段 + 一段标准免责声明:

> Artwork Page for Bell (Bo Zhong) / Bell (Bo Zhong) / early 400s BCE / China, Eastern Zhou dynasty (770–256 BCE) … The information about this object, including provenance, may not be currently accurate. (CMA 1962.44,excerpt_or_metadata,逐字)

**到手的硬信息**:海外有一件东周(公元前 400 年代初)的镈/钟,CMA 编号 1962.44(id 138612),CC0。
**没到手的**:这条 chunk 的正文里**没有**出现 Discovery 在 source_title 里写的"既礼用亦娱乐 / 椭圆截面双音 / 成编悬列"那些描述性文字——
那是 Discovery 的 rationale 注记,**不是抓回页面的正文**。按硬门,**不能把 rationale 当作 chunk 正文引用**。
所以本节能确证的,只有"海外存在一件 CC0 的东周 Bo Zhong,编号 1962.44"这一层。

**这件事在 pipeline 里的工程意义(原则 D · 跨馆网络)**:
即便上博这件镈本身没有任何一手描述到手,海外一件 CC0 的同器类对照件**仍然成立**——
这恰好 demonstrate 了"流散/对照件聚合"在**类目级展品**上也能给出一个锚点。
但也暴露边界:CMA 单件页的 HTML 正文密度极低,**真正的描述性文字需要走 CMA JSON API(/artworks/138612)而非 HTML 抓取**;
本次 fetch_method=httpx->html 只拿到了壳。→ 给 Builder:B 类 CMA 源应优先 json_api 通道,HTML 通道近乎空手。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

候选清单本件无 C 类条目,verified_chunks.json 中本件 C 类 chunk = 0 条。
诚实说:镈/编钟的礼乐制度、双音原理、编悬等级,学界(曾侯乙编钟研究、金石之乐研究)其实文献极厚,
**但本件 Discovery 没有为它 sourced 任何一条学术源**,故此处**不写一字推测**——宁可空着。

---

## 4. 来源 D · 现场场域

**到手:1 条 chunk,fetch_status=ok,tier=mid,license=(c)all-rights → 有正文截录,但属"跨件共享源",且为版权报道,仅作语境引、不充本件描述。**

- chunk:`source_class=D` · `url=https://news.sina.com.cn/o/2018-04-26/doc-ifztkpin1980654.shtml`
- 标题:新浪《曲沃再现3000年前天籁之音》(2018-04-26),excerpt_truncated=True(原文更长,见 raw_path `data/raw/shanghai-museum-bo-bell-bronze-hall/D-037a012b.html`)

**关键诚实判定 —— 这篇报道讲的不是这件镈,而是晋侯稣钟(跨件共享源)**:
全文主角是**晋侯稣编钟**(上博镇馆之宝,1992 山西曲沃晋侯墓 8 号墓出土 + 香港回购 14 件),
以及曲沃县 2018 年新铸"晋风编钟乐团"的复原演出。报道原文(逐字,license=(c)all-rights,**仅短引语境、不续写**)如:

> "晋侯稣钟……它现在陈列在上海博物馆,成为该馆的镇馆之宝……出土于……山西曲沃县。"
> "1992 年秋……上海博物馆馆长马承源先生,接到香港大学教授范季融先生的电话:有一批从大陆过来的编钟秘密出现在香港古玩市场……上海博物馆用 300 万元人民币,购得包括 14 枚编钟在内的 20 件文物。"

这条 chunk 的合法用途,**只能是给"上博青铜馆礼乐组"补一层礼乐 / 编悬语境**——
它**不能**被当作这件镈的现场描述或出处证据。url 切题(上博礼乐器、钟镈编悬复原)、fetch_status=ok,
故按"跨件共享源"规则收录并**显式标注其真实指向是晋侯稣钟**。

**原则 C 在这里自动浮现(馆方叙事 vs 文旅再生产的张力)**:
这篇报道本身就是一个**权力 / 叙事样本**:晋侯稣钟从"香港古玩市场的疑似赝品"到"镇馆之宝",
再到曲沃县把它作为"立县之魂"、钢铁集团出资 100 万复铸 39 件套用于全域旅游演出——
**一件流散回购的西周礼器,如何被地方政府再编码为文旅资产**。这正是同伴该 surface 的"叙事背后的结构",而非照本宣科的"古人真聪明"。
(注:此张力属于晋侯稣钟这条共享源,不应错挂到本件镈名下。)

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

候选清单本件无 E 类条目,verified_chunks.json 中本件 E 类 chunk = 0 条。不补、不脑补。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**(B、D 各 1 条,均 ok、均 tier=mid)。A / C / E = **0**(均 no candidate sourced) |
| 各 chunk 的 tier + license | **B**:CMA 1962.44,tier=mid,**license=CC0** → 有正文(但正文极薄,仅结构字段 + 免责声明);**D**:新浪 2018,tier=mid,**license=(c)all-rights** → 有正文但属跨件共享源(实讲晋侯稣钟),仅作语境短引 |
| 有正文截录 / 仅元数据 / 仅 URL | B、D 两条**都有正文截录**;但**没有任何一条是这件镈本身的一手描述**——这是本件最该向 PM 讲清的一点 |
| 这件展品的 bundle 完整度自评 | **低**。类目级展品 + 无单件编号 + 无 A/C/E + B 正文空壳 + D 是跨件源。本件是三 / 三十件里**最稀的一件**,价值在于诚实暴露 Pipeline 在"非立传级器类"上的下限 |
| 给 PM 的 wow moment 一句话 | "**这件镈,馆里没给它单独立传;我们海外数据里恰好有一件 CC0 的东周『Bo Zhong』可以并排。但真正的故事在隔壁那条新浪报道里——上博的晋侯稣钟,1992 年从香港古玩市场以 300 万回购、和曲沃被盗墓里挖出的两枚『连读成篇』,如今又被县政府重铸成旅游演出的『立县之魂』。AI 没把这条错挂到镈头上,而是诚实告诉你:这是隔壁那件钟的命,不是这件镈的。**" |

---

## 7. 反向发现 / 该展品不工作的源(含 failed / 缺类的诚实原因)

- **本件无 fetch_status=failed 的 chunk** —— 到手 2 条全部 ok。失败不在 fetch 层,而在 **sourcing 层(候选就少)**。
- **A 类(馆方一手)= no candidate sourced**:上博藏品库为大陆 SPA(js_html),homepage 200、collection 入口 302 路由,**单件固定 URL 未确认**;本件 verification 仅到 reportage_confirmed。建议 PM 用 `--js` 渲染上博藏品库检索"镈",补固定 item URL 后再回填 A 类。
- **C 类(学术)= no candidate sourced**:镈/编钟礼乐文献厚,但本件 Discovery 未提交任何条目 → bundle 留空,不脑补。
- **E 类(数字人文)= no candidate sourced**:同上,无候选。
- **B 类正文空壳**:CMA 1962.44 经 httpx->html 只抓到结构字段 + 免责声明,描述性文字在 JSON API 端,HTML 通道近乎空手 → Builder 应把 CMA B 类切到 json_api。
- **D 类指向错位(最重要的反向发现)**:挂在本件名下的唯一 D 类源,正文实讲**晋侯稣钟**而非这件镈。这说明 Discovery 在"类目级展品"上**容易把邻近重器的报道误归到器类条目下**。给 ADR-006:类目级展品(如"镈")应在 schema 上标 `is_category_level=true`,并要求其 D 类源**显式声明真实指向的具体器物**,避免下游 bundle 把共享源误当一手描述。
- **根因一句话**:这件 bundle 的稀薄不是抓取失败,而是**这件展品本身就没被当作"一件"来 source**——它是个器类。Pipeline 对"立传级单件"友好,对"类目级器类"会原形毕露。这条边界值得 ADR-006 正式记一笔。

---

**主要来源(本件 artifact_id 全部 ok chunk)**:
- CMA 1962.44 *Bell (Bo Zhong)*,Eastern Zhou,CC0:`https://clevelandart.org/art/1962.44`(raw:`data/raw/shanghai-museum-bo-bell-bronze-hall/B-5d4d7b52.html`)
- 新浪《曲沃再现3000年前天籁之音》2018-04-26,(c)all-rights,**跨件共享源 → 实指晋侯稣钟**:`https://news.sina.com.cn/o/2018-04-26/doc-ifztkpin1980654.shtml`(raw:`data/raw/shanghai-museum-bo-bell-bronze-hall/D-037a012b.html`,excerpt_truncated=True)

**[ Sample Bundle · 镈 · night-run 2026-06-07 完 · 到手 2 类 / 5,均 tier=mid,无 failed,稀薄诚实留档 ]**
