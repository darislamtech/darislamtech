# New feature / behavior change

1. **Requirements:** expected behavior, users/roles, inputs, outputs, edge cases, acceptance criteria. Ask only about gaps that change business behavior, data, money, or permissions.
2. **Find what exists** — reuse first (`core/general.md`). Identify the integration point and every module sharing the same data or rules.
3. **Design briefly:** data changes, permission model, UI placement, affected reports/exports/notifications. Medium/high risk → print the SYSTEM SCAN.
4. **Implement** on a dedicated branch in small, coherent commits. Schema changes follow `workflows/database-change.md`.
5. **Test** the main path, edge cases, and permission denial (`core/quality.md`).
6. **Document** as `project/RULES.md` requires (changelog, module docs, migration log).
7. **Open a PR** signed with your agent name and hand it to review (`workflows/code-review.md`).
