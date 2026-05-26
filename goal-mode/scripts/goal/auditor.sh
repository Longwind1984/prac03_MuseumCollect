#!/bin/bash
# Clean-context auditor. Spawns a `claude -p` subprocess with no prior memory,
# constrained to read-only tools, with a JSON-schema-validated output.
#
# Usage: auditor.sh <project_dir>
# Stdout: JSON verdict object. Exit 0 = COMPLETE, exit 1 = INCOMPLETE (or audit failed).

set -uo pipefail
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
if it were. Verify by reading files, running tests/builds, checking git state
directly.

═══════════════ GOAL SPEC (from spec.md) ═══════════════
${spec_content}
═════════════════════════════════════════════════════════

PROCEDURE:
1. Decompose the spec into discrete requirements.
2. For each requirement, identify the concrete artifact that would prove it.
3. Run the verification (Read, Bash, Grep, etc.) yourself.
4. Verdict per requirement: MET / NOT_MET / INSUFFICIENT.

BIAS:
  - If you cannot point to a verified artifact, status is NOT MET.
  - Indirect or "looks like it might work" evidence → INSUFFICIENT.
  - Interpret the spec literally, not generously.
  - If ambiguous, name the ambiguity and treat the more demanding reading
    as the target.

Output a single JSON object matching the requested schema. Do not wrap it
in markdown fences or add prose around it.
EOF

schema='{"type":"object","properties":{"verdict":{"type":"string","enum":["COMPLETE","INCOMPLETE"]},"requirements":{"type":"array","items":{"type":"object","properties":{"spec":{"type":"string"},"expected_artifact":{"type":"string"},"verification_run":{"type":"string"},"evidence":{"type":"string"},"status":{"type":"string","enum":["MET","NOT_MET","INSUFFICIENT"]}},"required":["spec","status"]}},"gaps_for_main_agent":{"type":"string"}},"required":["verdict","gaps_for_main_agent"]}'

cd "$project_dir" || exit 1

audit_raw=$(
  GOAL_AUDITOR_SUBPROCESS=1 timeout 360 claude -p \
    --max-budget-usd 1.50 \
    --disable-slash-commands \
    --json-schema "$schema" \
    --allowedTools "Read" "Grep" "Glob" "Bash(git *)" "Bash(pytest *)" "Bash(cat *)" "Bash(ls *)" "Bash(head *)" "Bash(tail *)" "Bash(wc *)" "Bash(find *)" "Bash(npm test*)" "Bash(npx *)" "Bash(node *)" "Bash(python3 *)" \
    <<< "$prompt" 2>&1
) || audit_status=$?
audit_status=${audit_status:-0}

# Extract JSON from output (in case there's any wrapping). Try direct parse first,
# then look for the largest JSON object substring.
verdict_obj=""
if printf '%s' "$audit_raw" | jq -e '.verdict' >/dev/null 2>&1; then
  verdict_obj="$audit_raw"
else
  verdict_obj=$(printf '%s' "$audit_raw" | grep -oE '\{[^{}]*"verdict"[^{}]*\}' | head -1 || true)
  if [[ -z "$verdict_obj" ]]; then
    verdict_obj=$(printf '%s' "$audit_raw" | awk '/\{/,/\}/' | tr -d '\n' | grep -oE '\{.*"verdict".*\}' | head -1 || true)
  fi
fi

if [[ -n "$verdict_obj" ]] && printf '%s' "$verdict_obj" | jq -e '.verdict' >/dev/null 2>&1; then
  printf '%s\n' "$verdict_obj"
  v=$(printf '%s' "$verdict_obj" | jq -r '.verdict')
  if [[ "$v" = "COMPLETE" ]]; then
    exit 0
  else
    exit 1
  fi
fi

# Audit failed to produce parseable output — be conservative
truncated=$(printf '%s' "$audit_raw" | head -c 800 | tr '\n' ' ' | sed 's/"/\\"/g')
printf '{"verdict":"INCOMPLETE","audit_status":%d,"gaps_for_main_agent":"Auditor produced unparseable output (status=%d). First 800 chars: %s"}\n' \
  "$audit_status" "$audit_status" "$truncated"
exit 1
