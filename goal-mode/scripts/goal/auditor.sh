#!/bin/bash
# Clean-context auditor. Spawns a `claude -p` subprocess with no prior memory,
# constrained to GENUINELY read-only tools, and parses a strictly-validated
# JSON verdict from its output.
#
# Usage: auditor.sh <project_dir>
# Stdout: JSON verdict object. Exit 0 = COMPLETE, exit 1 = INCOMPLETE (or audit failed).

set -uo pipefail
umask 077
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

project_dir="${1:-$(goal_project_dir)}"
spec_path="$project_dir/.claude/goal/spec.md"

if [[ ! -f "$spec_path" ]]; then
  printf '{"verdict":"INCOMPLETE","gaps_for_main_agent":"spec.md missing at %s"}\n' "$spec_path"
  exit 1
fi

spec_content=$(cat "$spec_path")

read -r -d '' prompt <<EOF || true
You are an INDEPENDENT GOAL AUDITOR with NO memory of any prior conversation.
Your sole task: verify whether the goal below has actually been satisfied,
based solely on (a) the spec, and (b) the real working tree at:
  ${project_dir}

The main agent's narrative is NOT available to you and would not be trusted
if it were. Verify by reading files, inspecting already-present build/test
artifacts, and read-only git state directly.

═══════════════ GOAL SPEC (from spec.md) ═══════════════
${spec_content}
═════════════════════════════════════════════════════════

PROCEDURE:
1. Decompose the spec into discrete requirements.
2. For each requirement, identify the concrete artifact that would prove it.
3. Inspect it yourself with your read-only tools (Read, Grep, Glob, and
   read-only Bash: ls, cat, head, tail, wc, git status/log/diff/show).
4. Verdict per requirement: MET / NOT_MET / INSUFFICIENT.

You do NOT have tools to execute tests, builds, or arbitrary code. Base your
verdict only on artifacts you can inspect. If proving a requirement would
REQUIRE running something you cannot run, mark it INSUFFICIENT and say so.

BIAS:
  - If you cannot point to a verified artifact, status is NOT MET.
  - Indirect or "looks like it might work" evidence → INSUFFICIENT.
  - Interpret the spec literally, not generously.
  - If ambiguous, name the ambiguity and treat the more demanding reading
    as the target.

OUTPUT — emit EXACTLY one JSON object and nothing else (no markdown fences, no
prose before or after). Shape:
{
  "verdict": "COMPLETE" | "INCOMPLETE",
  "requirements": [
    {"spec": "...", "expected_artifact": "...", "verification_run": "...",
     "evidence": "...", "status": "MET" | "NOT_MET" | "INSUFFICIENT"}
  ],
  "gaps_for_main_agent": "concise statement of what is still missing (empty if COMPLETE)"
}
"verdict" MUST be exactly the string COMPLETE or the string INCOMPLETE.
EOF

cd "$project_dir" || exit 1

# C2: GENUINELY read-only tool set. The auditor reads attacker-influenceable
# repo content (spec, READMEs, test files) and runs against the LIVE tree, so it
# must never get code-execution or tree-mutating Bash. Removed from the prior
# build: node/python3/npx/npm/pytest (arbitrary code), find (-delete/-exec), and
# the blanket `git *` (push/reset/clean/checkout). What remains cannot write.
audit_status=0
audit_raw=$(
  GOAL_AUDITOR_SUBPROCESS=1 timeout 360 claude -p \
    --max-budget-usd 1.50 \
    --disable-slash-commands \
    --output-format json \
    --allowedTools \
      "Read" "Grep" "Glob" \
      "Bash(git status*)" "Bash(git log*)" "Bash(git diff*)" "Bash(git show*)" \
      "Bash(ls *)" "Bash(cat *)" "Bash(head *)" "Bash(tail *)" "Bash(wc *)" \
    <<< "$prompt" 2>/dev/null
) || audit_status=$?

# H-1: with --output-format json, claude wraps the model's final message in an
# envelope { ..., "result": "<text>" }. (The prior --json-schema call returned
# empty stdout on the installed claude, so a finished goal could never be
# confirmed.) Pull the model text from .result if present; otherwise treat the
# whole output as the text (covers versions that print it directly).
result_text=$(printf '%s' "$audit_raw" | jq -r '.result // empty' 2>/dev/null || true)
[[ -n "$result_text" ]] || result_text="$audit_raw"

# Extract a verdict object: try a direct JSON parse of the model text first,
# then fall back to the largest {...} blob that mentions "verdict".
verdict_obj=""
if printf '%s' "$result_text" | jq -e 'objects | has("verdict")' >/dev/null 2>&1; then
  verdict_obj="$result_text"
else
  cand=$(printf '%s' "$result_text" | tr '\n' ' ' | grep -oE '\{.*"verdict".*\}' | head -1 || true)
  if [[ -n "$cand" ]] && printf '%s' "$cand" | jq -e 'objects | has("verdict")' >/dev/null 2>&1; then
    verdict_obj="$cand"
  fi
fi

# H3/C1: however it was extracted, the verdict MUST be exactly one enum value.
# Anything else is rejected as unparseable. This removes the schema-bypass that
# the salvage path used to allow and the precondition for the verdict-injection.
if [[ -n "$verdict_obj" ]]; then
  v=$(printf '%s' "$verdict_obj" | jq -r '.verdict // empty' 2>/dev/null || true)
  if [[ "$v" = "COMPLETE" || "$v" = "INCOMPLETE" ]]; then
    # Re-serialize canonically so only known fields propagate downstream.
    printf '%s' "$verdict_obj" | jq -c '{verdict: .verdict, requirements: (.requirements // []), gaps_for_main_agent: (.gaps_for_main_agent // "")}'
    [[ "$v" = "COMPLETE" ]] && exit 0
    exit 1
  fi
fi

# H4: nothing usable. Be conservative and DO NOT echo raw model output (it may
# contain file contents / test output / secrets) into the verdict that flows
# back into state/history/contract. Keep only a status code; the owner-only
# audit log already retains the raw text for debugging.
printf '{"verdict":"INCOMPLETE","audit_status":%d,"gaps_for_main_agent":"Auditor produced no parseable verdict (status=%d). See the audit log under .claude/goal/audits/ for raw output."}\n' \
  "$audit_status" "$audit_status"
exit 1
