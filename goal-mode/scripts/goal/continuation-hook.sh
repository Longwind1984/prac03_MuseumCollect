#!/bin/bash
# /mygoal continuation hook — called from the Stop-hook dispatcher.
# Input: Stop-event JSON on stdin.
# Output: exit 2 with stderr reason to keep Claude going; exit 0 to let it stop.
#
# Control flow (order matters):
#   1. kill switches (sentinel files, jq-independent)  -> stop
#   2. not active                                       -> stop
#   3. turn increment + budget ceilings                 -> stop if exhausted
#   4. handle the last message's marker:
#        GOAL_COMPLETE -> audit; COMPLETE stops, INCOMPLETE continues w/ gaps
#        GOAL_BLOCKED  -> streak; threshold stops, else continues
#        (neither)     -> reset blocker streak, continue
#   5. for every CONTINUE outcome: bump the streak, then the periodic breather
#      decides exit 0 (pause) vs exit 2 (re-prompt). The breather is applied
#      LAST so it can never swallow an unprocessed completion/blocker claim.
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
# hard cap applies then). This realizes "treat unknown as true for the cap"
# without misreading a real false.
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

# M2: the turn-count increment is load-bearing. If it silently fails (broken jq,
# full disk, read-only fs) the budget never advances and the loop could run
# unbounded. Fail safe: stop the loop (exit 0) instead of re-prompting blindly.
if ! goal_state_set '.turn_count = (.turn_count + 1)'; then
  echo "[GOAL_MODE] state write failed (turn increment); stopping loop to fail safe. Run /mygoal status." >&2
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
# can /mygoal resume to extend the budget and continue.
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

# Gaps to attach to THIS turn's re-prompt (set only on an incomplete completion).
contract_gaps=""

if printf '%s\n' "$last_text" | grep -qE '^GOAL_COMPLETE:'; then
  # ── Completion claim. Must be audited regardless of the breather, so a real
  #    completion is never lost to a coincidental periodic pause.
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
  # forced to INCOMPLETE. Together with the --arg binding this closes both the
  # jq-injection path and the schema-bypass salvage path.
  case "$verdict" in
    COMPLETE|INCOMPLETE) ;;
    *) verdict=INCOMPLETE ;;
  esac

  if [[ "$audit_exit" -eq 0 && "$verdict" = "COMPLETE" ]]; then
    # Terminal: audited complete. One consolidated state write.
    if goal_state_set '.status="complete" | .audits.last_turn_audited=$t | .audits.last_verdict=$v | .audits.last_gaps=null' \
         --argjson t "$turn" --arg v "$verdict"; then
      goal_history_append "audited-complete"
      cat >&2 <<EOF
[GOAL_MODE — GOAL COMPLETE]
Audit verdict: COMPLETE. Goal status set to 'complete'. Stopping continuation loop.
You may now commit any outstanding changes. (The git-check hook will prompt you if needed.)
EOF
      exit 0
    fi
    # M2: audit said COMPLETE but we couldn't persist it — stop rather than loop.
    echo "[GOAL_MODE] audit COMPLETE but state write failed; stopping loop. Run /mygoal status." >&2
    exit 0
  fi

  # Incomplete completion claim → fall through to CONTINUE, carrying the gaps.
  # A completion attempt is not a blocker turn, so reset the blocker streak in
  # the same consolidated write that records the audit result.
  gaps=$(jq -r '.gaps_for_main_agent // "Audit failed or unparseable; treat as incomplete."' "$audit_log" 2>/dev/null)
  goal_state_set '.audits.last_turn_audited=$t | .audits.last_verdict=$v | .audits.last_gaps=$g | .blocker={last_reason_hash:null, consecutive_count:0}' \
    --argjson t "$turn" --arg v "$verdict" --arg g "$gaps" || true
  goal_history_append "audited-incomplete" "$gaps"
  contract_gaps="$gaps"

elif printf '%s\n' "$last_text" | grep -qE '^GOAL_BLOCKED:'; then
  # ── Blocker claim. The SAME blocker must repeat GOAL_BLOCKER_THRESHOLD times
  #    in a row to confirm; a different reason restarts the streak.
  blocker_line=$(printf '%s\n' "$last_text" | grep -E '^GOAL_BLOCKED:' | head -1)
  blocker_text="${blocker_line#GOAL_BLOCKED:}"
  blocker_hash=$(goal_hash "$blocker_text")
  last_hash=$(goal_state_get blocker.last_reason_hash)
  if [[ "$blocker_hash" = "$last_hash" ]]; then
    goal_state_set '.blocker.consecutive_count = (.blocker.consecutive_count + 1)' || true
  else
    goal_state_set '.blocker = {last_reason_hash: $h, consecutive_count: 1}' --arg h "$blocker_hash" || true
  fi
  count=$(goal_state_get blocker.consecutive_count)
  [[ "$count" =~ ^[0-9]+$ ]] || count=0
  if [[ "$count" -ge "$GOAL_BLOCKER_THRESHOLD" ]]; then
    goal_state_set '.status = "blocked"' || true
    goal_history_append "blocked-confirmed" "$blocker_text"
    cat >&2 <<EOF
