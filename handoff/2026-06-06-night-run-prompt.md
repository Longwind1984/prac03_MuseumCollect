# 🌙 夜跑指令包 · 本地 Claude Code · Phase B Autonomous

> **PM 操作流(3 步)**:
>
> 1. 本地终端 `cd` 到 repo 目录(没 clone 就先 `git clone ... && cd prac03_MuseumCollect`),`git checkout claude/museum-photo-sharing-8qJiz && git pull`。
> 2. 配好 VPN(参考 `docs/LOCAL-SETUP.md` §1.5),终端里 `export MUSEUM_PROXY=http://127.0.0.1:7890`(端口换成你客户端的)。
> 3. 启动 Claude Code,把**下面整条分隔线之间的 prompt**整段粘贴成第一条消息。回车 → 关电脑去睡。
>
> **早晨醒来看**:
> - `docs/NIGHT-RUN-REPORT.md` —— 战果总结
> - `data/pipeline/out/verified_chunks.json` —— 抓到的所有料
> - `agents/researcher/sample-bundles/` —— Compiler 新装订的 bundle
> - `agents/strategy-curator/exhibit-list.md` —— AI 起草的 27 件 DRAFT 清单(等你删改)
> - 分支最新 commit + 推到 origin
>
> **时间预算**:6–8 小时。它跑完会停,不会无限循环。

---

==========  以下整段贴给本地 Claude Code  ==========

你是这个 RAG 知识库项目的**夜班执行节点**,身份合并:Discovery + Verifier + Compiler 三角色一肩挑。PM 已睡,凌晨不会回话。**你的工作是在 6–8 小时内,把能干的全干完,绝不挂起等回答**。

## 你不许做的(踩到就立即停下、记录、跳过、继续下一项)

1. **T3 红线**(不可逾越,**包括看似无害的"免费 key 申请"**):
   - 不注册任何账号、不付费、不绑卡、不签约
   - **不发邮件、不填表、不申请任何 API key 或权限**(免费的也不行 —— PM ruling 2026-06-06:理由是"夜跑场景东八区无人回信,等不来")
   - 不联系馆方任何人,不在社交平台以项目名义发任何东西
   - 不抓微信公众号(平台条款 + 一直封)
   - 任何需要登录/付费/邮件凭证的源 → 立刻记 `failed` + `failure_reason="needs_login_or_paywall"` 或 `"needs_email_or_form_application"`,**不暂存、不绕过、不等回信**
2. **反幻觉硬门**(PM 选"严格门"):
   - 没 URL 的 chunk → 拒收
   - 没 `content_hash` 的 chunk → 自动降 `low` tier,不得作为正文引用
   - `license=unknown` → 封顶 `low` tier,不得全文向量化
   - 找不到时**必须**显式写"X 类源未到手,原因 Y";**严禁**用旁证补足代写、严禁"近似拼合"
3. **不许越权 PM 决策**:
   - 你**可以**起草 27 件 candidate list,但**必须**标 `DRAFT — pending PM review`
   - 你**不可以**把任一 DRAFT 当成 PM 已签字
   - 你**不可以**改 `docs/PRD.md`、`docs/ADR/00*.md` 主体(只能在 ADR 末尾追加 night-run-log 章节)
   - 你**不可以**动 `main` 分支,只在 `claude/museum-photo-sharing-8qJiz` 上推
4. **不许 escalate 阻塞**:
   - 任何"看似需要 PM 决定"的边界情况 → 按本 prompt 既定规则 fall-safe,记下来留报告里给 PM 早晨看,**继续往下跑**
   - 不要写 "等待 PM 确认" 然后停下
   - 不要在 PR 评论里 @PM 求决策

## 先读这些(按顺序,失败任一条不致命就继续)

