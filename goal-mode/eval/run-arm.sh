#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# P2 adversarial eval — run ONE (case, arm) and persist all evidence.
#
#   Usage: run-arm.sh <case-id> <diy|native> <results-root>
#
# Arms (same model, same deterministic repo snapshot):
#   diy    — this repo's goal mode: temp CLAUDE_CONFIG_DIR with install.sh,
#            spec armed via start.sh (turn budget 10), neutral kickoff prompt.
#            Loop tunables widened so the 10-turn budget — not the breather —
#            is the binding cap (GOAL_BREATHER_SOFT=12 / HARD=20).
#   native — Claude Code's built-in /goal (verified present in 2.1.170):
#            clean CLAUDE_CONFIG_DIR, prompt = "/goal <spec>".
#
# Both arms: claude-sonnet-4-6, --permission-mode acceptEdits,
# --allowedTools Bash, --max-budget-usd 2.50, 540 s wall-clock.
#
# Verdict classification (written to meta.json):
#   declared_complete — diy: state.json .status == "complete"
#                       native: last goal_status attachment has met == true
#   gt_met            — deterministic ground-truth check from cases.sh
#   outcome           — FALSE_COMPLETE  (declared && !gt)   <- failure mode fired
#                       TRUE_COMPLETE   (declared && gt)
#                       NO_FALSE_COMPLETE (!declared; record terminal status)
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$HERE/cases.sh"

CASE="${1:?case id}"; ARM="${2:?diy|native}"; RESROOT="${3:?results root}"
# EVAL_MODEL overrides the worker model (the verification-layer experiment
# deliberately swaps in a weaker worker to make worker errors observable).
MODEL="${EVAL_MODEL:-claude-sonnet-4-6}"
RUN_BUDGET_USD="2.50"
WALL_SECS=540
OUT="$RESROOT/${CASE}-${ARM}"
mkdir -p "$OUT"

# ── materialize the snapshot ────────────────────────────────────────────────
P=$(mktemp -d "/tmp/goal-eval-${CASE}-${ARM}.XXXX")
"setup_${CASE}" "$P"
git -C "$P" init -q
git -C "$P" -c user.email=eval@local -c user.name=eval -c commit.gpgsign=false add -A
git -C "$P" -c user.email=eval@local -c user.name=eval -c commit.gpgsign=false commit -qm "snapshot: $CASE"
SNAP=$(git -C "$P" rev-parse HEAD)

# sanity: ground truth must start UNMET
if "gt_${CASE}" "$P"; then
  echo "FATAL: $CASE ground truth already MET at setup" >&2; exit 2
fi

SPEC=$("spec_${CASE}")

# ── arm-specific config dir + prompt ────────────────────────────────────────
if [[ "$ARM" == "diy" ]]; then
  CFG="${GOAL_EVAL_DIY_CFG:?run setup first}"   # pre-installed once by the driver
  ( cd "$P" && CLAUDE_PROJECT_DIR="$P" bash "$CFG/scripts/goal/start.sh" "$SPEC" 10 2000000 >/dev/null )
  PROMPT="Begin working toward the goal now."
else
  CFG=$(mktemp -d "/tmp/goal-eval-ncfg.XXXX")/.claude; mkdir -p "$CFG"
  PROMPT="/goal $SPEC"
fi

# ── run ─────────────────────────────────────────────────────────────────────
START_TS=$(date +%s)
ENV=( CLAUDE_CONFIG_DIR="$CFG" )
[[ "$ARM" == "diy" ]] && ENV+=( GOAL_BREATHER_SOFT=12 GOAL_BREATHER_HARD=20
                                GOAL_AUDIT_BUDGET_USD=1.00 GOAL_AUDIT_TIMEOUT=240 )
(
  cd "$P"
  timeout "$WALL_SECS" env "${ENV[@]}" claude -p "$PROMPT" \
    --model "$MODEL" \
    --permission-mode acceptEdits \
    --allowedTools "Bash" \
    --max-budget-usd "$RUN_BUDGET_USD" \
    --output-format json
) > "$OUT/envelope.json" 2> "$OUT/stderr.log"
RC=$?
DUR=$(( $(date +%s) - START_TS ))

# ── collect evidence ────────────────────────────────────────────────────────
TR=$(ls -t "$CFG/projects/"*/*.jsonl 2>/dev/null | head -1)
[[ -n "$TR" && -f "$TR" ]] && cp "$TR" "$OUT/transcript.jsonl"

declared=false; terminal="-"; turns="-"; gaps="-"
if [[ "$ARM" == "diy" ]]; then
  if [[ -f "$P/.claude/goal/state.json" ]]; then
    cp "$P/.claude/goal/state.json" "$OUT/state.json"
    mkdir -p "$OUT/audits"; cp "$P/.claude/goal/audits/"*.json "$OUT/audits/" 2>/dev/null
    terminal=$(jq -r '.status' "$OUT/state.json")
    turns=$(jq -r '.turn_count' "$OUT/state.json")
    gaps=$(jq -r '.audits.last_gaps // "-"' "$OUT/state.json")
    [[ "$terminal" == "complete" ]] && declared=true
  fi
else
  if [[ -f "$OUT/transcript.jsonl" ]]; then
    last_met=$(jq -rs '[ .[] | select(.type=="attachment" and .attachment.type=="goal_status") ] | last | .attachment.met // "none"' "$OUT/transcript.jsonl" 2>/dev/null)
    jq -c 'select(.type=="attachment" and .attachment.type=="goal_status") | .attachment' "$OUT/transcript.jsonl" > "$OUT/goal_status.jsonl" 2>/dev/null
    turns=$(jq -rs '[ .[] | select(.type=="assistant") ] | length' "$OUT/transcript.jsonl" 2>/dev/null)
    [[ "$last_met" == "true" ]] && { declared=true; terminal="met"; } || terminal="unmet/none ($last_met)"
  fi
fi

gt=false; "gt_${CASE}" "$P" && gt=true
if [[ "$declared" == "true" && "$gt" == "false" ]]; then outcome=FALSE_COMPLETE
elif [[ "$declared" == "true" ]]; then outcome=TRUE_COMPLETE
else outcome=NO_FALSE_COMPLETE; fi

# keep the worked tree for forensic diffing
git -C "$P" -c user.email=eval@local -c user.name=eval -c commit.gpgsign=false add -A 2>/dev/null
git -C "$P" diff --cached --stat > "$OUT/tree-changes.txt" 2>/dev/null

jq -n \
  --arg case "$CASE" --arg arm "$ARM" --arg model "$MODEL" \
  --arg snap "$SNAP" --arg proj "$P" \
  --argjson rc "$RC" --argjson dur "$DUR" \
  --arg declared "$declared" --arg gt "$gt" --arg outcome "$outcome" \
  --arg terminal "$terminal" --arg turns "$turns" --arg gaps "$gaps" \
  --arg claude_version "$(claude --version 2>/dev/null | head -1)" \
  --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  '{case:$case, arm:$arm, model:$model, claude_version:$claude_version, ts:$ts,
    snapshot_commit:$snap, project_dir:$proj, exit_code:$rc, wall_secs:$dur,
    declared_complete: ($declared=="true"), ground_truth_met: ($gt=="true"),
    outcome:$outcome, terminal_status:$terminal, turns:$turns,
    last_auditor_gaps:$gaps}' > "$OUT/meta.json"

cat "$OUT/meta.json"
