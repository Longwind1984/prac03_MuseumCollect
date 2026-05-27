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
    [[ "$turn" =~ ^[0-9]+$ ]] || turn=0
    [[ "$tokens" =~ ^[0-9]+$ ]] || tokens=0
    new_turns=$(( turn + 100 ))
    new_tokens=$(( tokens + 1000000 ))
    goal_state_set '.status = "active"'
    goal_state_set '.consecutive_blocks = 0'
    goal_state_set '.blocker.consecutive_count = 0'
    goal_state_set '.budget.max_turns = $v' --argjson v "$new_turns"
    goal_state_set '.budget.max_tokens = $v' --argjson v "$new_tokens"
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

# Clear the jq-independent kill sentinels so the re-armed loop isn't stopped on
# its first fire (abort.sh — or a consumed STOP — leaves an ABORTED file that
# the continuation hook treats as an authoritative stop).
rm -f "$(goal_aborted_path)" "$(goal_stop_path)" 2>/dev/null || true

cat <<EOF
STATUS=active
Continuation loop re-armed. On your next stop the goal contract is re-injected.${extra}
Kill switch: /goal abort   OR   touch $(goal_stop_path)
EOF
