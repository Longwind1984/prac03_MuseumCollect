# Research · OD-2 海外 OA API 沙箱可达性 mini-spike · 2026-06-06

**召唤者**:Orchestrator(PM 当面授权,起 ADR-006 前置 de-risking)
**题目**:从**本 web 沙箱**测 AIC / Harvard / Penn 三家海外 OA 馆 API 的真实可达性,**填 ADR-006「执行环境 = P0」章节的实测数据**
**时间盒**:15 min(实际用时 ~10 min)
**置信度**:**高**(curl + WebFetch 双工具实测,统一拦截层证据充分)
**与 `2026-05-18-cn-llm-api-reachability.md` 的关系**:那份测国内 LLM API 出口,本份测**海外馆方 OA API + 海外图像 CDN** 出口,补全沙箱出口白名单图谱

---

## TL;DR(3 条,给 PM)

1. **海外 OA 三家全 403** —— `api.artic.edu`(AIC)、`api.harvardartmuseums.org`(Harvard)、`www.penn.museum`(Penn collection 搜索页)从本沙箱都返回 `HTTP 403` + 21 字节 body(`Host not in allowlist`),与上次报告测大陆域名 / archive.org 完全同一拦截层。**沙箱出口白名单没把海外馆方 OA 算进来**。
2. **图像 CDN 同样全死** —— `commons.wikimedia.org`、`upload.wikimedia.org` 也是 403。**这意味着:即使 metadata 通过 PM 本地段拿到,沙箱内也不能预热图像抓取**(回放上次 `houmuwu_ding.jpg` 21 字节占位事件)。
3. **白名单内的有效主机**(本次实测):`github.com` ✓ `raw.githubusercontent.com` ✓ `pypi.org` ✓。**仅此三家足以撑起 git push / pip install / 仓库内 grep**,但无法撑起 Pipeline 任何外网拉取动作。**ADR-006 的「执行环境 = P0」结论被 OD-2 升级为「web 沙箱可干的只有 Discovery + B 类源 grep + Compiler 模板装订」,Verifier 必须出沙箱**。

---

## 实测原始数据

### curl 探测(每域名 1 次,15 秒超时)

| 目标 | URL | HTTP | body 大小 | 含义 |
|---|---|---|---|---|
| AIC search API | `api.artic.edu/api/v1/artworks/search?q=northern+qi&limit=3` | **403** | 21B | host_not_allowed |
| Harvard object API | `api.harvardartmuseums.org/object?q=northern+qi` | **403** | 21B | host_not_allowed |
| Penn collection search | `www.penn.museum/collections/object/search.php?term=Tang` | **403** | 21B | host_not_allowed |
| archive.org(对照) | `archive.org/details/bmfea` | **403** | 21B | host_not_allowed(与 2026-05-18 一致) |
| github.com(对照) | `github.com/longwind1984/prac03_museumcollect` | **200** | 347 KB | ✓ |
| raw.githubusercontent.com(对照) | `raw.githubusercontent.com/.../main/README.md` | **404** | 14B | 主机通(分支/路径未命中) |
| commons.wikimedia.org(对照) | `commons.wikimedia.org/wiki/Special:FilePath/Houmuwu_ding.jpg` | **403** | 21B | host_not_allowed |
| upload.wikimedia.org(对照) | `upload.wikimedia.org/.../Houmuwu_ding.jpg` | **403** | 21B | host_not_allowed |
| pypi.org(对照) | `pypi.org/simple/` | **200** | 42 MB | ✓ pip 通 |

### WebFetch 二次确认(走 harness 内置抓取,非裸 curl)

| 目标 | WebFetch 结果 |
|---|---|
| api.artic.edu 同 URL | `The server returned HTTP 403 Forbidden` |
| api.harvardartmuseums.org 同 URL | `The server returned HTTP 403 Forbidden` |
| www.penn.museum 同 URL | `The server returned HTTP 403 Forbidden` |

**结论**:WebFetch 与 curl 走同一出口策略;harness 没有给 WebFetch 单独开白名单。

### DNS 解析(已成功,只 record 不打):

(略 —— 解析本身不被拦,与拦截发生在 L7 一致;参见 `2026-05-18-cn-llm-api-reachability.md` 同模式)

---

## 出口白名单图谱(整合本次 + 2026-05-18)

