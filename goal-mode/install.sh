#!/bin/bash
# Installer for /mygoal — this repo's DIY "goal mode" reimplementation,
# renamed from the original /goal so it coexists with the built-in /goal
# command introduced in Claude Code 2.1.139+.
# Copies the scripts + skill into ~/.claude and registers the Stop hook,
# so /mygoal works in ANY project and ANY conversation for this user.
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

echo "Installing /mygoal into: $CLAUDE_DIR"

# 1. Scripts + skill. The slash command is /mygoal so it coexists with the
# native /goal command shipped in Claude Code 2.1.139+. The internal scripts
# directory is still scripts/goal/ (unchanged path keeps in-place upgrades and
# any existing per-project .claude/goal/ state usable without migration).
mkdir -p "$CLAUDE_DIR/scripts/goal" "$CLAUDE_DIR/skills/mygoal"
cp "$SRC"/scripts/goal/*.sh "$CLAUDE_DIR/scripts/goal/"
cp "$SRC"/skills/mygoal/SKILL.md "$CLAUDE_DIR/skills/mygoal/SKILL.md"
chmod +x "$CLAUDE_DIR"/scripts/goal/*.sh
echo "  • scripts  -> $CLAUDE_DIR/scripts/goal/"
echo "  • skill    -> $CLAUDE_DIR/skills/mygoal/SKILL.md"

# Clean up the OLD skill location from any prior install so /goal isn't
# shadowed any longer (this is what made the native command unreachable when
# the DIY skill was still named "goal").
if [[ -d "$CLAUDE_DIR/skills/goal" ]]; then
  rm -rf "$CLAUDE_DIR/skills/goal"
  echo "  • removed legacy $CLAUDE_DIR/skills/goal/ (so the native /goal is no longer shadowed)"
fi

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
  /mygoal start "<spec text>"   start a self-driving goal in the current project
  /mygoal status                show state
  /mygoal pause | resume | abort
  /mygoal show-spec | audit

Kill switch (always works):
  /mygoal abort
  touch <project>/.claude/goal/STOP

Note: this tool is called /mygoal to coexist with the built-in /goal in
Claude Code 2.1.139+. Both commands now work side-by-side.

Tip: add '.claude/goal/' to each project's .gitignore — it holds goal state and
audit logs (which can capture file/test output) and should not be committed.
EOF
