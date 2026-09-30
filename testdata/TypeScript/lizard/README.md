# Lizard Cyclomatic Complexity Trigger Fixture (TypeScript)

This fixture demonstrates Cyclomatic Complexity analysis on **TypeScript** using **Lizard**.

## Purpose
- Evaluates decision branches, loop constructs, switch complexity, and McCabe index on TS AST.
- Triggers Lizard threshold warnings for function `processComplexOrder`.

## Run Command
```bash
lizard -C 15 -w src/
```
Expected: Cyclomatic Complexity = 25 (Exceeds threshold 15).
