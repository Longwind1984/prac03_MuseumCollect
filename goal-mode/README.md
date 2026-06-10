# `/mygoal` — long-running goal mode for Claude Code

A user-level Claude Code tool that turns a one-shot request into a **self-driving,
budget-bounded loop** with an independent, clean-context auditor. You hand it a
spec; a `Stop` hook re-injects that spec as a contract after every turn and keeps
Claude working until the goal is **audited** complete, you abort, it gets blocked,
or it runs out of budget.

It installs into `~/.claude`, so once installed it works in **any project and any
conversation** for your user — each project tracks its own goal under
`<project>/.claude/goal/`.

> **Why `/mygoal` and not `/goal`?** This tool was originally written as `/goal`,
> before Claude Code 2.1.139 shipped a built-in `/goal` command of the same name.
> A user-level skill named `goal` would shadow the built-in one, leaving the
> native command unreachable. Renaming the slash command to `/mygoal` lets both
> coexist in the same `~/.claude` config: `/mygoal` runs this DIY semantic-audit
> loop; `/goal` runs the built-in checker. The internal scripts directory is
> still `scripts/goal/` (path unchanged → in-place upgrades and any existing
> per-project `.claude/goal/` state migrate without changes).

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
/mygoal start "<spec text>"   initialize a goal in the current project
/mygoal status                show state (turn/token budget, last audit, history)
/mygoal pause                 stop the loop re-prompting (work is untouched)
/mygoal resume                re-arm the loop (extends budget if it was exhausted)
/mygoal abort                 terminate the current goal (a later /mygoal resume re-opens it)
/mygoal show-spec             print the verbatim spec driving the loop
/mygoal audit                 run the clean-context auditor against the spec now
```

Write the spec like you're briefing a fresh agent: **what to build, what "done"
means, what constraints apply.** The auditor verifies against this text
literally, so be concrete about acceptance criteria.

```
/mygoal start "Add a /health endpoint returning {status:'ok'} as JSON.
Done means: route registered, returns 200 with that body, and a passing test
exists. Constraint: no new dependencies."
```

## Kill switch

Two independent ways to stop the loop at any time:

- **`/mygoal abort`** — orderly stop from the chat.
- **`touch <project>/.claude/goal/STOP`** — emergency stop from any shell; the
  next `Stop` hook sees the file, marks the goal aborted, and removes it.

Neither touches your working tree — nothing is reverted.

## How it works

- **`/mygoal start`** writes `<project>/.claude/goal/spec.md` + `state.json`
  (status `active`, turn/token budget).
- The **`Stop` hook** (`dispatcher.sh` → `continuation-hook.sh`) fires when Claude
  would stop. While the goal is `active` it re-injects the full goal **contract**
  (the verbatim spec + a reality-check protocol) on `stderr` and exits `2`, which
  tells Claude to keep going. The dispatcher then chains to your existing
  `stop-hook-git-check.sh` if you have one (skipped on turns the goal blocks).
- To finish, Claude emits a line `GOAL_COMPLETE: <summary>`. This does **not**
  self-close the goal — an **independent `claude -p` auditor** with no memory of
  the conversation re-derives the requirements from `spec.md` and verifies them
  against the real working tree using **read-only** tools (it reads files, git
  state, and any test/build artifacts already present — it does not execute
  tests or other code). Only a `COMPLETE` verdict closes the goal; otherwise the
  auditor's gaps are fed back into the contract.
- `GOAL_BLOCKED: <reason>` repeated for **3 consecutive turns** moves the goal to
  `blocked`. Budgets (`max_turns`, `max_tokens`) move it to `budget-limited`.
- **Stall detection.** A self-aware agent emits `GOAL_BLOCKED`; a *stuck* one
  often doesn't — it just keeps re-reading the same files or re-claiming without
  changing anything. So the loop also watches whether each turn actually changed
  the project: it fingerprints the git commit + uncommitted changes (excluding
  the goal's own `.claude/goal/` bookkeeping; the transcript never counts). If
  that fingerprint is identical for **`GOAL_STALL_THRESHOLD` consecutive turns**
  (default 8) with no completion/blocker declared, the goal moves to `stalled`
  and the loop stops with a clear diagnosis instead of spinning to the hard
  breather or budget. Any real file/commit change resets the counter, so a
  legitimately-working agent is never interrupted; `/mygoal resume` re-arms it (and
  if it was mid-investigation, that's all it takes). Stall detection is inert
  outside a git work tree, and `GOAL_STALL_THRESHOLD=0` disables it entirely.

## Tuning

The loop's behavior is controlled by environment variables (read by `lib.sh`).
Defaults are sensible; override if you need different cadence in CI or for an
unusually large/small goal. Set them in the shell you launch Claude Code from,
or in your shell rc.

| Variable | Default | Effect |
| --- | --- | --- |
| `GOAL_BREATHER_SOFT` | `6` | Pause the loop after this many auto-continuations when `stop_hook_active != false`. |
| `GOAL_BREATHER_HARD` | `25` | Pause unconditionally after this many auto-continuations. |
| `GOAL_BLOCKER_THRESHOLD` | `3` | Identical `GOAL_BLOCKED:` reasons this many turns in a row → `blocked`. |
| `GOAL_STALL_THRESHOLD` | `8` | No working-tree/commit change for this many consecutive turns → `stalled`. `0` disables. |
| `GOAL_DEFAULT_MAX_TURNS` | `200` | Default turn budget for `/mygoal start`. |
| `GOAL_DEFAULT_MAX_TOKENS` | `2000000` | Default token budget for `/mygoal start`. |
| `GOAL_RESUME_TURN_BUMP` | `100` | Extra turns `/mygoal resume` adds when re-arming from an exhausted budget. |
| `GOAL_RESUME_TOKEN_BUMP` | `1000000` | Extra tokens `/mygoal resume` adds when re-arming. |
| `GOAL_HISTORY_MAX` | `50` | Keep at most this many history events in `state.json`. |
| `GOAL_TRANSCRIPT_TAIL_LINES` | `500` | Window scanned for the last assistant message (long-goal performance). |
| `GOAL_AUDIT_BUDGET_USD` | `1.50` | Per-audit spend cap for the `claude -p` auditor. |
| `GOAL_AUDIT_TIMEOUT` | `360` | Per-audit wall-clock cap (seconds). |

## Files

```
scripts/goal/
  lib.sh                shared state/path/contract helpers
  dispatch.sh           /mygoal subcommand router (called by the skill)
  dispatcher.sh         Stop-hook entry: goal continuation, then git-check
  continuation-hook.sh  the re-prompt / completion / blocker / budget logic
  auditor.sh            spawns the clean-context claude -p auditor
  start.sh status.sh pause.sh resume.sh abort.sh show-spec.sh audit-now.sh
skills/mygoal/SKILL.md   the /mygoal slash command
test/run-qa.sh           portable, hermetic QA harness (see Testing)
install.sh
```

## Testing

```bash
bash goal-mode/test/run-qa.sh
```

A self-contained behavioral harness for the Stop-hook state machine. It runs
from **any directory in any repo** (it locates the scripts relative to itself,
not via cwd), never touches your real `~/.claude` or any real project (every
test runs in a throwaway `git init` dir), and is **free** — the auditor is
stubbed, so there are no `claude -p` calls. It covers start/continue/budget,
the blocker streak, completion auditing (COMPLETE closes / INCOMPLETE continues
with gaps), the multi-line marker fix, both kill switches, pause, the recursion
guard, and stall detection (trip / reset-on-progress / resume). Exit `0` = all
assertions passed.

## Uninstall

Remove `~/.claude/scripts/goal/` and `~/.claude/skills/mygoal/`, and delete the
`dispatcher.sh` `Stop` hook entry from `~/.claude/settings.json` (a `.bak.*`
copy from install time sits next to it).
