#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OTP="${1:-}"

if [[ -z "$OTP" ]]; then
  echo "Usage: ./scripts/publish.sh <6-digit-otp>"
  echo ""
  echo "Get OTP from Google Authenticator / Authy (npm entry)."
  echo "Example: ./scripts/publish.sh 482913"
  exit 1
fi

cd "$ROOT"
echo "→ Building packages..."
npx pnpm@9 prepublish:check

publish_pkg() {
  local dir="$1"
  local name="$2"
  echo ""
  echo "→ Publishing $name ..."
  cd "$ROOT/$dir"
  npm publish --access public --otp="$OTP"
}

publish_pkg "packages/core" "@shubhamsunnynitkkr/server-driven-ui"
publish_pkg "packages/antd" "@shubhamsunnynitkkr/server-driven-ui-antd"
publish_pkg "packages/charts" "@shubhamsunnynitkkr/server-driven-ui-charts"

echo ""
echo "✓ All packages published."
echo "  https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui"
