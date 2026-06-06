# Night-Run Report · 2026-06-07

> 执行节点:夜班 agent(Discovery + Verifier + Compiler 三角色合一),无人值守自动跑。
> 范围:ADR-006 Open Discovery Pipeline 的一次完整 Phase A↔B 走通(pilot 28 候选 + 27→25 件 DRAFT 全量)。
> 总耗时:约 1 小时(远低于 8h 预算上限;AI 执行 + 本机网络极佳,未触发任何时间盒救火)。

---

## TL;DR(3 条,给 PM)

1. **管道端到端走通了,而且本机网络比云端沙箱好太多。** 沙箱当初对馆方 OA / 海外 OA / archive.org / 大陆站 100% 403;**本机几乎全部直连可达**(Met 23、CMA 17、V&A 8、上博 7、山西 5、震旦 2、澎湃 7、archive.org、uchicago、wikipedia 全通)。最终 `verified_chunks.json` 累计 **104 条 chunk(100 ok / 4 failed),覆盖 36 个域名、28 件文物**,远超 pilot ≥15 的及格线。

2. **27 件 DRAFT 已起草到 25 件(山博两并行组去重 2 对),每条 url 都现场核验、零编造 ID。** 见 `agents/strategy-curator/exhibit-list.md`(标 `DRAFT — pending PM review`)。Discovery 还**主动剔除了 3 处幻觉源**(网传"太和元年鎏金释迦"实为台北故宫藏、CMA"jade cong"实为商代非良渚、Met 61052 实为清代仿件),并如实记了多条 API 零命中(V&A Hongshan jade / Tianlongshan = 0)。

3. **发现一个会卡住 PM 本机的真 bug:stock macOS Python 的 LibreSSL 2.8.3 无法和 `dpm.org.cn` 完成 TLS 握手**(故宫院刊 PDF 全 `SSLV3_ALERT_HANDSHAKE_FAILURE`)。系统 `curl`(LibreSSL 3.3.6)可以。已新增 `scripts/fetch/refetch_curl.py` 作 transport 兜底,2 篇故宫院刊 PDF 现已抽出正文。**这是 ADR-006 §风险一("PM 本机若也卡某些大陆馆")的实锤,建议把 curl 兜底纳入 Verifier 默认链。**

---

## 数字

| 项 | 值 |
|---|---|
| **Pilot** 候选 | 28 条(去重 26 个唯一 URL)→ **26 chunk:24 ok / 2 failed** |
| **Discovery DRAFT** | 起草 27 件 → 去重 2 对 → **25 件净 DRAFT**(山博 12 / 上博青铜 5 / 上博东馆 4 / 震旦 4) |
| **full30 候选** | **86 条**(现查、去重、Met 人页已归一化为 JSON API);Phase 3 实抓 79(跳过 7 条 pilot 已 ok) |
| **verified_chunks 总量** | **104 chunk(100 ok / 4 failed)**,覆盖 36 域名、**28 件文物** |
| ok chunk 按类 | A=15 · B=48 · C=11 · D=19 · E=7(B 跨馆海外 OA 最厚,符合 ADR-006 矩阵) |
| **Compiler 装订** | **28 个 `.bundle.md`**(3 pilot + 25 DRAFT),平均 3.6 ok chunk/件 |
| bundle 源覆盖分布 | 5/5×1 · 4/5×2 · 3/5×7 · 2/5×11 · 1.5/5×2 · 1/5×5(**多数 2–3 类,印证 ADR-006 §风险二"bundle 看起来穷"是预期表现,不是 bug**) |
| 反幻觉抽审 | 28 件 bundle 全过:无任何 bundle 引用了"未抓到内容"的 URL(图像 URL 均出自已验证 Met JSON 内的 `primaryImage`) |
| 新增工具 | `scripts/fetch/refetch_curl.py`(LibreSSL/TLS 兜底,reuses fetch.py 抽取 + 同 chunk 契约) |

---

## 本机可达性地图

> via=direct 指无 `MUSEUM_PROXY`(本次未设)直连即通。本机似乎本身就在墙外或有系统级出网(archive.org 直连 200 = 非典型大陆直连),PM 早晨可据此判断本机网络位置。

