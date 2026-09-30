# knip Ghost Code & Unreachable Path Trigger Fixture (TypeScript)

This fixture demonstrates Unreachable Path Detection and Ghost Code Discovery using **knip**.

## Purpose
- Scans TypeScript files and entry points to identify unreferenced exports, dead types, and orphaned pathways.
- Exercises dead-code elimination and path hygiene gates.

## Run Command
```bash
npx knip --reporter json
```
Expected: 2 unused exported functions (`ghostDeadFunctionA`, `ghostDeadFunctionB`) and 1 unused type interface (`UnusedGhostConfig`).
