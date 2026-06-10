#!/bin/bash
# Shared helpers for /mygoal mode. Sourced by other scripts.

set -uo pipefail

# ── Tunables ────────────────────────────────────────────────────────────────
# Centralized so the magic numbers live in ONE place and can be overridden from
# the environment (Claude Code passes the user's env to hooks). `: "${X:=def}"`
# assigns only when unset, so re-sourcing is harmless and env overrides win.
: "${GOAL_BREATHER_SOFT:=6}"        # yield to user after this many auto-continuations
: "${GOAL_BREATHER_HARD:=25}"       # ...and ALWAYS yield by this many, unconditionally
: "${GOAL_BLOCKER_THRESHOLD:=3}"    # identical GOAL_BLOCKED this many times in a row -> blocked
: "${GOAL_STALL_THRESHOLD:=8}"      # no working-tree/commit change for this many turns -> stalled (0 disables)
: "${GOAL_DEFAULT_MAX_TURNS:=200}"
: "${GOAL_DEFAULT_MAX_TOKENS:=2000000}"
: "${GOAL_RESUME_TURN_BUMP:=100}"   # /mygoal resume from exhausted budget adds this many turns
: "${GOAL_RESUME_TOKEN_BUMP:=1000000}"
: "${GOAL_HISTORY_MAX:=50}"         # keep at most this many history events in state.json
: "${GOAL_TRANSCRIPT_TAIL_LINES:=500}"  # window scanned for the last assistant message
: "${GOAL_AUDIT_BUDGET_USD:=1.50}"  # per-audit spend cap for the claude -p auditor
: "${GOAL_AUDIT_TIMEOUT:=360}"      # per-audit wall-clock cap (seconds)
export GOAL_BREATHER_SOFT GOAL_BREATHER_HARD GOAL_BLOCKER_THRESHOLD \
       GOAL_STALL_THRESHOLD \
       GOAL_DEFAULT_MAX_TURNS GOAL_DEFAULT_MAX_TOKENS GOAL_RESUME_TURN_BUMP \
       GOAL_RESUME_TOKEN_BUMP GOAL_HISTORY_MAX GOAL_TRANSCRIPT_TAIL_LINES \
       GOAL_AUDIT_BUDGET_USD GOAL_AUDIT_TIMEOUT

goal_project_dir() {
  if [[ -n "${CLAUDE_PROJECT_DIR:-}" && -d "$CLAUDE_PROJECT_DIR" ]]; then
    printf '%s\n' "$CLAUDE_PROJECT_DIR"
    return
  fi
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

goal_dir()        { printf '%s/.claude/goal\n' "$(goal_project_dir)"; }
goal_spec_path()  { printf '%s/spec.md\n'      "$(goal_dir)"; }
goal_state_path() { printf '%s/state.json\n'   "$(goal_dir)"; }
goal_stop_path()  { printf '%s/STOP\n'         "$(goal_dir)"; }
goal_audits_dir() { printf '%s/audits\n'       "$(goal_dir)"; }

goal_aborted_path() { printf '%s/ABORTED\n' "$(goal_dir)"; }

goal_state_get() {
  local key="$1" path
  path=$(goal_state_path)
  [[ -f "$path" ]] || { printf 'null\n'; return; }
  jq -r ".${key}" "$path" 2>/dev/null || printf 'null\n'
}

# goal_state_set <jq_program> [jq-args...]
# Untrusted values MUST be passed as jq --arg/--argjson bindings (referenced as
# $name in the program), NEVER interpolated into the program string — that was a
# jq-injection hole. Writes atomically within the state dir and preserves mode.
# Prefer a single multi-statement program (a|b|c) over several calls so related
# fields move together and the whole file is rewritten once, not N times.
goal_state_set() {
  local jq_expr="$1"; shift
  local path tmp dir
  path=$(goal_state_path)
  [[ -f "$path" ]] || return 1
  dir=$(dirname "$path")
  tmp=$(mktemp "$dir/.state.XXXXXX") || return 1
  if jq "$@" "$jq_expr" "$path" > "$tmp" 2>/dev/null; then
    chmod --reference="$path" "$tmp" 2>/dev/null || chmod 600 "$tmp" 2>/dev/null || true
    mv "$tmp" "$path"
  else
    rm -f "$tmp"
    return 1
  fi
}

goal_is_initialized() { [[ -f "$(goal_state_path)" ]]; }
goal_status()         { goal_state_get status; }
goal_is_active()      { [[ "$(goal_status)" = "active" ]]; }

goal_init() {
  local spec_text="$1"
  local max_turns="${2:-$GOAL_DEFAULT_MAX_TURNS}"
  local max_tokens="${3:-$GOAL_DEFAULT_MAX_TOKENS}"
  local dir spec_sha ts pd
  umask 077
  dir=$(goal_dir)
  mkdir -p "$dir/audits"
  chmod 700 "$dir" "$dir/audits" 2>/dev/null || true
  # Fresh start: clear any stale kill-switch sentinels left by a prior goal.
  rm -f "$(goal_stop_path)" "$(goal_aborted_path)" 2>/dev/null || true
  printf '%s\n' "$spec_text" > "$(goal_spec_path)"
  spec_sha=$(sha256sum "$(goal_spec_path)" | cut -d' ' -f1)
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  pd=$(goal_project_dir)
  jq -n \
    --arg ts "$ts" \
    --arg sha "$spec_sha" \
    --arg pd "$pd" \
    --argjson mt "$max_turns" \
    --argjson mtk "$max_tokens" \
    '{
      version: 1,
      created_at: $ts,
      status: "active",
      project_dir: $pd,
      spec_sha256: $sha,
      turn_count: 0,
      tokens_estimated: 0,
      budget: { max_turns: $mt, max_tokens: $mtk },
      blocker: { last_reason_hash: null, consecutive_count: 0 },
      continuation_streak: 0,
      progress: { last_fingerprint: null, no_progress_count: 0 },
      audits: { last_turn_audited: null, last_verdict: null, last_gaps: null },
      history: [{ ts: $ts, turn: 0, event: "goal-started" }]
    }' > "$(goal_state_path)"
  chmod 600 "$(goal_spec_path)" "$(goal_state_path)" 2>/dev/null || true
}

