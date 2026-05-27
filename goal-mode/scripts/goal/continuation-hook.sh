#!/bin/bash
# /goal continuation hook — called from the Stop-hook dispatcher.
# Input: Stop-event JSON on stdin.
# Output: exit 2 with stderr reason to keep Claude going; exit 0 to let it stop.
#
# Recursion safety: GOAL_AUDITOR_SUBPROCESS=1 short-circuits this hook so
# the auditor's `claude -p` subprocess never re-enters.

set -uo pipefail
umask 077   # H4: any artifacts we create (audit logs) are owner-only.
GOAL_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$GOAL_HOME/lib.sh"

if [[ "${GOAL_AUDITOR_SUBPROCESS:-}" = "1" ]]; then
  exit 0
fi

input=$(cat)
# H2: distinguish an EXPLICIT false from absent/unknown. jq's `//` treats the
# boolean false as empty, so `// "x"` would collapse both — read the raw value
# instead: an absent key yields "null", which (like "true"/empty) is treated as
# eligible for the periodic breather, while an explicit "false" is NOT (only the
# hard cap applies then). This realizes the "treat unknown as true for the cap"
# guidance without misreading a real false.
stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active' 2>/dev/null)
transcript=$(echo "$input" | jq -r '.transcript_path // ""' 2>/dev/null)

project_dir=$(goal_project_dir)
[[ -d "$project_dir/.claude/goal" ]] || exit 0

# M3: jq-independent kill switches. Check the ABORTED/STOP sentinel files with a
# plain [[ -f ]] test BEFORE any jq, so an emergency stop works even when jq is
# broken or state.json is corrupt (the reader path can't be relied on then).
if [[ -f "$(goal_aborted_path)" ]]; then
  exit 0
fi
if [[ -f "$(goal_stop_path)" ]]; then
  goal_state_set '.status = "aborted"' || true
  goal_history_append "killed-by-STOP-file" || true
  : > "$(goal_aborted_path)" 2>/dev/null || true   # authoritative jq-independent sentinel
  rm -f "$(goal_stop_path)"
  exit 0
fi

goal_is_initialized || exit 0

status=$(goal_status)
if [[ "$status" != "active" ]]; then
  exit 0
fi

consecutive_blocks=$(goal_state_get consecutive_blocks)
[[ "$consecutive_blocks" =~ ^[0-9]+$ ]] || consecutive_blocks=0

# H2: periodic breather — return control to the user so an unattended loop
# always has a natural pause point. Two tiers:
#   • soft (>=6):  yield when we appear to be in an auto-continuation chain
#                  (stop_hook_active != "false", which includes unknown/empty).
#   • hard (>=25): yield unconditionally, so the loop ALWAYS pauses eventually
#                  even if the harness never sets stop_hook_active=true.
if [[ "$consecutive_blocks" -ge 25 ]] \
   || { [[ "$consecutive_blocks" -ge 6 ]] && [[ "$stop_hook_active" != "false" ]]; }; then
  goal_state_set '.consecutive_blocks = 0' || true
  goal_history_append "batch-paused-near-cap" "periodic breather (soft 6 / hard 25); still active, /goal resume or just continue" || true
  exit 0
fi

# M2: the turn-count increment is load-bearing. If it silently fails (broken jq,
# full disk, read-only fs) the budget never advances and the loop could run
# unbounded. Fail safe: stop the loop (exit 0) instead of re-prompting blindly.
if ! goal_state_set '.turn_count = (.turn_count + 1)'; then
  echo "[GOAL_MODE] state write failed (turn increment); stopping loop to fail safe. Run /goal status." >&2
  exit 0
fi
turn=$(goal_state_get turn_count)
[[ "$turn" =~ ^[0-9]+$ ]] || turn=0
max_turns=$(goal_state_get budget.max_turns)
[[ "$max_turns" =~ ^[0-9]+$ ]] || max_turns=0

if [[ -n "$transcript" && -f "$transcript" ]]; then
  tokens=$(goal_estimate_tokens "$transcript")
  goal_state_set '.tokens_estimated = $t' --argjson t "$tokens" || true
else
  tokens=0
fi
max_tokens=$(goal_state_get budget.max_tokens)
[[ "$max_tokens" =~ ^[0-9]+$ ]] || max_tokens=0

