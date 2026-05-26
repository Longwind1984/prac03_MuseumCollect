---
name: goal
description: Long-running goal mode. Use to start, inspect, pause/resume, or abort a self-driving goal in this project.
argument-hint: <start|status|pause|resume|abort|show-spec|audit> [args]
disable-model-invocation: true
allowed-tools: Bash
---

The user invoked `/goal` with arguments: `$ARGUMENTS`

Run the dispatch script and print its output verbatim to the user:

```bash
bash "$HOME/.claude/scripts/goal/dispatch.sh" $ARGUMENTS
```

After the script returns:
- If the output contains `STATUS=active`, this is a freshly started or resumed goal. Remind the user of the kill switches:
  - `/goal abort` — orderly stop
  - `touch <project>/.claude/goal/STOP` — emergency stop from any shell
- Do not editorialize the script's output, just relay it.
- Do not interpret the goal yourself — once goal is active, the Stop hook will re-prompt you on each turn with the full continuation contract.
