# `/goal` mode — QA Test Report

**Artifact under test:** `/home/user/prac03_MuseumCollect/goal-mode/` (branch `claude/code-goal-mode-CIFfq`)
**Tested:** 2026-05-27
**Method:** Empirical. The artifact was installed into a throwaway `CLAUDE_CONFIG_DIR`, and every test ran against throwaway `mktemp -d` projects. The live `/root/.claude` install and the real repo were never used as a goal project (a guard in the harness refused any `CLAUDE_PROJECT_DIR` pointing at real paths).

---

## 1. Environment summary

| Item | Value |
|------|-------|
| OS | Ubuntu 24.04.4 LTS, kernel 6.18.5, x86_64 |
| Shell | GNU bash 5.2.21 |
| `jq` | jq-1.7 (`/usr/bin/jq`) — **present** |
| `claude` | 2.1.152 (Claude Code) (`/opt/node22/bin/claude`) — **present & authed** |
| Auditor exercised? | **Yes** — one real `claude -p` auditor run (plus 3 tiny diagnostic probes to root-cause a failure). |

---

## 2. PASS / FAIL / N-A matrix

Legend: status.json fields abbreviated. "hook" = `continuation-hook.sh` invoked with a Stop-event JSON on stdin. All repro commands assume:
```bash
export CLAUDE_CONFIG_DIR="$(mktemp -d)/.claude"
bash goal-mode/install.sh
GD="$CLAUDE_CONFIG_DIR/scripts/goal"
mkproj(){ d=$(mktemp -d); (cd "$d"&&git init -q); printf %s "$d"; }
mkmsg(){ printf '%s\n' '{"type":"assistant","message":{"content":[{"type":"text","text":"'"$2"'"}]}}' >"$1"; }
fire(){ printf '{"stop_hook_active":%s,"transcript_path":"%s"}' "${3:-false}" "$2" | CLAUDE_PROJECT_DIR="$1" bash "$GD/continuation-hook.sh"; echo "exit=$?"; }
```

### A. Subcommand matrix

| # | Check | Repro (abbrev.) | Expected | Observed | Result |
|---|-------|-----------------|----------|----------|--------|
| A1 | router default (no arg) | `dispatch.sh` | status (none) | `STATUS=none`, exit 0 | PASS |
| A2 | `status` (uninit) | `dispatch.sh status` | STATUS=none, exit 0 | as expected | PASS |
| A3 | `help` | `dispatch.sh help` | usage text, exit 0 | as expected | PASS |
| A4 | unknown subcmd | `dispatch.sh bogus` | "Unknown subcommand" + status | as expected, exit 0 | PASS |
| A5 | `start` empty spec | `dispatch.sh start` | usage, exit 1 | as expected | PASS |
| A6 | `start` happy path | `start.sh "spec"` | STATUS=active, state.json status=active, turn 0 | as expected | PASS |
| A7 | `start` refuses over active | `start.sh "x"` again | refuse, exit 1 | as expected | PASS |
| A8 | `start` refuses over paused | pause then `start.sh "x"` | refuse, exit 1 | as expected | PASS |
| A9 | `status` (active) | `status.sh` | full state, history, kill switches | as expected | PASS |
| A10 | `show-spec` | `show-spec.sh` | verbatim spec between rules | as expected | PASS |
| A11 | `pause` | `pause.sh` | status→paused, exit 0 | as expected | PASS |
| A12 | `pause` (already) | `pause.sh` again | "Already paused", exit 0 | as expected | PASS |
| A13 | `resume` (from paused) | `resume.sh` | status→active, cb reset | as expected | PASS |
| A14 | `resume` (already active) | `resume.sh` again | "Already active", exit 0 | as expected | PASS |
| A15 | `abort` | `abort.sh` | status→aborted, exit 0, tree untouched | as expected | PASS |
| A16 | `abort` (idempotent) | `abort.sh` again | "already aborted", exit 0 | as expected | PASS |
| A17 | spec: single quotes | `start.sh "it's a 'q' spec"` | spec.md verbatim, valid JSON, sha matches | exact match | PASS |
| A18 | spec: double quotes | `start.sh 'a "b" c'` | verbatim | exact | PASS |
| A19 | spec: `$VAR` | `start.sh 'use $HOME ${X}'` | literal, no expansion | exact | PASS |
| A20 | spec: backticks | `start.sh 'run `whoami`'` | literal, no execution | exact | PASS |
| A21 | spec: `$(cmd)` | `start.sh 'x $(rm -rf /tmp/foo)'` | literal, no execution | exact; no side effect | PASS |
| A22 | spec: unicode (中文) | `start.sh '实现…完成'` | verbatim UTF-8 | exact | PASS |
| A23 | spec: leading `-` | `start.sh '--max-turns=5 x'` | stored as spec, NOT parsed as flag (budget stays default) | exact; budget 200/2M | PASS |
| A24 | spec: `; && \| >` | `start.sh 'a; b && c \| d > /tmp/x'` | literal | exact | PASS |
| A25 | spec: globs `*?[]` | `start.sh 'match *.sh ?.txt [a-z]'` | literal | exact | PASS |
| A26 | spec: newlines/tabs | multiline `$'...\n...'` | exact incl. trailing `\n` | exact | PASS |
| A27 | spec: custom budget args | `start.sh "g" 7 12345` | budget 7/12345 | as expected | PASS |
| A28 | spec: very long (200 KB) | `start.sh "$(200k A's)"` | (see B note) | **rc=126 E2BIG, no state written** | FAIL (Low) |

