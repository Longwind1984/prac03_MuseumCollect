#!/bin/bash
# /mygoal pause — pause the continuation loop (active -> paused).
# The Stop hook exits 0 for any non-active status, so pausing stops re-prompting.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

if ! goal_is_initialized; then
  printf 'STATUS=none\nNo goal initialized in %s.\n' "$(goal_project_dir)"
  exit 0
fi

status=$(goal_status)
case "$status" in
  active)
    goal_state_set '.status = "paused"'
    goal_history_append "paused" "user requested pause"
    cat <<EOF
STATUS=paused
Continuation loop paused. The Stop hook will no longer re-prompt.
In-flight work is untouched; nothing is lost.
Resume with: /mygoal resume
EOF
    ;;
  paused)
    printf 'STATUS=paused\nAlready paused. Resume with: /mygoal resume\n'
    ;;
  *)
    cat <<EOF
STATUS=$status
Cannot pause — goal is '$status', not 'active'.
  /mygoal status   # see full state
EOF
    exit 1
    ;;
esac
