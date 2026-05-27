#!/bin/bash
# Shared helpers for /goal mode. Sourced by other scripts.

set -uo pipefail

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
  local max_turns="${2:-200}"
  local max_tokens="${3:-2000000}"
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
      consecutive_blocks: 0,
      audits: { last_turn_audited: null, last_verdict: null, last_gaps: null },
      history: [{ ts: $ts, turn: 0, event: "goal-started" }]
    }' > "$(goal_state_path)"
  chmod 600 "$(goal_spec_path)" "$(goal_state_path)" 2>/dev/null || true
}

goal_history_append() {
  local event="$1" note="${2:-}" ts turn
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  turn=$(goal_state_get turn_count)
  [[ "$turn" =~ ^[0-9]+$ ]] || turn=0
  goal_state_set '.history += [{ts: $ts, turn: $turn, event: $event, note: $note}]' \
    --arg ts "$ts" --argjson turn "$turn" --arg event "$event" --arg note "$note"
}

goal_hash() { printf '%s' "$1" | sha256sum | cut -d' ' -f1; }

goal_last_assistant_text() {
  local transcript="$1"
  [[ -f "$transcript" ]] || return 1
  # Return the LAST assistant message's FULL text (all text blocks joined).
  # Do NOT tail -1 — a GOAL_COMPLETE:/GOAL_BLOCKED: marker may sit above a
  # trailing sentence, or in the first of several text blocks, and would be
  # silently dropped. Slurp the whole transcript and take the last assistant
  # record's complete text so every line is available to the caller's grep.
  jq -rs '
    map(select(.type == "assistant")
        | .message.content
        | if type == "array" then
            map(select(.type == "text") | .text) | join("\n")
          else . end
        | select(type == "string" and length > 0))
    | last // empty
  ' "$transcript" 2>/dev/null
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
  local turn max_turns tokens max_tokens blocker project_dir spec_content gaps_block
  # M4: never emit `null` in the header — default to safe numerics if state is
  # partial/corrupt so the contract stays readable instead of nonsensical.
  turn=$(jq -r '.turn_count // 0' "$state_path" 2>/dev/null);        [[ "$turn" =~ ^[0-9]+$ ]] || turn=0
  max_turns=$(jq -r '.budget.max_turns // 0' "$state_path" 2>/dev/null);   [[ "$max_turns" =~ ^[0-9]+$ ]] || max_turns=0
  tokens=$(jq -r '.tokens_estimated // 0' "$state_path" 2>/dev/null);  [[ "$tokens" =~ ^[0-9]+$ ]] || tokens=0
  max_tokens=$(jq -r '.budget.max_tokens // 0' "$state_path" 2>/dev/null); [[ "$max_tokens" =~ ^[0-9]+$ ]] || max_tokens=0
  blocker=$(jq -r '.blocker.consecutive_count // 0' "$state_path" 2>/dev/null); [[ "$blocker" =~ ^[0-9]+$ ]] || blocker=0
  # M6: use the project_dir recorded at /goal start (stable for the goal's
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
[GOAL_MODE — turn ${turn}/${max_turns} — tokens ~${tokens}/${max_tokens} — blocker ${blocker}/3]

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
     on its own line. The same blocker must repeat for THREE consecutive
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

KILL SWITCH (user can stop the loop any time):
   • /goal abort  — orderly stop from the chat
   • touch ${project_dir}/.claude/goal/STOP  — emergency stop from any shell

Continue.
EOF
}
