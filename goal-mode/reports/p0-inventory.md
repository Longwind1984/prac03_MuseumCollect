# P0 — 实现现状盘点报告

**盘点日期:** 2026-06-10
**对象:** 本仓库 `goal-mode/`(分支 `claude/code-goal-mode-CIFfq`,HEAD `c8ce628`)
**方法:** 直接读源码 + 行为级实测(所有"实测"标注均在本机当日复现)

---

## 1. 环境结论

| 项 | 值 | 结论 |
|---|---|---|
| `claude --version` | **2.1.170** (`/opt/claude-code/bin/claude`) | ≥ 2.1.139,满足对照评测前提 |
| 原生 /goal 存在性 | **实测存在**:干净配置下 `claude -p "/goal"` 返回 `No goal set. Usage: /goal <condition>`(num_turns=0,命令级响应);伪命令对照返回 `Unknown command` | 二手信息"CC 原生 /goal 已上线"**本机复核通过** |
| 原生 /goal headless | **实测可用**:`claude -p "/goal <条件>"` 直接驱动工作至条件满足 | 对照评测可全自动执行 |
| jq | jq-1.7 | 满足 |
| DIY 安装态 | `/root/.claude` 已装且 Stop hook 已注册;**但落后仓库一个 commit**(c8ce628 的 stall 检测未安装,4 个脚本有差异) | 用户本机使用前需重跑 `install.sh` |
| ⚠️ 同名冲突(实测) | 装有 DIY skill 的配置下,`/goal` 被 **DIY skill 接管**,原生命令被遮蔽(实测返回 dispatch.sh 输出而非原生 usage) | 双方共存时原生不可达;评测中原生臂使用无 skill 的干净配置隔离 |

## 2. 实现定位(全部文件级确认)

| 组件 | 位置 | 说明 |
|---|---|---|
| Stop Hook 链 | `scripts/goal/dispatcher.sh` → `continuation-hook.sh` | dispatcher 先跑 goal 续推,exit 2 则本轮短路;否则链式调用既有 `stop-hook-git-check.sh` |
| 状态 | `<project>/.claude/goal/spec.md` + `state.json` | spec 记 sha256;state 原子写(mktemp+mv)、属主 600 |
| 审计代理 | `scripts/goal/auditor.sh` | `claude -p` 干净上下文 + **真只读工具面**(Read/Grep/Glob + ls/cat/head/tail/wc + 只读 git);输出 enum 硬校验后规范化重序列化 |
| slash command | `skills/goal/SKILL.md` → `dispatch.sh` 路由 | start/status/pause/resume/abort/show-spec/audit |
| 防死循环 | `continuation-hook.sh` | 见下表"出口阀" |
| 阻塞指纹 | 同上 | `GOAL_BLOCKED:` 文本 sha256,同指纹连续 ×3 → blocked;中间正常轮重置 |
| 安装器 | `install.sh` | 幂等、备份 settings、支持 `CLAUDE_CONFIG_DIR` |
| QA harness | `test/run-qa.sh` | 46 断言、封闭(stub 审计、零 API 花费)、任意目录可跑 |

## 3. 实现-设计差异表(对照 handoff §3.1/§3.3 的 DIY 列)

| 维度 | handoff 描述 | 实际实现 | 差异评注 |
|---|---|---|---|
| 目标持久化 | "只读 spec.md(规格锚)+ state.json" | spec.md(600,记 sha256)+ state.json;状态机 **7 态**:active/paused/blocked/budget-limited/complete/aborted/**stalled** | 照做+扩展。spec 非文件系统级只读(锚定靠每轮重注入而非权限);新增 aborted 与 stalled 两态;另有 jq 失效也能生效的 STOP/ABORTED 哨兵文件(设计未提) |
| 续推驱动 | "Stop Hook 返回 decision:block 携带契约" | Stop hook **exit 2 + stderr 契约**(Claude Code 两种阻断形式之一,等价) | 换了等价路径;**实测在 `claude -p` 无人值守下完整工作**(本日烟雾测试:契约注入→第 2 轮完成工作→审计→闭环,主进程 $0.04) |
| 完成判定 | 隔离上下文审计代理(对照原始规格) | `GOAL_COMPLETE:` 行触发 → `claude -p` 干净上下文审计,只读工具,逐需求 MET/NOT_MET + gaps 回注 | 照做。触发策略=仅在完成声明时审计(吻合 §3.4 成本论点);另有 `audit-now.sh` 手动触发(设计外) |
| 反退化 | 契约照搬 + 每轮重读只读 spec | 契约每轮 verbatim 重注入 spec + reality-check 协议 + 显式点名三类失败模式(虚假完成/降级接受/**静默空转**) | 照做+;"静默空转"是 05-30 新增的第三类 |
| 出口阀 | state.json + 阻塞指纹计数 | ①完成(审计门禁)②blocked×3(指纹)③budget(turns/tokens,后置上限)④breather(软 6/硬 25)⑤**stall(8 轮工作树无变化)**⑥kill switch ×2(/goal abort、STOP 文件)⑦pause | 实现的出口远多于设计;stall 检测(工作树+commit 指纹连续不变→stalled)是对真实卡死 bug 的修复,设计完全没有 |
| 预算护栏 | (Codex: token 预算系统侧强制) | max_turns/max_tokens 后置上限;token 为 **transcript 字节/4 粗估**;resume +100 轮/+1M | 与 Codex 系统级精确计量不同——hook 能拿到的只有 transcript,这是平台扩展点的真实约束 |
| (设计有/实现无) | SQLite;usage-limited 态;`update_goal` 工具收窄 | 用 JSON 文件;无 usage-limited;用**文本 marker**(行首锚定)替代工具收窄 | marker 方案是 Hook 平台下的等价物:模型无任何可自闭目标的工具,state 只能由 hook 写 |
| (设计无/实现有) | — | 安装器、46 断言 QA、安全加固(jq 注入修复/审计工具面只读化/原子写/产物 600/历史上限)、stall 检测、审计递归守卫 | 两轮内部审计(risk-audit + test-report)驱动的加固,叙事上比"照搬设计"更有价值 |

## 4. 运行痕迹/证据源清单(P1 取证基础)

| 证据 | 位置 | 内容 |
|---|---|---|
| git 时间线 | `git log -- goal-mode/`:f5a2533(05-26)→ 575c9e5(05-27)→ 6dc313f/a793f36(05-29)→ c8ce628(05-30) | 交付天数 |
| 第一轮 QA 实录 | `reports/test-report.md`(05-27,22+ 项,含 4 FAIL 后修复) | 质量过程 |
| 风险审计 | `reports/risk-audit.md` | 2C/6H/6M 发现与修复 |
| 真实审计代理证据 | `reports/live-audit-evidence.md` + `/tmp/goal-live-A.exVL`、`/tmp/goal-live-B.T303`(工作树仍在) | COMPLETE 14s / INCOMPLETE 19s |
| 本日评测原始记录 | `eval/results/2026-06-10*/`(174 文件:envelope、transcript、state、审计日志、goal_status、meta) | P2 全部数据 |

## 5. P0 结论

实现与 handoff 描述**机制等价、路径有别、覆盖更宽**:核心四件套(规格锚定重注入、Stop-hook 续推、隔离审计、指纹化阻塞出口)全部落地且有实测;差异多为平台约束下的等价替换(exit 2 替代 decision:block、marker 替代工具收窄、字节估算替代系统计量)或后续加固新增(stall 检测、安全加固、QA harness)。**可以进入 P1/P2。**
