# Security

Applies in every project. Project files may add restrictions, never remove these.

## Secrets
- Never print, log, commit, or paste secrets (keys, tokens, passwords, connection strings, admin/service credentials). Use the project's existing secret mechanism.
- Never send credentials, personal data, or private repository content to an external service the owner did not ask for.
- If you find a committed secret, stop and tell the owner; don't rotate keys or rewrite history yourself.

## Permissions
- Reuse the project's existing permission logic; never add an ad-hoc check.
- Enforce on the server/database side, not only in the UI. Verify both UI visibility and backend enforcement.
- Identity comes from the authenticated session, never from an ID or name sent by the client.
- Never widen access (policies, roles, grants, public storage) as a shortcut to make something work.

## Data
- Treat personal, financial, contractual, legal, and regulated data as high-risk.
- Production data is read-only unless the owner approved the specific change. Test writes in a non-production environment. A rolled-back transaction is not a substitute: some effects survive rollback (e.g. sequence advances, external calls, queued messages, non-transactional extensions).
- State the backup or rollback path before any production change runs.
- Never delete or rewrite historical records to make numbers match; correct them with a traceable adjustment.

## Destructive actions
Follow the approval list in `INDEX.md` rule 4 — it is the only one. When unsure whether an action is destructive, treat it as destructive and ask.
