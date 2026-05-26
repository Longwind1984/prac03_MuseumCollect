#!/bin/bash
# /goal resume — arm the continuation loop again (-> active).
# Resets the near-cap batch counter and the blocker counter so the loop
# gets a fresh run. From budget-limited, extends the budget so the loop
# can actually proceed instead of immediately re-tripping.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

if ! goal_is_initialized; then
  printf 'STATUS=none\nNo goal initialized in %s.\nStart one with: /goal start "<spec>"\n' "$(goal_project_dir)"
  exit 1
fi

status=$(goal_status)
case "$status" in
  active)
    printf 'STATUS=active\nAlready active — the loop is armed. Just keep working.\n'
    exit 0
    ;;
  complete)
    cat <<EOF
STATUS=complete
This goal was audited complete. Refusing to re-open it.
Start a new goal with: /goal start "<spec>"
EOF
    exit 1
    ;;
  paused)
    goal_state_set '.status = "active"'
    goal_state_set '.consecutive_blocks = 0'
    goal_history_append "resumed" "from paused"
    extra=""
    ;;
  blocked)
    goal_state_set '.status = "active"'
    goal_state_set '.consecutive_blocks = 0'
    goal_state_set '.blocker.consecutive_count = 0'
    goal_state_set '.blocker.last_reason_hash = null'
    goal_history_append "resumed" "from blocked; blocker counter reset"
    extra=$'\nBlocker counter reset. If the same blocker recurs 3× again it will re-block.'
    ;;
  aborted|budget-limited)
    turn=$(goal_state_get turn_count)
    tokens=$(goal_state_get tokens_estimated)
    new_turns=$(( ${turn:-0} + 100 ))
    new_tokens=$(( ${tokens:-0} + 1000000 ))
    goal_state_set '.status = "active"'
    goal_state_set '.consecutive_blocks = 0'
    goal_state_set '.blocker.consecutive_count = 0'
    goal_state_set ".budget.max_turns = $new_turns"
    goal_state_set ".budget.max_tokens = $new_tokens"
    goal_history_append "resumed" "from $status; budget extended to ${new_turns} turns / ${new_tokens} tokens"
    extra=$(printf '\nBudget extended: +100 turns (-> %s) / +1M tokens (-> %s).' "$new_turns" "$new_tokens")
    ;;
  *)
    goal_state_set '.status = "active"'
    goal_state_set '.consecutive_blocks = 0'
    goal_history_append "resumed" "from $status"
    extra=""
    ;;
esac

cat <<EOF
STATUS=active
Continuation loop re-armed. On your next stop the goal contract is re-injected.${extra}
Kill switch: /goal abort   OR   touch $(goal_stop_path)
EOF