1. `docs/LOCAL-SETUP.md` —— 环境配置 + VPN
2. `docs/ADR/006-open-discovery-pipeline.md` —— 三角色契约 + 反幻觉状态机 + PM 签字附录
3. `docs/ADR/003-knowledge-sources.md` —— 六层知识源 + 7 字段入库格式 + 图像分层
4. `agents/researcher/reports/2026-06-06-od2-overseas-oa-reachability.md` —— 我(云端)实测的可达性数据(沙箱全 403,你本地应该好得多)
5. `agents/researcher/reports/2026-05-18-discovery-pipeline-feasibility.md` —— 5 类源可行度 + 30 件诚实工时
6. `agents/strategy-curator/exhibit-list.md` —— 30 件清单架(目前空,你今晚的产出之一)
7. `agents/strategy-curator/data-relevance.md` —— "北朝—初唐"窗口 287 chunks + 143 图像强支撑,Phase 1 真正可做的窗口
8. `agents/user-voice/principles.md` —— 4 条用户原则,Compiler 装订时遵循
9. `agents/researcher/sample-bundles/*.md` —— 三件样本(你装订的对照标准)
10. `data/pipeline/in/sources_candidates.pilot.json` —— 28 条 pilot 候选(你的起跑清单)
11. `data/pipeline/out/verified_chunks.schema.json` —— 你产出的字段规范

## 你的执行序列(7 个阶段,每阶段都有 fall-safe)

### 阶段 0 · 环境自检(15 分钟时间盒)

```bash
# 1. 检查 Python 环境
python3 --version  # 期望 ≥ 3.10
ls .venv 2>/dev/null || python3 -m venv .venv
source .venv/bin/activate
pip install -q -r scripts/fetch/requirements-fetch.txt
playwright install --with-deps chromium 2>&1 | tail -5

# 2. 检查 VPN
echo "MUSEUM_PROXY=$MUSEUM_PROXY"
if [ -z "$MUSEUM_PROXY" ]; then
  echo "WARN: MUSEUM_PROXY 未设置 → 海外源全部记 failed,只跑大陆源"
else
  curl -sI -x "$MUSEUM_PROXY" --max-time 10 https://collectionapi.metmuseum.org/public/collection/v1/objects/42704 | head -1
  # 200 = VPN 通; 非 200 = 海外源全部记 failed,只跑大陆源
fi

# 3. 大陆直连自检
curl -sI --max-time 10 https://www.dpm.org.cn/ | head -1
# 200/301 = 大陆通; 非 = 记下来,大陆源也会失败
```

**fall-safe**:
- 装环境失败的某个包(比如 playwright)→ 记在报告"环境告警";仍跑 httpx 能跑的部分,跳过 `--js`
- VPN 不通 → 海外源全跑 failed,只跑大陆源 + Compiler 装订仍走
- 大陆直连不通(极少)→ 极端情况下两端都失败,记报告,跳到阶段 6(写报告 + commit)

### 阶段 1 · Pilot dry-run + 真抓(60–90 分钟时间盒)

```bash
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json   # 看计划
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.pilot.json --go --delay 2.0
```

**fall-safe**:
- 单条 fetch 失败 → 脚本已自动记 failed + reason,继续下一条
- 大陆 SPA 抓回空正文 → 脚本会在 notes 写"empty text from plain HTTP — retry with --js";你**可以**手动重抓一次加 `--js`:
  ```bash
  python scripts/fetch/fetch.py --url <URL> --artifact <id> --source-class <X> --js --license <L> --tier mid
  ```
- 时间盒到了还没跑完 → 跳到阶段 2,把剩下的 pilot 留报告

**产出**:`data/pipeline/out/verified_chunks.json` 应有 ≥ 15 条记录(成功+失败相加)。

### 阶段 2 · Discovery 起草 27 件 candidate list(60–90 分钟时间盒)

目标:把 `agents/strategy-curator/exhibit-list.md` 从空架填到 30 件(3 件 pilot 已有 + 27 件新起草)。

**起草规则**(必须遵守,否则违反 ADR):
- 每件必须**来自馆方公开页面或已知现场报道**(不许凭空想)
- 每件标 `DRAFT — pending PM review`
- 每件起草时**至少跑 1 次馆方官网或公众号搜索**确认存在
- **跨馆对照件(B 类源)用 Met/CMA/V&A search API 现查**,不用本仓库 dump(`data/sources/*.json` 不在,这是 ADR-006 §反模式)

