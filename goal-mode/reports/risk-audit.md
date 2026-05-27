# Risk Audit — `/goal` mode (branch `claude/code-goal-mode-CIFfq`)

**Auditor:** skeptical security/reliability cold-read
**Scope:** `goal-mode/scripts/goal/*.sh`, `install.sh`, `skills/goal/SKILL.md`, `README.md`
**Method:** full source read + isolated read-only experiments in `mktemp -d` sandboxes (no real state touched, no `install.sh` run against real config, no git).

## Summary of findings by severity

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High     | 4 |
| Medium   | 6 |
| Low      | 4 |

The single most serious issue is a **jq filter-string injection via the auditor verdict** (`scripts/goal/continuation-hook.sh:92`), which lets attacker-influenced content silently flip the goal to `complete` (or corrupt state) — co-equal with the **auditor's non-read-only tool whitelist** (`scripts/goal/auditor.sh:62`) that grants arbitrary code execution against the real working tree.

---

## Risk register

### CRITICAL

---

**C1 — jq filter-string injection via auditor verdict flips/corrupts goal state**
**Severity:** Critical
**Location:** `scripts/goal/continuation-hook.sh:92` (also `:104` via `last_gaps`; same class at `:120`, `lib.sh:78`)
**Description:** `goal_state_set` (`lib.sh:27`) runs `jq "$jq_expr" "$path"` where `$jq_expr` is built by **string interpolation of untrusted values into the jq program**, not via `--arg`. At line 92:
```sh
goal_state_set ".audits.last_verdict = \"$verdict\""
```
`$verdict` comes from `jq -r '.verdict'` on the auditor's output (line 90). The auditor is a `claude -p` subprocess whose output is shaped by repo/file contents it reads, so `verdict` is attacker-influenceable. A value such as `INCOMPLETE" | .status = "complete` is **valid JSON** (passes the `jq -e '.verdict'` gate in `auditor.sh:79`), is extracted raw by `jq -r`, and when interpolated produces the program:
```
.audits.last_verdict = "INCOMPLETE" | .status = "complete"
```
**Confirmed in sandbox:** this rewrote `.status` to `complete`.
**Trigger/exploit:** A spec, README, test name, or any file the clean-context auditor reads contains a prompt-injection that coaxes the auditor to emit a `verdict` string carrying a `"` plus a jq pipe expression. On the next `GOAL_COMPLETE`, the loop silently terminates (status `complete`) regardless of the true verdict — or any other field can be overwritten/deleted (e.g. zero the budget, blank the spec_sha, drop history).
**Impact:** Integrity/availability: a goal can be force-completed (work abandoned as "done"), state corrupted, or budgets/guards neutralized — all without the user's knowledge. This is the keystone finding because the auditor is precisely the trust anchor of the whole design.
**Remediation:** Never interpolate values into jq programs. Make `goal_state_set` take `--arg`/`--argjson` bindings, e.g.:
```sh
goal_state_set() { local expr="$1"; shift; jq "$@" "$expr" "$path" ...; }
# caller:
goal_state_set '.audits.last_verdict = $v' --arg v "$verdict"
```
Apply to every `goal_state_set` call that embeds a variable (`:91,92,104,119,120`, `lib.sh:78`, `audit-now.sh:33-35`, `resume.sh:52-53`). Additionally, hard-validate `verdict` against the literal set `{COMPLETE,INCOMPLETE}` before use, and reject auditor output whose `.verdict` is not exactly one of those.

---

