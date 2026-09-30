# eslint-plugin-sonarjs Cognitive Complexity Trigger Fixture (JavaScript)

This fixture demonstrates Cognitive Complexity measurement using **eslint-plugin-sonarjs**.

## Purpose
- Measures code understandability, human cognitive load, and reviewer fatigue factor.
- Evaluates mental effort required to follow control flow compared to linear McCabe cyclomatic complexity.

## Run Command
```bash
npx eslint src/cognitive_debt.js -c .eslintrc.json
```
JSON Output:
```bash
npx eslint src/cognitive_debt.js -c .eslintrc.json --format json
```
Expected: `sonarjs/cognitive-complexity` triggers with complexity 46 (threshold: 5).
