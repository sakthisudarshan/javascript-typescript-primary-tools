# Biome Lint & Rule Violations Trigger Fixture (TypeScript)

This fixture demonstrates modern linting, style enforcement, and static code quality gatekeeping using **Biome**.

## Purpose
- Evaluates unused variables, `noVar` style enforcement, debugger prevention, and double-equal warnings on TypeScript code.
- Exercises AST rule evaluation speed and JSON diagnostic generation.

## Run Command
```bash
npx biome lint src/biome_violations.ts --config-path=.
```
JSON Diagnostics:
```bash
npx biome lint src/biome_violations.ts --config-path=. --reporter=json
```
Expected: 9 errors detected across style, suspicious, and correctness rules.