**API 端点参考**(都不要 key):
- Met: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=...&hasImages=true` → 返 objectIDs;然后 `/objects/{id}`
- CMA: `https://openaccess-api.clevelandart.org/api/artworks/?q=...&has_image=1` → 返 artworks
- V&A: `https://api.vam.ac.uk/v2/objects/search?q=...` → 返 records
- Smithsonian: `https://api.si.edu/openaccess/api/v1.0/search?q=...&api_key=...`(**需 key,跳过**)
- Wikidata: `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=...&format=json`

**目标 27 件配额**(按 ADR-003 数据相关性表 + PM 已定 30 件结构):
- 山博 14 件(已 1 件 pilot:观音五尊像)→ 集中在"佛风遗韵"展厅 + 同馆其它北朝—初唐;按需补山西本地铜佛/小型造像
- 上博 5 件(0 件 pilot)→ 商周青铜馆首选(FSG/CMA OA 池强),例如大克鼎、子仲姜盘
- 上博东馆 4 件(已 1 件:白石佛立像)→ 同雕塑馆其它北朝—初唐
- 震旦 4 件(已 1 件:玉神人)→ 古玉为主(灵光展期内 2025-05~2026-10)

**写到哪**:
- 主清单:`agents/strategy-curator/exhibit-list.md`(把空表格填上,标 DRAFT)
- 27 件的候选 URL 清单:`data/pipeline/in/sources_candidates.full30.json`,跟 pilot 同 schema

**fall-safe**:
- 找不到某件 5 类源齐全 → 标 `bundle_density_predicted: thin`,**不要硬塞**
- 某馆当前在展件信息查不到 → 用"该馆主题永久陈列件"代替,标 `verification_status: museum_homepage_not_confirmed`
- 某类品没有明显候选(比如震旦古玉一时找不到 4 件) → 起草到几件算几件,缺额报告里写明

### 阶段 3 · 跑 27 件 candidate list(120–180 分钟时间盒)

```bash
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.full30.json   # 计划
python scripts/fetch/run_list.py data/pipeline/in/sources_candidates.full30.json --go --delay 2.0
```

**fall-safe**:
- 单条失败:同阶段 1
- 整组失败(某馆官网全挂):记报告,跳过那批,继续下一件
- 时间盒到了:停;剩下的留报告

### 阶段 4 · Compiler 装订 sample bundles(60–90 分钟时间盒)

把 `data/pipeline/out/verified_chunks.json` 里每件 artifact 的 chunks 装订成一份 markdown bundle,套用 `agents/researcher/sample-bundles/shanghai-northern-qi-white-marble-buddha.md` 那份**最完整样本**的模板:

```
# Sample Bundle · <name_zh> · <museum>
**调研日期** + **调研者:Compiler (night-run 2026-06-XX)**

## 0. 展品识别(表格)
## 1. 来源 A · 馆方一手页面
## 2. 来源 B · 跨馆对照件(海外 OA)
## 3. 来源 C · 学术论文 / 学者文章
## 4. 来源 D · 现场场域
## 5. 来源 E · 数字人文 / 跨域 OA
## 6. 样本 bundle 评估
## 7. 反向发现 / 该展品不工作的源
```

**装订规则**(严格门):
- 每段引用必须能追到 `verified_chunks.json` 里一条 `fetch_status=ok` 的 chunk
- `license=unknown` 的 chunk **只能列 URL + 标题**,不许引正文
- 没 chunk 的源类 → 写"**未到手**,原因:<failure_reason 或 'no candidate sourced'>",**绝不脑补**
- "评估"段写实际比例(几类源到手 / 5)
- 文件名:`agents/researcher/sample-bundles/<artifact_id>.bundle.md`(`.bundle.md` 后缀区分 AI 装订 vs 之前 Researcher 手写的 sample bundles)

### 阶段 5 · 写夜班报告(30 分钟时间盒)

写 `docs/NIGHT-RUN-REPORT.md`,结构:

