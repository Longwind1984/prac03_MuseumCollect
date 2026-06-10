#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# /mygoal mode — portable QA harness
#
# Runs ANYWHERE: it locates the goal scripts relative to THIS file (not via cwd),
# so a fresh clone of this repo can run it from any directory, on any machine.
# It never touches your real ~/.claude or any real project — every test runs in a
# throwaway `git init` directory under TMPDIR, and the auditor is STUBBED so the
# suite is hermetic and costs nothing (no real `claude -p` calls).
#
#   Usage:   bash goal-mode/test/run-qa.sh
#   Exit:    0 = all assertions passed, 1 = at least one failed (or missing dep)
#
# What it proves: the Stop-hook state machine (start/continue/budget/blocker),
# completion auditing (COMPLETE closes, INCOMPLETE continues w/ gaps), the
# multi-line marker fix, both kill switches, pause, the recursion guard, and the
# stall detector (no working-tree/commit change for N turns -> stalled, resets on
# real progress, resumable).
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$(cd "$HERE/../scripts/goal" && pwd)"   # the scripts under test, in this repo

# ── deps ─────────────────────────────────────────────────────────────────────
missing=""
for dep in bash jq git sha256sum mktemp; do
  command -v "$dep" >/dev/null 2>&1 || missing="$missing $dep"
done
if [[ -n "$missing" ]]; then
  printf 'SKIP: missing required tools:%s\n' "$missing" >&2
  exit 1
fi
[[ -f "$SRC/continuation-hook.sh" ]] || { printf 'ERROR: cannot find goal scripts at %s\n' "$SRC" >&2; exit 1; }

