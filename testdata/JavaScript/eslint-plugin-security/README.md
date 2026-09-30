# eslint-plugin-security SAST Trigger Fixture (JavaScript)

This fixture demonstrates Static Application Security Testing (SAST) using **eslint-plugin-security**.

## Purpose
- Tests detection of dangerous node patterns: `eval()` with expressions, child process execution with untrusted input, unsafe regular expressions (ReDoS), and non-literal path/module resolution.
- Exercises SAST quality gate blocking.

## Run Command
```bash
npx eslint src/vulnerabilities.js -c .eslintrc.json
```
JSON Report:
```bash
npx eslint src/vulnerabilities.js -c .eslintrc.json --format json
```
Expected: 5 security errors detected across 5 distinct security rules.
