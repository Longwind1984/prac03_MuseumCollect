# Live `claude -p` auditor — end-to-end evidence

**Date:** 2026-05-29
**Branch:** `claude/code-goal-mode-CIFfq`
**Auditor invocation under test:** `goal-mode/scripts/goal/auditor.sh` at commit `6dc313f`

This file records the two unverified items from the second-round audit's §17.4
(plan file): the live `claude -p` auditor was previously only verified with a
stub. Both items below are now verified end-to-end against the real
auditor against real Claude.

## Method

Two throwaway projects under `/tmp/`, each with a tiny one-requirement
`spec.md` driving `auditor.sh`. The auditor runs `claude -p` as a clean-context
subprocess with the read-only tool set (`Read`, `Grep`, `Glob`, plus
`Bash(ls *|cat *|head *|tail *|wc *)` and read-only git).

For each test we capture the audit log (the JSON the verdict-parser sees) and
the resolved verdict + gaps. No code change is involved — only the auditor
script is exercised.

## Test A — spec satisfied → expect `COMPLETE`

Spec (`spec.md`):

```
Create a file named hello.txt at the project root containing the exact single line:
Hello, goal mode!

Done means:
- hello.txt exists at the project root.
- 'cat hello.txt' outputs exactly that single line.
```

Working tree satisfies the spec: `printf 'Hello, goal mode!\n' > hello.txt`.

Auditor output (`/tmp/goal-live-A.*/...audit log`):

```json
{
  "verdict": "COMPLETE",
  "requirements": [
    {"spec": "hello.txt exists at the project root",
     "expected_artifact": "File at /tmp/goal-live-A.exVL/hello.txt",
     "verification_run": "ls /tmp/goal-live-A.exVL/hello.txt",
     "evidence": "File exists at the specified path",
     "status": "MET"},
    {"spec": "'cat hello.txt' outputs exactly 'Hello, goal mode!' as a single line",
     "expected_artifact": "File content is exactly 'Hello, goal mode!' with a single line",
     "verification_run": "cat /tmp/goal-live-A.exVL/hello.txt and wc -l",
     "evidence": "cat output is 'Hello, goal mode!' and wc -l reports 1 line",
     "status": "MET"}
  ],
  "gaps_for_main_agent": ""
}
```

| Field | Value |
| --- | --- |
| exit code | `0` |
| wall-clock | 14s |
| verdict | `COMPLETE` |
| both requirements | `MET` (independently verified) |

## Test B — spec violated → expect `INCOMPLETE`

Same spec. Working tree violates the spec:

```
$ cat hello.txt
Hello, world!
This is some extra stuff.
```

Auditor output:

```json
{
  "verdict": "INCOMPLETE",
  "requirements": [
    {"spec": "hello.txt exists at the project root",
     "expected_artifact": "/tmp/goal-live-B.T303/hello.txt",
     "verification_run": "ls /tmp/goal-live-B.T303/",
     "evidence": "hello.txt is present in the project root directory listing",
     "status": "MET"},
    {"spec": "'cat hello.txt' outputs exactly the single line: Hello, goal mode!",
     "expected_artifact": "File content exactly equals 'Hello, goal mode!\\n' with no other lines",
     "verification_run": "cat /tmp/goal-live-B.T303/hello.txt and wc -l",
     "evidence": "File content is 'Hello, world!\\nThis is some extra stuff.\\n' (2 lines). Neither the text nor the line count matches the spec. Expected exactly 'Hello, goal mode!' but got 'Hello, world!' followed by extra content.",
     "status": "NOT_MET"}
  ],
  "gaps_for_main_agent": "hello.txt exists but contains wrong content. Current content is 'Hello, world!\nThis is some extra stuff.\n' (2 lines). It must be replaced with exactly the single line 'Hello, goal mode!' with no additional lines or content."
}
```

| Field | Value |
| --- | --- |
| exit code | `1` |
| wall-clock | 19s |
| verdict | `INCOMPLETE` |
| existence req | `MET` |
| content req | `NOT_MET` (concrete byte-level evidence) |
| gaps | actionable for the main agent |

## What this verifies

| Concern | Status |
| --- | --- |
| `claude -p --output-format json` actually returns a parseable envelope | confirmed |
| `.result` extraction path produces the model's raw response | confirmed (both cases) |
| Inner JSON parses against the verdict schema | confirmed |
| `verdict` arrives as exactly `COMPLETE` or `INCOMPLETE` (no enum drift) | confirmed |
| Read-only tool restrictions survive real invocation (auditor used `cat`/`wc -l` for content checks) | confirmed |
| Exit-code contract (0 = COMPLETE, 1 = INCOMPLETE) matches docs/state-machine assumption | confirmed |
| Per-requirement decomposition + `MET`/`NOT_MET` works | confirmed |
| `gaps_for_main_agent` is empty on COMPLETE, actionable on INCOMPLETE | confirmed |
| Wall-clock comfortably within the 360s default `GOAL_AUDIT_TIMEOUT` | 14s / 19s ≪ 360s |

## Not covered by this evidence

- The auditor's behavior against an **ambiguous** spec (the "interpret literally /
  treat the more demanding reading as the target" bias). Both test specs are
  unambiguous.
- The reaction to a maliciously-crafted spec or repo file trying to inject a
  fake verdict — the parse path is hardened against that at the script level
  (enum check + canonical re-serialization), but the real auditor wasn't
  attack-tested.
- The §12.1 / §12.2 failure-mode tests (premature completion / degraded
  acceptance) — those probe the *main agent*'s behavior under the contract,
  not the auditor, and remain unverified.
