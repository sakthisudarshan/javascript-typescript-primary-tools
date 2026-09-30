# ts-morph All-Definitions & All-Uses Coverage Trigger Fixture (TypeScript)

This fixture demonstrates Definition-Use (DU-Path) data flow analysis using **ts-morph** AST inspection.

## Purpose
- Detects variable definitions, dead/uncovered definitions, computational uses (C-Use), and predicate uses (P-Use).
- Computes All-Definitions Coverage % and All-Uses Coverage % as specified in White Box metrics rows 93–108.

## Run Command
```bash
npx ts-node analyze_du_coverage.ts src/du_paths.ts
```
Expected:
- Total Definitions: 6 (5 Covered, 1 Dead Definition: `deadAuditTracker`)
- All-Defs Coverage: 83.33%
- Total Uses: 11 (9 C-Uses, 2 P-Uses)
