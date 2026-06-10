#!/bin/bash
# /mygoal abort — orderly kill switch. Terminates the current goal from any state.
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
  # Ensure the jq-independent sentinel exists even for goals aborted by an
  # older version, so the loop can't slip back to active if jq is later repaired.
  : > "$(goal_aborted_path)" 2>/dev/null || true
  printf 'STATUS=aborted\nGoal already aborted. Start a new one with: /mygoal start "<spec>"\n'
  exit 0
fi

# M3/L-3: write the jq-independent ABORTED sentinel FIRST, so the continuation
# hook stops on its next fire even if the state write below fails (broken jq /
# corrupt state). Then try to persist status — and tell the truth if it didn't
# take, rather than printing a misleading success.
: > "$(goal_aborted_path)" 2>/dev/null || true
if goal_state_set '.status = "aborted"'; then
  persisted=1
else
  persisted=0
fi
goal_history_append "aborted" "user requested abort (was: $status)" || true

if [[ "$persisted" -eq 1 ]]; then
  cat <<EOF
STATUS=aborted
Goal terminated (was: $status). The continuation loop will not re-prompt.
Your working tree is untouched — nothing was reverted.
Start a fresh goal with: /mygoal start "<spec>"
EOF
else
  cat <<EOF
STATUS=aborted
Goal terminated (was: $status) via the ABORTED sentinel file. NOTE: state.json
could not be updated (jq error or corrupt state), so its recorded status may be
stale — but the continuation loop is stopped (the hook checks the sentinel
before any jq). Your working tree is untouched.
Start a fresh goal with: /mygoal start "<spec>"
EOF
fi