```
# Night-Run Report · 2026-06-XX

## TL;DR(3 条给 PM)
1. ...
2. ...
3. ...

## 数字
- pilot 跑了 X/28 条,成功 Y 条,失败 Z 条
- Discovery 起草 27 件 DRAFT,实际 fetch W 条 candidates,verified_chunks 增加 V 条
- Compiler 装订 N 个 bundle.md
- 总耗时 H 小时

## 本机可达性地图
| 主机域名 | via | 状态 | 备注 |
|---|---|---|---|
| dpm.org.cn | direct | 200 | PDF 抽文正常 |
| archive.org | VPN | 200/blocked | ... |
| ... | | | |

## 跑成功的亮点(≥ 2 条)
- 比如:V&A O129249 拿到了,license_observed = 实际值
- 比如:MDPI Jade-for-Bones CC-BY 全文 high-tier 入库

## 跑失败的边界(诚实标)
- archive.org 即使 VPN 也只 503(本地能拿到的现实)
- 震旦某件官网 0 命中,起草进 DRAFT 但 candidates 全 failed

## 给 PM 的待签字 / 待决策(只列,不挂起)
- DRAFT 27 件清单见 agents/strategy-curator/exhibit-list.md,请删改
- 某件原本是 sample 3 类型(B=0)被自动保留为 DRAFT,要不要劝退请 PM 定
- ...

## 没踩红线证明
- T3:0 次注册 / 0 封邮件 / 0 次填表
- main 分支:0 次推送
- ADR/PRD 主体:0 字改动(仅末尾追加 night-run-log)

## 路线图
- 早晨 review 30 件清单后,跑哪一批 batch
- 后续可决项(留 P0 / P1)
```

### 阶段 6 · Commit + push(15 分钟时间盒)

```bash
# .gitignore 已挡 data/raw/,verified_chunks.json 等是要推的
git status
git add data/pipeline/ agents/strategy-curator/exhibit-list.md agents/researcher/sample-bundles/*.bundle.md docs/NIGHT-RUN-REPORT.md
git commit -m "data(rag): night-run $(date +%F) — pilot+27件 DRAFT+bundles+可达性地图"
git push origin claude/museum-photo-sharing-8qJiz
```

**不要**创建 PR(PM 没要求,且 PR 涉及 review request)。只 push 分支。

### 阶段 7 · 收工

打印一句话:`NIGHT-RUN DONE @ $(date). See docs/NIGHT-RUN-REPORT.md.` 然后**停止**。**不要**进入新一轮。**不要**尝试"再 polish 一下"。

## 全局时间盒 + 救火规则

- **总预算 8 小时**;到 7 小时时,**强制**跳到阶段 5(报告)+ 6(push),哪怕阶段 3/4 没跑完。报告里诚实标"被时间盒打断"。
- 单 fetch **超时 90 秒** 就放弃这条,记 failed
- 单阶段超过 1.5× 时间盒 → 跳下一阶段,把剩的 backlog 写进报告
- 任何 Python exception → 捕获、记录、继续。**不要 raise 出循环**
- 任何 git 操作失败 → 重试 1 次,失败就在报告里写,**继续**

## 你可以自决的(不需要问 PM)

- 装哪个 Python 包、用哪个 VPN 端口
- 重抓某条 fetch(`--js`、重试一次)
- 在哪个文物的 candidates 里加一两条你查到的 URL
- 装订 bundle 时的措辞(只要遵循 user-voice 原则 + 反幻觉规则)
- 时间盒重新分配(总预算 8 小时不变)
- 跳过明显死的源(403 三次后放弃)

## 你不能自决的(以下任一发生,记报告,继续别的)

- 改 30 件清单的"最终件"(只能起草 DRAFT)
- 删 sample 3 类型件(私立馆 / 冷窗口) → 标 DRAFT,PM 早晨决定
- 改 ADR / PRD 主体
- 推 `main` / 别的分支
- 给 PR 找 reviewer / 发评论

---

**最后一句话**:产品哲学是"诚实标边界 = 卖点"。今晚你能做的最有价值的事,不是"拼出最丰满的 30 件 bundle",而是"诚实记录这台机器在国内 IP + VPN 下,真能拿到什么 / 拿不到什么 / 为什么"。Sample 3 玉神人那种"B 类源 0 件命中、靠学术撑场"的 bundle 比"看起来很满"的造假 bundle 价值高 10 倍。

夜安。开干吧。

==========  以上整段贴给本地 Claude Code  ==========
