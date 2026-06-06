# Sample Bundle · 隋 铜阿弥陀佛三尊像(观音·大势至胁侍) · 上海博物馆东馆 中国古代雕塑馆

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanghai-sui-bronze-amitabha-triad)

> 反幻觉声明:本 bundle 只引用本件 artifact_id 且 fetch_status=ok 的 chunk 的 excerpt_or_metadata。凡 license=unknown 或 tier=low 的 chunk,只列 URL + 标题,不引正文。缺源类(C/D/E)按硬门要求显式标注。**本件无任何脑补、无旁证、无近似拼合。**

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 隋 铜阿弥陀佛三尊像(观音·大势至胁侍)|
| 馆 / 厅 | 上海博物馆东馆 · 中国古代雕塑馆 · 隋唐五代单元(隋代金铜造像)|
| 朝代 / 公元年范围 | 隋(581–618)|
| 材质 | 金铜(铸铜)三尊像 —— **注:材质判定来自 strategy-curator 选品论证与候选 rationale,非本次到手 chunk 的一手字面;见第 7 节诚实边界** |
| 已知 accession / 编号 | **未到手**(上博官网页面未暴露本件 ID)|
| 已知来源 / 出处 | **未到手一手出处**;馆方/媒体叙事(候选 rationale 转述)称其为"现存隋代佛教铸铜雕塑的代表作",两侧胁侍据头冠化佛 / 宝瓶判为观世音、大势至,构成净土阿弥陀三尊 |
| 检索关键词 | 上海博物馆 / 上博东馆 / 中国古代雕塑馆 / 隋 / 阿弥陀三尊 / 金铜造像 / 观音 / 大势至 / Amida / Sui dynasty / 净土 |

**选它的理由(承原则 D:读关系网)**:这是一件**金铜**主尊,而 pipeline 自动 grep 到的三件海外对照件全是**石造**(石灰岩 / 大理石 / 石)。这条"金铜 vs 石造"的材质裂缝,本身就是隋代净土造像跨材质共识的一个可被 surface 的张力点。

---

## 1. 来源 A · 馆方一手页面

**chunk**:source_class=A · fetch_status=**ok** · tier=**mid** · license=**(c)all-rights** · `https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00160587` · raw_path=`data/raw/shanghai-sui-bronze-amitabha-triad/A-3b6ed261.html`

**到手内容判定:仅 URL,无可用正文(off-topic SPA shell)。**

这条 chunk fetch_status=ok,但**抓回的不是本件的馆方解读**。上博官网是 js_html 单页应用(SPA),本次落地的 HTML 渲染出的是一件**完全无关的展品**——"江苏苏州桃花坞木版年画 燃灯道人(清 / 纸 / 雕版印刷 / 诗心造物展)"——外加全站导航壳。

我对该 chunk 正文做了关键词核查:"阿弥陀 / 三尊 / 大势至 / 观音 / 隋 / 金铜 / 铜"**全部不出现**。

> 因此按反幻觉硬门:**A 类源未取到本件一手内容**。URL 可达(curl 200),但 SPA 在 night-run 抓取链路上没有把本件的 article body 渲染出来,落地的是另一对象的页面壳。**不引为本件正文**,只保留 URL 待 PM 用国内 IP + 浏览器渲染回填。

**工程意义(给 ADR-006)**:上博官网 A 类是 js_html SPA,curl/静态抓取链路会出现"URL 200 但内容货不对板"——这是比单纯 403 更隐蔽的失败模式(看似 ok,实则空)。ADR-006 应把上博 A 类标为"**需 headless 渲染 + 按 article id 校验对象身份**",并在 verifier 侧加一道"chunk 正文是否含本件关键词"的体检,否则 mid-tier ok 会把噪声页放行。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

三条 B chunk 全部 fetch_status=**ok**,均为程序化 OA 端点(via_vpn=True)。逐件标 tier+license,诚实区分"有结构化元数据 / 仅元数据"。

### 2.1 CMA《Amida Buddha 阿彌陀佛》— **有正文(结构化元数据,CC0,可直引)**

**chunk**:B · ok · tier=mid · license=**CC0** · `https://openaccess-api.clevelandart.org/api/artworks/140151` · excerpt_truncated=True(json 截到 1500 字,更多见 raw_path `B-47f1e05e.json`)

到手字段(均来自 chunk tombstone / 字段,CC0 可引):

| 字段 | 值 |
|---|---|
| accession | 1964.152 |
| title | Amida Buddha(阿彌陀佛)|
| date | 581–618 |
| culture | China, Sui dynasty (581–618) |
| 材质 | limestone with traces of polychromy(石灰岩,残留彩绘)|
| 尺寸 | overall 51.4 × 20.3 cm |
| current_location | 241C Chinese Buddhist Sculptures |
| license | share_license_status = CC0 |

