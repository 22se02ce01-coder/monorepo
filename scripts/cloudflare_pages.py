#!/usr/bin/env python3
"""
Makes sure every Cloudflare Pages project in scripts/sites.json is connected to its
custom domain (microfree.store, pdftools.microfree.store, ...) and that the DNS record
pointing at <project>.pages.dev exists. Safe to run again and again.

Needs environment variables:
  CLOUDFLARE_API_TOKEN   token with  Account > Cloudflare Pages > Edit,
                                     Zone > DNS > Edit, Zone > Zone > Read
  CLOUDFLARE_ACCOUNT_ID  your Cloudflare account ID

Usage: python3 scripts/cloudflare_pages.py domains
"""
import json
import os
import sys
import urllib.error
import urllib.request

API = "https://api.cloudflare.com/client/v4"
HERE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(HERE, "sites.json")))
TOKEN = os.environ.get("CLOUDFLARE_API_TOKEN", "")
ACCOUNT = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")


def call(method, path, body=None):
    req = urllib.request.Request(
        API + path,
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        try:
            return json.load(e)
        except Exception:
            return {"success": False, "errors": [{"message": f"HTTP {e.code}"}]}


def all_sites():
    yield CFG["rootProject"], CFG["rootDomain"]
    for s in CFG["sites"]:
        yield s["project"], s["domain"]


def domains():
    if not TOKEN or not ACCOUNT:
        sys.exit("CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set")

    zones = call("GET", f"/zones?name={CFG['rootDomain']}").get("result") or []
    if not zones:
        print(f"Domain {CFG['rootDomain']} is not in this Cloudflare account yet - "
              "add it in the dashboard (Add a domain), then re-run. Sites are still live on *.pages.dev.")
        return
    zone_id = zones[0]["id"]
    failures = 0

    for project, domain in all_sites():
        proj = call("GET", f"/accounts/{ACCOUNT}/pages/projects/{project}")
        if not proj.get("success"):
            print(f"! {project}: project not found ({proj.get('errors')})")
            failures += 1
            continue
        target = proj["result"]["subdomain"]  # e.g. microfree-pdftools.pages.dev

        existing = [d["name"] for d in proj["result"].get("domains", [])]
        if domain not in existing:
            r = call("POST", f"/accounts/{ACCOUNT}/pages/projects/{project}/domains", {"name": domain})
            if not r.get("success") and "already" not in json.dumps(r.get("errors", "")).lower():
                print(f"! {domain}: could not attach ({r.get('errors')})")
                failures += 1
                continue

        recs = call("GET", f"/zones/{zone_id}/dns_records?name={domain}").get("result") or []
        if not recs:
            r = call("POST", f"/zones/{zone_id}/dns_records",
                     {"type": "CNAME", "name": domain, "content": target, "proxied": True, "ttl": 1})
            if not r.get("success"):
                print(f"! {domain}: could not create DNS record ({r.get('errors')})")
                failures += 1
                continue
        elif not any(x["type"] == "CNAME" and x["content"] == target for x in recs):
            print(f"! {domain}: a different DNS record already exists - delete it in the dashboard and re-run")
            failures += 1
            continue
        print(f"ok {domain} -> {target}")

    if failures:
        sys.exit(f"{failures} domain(s) need attention (see messages above)")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "domains":
        domains()
    elif len(sys.argv) > 1 and sys.argv[1] == "projects":
        for project, _ in all_sites():
            print(project)
    else:
        sys.exit(__doc__)
