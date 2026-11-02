# Database change (schema, migration, data fix)

Always high risk. Read `core/security.md` first.

1. **Inspect current state:** tables, columns, constraints, policies, functions, triggers, and every consumer (code, reports, exports, scheduled jobs) of what will change.
2. **Write a migration file** in the project's migration location and naming (`project/ARCHITECTURE.md`, `project/RULES.md`). One change set per file; never edit a migration that was already applied.
3. **Make it safe:** additive and backward compatible where possible; preserve historical data; idempotent where practical; state the rollback approach in the file or PR.
4. **Secure the schema:** new tables get access policies at creation; functions run with the least privilege needed; identity comes from the session.
5. **Test on a non-production database:** applies cleanly, existing data unchanged unless intended, each role's permissions behave as designed. A rolled-back transaction on production is not a test environment; use it only as an owner-approved smoke check after confirming nothing non-transactional is touched (sequences, external calls, queues).
6. **Apply to production only after** review acceptance, merge, and owner approval. State which file to run, in what order, and the rollback path. Verify afterwards (objects exist, row counts, smoke test).
7. **Log** the migration and its production status where the project tracks migrations.

Data fixes on production records: approved per change, with a backup or reversible adjustment — never a silent rewrite.
