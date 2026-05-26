#!/bin/bash
# /goal continuation hook — called from the Stop-hook dispatcher.
# Input: Stop-event JSON on stdin.
# Output: exit 2 with stderr reason to keep Claude going; exit 0 to let it stop.
#
# Recursion safety: GOAL_AUDITOR_SUBPROCESS=1 short-circuits this hook so
# the auditor's `claude -p` subprocess never re-enters.

set -uo pipefail
GOAL_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$GOAL_HOME/lib.sh"

if [[ "${GOAL_AUDITOR_SUBPROCESS:-}" = "1" ]]; then
  exit 0
fi

input=$(cat)
stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active // false')
transcript=$(echo "$input" | jq -r '.transcript_path // ""')

project_dir=$(goal_project_dir)
[[ -d "$project_dir/.claude/goal" ]] || exit 0
goal_is_initialized || exit 0

if [[ -f "$(goal_stop_path)" ]]; then
  goal_state_set '.status = "aborted"' || true
  goal_history_append "killed-by-STOP-file" || true
  rm -f "$(goal_stop_path)"
  exit 0
fi

status=$(goal_status)
if [[ "$status" != "active" ]]; then
  exit 0
fi

consecutive_blocks=$(goal_state_get consecutive_blocks)
consecutive_blocks=${consecutive_blocks:-0}
if [[ "$stop_hook_active" = "true" ]] && [[ "$consecutive_blocks" -ge 6 ]]; then
  goal_state_set '.consecutive_blocks = 0'
  goal_history_append "batch-paused-near-cap" "yielded near 8-block cap; user can /goal status to resume"
  exit 0
fi

goal_state_set '.turn_count = (.turn_count + 1)'
turn=$(goal_state_get turn_count)
max_turns=$(goal_state_get budget.max_turns)

if [[ -n "$transcript" && -f "$transcript" ]]; then
  tokens=$(goal_estimate_tokens "$transcript")
  goal_state_set ".tokens_estimated = $tokens"
else
  tokens=0
fi
max_tokens=$(goal_state_get budget.max_tokens)

if [[ "$turn" -gt "$max_turns" ]]; then
  goal_state_set '.status = "budget-limited"'
  goal_history_append "budget-exhausted-turns" "$turn > $max_turns"
  cat >&2 <<EOF
[GOAL_MODE — BUDGET EXHAUSTED (turns: ${turn} > ${max_turns})]
You have hit the per-goal turn budget. Do NOT start new work.
Summarize: what was done, what wasn't, what's blocking, and stop.
EOF
  exit 2
fi
if [[ "$tokens" -gt "$max_tokens" ]]; then
  goal_state_set '.status = "budget-limited"'
  goal_history_append "budget-exhausted-tokens" "$tokens > $max_tokens"
  cat >&2 <<EOF
[GOAL_MODE — BUDGET EXHAUSTED (tokens: ~${tokens} > ${max_tokens})]
You have hit the per-goal token budget. Do NOT start new work.
Summarize what was done and what wasn't, then stop.
EOF
  exit 2
fi

last_text=$(goal_last_assistant_text "$transcript" 2>/dev/null || true)

if printf '%s\n' "$last_text" | grep -qE '^GOAL_COMPLETE:'; then
  claim=$(printf '%s\n' "$last_text" | grep -E '^GOAL_COMPLETE:' | head -1)
  goal_history_append "completion-claimed" "$claim"
  audit_log="$(goal_audits_dir)/turn-${turn}.json"
  if "$GOAL_HOME/auditor.sh" "$project_dir" > "$audit_log" 2>&1; then
    audit_exit=0
  else
    audit_exit=$?
  fi
  verdict=$(jq -r '.verdict // "INCOMPLETE"' "$audit_log" 2>/dev/null || echo INCOMPLETE)
  goal_state_set ".audits.last_turn_audited = $turn"
  goal_state_set ".audits.last_verdict = \"$verdict\""
  if [[ "$audit_exit" -eq 0 && "$verdict" = "COMPLETE" ]]; then
    goal_state_set '.status = "complete"'
    goal_history_append "audited-complete"
    cat >&2 <<EOF
[GOAL_MODE — GOAL COMPLETE]
Audit verdict: COMPLETE. Goal status set to 'complete'. Stopping continuation loop.
You may now commit any outstanding changes. (The git-check hook will prompt you if needed.)
EOF
    exit 0
  fi
  gaps=$(jq -r '.gaps_for_main_agent // "Audit failed or unparseable; treat as incomplete."' "$audit_log" 2>/dev/null)
  goal_state_set ".audits.last_gaps = $(printf '%s' "$gaps" | jq -Rs .)"
  goal_history_append "audited-incomplete" "$gaps"
  goal_state_set '.consecutive_blocks = (.consecutive_blocks + 1)'
  goal_render_contract "$(goal_state_path)" "$(goal_spec_path)" "$gaps" >&2
  exit 2
fi

blocker_line=$(printf '%s\n' "$last_text" | grep -E '^GOAL_BLOCKED:' | head -1 || true)
if [[ -n "$blocker_line" ]]; then
  blocker_text="${blocker_line#GOAL_BLOCKED:}"
  blocker_hash=$(goal_hash "$blocker_text")
  last_hash=$(goal_state_get blocker.last_reason_hash)
  if [[ "$blocker_hash" = "$last_hash" ]]; then
    goal_state_set '.blocker.consecutive_count = (.blocker.consecutive_count + 1)'
  else
    goal_state_set ".blocker.consecutive_count = 1"
    goal_state_set ".blocker.last_reason_hash = \"$blocker_hash\""
  fi
  count=$(goal_state_get blocker.consecutive_count)
  if [[ "$count" -ge 3 ]]; then
    goal_state_set '.status = "blocked"'
    goal_history_append "blocked-confirmed" "$blocker_text"
    cat >&2 <<EOF
[GOAL_MODE — BLOCKED CONFIRMED]
Same blocker reported 3 consecutive turns. Status set to 'blocked'.
Blocker: ${blocker_text}
The continuation loop has stopped. User intervention needed.
EOF
    exit 0
  fi
fi

goal_state_set '.consecutive_blocks = (.consecutive_blocks + 1)'
goal_render_contract "$(goal_state_path)" "$(goal_spec_path)" "" >&2
exit 2
