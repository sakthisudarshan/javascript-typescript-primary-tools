#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if ! command -v npx &>/dev/null; then
  echo "eslint requires node/npx — install Node.js to enable." >&2
  exit 1
fi

npx eslint src/vulnerabilities.js -c .eslintrc.json