### B. Stop-hook state machine

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| B1 | active + ordinary msg | `fire $p $t` | exit 2; turn+1; tokens=bytes/4; contract on **stderr** w/ verbatim spec + reality-check | exit 2; turn 1; tokens 29 (=116/4); spec verbatim; kill-switch path correct | PASS |
| B2 | contract is verbatim (multiline+unicode) | start w/ `$'实现\n"q" $V'`, fire | spec present byte-for-byte in stderr | present | PASS |
| B3 | turn/tokens increment over fires | fire twice | turn 1→2 | as expected | PASS |
| B4 | dispatcher.sh forwards exit 2 + contract | pipe Stop JSON to `dispatcher.sh` | exit 2; contract on dispatcher **stderr**; stdout empty | exit 2; 2626 B stderr; stdout empty; **no duplication** (marker count = 1) | PASS |
| B5 | `GOAL_COMPLETE:` path | see G | audit spawned, conservative close | see G | PASS (logic) |
| B6 | `GOAL_BLOCKED:` ×3 same | 3 identical blockers | 3rd → status blocked, exit 0 | blk 1,2,3 → blocked at 3rd | PASS |
| B7 | different blocker each turn | A,B,C,D | counter resets to 1 each; never blocks | blk stays 1; status active | PASS |
| B8 | non-block msg between blockers | blk,blk,normal,blk | **streak should reset per README** | streak NOT reset → blocked at 3rd | **FAIL (Medium)** |
| B9 | many normals between same blockers | blk,5×normal,blk,blk | per README counter resets | reached blocked; normals ignored | **FAIL (Medium)** — same root cause as B8 |
| B10 | near-cap yield, `stop_hook_active=false`, cb=6 | force cb=6, fire(false) | normal continue (exit 2, cb→7) | as expected | PASS |
| B11 | near-cap yield, `stop_hook_active=true`, cb≥6 | force cb=6, fire(true) | exit 0, cb→0, stays active | as expected | PASS (note: history text says "8-block cap"; threshold is 6 — Low cosmetic) |
| B12 | turn budget boundary | max_turns=3, fire 4× | trips only when turn>max (turn 4) | trips at turn 4 → budget-limited, exit 2 (one final summarize) | PASS |
| B13 | next stop after budget-limited | fire again | exit 0 (loop stops) | exit 0; turn frozen | PASS |
| B14 | token budget | max_tokens=10, fire | tokens>10 → budget-limited | exit 2 then stop; status flips | PASS |
| B15 | paused → no re-prompt | pause, fire | exit 0; turn unchanged; no stderr | as expected | PASS |
| B16 | aborted → no re-prompt | abort, fire | exit 0; no stderr | as expected | PASS |
| B17 | complete → no re-prompt | force complete, fire | exit 0 | as expected | PASS |
| B18 | last-msg extraction (last wins; USER ignored) | 3-record transcript | only latest **assistant** searched | USER `GOAL_COMPLETE` ignored; exit 2 | PASS |
| B19 | string-form `.message.content` | content as string | handled | blocker counted | PASS |
| B20 | marker must be at line start | inline `GOAL_COMPLETE:` | not triggered | exit 2 ordinary | PASS |
| B21 | marker on own line but not last line of msg | `"GOAL_COMPLETE: x\nThanks."` | should trigger | **MISSED** (`tail -1` keeps only last physical line) | **FAIL (High)** |
| B22 | marker in 1st of 2 text blocks | array w/ 2 text parts | should trigger | **MISSED** (same `tail -1` cause) | **FAIL (High)** |

