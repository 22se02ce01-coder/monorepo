#!/bin/bash
# Builds the whole microfree.store site into ./deploy — ready for Cloudflare Pages.
#
#   bash build-deploy.sh                          # build without ads (before AdSense approval request)
#   bash build-deploy.sh ca-pub-1234567890123456  # build with AdSense code + ads.txt
#
# Result:
#   deploy/index.html, about/, privacy-policy/, terms/, disclaimer/, contact/, sitemap.xml, robots.txt, ads.txt
#   deploy/<tool-slug>/   (one folder per tool, e.g. deploy/json-formatter/)
#
# Deploy: Cloudflare dashboard → Workers & Pages → Create → Pages → "Upload assets" → upload the deploy folder
#     or: npx wrangler pages deploy deploy --project-name microfree

set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/deploy"
PUB="${1:-${ADSENSE_PUB_ID:-}}"   # or set ADSENSE_PUB_ID as a Cloudflare Pages environment variable

if [ -n "$PUB" ] && [[ ! "$PUB" =~ ^ca-pub-[0-9]{16}$ ]]; then
  echo "Publisher ID must look like ca-pub-1234567890123456"; exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT"

for dir in "$ROOT"/[0-9][0-9]-*/; do
  name="$(basename "$dir")"
  slug="$(grep -o 'rel="canonical" href="https://microfree\.[a-z]*/[^"/]*' "$dir/index.html" | sed 's#.*/##')"
  [ -n "$slug" ] || { echo "No canonical slug found in $name/index.html"; exit 1; }
  if [ ! -d "$dir/node_modules" ]; then
    # Fresh checkout (e.g. Cloudflare Pages / GitHub): install exact versions from package-lock.json
    echo "[$name] installing dependencies"
    ( cd "$dir" && npm ci --no-audit --no-fund > "/tmp/microfree-$slug-install.log" 2>&1 ) \
      || { cat "/tmp/microfree-$slug-install.log"; echo "INSTALL FAILED: $name"; exit 1; }
  fi
  echo "[$name] building -> /$slug/"
  ( cd "$dir" && npm run build > "/tmp/microfree-$slug-build.log" 2>&1 ) \
    || { cat "/tmp/microfree-$slug-build.log"; echo "BUILD FAILED: $name"; exit 1; }
  cp -R "$dir/dist" "$OUT/$slug"
  rm -f "$OUT/$slug/robots.txt" "$OUT/$slug/sitemap.xml"   # the root robots.txt / sitemap.xml cover everything
done

python3 "$ROOT/portal/build_portal.py" "$OUT" "$PUB"

if [ -n "$PUB" ]; then
  TAG="<meta name=\"google-adsense-account\" content=\"$PUB\" /><script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=$PUB\" crossorigin=\"anonymous\"></script>"
  find "$OUT" -name "*.html" -print0 | while IFS= read -r -d '' f; do
    if grep -q "<!--ADSENSE_HEAD-->" "$f"; then
      TAG="$TAG" perl -0pi -e 's/<!--ADSENSE_HEAD-->/$ENV{TAG}/' "$f"
    else
      TAG="$TAG" perl -0pi -e 's#</head>#$ENV{TAG}\n</head>#' "$f"
    fi
  done
  echo "AdSense code added to every page; ads.txt written."
else
  find "$OUT" -name "*.html" -exec perl -pi -e 's/<!--ADSENSE_HEAD-->//' {} +
  echo "Built WITHOUT AdSense code. Re-run with your ca-pub ID once you have it."
fi

echo "Done -> $OUT"
