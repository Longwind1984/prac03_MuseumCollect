# 本地运行指南 · Phase B Verifier(核源/抓取)

> 这份文档**两个读者**:你(PM,照着装环境)+ 你本地那个 Claude Code 会话(它读这份就知道自己要干嘛)。
> 配套:`docs/ADR/006-open-discovery-pipeline.md`(设计)、`handoff/2026-06-06-local-verifier-handoff.json`(交接包)。
>
> **要夜跑无人值守?** → 直接看 [`handoff/2026-06-06-night-run-prompt.md`](../handoff/2026-06-06-night-run-prompt.md)。本文只用来装环境 + 配 VPN(§1+§1.5),装完直接进夜跑模式。

---

## 0. 一句话:为什么要在你本地跑

云端那个 Claude(我)所在的沙箱**连不上任何馆网/图库/archive.org**(实测全部 `403 host_not_allowed`,白名单只剩 GitHub + pypi)。所以"真正去网上抓内容"这一步必须换到**有正常网络的机器**——你的电脑。

分工:
- **云端(我)**:动脑——列网址、翻已有数据、最后把核实过的料装订成条目。
- **你的电脑(本指南)**:动手——按清单抓取、核对、记录,产出 `verified_chunks.json`,再推回来给我装订。

你人在国内,所以你的机器和我的沙箱**正好互补**:大陆站点(dpm.org.cn / 澎湃 / 知乎 / 上博官网)你能开;但 `archive.org`、部分海外 OA 你可能慢或被墙——**第一跑的目的之一就是测出你这台机器到底能到哪**。

---

## 1. 装环境(一次性,约 10 分钟)

**前置**:Python ≥ 3.10、Git、以及你本地的 Claude Code(你自己的订阅)。

```bash
# 1. 克隆 / 拉取本仓库(就是现在这个 repo),切到开发分支
git clone <this-repo-url>
cd prac03_MuseumCollect
git checkout claude/museum-photo-sharing-8qJiz

# 2. 建虚拟环境 + 装抓取依赖
python3 -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\activate
pip install -r scripts/fetch/requirements-fetch.txt

# 3. 装无头浏览器(给 JS 渲染的馆网用)
playwright install chromium
```

依赖都是开源免费、**不需要注册/付费/绑卡**(不踩 T3 红线)。

---

## 1.5 配 VPN(关键:大陆/海外两类源,绝不能用同一路由)

你有 VPN,但**不能简单一开了之**——大陆站点(上博/澎湃/知乎/dpm.org.cn)从海外 IP 走会**慢、限速、甚至被反爬挡掉**;海外站点(Met/V&A/CMA/archive.org)从国内 IP 又**慢或被墙**。所以两类源**必须分开路由**:大陆直连、海外走 VPN。

清单里每条 candidate 都标了 `via_vpn: true/false`。脚本通过**环境变量 `MUSEUM_PROXY`** + 这个字段自动决定:`via_vpn=true 且 MUSEUM_PROXY 已设` → 走代理;否则直连。

下面两种配法,选你自己 VPN 客户端**支持的那种**。

### 方式 A · 客户端自带规则(Clash / Surge / Stash / Shadowrocket / V2RayN 等)·**推荐**

这类客户端内置"GeoIP 规则":大陆域名直连、其它走代理,**默认就是对的**。你只要打开"系统代理 / HTTP 代理"那个开关,它会在本地起一个 HTTP 端口(常见是 `7890`、`7891`、`1087`、`6152`),然后:

```bash
# 假设你客户端的本地 HTTP 端口是 7890,用前 curl 试一下:
curl -x http://127.0.0.1:7890 -I https://www.google.com    # 应该通
curl -x http://127.0.0.1:7890 -I https://www.dpm.org.cn    # 也应该通(GeoIP 规则会直连)

# 通了就 export(每个新终端都要,或写进 ~/.zshrc):
export MUSEUM_PROXY=http://127.0.0.1:7890
```

这种客户端**对 via_vpn=true 和 via_vpn=false 都用这个 proxy**,**由客户端自己判断**该不该走代理——这是最稳的。

### 方式 B · 全局 VPN(无规则,如裸 OpenVPN / WireGuard / 公司 VPN)

这种 VPN 一开,**全部流量都走出去**,大陆站点会变慢或被反爬。所以**不能开全局**,改成:**只在跑海外那批时打开 / 设代理**,跑大陆时关掉。

最简单的办法:把 VPN 改成 SOCKS5 或 HTTP 代理模式(很多 VPN 客户端都有"仅代理模式"开关),拿到本地端口,然后:

```bash
# 第一次跑大陆那批(不设代理)
unset MUSEUM_PROXY
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json --go

# 第二次跑海外那批(via_vpn=true 项)——只这次设代理
export MUSEUM_PROXY=socks5://127.0.0.1:1080   # 或你的代理端口
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json --go --artifact aurora-hongshan-jade
```

