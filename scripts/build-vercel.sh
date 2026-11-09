#!/bin/bash
# Test build for Vercel: puts ALL sites into one static folder (vercel-out/)
#   /                 homepage + about/privacy/terms/disclaimer/contact
#   /pdf-tools/       PDF Tools
#   /json-formatter/  JSON Formatter   ... (every tool under its slug)
# Links to https://<tool>.microfree.store/ and https://microfree.store/ are rewritten to
# local paths so you can click around on the *.vercel.app test address.
# The real production setup (separate subdomains on Cloudflare) is untouched.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/vercel-out"

bash "$ROOT/build-deploy.sh"

rm -rf "$OUT"
cp -R "$ROOT/deploy/microfree-home" "$OUT"

python3 - "$ROOT" "$OUT" <<'EOF'
import json, os, re, shutil, sys
root, out = sys.argv[1], sys.argv[2]
cfg = json.load(open(os.path.join(root, "scripts", "sites.json")))
for s in cfg["sites"]:
    shutil.copytree(os.path.join(root, "deploy", s["project"]), os.path.join(out, s["slug"]))

subs = {s["domain"]: s["slug"] for s in cfg["sites"]}
pat = re.compile(r"https://([a-z0-9]+\.)?microfree\.store/")

def local(m):
    host = (m.group(2) or "") + "microfree.store"
    return f"/{subs[host]}/" if host in subs else "/"

changed = 0
for dirpath, _, files in os.walk(out):
    for f in files:
        if not f.endswith((".html", ".js")):
            continue
        p = os.path.join(dirpath, f)
        t = open(p, encoding="utf-8").read()
        # keep canonical / og URLs pointing at the real domain; only rewrite clickable links
        # href="..." (HTML), href:"..." / path:"..." (compiled React), location.href="..."
        link = re.compile(r'((?:href|path)\s*[=:]\s*\\?["\'])' + pat.pattern)
        n = link.sub(lambda m: m.group(1) + local(m), t)
        n = n.replace('<link rel="canonical"', '<meta name="robots" content="noindex" /><link rel="canonical"', 1) if f.endswith(".html") else n
        if n != t:
            open(p, "w", encoding="utf-8").write(n)
            changed += 1
print(f"vercel-out ready: {len(cfg['sites'])} tools + homepage, {changed} files adjusted")
EOF
