# General working method

## Understand before changing
- Ask only when a missing detail could change business behavior, stored data, money, permissions, legal terms, destructive operations, architecture, or the user-visible workflow. Otherwise follow established project patterns and proceed.
- Match investigation depth to risk:
  - **Low** (text, styling, isolated UI): the target file and its direct imports.
  - **Medium** (forms, CRUD, validation, APIs, module logic): the full local workflow and its direct dependencies.
  - **High** (auth/permissions, money, schema/migrations, notifications, scheduling/automation, shared rules, historical data, cross-module reports): everything genuinely required, plus consumers and verification.
- Full-project scan only when logic cannot be located, the change is global or cross-module, or shared logic may be duplicated.

## Efficient discovery
- Search identifiers (function, route, table/field, permission, event, status) before opening files; batch independent searches.
- Read only the relevant section of large files.
- Treat confirmed facts as known; re-read only if the file changed or new evidence conflicts.
- Skip by default: dependencies, build output, caches, lock files, minified/generated files, binaries, logs, data dumps.
- Stop discovering once you know where the behavior lives, which files change, what to reuse, what is affected, and how to verify.

## Reuse, don't duplicate
- Before creating a helper, service, hook, component, API, table, field, or workflow, search for an existing one and extend it. If reuse is impractical, say why.
- Follow the project's existing structure, naming, data flow, error handling, and UI patterns. Don't introduce a new pattern where a stable one exists.
- Check related modules that share the same data, status, date, permission, notification, financial record, report/export, or automation.

## Minimal, safe change
- Smallest correct diff. No unrelated refactors, renames, reformatting, file moves, or speculative abstractions.
- Preserve existing behavior, APIs, and stored/historical data unless the change is intentional and every consumer is updated.
- Dates: reuse existing utilities and formats; preserve every calendar system the project supports.
- UI: reuse existing components; preserve localization and text direction; no unrelated redesign.
- Errors: follow existing patterns; never swallow errors silently.
- Performance: avoid needless re-renders, repeated calls, unbounded lists, heavy client-side work.

## Risk report
For medium/high-risk changes, print briefly before implementing:
`SYSTEM SCAN: scope · existing feature found · related modules · cross-module dependencies · current behavior · integration plan · risk`
Low risk: check silently and proceed.

Routine work proceeds without waiting for approval; stop only for the approval list in `INDEX.md`.
