# Sample Bundle · 唐 邓峪石塔(2017年由台湾回归) · 山西博物院(佛风遗韵 · 大唐气度单元)

**目的**:测试 Open Discovery Pipeline 在该展品上能拼到什么。
**Phase**:AI 装订(night-run),非最终 bundle。
**调研日期**:2026-06-07  **调研者**:Compiler (night-run 2026-06-07)
**数据来源**:data/pipeline/out/verified_chunks.json(artifact_id=shanxi-fofeng-tang-dengyu-stone-pagoda-repatriated)

> 本件在 verified_chunks.json 中只有 **2 条 chunk,均 fetch_status=ok**:一条 D 类(澎湃陈列报道),一条 B 类(CMA 天龙山菩萨,CC0)。
> 候选清单(sources_candidates.full30.json)对本件**只列了 D、B 两类源,没有 A/C/E 候选**——这不是抓取失败,是源头上就没派给本件 A/C/E。下文逐节如实标注。

---

## 0. 展品识别

| 字段 | 内容 |
|---|---|
| 名称 | 唐 邓峪石塔(2017 年由台湾回归) |
| 馆 / 厅 | 山西博物院 · 「晋魂」基本陈列 / 佛风遗韵 · 大唐气度单元 |
| 朝代 / 公元年范围 | 唐(选品清单标:开元八年 720 年;**注:该年代来自 exhibit-list,不在本件任一 chunk 正文内,故此处仅作识别栏标注,不作为正文引用**) |
| 材质 / 形制 | 单体石塔(选品清单标"唐代单体石塔精品";**chunk 正文未给材质/尺寸**) |
| 已知 accession / 编号 | **未到手**(本件无 A 类馆方页 chunk;山西博物院官网为 SPA,id 未锁) |
| 已知来源 / 出处轨迹 | 选品论证记录其轨迹为"1998 年被盗 → 流散台湾 → 2017 年由中台禅寺捐赠回归山西";**此轨迹来自 exhibit-list 选品论证,不在本件 chunk 正文内** |
| 检索关键词 | 邓峪石塔 / 山西博物院 / 晋魂 / 佛风遗韵 / 回归文物 / 大唐气度 / 唐代石塔 |

**为什么选它(选品论证,源自 exhibit-list)**:一件物的"盗掘 → 海峡流散 → 政治性回归"轨迹,把佛教艺术与两岸/文物追索权叙事叠在一起——正中原则 C(觉察叙事背后的权力结构)与原则 D(跨展/跨馆的网络连接)。这正是本 night-run 想压测的:**Pipeline 在一件"回归叙事"展品上,到底能从公开源拼到几层?**

---

## 1. 来源 A · 馆方一手页面

**A 类源未到手,原因:no candidate sourced。**

候选清单(sources_candidates.full30.json)对本件**没有派 A 类候选**,verified_chunks.json 中也**无本件 source_class=A 的 chunk**。山西博物院官网藏品库为 SPA 路由(详见 exhibit-list 诚实风险记录:`shanximuseum.com.cn/sx/collection/detail/id/<id>` 模式,本机未能锁定本件真实数字 id)。

→ **本节不引任何正文**。馆方对本件的官方说明牌文字、accession、策展声明,本次 night-run **0 条到手**。需 PM 国内 IP 在馆方站内检索"邓峪石塔"回填 id 与一手描述。

---

## 2. 来源 B · 跨馆对照件(海外 OA)

**到手 1 条 chunk(fetch_status=ok),但它是跨件共享/对照源,不是邓峪石塔本体。**

| 字段 | 值 |
|---|---|
| URL | https://clevelandart.org/art/1983.76 |
| source_title | CMA id 151530 (1983.76) "Bodhisattva", early 700s, 天龙山系 |
| license_observed | **CC0** |
| confidence_tier | **mid** |
| fetch_status | ok |
| 引用形态 | **有正文截录**(license=CC0、tier=mid,允许引正文) |

**chunk 正文截录(CC0,可引)**:
> "Bodhisattva / early 700s / China, Shanxi province, Taiyuan, Tianlongshan caves, Cave 6, Tang dynasty (618-907)"
> (馆方页面同时挂了一条 provenance 免责声明:"The information about this object, including provenance, may not be currently accurate.")

**诚实定性(反幻觉)**:
- 这条 chunk **不是邓峪石塔**。它是克利夫兰艺术博物馆(CMA)一件 **盛唐(early 700s)、天龙山第 6 窟、太原** 出土的菩萨像,CC0。
- 它与本件的关系是 **"同省(山西)、同窗口(盛唐 700 年代)、同主题(山西唐代造像的海外流散)"的跨件对照**——这正是候选清单 rationale 里写的用法:"作为唐代天龙山/山西造像流散的实证对照,呼应邓峪石塔的回归/流散主题(原则 C/D)"。
- **但 chunk 正文里没有任何一句把这件 CMA 菩萨与邓峪石塔直接关联**;关联是选品逻辑层做的,不是源文本说的。因此本节**只能说"这是一件可作对照的山西唐代流散件"**,**不能说"它和邓峪石塔同坑/同源/同窟"**——那会是脑补。

