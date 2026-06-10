#!/bin/bash
# /mygoal resume — arm the continuation loop again (-> active).
# Resets the breather streak and the blocker counter. From budget-limited,
# extends the budget so the loop can actually proceed instead of immediately
# re-tripping. All per-branch state changes are done in ONE jq program — one
# atomic write instead of four.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

if ! goal_is_initialized; then
  printf 'STATUS=none\nNo goal initialized in %s.\nStart one with: /mygoal start "<spec>"\n' "$(goal_project_dir)"
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
Start a new goal with: /mygoal start "<spec>"
EOF
    exit 1
    ;;
  paused)
    goal_state_set '.status = "active" | .continuation_streak = 0 | .progress = {last_fingerprint:null, no_progress_count:0}'
    goal_history_append "resumed" "from paused"
    extra=""
    ;;
  blocked)
    goal_state_set '.status = "active" | .continuation_streak = 0 | .blocker = {last_reason_hash:null, consecutive_count:0} | .progress = {last_fingerprint:null, no_progress_count:0}'
    goal_history_append "resumed" "from blocked; blocker counter reset"
    extra=$'\nBlocker counter reset. If the same blocker recurs '"$GOAL_BLOCKER_THRESHOLD"$'× again it will re-block.'
    ;;
  stalled)
    # Reset the progress tracker — otherwise the unchanged fingerprint would
    # re-trip the stall on the very next turn before the agent can act.
    goal_state_set '.status = "active" | .continuation_streak = 0 | .progress = {last_fingerprint:null, no_progress_count:0}'
    goal_history_append "resumed" "from stalled; progress tracker reset"
    extra=$'\nStall tracker reset. If no file/commit change occurs for '"$GOAL_STALL_THRESHOLD"$' more turns it will re-stall.'
    ;;
  aborted|budget-limited)
    turn=$(goal_state_get turn_count)
    tokens=$(goal_state_get tokens_estimated)
    [[ "$turn" =~ ^[0-9]+$ ]] || turn=0
    [[ "$tokens" =~ ^[0-9]+$ ]] || tokens=0
    new_turns=$(( turn + GOAL_RESUME_TURN_BUMP ))
    new_tokens=$(( tokens + GOAL_RESUME_TOKEN_BUMP ))
    goal_state_set '
        .status = "active"
      | .continuation_streak = 0
      | .blocker.consecutive_count = 0
      | .progress = {last_fingerprint:null, no_progress_count:0}
      | .budget.max_turns = $mt
      | .budget.max_tokens = $mtk
      ' --argjson mt "$new_turns" --argjson mtk "$new_tokens"
    goal_history_append "resumed" "from $status; budget extended to ${new_turns} turns / ${new_tokens} tokens"
    extra=$(printf '\nBudget extended: +%s turns (-> %s) / +%s tokens (-> %s).' \
              "$GOAL_RESUME_TURN_BUMP" "$new_turns" "$GOAL_RESUME_TOKEN_BUMP" "$new_tokens")
    ;;
  *)
    goal_state_set '.status = "active" | .continuation_streak = 0 | .progress = {last_fingerprint:null, no_progress_count:0}'
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
Kill switch: /mygoal abort   OR   touch $(goal_stop_path)
EOF
