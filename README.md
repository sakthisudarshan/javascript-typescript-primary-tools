# Full-Stack JavaScript & TypeScript Primary Tools Repository

Enterprise Full-Stack Monorepo application intentionally architected with realistic **Frontend (TypeScript)** and **Backend (JavaScript)** services to trigger and validate 14 White Box Analysis and Static Analysis tools for the **Testable Platform**.

---

## 🏗️ Repository Architecture & Testable Detection Setup

This repository is designed to ensure the **Testable Execution Assistant** and static analysis detectors automatically identify:
- **Build Type**: `npm`
- **Language Version**: `Node.js 20.x` / `ES2022` / `TypeScript 5.7`
- **Project Type**: `Monorepo (Frontend SPA + Backend REST API)`

### Root Structure
```text
.
├── .nvmrc                              # Pinned Node.js runtime (20.18.0)
├── .node-version                       # Multi-version manager lock
├── package.json                        # Root Monorepo configuration with npm workspaces
├── tsconfig.json                       # Root TypeScript configuration
├── backend/                            # JavaScript (Node.js + Express API)
│   ├── package.json                    # Backend project manifest & scripts
│   ├── .eslintrc.json                  # ESLint + Security + SonarJS config
│   ├── .nycrc.json                     # NYC coverage configuration
│   ├── jscpd.json                      # JSCPD code duplication rules
│   ├── src/
│   │   ├── index.js                    # Express REST entrypoint
│   │   ├── controllers/
│   │   │   ├── riskController.js       # Lizard Cyclomatic Complexity trigger (CCN=27)
│   │   │   └── securityController.js   # SAST Security triggers (eval, exec, ReDoS)
│   │   ├── services/
│   │   │   ├── userService.js          # JSCPD clone source
│   │   │   ├── accountService.js       # JSCPD clone duplicate
│   │   │   └── discountService.js      # SonarJS Cognitive Complexity trigger (score=46)
│   │   ├── utils/
│   │   │   ├── calculator.js           # Target for NYC code coverage
│   │   │   └── lintViolations.js       # ESLint rule violations
│   │   └── models/
│   │       └── userModel.js            # Target for PyDriller code churn
│   └── test/
│       └── calculator.test.js          # Mocha test suite (partial branch coverage)
├── frontend/                           # TypeScript (React + Vite Client)
│   ├── package.json                    # Frontend project manifest & scripts
│   ├── tsconfig.json                   # TypeScript compiler configuration
│   ├── vite.config.ts                  # Vite + Vitest v8 coverage config
│   ├── biome.json                      # Biome linter & formatter rules
│   ├── index.html                      # HTML entrypoint
│   ├── src/
│   │   ├── main.tsx                    # React DOM mounting
│   │   ├── App.tsx                     # Main layout & router
│   │   ├── components/
│   │   │   ├── OrderDashboard.tsx      # Interactive simulation UI
│   │   │   ├── ComponentA.tsx          # Circular dependency target
│   │   │   └── ComponentB.tsx          # Circular dependency partner
│   │   ├── services/
│   │   │   ├── paymentGateway.ts       # Vitest coverage target (uncovered branch)
│   │   │   ├── financialEngine.ts      # ts-morph DU-paths & dead definitions
│   │   │   └── ghostService.ts         # Knip ghost exports / unused dead code
│   │   └── utils/
│   │       ├── complexOrderEngine.ts   # Lizard TS Cyclomatic Complexity trigger (CCN=25)
│   │       └── biomeViolations.ts      # Biome linter rule violations
│   └── test/
│       └── paymentGateway.test.ts      # Vitest test suite
├── notebooks/
│   └── primary_tools_validator.ipynb   # Interactive validation notebook
├── tool_outputs/                       # Validated JSON execution outputs for all 14 tools
└── platform_testdata_manifest.json     # Standard Testable audit manifest
```

---

## 🛠️ Tool Trigger Mapping (14 Primary Tools)

| ID | Language | Tool | Technique | Metric | Source File Location | Triggered Value |
|---|---|---|---|---|---|---|
| 1 | JavaScript | **Lizard** | Cyclomatic Complexity | CCN Threshold | `backend/src/controllers/riskController.js` | CCN = 27 (threshold: 15) |
| 2 | JavaScript | **jscpd** | Code Duplication | Clone % | `backend/src/services/accountService.js` | 1 clone, 19.28% duplication |
| 3 | JavaScript | **ESLint** | Lint Violations | Error Count | `backend/src/utils/lintViolations.js` | 10 violations (no-var, debugger) |
| 4 | JavaScript | **SonarJS** | Cognitive Complexity | Cognitive Score | `backend/src/services/discountService.js` | Cognitive Complexity = 46 |
| 5 | JS / TS | **eslint-plugin-security** | SAST Vulnerabilities | Flaw Density | `backend/src/controllers/securityController.js` | 5 findings (eval, exec, ReDoS) |
| 6 | JS / TS | **npm audit** | Dependency Risk (SCA) | Known CVEs | `backend/package.json` | 2 CVEs (lodash, minimist) |
| 7 | JavaScript | **NYC + Mocha** | Statement/Branch Coverage | Uncovered Branch | `backend/src/utils/calculator.js` | Branch: 87.5%, Stmt: 84.6% |
| 8 | TypeScript | **Lizard** | Cyclomatic Complexity | CCN Threshold | `frontend/src/utils/complexOrderEngine.ts` | CCN = 25 (threshold: 15) |
| 9 | TypeScript | **Biome** | Lint / Format Violations | Syntax Errors | `frontend/src/utils/biomeViolations.ts` | 9 errors (debugger, noVar) |
| 10 | TypeScript | **Vitest** | Branch Coverage / Delta | Coverage % | `frontend/src/services/paymentGateway.ts` | Branch: 66.7%, Stmt: 68.6% |
| 11 | TypeScript | **ts-morph** | DU-Path Coverage | Def-Use Analysis | `frontend/src/services/financialEngine.ts` | All-Defs: 83.3%, Dead Defs: 1 |
| 12 | TypeScript | **dependency-cruiser** | Architecture / Paths | Circular Dependency | `frontend/src/components/ComponentA.tsx` | Circular loop detected |
| 13 | TypeScript | **Knip** | Dead Code / Ghost Code | Unused Exports | `frontend/src/services/ghostService.ts` | 2 unused exports, 1 unused type |
| 14 | Agnostic | **PyDriller** | Code Churn | Churn History | `backend/src/models/userModel.js` | Churn engine operational |

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Unified Test Suite
```bash
npm test
```

### Run Unified Linters
```bash
npm run lint
```

### Run Interactive Validator
Open and run `notebooks/primary_tools_validator.ipynb` in VS Code or JupyterLab to execute all 14 tools in sequence and inspect the visual compliance dashboard.
