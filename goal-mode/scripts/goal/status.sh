#!/bin/bash
# /goal status — print human-readable state of the current goal.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

if ! goal_is_initialized; then
  cat <<EOF
STATUS=none
No goal initialized in $(goal_project_dir).
Start one with:
  /goal start "<spec text>"
EOF
  exit 0
fi

state_path=$(goal_state_path)
status=$(goal_state_get status)
created=$(goal_state_get created_at)
turn=$(goal_state_get turn_count)
max_turns=$(goal_state_get budget.max_turns)
tokens=$(goal_state_get tokens_estimated)
max_tokens=$(goal_state_get budget.max_tokens)
spec_sha=$(goal_state_get spec_sha256)
blocker_count=$(goal_state_get blocker.consecutive_count)
no_progress=$(goal_state_get progress.no_progress_count)
[[ "$no_progress" =~ ^[0-9]+$ ]] || no_progress=0
last_audit_turn=$(goal_state_get audits.last_turn_audited)
last_verdict=$(goal_state_get audits.last_verdict)

cat <<EOF
STATUS=$status
  project:           $(goal_project_dir)
  created:           $created
  turn:              $turn / $max_turns
  tokens (est):      $tokens / $max_tokens
  consecutive block: $blocker_count / $GOAL_BLOCKER_THRESHOLD
  no-progress turns: $no_progress / $GOAL_STALL_THRESHOLD
  spec sha256:       ${spec_sha:0:12}…
  last audit:        ${last_audit_turn:-—} ($last_verdict)
  state file:        $state_path
EOF

if [[ "$last_verdict" = "INCOMPLETE" ]]; then
  gaps=$(goal_state_get audits.last_gaps)
  if [[ -n "$gaps" && "$gaps" != "null" ]]; then
    printf '\nLast auditor gaps:\n%s\n' "$gaps"
  fi
fi

printf '\nLast 5 history events:\n'
jq -r '.history | (if length > 5 then .[-5:] else . end) | .[] | "  [\(.ts)] turn \(.turn): \(.event)\(if .note then " — " + .note else "" end)"' "$state_path" 2>/dev/null || printf '  (no history)\n'

case "$status" in
  active)
    printf '\nKill switches: /goal abort   OR   touch %s\n' "$(goal_stop_path)"
    ;;
  paused)
    printf '\nPaused. Resume with: /goal resume\n'
    ;;
  blocked)
    printf '\nBlocked. Review the spec & history, then either /goal abort or /goal resume after the blocker is resolved.\n'
    ;;
  stalled)
    printf '\nStalled — no working-tree/commit change for %s turns. Make a concrete change or unblock it, then /goal resume (or /goal abort).\n' "$no_progress"
    ;;
  complete)
    printf '\nGoal complete (audited). You may /goal start a new one when ready.\n'
    ;;
  aborted|budget-limited)
    printf '\nLoop is stopped. Start a fresh goal with /goal start "<spec>".\n'
    ;;
esac
