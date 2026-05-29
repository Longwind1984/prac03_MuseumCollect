#!/bin/bash
# Stop-hook dispatcher. Chains, in order:
#   1) goal continuation (if an active goal exists, keeps Claude running)
#   2) the user's pre-existing git-check hook, IF installed (skipped when goal blocks)
#
# Recursion guard: inside an auditor subprocess (GOAL_AUDITOR_SUBPROCESS=1) we exit
# cleanly so the auditor's `claude -p` never re-enters the continuation loop.

set -uo pipefail

GOAL_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${GOAL_AUDITOR_SUBPROCESS:-}" = "1" ]]; then
  exit 0
fi

input=$(cat)

# Phase 1: goal continuation. Let its stderr pass through directly to ours —
# the prior `2> >(cat)` capture was racy (async process substitution, no flush
# guarantee), and there's nothing to suppress: the continuation hook only emits
# stderr when that text MUST reach the harness (re-prompt contract on exit 2,
# completion/blocker/fail-safe banners on exit 0).
"$GOAL_HOME/continuation-hook.sh" <<< "$input"
goal_exit=$?
if [[ "$goal_exit" -eq 2 ]]; then
  # Goal hook blocks — downstream git-check is skipped this turn.
  exit 2
fi

# Phase 2: chain to the user's pre-existing git-check hook, only if present + executable.
next_hook="$(cd "$GOAL_HOME/../.." && pwd)/stop-hook-git-check.sh"
if [[ -x "$next_hook" ]]; then
  printf '%s' "$input" | "$next_hook"
  exit $?
fi
exit 0