| 类目 | 主机 | 沙箱可达? | 来源 |
|---|---|---|---|
| 海外 OA 馆 API | api.artic.edu / api.harvardartmuseums.org / www.penn.museum | ❌ 403 | 本次 |
| 海外学术 OA | archive.org / bmfea(挂在 archive.org)| ❌ 403 | 2026-05-18 |
| 海外图像 CDN | commons.wikimedia.org / upload.wikimedia.org | ❌ 403 | 本次 |
| 大陆馆方 | dpm.org.cn / shanximuseum.com / shanghaimuseum.net 等 | ❌ 403 | 2026-05-18 |
| 大陆 LLM API | 智谱 / 千帆 / 火山 / 通义 / Kimi 国内端点 / DeepSeek | ❌ 403 | 2026-05-18 |
| Git 协议 | github.com | ✅ 200 | 本次 |
| 仓库 raw 拉取 | raw.githubusercontent.com | ✅ 主机通 | 本次 |
| Python 包源 | pypi.org / files.pythonhosted.org(推断) | ✅ 200 | 本次 |
| Anthropic / OpenAI(harness 内置) | 走 harness 自带通道,不走外网 | ✅ | 推断 |

**白名单只剩 GitHub 系 + pypi**。没有任何馆方 / OA 学术 / 图像 CDN / 大陆站点在白名单内。

---

## 给 ADR-006 的具体输入

### 「执行环境 = P0」章节应该这么写

- **本 web 沙箱可干**:
  1. Discovery sub-agent(URL 候选 + rationale,**不抓**)
  2. B 类源 grep(本仓库 `data/sources/*.json` 已落地 466k 行,纯本地)
  3. Compiler sub-agent(模板装订,**前提**:Verifier 已把 chunk 落本地)
  4. ADR / PRD / agent prompt 等文档工程
  5. `git push` / `pip install`
- **本 web 沙箱不能干**:
  1. Verifier sub-agent 的**任何外网抓取**(海外 OA、大陆馆、archive.org、Wikimedia)
  2. A / C / D / E 类源的**内容到手**步骤
  3. PDF 下载 + pdftotext(PDF 来源必须先落本地)
  4. 图像预取 / 缩略图生成(commons + upload 全死)
- **结论**:Pipeline **必须双环境分体**,Phase A(沙箱)+ Phase B(PM 本地 Claude Code CLI),**绝不能在 ADR-006 里假设单一环境跑通全链路**

### 与 2026-05-18 feasibility 报告的衔接

那份报告已说"执行环境 = ADR-006 真正的 P0 决策";本份用**海外 OA 也全 403** 这个新事实把结论再夯实一层:
- 不是"只有大陆段需要 PM 本地"
- 而是"**整个 Verifier 都需要 PM 本地**" —— 包括本来以为 web 沙箱能跑的 AIC / Harvard / Penn

这点直接关掉了"先把海外 OA 跑通,大陆段后议"的渐进路径。ADR-006 必须从第 1 句话就把双环境分体写进去。

### 仍然成立的乐观点

- B 类源(本仓库已落地的海外 OA JSON)100% agent 化,**在本沙箱就能跑完整 30 件的 grep + 命中分析**,不依赖任何外网 —— 这是 Pipeline 唯一可在沙箱独立交付的环节
- Discovery sub-agent 的 URL 候选生成 + rationale 也 100% 沙箱内可做 —— 因为它**不需要真的抓**,只需要列 candidate URL + 命中关键词 + 期望 license + 期望 content density
- 这两环加起来,沙箱可以独立交付一个**「30 件 × URL 候选清单 + B 类源命中报告」** 的中间产物,**给 PM 本地 CLI 当作 input** —— 这是双环境分体的天然 hand-off 边界

---

## 不确定 / 未自验

- **PM 本地 Claude Code CLI 是否真能跑通海外 OA API**:**未自验**(本沙箱跑不动,无法替 PM 测)。Harvard 需要免费 API key(注册门槛 = 一封邮件,不触发 T3 付费红线);AIC 无需 key;Penn CSV 是静态文件直链。**建议 PM 在本地开 Claude Code CLI 后,先用 5 分钟跑一次同样的 3 个 curl,确认本地确实通**,再启动 Verifier
- **是否有"白名单可申请扩展"的渠道**:这是 harness/平台层问题,**不在 Researcher 职责内**;ADR-006 可标"如未来 harness 开放 OA API 白名单,Verifier 可回流到沙箱执行"

---

## 给召唤者的具体建议

1. ADR-006 第 1 节就把双环境分体作为「决策」级别写出来,**不要塞到「后果与风险」**
2. Phase A / Phase B 的 hand-off contract 应该是 ADR-006 的核心交付物之一(input/output schema 写死)
3. **不要承诺"先跑海外 OA"**:Phase A 在沙箱里能干的只有 Discovery + B 类源 grep + Compiler 装订,**Verifier 全在 Phase B**
4. PM 决定执行环境之前,**不应进入 30 件 batch**;先用 1–2 件在 PM 本地走一遍 Phase B,**真正测出双环境 hand-off 的痛点**

[ Mini-spike 完 · 2026-06-06 · ~10 min ]
