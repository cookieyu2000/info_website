#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "git is required."
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  message="${1:-Update content $(date '+%Y-%m-%d %H:%M:%S')}"
  git commit -m "$message" || true
else
  echo "No changes to publish."
  exit 0
fi

git push
