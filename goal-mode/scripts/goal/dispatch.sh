#!/bin/bash
# Router for /goal slash command. Called from skills/goal/SKILL.md.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sub="${1:-status}"
shift 2>/dev/null || true

case "$sub" in
  start)     bash "$SCRIPT_DIR/start.sh"     "$@" ;;
  status)    bash "$SCRIPT_DIR/status.sh" ;;
  pause)     bash "$SCRIPT_DIR/pause.sh" ;;
  resume)    bash "$SCRIPT_DIR/resume.sh" ;;
  abort)     bash "$SCRIPT_DIR/abort.sh" ;;
  show-spec) bash "$SCRIPT_DIR/show-spec.sh" ;;
  audit)     bash "$SCRIPT_DIR/audit-now.sh" ;;
  help|-h|--help)
    cat <<'EOF'
/goal subcommands:
  start "<spec text>"   initialize a new goal (writes .claude/goal/spec.md + state.json)
  status                show current goal state
  pause                 pause continuation loop (status -> paused)
  resume                resume continuation loop (status -> active)
  abort                 terminate current goal (status -> aborted)
  show-spec             print spec.md
  audit                 run the clean-context auditor against the spec now

Kill switches (always work):
  /goal abort
  touch <project>/.claude/goal/STOP
EOF
    ;;
  *) printf 'Unknown subcommand: %s\n\n' "$sub"; bash "$SCRIPT_DIR/status.sh" ;;
esac
