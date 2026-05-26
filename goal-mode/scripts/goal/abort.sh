#!/bin/bash
# /goal abort — orderly kill switch. Terminates the current goal from any state.
# Idempotent: safe to run even if already stopped.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

if ! goal_is_initialized; then
  printf 'STATUS=none\nNo goal initialized in %s — nothing to abort.\n' "$(goal_project_dir)"
  exit 0
fi

status=$(goal_status)

# Clear any leftover STOP file so a future goal isn't killed on its first turn.
[[ -f "$(goal_stop_path)" ]] && rm -f "$(goal_stop_path)"

if [[ "$status" = "aborted" ]]; then
  printf 'STATUS=aborted\nGoal already aborted. Start a new one with: /goal start "<spec>"\n'
  exit 0
fi

goal_state_set '.status = "aborted"'
goal_history_append "aborted" "user requested abort (was: $status)"

cat <<EOF
STATUS=aborted
Goal terminated (was: $status). The continuation loop will not re-prompt.
Your working tree is untouched — nothing was reverted.
Start a fresh goal with: /goal start "<spec>"
EOF
