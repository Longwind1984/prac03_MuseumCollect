#!/bin/bash
# /goal start "<spec text>"
# Initialize a new goal: write spec.md + state.json, set status=active.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

spec_text="${1:-}"
max_turns="${2:-200}"
max_tokens="${3:-2000000}"

if [[ -z "$spec_text" ]]; then
  cat <<'EOF'
Usage: /goal start "<spec text>" [max_turns] [max_tokens]

The spec text is the verbatim goal that will be re-injected into every turn.
Write it as if briefing a fresh agent: what to build, what "done" means,
what constraints apply. Be concrete about acceptance criteria — the
auditor will verify against this text literally.

Examples:
  /goal start "Implement a /goal slash command per design doc /tmp/goal-design.md. Done means: SKILL.md exists, all scripts pass shellcheck, README documents the kill switch."
EOF
  exit 1
fi

if goal_is_initialized; then
  status=$(goal_status)
  if [[ "$status" = "active" || "$status" = "paused" ]]; then
    cat <<EOF
STATUS=$status
A goal is already $status in this project. Refusing to overwrite.
Options:
  /goal abort        # terminate the current goal first
  /goal show-spec    # see what's already running
  /goal status       # full state
EOF
    exit 1
  fi
fi

goal_init "$spec_text" "$max_turns" "$max_tokens"

cat <<EOF
STATUS=active
Goal initialized.
  project:    $(goal_project_dir)
  spec:       $(goal_spec_path)
  state:      $(goal_state_path)
  budget:     ${max_turns} turns / ~${max_tokens} tokens
  kill:       /goal abort   OR   touch $(goal_stop_path)

The Stop hook will now re-prompt with the full goal contract after each
turn until the auditor confirms completion, you abort, the blocker
counter reaches 3, or budget is exhausted.
EOF
