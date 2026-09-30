# npm audit Dependency Risk (SCA) Trigger Fixture (JavaScript)

This fixture demonstrates Software Composition Analysis (SCA) using **npm audit**.

## Purpose
- Scans direct and transitive dependencies for known security CVEs.
- Verifies supply chain vulnerability detection and known CVE count tracking.

## Run Command
```bash
npm audit
```
JSON Report:
```bash
npm audit --json
```
Expected: 2 vulnerabilities identified (1 High in `lodash`, 1 Critical in `minimist`).
