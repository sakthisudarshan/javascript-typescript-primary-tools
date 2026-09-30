# Vitest + @vitest/coverage-v8 Trigger Fixture (TypeScript)

This fixture demonstrates Statement, Branch, and Coverage Delta measurement for **TypeScript** using **Vitest** with V8 engine instrumentation.

## Purpose
- Tests execution path tracking, branch coverage gaps, and coverage delta monitoring.
- Triggers coverage threshold gates (expected 68.57% statement, 66.66% branch).

## Run Command
```bash
npx vitest run --coverage --config vite.config.ts
```
Expected: Statement Coverage = 68.57%, Branch Coverage = 66.66%.
