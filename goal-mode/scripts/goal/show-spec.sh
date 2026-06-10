#!/bin/bash
# /mygoal show-spec — print the verbatim goal spec that drives the loop.

set -uo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

spec_path=$(goal_spec_path)

if [[ ! -f "$spec_path" ]]; then
  printf 'STATUS=none\nNo spec.md found at %s.\nStart a goal with: /mygoal start "<spec>"\n' "$spec_path"
  exit 1
fi

stored_sha=$(goal_state_get spec_sha256)
actual_sha=$(sha256sum "$spec_path" | cut -d' ' -f1)

printf '═══════════════ GOAL SPEC (%s) ═══════════════\n' "$spec_path"
cat "$spec_path"
printf '══════════════════════════════════════════════════════════════════════\n'

if [[ -n "$stored_sha" && "$stored_sha" != "null" && "$stored_sha" != "$actual_sha" ]]; then
  cat <<EOF

WARNING: spec.md has been edited since the goal started.
  recorded sha256: ${stored_sha:0:12}…
  current  sha256: ${actual_sha:0:12}…
The auditor verifies against the CURRENT file contents, not the original.
EOF
fi
