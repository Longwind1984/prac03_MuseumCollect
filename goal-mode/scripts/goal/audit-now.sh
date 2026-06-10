#!/bin/bash
# /mygoal audit — run the clean-context auditor against the spec right now.
# Diagnostic only: reports the verdict and updates the recorded audit fields,
# but does NOT change goal status (the Stop hook owns auto-completion).

set -uo pipefail
umask 077   # H4: the audit log may capture repo/test content — keep it owner-only.
GOAL_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$GOAL_HOME/lib.sh"

if ! goal_is_initialized; then
  printf 'STATUS=none\nNo goal initialized in %s — nothing to audit.\n' "$(goal_project_dir)"
  exit 1
fi

project_dir=$(goal_project_dir)
turn=$(goal_state_get turn_count)
[[ "$turn" =~ ^[0-9]+$ ]] || turn=0
ts=$(date -u +%Y%m%dT%H%M%SZ)
audit_log="$(goal_audits_dir)/manual-${ts}.json"
mkdir -p "$(goal_audits_dir)"
chmod 700 "$(goal_audits_dir)" 2>/dev/null || true

printf 'Running clean-context auditor against the spec (this spawns an independent\nread-only claude subprocess; may take up to ~6 min)…\n\n'

if "$GOAL_HOME/auditor.sh" "$project_dir" > "$audit_log" 2>&1; then
  audit_exit=0
else
  audit_exit=$?
fi

verdict=$(jq -r '.verdict // "INCOMPLETE"' "$audit_log" 2>/dev/null || echo INCOMPLETE)
# C1/H3: only ever record a strictly-valid verdict.
case "$verdict" in COMPLETE|INCOMPLETE) ;; *) verdict=INCOMPLETE ;; esac
gaps=$(jq -r '.gaps_for_main_agent // "Audit failed or unparseable."' "$audit_log" 2>/dev/null || echo "Audit failed or unparseable.")

# C1: pass untrusted values as jq bindings, never interpolated into the program.
goal_state_set '.audits.last_turn_audited = $t' --argjson t "$turn" || true
goal_state_set '.audits.last_verdict = $v' --arg v "$verdict" || true
goal_state_set '.audits.last_gaps = $g' --arg g "$gaps" || true
goal_history_append "manual-audit" "verdict=$verdict"

printf 'VERDICT=%s\n  audit log: %s\n\n' "$verdict" "$audit_log"

# Per-requirement breakdown if the auditor produced one.
if jq -e '.requirements' "$audit_log" >/dev/null 2>&1; then
  printf 'Requirements:\n'
  jq -r '.requirements[]? | "  [\(.status)] \(.spec)\(if .evidence then "\n      → " + .evidence else "" end)"' "$audit_log" 2>/dev/null
  printf '\n'
fi

if [[ "$audit_exit" -eq 0 && "$verdict" = "COMPLETE" ]]; then
  cat <<EOF
Auditor says COMPLETE. This manual audit does not auto-close the goal.
If the loop is still active, emit a line beginning with GOAL_COMPLETE: and the
Stop hook will re-audit and close it; or /mygoal abort if you're satisfied.
EOF
else
  printf 'Gaps for main agent:\n%s\n' "$gaps"
fi
