#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if ! command -v lizard &>/dev/null; then
  echo "lizard requires python lizard — pip install lizard to enable." >&2
  exit 1
fi

lizard -C 15 -w src/
