# nyc + mocha Coverage Trigger Fixture (JavaScript)

This fixture demonstrates Statement and Branch Coverage measurement using **nyc + mocha**.

## Purpose
- Tests detection of covered vs uncovered statements and conditional logic branches.
- Verifies code execution verification and decision outcome coverage gaps.

## Run Command
```bash
npx nyc --reporter=text --reporter=json-summary mocha test/calculator.test.js
```
Expected: 84.61% statement coverage, 87.5% branch coverage (Lines 25-26 uncovered).