# ── assemble a throwaway GOAL_HOME: real scripts + a STUB auditor ────────────
# The continuation hook calls "$GOAL_HOME/auditor.sh"; by copying the scripts to
# a temp dir and replacing only auditor.sh, completion tests get a deterministic
# verdict with zero `claude` spend. Everything else is the real code.
ROOT="$(mktemp -d "${TMPDIR:-/tmp}/goalqa-root.XXXXXX")"
GH="$ROOT/goal"
mkdir -p "$GH"
cp "$SRC"/*.sh "$GH"/
cat > "$GH/auditor.sh" <<'STUB'
#!/usr/bin/env bash
# QA stub auditor — verdict controlled by $STUB_VERDICT (no real claude spend).
v="${STUB_VERDICT:-INCOMPLETE}"
if [[ "$v" == "COMPLETE" ]]; then
  printf '{"verdict":"COMPLETE","requirements":[],"gaps_for_main_agent":""}\n'
  exit 0
fi
printf '{"verdict":"INCOMPLETE","requirements":[],"gaps_for_main_agent":"stub: requirement X not met"}\n'
exit 1
STUB
chmod +x "$GH"/*.sh

# Track temp dirs for cleanup.
TMPDIRS=("$ROOT")
cleanup(){ rm -rf "${TMPDIRS[@]}" 2>/dev/null || true; }
trap cleanup EXIT

# ── assertion framework ──────────────────────────────────────────────────────
PASS=0; FAIL=0
is(){ # is <desc> <expected> <actual>
  if [[ "$2" == "$3" ]]; then
    PASS=$((PASS+1)); printf '  PASS  %s\n' "$1"
  else
    FAIL=$((FAIL+1)); printf '  FAIL  %s\n        expected [%s] got [%s]\n' "$1" "$2" "$3"
  fi
}
ge(){ # ge <desc> <actual> <min>   (numeric: actual >= min)
  if [[ "$2" =~ ^[0-9]+$ ]] && [[ "$2" -ge "$3" ]]; then
    PASS=$((PASS+1)); printf '  PASS  %s\n' "$1"
  else
    FAIL=$((FAIL+1)); printf '  FAIL  %s\n        expected >=%s got [%s]\n' "$1" "$3" "$2"
  fi
}
contains(){ # contains <desc> <haystack> <needle>
  if [[ "$2" == *"$3"* ]]; then
    PASS=$((PASS+1)); printf '  PASS  %s\n' "$1"
  else
    FAIL=$((FAIL+1)); printf '  FAIL  %s\n        [%s] does not contain [%s]\n' "$1" "$2" "$3"
  fi
}

# ── project / transcript / fire helpers ──────────────────────────────────────
mkproj(){ # -> path to a fresh throwaway git repo (no commits needed)
  local d; d=$(mktemp -d "${TMPDIR:-/tmp}/goalqa.XXXXXX")
  git -C "$d" init -q >/dev/null 2>&1
  printf 'seed\n' > "$d/seed.txt"   # one untracked file => stable, non-degenerate baseline
  TMPDIRS+=("$d")
  printf '%s' "$d"
}
newgoal(){ # newgoal <proj> <spec> [max_turns] [max_tokens]
  CLAUDE_PROJECT_DIR="$1" bash "$GH/start.sh" "$2" "${3:-200}" "${4:-2000000}" >/dev/null 2>&1
}
mkmsg(){ # mkmsg <file> <text>  (text may contain real newlines; jq escapes it)
  jq -nc --arg t "$2" '{type:"assistant",message:{content:[{type:"text",text:$t}]}}' > "$1"
}
state(){ jq -r "$2" "$1/.claude/goal/state.json" 2>/dev/null; } # state <proj> <jqfilter>
run_sub(){ CLAUDE_PROJECT_DIR="$1" bash "$GH/$2" >/dev/null 2>&1; } # run_sub <proj> <script>

# fire_env <proj> <transcript> <stop_hook_active> [VAR=val ...]  -> returns hook exit code
# `env VAR=val` scopes test-control vars to this one invocation; nothing leaks.
fire_env(){
  local proj=$1 tr=$2 sha=$3; shift 3
  printf '{"stop_hook_active":%s,"transcript_path":"%s"}' "$sha" "$tr" \
    | env "$@" CLAUDE_PROJECT_DIR="$proj" bash "$GH/continuation-hook.sh" >/dev/null 2>&1
}

printf '\n=== /mygoal mode QA — scripts under test: %s ===\n\n' "$SRC"

# ── T1: start initializes a valid, well-shaped state ─────────────────────────
printf 'T1  start -> active, state seeded\n'
p=$(mkproj); newgoal "$p" "build a thing"
is   "status active"            active "$(state "$p" .status)"
is   "turn_count 0"             0      "$(state "$p" .turn_count)"
is   "progress.no_progress_count 0" 0  "$(state "$p" .progress.no_progress_count)"
is   "progress.last_fingerprint null" null "$(state "$p" .progress.last_fingerprint)"
is   "valid JSON"               ok     "$(jq -e . "$p/.claude/goal/state.json" >/dev/null 2>&1 && echo ok || echo bad)"

# ── T2: an ordinary working turn re-prompts and advances the turn counter ────
printf 'T2  ordinary turn -> exit 2, turn++\n'
t=$(mktemp); mkmsg "$t" "still working on the implementation"
rc=0; fire_env "$p" "$t" true || rc=$?
is   "exit 2 (re-prompt)"       2      "$rc"
is   "turn incremented to 1"    1      "$(state "$p" .turn_count)"

# ── T3: post-turn budget ceiling on turns ────────────────────────────────────
printf 'T3  turn budget -> budget-limited\n'
p=$(mkproj); newgoal "$p" "spec" 2 2000000
t=$(mktemp); mkmsg "$t" "work"
fire_env "$p" "$t" true; fire_env "$p" "$t" true; rc=0; fire_env "$p" "$t" true || rc=$?
is   "status budget-limited"    budget-limited "$(state "$p" .status)"
is   "stops (exit 0)"           0      "$rc"

# ── T4: same blocker x3 confirms the block ───────────────────────────────────
printf 'T4  GOAL_BLOCKED x3 -> blocked\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "GOAL_BLOCKED: need a credential I do not have"
fire_env "$p" "$t" true; fire_env "$p" "$t" true; rc=0; fire_env "$p" "$t" true || rc=$?
is   "status blocked"           blocked "$(state "$p" .status)"
is   "stops (exit 0)"           0       "$rc"

# ── T5: an intervening working turn resets the blocker streak (M-1 fixed) ─────
printf 'T5  blocker streak resets on a normal turn\n'
p=$(mkproj); newgoal "$p" "spec"
tb=$(mktemp); mkmsg "$tb" "GOAL_BLOCKED: same reason every time"
tn=$(mktemp); mkmsg "$tn" "found another angle, making changes"
fire_env "$p" "$tb" true; fire_env "$p" "$tb" true
fire_env "$p" "$tn" true                      # <- resets the streak
fire_env "$p" "$tb" true; fire_env "$p" "$tb" true
is   "still active (never hit 3 consecutive)" active "$(state "$p" .status)"
is   "blocker count back to 2" 2 "$(state "$p" .blocker.consecutive_count)"

# ── T6: completion claim + auditor COMPLETE closes the goal ──────────────────
printf 'T6  GOAL_COMPLETE + audit COMPLETE -> complete\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "GOAL_COMPLETE: everything is implemented and verified"
rc=0; fire_env "$p" "$t" true STUB_VERDICT=COMPLETE || rc=$?
is   "status complete"          complete  "$(state "$p" .status)"
is   "stops (exit 0)"           0         "$rc"
is   "recorded verdict COMPLETE" COMPLETE "$(state "$p" .audits.last_verdict)"

# ── T7: completion claim + auditor INCOMPLETE keeps going, carries gaps ──────
printf 'T7  GOAL_COMPLETE + audit INCOMPLETE -> continue w/ gaps\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "GOAL_COMPLETE: I think it is done"
rc=0; fire_env "$p" "$t" true STUB_VERDICT=INCOMPLETE || rc=$?
is   "exit 2 (keep working)"    2          "$rc"
is   "status still active"      active     "$(state "$p" .status)"
is   "recorded verdict INCOMPLETE" INCOMPLETE "$(state "$p" .audits.last_verdict)"
contains "gaps recorded" "$(state "$p" .audits.last_gaps)" "stub"

# ── T8: marker NOT on the last physical line still triggers the audit ────────
#    (regression guard for the old `tail -1` truncation bug)
printf 'T8  multi-line GOAL_COMPLETE still audited\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" $'GOAL_COMPLETE: done\nThanks, let me know if anything else is needed.'
rc=0; fire_env "$p" "$t" true STUB_VERDICT=COMPLETE || rc=$?
is   "status complete (marker not last line)" complete "$(state "$p" .status)"
is   "stops (exit 0)"           0          "$rc"

# ── T9: emergency STOP file kills the loop without touching the tree ─────────
printf 'T9  touch STOP -> aborted\n'
p=$(mkproj); newgoal "$p" "spec"
sha_before=$(sha256sum "$p/seed.txt" | cut -d' ' -f1)
: > "$p/.claude/goal/STOP"
t=$(mktemp); mkmsg "$t" "work"; rc=0; fire_env "$p" "$t" true || rc=$?
is   "status aborted"           aborted "$(state "$p" .status)"
is   "stops (exit 0)"           0       "$rc"
is   "STOP consumed"            absent  "$([[ -f "$p/.claude/goal/STOP" ]] && echo present || echo absent)"
is   "ABORTED sentinel written" present "$([[ -f "$p/.claude/goal/ABORTED" ]] && echo present || echo absent)"
is   "working tree untouched"   "$sha_before" "$(sha256sum "$p/seed.txt" | cut -d' ' -f1)"

# ── T10: STALL — no working-tree/commit change for N turns -> stalled ────────
#    THE FIX. Also proves .claude/goal/ churn is excluded from the fingerprint
#    (if our own per-turn state writes counted as progress, npc could never rise).
printf 'T10 no-progress for N turns -> stalled\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "thinking hard but not editing any file"
stalled=no; fires=0
for _ in 1 2 3 4 5 6 7 8; do
  fires=$((fires+1))
  fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4
  [[ "$(state "$p" .status)" == "stalled" ]] && { stalled=yes; break; }
done
is   "reached stalled"          yes     "$stalled"
ge   "no_progress_count >= 4"   "$(state "$p" .progress.no_progress_count)" 4
is   "stalled by the 5th fire"  5       "$fires"

# ── T11: a real change to the tree RESETS the stall counter (no false stall) ──
printf 'T11 real progress resets the stall counter\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "working"
fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4
fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4
fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4
ge   "counter climbed"          "$(state "$p" .progress.no_progress_count)" 1
printf 'new artifact from the agent\n' > "$p/feature.txt"   # the agent did something real
rc=0; fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4 || rc=$?
is   "counter reset to 0"       0       "$(state "$p" .progress.no_progress_count)"
is   "still active (no false stall)" active "$(state "$p" .status)"
is   "keeps working (exit 2)"   2       "$rc"

# ── T12: resume from stalled re-arms and does NOT instantly re-stall ─────────
printf 'T12 resume from stalled -> active, no instant re-stall\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "spinning"
for _ in 1 2 3 4 5 6; do
  fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4
  [[ "$(state "$p" .status)" == "stalled" ]] && break
done
is   "reached stalled"          stalled "$(state "$p" .status)"
run_sub "$p" resume.sh
is   "resume -> active"         active  "$(state "$p" .status)"
is   "counter reset on resume"  0       "$(state "$p" .progress.no_progress_count)"
is   "fingerprint cleared"      null    "$(state "$p" .progress.last_fingerprint)"
rc=0; fire_env "$p" "$t" false GOAL_STALL_THRESHOLD=4 || rc=$?   # tree still unchanged
is   "no instant re-stall (exit 2)" 2   "$rc"
is   "still active after one fire"  active "$(state "$p" .status)"

# ── T13: paused -> the hook does not re-prompt ───────────────────────────────
printf 'T13 paused -> no re-prompt\n'
p=$(mkproj); newgoal "$p" "spec"
run_sub "$p" pause.sh
t=$(mktemp); mkmsg "$t" "work"; rc=0; fire_env "$p" "$t" true || rc=$?
is   "stops (exit 0)"           0       "$rc"
is   "status paused"            paused  "$(state "$p" .status)"
is   "turn NOT incremented"     0       "$(state "$p" .turn_count)"

# ── T14: recursion guard — auditor subprocess never re-enters the loop ───────
printf 'T14 GOAL_AUDITOR_SUBPROCESS=1 -> immediate exit 0\n'
p=$(mkproj); newgoal "$p" "spec"
t=$(mktemp); mkmsg "$t" "GOAL_COMPLETE: x"
rc=0; fire_env "$p" "$t" true GOAL_AUDITOR_SUBPROCESS=1 || rc=$?
is   "short-circuits (exit 0)"  0       "$rc"
is   "no audit, turn untouched" 0       "$(state "$p" .turn_count)"
is   "status still active"      active  "$(state "$p" .status)"

# ── summary ──────────────────────────────────────────────────────────────────
printf '\n=== %d passed, %d failed ===\n' "$PASS" "$FAIL"
[[ "$FAIL" -eq 0 ]]
