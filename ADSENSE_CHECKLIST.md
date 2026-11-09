# MicroFree – AdSense launch checklist

## Already done in the code
- Homepage at `/` listing all 20 tools, plus about 1,100 words of original text and an FAQ.
- Real pages at `/about/`, `/privacy-policy/`, `/terms/`, `/disclaimer/` and `/contact/`, linked from every footer. The privacy policy includes the wording Google requires about AdSense, cookies, GDPR and CCPA.
- Every tool page has 1,500–2,300 words of accurate guide text and FAQ answers, plus FAQ structured data (FAQPage JSON-LD).
- All URLs, canonical links and sharing previews use `https://microfree.store/<tool>/`.
- One `sitemap.xml` and `robots.txt` at the site root.
- The logo went from 1 MB to 62 KB, so pages load faster.
- Bugs fixed:
  - **PDF to Word** now extracts text from real-world PDFs, using pdf.js.
  - **PDF Split** downloads every part as a ZIP.
  - Page ranges like "2-5" work in Extract, Delete and Reorder.
  - The **Protect/Unlock** tab, which didn't work, has been removed.
  - **Age Calculator** no longer shows negative days.
  - **Image Compressor** and **Image Resizer** now accept dropped files.

## What you need to do

1. **Buy `microfree.store`** and add it to Cloudflare (free plan).
2. **Create the email address `contact@microfree.store`.** In Cloudflare, go to Email → Email Routing and forward it to your own inbox. The site lists this address on the Contact, About and Privacy pages. If you want a different address, change `CONTACT_EMAIL` in `portal/build_portal.py`.
3. **Deploy (automatic):** each tool has its own Cloudflare Pages project and subdomain, listed in `scripts/sites.json` (for example `pdftools.microfree.store`). Every `git push` runs `.github/workflows/deploy.yml`, which builds all 21 sites, uploads them and connects their domains. You need two GitHub secrets set up once: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. **Check the sites:** open `microfree.store` and a few subdomains, such as `pdftools.microfree.store`.
5. **Google Search Console:** add a **Domain property** for `microfree.store` (verified through DNS in Cloudflare). This one property covers every subdomain. Submit `https://microfree.store/sitemap.xml` and each tool's sitemap, such as `https://pdftools.microfree.store/sitemap.xml`. Indexing usually takes 1–3 weeks.
6. **Apply for AdSense** at https://adsense.google.com and add the site `microfree.store`. Add only the root domain; AdSense automatically covers its subdomains. Google gives you a publisher ID like `ca-pub-1234567890123456`.
7. **Add your ID:** in GitHub, go to the repo → Settings → Secrets and variables → Actions and add the secret `ADSENSE_PUB_ID` = `ca-pub-…`. Then go to the Actions tab → Deploy to Cloudflare Pages → Run workflow. This adds the AdSense code to all 21 sites and creates `microfree.store/ads.txt`, which also covers the subdomains.
8. Back in AdSense, **click "Verify"** and then **request review**.
9. **Turn on the GDPR consent message:** in AdSense, go to Privacy & messaging → European regulations message and publish it. Google requires this for visitors from the EEA, the UK and Switzerland.
10. **After approval:** in AdSense, turn on **Auto ads** for the site. The script is already on every page, so no code change is needed.

## Things that improve the odds of approval (you control these)
- Make sure the site is live, loads over https, and has no "under construction" pages.
- Wait until there is some real traffic from Google search before applying.
- Don't click your own ads, and don't ask friends to click them. That gets the account banned.
- If you're rejected, read the reason in the email, fix it, and request review again. The most common reasons are "low value content" and "site not ready". The text added here targets both.
