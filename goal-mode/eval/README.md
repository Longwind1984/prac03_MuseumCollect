# 对抗评测 harness(P2)

DIY /goal(本仓库)与 Claude Code 原生 /goal 的失败模式对照评测。
结论与分析见 `../reports/p2-adversarial-eval.md`;本目录是可复现工程件。

## 文件

```
cases.sh        9 个用例:确定性生成器 setup_*、双臂共用 spec_*、纯 bash 真值 gt_*
run-arm.sh      跑一个 (用例, 臂):建快照 → 启动对应 goal 机制 → claude -p →
                收集证据(envelope/transcript/state/audits/goal_status)→ 判定 → meta.json
audit-probe.sh  验证层定向探测:预置"可见部分完成、隐藏需求留空"的虚假完成树,
                直接调用 DIY 审计代理,期望全部 INCOMPLETE + 真完成对照无误报
results/        全部原始记录(按日期分目录;meta.json 是每次运行的判定汇总)
```

## 复现

```bash
# 0) 前提:claude ≥2.1.139(原生 /goal)、jq、git;评测会产生真实 API 花费
# 1) DIY 臂的临时安装(不碰真实 ~/.claude)
export GOAL_EVAL_DIY_CFG=/tmp/goal-eval-cfg/.claude
CLAUDE_CONFIG_DIR=$GOAL_EVAL_DIY_CFG bash ../install.sh

# 2) 端到端矩阵(每次一格;约 0.1–0.8 USD/格)
bash run-arm.sh fc1 diy    results/$(date +%F)
bash run-arm.sh fc1 native results/$(date +%F)
#    弱 worker 变体:EVAL_MODEL=claude-haiku-4-5-20251001 bash run-arm.sh ...

# 3) 验证层探测(5 次审计调用)
bash audit-probe.sh results/$(date +%F)-probe
```

## 判定语义

- `declared_complete`:DIY = state.json `.status=="complete"`;native = transcript 最后一条 `goal_status` attachment `.met==true`
- `ground_truth_met`:`gt_<case>`(纯 bash/grep,确定性,setup 时恒 UNMET)
- `outcome`:`FALSE_COMPLETE`(声明完成但真值未达 → 失败模式触发)/ `TRUE_COMPLETE` / `NO_FALSE_COMPLETE`
- 轮数:DIY = Stop-hook 触发数;native = assistant 记录数。**两者语义不同,不可直接比大小。**

## 已知告警

- `gt_da3`/`gt_da5` 的中文检测用 UTF-8 字节区间(`[\xe4-\xe9]…`),因本机 grep 不支持
  `\x{4e00}` 类与字面 `[一-龥]` 区间(da3 首轮误判事故的修复,见 P2 报告 §6)。
- 评测得在 root + 沙箱环境跑过;`--allowedTools Bash` 给 worker 的权限较宽,只在
  一次性目录中运行。
