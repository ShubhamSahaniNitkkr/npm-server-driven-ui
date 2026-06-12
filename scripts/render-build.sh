#!/usr/bin/env bash
# Render build script — runs from repo root.
# Usage: bash scripts/render-build.sh sdui-site-user-management
set -euo pipefail

SITE_FILTER="${1:?Pass pnpm filter name, e.g. sdui-site-user-management}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Node $(node -v)"
echo "==> Building $SITE_FILTER"

# Prefer corepack pnpm (Node 18+), fall back to npx — no global install needed
if command -v corepack &>/dev/null; then
  corepack enable 2>/dev/null || true
  corepack prepare pnpm@9.15.9 --activate 2>/dev/null || true
fi

if command -v pnpm &>/dev/null; then
  PNPM=(pnpm)
else
  PNPM=(npx pnpm@9.15.9)
fi

echo "==> Installing dependencies..."
"${PNPM[@]}" install --frozen-lockfile || "${PNPM[@]}" install

echo "==> Building npm packages..."
"${PNPM[@]}" run build

echo "==> Building site $SITE_FILTER..."
"${PNPM[@]}" --filter "$SITE_FILTER" run build

SITE_DIR="${SITE_FILTER#sdui-site-}"
if [[ ! -f "sites/$SITE_DIR/dist/index.html" ]]; then
  echo "ERROR: sites/$SITE_DIR/dist/index.html not found after build"
  exit 1
fi

echo "==> Build OK."
