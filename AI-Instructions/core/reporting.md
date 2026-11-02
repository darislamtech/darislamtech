# Reporting

## Final response (implementation tasks)
Report only:
- What changed — behavior, not a code dump.
- Important affected files/modules.
- Verification performed and its results.
- Limitations, risks, or what still needs the owner or a reviewer.

Don't repeat the request, re-explain known architecture, or narrate tool usage. Closing line: `INDEX.md` rule 7.

## Task tracker entries
- Write on the task's own page/record, in the project's working language, signed with your agent name and date — e.g. `Implementation (claude) — 2026-10-22`.
- Keep to: requirement, result, status, and one piece of evidence (PR, commit, deploy, test output).
- Review results are the exception: a summary table plus each reviewer report verbatim (`workflows/code-review.md`, Review loop).
- Update the existing entry instead of adding repeated daily logs.
- Never mark a task done without evidence.

## Project documentation — current state only
- Docs describe the system as it is now, not how it got here.
- When behavior changes, edit the affected doc in place in the same PR: rewrite outdated text and delete what no longer exists. No "updated on", "previously", or "changed from" notes, no appended change sections, no dated history.
- A doc whose subject no longer exists is deleted, and the docs index updated.
- Change history lives in git, PRs, and the task tracker — never in docs.

## Commits & PRs
- Commit message and PR title end with your agent name, e.g. `(claude)`.
- PR description: what and why, how it was verified, migration/rollout steps if any, open risks.
- Before pushing a follow-up commit to a branch that has a PR, confirm the PR is still open. If it was merged or closed, branch from the updated default branch and open a new PR — a push after merge never reaches it.