# H1: the budget is a POST-TURN ceiling. On exhaustion, STOP (exit 0) rather
# than exit 2 — exit 2 would force one more billable "summary" turn. The user
# can /goal resume to extend the budget and continue.
if [[ "$turn" -gt "$max_turns" ]]; then
  goal_state_set '.status = "budget-limited"' || true
  goal_history_append "budget-exhausted-turns" "$turn > $max_turns" || true
  exit 0
fi
if [[ "$tokens" -gt "$max_tokens" ]]; then
  goal_state_set '.status = "budget-limited"' || true
  goal_history_append "budget-exhausted-tokens" "$tokens > $max_tokens" || true
  exit 0
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
  # C1/H3: the verdict is attacker-influenceable (the auditor reads repo files).
  # Hard-validate against the literal enum BEFORE trusting it; anything else is
  # forced to INCOMPLETE. Together with the --arg binding below this closes both
  # the jq-injection path and the schema-bypass salvage path.
  case "$verdict" in
    COMPLETE|INCOMPLETE) ;;
    *) verdict=INCOMPLETE ;;
  esac
  goal_state_set '.audits.last_turn_audited = $t' --argjson t "$turn" || true
  goal_state_set '.audits.last_verdict = $v' --arg v "$verdict" || true
  if [[ "$audit_exit" -eq 0 && "$verdict" = "COMPLETE" ]]; then
    if goal_state_set '.status = "complete"'; then
      goal_history_append "audited-complete"
      cat >&2 <<EOF
[GOAL_MODE — GOAL COMPLETE]
Audit verdict: COMPLETE. Goal status set to 'complete'. Stopping continuation loop.
You may now commit any outstanding changes. (The git-check hook will prompt you if needed.)
EOF
      exit 0
    fi
    # M2: audit said COMPLETE but we couldn't persist it — stop rather than loop.
    echo "[GOAL_MODE] audit COMPLETE but state write failed; stopping loop. Run /goal status." >&2
    exit 0
  fi
  gaps=$(jq -r '.gaps_for_main_agent // "Audit failed or unparseable; treat as incomplete."' "$audit_log" 2>/dev/null)
  goal_state_set '.audits.last_gaps = $g' --arg g "$gaps" || true
  goal_history_append "audited-incomplete" "$gaps"
  # M-1: a completion attempt is not a blocker turn — clear any blocker streak.
  goal_state_set '.blocker = {last_reason_hash: null, consecutive_count: 0}' || true
  goal_state_set '.consecutive_blocks = (.consecutive_blocks + 1)' || true
  goal_render_contract "$(goal_state_path)" "$(goal_spec_path)" "$gaps" >&2
  exit 2
fi

blocker_line=$(printf '%s\n' "$last_text" | grep -E '^GOAL_BLOCKED:' | head -1 || true)
if [[ -n "$blocker_line" ]]; then
  blocker_text="${blocker_line#GOAL_BLOCKED:}"
  blocker_hash=$(goal_hash "$blocker_text")
  last_hash=$(goal_state_get blocker.last_reason_hash)
  if [[ "$blocker_hash" = "$last_hash" ]]; then
    goal_state_set '.blocker.consecutive_count = (.blocker.consecutive_count + 1)' || true
  else
    goal_state_set '.blocker.consecutive_count = 1' || true
    goal_state_set '.blocker.last_reason_hash = $h' --arg h "$blocker_hash" || true
  fi
  count=$(goal_state_get blocker.consecutive_count)
  [[ "$count" =~ ^[0-9]+$ ]] || count=0
  if [[ "$count" -ge 3 ]]; then
    goal_state_set '.status = "blocked"' || true
    goal_history_append "blocked-confirmed" "$blocker_text"
    cat >&2 <<EOF
[GOAL_MODE — BLOCKED CONFIRMED]
Same blocker reported 3 consecutive turns. Status set to 'blocked'.
Blocker: ${blocker_text}
The continuation loop has stopped. User intervention needed.
EOF
    exit 0
  fi
else
  # M-1: this turn made progress (no GOAL_BLOCKED line). Reset the blocker streak
  # so "3 CONSECUTIVE turns" is enforced literally — an intervening working turn
  # must clear a prior streak, exactly as the contract/README promise.
  goal_state_set '.blocker = {last_reason_hash: null, consecutive_count: 0}' || true
fi

goal_state_set '.consecutive_blocks = (.consecutive_blocks + 1)' || true
goal_render_contract "$(goal_state_path)" "$(goal_spec_path)" "" >&2
exit 2
