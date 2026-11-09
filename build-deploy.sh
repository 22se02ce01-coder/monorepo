#!/bin/bash
# Builds every MicroFree site into ./deploy, one folder per Cloudflare Pages project:
#
#   deploy/microfree-home/        -> microfree.store            (homepage, about, privacy, terms, ...)
#   deploy/microfree-pdftools/    -> pdftools.microfree.store
#   deploy/microfree-imagetopdf/  -> imagetopdf.microfree.store
#   ...                              (mapping lives in scripts/sites.json)
#
#   bash build-deploy.sh                          # without ads
#   bash build-deploy.sh ca-pub-1234567890123456  # with AdSense code (+ ads.txt on microfree.store)
#
# GitHub Actions (.github/workflows/deploy.yml) runs this and uploads each folder automatically.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/deploy"
PUB="${1:-${ADSENSE_PUB_ID:-}}"
LOG="${TMPDIR:-/tmp}"

if [ -n "$PUB" ] && [[ ! "$PUB" =~ ^ca-pub-[0-9]{16}$ ]]; then
  echo "Publisher ID must look like ca-pub-1234567890123456"; exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT"

# "dir project domain" per tool, from scripts/sites.json
SITES="$(python3 -c 'import json;c=json.load(open("'"$ROOT"'/scripts/sites.json"));[print(s["dir"],s["project"],s["domain"]) for s in c["sites"]]')"
ROOT_PROJECT="$(python3 -c 'import json;print(json.load(open("'"$ROOT"'/scripts/sites.json"))["rootProject"])')"

while read -r name project domain; do
  dir="$ROOT/$name"
  if [ ! -d "$dir/node_modules" ]; then
    echo "[$name] installing dependencies"
    ( cd "$dir" && npm ci --no-audit --no-fund > "$LOG/mf-$project-install.log" 2>&1 ) \
      || { cat "$LOG/mf-$project-install.log"; echo "INSTALL FAILED: $name"; exit 1; }
  fi
  echo "[$name] building -> https://$domain/"
  ( cd "$dir" && npm run build > "$LOG/mf-$project-build.log" 2>&1 ) \
    || { cat "$LOG/mf-$project-build.log"; echo "BUILD FAILED: $name"; exit 1; }
  cp -R "$dir/dist" "$OUT/$project"
done <<< "$SITES"

python3 "$ROOT/portal/build_portal.py" "$OUT/$ROOT_PROJECT" "$PUB"

if [ -n "$PUB" ]; then
  TAG="<meta name=\"google-adsense-account\" content=\"$PUB\" /><script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=$PUB\" crossorigin=\"anonymous\"></script>"
  find "$OUT" -name "*.html" -print0 | while IFS= read -r -d '' f; do
    if grep -q "<!--ADSENSE_HEAD-->" "$f"; then
      TAG="$TAG" perl -0pi -e 's/<!--ADSENSE_HEAD-->/$ENV{TAG}/' "$f"
    else
      TAG="$TAG" perl -0pi -e 's#</head>#$ENV{TAG}\n</head>#' "$f"
    fi
  done
  echo "AdSense code added to every page; ads.txt written to microfree.store."
else
  find "$OUT" -name "*.html" -exec perl -pi -e 's/<!--ADSENSE_HEAD-->//' {} +
  echo "Built WITHOUT AdSense code (set ADSENSE_PUB_ID once you have it)."
fi

echo "Done -> $OUT ($(ls "$OUT" | wc -l | tr -d ' ') sites)"