| 源族(代表域名) | via | 状态 | 备注 |
|---|---|---|---|
| Met OA API(海外) | direct | ✅ ok×23 | `collectionapi.metmuseum.org` JSON,CC0 件最干净 |
| CMA(海外) | direct | ✅ ok×17 | `clevelandart.org` 人页 + `openaccess-api` JSON,CC0 |
| 其它大陆媒体/机构(qq/新浪/搜狐/人民/中新/文联) | direct | ✅ ok×10 | httpx 直抽正文正常 |
| V&A(海外) | direct | ✅ ok×8 | `collections.vam.ac.uk` 单件页需 `--js`(playwright) |
| 上海博物馆官网(大陆) | direct | ✅ ok×7 | SPA,需 `--js`;首页 302、文章页 200 |
| 澎湃新闻(大陆媒体) | direct | ✅ ok×7 | 含 `m.thepaper.cn`;裸 curl HEAD 可能 403,GET 正常 |
| 山西博物院官网(大陆) | direct | ✅ ok×5 | `.com` 301→`.com.cn`;藏品库 `/sx/collection/detail/id/<id>` 静态可达但单件 id 难枚举 |
| 山大云冈学库 PDF(大陆) | direct | ✅ ok×4 | `ygx.sxu.edu.cn` 中文路径 PDF httpx 直抽正文 OK |
| UChicago 响堂山/天龙山(海外) | direct | ✅ ok×3 | `xts/tls/caea.uchicago.edu`,数字人文金矿 |
| 海外学术(OCS/台湾/学者站) | direct(curl 兜底) | ✅ ok×3 | wordpress 学者 PDF 走 curl `--compressed` 避开 httpx gzip 损坏 |
| 国家博物馆(大陆) | direct | ✅ ok×3 | `chnmuseum.cn` 专题页,部分需 `--js` |
| **故宫院刊 PDF(大陆)** | **direct(curl 兜底)** | ✅ ok×3 | **httpx LibreSSL 2.8.3 TLS 握手失败 → curl 救回;2 篇抽出正文,1 篇扫描件 0 字** |
| 知乎(大陆) | direct | ⚠️ ok×2 但正文稀薄 | playwright 渲染后仅 ~117 字 / 反爬占位 JSON(需登录) |
| 震旦博物馆官网(大陆) | direct | ✅ ok×2 | Next.js SPA,需 `--js`;无公开单件 URL |
| archive.org(海外) | direct | ✅ ok×1 | 抓回 Wayback 占位页,书正文未落地 |
| Wikipedia(海外) | direct | ✅ ok×1 | CC-BY-NC-SA,数字人文底座 |
| 地方政府文旅(大陆) | direct | ✅ ok×1 | 浙江文旅厅玉琮王页 |
| MDPI OA(海外) | direct | ❌ fail×1 | `edge_blocked_akamai`:CC-BY 全文被 Akamai/Cloudflare 边缘墙拦(httpx 与 headless Chromium 双双只拿到 challenge 页) |
| 社科院考古 `kaogu.cssn.cn`(大陆) | direct | ❌ fail×1 | `http_404_dead_url`:文章 URL 已失效/迁移 |
| 荣宝斋 `rongbaozhai.cn`(大陆) | direct | ❌ fail×1 | `ConnectError`(SSL EOF,疑似又一个老 TLS 不兼容) |
| `kpfans.com`(大陆) | direct | ❌ fail×1 | `timeout`(对方 504 网关错误,非本机问题) |

---

## 跑成功的亮点(每条都直接落 PRD §6/§7 + user-voice 原则 C/D)

1. **白石佛立像:一件展品三套互相打架的产地叙事,被 AI 叠在一起。** 上博挂牌"北齐白石佛立像·**响堂山系**",但本轮实抓的**上博藏品库一手字段**写产地"**山西·山西省博物院调拨**";而 V&A O129249、Met 42704 的同窗口北齐佛头出处字段写"**probably Xiangtangshan(河北响堂山)**"。馆方字段 / 媒体标签 / 海外著录三方不一致——**Compiler 据此把 researcher 旧样本里"馆方自标响堂山→V&A 闭环"的写法按反幻觉硬门改写成了"馆方山西 vs 海外响堂山"张力件**(因为实抓字段不支持原说法)。这是状态机"拒绝脑补、只认抓到的"最干净的一次自我纠偏。

2. **红山玉神人兽像:三块说明牌、三种底气、互不提及。** 震旦说它是红山;国博用牛河梁科学发掘背书"红山五千年";瑞典策展人在 OCS 讲座里说博物馆里这类"玉神人"**没有一件经科学发掘出土**。本件 **5/5 类源全到手**(A 馆方 / B CMA CC0 / C OCS+台湾玉龙 PDF / D 澎湃 / E 国博专题),是 ADR-006 §背景-4"找不到一手出土叙事本身就是产品哲学素材"的最强落地。