### C. Kill switches

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| C1 | `/goal abort` stops loop, tree untouched | abort.sh; sha file before/after | aborted; file sha unchanged | as expected | PASS |
| C2 | `touch STOP` stops loop | touch STOP; fire | exit 0; status aborted; tree untouched | as expected | PASS |
| C3 | STOP consumed | inspect after C2 | STOP removed | removed | PASS |
| C4 | STOP overrides paused | pause, touch STOP, fire | aborted (checked before status guard) | aborted; STOP removed | PASS |
| C5 | abort clears leftover STOP | touch STOP, abort | STOP removed | removed | PASS |
| C6 | STOP works under bad stdin | touch STOP, empty stdin to hook | still aborts | exit 0, aborted | PASS |

### D. resume semantics

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| D1 | resume from paused | force cb=4,blk=2; pause; resume | active; cb→0 | active; cb 0; **blk stays 2** | PASS (note: blocker counter not reset from paused — Low) |
| D2 | resume from blocked | force blocked; resume | active; cb=0, blk=0, hash=null | as expected | PASS |
| D3 | budget-extension math | budget-limited turn=51 tok=600000; resume | max_turns=turn+100=151; max_tokens=tok+1M=1,600,000 | exact | PASS |
| D4 | resume from aborted | abort; resume | **re-opens** (treated as budget-limited; +100/+1M) | active; budget extended | PASS (behavior; document — abort is NOT terminal) |
| D5 | resume from complete | force complete; resume | refused, exit 1 | refused | PASS |

### E. Installer

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| E1 | fresh install | `install.sh` | scripts+skill copied, Stop hook registered, exit 0 | as expected | PASS |
| E2 | idempotent re-run | run twice | 1 dispatcher Stop entry; 2 backups | 1 entry; 2 `.bak.*` | PASS |
| E3 | pre-existing direct git-check hook | seed settings, install | git-check kept; dispatcher appended; warning printed | as expected | PASS |
| E4 | jq missing | restricted PATH, install | clean error, exit 1, settings untouched | "ERROR: jq is required", exit 1, no settings.json | PASS |
| E5 | config dir path with space | `CLAUDE_CONFIG_DIR=".../has space dir/.claude"` | installs, scripts work | installed; start + dispatcher work; contract delivered | PASS |

### F. Portability

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| F1 | no hardcoded `/root` | `grep -rn /root goal-mode/` | none | none | PASS |
| F2 | no hardcoded `/home` | `grep -rn /home/ goal-mode/` | none | none | PASS |
| F3 | script via relative path from unrelated cwd | `cd /tmp; bash rel/path/status.sh` | self-locates lib.sh | works | PASS |
| F4 | cwd-independent (no CLAUDE_PROJECT_DIR) | unset var, cwd in git repo | falls back to git toplevel | works | PASS |
| F5 | hook from cwd=/ | run continuation-hook from `/` | exit 2 | works | PASS |
| F6 | non-git, no env var → pwd | run in plain tmp dir | uses pwd | uses pwd | PASS |
| F7 | bogus `CLAUDE_PROJECT_DIR` (nonexistent) | set to /does/not/exist | falls back (`-d` guard) | falls back to git/pwd | PASS |
| F8 | SKILL.md honors `CLAUDE_CONFIG_DIR` | grep SKILL.md | should use config dir | **hardcodes `$HOME/.claude`; `$ARGUMENTS` unquoted** | **FAIL (Medium)** |