**与本件的关系(只陈述 chunk 内可见事实)**:同为**隋代阿弥陀(Amida)主尊**,题材与朝代窗口直接对应。差异点 chunk 自身给出:CMA 这件是**石灰岩单体**,本件(据选品论证)为金铜三尊——这是 surface "同一净土主尊在隋代跨材质造型共识"的最干净一组。

### 2.2 Met《Buddha Shakyamuni》— **有正文(结构化元数据,公有领域,可直引)**

**chunk**:B · ok · tier=mid · license=**CC0**(isPublicDomain=true)· `https://collectionapi.metmuseum.org/public/collection/v1/objects/61778` · excerpt_truncated=True(更多见 raw_path `B-a82b2e0c.json`)

到手字段:

| 字段 | 值 |
|---|---|
| accessionNumber | 1985.214.145 |
| title | Buddha Shakyamuni(objectName: Upper half of figure,残上半身)|
| period | Sui dynasty (581–618) |
| 材质 | Marble(大理石)|
| 尺寸 | H. 45.1 cm; W. 27.6 cm; D. 17.8 cm |
| isPublicDomain | true(primaryImage 高清可用)|

**与本件的关系**:补"金铜 vs 石造"的**石造一轨**——隋代单体白石/大理石造像对照。注意 chunk 字面 title 是 Shakyamuni(释迦)而非 Amida(阿弥陀),**不可把它说成阿弥陀**;它的价值是同窗口同材质类型的造型参照,不是题材对照。

### 2.3 V&A《The Bodhisattva Guanyin holding a vase》— **仅列 URL + 标题(license=unknown,按硬门不引正文)**

**chunk**:B · ok · tier=mid · license=**unknown** · `https://collections.vam.ac.uk/item/O130438/` · excerpt_truncated=True · raw_path=`B-6f23bd8d.html`

> 该 chunk license_observed=**unknown**。按反幻觉硬门:**只列 URL + 标题,不引其正文物理描述 / object history**。

可声明的非正文事实(来自候选 discovery 与 chunk 标题本身):标题为 "The Bodhisattva Guanyin holding a vase",年代 575–625,V&A South Kensington Room 47e,system number O130438。它之所以被选入,是**呼应本件"胁侍持宝瓶 → 判为观音/大势至"的判定逻辑**——一件隋前后的观音持瓶像。正文(物理描述、入藏史、historical context)chunk 里有,但因 license unknown,本 bundle **不转录**,留 PM 自行核 V&A 授权后引用。

**B 类小结**:tier 全 mid;**2 件可直引(CC0)+ 1 件仅 URL(license unknown)**。三件全为石造,与本件金铜形成材质对照轴。

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

本件在 sources_candidates.full30.json 中**没有任何 C 类候选**被采集(sourced 的类别仅 A/B/D)。verified_chunks.json 中本 artifact_id 下也无 C chunk。故第 3 节无任何可引内容——不旁证、不脑补、不借别件 C 源充数。

> 工程笔记:与白石佛立像样本(故宫院刊 + 佛光山 + Met OA + BMFEA + 芝大 5 源密集命中)相比,本件"隋代金铜阿弥陀三尊"在 discovery 阶段就没人喂 C 候选。ADR-006 应承认 bundle 完整度跨件差异大,并把"金铜造像题材是否有对应学术 OA"列为后续 discovery 的待补项,而非默认 30 件统一深度。

---

## 4. 来源 D · 现场场域

**D 类源:有候选但未落地为 ok chunk —— 本次第 4 节无可引正文。**

候选库里**确有一条 D 候选**:澎湃《现场|在上海看一部中国古代雕塑通史》2024-03 · `https://www.thepaper.cn/newsDetail_forward_26689360`(rationale 称该报道含馆方对本件"现存隋代铸铜代表作"的解读)。但:

- 该 D 候选的 discovery 备注即写明"本机 sandbox **403**(大陆源,国内 IP 可达)"。
- verified_chunks.json 中**本 artifact_id 下没有 D 的 ok chunk 落地**(本件无任何 fetch_status=failed 的 chunk,也无 D 的 ok chunk —— 即该 D 候选在 night-run 抓取链路上未产出可验证 chunk)。

> 按硬门:**D 类一手内容未到手**,原因 = 大陆源沙箱 403,仅有 URL 待 PM 用国内 IP / 浏览器回填。该报道是本件**最可能承载馆方叙事**的源(候选 rationale 明确点名它含"现存隋代铸铜代表作"解读),但本 bundle 不得转述任何未亲见的报道正文。**这是本件叙事缺口的核心:馆方对本件的判定语,目前一句都没拿到一手。**

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