**这层的张力(原则 C/D)**:邓峪石塔走的是"**流散 → 回归**"的闭环叙事(台湾→山西);而这件 CMA 天龙山菩萨走的是"**流散 → 仍在海外(克利夫兰)**"的未闭环轨迹。两件并置,恰好是"一件回来了、一件还没回来"的对照——这是把馆方"回归"叙事与海外"仍流散"现实摆在一起的最干净切片。**注:此并置为 Compiler 基于两条源各自事实做的结构性观察,源文本未明示。**

---

## 3. 来源 C · 学术论文 / 学者文章

**C 类源未到手,原因:no candidate sourced。**

候选清单对本件**没有派 C 类候选**,verified_chunks.json 中**无本件 source_class=C 的 chunk**。本次 night-run **0 条学术正文、0 条学者文章 URL** 到手。

→ 本节不引任何正文。邓峪石塔的盗掘/回归个案在学界(尤其文物追索权、两岸文物交流方向)应有专论,但本 pipeline 此轮未发现/未派候选。需后续轮补 C 类发现。

---

## 4. 来源 D · 现场场域

**到手 1 条 chunk(fetch_status=ok)。**

| 字段 | 值 |
|---|---|
| URL | https://www.thepaper.cn/newsDetail_forward_22453461 |
| source_title | 澎湃新闻《三千文物读晋魂,山西博物院基本陈列重新开放》 |
| license_observed | **(c)all-rights** |
| confidence_tier | **mid** |
| fetch_status | ok |
| 引用形态 | **有正文截录**(license=all-rights 但非 unknown、tier=mid 非 low → 允许有限引用,注明版权归属) |

**与本件直接相关的正文截录(澎湃 © all-rights,有限引用)**:
> "……子犯鬲、邓峪石塔、荒帷等重量级文物也将出现在陈展中。"
> "鸟尊、鸮卣、彩绘龙盘、虞弘墓石椁、娄睿墓壁画、董明墓戏俑、近年回归的子犯鬲和邓峪石塔……这些文物都将在山西博物院迎接观众。"

**这条 chunk 给本件提供的、且确有正文支撑的事实**:
1. 邓峪石塔被馆方/媒体列为「晋魂」基本陈列(2024 年 4 月 1 日起全面开放)的**重量级展品之一**。
2. 它被明确归入 **"近年回归"** 文物(与子犯鬲并列)——这是 chunk 正文里唯一一处直接给"回归"定性的字句,与本件 artifact_id 的 `repatriated` 后缀吻合。
3. 它进入的是经 2020 年起三阶段提升、共 3431 件组(1238 件组首次亮相)的升级版陈列。

**反幻觉边界**:
- 这篇澎湃报道的**正文主体是讲晋侯鸟尊**(出土、修复、象鼻残片故事),**与邓峪石塔无关**——上面 1500 字截录里关于鸟尊的大段内容**一律不挪用到本件**。
- chunk 正文**没有**给邓峪石塔的:具体年代(720 年)、被盗时间(1998)、流散地(台湾)、回归经手方(中台禅寺)、材质、尺寸、塔身造像内容——**这些都不在源文本内,本 bundle 一律不写**。识别栏(§0)里出现的这些字段,均已标注"来自 exhibit-list 选品论证,非本件 chunk 正文",**不作为正文事实陈述**。
- excerpt 在 json 中截到 1500 字(`excerpt_truncated=true`);原文更长,见 `data/raw/shanxi-fofeng-tang-dengyu-stone-pagoda-repatriated/D-b72164aa.html`。**未见部分不续写。**

**这层的张力(原则 C)**:馆方叙事把邓峪石塔放进"近年回归"的荣光序列(与子犯鬲并列,作为"晋魂"完整性的补全),报道语气是庆典式的"迎接观众"。报道**未触及**"为什么会流散出去(1998 被盗)"这一前半段——回归叙事天然地从"回来了"讲起,而非从"丢了"讲起。这正是原则 C 要 surface 的:**说明牌/报道选择从哪一刻开始讲故事,本身就是叙事权力。** 注:此观察基于"chunk 正文只讲回归、不讲被盗"这一可核验的文本事实。

---

## 5. 来源 E · 数字人文 / 跨域 OA

**E 类源未到手,原因:no candidate sourced。**

候选清单对本件**没有派 E 类候选**,verified_chunks.json 中**无本件 source_class=E 的 chunk**。本次 **0 条数字人文/跨域 OA** 到手。

