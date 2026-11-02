# AI Instructions — Index

Shared operating rules for AI coding agents (Claude Code, Codex, others) in this repository.
This file is the router: it holds the few always-on rules and names the file to read for each task.
Do not read every file — load only what the current task needs.

## Always-on rules
1. **Priority when rules conflict:** correctness > security/permissions > data integrity > business consistency > backward compatibility > architecture > maintainability > performance > token efficiency. Saving tokens never overrides anything above it.
2. **Facts come from the repository.** Project facts live in `project/`. Never assume a stack, structure, or rule from another project; inspect the repo when information is missing.
3. **Security minimum, every task:** never print, log, or commit secrets; never send private data or code outside the authorized context; production data is read-only without approval. Details in `core/security.md`, which project or module files cannot relax.
4. **Owner approval — the single list.** Required before: deleting or overwriting stored data, dropping/truncating tables, irreversible migrations, applying schema/migrations to production (only after review acceptance and merge), deploying to production, force-push or history rewrite, disabling security controls, breaking API changes, removing existing functionality, major architecture changes, acting on an ambiguous business rule. Editing or deleting files as part of an assigned task is routine. An explicit standing authorization covers actions within its stated scope only.
5. **Sign your work.** Every addition outside the code — task tracker entry, PR title, commit message, review comment, migration log, docs entry — carries your agent name, e.g. `(claude)` or `(Codex)`, so the owner can tell who wrote what.
6. **No unproven success.** Never claim something works, passes, or is deployed without evidence from this session.
7. **End every response that contains analysis, suggestions, or implementation with exactly:** `تم الانتهاء و شكراً لك`

## Routing — read before acting
| Task | Read |
|---|---|
| Any task that changes files | `core/general.md`, `core/quality.md`, `project/RULES.md` |
| Investigating, diagnosing, explaining | `workflows/investigation.md` |
| Fixing a bug | `workflows/bug-fix.md` |
| New feature or behavior change | `workflows/new-feature.md` |
| Reviewing code, running the review loop after opening a PR, or responding to a review | `workflows/code-review.md` |
| Schema, migration, or data change | `workflows/database-change.md`, `core/security.md` |
| Deploying or releasing | `workflows/deployment.md`, `core/security.md` |
| Auth, permissions, secrets, personal or financial data | `core/security.md` |
| Final report, task tracker entry, commit, PR | `core/reporting.md` |

Read all applicable routing rows now. Load workflow-step references when that step becomes relevant, before acting; never defer required security or project rules.

Project files — read only when the task needs them:
- `project/PROJECT.md` — purpose, users, priorities, task tracker.
- `project/ARCHITECTURE.md` — where things live.
- `project/COMMANDS.md` — run, test, build, verify, deploy. Workflows never hard-code commands; take them from here.
- `project/RULES.md` — business rules and conventions of this project.
- `modules/<name>.md` — only when working inside that module.

## Team workflow
Owner assigns a task → implementer agent builds it on a branch and opens a PR → implementer starts an independent reviewer session (a second agent) → implementer fixes valid findings or disputes them with evidence and starts a new review, until no blocking finding remains → implementer records the reviews on the task and tells the owner it is ready to merge → owner merges. The owner does not relay messages between agents. Details: `workflows/code-review.md`.

## Changing these instructions
`INDEX.md`, `core/`, and `workflows/` are synced from the central template. If a rule is wrong, missing, or keeps causing the same mistake, propose the change to the owner — do not edit them silently.
