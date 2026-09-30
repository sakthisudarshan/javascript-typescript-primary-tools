# dependency-cruiser Cross-Component Path Trigger Fixture (TypeScript)

This fixture demonstrates Cross-Component Mapping and circular dependency detection using **dependency-cruiser**.

## Purpose
- Tests cross-component path tracking and architectural loop detection (`moduleA` <-> `moduleB`).
- Evaluates CI/CD architectural gate rules for circular imports.

## Run Command
```bash
npx depcruise src/ --no-config --output-type json
```
Expected: `circular: true` detected between `moduleA.ts` and `moduleB.ts`.
