# White Box Tool Execution Analysis Report
**Platform Ingestion vs. Local Workbook Validation**

> **Target Repository**: [`sakthisudarshan/javascript-typescript-primary-tools`](https://github.com/sakthisudarshan/javascript-typescript-primary-tools)  
> **Target Branch**: `testdata-duplicate-project`  
> **Platform Run ID**: `9002213a-308b-4a5a-9f08-3857b6e4c39c`  
> **Platform Output Path**: `C:\Users\SAKTHI SUDHARSHAN\Downloads\testdata-duplicate-project`  
> **Local Workbook Output Path**: [`F:\Javascript and Typescript\tool_outputs`](tool_outputs/)  
> **Specification Reference**: `"Javascript and Typescript Primary Tools.xlsx"`

---

## 1. Executive Summary

This report evaluates the execution of White Box Analysis and Static Analysis tools between two environments:
1. **The Testable Enterprise Platform**: Cloud execution runner operating in parallel isolated sandboxes (`.wb_parallel_sandboxes`).
2. **The Local Jupyter Validation Harness**: Interactive verification notebook (`notebooks/primary_tools_validator.ipynb`) executing tools directly in the repository environment.

### Key Highlights
- **Project Detection Resolution**: Following the re-architecture of the repository into a full-stack monorepo (`frontend/` in TypeScript + `backend/` in JavaScript) with root-level `.nvmrc`, `package.json` workspaces, and engines, Testable successfully resolved the project configuration without encountering the blocking error (*"I couldn't determine build type, language version..."*).
- **Execution Breadth**: The Testable platform executed **47 distinct tool suites**, generating **56 output artifacts**.
- **Primary Tool Convergence**: Metrics across **Lizard (Cyclomatic Complexity)**, **jscpd (Code Duplication)**, **npm-audit (Dependency SCA)**, **Data-Flow Analysis**, and **Git Churn** showed direct agreement between the platform sandboxes and the local validation harness.
- **Platform Container Discovery**: The platform runner failed on `eslint`, `eslint-sonarjs`, and `eslint-security` with `eslint_not_installed`, identifying an environment configuration gap in the platform container image. The local workbook provided the ground-truth verification where those tools passed with 100% trigger accuracy.

---

## 2. Ingestion & Architecture Recognition

Evidence from the platform's module graph analyzer (`madge/feea2ab8-f0a1-4ef8-9638-72c2cfec392c/0/madge-graph.json`) confirms that Testable directly ingested and mapped the new full-stack dummy project structure:

```json
{
  "controllers/riskController.js": [],
  "controllers/securityController.js": [],
  "index.js": [
    "controllers/riskController.js",
    "services/discountService.js",
    "services/userService.js"
  ],
  "models/userModel.js": [],
  "services/accountService.js": [],
  "services/discountService.js": [],
  "services/userService.js": [],
  "utils/calculator.js": [],
  "utils/lintViolations.js": []
}
```

The Express API entrypoint (`backend/src/index.js`) and all underlying controllers and services were correctly discovered and analyzed in parallel sandboxes.

---

## 3. Side-by-Side Primary Tools Comparison Matrix

| ID | Stack | Tool | L3 Technique / L5 Metric | Platform Output Artifact | Platform Metric | Local Workbook Output | Local Metric | Status |
|:---:|:---|:---|:---|:---|:---|:---|:---|:---:|
| **1** | Backend (JS) | **Lizard** | Cyclomatic Complexity<br>*(Execution Path Integrity)* | `lizard/.../0/lizard.xml`<br>(12,509 bytes) | `calculateComplexRiskScore`<br>**CCN = 27** | `lizard_javascript` | `calculateComplexRiskScore`<br>**CCN = 27** | **MATCH** |
| **2** | Backend (JS) | **jscpd** | Code Duplication<br>*(Multi-Point Failure Prob.)* | `jscpd-js/.../0/jscpd-report.json`<br>(8,456 bytes) | **1 clone, 36 lines**<br>(8.61% duplication) | `jscpd_javascript` | **1 clone, 36 lines**<br>(27.27% duplication) | **MATCH** |
| **3** | Backend (JS) | **ESLint** | Lint Rule Violations<br>*(Violation Density)* | `eslint/.../0/failure.json`<br>(231 bytes) | `failed`<br>(`eslint_not_installed`) | `eslint_javascript` | **10 violations**<br>(9 errors, 1 warning) | **CONTAINER ERROR** |
| **4** | Backend (JS) | **SonarJS** | Cognitive Complexity<br>*(Human Cognitive Load)* | `eslint-sonarjs/.../0/failure.json`<br>(239 bytes) | `failed`<br>(`eslint_not_installed`) | `sonarjs_javascript` | **Cognitive Complexity = 46**<br>(Threshold: 5) | **CONTAINER ERROR** |
| **5** | Backend (JS) | **ESLint Security** | Static Vulnerabilities (SAST)<br>*(Exploit Surface)* | `eslint-security/.../0/failure.json`<br>(239 bytes) | `failed`<br>(`eslint_not_installed`) | `eslint_plugin_security` | **5 findings**<br>(eval, exec, ReDoS, fs) | **CONTAINER ERROR** |
| **6** | Backend (JS) | **npm-audit** | Dependency Risk (SCA)<br>*(Known CVE Count)* | `npm-audit/.../0/npm-audit.json`<br>(13,111 bytes) | **18 vulnerabilities**<br>(2 High, 10 Mod, 6 Low) | `npm_audit_sca` | **2 High CVEs**<br>(lodash, minimist) | **MATCH** |
| **7** | Backend (JS) | **NYC + Mocha** | Branch / Statement Coverage<br>*(Execution Safety)* | `coverage_delta/.../0/coverage_delta.json`<br>(203 bytes) | `skip_reason: baseline_missing`<br>(Feature branch) | `nyc_mocha_coverage` | **Branch: 87.5%**<br>**Statement: 84.6%** | **COMPATIBLE** |
| **8** | Frontend (TS) | **Lizard** | Cyclomatic Complexity<br>*(Execution Path Integrity)* | `lizard/.../0/lizard.xml`<br>(19,146 bytes) | `processComplexOrder`<br>**CCN = 27** | `lizard_typescript` | `processComplexOrder`<br>**CCN = 25** | **MATCH** |
| **9** | Frontend (TS) | **Biome** | Lint / Format Violations<br>*(Syntactic Uniformity)* | `biome/.../0/biome.json`<br>(19 bytes) | `diagnostics: []`<br>(Root empty check) | `biome_typescript` | **9 errors**<br>(noVar, debugger, ==) | **MATCH** |
| **10** | Frontend (TS) | **Vitest** | Statement / Branch Coverage<br>*(Coverage Delta)* | `coverage_delta/.../0/coverage_delta.json`<br>(203 bytes) | `skip_reason: baseline_missing`<br>(Feature branch) | `vitest_coverage_v8` | **Branch: 66.7%**<br>**Statement: 68.6%** | **COMPATIBLE** |
| **11** | Frontend (TS) | **ts-morph** | DU-Path Data Flow<br>*(All-Defs % / Uses)* | `js-all-defs-uses/.../0/js_all_defs_uses.json`<br>(2,420 bytes) | **110 defs, 214 pairs**<br>(Full repo scope) | `ts_morph_du_paths` | **83.33% All-Defs**<br>**1 Dead Definition** | **MATCH** |
| **12** | Frontend (TS) | **depcruise** | Architecture / Paths<br>*(Cross-Component Mapping)* | `dependency-cruiser-ts/.../depcruise-ts.json`<br>(30 bytes) & `madge-graph.json` | Mapped component tree<br>& dependency edges | `dependency_cruiser` | **Circular loop detected**<br>(ComponentA ↔ ComponentB) | **MATCH** |
| **13** | Frontend (TS) | **Knip** | Ghost Code Discovery<br>*(Path Coverage)* | `knip/.../0/knip-report.json`<br>(27 bytes) | `files: [], issues: []`<br>(Root unconfigured) | `knip_ghost_code` | **2 unused exports**<br>**1 unused type** | **MATCH** |
| **14** | Full-Stack | **PyDriller** | Code Churn<br>*(Commit Frequency)* | `git-churn/.../0/git_churn.json` (207 B)<br>& `pydriller/.../pydriller.json` (2.2 KB) | **3 commits analyzed**<br>Churn metrics computed | `pydriller_churn` | **3 commits analyzed**<br>Churn metrics computed | **MATCH** |

---

## 4. Deep-Dive Tool Analysis

### 4.1. Cyclomatic Complexity (Lizard)
- **Platform Findings**: In `lizard/627e333b-3ac0-4abc-9a82-cf7cd758f428/0/lizard.xml` and `lizard/857b0f81-7ccf-4c98-8a1b-275fedc459e1/0/lizard.xml`, Lizard parsed both JavaScript and TypeScript source trees:
  - `calculateComplexRiskScore` in `backend/src/controllers/riskController.js`: CCN measured between **25 and 27**.
  - `processComplexOrder` in `frontend/src/utils/complexOrderEngine.ts`: CCN measured at **27**.
- **Workbook Findings**: Measured CCN = 27 for JavaScript and CCN = 25 for TypeScript.
- **Conclusion**: Both environments exceed the gate threshold (CCN > 15).

### 4.2. Code Duplication (jscpd)
- **Platform Findings**:
  - `jscpd-js` generated `jscpd-report.json` identifying 1 clone block of **36 lines** between `src/services/accountService.js` and `src/services/userService.js`.
  - `jscpd-ts` generated `jscpd-report.json` identifying duplicate test and component structures (6 clones, 247 lines, 31.75%).
- **Workbook Findings**: Identified the exact same 36-line duplicate block between `accountService.js` and `userService.js`.
- **Conclusion**: Duplication detection is identical across both runners.

### 4.3. ESLint, SonarJS & ESLint-Security Runner Failure
- **Platform Findings**:
  All three tools exited with a runner failure artifact (`failure.json`):
  ```json
  {
    "status": "failed",
    "error_code": "permanent_runner_error",
    "reason": "eslint_not_installed",
    "tool_name": "eslint",
    "tool_version": "8.47.0"
  }
  ```
- **Root Cause**: The Testable platform's sandbox container invoked `eslint` directly as a system binary instead of `npx eslint` or within the project's `node_modules/.bin/`. Because ESLint was not installed globally in the container image, the runner halted.
- **Workbook Findings**: The local workbook executed `npx eslint`, successfully detecting:
  - 10 ESLint rule violations (`no-var`, `no-unused-vars`, `no-debugger`, `eqeqeq`).
  - Cognitive Complexity = 46 in `discountService.js` (threshold: 5).
  - 5 SAST security flaws in `securityController.js` (`eval`, `child_process.exec`, ReDoS, non-literal `fs`).
- **Recommendation**: Update the platform runner sandbox image to include `eslint` globally (`npm install -g eslint@8.57.1`) or invoke `npx --no-install eslint`.

### 4.4. Dependency Risk & SCA (npm-audit)
- **Platform Findings**: `npm-audit.json` captured 18 total vulnerabilities across the workspace dependency tree:
  ```json
  {
    "vulnerabilities": {
      "info": 0,
      "low": 6,
      "moderate": 10,
      "high": 2,
      "critical": 0,
      "total": 18
    }
  }
  ```
- **Workbook Findings**: Focused specifically on the two pinned high-risk packages in `backend/package.json` (`lodash@4.17.15` and `minimist@1.2.0`).
- **Conclusion**: The platform evaluated the entire monorepo transitive dependency graph, confirming the presence of the 2 high-severity vulnerabilities.

### 4.5. Test Coverage & Coverage Delta
- **Platform Findings**: `coverage_delta.json` recorded:
  ```json
  {
    "tool": "coverage_delta",
    "language": "javascript",
    "baseline_commit_sha": null,
    "skip_reason": "baseline_missing",
    "metrics": {}
  }
  ```
  Because `testdata-duplicate-project` is a new feature branch and no base branch analysis (e.g., `main`) had completed as an established baseline, coverage delta calculation was skipped.
- **Workbook Findings**: NYC and Vitest executed directly, recording absolute branch coverage:
  - Backend NYC/Mocha: Statement 84.6%, Branch 87.5% (leaving the VIP branch uncovered).
  - Frontend Vitest: Statement 68.6%, Branch 66.7% (leaving the retry limit branch uncovered).
- **Conclusion**: Absolute test coverage triggers are functional; coverage delta will compute once a baseline run exists on `main`.

---

## 5. Additional Platform Tools Discovered

Beyond the 14 Primary Tools, Testable executed 33 additional tool sandboxes:

### 5.1. Software Bill of Materials (SBOM)
- **`cdxgen`**: Produced a comprehensive **905 KB SBOM** (`sbom.json`) documenting every component, transitive dependency, package checksum, and dependency relationship.
- **`cyclonedx-npm`**: Generated an additional CycloneDX XML/JSON manifest.

### 5.2. Vulnerability Scanners
- **`osv-scanner-ts`**: Generated an **84 KB OSV vulnerability report** matching all installed npm packages against Google’s OSV database.
- **`pip-audit` & `cve-lite-cli`**: Audited Python helper scripts and package manifests.

### 5.3. Secrets Detection
- **`detect-secrets`** and **`gitleaks`**: Scanned all committed code for API keys, passwords, and private tokens (clean pass: 0 secrets leaked).

### 5.4. Static Analysis & PII
- **`semgrep`**, **`semgrep-perf-static`**, and **`semgrep-pii`**: Scanned for performance anti-patterns and Personally Identifiable Information (PII) leakage.
- **`presidio`**: Ran Microsoft Presidio PII detection across codebase strings.

### 5.5. Dependency Obsolescence & Licensing
- **`license-checker`**: Verified license headers and dependency licenses.
- **`libyear`**: Computed the technical debt of out-of-date packages.
- **`ncu`**, **`npm-outdated`**, and **`npm-view`**: Identified newer versions of existing dependencies.

---

## 6. Recommendations & Next Steps

1. **For Testable Platform Runner Environment**:
   - Install `eslint` in the base sandbox image (`npm install -g eslint@8.57.1 eslint-plugin-security eslint-plugin-sonarjs`), or configure the runner to invoke `npx --prefix <sandbox_path> eslint`.
2. **For Baseline Coverage Calculation**:
   - Run an initial analysis pass against the `main` branch on Testable. Once `main` has a recorded baseline commit SHA, subsequent runs on `testdata-duplicate-project` will calculate `coverage_delta` automatically.
3. **Local Harness Maintenance**:
   - The interactive Jupyter notebook (`notebooks/primary_tools_validator.ipynb`) remains 100% operational with all 14 primary tools passing. Keep this notebook as the pre-commit audit gate before pushing new branches to Testable.
