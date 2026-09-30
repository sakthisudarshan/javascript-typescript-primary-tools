# PyDriller Code Churn Trigger Fixture

This fixture demonstrates Code Churn calculation using **PyDriller**.

## Purpose
- Extracts git commit history and calculates modifications, additions, and deletions per file.
- Derives Code Churn Score to prioritize regression testing and predict defect probability.

## Run Command
```bash
python analyze_churn.py <path_to_git_repo>
```
Output: JSON summarizing commits, churn score, and file alteration frequency.