### G. Auditor integration

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| G1 | one real auditor run, satisfied spec | done.txt=OK; spec requires it; feed `GOAL_COMPLETE`; fire | verdict COMPLETE → goal closes | **auditor ran 75 s, exit 0, but produced EMPTY/unparseable stdout → conservative INCOMPLETE → goal stayed active** | **FAIL (High)** |
| G2 | recursion guard | `GOAL_AUDITOR_SUBPROCESS=1` + `GOAL_COMPLETE` | hook exits 0, no audit spawned | exit 0, no spawn (both hook + dispatcher) | PASS |
| G3 | root cause | `claude -p --json-schema S` direct | JSON on stdout | **empty stdout (exit 0)**; bare `claude -p` works (PONG); `--output-format json` shows `result:""` | diagnosed |
| G4 | `audit` routing (uninit) | `dispatch.sh audit` | clean error, no spawn | "STATUS=none", exit 1 | PASS |
| G5 | unparseable-output fallback | (from G1) | INCOMPLETE, gaps recorded, contract re-injected, exit 2 | as expected — **fails safe** | PASS |

### H. Robustness / bad input

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| H1 | corrupt state.json | overwrite w/ garbage; fire | exit 0 (status reads null), no wedge | exit 0; status.sh/abort.sh survive | PASS |
| H1b | abort on corrupt state | abort.sh on garbage state | — | **prints "STATUS=aborted" but does NOT persist** (jq write fails silently) | FAIL (Low) — misleading, but loop still safe (hook exits 0) |
| H2 | empty state.json | truncate; fire | exit 0 | exit 0 | PASS |
| H3 | missing state.json | dir only; fire | exit 0 (not initialized) | exit 0 | PASS |
| H4 | missing spec.md, active | rm spec; fire | contract still emitted (empty spec body), exit 2, no wedge | exit 2; spec body blank | PASS (degraded — Low) |
| H5 | malformed transcript JSON | garbage transcript; fire | ordinary re-prompt exit 2 | exit 2 | PASS |
| H6 | transcript no assistant msg | user-only transcript; fire | exit 2 | exit 2 | PASS |
| H7 | transcript_path nonexistent | `/no/such/file`; fire | exit 2; tokens=0 | exit 2; tokens 0 | PASS |
| H8 | non-JSON stdin | `"hello"` to hook | exit 2 (fields empty) | exit 2 | PASS |
| H9 | empty stdin | `printf '' \| hook` | exit 2 | exit 2 | PASS |

### I. Concurrency

| # | Check | Repro | Expected | Observed | Result |
|---|-------|-------|----------|----------|--------|
| I1 | N hooks racing on state.json | 20–30 concurrent `continuation-hook.sh` | no hard corruption | **valid JSON 5/5 trials**, but **lost updates**: turn≈4–10 of 20–30; counters diverge (turn 4 vs cb 12); history len 1 not ~21 | PASS (no corruption) / **FAIL logical (Low–Med)** — lost updates, internally inconsistent counters |

---

## 3. Failures by severity

### HIGH

**H-1. Auditor returns empty/unparseable output in this environment → goal can never auto-complete (G1, G3).**
`auditor.sh` calls `claude -p --json-schema "$schema"` and parses **default (text) stdout** with `jq -e .verdict`. On the installed `claude` 2.1.152, `claude -p --json-schema` emits **empty stdout** (exit 0); with `--output-format json` the wrapper's `result` field is `""`. So the verdict is never parsed and the auditor always falls back to the conservative `INCOMPLETE`. The system **fails safe** (it never falsely closes a goal), but it can also **never succeed via audit** — a genuinely-finished goal keeps looping until budget exhaustion. Likely the tool was built against a claude version where `--json-schema` populated text stdout.
*Minimal repro:*
```bash
claude -p --json-schema '{"type":"object","properties":{"verdict":{"type":"string"}},"required":["verdict"]}' <<< 'output verdict=COMPLETE'   # → empty stdout, exit 0
```
*Suggested fix:* use `--output-format json` and parse `.result` (then JSON-decode it), or fall back to the largest JSON object in stream output; add a self-test on install. Note: behavior is version-dependent — re-verify against the claude version users actually run.

