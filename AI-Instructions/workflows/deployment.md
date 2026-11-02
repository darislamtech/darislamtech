# Deployment / release

1. **Pre-checks:** change reviewed and merged; build and relevant tests pass (`project/COMMANDS.md`); required migrations applied or scheduled with the release; environment variables/secrets present in the target environment.
2. **Confirm target and approval:** which environment, what is deployed, and owner approval for production.
3. **Preview first** when the platform provides one. Note whether the preview shares production data.
4. **Deploy** with the project's process (`project/COMMANDS.md`). Never deploy an unreviewed branch to production.
5. **Verify after deploy:** deployed commit matches, key workflows smoke-tested, errors/logs checked.
6. **Rollback:** know the last good version and how to restore it before deploying; use it if verification fails, then report.
7. **Report** the deployed commit, URL, verification results, and anything still pending.
