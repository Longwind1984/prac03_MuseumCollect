#!/bin/bash
# Installer for /goal mode — a user-level Claude Code tool.
# Copies the scripts + skill into ~/.claude and registers the Stop hook,
# so /goal works in ANY project and ANY conversation for this user.
#
# Idempotent: safe to re-run (e.g. after pulling an update).

set -uo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"

# M5: with neither CLAUDE_CONFIG_DIR nor HOME set, CLAUDE_DIR collapses to
# "/.claude" and the installer would scatter files at the filesystem root (or
# half-install). Refuse any target at root.
if [[ -z "${CLAUDE_CONFIG_DIR:-}" && -z "${HOME:-}" ]]; then
  echo "ERROR: neither CLAUDE_CONFIG_DIR nor HOME is set; refusing to install into /.claude. Set one and re-run." >&2
  exit 1
fi
case "$CLAUDE_DIR" in
  /.claude|/.claude/*)
    echo "ERROR: install target resolved to '$CLAUDE_DIR' (filesystem root). Set CLAUDE_CONFIG_DIR or HOME and re-run." >&2
    exit 1
    ;;
esac

DISP_CMD="$CLAUDE_DIR/scripts/goal/dispatcher.sh"
SETTINGS="$CLAUDE_DIR/settings.json"

command -v jq >/dev/null 2>&1 || { echo "ERROR: jq is required (the tool uses it for state). Install jq and re-run." >&2; exit 1; }

echo "Installing /goal mode into: $CLAUDE_DIR"

# 1. Scripts + skill.
mkdir -p "$CLAUDE_DIR/scripts/goal" "$CLAUDE_DIR/skills/goal"
cp "$SRC"/scripts/goal/*.sh "$CLAUDE_DIR/scripts/goal/"
cp "$SRC"/skills/goal/SKILL.md "$CLAUDE_DIR/skills/goal/SKILL.md"
chmod +x "$CLAUDE_DIR"/scripts/goal/*.sh
echo "  • scripts  -> $CLAUDE_DIR/scripts/goal/"
echo "  • skill    -> $CLAUDE_DIR/skills/goal/SKILL.md"

# 2. Register the Stop hook (append if absent), backing up settings first.
[[ -f "$SETTINGS" ]] || printf '{}\n' > "$SETTINGS"
cp "$SETTINGS" "$SETTINGS.bak.$(date +%Y%m%d%H%M%S)"
tmp="$(mktemp)"
if jq --arg cmd "$DISP_CMD" '
      .hooks //= {} | .hooks.Stop //= [] |
      if ([.hooks.Stop[]?.hooks[]?.command // ""] | any(test("scripts/goal/dispatcher\\.sh")))
      then .
      else .hooks.Stop += [{matcher: "", hooks: [{type: "command", command: $cmd}]}]
      end
    ' "$SETTINGS" > "$tmp"; then
  mv "$tmp" "$SETTINGS"
  echo "  • Stop hook registered in $SETTINGS (backup written alongside)"
else
  rm -f "$tmp"
  echo "ERROR: failed to update $SETTINGS — left unchanged (a backup was made)." >&2
  exit 1
fi

# 3. Warn about a pre-existing direct git-check Stop hook (the dispatcher chains it).
if jq -e '[.hooks.Stop[]?.hooks[]?.command // ""] | any(test("stop-hook-git-check\\.sh") and (test("scripts/goal/dispatcher\\.sh") | not))' "$SETTINGS" >/dev/null 2>&1; then
  cat <<EOF

NOTE: your settings.json still has a Stop hook calling stop-hook-git-check.sh
directly. The goal dispatcher already chains to that script when no goal is
active, so you may want to remove the standalone entry to avoid running it
twice. (Harmless otherwise.)
EOF
fi

cat <<EOF

Done. Restart Claude Code (or start a new session) so the Stop hook loads.

Usage:
  /goal start "<spec text>"   start a self-driving goal in the current project
  /goal status                show state
  /goal pause | resume | abort
  /goal show-spec | audit

Kill switch (always works):
  /goal abort
  touch <project>/.claude/goal/STOP

Tip: add '.claude/goal/' to each project's .gitignore — it holds goal state and
audit logs (which can capture file/test output) and should not be committed.
EOF