脚本会**只对清单里 `via_vpn=true` 的项**用代理,`via_vpn=false` 即使设了 MUSEUM_PROXY 也直连——所以方式 A 和 B 在脚本侧**行为完全一致**,差别只在客户端能不能自己分流。

### 怎么验证代理通

```bash
# 通过代理打海外
curl -x $MUSEUM_PROXY -sI https://collectionapi.metmuseum.org/public/collection/v1/objects/42704 | head -1
# 期望:HTTP/2 200

# 不走代理打大陆
curl -sI https://www.dpm.org.cn/ | head -1
# 期望:HTTP/1.1 200 或 301/302
```

两条都 200 就齐活了。

### 哪些清单项走 VPN(已分好,你不用思考)

- **`via_vpn: true`(走 VPN)**:Met / CMA / V&A / 芝大响堂山 / archive.org / wordpress(Childs-Johnson) / MDPI / OCS / 台湾 NHU
- **`via_vpn: false`(直连)**:上博 / 山博 / 震旦 / 故宫院刊 / 澎湃 / 知乎 / 国博 / 山大云冈学 / 腾讯新闻 / 社科院考古所

跑批量时,脚本会在每行计划前打 `[PLAN] VPN ...` 或 `[PLAN] CN  ...` 标签,你能看到每条该怎么走。

### Playwright 也用同一个代理

脚本里 Playwright(无头浏览器)也接 `MUSEUM_PROXY`——`via_vpn=true` 的 SPA 页面(比如 V&A 单件页)会自动通过代理开浏览器。不用你额外配。

---

## 2. 爬取工具:用什么、为什么

| 工具 | 干什么 | 用在哪类页面 |
|---|---|---|
| **httpx** | 普通 HTTP 抓取(跟随跳转) | 静态页、JSON API(大都会/克利夫兰开放接口) |
| **trafilatura** | 从乱糟糟的馆网 HTML 里**抽正文**(去广告/导航) | 澎湃、知乎、新闻长文 |
| **pdfplumber** | 抽 PDF 文字 | 故宫院刊 PDF、学位论文、MDPI |
| **Playwright(无头 Chromium)** | 渲染 JavaScript 页面再取内容 | 上博/山博/震旦官网这类 SPA(普通抓取会拿到空壳) |
| **Pillow** | 图片缩放到 ADR-003 上限(≤512/≤1024px)、算指纹 | 之后处理图像时 |

**判断用哪个**:清单 `sources_candidates.pilot.json` 里每条都标了 `fetch_hint`(`static_html`/`js_html`/`pdf`/`json_api`),脚本会自动按它派发。普通页先用 httpx;**抓回来正文是空的 → 加 `--js` 用浏览器重抓**(脚本会在 notes 里提示你)。

---

## 3. 要不要装额外的 Claude Code skill / plugin?

**结论:不强制。** 你本地 Claude Code 自带的 **WebFetch / WebSearch** + 上面这套 Python 脚本(用 Bash 跑)已经覆盖 90%。

- **WebFetch(内置,零安装)**:本地有正常网络时,它能直接抓 URL 转 markdown,适合**快速看一眼某页有没有料**。但它用小模型做摘要、不一定给原文、JS 重的页面可能抓不全——所以**正式抓取**还是走 Python 脚本(留指纹、存原文、可复现)。
- **Playwright MCP(可选,推荐)**:官方有个 `@playwright/mcp`,装上后 Claude 能**自己开浏览器点页面**——抓最刁钻的大陆 SPA 时很顺手。装法:
  ```bash
  claude mcp add playwright npx '@playwright/mcp@latest'
  ```
  装它**不踩红线**(开源、不花钱)。但不是必须——脚本里的 Playwright 已经够用,这个只是让 Claude 能交互式驾驶浏览器。

**别过度装插件**:抓取这件事,`curl` / Python / WebFetch 是主力,MCP 是锦上添花。

---

## 4. 东西存哪里(目录地图)

```
data/
  pipeline/
    in/
      sources_candidates.pilot.json   ← 我给你的"购物清单"(已在仓库)
    out/
      verified_chunks.json            ← 你的产出(脚本自动写),【提交回仓库】
      verified_chunks.schema.json     ← 产出的字段规范(已在仓库)
  raw/                                ← 抓回来的原始 HTML/PDF/图(大、含版权)
    <artifact>/<class>-<hash8>.<ext>     【.gitignore 了,只留本地,不提交】
scripts/fetch/
  fetch.py        ← 抓单个 URL(主力)
  run_list.py     ← 批量按清单抓(默认 dry-run,加 --go 才真抓)
  _common.py      ← schema/指纹/写盘 公共逻辑
```