[GOAL_MODE — BLOCKED CONFIRMED]
Same blocker reported ${GOAL_BLOCKER_THRESHOLD} consecutive turns. Status set to 'blocked'.
Blocker:${blocker_text}
The continuation loop has stopped. User intervention needed.
EOF
    exit 0
  fi
  # Not yet at threshold → CONTINUE (no gaps); maybe this turn finds a way.

else
  # ── Plain working turn. Reset the blocker streak so the "CONSECUTIVE" in the
  #    threshold is enforced literally — an intervening working turn clears it.
  goal_state_set '.blocker = {last_reason_hash: null, consecutive_count: 0}' || true
fi

# ── STALL DETECTION (continue path). The breather yields periodically and the
#    budget bounds the total run, but neither notices an agent that is *spinning*
#    — re-reading the same files, re-claiming, or thinking in circles — without
#    changing anything. If the working tree + commits are byte-identical for
#    GOAL_STALL_THRESHOLD consecutive continue-turns AND no completion/blocker was
#    declared, the loop is making no progress: stop with a clear, resumable
#    diagnosis instead of looping to the hard breather (25) or budget (200).
#    This is the load-bearing guarantee that an unattended-but-stuck loop
#    interrupts early. Inert outside a git work tree (fingerprint == "no-git").
if [[ "$GOAL_STALL_THRESHOLD" -gt 0 ]]; then
  fp=$(goal_progress_fingerprint "$project_dir" 2>/dev/null || echo no-git)
  if [[ "$fp" != "no-git" && -n "$fp" ]]; then
    prev_fp=$(goal_state_get progress.last_fingerprint)
    if [[ "$fp" = "$prev_fp" ]]; then
      goal_state_set '.progress.no_progress_count = (.progress.no_progress_count + 1)' || true
    else
      goal_state_set '.progress = {last_fingerprint: $f, no_progress_count: 0}' --arg f "$fp" || true
    fi
    npc=$(goal_state_get progress.no_progress_count)
    [[ "$npc" =~ ^[0-9]+$ ]] || npc=0
    if [[ "$npc" -ge "$GOAL_STALL_THRESHOLD" ]]; then
      goal_state_set '.status = "stalled"' || true
      goal_history_append "stalled-no-progress" "no working-tree/commit change for $npc consecutive turns"
      cat >&2 <<EOF
[GOAL_MODE — STALLED]
No change to the working tree or git commits for ${npc} consecutive turns, and
no GOAL_COMPLETE / GOAL_BLOCKED was declared. The loop is spinning without making
progress, so it stopped to avoid burning the budget.

  /mygoal status    — review the spec, last auditor gaps, and history
  /mygoal resume    — try again (e.g. after you unblock it, or if the agent was
                    mid-investigation: reading/running tests without editing files)
  /mygoal abort     — give up on this goal

(Tune with GOAL_STALL_THRESHOLD; 0 disables this check.)
EOF
      exit 0
    fi
  fi
fi

# ── CONTINUE path (working turn, not-yet-confirmed block, or incomplete
#    completion). Bump the streak, then let the periodic breather decide whether
#    to pause. Applied LAST and uniformly, so an unattended loop always reaches a
#    natural stop without ever pre-empting the marker handling above. Two tiers:
#      • soft (>= GOAL_BREATHER_SOFT): yield when in an auto-continuation chain
#        (stop_hook_active != "false", i.e. true/unknown/absent).
#      • hard (>= GOAL_BREATHER_HARD): yield unconditionally.
goal_state_set '.continuation_streak = (.continuation_streak + 1)' || true
streak=$(goal_state_get continuation_streak)
[[ "$streak" =~ ^[0-9]+$ ]] || streak=0
if [[ "$streak" -ge "$GOAL_BREATHER_HARD" ]] \
   || { [[ "$streak" -ge "$GOAL_BREATHER_SOFT" ]] && [[ "$stop_hook_active" != "false" ]]; }; then
  goal_state_set '.continuation_streak = 0' || true
  goal_history_append "batch-paused-near-cap" \
    "periodic breather (soft ${GOAL_BREATHER_SOFT} / hard ${GOAL_BREATHER_HARD}); still active — /mygoal resume or just continue. Any auditor gaps are in /mygoal status." || true
  exit 0
fi

goal_render_contract "$(goal_state_path)" "$(goal_spec_path)" "$contract_gaps" >&2
exit 2