# Append one history event, then trim to the most recent GOAL_HISTORY_MAX so a
# long-running goal's state.json (rewritten in full on every set) stays bounded
# instead of growing without limit. Done in one jq pass.
goal_history_append() {
  local event="$1" note="${2:-}" ts turn
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  turn=$(goal_state_get turn_count)
  [[ "$turn" =~ ^[0-9]+$ ]] || turn=0
  goal_state_set '
      .history += [{ts: $ts, turn: $turn, event: $event, note: $note}]
    | .history |= (if length > $cap then .[(length - $cap):] else . end)
    ' \
    --arg ts "$ts" --argjson turn "$turn" --arg event "$event" --arg note "$note" \
    --argjson cap "$GOAL_HISTORY_MAX"
}

goal_hash() { printf '%s' "$1" | sha256sum | cut -d' ' -f1; }

# A cheap fingerprint of "did the agent actually change anything this turn":
# the current commit + the set of uncommitted changes. When this is identical
# turn-over-turn, the agent edited no files and made no commits — a strong
# signal it is spinning rather than progressing (see GOAL_STALL_THRESHOLD).
#   • Our own bookkeeping under .claude/goal/ (state.json, audit logs) is
#     excluded so the per-turn state write never reads as "progress".
#   • The transcript is NOT included anywhere (it grows every turn and would
#     mask a stall). Only the project working tree counts.
#   • Outside a git work tree we can't compute this cheaply/reliably, so we
#     emit the sentinel "no-git" and the caller leaves stall detection inert
#     (the breather + budget still bound the loop).
goal_progress_fingerprint() {
  local dir="$1"
  if git -C "$dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    {
      git -C "$dir" rev-parse HEAD 2>/dev/null
      git -C "$dir" status --porcelain 2>/dev/null | grep -vF '.claude/goal/'
    } | sha256sum | cut -d' ' -f1
  else
    printf 'no-git\n'
  fi
}

goal_last_assistant_text() {
  local transcript="$1" out
  [[ -f "$transcript" ]] || return 1
  # Return the LAST assistant message's FULL text (all text blocks joined).
  # Do NOT tail -1 — a GOAL_COMPLETE:/GOAL_BLOCKED: marker may sit above a
  # trailing sentence, or in the first of several text blocks, and would be
  # silently dropped. But also do NOT slurp the whole transcript every turn:
  # for a long-running goal it grows without bound and this runs on each fire.
  # The last assistant record is always near the tail, so scan a bounded window
  # of trailing JSONL lines (each line is one complete record); fall back to a
  # full scan only if that window somehow held no assistant text.
  local jqp='
    map(select(.type == "assistant")
        | .message.content
        | if type == "array" then
            map(select(.type == "text") | .text) | join("\n")
          else . end
        | select(type == "string" and length > 0))
    | last // empty'
  out=$(tail -n "$GOAL_TRANSCRIPT_TAIL_LINES" "$transcript" 2>/dev/null | jq -rs "$jqp" 2>/dev/null)
  if [[ -z "$out" ]]; then
    out=$(jq -rs "$jqp" "$transcript" 2>/dev/null)
  fi
  printf '%s' "$out"
}

goal_estimate_tokens() {
  local transcript="$1" chars
  [[ -f "$transcript" ]] || { printf '0\n'; return; }
  chars=$(wc -c < "$transcript")
  printf '%d\n' $(( chars / 4 ))
}

