# `/goal` — long-running goal mode for Claude Code

A user-level Claude Code tool that turns a one-shot request into a **self-driving,
budget-bounded loop** with an independent, clean-context auditor. You hand it a
spec; a `Stop` hook re-injects that spec as a contract after every turn and keeps
Claude working until the goal is **audited** complete, you abort, it gets blocked,
or it runs out of budget.

It installs into `~/.claude`, so once installed it works in **any project and any
conversation** for your user — each project tracks its own goal under
`<project>/.claude/goal/`.

## Install

Requirements: `jq` (state), and the `claude` CLI on `PATH` (the auditor spawns
`claude -p`).

```bash
bash goal-mode/install.sh        # copies into ~/.claude, registers the Stop hook
```

Then **restart Claude Code** (or start a new session) so the new `Stop` hook
loads. Re-running the installer is safe (idempotent); it backs up your
`settings.json` before touching it. To install into a non-default config dir,
set `CLAUDE_CONFIG_DIR`.

## Usage

```
/goal start "<spec text>"   initialize a goal in the current project
/goal status                show state (turn/token budget, last audit, history)
/goal pause                 stop the loop re-prompting (work is untouched)
/goal resume                re-arm the loop (extends budget if it was exhausted)
/goal abort                 terminate the current goal
/goal show-spec             print the verbatim spec driving the loop
/goal audit                 run the clean-context auditor against the spec now
```

Write the spec like you're briefing a fresh agent: **what to build, what "done"
means, what constraints apply.** The auditor verifies against this text
literally, so be concrete about acceptance criteria.

```
/goal start "Add a /health endpoint returning {status:'ok'} as JSON.
Done means: route registered, returns 200 with that body, and a passing test
exists. Constraint: no new dependencies."
```

## Kill switch

Two independent ways to stop the loop at any time:

- **`/goal abort`** — orderly stop from the chat.
- **`touch <project>/.claude/goal/STOP`** — emergency stop from any shell; the
  next `Stop` hook sees the file, marks the goal aborted, and removes it.

Neither touches your working tree — nothing is reverted.

## How it works

- **`/goal start`** writes `<project>/.claude/goal/spec.md` + `state.json`
  (status `active`, turn/token budget).
- The **`Stop` hook** (`dispatcher.sh` → `continuation-hook.sh`) fires when Claude
  would stop. While the goal is `active` it re-injects the full goal **contract**
  (the verbatim spec + a reality-check protocol) on `stderr` and exits `2`, which
  tells Claude to keep going. The dispatcher then chains to your existing
  `stop-hook-git-check.sh` if you have one (skipped on turns the goal blocks).
- To finish, Claude emits a line `GOAL_COMPLETE: <summary>`. This does **not**
  self-close the goal — an **independent `claude -p` auditor** with no memory of
  the conversation re-derives the requirements from `spec.md` and verifies them
  against the real working tree (files, tests, git). Only a `COMPLETE` verdict
  closes the goal; otherwise the auditor's gaps are fed back into the contract.
- `GOAL_BLOCKED: <reason>` repeated for **3 consecutive turns** moves the goal to
  `blocked`. Budgets (`max_turns`, `max_tokens`) move it to `budget-limited`.

## Files

```
scripts/goal/
  lib.sh                shared state/path/contract helpers
  dispatch.sh           /goal subcommand router (called by the skill)
  dispatcher.sh         Stop-hook entry: goal continuation, then git-check
  continuation-hook.sh  the re-prompt / completion / blocker / budget logic
  auditor.sh            spawns the clean-context claude -p auditor
  start.sh status.sh pause.sh resume.sh abort.sh show-spec.sh audit-now.sh
skills/goal/SKILL.md     the /goal slash command
install.sh
```

## Uninstall

Remove `~/.claude/scripts/goal/` and `~/.claude/skills/goal/`, and delete the
`dispatcher.sh` `Stop` hook entry from `~/.claude/settings.json` (a `.bak.*`
copy from install time sits next to it).