**C2 — "read-only" auditor whitelist permits arbitrary code execution & destructive commands on the real tree**
**Severity:** Critical
**Location:** `scripts/goal/auditor.sh:62`
**Description:** The auditor is documented as "constrained to read-only tools," but `--allowedTools` includes `Bash(git *)`, `Bash(npm test*)`, `Bash(npx *)`, `Bash(node *)`, `Bash(python3 *)`, `Bash(pytest *)`, `Bash(find *)`. None of these are read-only:
- `Bash(node *)` / `Bash(python3 *)` → `node -e '...'` / `python3 -c 'os.system(...)'` = arbitrary code execution.
- `Bash(npx *)` → downloads and runs any npm package.
- `Bash(npm test*)` / `Bash(pytest *)` → execute repo-defined scripts / `conftest.py` = arbitrary code.
- `Bash(git *)` → `git push`, `git reset --hard`, `git clean -fd`, `git checkout -- .` = history/working-tree mutation.
- `Bash(find *)` → `find . -delete` / `-exec rm`.
The auditor runs `cd "$project_dir"` (line 55) — i.e., in the **real** working tree, with `--max-budget-usd 1.50` and `timeout 360` (those two are good, and they cap spend/time).
**Trigger/exploit:** The auditor reads attacker-influenced repo content (the spec, test files, READMEs) as part of its job. A prompt-injection there can induce the auditor model to run destructive or exfiltrating Bash against the user's tree, entirely outside the user's visibility (it's a subprocess).
**Impact:** Data loss / code execution / exfiltration on the user's real repository, triggered automatically every time a `GOAL_COMPLETE` is claimed.
**Remediation:** Restrict the auditor to genuinely read-only tools (`Read`, `Grep`, `Glob`, and at most `Bash(git status*)`, `Bash(git log*)`, `Bash(git diff*)`, `Bash(ls *)`, `Bash(cat *)`). For test verification, either run tests in a disposable sandbox/container, or run with `--permission-mode` denying writes, or drop automated test execution from the auditor and have it inspect artifacts only. Never grant `node`/`npx`/`python3`/`pytest`/`find`/`git <mutating>` to an "independent" subprocess pointed at the live tree.

---

### HIGH

---

**H1 — Budget is enforced AFTER the expensive turn; exhaustion still spends at least one more turn**
**Severity:** High
**Location:** `scripts/goal/continuation-hook.sh:46-77`
**Description:** Stop hooks fire *after* a model turn completes. The hook increments `turn_count` (line 46) then checks `turn > max_turns` (58) / `tokens > max_tokens` (68). So the budget is a *post-hoc* check, and on exhaustion the hook **exits 2** (lines 66, 76) which **re-prompts the model for a summary turn** — i.e., tripping the budget costs an additional billable turn. There is also an off-by-one: with `max_turns=200`, work proceeds through turn 200 and the trip happens when the counter reaches 201.
**Trigger/exploit:** Any goal that never self-completes runs to the full budget plus a summary turn. Defaults are large (200 turns / 2,000,000 estimated tokens).
**Impact:** Cost overrun; the "budget" does not bound spend tightly and never prevents the expensive turn — it only reacts after it.
**Remediation:** Document clearly that the budget is a post-turn ceiling, not a pre-spend guard. Consider checking the budget *before* deciding to re-prompt (i.e., on the turn that *would* exceed, exit 0 to stop rather than exit 2 to force another turn), and tighten/lower defaults. If a summary is desired, gate it behind a separate, single, explicitly-bounded step.

---

**H2 — Primary autonomous bound depends on `stop_hook_active`; if the harness leaves it false the only backstop is the large turn/token budget**
**Severity:** High
**Location:** `scripts/goal/continuation-hook.sh:40-44` (and the increment-only counter at `:106,136`)
**Description:** The "near-cap" auto-yield (reset + `exit 0`) only fires when `stop_hook_active == "true"` **and** `consecutive_blocks >= 6`. `consecutive_blocks` increments every non-terminal turn (lines 106, 136). If the harness does not set `stop_hook_active=true` during hook-driven re-prompts (or sets it inconsistently), the yield **never triggers** and the loop runs unbounded except for the 200-turn / 2M-token budget. **Confirmed in sandbox:** with `stop_hook_active=false`, the counter climbs past 6/8 with no yield.
**Trigger/exploit:** A goal Claude cannot finish and does not emit a stable `GOAL_BLOCKED` for → loops up to full budget with no periodic "breather" returning control to the user.
**Impact:** Long unattended runs; user may not get a natural pause point to intervene; combined with H1, meaningful cost.
**Remediation:** Do not rely solely on `stop_hook_active` for the breather. Add an unconditional periodic yield (e.g., every N turns, exit 0 with a "still working, /goal resume to continue" message) so control returns to the user regardless of the `stop_hook_active` flag. Treat unknown/empty `stop_hook_active` as "true" for the purpose of the cap.

---

**H3 — Auditor verdict parsing has a schema-bypassing fallback (grep), widening C1 and weakening the trust gate**
**Severity:** High
**Location:** `scripts/goal/auditor.sh:70-87`
**Description:** When the direct parse fails, the code falls back to `grep -oE '\{[^{}]*"verdict"[^{}]*\}'` / an `awk` brace-span, then accepts any object with a `.verdict`. This bypasses the `--json-schema` enum constraint (`COMPLETE`/`INCOMPLETE`), so a `verdict` value can be **arbitrary text** — exactly the precondition C1 needs. It also means a stray JSON-looking blob anywhere in the model's prose (or in a file it printed) can be picked up as "the verdict."
**Trigger/exploit:** Auditor emits prose plus a crafted `{"verdict":"INCOMPLETE\" | .status = \"complete"}`; the grep extracts it; downstream C1 fires. Or benign-but-wrong: a printed example JSON is mistaken for the verdict.
**Impact:** Defeats the schema guard; primary enabler for C1; can yield false COMPLETE/INCOMPLETE.
**Remediation:** Require strict JSON: parse only the subprocess's structured output, reject anything where `.verdict` is not exactly `COMPLETE`/`INCOMPLETE`, and drop the grep/awk salvage path (or, if kept, re-validate the extracted object against the full schema and the enum before trusting it).

---

**H4 — Auditor logs + state + contract capture repository contents / test output (potential secret disclosure)**
**Severity:** High
**Location:** `scripts/goal/continuation-hook.sh:84-85,103-105,107`; `scripts/goal/audit-now.sh:24,90-92`; `auditor.sh:90`
**Description:** Audit output is written verbatim to `<project>/.claude/goal/audits/turn-N.json` / `manual-*.json` via `auditor.sh ... > "$audit_log" 2>&1`. That captures the auditor model's full stdout+stderr: file contents it `cat`/`Read`, **test/build output** (which can print env vars, tokens, connection strings), and on parse failure the first 800 chars are additionally embedded into `state.json` (`audits.last_gaps`), `history`, and **re-injected into the main agent's contract** (line 107). Files are created with the default umask (commonly `644`, world-readable). **Confirmed in sandbox:** `spec.md`/`state.json` land at `-rw-r--r--`.
**Trigger/exploit:** A test that echoes a secret, or a repo file containing credentials, flows into world-readable `audits/*.json` and `state.json` and is reflected back into the conversation.
**Impact:** Secret/source disclosure to other local users and to anything that reads `.claude/goal/`; secrets may also be committed if `.claude/goal/` isn't gitignored.
**Remediation:** Create the `goal` dir and all artifacts with `umask 077` (or explicit `chmod 600`). Do not embed raw auditor stdout into state/history/contract — store only the structured fields. Add `.claude/goal/` to a recommended `.gitignore`. Consider redaction of audit logs and not persisting full transcripts.

---

### MEDIUM

---

**M1 — `goal_state_set` uses `mktemp` + `mv` across filesystems: non-atomic and clobbers state.json permissions/ownership**
**Severity:** Medium
**Location:** `scripts/goal/lib.sh:31-33`
**Description:** `tmp=$(mktemp)` creates the temp file in `$TMPDIR` (often `/tmp`, a different filesystem than the project). `mv "$tmp" "$path"` across filesystems is a copy+unlink — **not atomic** (a crash mid-move can truncate/lose state.json) — and it **replaces the destination's mode/owner** with the temp file's `600`. **Confirmed in sandbox:** a `640` state.json became `600` after a state_set. Conversely, on a different umask the new file may be more permissive than intended.
**Impact:** Possible state loss under crash/disk-full; silent permission drift on state.json.
**Remediation:** Create the temp file in the same directory as the target (`tmp=$(mktemp "$(dirname "$path")/.state.XXXXXX")`) so `mv` is atomic, and preserve mode (`chmod --reference="$path" "$tmp"` before move, or set umask 077 and accept 600). Handle `mktemp`/write failure explicitly.

---

**M2 — `goal_state_set` failures are silently swallowed across the hook, risking inconsistent state**
**Severity:** Medium
**Location:** `scripts/goal/continuation-hook.sh:46,52,91,92,106,...`; `lib.sh:27-38`
**Description:** `set -e` is **not** in effect (only `set -uo pipefail`), and most `goal_state_set` calls ignore the return value. If `jq` is missing/broken or disk is full, `turn_count`, `tokens_estimated`, status transitions, blocker counters, etc. silently fail to persist while the hook proceeds (and still `exit 2` to re-prompt). The increment at line 46 can no-op, making the turn budget never advance.
**Trigger:** `jq` broken/absent, disk full, read-only FS, corrupt state.json.
**Impact:** Loop can keep re-prompting with a frozen `turn_count` (budget never trips) → effectively unbounded turns until the user intervenes; counters/guards become unreliable.
**Remediation:** Check `goal_state_set` return codes for the load-bearing transitions (turn increment, status changes). On persistent failure, fail safe by exiting 0 (stop the loop) and surfacing a clear error rather than re-prompting blindly.

---

**M3 — Kill switches degrade silently when `jq` is broken or `state.json` is corrupt (loop still halts, but state is left misleading)**
**Severity:** Medium
**Location:** `scripts/goal/abort.sh:24`; `continuation-hook.sh:26-31`; `lib.sh:27-30,20-25`
**Description:** Good news first: with broken `jq` or corrupt state, `goal_status` returns `null`, so the continuation hook hits line 34 (`status != active`) and `exit 0` — the loop **does** stop (confirmed in sandbox). The STOP-file branch also `rm`s the STOP file regardless. However, `abort.sh` calls `goal_state_set '.status="aborted"'` without checking the result; if `jq` is broken it returns 1, the file is **not** updated, yet abort prints `STATUS=aborted`. The user is told it's aborted while `state.json` still literally says `active`. The loop is inert only because the *reader* also fails — a fragile coincidence, not a guarantee.
**Impact:** Misleading status; if `jq` is later repaired with a stale `active` state, the loop could resume unexpectedly. The STOP-file emergency stop similarly leaves `status:"active"` in the file when `jq` is broken (it relies on the rm + the reader failing).
**Remediation:** Make abort/STOP robust independent of jq: e.g., a sentinel file (`ABORTED`) that the hook checks with a plain `[[ -f ]]` before any jq, and treat its presence as authoritative stop. Verify `goal_state_set` succeeded in abort and warn loudly if not.

---

**M4 — `goal_render_contract` assumes valid numeric state; emits `null`s but still re-prompts on corrupt state**
**Severity:** Medium
**Location:** `scripts/goal/lib.sh:107-111,120`
**Description:** The contract header pulls `turn`, `max_turns`, `tokens`, `max_tokens`, `blocker` via bare `jq -r` with no validation. On corrupt/partial state these become `null`, producing a nonsensical header (`turn null/null … blocker null/3`) while the hook still `exit 2`. Combined with M2, the loop can run with meaningless budget display and no working cap.
**Impact:** Operator confusion; masks a broken/uncapped loop.
**Remediation:** Default these to safe numerics and, if they cannot be read, treat as a fatal state error → stop the loop rather than re-prompt.

---

**M5 — `install.sh` writes to filesystem root if `HOME` and `CLAUDE_CONFIG_DIR` are both unset**
**Severity:** Medium
**Location:** `install.sh:11` (`CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"`)
**Description:** With both unset, `CLAUDE_DIR` resolves to `/.claude` (confirmed). Subsequent `mkdir -p "$CLAUDE_DIR/scripts/goal"`, `cp`, and the `settings.json` rewrite then target the filesystem root. On systems where the user can write `/`, this scatters files at root; otherwise it fails partway (after possibly writing some files), leaving a half-install.
**Impact:** Misplaced global files / partial install; minor pollution.
**Remediation:** Require `HOME` (or `CLAUDE_CONFIG_DIR`) to be set and non-empty; abort with a clear error if `CLAUDE_DIR` resolves to `/.claude` or any path whose parent is `/`.

---

**M6 — Project-dir resolution can disagree across shells, so the documented STOP path may not match the path the hook checks**
**Severity:** Medium
**Location:** `scripts/goal/lib.sh:6-12`; surfaced in contract `lib.sh:169`, README, status
**Description:** `goal_project_dir` prefers `$CLAUDE_PROJECT_DIR`, else `git rev-parse --show-toplevel`, else `pwd`. The contract prints `touch <project_dir>/.claude/goal/STOP` using the hook's resolution. A user following that instruction from a *different* shell where `CLAUDE_PROJECT_DIR` is unset and the cwd is not inside the same git repo will compute a different `project_dir`, so their `touch` lands in the wrong place and the emergency stop silently fails to be seen.
**Impact:** Emergency kill switch can miss in non-git or multi-dir setups — exactly when it's needed most.
**Remediation:** Print the fully-resolved absolute STOP path (already mostly done) AND have the hook also check a stable, env-independent location (e.g., resolved once at `/goal start` and recorded in `state.json`, then read back) so the path is fixed for the goal's lifetime regardless of the invoking shell's cwd/env.

---

### LOW

---

**L1 — `2> >(cat)` async stderr capture in the dispatcher is race-prone**
**Severity:** Low
**Location:** `scripts/goal/dispatcher.sh:20-21`
**Description:** `goal_stderr=$(... continuation-hook.sh 2> >(cat) >/dev/null)` captures the contract by redirecting the hook's stderr into an asynchronous `>(cat)` whose output is what `$(...)` collects. The exit code captured into `goal_exit` is correctly the hook's (verified). However, process substitution is asynchronous: bash does not guarantee the `cat` has flushed before `$(...)` is reaped, so under load or with very large contracts the captured contract can be truncated. **Not reproduced** in 40 stress iterations with a 500-line contract, but the construct is known-fragile and timing-dependent.
**Impact:** Rare truncated/garbled re-prompt contract.
**Remediation:** Use a deterministic capture: `goal_stderr=$("$GOAL_HOME/continuation-hook.sh" 2>&1 >/dev/null <<<"$input"); goal_exit=$?` (swap fds) or capture to a temp file and read it back after the command returns. Avoid `>(...)` for must-not-lose data.

---

**L2 — `goal_estimate_tokens` is a crude `chars/4` heuristic over the whole transcript file**
**Severity:** Low
**Location:** `scripts/goal/lib.sh:96-101`; used at `continuation-hook.sh:51,68`
**Description:** Token estimate = `wc -c / 4` of the transcript path. It conflates JSON overhead, tool output, and prior turns; it is monotonic in file size and can over- or under-count real model tokens substantially. No overflow risk in bash 64-bit arithmetic for realistic sizes, but the figure is not a reliable cost proxy. If the transcript is missing it silently uses 0, disabling the token cap for that turn (line 53).
**Impact:** Token budget is approximate; can over-run or under-run the intended token ceiling.
**Remediation:** Use the harness's real token accounting if exposed; otherwise document the estimate as rough and keep the turn budget as the primary bound.

---

**L3 — Recursion guard relies solely on an inherited env var; defense-in-depth is thin**
**Severity:** Low
**Location:** `scripts/goal/auditor.sh:58`; `continuation-hook.sh:14-16`; `dispatcher.sh:13-15`
**Description:** The guard is `GOAL_AUDITOR_SUBPROCESS=1` exported into the `claude -p` call; the dispatcher/continuation-hook short-circuit when they see it. This works as long as `claude -p` inherits and re-exports the env var to its own Stop hooks. If the harness scrubs/doesn't propagate env to nested hooks, the auditor's `claude -p` could itself fire the dispatcher and re-enter. The auditor does `cd "$project_dir"` (which has `.claude/goal/`), so the directory gate would not stop re-entry — only the env var does. The auditor's `--max-budget-usd 1.50` + `timeout 360` would cap a runaway, which mitigates impact.
**Impact:** If env propagation ever changes, risk of nested auditor loops (bounded by the auditor's own budget/timeout).
**Remediation:** Add a second, independent guard: e.g., a lock/marker file under `.claude/goal/` written before spawning the auditor and checked by the hook, or pass `--disallowedTools`/a flag that prevents the auditor from triggering Stop continuation. Keep `--max-budget-usd`/`timeout` as the backstop (good that they exist).

---

**L4 — A spec or echoed text starting with `GOAL_COMPLETE:`/`GOAL_BLOCKED:` can trigger the completion/blocker path**
**Severity:** Low
**Location:** `scripts/goal/continuation-hook.sh:81,111`; `lib.sh:83-94`
**Description:** Detection is `grep -qE '^GOAL_COMPLETE:'` against the last assistant message. If a spec contains such a line and the model quotes it verbatim at the start of an output line, it triggers a (real) audit/blocker count. Anchoring at `^` correctly excludes indented occurrences (verified), and the contract text lives on stderr (not an assistant message) so it does not self-trigger. Because an actual audit still gates completion (modulo C1/H3), impact is limited to spurious audit runs / blocker increments.
**Impact:** Wasted audit runs or premature blocker counting from echoed sentinels.
**Remediation:** Use a less collidable sentinel (e.g., a rare token or require it to be the sole content of the final message), or strip/escape spec-derived echoes before matching.

---

## Cleared / non-findings (checked, not vulnerable)

- **Spec/transcript shell injection:** spec text and the last assistant message reach the contract (`lib.sh` here-doc) and the auditor prompt (`auditor.sh` here-doc + `<<<` here-string) **as data only** — no `eval`, no command substitution operates on them. The injection vector is jq-side (C1), not shell-side. (Verified.)
- **`install.sh` settings.json edit atomicity:** uses `jq … > "$tmp"; if ok then mv else rm+exit`, with a timestamped backup first, and an idempotent "already registered?" guard. The edit is temp+mv and preserves the file on jq failure. (Good; only caveat is M5's HOME-unset path.)
- **`cp "$SRC"/scripts/goal/*.sh` with spaces in `$SRC`:** the quoted prefix + glob expands correctly (each match is a single word). (Verified — not a quoting bug.)
- **Auditor `set -u` + `audit_status`:** line 65 `audit_status=${audit_status:-0}` assigns unconditionally, so the later bare `$audit_status` (line 91) is safe. (Verified — not a bug.)
- **Abort/STOP never touch the working tree:** abort/pause/resume/STOP only edit `.claude/goal/state.json` and remove the STOP file; no `rm`/`mv`/`checkout`/`reset` against user files. (Confirmed by reading all command scripts.) The destructive-command risk is C2 (auditor), not the kill switches.
- **Directory scoping:** `continuation-hook.sh:23` gates on `.claude/goal/` existence, so projects without a goal are unaffected. (Good isolation.)
- **`mktemp` perms for state temp files:** `600` by default (good), though M1 notes the cross-fs move and mode-clobber.

---

## Verdict: Safe to wire into a real session?

### NO-GO (as currently written).

The design is thoughtful (independent auditor, reality-check contract, kill switches, budget/blocker guards, atomic-ish install with backup, recursion guard, auditor budget+timeout). But two **Critical** issues make it unsafe to point at a real project:

1. **C2** gives an automatically-spawned subprocess `node`/`npx`/`python3`/`pytest`/`find`/`git` against the **live working tree** under the banner "read-only" — that is arbitrary code execution / data loss waiting to happen, triggered on every completion claim.
2. **C1** lets attacker-influenced auditor output inject into a jq program and silently flip the goal to `complete` or corrupt state — defeating the very trust anchor the system is built on (compounded by H3's schema-bypass).

Either one alone is disqualifying for a tool that runs unattended and shells out against the user's repo.

### Conditions to reach GO

Mandatory before wiring into a real session:
- **Fix C1:** convert all `goal_state_set` (and `goal_history_append`) interpolations to `jq --arg/--argjson`; strictly validate `verdict` against `{COMPLETE,INCOMPLETE}`.
- **Fix C2:** restrict the auditor to genuinely read-only tools; run any test execution in a disposable sandbox or with write-denied permissions; never grant code-exec/mutating Bash to a subprocess pointed at the live tree.
- **Fix H3:** drop/strictly re-validate the grep verdict-salvage path.
- **Address H1/H2:** make the budget a pre-spend ceiling (don't force an extra turn on exhaustion) and add an unconditional periodic yield that does not depend on `stop_hook_active`.
- **Address H4:** create all `.claude/goal/` artifacts with `umask 077`; stop persisting raw auditor stdout into state/history/contract; recommend gitignoring `.claude/goal/`.

Strongly recommended: M1 (same-dir atomic temp), M3 (jq-independent abort/STOP sentinel), M5 (guard HOME-unset), M6 (fixed STOP path recorded at start).

With the two Criticals and the four Highs remediated and re-tested, this could move to **GO with conditions** (read-only-sandboxed auditor, conservative default budgets, gitignored state).
