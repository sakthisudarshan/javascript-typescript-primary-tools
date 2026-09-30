#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if ! command -v npm &>/dev/null; then
  echo "npm required — install Node.js to enable." >&2
  exit 1
fi

npm audit
