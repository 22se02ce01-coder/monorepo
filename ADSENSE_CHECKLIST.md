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
3. **Build:** run `bash build-deploy.sh`.
4. **Deploy:** in Cloudflare, go to Workers & Pages → Create → Pages → Upload assets and upload the `deploy` folder. Then add the custom domain `microfree.store`.
   - Or run: `npx wrangler pages deploy deploy --project-name microfree`
5. **Google Search Console:** add `microfree.store`, submit `https://microfree.store/sitemap.xml`, and wait until the pages are indexed (usually 1–3 weeks).
6. **Apply for AdSense** at https://adsense.google.com and add the site `microfree.store`. Google gives you a publisher ID like `ca-pub-1234567890123456`.
7. **Rebuild with your ID and redeploy:**
   ```
   bash build-deploy.sh ca-pub-1234567890123456
   ```
   This adds the AdSense code to every page and creates `/ads.txt`.
8. Back in AdSense, **click "Verify"** and then **request review**.
9. **Turn on the GDPR consent message:** in AdSense, go to Privacy & messaging → European regulations message and publish it. Google requires this for visitors from the EEA, the UK and Switzerland.
10. **After approval:** in AdSense, turn on **Auto ads** for the site. The script is already on every page, so no code change is needed.

## Things that improve the odds of approval (you control these)
- Make sure the site is live, loads over https, and has no "under construction" pages.
- Wait until there is some real traffic from Google search before applying.
- Don't click your own ads, and don't ask friends to click them. That gets the account banned.
- If you're rejected, read the reason in the email, fix it, and request review again. The most common reasons are "low value content" and "site not ready". The text added here targets both.
