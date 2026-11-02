# Investigation

Use when diagnosing a problem, explaining how something works, or before any non-trivial change.

1. **Define the question:** expected vs actual behavior, scope, who is affected.
2. **Locate the feature:** search identifiers before opening files (`core/general.md`).
3. **Trace end to end:** entry point → logic → data store → outputs (UI, reports, exports, notifications).
4. **Gather evidence:** `file:line` references, logs, query results, reproduction steps. Read-only — change nothing while investigating.
5. **Separate facts from hypotheses.** Test each hypothesis against evidence; drop what the evidence contradicts.
6. **Stop** when the question is answered with evidence.

Output: the answer, its evidence, confidence, and the recommended next step (bug fix / feature / no action). No changes unless asked.