候选库本 artifact_id 下无 E 类候选,verified_chunks.json 亦无 E chunk。第 5 节无可引内容。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类 / 5 | **1 / 5 拿到可直引正文**(B,且仅 2/3 件因 license 可引)。A fetch ok 但货不对板(off-topic SPA);C / E 无候选;D 有候选但 403 未落地。**严格按"有可引一手正文"口径:1 / 5。** |
| 各 chunk 的 tier + license | A:mid / (c)all-rights(off-topic,不引)· B-CMA:mid / **CC0**(可引)· B-Met:mid / **CC0/PD**(可引)· B-V&A:mid / **unknown**(仅 URL)· C:无 · D:无 ok chunk · E:无 |
| 哪些可 agent 自动化 | **B 跨馆 OA(CMA/Met API)**:100% agent,via_vpn 即可,CC0 直接入库。这是本件唯一稳的一轨。 |
| 哪些必须人在回路 | **A 上博官网**(需 headless 渲染 + 按 article id 校验身份,否则抓回无关页)· **D 澎湃报道**(大陆源 403,需国内 IP)· **V&A 正文授权核验**(license unknown)。 |
| 给 PM 的 wow moment 一句话 | "**上博这尊隋代阿弥陀,馆方说它是『现存隋代铸铜的代表作』—— 是金铜的。可全世界的开放数据里,跟它同朝代同题材的阿弥陀(克利夫兰)、同窗口的释迦(大都会),全是石头的。AI 一拼就看见:隋代净土主尊的『脸』是跨材质共享的,而上海这一尊,是这套共识里少见的金铜版本。**" |

> 诚实定调:本件是三件 pilot 里**最不完整**的一种形态 —— 跨馆 OA(B)很稳,但**馆方一手叙事(A)和现场报道(D)双双没落地正文**。它恰好 demonstrate 了 pipeline 的一个真实失败面:当一件展品的"馆方判定语"只活在大陆 SPA 官网和 403 的大陆媒体里时,自动链路只能交付"海外石造对照件 + 一个材质张力假设",交付不了"馆方究竟怎么说它"。

---

## 7. 反向发现 / 该展品不工作的源(含诚实原因)

- **A·上博官网 SPA 的"假 ok"**:`CI00160587` curl 200、fetch_status=ok,但落地 HTML 渲染的是**另一件展品(苏州桃花坞木版年画)+ 站点导航壳**,本件关键词 0 命中。这比 403 更危险——会以 mid-tier ok 身份污染知识库。**反向发现:上博 A 类需要"对象身份校验"门,不能信 HTTP 200。**
- **D·澎湃报道(本件最关键叙事源)未到手**:`thepaper.cn/newsDetail_forward_26689360` 沙箱 403。这是唯一被 discovery 点名"含馆方对本件铸铜代表作解读"的源,却恰恰是 night-run 链路够不到的那一类。**本件的叙事核心缺口就在这里。**
- **C / E 在 discovery 阶段就没有候选**:不是抓取失败,是**根本没人喂**。金铜阿弥陀三尊的学术/数字人文 OA 覆盖,在选品时未被检索到。
- **材质字段"金铜"无一手 chunk 背书**:本件"金铜/铸铜"判定来自 strategy-curator 选品论证与候选 rationale 转述,**不在任何 ok chunk 的一手字面里**(到手的三件 B 全是石造,A 货不对板,D 未落地)。第 0 节已显式标注此为待 PM 一手核实项,**不得当作已验证事实写入知识库**。
- **本件无 fetch_status=failed 的 chunk**:4 条 chunk 全部 ok。失败不在"抓取报错",而在"ok 但空(A)"与"有候选却未落地(D)/无候选(C·E)"——一种更需要 verifier 体检才能暴露的隐性不完整。

---

**主要来源(均来自本件 verified_chunks.json)**:
- 上博官网 article CI00160587:`https://www.shanghaimuseum.net/mu/frontend/pg/article/id/CI00160587`(A·ok 但 off-topic,不引)
- CMA Amida Buddha 1964.152:`https://openaccess-api.clevelandart.org/api/artworks/140151`(B·CC0·可引)
- Met Buddha Shakyamuni 1985.214.145:`https://collectionapi.metmuseum.org/public/collection/v1/objects/61778`(B·PD·可引)
- V&A Guanyin holding a vase O130438:`https://collections.vam.ac.uk/item/O130438/`(B·license unknown·仅 URL)
- 澎湃《现场|在上海看一部中国古代雕塑通史》:`https://www.thepaper.cn/newsDetail_forward_26689360`(D·候选·沙箱 403·未落地正文)

**[ Sample Bundle (night-run) · shanghai-sui-bronze-amitabha-triad · 2026-06-07 · Compiler ]**