**原则**:`data/raw/`(原始大文件 + 版权料)只留本地、不进 git;`verified_chunks.json`(结构化、小、是交付物)提交回来。这条已经在 `.gitignore` 写死。

---

## 5. 跑第一遍(pilot:三件样本)

```bash
source .venv/bin/activate
export MUSEUM_PROXY=http://127.0.0.1:7890   # 你 VPN 客户端的本地端口

# A) 先看计划(不抓任何东西)——确认清单读得对、VPN/CN 标签分对了
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json

# B) 真抓,但建议先只抓最值的那件(上博白石佛,大陆源最多、wow 最清楚)
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json \
    --go --artifact shanghai-white-marble-buddha

# C) 抓单个 URL(想精细控制 / 重试某条时)
#    脚本默认读 MUSEUM_PROXY;海外源会自动走代理。要强制直连就 --proxy ""
python scripts/fetch/fetch.py \
    --url https://www.mdpi.com/2076-0752/12/5/206 \
    --artifact aurora-hongshan-jade --source-class C --license CC-BY --tier high \
    --title "Jade for Bones in Hongshan Craftsmanship"

# D) 抓完看结果
cat data/pipeline/out/verified_chunks.json | python -m json.tool | head -60
```

**让本地 Claude 接手时**:把 `handoff/2026-06-06-local-verifier-handoff.json` 里的 `starter_prompt_for_local_session` 整段贴给它即可。

### 这一跑要拿到的(成功标准)
1. 每条清单在 `verified_chunks.json` 里都有记录(成功 / 或失败+原因)。
2. 至少 1 条 **CC-BY 全文**(MDPI 那篇)成功落地、标 `license=CC-BY tier=high`。
3. 至少 1 个 **dpm.org.cn 院刊 PDF** 成功抽出正文。
4. 产出一张**本机可达性地图**:大陆站点哪些通、`archive.org`/海外 OA 通不通。
5. 把结果跟三份 `agents/researcher/sample-bundles/*.md` 对照,确认**没有凭空内容**。

---

## 6. 红线(T3 — 碰到就停,问 PM,别绕)

- **不**注册账号、**不**付费、**不**绑卡、**不**签约、**不**以项目名义发帖。
- **不发邮件 / 不填表申请任何 API key 或权限**——**包括免费的**(如哈佛 API key、天龙山 3D 数据)。PM 决策:免费 key 也算红线,理由有二:
  1. 申请本身需要 PM 的判断(代表项目身份对外联络);
  2. 通宵彻夜执行场景下东八区无人回复,等不来。
  → 任何需要 email/表单获取凭证的源 → 直接记 `failed`,`failure_reason="needs_email_or_form_application"`,**不申请、不绕过**。
- 页面要登录 / 是付费墙 → 同上,记 `failed`,`failure_reason="needs_login_or_paywall"`。
- 微信公众号:**不抓**(平台条款 + 一直封)。只把文章链接列出来,人工读。
- 礼貌抓取:脚本已设 UA + 每条间隔延迟;**别把频率开太高**,先 `curl <站点>/robots.txt` 看规矩。

---

## 7. 抓完怎么交回给我(云端)

```bash
# 只提交结构化产出(原始大文件已被 .gitignore 挡掉)
git add data/pipeline/out/verified_chunks.json
git commit -m "data(rag): local Verifier pilot — <N> chunks across 3 sample items"
git push origin claude/museum-photo-sharing-8qJiz
```

推回来后告诉我"pilot 跑完了",我就把 `verified_chunks.json` 拉下来跑 **Compiler**(装订成 bundle),并据此校准 30 件的真实工时。

**只提交 `verified_chunks.json`**(必要时加合规图片到 `data/curated/images/`)。`data/raw/` 不要提交——它是你本地的证据留存。

---

## 8. 已知坑(先打预防针)

- **大陆 SPA 官网**(上博/山博/震旦):大概率要 `--js`,普通抓取拿到空壳。
- **archive.org**:你在国内**很可能连不上**——连不上不是 bug,记下来就是结论(说明这条源对国内执行不可靠)。
- **wordpress / 海外学者站**:`echildsjohnson.wordpress.com` 可能被墙;通不了就标失败。
- **含中文路径的 URL**(山大云冈学 PDF、芝大 `概览`):可能要 urlencode,httpx 一般能处理,不行就手动编码。
- **dpm.org.cn PDF**:这些是**最高 ROI**的——国内直连通常没问题,优先验证它们。
- **B 类源数据不在本仓库**:`data/sources/*.json`(大都会/克利夫兰 dump)当初没迁过来。pilot 里 B 类源改成**现抓单件 API**;要不要把整批 dump 迁过来,等 pilot 后我们再定。