3. **大克鼎:你以为在看国宝大鼎,其实站在一份三千年前的"王权任命状"前。** 克鼎 290 字铭文记周王把"管饭的膳夫克"册命成世袭贵族、连土地奴隶一起赏下去;上博这栋楼本身就照着大克鼎盖的。原则 C(铭文=册命制度的权力文本)有海外 CC0 对照件(Met/CMA)实锚。

4. **MDPI 的反例也是亮点。** CC-BY 全本应是最该 high-tier 全文入库的源,但**实测被 Akamai 边缘墙拦死**(httpx + headless Chromium 都只拿到 challenge 页)。**没有为了凑"≥1 条 CC-BY 全文"的成功标准而把 101 字的 Akamai 报错页伪标成 high-tier**——按硬门记 `failed`,如实写进报告。诚实 > 达标。

---

## 跑失败的边界(诚实标,不掩盖)

- **MDPI CC-BY 全文未到手**(`edge_blocked_akamai`):本 night-run 的 success-criteria 之一"≥1 条 MDPI CC-BY 全文 high-tier 入库"**未达成**。需要真人交互浏览器会话,超出夜跑范围。建议 PM 本机用真实 Chrome 手动存一次,或换 DOAJ/其它 OA 镜像。
- **故宫院刊 1/3 是扫描件**:`修德寺遗址` PDF 抓到文件、有 hash,但**无文字层(0 字)**,已降 `tier=low` 仅作 URL+标题。`曲阳白石中龙` 与 `响堂邺城比较` 两篇有正文(各 1500 字截录)——dpm PDF 成功标准达成(2/3)。
- **大陆馆 A 类"单件一手页"系统性缺口**(与 pilot/sample-bundle 记录一致):上博/山西/震旦官网都是 SPA,**首页 200 ≠ 单件正文页可枚举**。山西藏品库 `/sx/collection/detail/id/<id>` 路由可达但单件 id 无法机器枚举(Wayback CDX 空、SPA list 端点 404)。**多数 A 类只能锚"在馆"结论 + 媒体/百科交叉证存在,馆方一手单件叙事仍需 PM 国内 IP + `--js` 落地。**
- **知乎是"ok 但软封禁"**:playwright 拿到 200,但正文是反爬占位 JSON(code 40362)/ 仅 117 字。**管线把它误判为 ok**——这是个该修的判定漏洞(见下"工程发现")。
- **3 个零命中 / 死链如实记**:`kaogu.cssn.cn`(404 死链)、`rongbaozhai.cn`(SSL EOF)、`kpfans.com`(对方 504)。

---

## 工程发现(Compiler 装订时浮现,留给 Builder)

夜跑顺带发现 3 个管线层 bug,已写进相关 bundle 的第 7 节,汇总在此:

1. **落库字符集丢失(GB18030)**:部分大陆页面(如中国文联现场综述)实为 GB18030,管线按错误编码入库 → `excerpt_or_metadata` 成 latin-1 乱码,"ok 但不可读"。`raw_path` 原文完整。**建议 fetch→store 按页面 `charset` 显式解码。**
2. **URL→artifact 映射在共享源上串号**:多件共用的 URL(如 `news.qq.com/...20230907` 同时是南涅水塔与观音五尊像的候选)经 dedup 后 chunk 只挂到一个 artifact_id,另一件按硬门不敢借用 → bundle 凭空缺一类源。**建议 chunk 支持 `artifact_ids: []` 多归属,或 Compiler 显式允许"同 URL 跨件共享"。**(本轮 Compiler 已被授权引用跨件共享源,但映射本身仍建议修。)
3. **"软封禁"未被 ok/failed 判定识别**:知乎 200 + 反爬 JSON 被记 `ok`。**建议加一条"正文 < N 字 或 命中反爬特征 → 记 `failed: soft_blocked`"的后置校验。**
4. **`license=unknown` 是当前最大产能瓶颈,不是沙箱 403**:观音五尊像那件,真正卡住"最有价值两条源(青州龙兴寺博论 + 响堂山概览)"的不是抓不到,而是 license 未核定 → 封顶 low tier 只能挂 URL。**ADR-006 §硬约束 working as intended,但 PM 可考虑给"学者个人站/院校库 PDF"一个轻量 license 复核流程,把一批 unknown 提到可引。**

---

## 给 PM 的待签字 / 待决策(只列,不挂起)