→ 本节不引任何正文。邓峪石塔的两岸流散/回归个案,在数字人文方向(如文物追索数据库、回归文物时间线可视化)有潜在价值,但本轮无候选。

---

## 6. 样本 bundle 评估

| 维度 | 评价 |
|---|---|
| 5 类源,实际到手几类? | **2 / 5**:**D**(澎湃,ok,© all-rights,tier=mid,**有正文截录**)+ **B**(CMA 天龙山菩萨,ok,CC0,tier=mid,**有正文截录,但为跨件对照而非本体**) |
| 缺哪几类? | **A / C / E 三类全缺**,原因均为 **no candidate sourced**(源头未派候选,非抓取失败) |
| 各 chunk 的 tier + license | D:tier=mid / license=(c)all-rights;B:tier=mid / license=CC0。**两条都不是 low、都不是 unknown**,故均允许有限引正文(B 的 CC0 最自由,D 的 all-rights 仅作版权署名下的有限引用)。 |
| 本体覆盖 vs 对照覆盖 | **本体(邓峪石塔)的直接正文事实极少**——只有澎湃一句"近年回归 + 进晋魂陈列"。**没有一条 chunk 给出本件的年代/材质/尺寸/造像内容/流散细节。** B 类那条 CC0 正文讲的是另一件(CMA 菩萨)。所以本 bundle **实质是"1 句馆方回归定性 + 1 件可对照的海外流散件"**,远未到可成稿深度。 |
| 给 PM 的 wow moment(一句话) | "**馆方在『晋魂』里把邓峪石塔和子犯鬲并排,定性为『近年回归』的荣光——但报道只从'回来了'讲起,绝口不提 1998 年它是怎么'丢出去'的;而我们海外数据里那件 CC0 的天龙山菩萨,同样是盛唐、同样出自山西,至今还在克利夫兰没回来。一件回归叙事、一件仍在流散,AI 把这两条摆在一起,正好照出'从哪一刻开始讲故事'的叙事权力。**" |

---

## 7. 反向发现 / 该展品不工作的源(含 failed chunk 的诚实原因)

- **本件无 fetch_status=failed 的 chunk**:verified_chunks.json 里本件 2 条 chunk **全部 fetch_status=ok**,无失败需归因。
- **真正的缺口在"源头派单",不在"抓取"**:A/C/E 三类是 `no candidate sourced`——候选清单这一轮只给本件配了 D、B。**Pipeline 没失败,是 Discovery 阶段对本件覆盖偏薄。**
- **B 类的"错位"是本件最大的诚实问题**:候选把一件 CMA 天龙山菩萨当作本件的 B 类对照,fetch_status=ok 没错,但它**与邓峪石塔没有任何源文本层面的直接关联**(不同器型:菩萨像 vs 石塔;关联完全是选品逻辑搭的)。把它当"邓峪石塔的跨馆对照"会高估覆盖度——它更应被看作"山西唐代流散件家族"里的一个旁系样本。
- **D 类的"主体错位"**:那篇澎湃报道是一篇**以晋侯鸟尊为主角**的陈列综述,邓峪石塔只占两句带过。源密度高(1500 字+)但**与本件相关的有效正文不足 40 字**。这类"重量级展览综述"对单件 anchor 的信息贡献天然稀薄——ADR-006 应注意:**chunk 字数 ≠ 本件可用正文量**,需要 per-artifact 的相关段落抽取,而非整页计数。
- **未到手而本应高价值的方向(留给后续轮)**:① 馆方对邓峪石塔的一手说明(A);② 2017 年中台禅寺捐赠/回归的报道与协议(D 类专题,本轮未派);③ 1998 年被盗的卷宗/旧闻(回归叙事的"前半段",原则 C 最关键的一块,本轮 0 条);④ 文物追索/两岸文物交流的学术专论(C)。**这四项缺失合起来意味着:本件目前只有"回归后的荣光面",没有"流散前的伤口面"——bundle 还撑不起原则 C 想要的那层张力。**

---

**到手源清单(均 fetch_status=ok)**:
- 澎湃新闻《三千文物读晋魂,山西博物院基本陈列重新开放》:`https://www.thepaper.cn/newsDetail_forward_22453461`(D · © all-rights · tier=mid · raw: `data/raw/shanxi-fofeng-tang-dengyu-stone-pagoda-repatriated/D-b72164aa.html`)
- CMA《Bodhisattva》1983.76(天龙山第 6 窟 · early 700s):`https://clevelandart.org/art/1983.76`(B · CC0 · tier=mid · 跨件对照 · raw: `data/raw/shanxi-fofeng-tang-dengyu-stone-pagoda-repatriated/B-ef4948b5.html`)

**未到手**:A(no candidate sourced)、C(no candidate sourced)、E(no candidate sourced)。

**[ night-run AI 装订 · 邓峪石塔 · 2026-06-07 · 非最终 bundle ]**
