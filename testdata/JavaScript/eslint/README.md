# ESLint Rule Violations Trigger Fixture (JavaScript)

This fixture demonstrates Linting and Code Style enforcement using **ESLint**.

## Purpose
- Tests detection of unused variables, deprecated var declarations, constant conditions, and debugger statements.
- Measures violation density per KLOC and rule classification.

## Run Command
```bash
npx eslint src/lint_violations.js -c .eslintrc.json
```
JSON Report:
```bash
npx eslint src/lint_violations.js -c .eslintrc.json --format json
```
Expected: 9 errors, 1 warning (10 total violations).