1. **核签 30 件清单**:`agents/strategy-curator/exhibit-list.md` 现 3 pilot(✅)+ 25 DRAFT。请增删核签。
2. **山博补 2 件**:两并行组去重后山博净 12 件 DRAFT(目标 14,差 2)。可指定补 北周/隋唐/山西本地铜佛 各 1–2 件,或就此定 12。
3. **thin / ⚠️未确认件去留**(ADR-006 §人在回路-5,agent 不自决):
   - `shanxi-northern-wei-stone-buddha-stele-shrine`(⚠️ museum_homepage_not_confirmed)
   - `aurora-hongshan-cloud-shaped-pendant`(thin;海外 OA 红山勾云形器零命中)
   - `shanxi-fofeng-northern-zhou-wei-prince-stele-562-jiezhou`(thin)
   是否保留 / 劝退,请 PM 定。
4. **震旦汉代玉器缺口**:任务含"汉代玉器"但"灵光"是新石器专题,4 件 DRAFT 全落红山/良渚。为守反幻觉未起草汉代件;Met"Han dynasty jade" total=790,补汉代件 bundle 密度会更高——是否下一轮补?
5. **MDPI CC-BY 全文**:被 Akamai 墙拦,需 PM 真人浏览器存一次,或弃用换 DOAJ。
6. **curl 兜底是否纳入 Verifier 默认链**:`scripts/fetch/refetch_curl.py` 已能救 dpm.org.cn。建议把"httpx TLS 失败 → 自动 curl 重试"写进 `fetch.py`。
7. **上博青铜 C 类(学术)整体空**:本轮未命中青铜重器对口 OA 论文。建议下一轮针对"大克鼎铭文/晋侯稣钟历谱/浑源彝器"检索 dpm 院刊或 DOAJ。

---

## 没踩红线证明

- **T3 红线**:**0 次注册 / 0 次付费 / 0 次绑卡 / 0 封邮件 / 0 次填表 / 0 次申请 API key**。Met / CMA / V&A / Wikidata 全程**无 key**(它们本就不需要)。遇到需 key/登录/付费的源(Smithsonian API、数字敦煌、archive.org 借阅)→ **直接跳过,未申请、未绕过、未暂存等回信**。MDPI 被墙 → 记 `failed`,未尝试任何登录/付费绕过。
- **main 分支**:**0 次推送**。只在 `claude/museum-photo-sharing-8qJiz` 上推(见 Phase 6)。
- **ADR / PRD 主体**:**0 字改动**(本报告为新增文件;exhibit-list.md / full30.json 为产出物;ADR-006 仅末尾追加 night-run-log 章节,未动主体)。
- **未越权 PM 决策**:27→25 件全部标 `DRAFT — pending PM review`,未当已签字;thin/未确认件未自行劝退(已上交 PM)。
- **未挂起等回答**:全程 fall-safe,所有边界情况记录后继续,无一处"等待 PM 确认"停摆。

---

## 路线图

- **早晨 PM**:review `exhibit-list.md` 30 件 → 核签 → 处理上方待决 7 条。
- **核签后 batch**:`sources_candidates.full30.json` 已现成(本 night-run 已先跑一遍);PM 改定后重跑即可,Compiler 重装订。
- **P0 后续**:① 修 3 个管线 bug(charset / URL→artifact 多归属 / soft-block 判定);② curl 兜底并入 `fetch.py`;③ 给 unknown-license 学术 PDF 一个轻量复核流程。
- **P1**:① 震旦补汉代玉器一组;② 上博青铜补 C 类学术;③ 图像层(ADR-003 分层)——本轮只抓文本,Met JSON 内的 `primaryImage`(CC0 高清)已就位可下一轮入库。
- **不变量**:30 件不承诺等深;`bundle 平均 3.6 类、多数 2–3 类`就是诚实产能,**不为了好看 loosen 反幻觉门**(ADR-006 §风险二)。

---

**产物清单(本次提交)**
- `data/pipeline/out/verified_chunks.json`(104 chunk)+ `data/pipeline/in/sources_candidates.full30.json`(86 候选)
- `agents/strategy-curator/exhibit-list.md`(3 pilot + 25 DRAFT)
- `agents/researcher/sample-bundles/*.bundle.md`(28 件 AI 装订,`.bundle.md` 后缀区分 researcher 手写样本)
- `scripts/fetch/refetch_curl.py`(LibreSSL/TLS 兜底新工具)
- `docs/ADR/006-open-discovery-pipeline.md`(末尾追加 night-run-log,主体未动)
- 原始证据 `data/raw/`(gitignored,本机留存)

[ Night-Run 完 · 2026-06-07 · 夜班 agent(Discovery+Verifier+Compiler) ]
