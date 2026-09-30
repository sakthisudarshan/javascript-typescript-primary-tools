# Lizard Cyclomatic Complexity Trigger Fixture (JavaScript)

This fixture demonstrates Cyclomatic Complexity measurement using **Lizard**.

## Purpose
- Tests decision-point density, branch explosion risk, and Execution Path Integrity.
- Triggers Lizard with cyclomatic complexity exceeding the threshold of 15.

## Run Command
```bash
lizard src/ -C 15 -w
```
Output XML:
```bash
lizard --xml src/ > lizard_report.xml
```
