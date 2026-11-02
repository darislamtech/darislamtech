# Quality & verification

## Before calling something done
Verify in this order with the commands in `project/COMMANDS.md`, only as far as the change warrants:
1. Static/type/lint check of the changed area.
2. Relevant unit/component tests.
3. Relevant integration/database tests.
4. Build.
5. Full suite — only for shared or cross-module changes.

Don't rerun expensive global checks after a trivial edit.

## Tests
- A bug fix comes with a test that fails before the fix and passes after, when the area has a test setup.
- New behavior gets tests for the main path, edge cases, and permission denial where relevant.
- Never weaken, skip, or delete a test to make it pass. If a test is wrong, say so and explain.

## Regression check
Re-check the modified files, their direct dependents, the shared logic they use, and every list, report, dashboard, print view, or export that consumes the same data.

## Final diff review
Read the actual diff before reporting. Confirm: only intended changes, no duplicate logic, no secrets, no unrelated formatting, no broken consumers, permissions and data integrity intact.

## Honesty
- Report failures with their output. If a step was skipped or couldn't run, say so.
- "Should work" is not verification.