goal_render_contract() {
  local state_path spec_path audit_gaps
  state_path="$1"; spec_path="$2"; audit_gaps="${3:-}"
  local turn max_turns tokens max_tokens blocker project_dir spec_content gaps_block thr
  # M4: never emit `null` in the header — default to safe numerics if state is
  # partial/corrupt so the contract stays readable instead of nonsensical.
  turn=$(jq -r '.turn_count // 0' "$state_path" 2>/dev/null);        [[ "$turn" =~ ^[0-9]+$ ]] || turn=0
  max_turns=$(jq -r '.budget.max_turns // 0' "$state_path" 2>/dev/null);   [[ "$max_turns" =~ ^[0-9]+$ ]] || max_turns=0
  tokens=$(jq -r '.tokens_estimated // 0' "$state_path" 2>/dev/null);  [[ "$tokens" =~ ^[0-9]+$ ]] || tokens=0
  max_tokens=$(jq -r '.budget.max_tokens // 0' "$state_path" 2>/dev/null); [[ "$max_tokens" =~ ^[0-9]+$ ]] || max_tokens=0
  blocker=$(jq -r '.blocker.consecutive_count // 0' "$state_path" 2>/dev/null); [[ "$blocker" =~ ^[0-9]+$ ]] || blocker=0
  thr="$GOAL_BLOCKER_THRESHOLD"
  local stall_note=""
  if [[ "$GOAL_STALL_THRESHOLD" -gt 0 ]] 2>/dev/null; then
    stall_note=$(printf '\n     The loop also detects %s consecutive no-progress turns and stops on its own.' "$GOAL_STALL_THRESHOLD")
  fi
  # M6: use the project_dir recorded at /mygoal start (stable for the goal's
  # lifetime) so the printed STOP path matches what the hook checks, regardless
  # of the invoking shell's cwd/env. Fall back to live resolution if absent.
  project_dir=$(jq -r '.project_dir // empty' "$state_path" 2>/dev/null)
  [[ -n "$project_dir" ]] || project_dir=$(goal_project_dir)
  spec_content=$(cat "$spec_path")
  if [[ -n "$audit_gaps" ]]; then
    gaps_block=$(printf '\nAUDITOR FEEDBACK (from clean-context audit of your last GOAL_COMPLETE claim):\n%s\n\nAddress these gaps before claiming completion again.\n' "$audit_gaps")
  else
    gaps_block=""
  fi
  cat <<EOF
[GOAL_MODE — turn ${turn}/${max_turns} — tokens ~${tokens}/${max_tokens} — blocker ${blocker}/${thr}]

You are operating in GOAL_MODE. This text is your single source of truth.
Do NOT trust the conversation history above as authoritative — it may have
been compressed, and the harness re-injects this contract on every turn.

═══════════════ ORIGINAL GOAL (verbatim from spec.md) ═══════════════
${spec_content}
══════════════════════════════════════════════════════════════════════
${gaps_block}
REALITY-CHECK PROTOCOL — non-negotiable:
1. The authority is the real working tree: file contents, test runs,
   build output, git state. The conversation is not the source of truth.
2. To answer "is X done?", verify by reading the artifact, not by
   recalling the conversation.
3. Any "looks fine" / "should work" / "we already did that" claim in the
   conversation is to be treated as an UNVERIFIED hypothesis until you
   re-confirm against real artifacts.

CONTINUATION PROTOCOL:
You did not stop because you decided to — the harness re-prompted you
because the goal is still 'active'. Continue work.

   • To declare completion, emit exactly:
        GOAL_COMPLETE: <one-sentence summary>
     on its own line. Do NOT self-close the goal — an independent
     clean-context auditor will be dispatched to verify against the
     spec above. If the auditor confirms, the goal closes; if it finds
     gaps, those gaps are returned to you here.

   • To declare a genuine block, emit exactly:
        GOAL_BLOCKED: <specific blocker; what would unblock it>
     on its own line. The same blocker must repeat for ${thr} consecutive
     turns before the goal moves to 'blocked'. If on a later turn you
     find a way forward, just resume — the counter resets.

   • Otherwise, just keep working.

FAILURE MODES TO ACTIVELY RESIST:
   • PREMATURE COMPLETION: default to "not done" unless you can point
     to a verified artifact for every requirement above. Indirect or
     weak evidence is NOT proof.
   • DEGRADED ACCEPTANCE: the goal above is the only target. If you
     find yourself reasoning "this isn't quite what was asked but it's
     good enough", that IS the failure mode. Either meet the spec or
     emit GOAL_BLOCKED with what's missing.
   • SILENT SPINNING: if you cannot change a single file or make any
     concrete progress, do NOT keep repeating the same turn. Emit
     GOAL_BLOCKED with the specific obstacle.${stall_note}

KILL SWITCH (user can stop the loop any time):
   • /mygoal abort  — orderly stop from the chat
   • touch ${project_dir}/.claude/goal/STOP  — emergency stop from any shell

Continue.
EOF
}