**H-2. Completion/blocker marker missed when not the last physical line of the last assistant message (B21, B22).**
`goal_last_assistant_text` joins the last assistant message's text parts with `\n` then pipes through `tail -1`, so only the **last physical line** is scanned for `^GOAL_COMPLETE:` / `^GOAL_BLOCKED:`. A message like `"GOAL_COMPLETE: done\nThanks, let me know."` or a marker in the first of two text blocks is **silently missed**, so the goal won't complete/block. Agents commonly add a trailing sentence after the marker.
*Minimal repro:*
```bash
printf '%s\n' '{"type":"assistant","message":{"content":[{"type":"text","text":"GOAL_COMPLETE: done\nThanks!"}]}}' > t.jsonl
fire "$proj" t.jsonl   # → exit 2 ordinary (marker missed) instead of audit
```
*Suggested fix:* grep the whole last-assistant text (drop `tail -1`; e.g. take the last assistant *record's* full text and search all its lines).

### MEDIUM

**M-1. Blocker streak is not truly "consecutive turns" — intervening progress doesn't reset it (B8, B9).**
The contract/README say "The same blocker must repeat for THREE consecutive turns… If on a later turn you find a way forward, just resume — the counter resets." In code, `blocker.consecutive_count` and `last_reason_hash` are only updated when a `GOAL_BLOCKED:` line is present; an ordinary working turn in between leaves them untouched. So `blk, blk, [5 normal turns], blk` reaches `blocked`. A goal that's actually progressing can be force-blocked by a recurring-but-resolved blocker string.
*Repro:* fire `GOAL_BLOCKED: X`, then several normal messages, then `GOAL_BLOCKED: X` twice → status `blocked`.
*Suggested fix:* reset `blocker.consecutive_count`/`last_reason_hash` on any turn whose last message has no `GOAL_BLOCKED:` line. Or change the doc wording to "3 occurrences of the same blocker (not necessarily adjacent)".

**M-2. SKILL.md hardcodes `$HOME/.claude` and uses unquoted `$ARGUMENTS` (F8).**
`skills/goal/SKILL.md` runs `bash "$HOME/.claude/scripts/goal/dispatch.sh" $ARGUMENTS`. The README says you can install into a non-default `CLAUDE_CONFIG_DIR`, but the slash command would then call the wrong (or missing) path. `$ARGUMENTS` is also unquoted (relies on the slash-command layer for arg splitting/quoting).
*Repro:* install to a custom `CLAUDE_CONFIG_DIR`; the `/goal` command still targets `$HOME/.claude`.
*Suggested fix:* honor `${CLAUDE_CONFIG_DIR:-$HOME/.claude}` in SKILL.md.

### LOW

**L-1. Very large spec (≥131072 bytes) → `Argument list too long` (E2BIG), rc 126, no state written (A28).** Boundary is exactly MAX_ARG_STRLEN (131072 B) for the single spec argument passed `dispatch.sh → start.sh`. Fails safe (no partial `spec.md`/`state.json`). Unrealistic spec size; could read spec from a file/stdin instead of an argv.

**L-2. `consecutive_blocks` near-cap history note says "8-block cap" but the code threshold is 6 (B11).** Cosmetic/doc mismatch in the history note text only.

**L-3. `abort.sh` (and other writes) silently no-op on a corrupted state.json but still print success (H1b).** `goal_state_set` returns 1 when `jq` fails and the caller ignores it, so `abort.sh` prints `STATUS=aborted` without persisting. Harmless for loop safety (the hook exits 0 on corrupt state regardless), but misleading output.

**L-4. `resume` from `paused` does not reset `blocker.consecutive_count` (D1).** Only the per-batch `consecutive_blocks` is reset. A pre-existing blocker streak survives a pause/resume. Minor.

**L-5. Missing `spec.md` with an active goal yields a contract with a blank goal body (H4).** The loop continues with an empty spec rather than erroring/halting. Fails safe but degraded.

**L-6 (concurrency, borderline Low/Medium). Lost updates under concurrent hook invocations (I1).** Read-modify-write via `jq`+`mv` is not atomic across the multiple `goal_state_set` calls per invocation. Under 20–30 concurrent fires, `turn_count` badly undercounts, counters diverge, and history entries are lost. **No invalid JSON ever produced (0/5 trials)** because each `mv` swaps a fully-rendered temp file. In normal single-session use Stop hooks fire serially, so impact is limited; a parallel-session edge could miscount budget/history. A flock around state mutations would fix it.

---

## 4. README / contract vs. actual behavior

| Doc claim | Actual | Verdict |
|-----------|--------|---------|
| README/contract: blocker over "3 **consecutive** turns"; "find a way forward, just resume — the counter resets" | Counter only changes on turns that emit `GOAL_BLOCKED:`; intervening progress does not reset it (M-1) | **Discrepancy** |
| README: install into a non-default dir via `CLAUDE_CONFIG_DIR` | Installer honors it, but SKILL.md hardcodes `$HOME/.claude` (M-2) | **Discrepancy** |
| README: auditor "re-derives requirements… verifies… only a COMPLETE verdict closes the goal" | True in design; in this env the auditor's output never parses, so COMPLETE is unreachable (H-1) | **Env-dependent discrepancy** |
| History note "near 8-block cap" | Threshold is `consecutive_blocks >= 6` (L-2) | Minor doc bug |
| README: `/goal abort` "terminate the current goal" | `resume` re-opens an aborted goal (D4) — abort is not terminal | Behavior worth documenting |
| Defaults "~200 turns / ~2M tokens" | Confirmed (200 / 2000000) | Matches |
| Kill switches don't touch the working tree | Confirmed (C1, C2) | Matches |
| Budget trips and resume "+100 turns / +1M tokens" | Confirmed; trips on turn>max, resume adds to current counts (D3) | Matches |
| `start.sh` writes spec.md + state.json, status=active | Confirmed | Matches |
| Dispatcher chains git-check when goal not blocking | Confirmed by code; chained only when an executable `stop-hook-git-check.sh` sits one dir above `scripts/goal` | Matches |

---

## 5. Overall stability verdict

**Conditionally safe to ship as a fail-safe loop; NOT yet reliable at the "auto-complete" job in this environment.**

Strengths: the state machine is solid and **fails safe** in every bad-input case tested (corrupt/empty/missing state, malformed/missing transcript, non-JSON/empty stdin) — it never wedges the loop, and **both kill switches always work** (STOP is checked before any stdin-dependent logic; abort and STOP never touch the working tree). Installer is idempotent, backs up settings, handles missing `jq` and spaced paths cleanly, and there are no hardcoded machine paths in the scripts. Tricky/unicode/injection-laden specs are stored and re-injected verbatim with no shell-injection. Budget math, pause/resume, and recursion guard all behave as designed.

Blocking caveats before relying on unattended completion:
1. **H-1 (auditor):** with the installed `claude` 2.1.152, the auditor's `--json-schema` call yields empty output, so a goal **cannot auto-complete** — it will loop to budget exhaustion even when done. This is the single most important issue to resolve (and to re-test against the exact claude version end-users run).
2. **H-2 (marker parsing):** `tail -1` causes legitimate `GOAL_COMPLETE:`/`GOAL_BLOCKED:` markers to be missed whenever the model adds a trailing line — compounding H-1's completion fragility.
3. **M-1 (blocker semantics)** can prematurely declare a progressing goal `blocked`, contrary to the documented "consecutive" wording.

None of these are safety hazards (no data loss, no runaway that can't be stopped), but H-1 + H-2 together mean the headline feature — "keep working until an auditor confirms completion" — is unreliable in this environment. Fix the auditor output parsing and the `tail -1` truncation, reconcile the blocker wording, and add a `flock` around state writes, and this is solid.
