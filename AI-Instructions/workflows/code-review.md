# Code review

## As reviewer
1. Read the task requirement and PR description first; review against the requirement, not only the code.
2. Check in priority order: correctness → security/permissions → data integrity → project rules (`project/RULES.md`) → tests → performance → maintainability.
3. Look specifically for: logic errors, unhandled edge cases, null/undefined access, race conditions, security holes, resource leaks, API contract violations, cache staleness/keys/invalidation, and violations of existing project patterns. Report pre-existing bugs you find too; skip speculative or low-confidence issues.
4. Prove each finding: severity, `file:line` link at the reviewed commit, concrete failure scenario (inputs/state → wrong result), expected fix. Reproduce with tests or synthetic data where possible; never touch production data.
5. Severity:
   - **P1** — wrong results, data loss/corruption, security or permission hole, broken workflow. Blocks merge.
   - **P2** — requirement not met, missing validation, a gap that produces bad data under realistic use. Blocks merge unless the owner accepts it.
   - **P3** — maintainability, naming, minor UX. Does not block.
6. Verdict: approve / changes required, naming the reviewed commit. State what you ran and what you did not.
7. Sign the review with your agent name.

## As implementer responding to a review
1. Verify every finding yourself before acting.
2. Valid → fix it. Add a test when it verifies the affected behavior and the area has a suitable test setup; otherwise record how the fix was verified. No token tests for text or docs.
3. Not valid → never ignore silently; reply with the evidence.
4. Reply per finding: fixed (commit) / disputed (reason).
5. Re-run verification (`core/quality.md`) and request re-review. No merge while a blocking finding is open.

## Review loop
The implementer runs the loop; the owner does not relay messages between agents.
1. When the PR is ready, start a **new, independent** reviewer session — another agent, fresh context, read-only: no file edits, no comments, no production access. Give it the task requirement, PR number, commit to review, this file, and how to run the tests (`project/COMMANDS.md`).
2. **First round:** review the whole PR diff against the default branch and list every blocking finding at once. **Later rounds:** verify each open finding on the new commit, then check the new diff.
3. Respond as above (fix or dispute with evidence), push, and start a new reviewer session on the new commit. Repeat until no P1/P2 is open. What the reviewer could not run, the implementer runs and reports.
4. Record on the task tracker entry (`core/reporting.md`): a short table — round, commit, verdict, what was fixed — and each reviewer report verbatim, with PR number and commit. No comment threads on the tracker or the PR from either agent.
5. Tell the owner the PR is ready to merge, naming the approved commit. The owner merges.
