# jscpd Code Duplication Trigger Fixture (JavaScript)

This fixture demonstrates Code Duplication detection using **jscpd**.

## Purpose
- Tests detection of duplicated code clones across modules.
- Exercises duplication threshold enforcement and refactoring risk analysis.

## Files
- `src/user_service.js`: Origin source module.
- `src/account_service.js`: Target duplicate with copy-pasted audit logic.

## Run Command
```bash
npx jscpd src/ --reporters console --threshold 5
```
Expected: 1 clone found, 16 duplicated lines (19.28% duplication).
