# Bug fix

1. **Reproduce** with concrete inputs/state. If you can't, report what you tried before changing code.
2. **Find the root cause** (`workflows/investigation.md`). Fix the cause, not the symptom. Check whether the same faulty pattern exists elsewhere.
3. **Assess impact:** which data, records, reports, or users were affected, and whether wrong data is already stored. Correcting historical data is a separate, approved step (`workflows/database-change.md`).
4. **Write a failing test** that captures the bug, when the area has tests.
5. **Fix** with the smallest correct change (`core/general.md`).
6. **Verify** (`core/quality.md`): the new test passes, related tests pass, consumers are still correct.
7. **Report** (`core/reporting.md`): cause, fix, evidence, affected data, remaining risk.
