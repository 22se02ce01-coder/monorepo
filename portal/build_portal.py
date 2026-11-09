#!/usr/bin/env python3
"""
Generates the static root pages of microfree.store into an output folder:

  /                 homepage (all tools + intro content)
  /about/           About MicroFree
  /privacy-policy/  Privacy Policy (AdSense / cookies / GDPR / CCPA compliant wording)
  /terms/           Terms of Service
  /disclaimer/      Disclaimer
  /contact/         Contact page
  /404.html         Not-found page (Cloudflare Pages serves it automatically)
  /robots.txt, /sitemap.xml, /ads.txt (ads.txt only when a publisher ID is given)

Usage:  python3 portal/build_portal.py <out_dir> [ca-pub-XXXXXXXXXXXXXXXX]
Edit the constants below (SITE_URL, CONTACT_EMAIL) before going live.
"""
import datetime
import html
import os
import shutil
import sys

SITE_URL = "https://microfree.store"
SITE_NAME = "MicroFree"
CONTACT_EMAIL = "contact@microfree.store"   # create this with Cloudflare Email Routing (free)
LAST_UPDATED = "November 9, 2026"

TOOLS = [
    # (slug, name, category, short description)
    ("pdf-tools", "All-in-One PDF Tools", "PDF Tools",
     "Merge, split, rotate, delete pages, add page numbers, watermark, inspect metadata and compress PDFs."),
    ("image-to-pdf", "Image to PDF", "PDF Tools",
     "Combine JPG, PNG and WebP pictures into a single PDF with custom page size, margins and order."),
    ("pdf-to-word", "PDF to Word", "PDF Tools",
     "Extract the text of a PDF into an editable Word (.docx) document while keeping reading order."),
    ("image-compressor", "Image Compressor", "Image Tools",
     "Shrink JPG, PNG and WebP files with adjustable quality or a target size in KB, in batches."),
    ("image-resizer", "Image Resizer", "Image Tools",
     "Resize images by pixels, percentage or social-media presets with aspect-ratio lock."),
    ("image-converter", "Image Converter", "Image Tools",
     "Convert images between JPG, PNG and WebP with transparency handling and quality control."),
    ("json-formatter", "JSON Formatter & Validator", "Developer Tools",
     "Beautify, minify and validate JSON with syntax highlighting and exact line/column errors."),
    ("base64-tools", "Base64 Encoder & Decoder", "Developer Tools",
     "Encode and decode Base64 text and images with Unicode support and URL-safe output."),
    ("jwt-decoder", "JWT Decoder", "Developer Tools",
     "Decode JSON Web Token headers and payloads, read claims and check expiry times."),
    ("developer-toolbox", "Developer Toolbox", "Developer Tools",
     "URL encoding, HTML/CSS/JS/XML formatting, UUIDs, timestamps, regex testing, colors and more."),
    ("percentage-calculator", "Percentage Calculator", "Calculators",
     "Eight percentage calculators: percent of a number, change, difference, reverse, discount and tax."),
    ("age-calculator", "Age Calculator", "Calculators",
     "Exact age in years, months and days, total days lived and a countdown to your next birthday."),
    ("emi-calculator", "Loan EMI Calculator", "Calculators",
     "Monthly EMI, total interest and a full amortization schedule for home, car and personal loans."),
    ("gst-calculator", "GST Calculator", "Calculators",
     "Add or remove GST at any rate with a full CGST, SGST and IGST breakdown."),
    ("qr-generator", "QR Code Generator", "Everyday Utilities",
     "Create QR codes for links, text, Wi-Fi, email, phone, SMS and contact cards as PNG or SVG."),
    ("password-generator", "Password Generator", "Everyday Utilities",
     "Generate strong random passwords with the Web Crypto API and a live strength meter."),
    ("text-converter", "Text Case Converter", "Everyday Utilities",
     "Change text case, convert to camelCase or snake_case, and count words, characters and lines."),
    ("unit-converter", "Unit Converter", "Everyday Utilities",
     "Convert length, weight, temperature, area, volume, speed, data, energy and pressure units."),
    ("currency-converter", "Currency Converter", "Everyday Utilities",
     "Convert between 20+ world currencies using regularly updated reference exchange rates."),
    ("time-zone-converter", "Time Zone Converter", "Everyday Utilities",
     "Compare times across world cities with daylight-saving-aware offsets and a live world clock."),
]
import json as _json
_SITES = _json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scripts", "sites.json")))
TOOL_URL = {x["slug"]: f"https://{x['domain']}/" for x in _SITES["sites"]}


def turl(slug):
    """Public URL of a tool (each tool lives on its own subdomain)."""
    return TOOL_URL[slug]


CATEGORIES = ["PDF Tools", "Image Tools", "Developer Tools", "Calculators", "Everyday Utilities"]

CSS = """
:root{--brand:#2563eb;--brand-d:#1d4ed8;--ink:#0f172a;--text:#334155;--muted:#64748b;--line:#e2e8f0;--bg:#f8fafc;--card:#fff;--soft:#eef6ff}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--text);background:var(--bg);line-height:1.65;font-size:16px}
a{color:var(--brand)}a:hover{color:var(--brand-d)}
img{max-width:100%;height:auto}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
header.site{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
header.site .wrap{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
header.site img{height:40px;width:auto;mix-blend-mode:multiply}
header.site nav{display:flex;gap:18px;flex-wrap:wrap;font-size:14px;font-weight:500}
header.site nav a{color:var(--text);text-decoration:none}header.site nav a:hover{color:var(--brand)}
.hero{padding:56px 0 32px;text-align:center}
.hero h1{font-size:clamp(28px,5vw,44px);line-height:1.15;color:var(--ink);margin:0 0 14px;font-weight:800;letter-spacing:-.02em}
.hero p{max-width:720px;margin:0 auto;font-size:18px;color:var(--muted)}
.badges{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:20px}
.badge{background:var(--soft);color:var(--brand-d);border:1px solid #d9eaff;border-radius:999px;padding:4px 12px;font-size:13px;font-weight:600}
h2{color:var(--ink);font-size:26px;line-height:1.25;margin:44px 0 14px;font-weight:800;letter-spacing:-.01em}
h3{color:var(--ink);font-size:19px;margin:28px 0 8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.card{display:block;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;text-decoration:none;color:var(--text);transition:border-color .15s,box-shadow .15s}
.card:hover{border-color:#8cc2fd;box-shadow:0 6px 20px rgba(15,23,42,.07);color:var(--text)}
.card strong{display:block;color:var(--ink);font-size:16px;margin-bottom:4px}
.card span{font-size:14px;color:var(--muted)}
.prose{max-width:780px}
.prose p,.prose li{font-size:16px}
.page{padding:40px 0 64px}
.page h1{color:var(--ink);font-size:clamp(28px,4vw,38px);margin:0 0 6px;font-weight:800}
.updated{color:var(--muted);font-size:14px;margin:0 0 24px}
.box{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 22px;margin:20px 0}
details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin:10px 0}
summary{cursor:pointer;font-weight:600;color:var(--ink)}
details p{margin:10px 0 0}
footer.site{border-top:1px solid var(--line);background:#fff;margin-top:40px;padding:36px 0;font-size:14px;color:var(--muted)}
footer.site .cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px}
footer.site h4{color:var(--ink);font-size:12px;text-transform:uppercase;letter-spacing:.06em;margin:0 0 10px}
footer.site ul{list-style:none;margin:0;padding:0}footer.site li{margin:6px 0}
footer.site a{color:var(--muted);text-decoration:none}footer.site a:hover{color:var(--ink)}
footer.site .copy{border-top:1px solid var(--line);margin-top:28px;padding-top:18px}
@media (max-width:640px){header.site nav{display:none}.hero{padding-top:36px}}
"""


def esc(s):
    return html.escape(s, quote=True)


def head(title, description, path, extra=""):
    url = SITE_URL + path
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="{url}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{url}" />
<meta property="og:title" content="{esc(title)}" />
<meta property="og:description" content="{esc(description)}" />
<meta property="og:image" content="{SITE_URL}/MicroFreeLogo.png" />
<meta property="og:site_name" content="{SITE_NAME}" />
<meta name="theme-color" content="#2563eb" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/MicroFreeLogo.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<!--ADSENSE_HEAD-->
<style>{CSS}</style>
{extra}
</head>
<body>
<header class="site"><div class="wrap">
<a href="/" aria-label="MicroFree home"><img src="/MicroFreeLogo.png" alt="MicroFree" width="120" height="40" /></a>
<nav aria-label="Main">
<a href="/#pdf-tools">PDF</a><a href="/#image-tools">Images</a><a href="/#developer-tools">Developer</a>
<a href="/#calculators">Calculators</a><a href="/#everyday-utilities">Utilities</a><a href="/about/">About</a><a href="/contact/">Contact</a>
</nav></div></header>
"""


def footer():
    cols = []
    for cat in CATEGORIES:
        links = "".join(f'<li><a href="{turl(s)}">{esc(n)}</a></li>' for s, n, c, _ in TOOLS if c == cat)
        cols.append(f"<div><h4>{esc(cat)}</h4><ul>{links}</ul></div>")
    year = datetime.date.today().year
    return f"""<footer class="site"><div class="wrap">
<div class="cols">{''.join(cols)}
<div><h4>Company</h4><ul>
<li><a href="/about/">About MicroFree</a></li><li><a href="/contact/">Contact Us</a></li>
<li><a href="/privacy-policy/">Privacy Policy</a></li><li><a href="/terms/">Terms of Service</a></li>
<li><a href="/disclaimer/">Disclaimer</a></li></ul></div>
</div>
<p class="copy">&copy; {year} {SITE_NAME}. Free online tools that run in your browser.</p>
</div></footer>
</body>
</html>
"""


def anchor(cat):
    return cat.lower().replace(" ", "-")


def page_home():
    sections = []
    for cat in CATEGORIES:
        cards = "".join(
            f'<a class="card" href="{turl(s)}"><strong>{esc(n)}</strong><span>{esc(d)}</span></a>'
            for s, n, c, d in TOOLS if c == cat)
        sections.append(f'<section id="{anchor(cat)}"><h2>{esc(cat)}</h2><div class="grid">{cards}</div></section>')

    faqs = [
        ("Are MicroFree tools really free?",
         "Yes. Every tool on MicroFree is free to use with no account, no watermark and no daily limit. "
         "The site is supported by advertising, which is why you may see ads on some pages."),
        ("Do you upload my files?",
         "No. The PDF, image, text, developer and calculator tools process your data with JavaScript inside your "
         "own browser. Your files are not sent to a MicroFree server. The currency converter is the one exception "
         "that contacts an outside service: it downloads public exchange rates, but it never sends your amounts."),
        ("Do the tools work on phones?",
         "Yes. Every page is responsive and works in current versions of Chrome, Safari, Edge and Firefox on "
         "Android, iOS, Windows, macOS and Linux. Very large PDFs or images may be slower on older phones "
         "because the work happens on your device."),
        ("Is there a file size limit?",
         "There is no upload limit because nothing is uploaded. The practical limit is the memory available "
         "to your browser. Most documents and photos are processed in a few seconds."),
        ("Can I use the results commercially?",
         "Yes. The files and results you create belong to you. Please read our Terms of Service and only "
         "process content you have the right to use."),
        ("How do I report a bug or suggest a tool?",
         f"Email us at {CONTACT_EMAIL} or use the Contact page. We read every message and use feedback to "
         "decide which tools to improve or add next."),
    ]
    faq_html = "".join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in faqs)
    import json
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "WebSite", "name": SITE_NAME, "url": SITE_URL + "/"},
            {"@type": "Organization", "name": SITE_NAME, "url": SITE_URL + "/",
             "logo": SITE_URL + "/MicroFreeLogo.png", "email": CONTACT_EMAIL},
            {"@type": "FAQPage", "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]},
        ],
    }
    extra = f'<script type="application/ld+json">{json.dumps(ld)}</script>'

    body = f"""<main>
<section class="hero"><div class="wrap">
<h1>Free online tools for PDFs, images, developers and everyday maths</h1>
<p>MicroFree is a collection of {len(TOOLS)} fast, free web tools. Most of them run entirely inside your browser, so your files stay on your device.</p>
<div class="badges"><span class="badge">No sign-up</span><span class="badge">No watermarks</span><span class="badge">Files stay on your device</span><span class="badge">Works on mobile</span></div>
</div></section>
<div class="wrap">
{''.join(sections)}
<section class="prose">
<h2>Why we built MicroFree</h2>
<p>Most "free" online converters work by uploading your file to a server, processing it there and sending a result back. That is slow on poor connections, it often comes with file-size limits or watermarks, and it means a copy of your bank statement, ID scan or private photo sits on someone else's computer. Modern browsers are powerful enough to do this work themselves, so we built tools that do exactly that.</p>
<p>When you merge a PDF, compress a photo or format a JSON file on MicroFree, the work is done by JavaScript running in your own browser tab. You can check this yourself: once a tool page has loaded, you can disconnect from the internet and most tools will keep working.</p>
<h3>What you can do here</h3>
<ul>
<li><strong>PDF tools</strong> let you merge reports, split long documents, rotate scanned pages, add page numbers or watermarks, turn photos into a PDF and pull the text out of a PDF into Word.</li>
<li><strong>Image tools</strong> help you compress photos for email or websites, resize pictures to the exact size a form or social network needs, and convert between JPG, PNG and WebP.</li>
<li><strong>Developer tools</strong> cover the jobs programmers do every day: formatting and validating JSON, Base64 encoding, decoding JWTs, testing regular expressions, generating UUIDs and converting timestamps.</li>
<li><strong>Calculators</strong> work out percentages, exact age, loan EMIs with a full repayment schedule, and GST with a CGST/SGST/IGST split.</li>
<li><strong>Everyday utilities</strong> generate QR codes and secure passwords, change text case, and convert units, currencies and time zones.</li>
</ul>
<h3>How to choose the right tool</h3>
<p>If you need to send a document by email and it is too large, start with the <a href="{turl("image-compressor")}">Image Compressor</a> for photos or the compress option in <a href="{turl("pdf-tools")}">PDF Tools</a> for PDFs. If a government or job portal asks for a photo of a specific size, use the <a href="{turl("image-resizer")}">Image Resizer</a> and then the compressor to reach the required KB. If you have several phone photos of a document, the <a href="{turl("image-to-pdf")}">Image to PDF</a> tool turns them into one tidy file.</p>
<p>Planning a loan? The <a href="{turl("emi-calculator")}">EMI Calculator</a> shows how much of each payment goes to interest and how the balance falls over time. Running a small business in India? The <a href="{turl("gst-calculator")}">GST Calculator</a> adds or removes tax and splits it into central and state components.</p>
<h2>Frequently asked questions</h2>
{faq_html}
</section>
</div>
</main>
"""
    return head("Free Online PDF, Image, Developer & Calculator Tools | MicroFree",
                f"{len(TOOLS)} free online tools that run in your browser: PDF merge and split, image compressor and resizer, "
                "JSON formatter, EMI and GST calculators, QR code and password generators. No sign-up, no uploads.",
                "/", extra) + body + footer()


def simple_page(path, title, description, h1, inner, updated=True):
    upd = f'<p class="updated">Last updated: {LAST_UPDATED}</p>' if updated else ""
    body = f'<main class="page"><div class="wrap prose"><h1>{esc(h1)}</h1>{upd}{inner}</div></main>'
    return head(title, description, path) + body + footer()


def page_about():
    tool_list = "".join(f'<li><a href="{turl(s)}">{esc(n)}</a> – {esc(d)}</li>' for s, n, c, d in TOOLS)
    inner = f"""
<p>MicroFree is an independent website that offers {len(TOOLS)} free online tools for working with PDFs and images, everyday calculations, and common developer tasks. Our aim is simple: tools that are quick to open, easy to understand and respectful of your privacy.</p>
<h2>Our approach</h2>
<p>Most of our tools are built so that your data is processed inside your own web browser, not on our servers. When you compress an image or merge a PDF, the file is read and changed by code running on your device. We never receive a copy. This keeps the tools fast, works on slow connections and protects sensitive documents.</p>
<p>We keep every tool focused on one job, explain clearly what it does and what its limits are, and include a short guide and answers to common questions on each page so you can get a correct result the first time.</p>
<h2>How MicroFree is funded</h2>
<p>MicroFree is free to use. To pay for hosting, the domain and development time, we show advertisements served by Google AdSense. Ads are clearly marked and kept away from buttons and download links so they do not get in the way of the tools. You can read how advertising cookies work in our <a href="/privacy-policy/">Privacy Policy</a>.</p>
<h2>Accuracy and responsibility</h2>
<p>We test our calculators against standard formulas and our converters against common file types. Even so, results such as loan EMIs, GST amounts or currency conversions are estimates for information purposes. Please read our <a href="/disclaimer/">Disclaimer</a> before relying on a result for financial, legal or tax decisions.</p>
<h2>Our tools</h2>
<ul>{tool_list}</ul>
<h2>Get in touch</h2>
<p>We welcome bug reports, feature ideas and suggestions for new tools. Email us at <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a> or visit our <a href="/contact/">Contact page</a>.</p>
"""
    return simple_page("/about/", "About MicroFree – Free, Private Online Tools",
                       "Learn who runs MicroFree, how our free browser-based tools protect your privacy and how the site is funded.",
                       "About MicroFree", inner, updated=False)


def page_privacy():
    inner = f"""
<p>This Privacy Policy explains what information is collected when you use {SITE_NAME} ("we", "us", "our") at <a href="{SITE_URL}/">{SITE_URL.replace('https://', '')}</a>, how it is used, and the choices you have. By using the website you agree to this policy.</p>

<h2>1. Files and data you process with our tools</h2>
<p>Our PDF, image, text, developer and calculator tools run in your web browser. Files you select and text you type are processed on your device using JavaScript and standard browser features such as Canvas and the Web Crypto API. <strong>They are not uploaded to or stored on our servers</strong>, and we cannot see them.</p>
<p>Some tools save small settings or history in your browser's local storage (for example, recent conversions in the Currency Converter) so they are there when you return. This data stays on your device and you can delete it at any time by clearing your browser's site data.</p>

<h2>2. Information collected automatically</h2>
<p>Like almost every website, our hosting provider (Cloudflare) automatically processes technical information when your browser requests a page, such as your IP address, browser type, device type, referring page, and the date and time of the request. This information is used to deliver the website, keep it secure, prevent abuse and produce aggregated, anonymous traffic statistics. We do not use it to identify you personally.</p>

<h2>3. Advertising and cookies (Google AdSense)</h2>
<p>We use Google AdSense to show advertisements. Google and its partners are third-party vendors that use cookies and similar technologies to serve ads on this site based on your previous visits to this and other websites.</p>
<ul>
<li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.</li>
<li>You may opt out of personalised advertising by visiting Google <a href="https://adssettings.google.com" rel="nofollow noopener" target="_blank">Ads Settings</a>. You can also opt out of some third-party vendors' use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" rel="nofollow noopener" target="_blank">www.aboutads.info</a> or, in Europe, <a href="https://www.youronlinechoices.eu/" rel="nofollow noopener" target="_blank">www.youronlinechoices.eu</a>.</li>
<li>Learn more about how Google uses information from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener" target="_blank">policies.google.com/technologies/partner-sites</a>.</li>
<li>Other third-party vendors and ad networks may also serve ads through Google AdSense. A list of these partners is available in your Google ad settings.</li>
</ul>
<p>If you visit from the European Economic Area, the United Kingdom or Switzerland, we will ask for your consent before personalised ads or non-essential cookies are used, through a consent message provided by Google. You can change or withdraw your consent at any time using the privacy settings link shown on the site.</p>

<h2>4. Third-party services</h2>
<ul>
<li><strong>Google Fonts</strong> – we load the Inter font from Google's servers, which receives your IP address to deliver the font file.</li>
<li><strong>Exchange-rate data</strong> – the Currency Converter downloads public exchange rates from open.er-api.com. Only a request for the rate list is made; the amounts you enter are never sent.</li>
<li><strong>Cloudflare</strong> – provides hosting, content delivery and security for this website.</li>
</ul>
<p>These providers process data under their own privacy policies.</p>

<h2>5. Cookies you can control</h2>
<p>Most browsers let you block or delete cookies in their settings. If you block advertising cookies, you will still see ads, but they will be less relevant. Our tools will continue to work without cookies.</p>

<h2>6. Your rights (GDPR and CCPA)</h2>
<p>Depending on where you live, you may have the right to access, correct or delete personal data held about you, to object to or restrict processing, and to withdraw consent. California residents have the right to know what personal information is collected and to opt out of the "sale" or "sharing" of personal information for cross-context behavioural advertising. Because we do not hold accounts or files, we hold very little information that can identify you. To make a request, email <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p>

<h2>7. Children's privacy</h2>
<p>MicroFree is not directed to children under 13 (or under 16 in the EEA), and we do not knowingly collect personal information from them. If you believe a child has provided personal information, contact us and we will delete it.</p>

<h2>8. Data security</h2>
<p>The site is served only over encrypted HTTPS. Because tool data is processed on your own device, it is never exposed to our servers.</p>

<h2>9. Changes to this policy</h2>
<p>We may update this policy from time to time. The "Last updated" date at the top shows when it was last changed. Significant changes will be highlighted on this page.</p>

<h2>10. Contact</h2>
<p>Questions about this Privacy Policy can be sent to <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p>
"""
    return simple_page("/privacy-policy/", "Privacy Policy | MicroFree",
                       "How MicroFree handles your data: in-browser processing, cookies, Google AdSense advertising, third-party services and your privacy rights.",
                       "Privacy Policy", inner)


def page_terms():
    inner = f"""
<p>These Terms of Service ("Terms") govern your use of {SITE_NAME} at {SITE_URL.replace('https://', '')} (the "Service"). By using the Service you agree to these Terms. If you do not agree, please do not use the Service.</p>
<h2>1. Use of the Service</h2>
<p>MicroFree provides free online tools for personal and commercial use. You may use the tools as long as you follow these Terms and all applicable laws.</p>
<h2>2. Acceptable use</h2>
<p>You agree not to:</p>
<ul>
<li>process content that you do not have the right to use, or that infringes copyright, trademarks or other rights;</li>
<li>use the Service for any unlawful, fraudulent or harmful purpose;</li>
<li>attempt to disrupt, overload, reverse-engineer for malicious purposes or gain unauthorised access to the Service or its infrastructure;</li>
<li>use automated means to access the Service in a way that places an unreasonable load on it;</li>
<li>click on advertisements artificially or encourage others to do so.</li>
</ul>
<h2>3. Your content</h2>
<p>You keep all rights to the files and data you process. Because most tools run in your browser, we do not receive or store your content. You are responsible for keeping your own copies of important files.</p>
<h2>4. Intellectual property</h2>
<p>The MicroFree name, logo, website design, text and code are owned by MicroFree and protected by law. You may not copy or redistribute the website itself without permission.</p>
<h2>5. Advertising</h2>
<p>The Service is supported by third-party advertising, including Google AdSense. We are not responsible for the content of advertisements or the products and websites they link to.</p>
<h2>6. No warranty</h2>
<p>The Service is provided "as is" and "as available" without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy or uninterrupted availability. Results from calculators and converters are provided for information only. See our <a href="/disclaimer/">Disclaimer</a>.</p>
<h2>7. Limitation of liability</h2>
<p>To the maximum extent permitted by law, MicroFree is not liable for any indirect, incidental, special or consequential damages, or for any loss of data, profits or business, arising from your use of or inability to use the Service.</p>
<h2>8. Third-party links</h2>
<p>The Service may contain links to third-party websites. We do not control and are not responsible for their content or practices.</p>
<h2>9. Changes</h2>
<p>We may change these Terms or modify, suspend or discontinue any tool at any time. Continued use of the Service after changes are posted means you accept the updated Terms.</p>
<h2>10. Contact</h2>
<p>Questions about these Terms can be sent to <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p>
"""
    return simple_page("/terms/", "Terms of Service | MicroFree",
                       "The terms that apply when you use MicroFree's free online PDF, image, developer and calculator tools.",
                       "Terms of Service", inner)


def page_disclaimer():
    inner = f"""
<p>The information and tools on {SITE_NAME} are provided in good faith for general information and productivity purposes only.</p>
<h2>Calculators and financial tools</h2>
<p>The EMI, GST, percentage, age and currency tools use standard published formulas, but results are estimates. Actual loan repayments depend on your lender's terms, processing fees, rounding and repayment dates. Tax treatment depends on current law, the classification of goods and services and your registration status. Exchange rates are indicative reference rates and differ from the rates offered by banks and payment providers. <strong>Nothing on this website is financial, tax, legal or investment advice.</strong> Please consult a qualified professional before making decisions.</p>
<h2>File conversion tools</h2>
<p>Converted, compressed or edited files may differ from the original in layout, quality or formatting. For example, converting a PDF to Word extracts text and may not keep complex layouts, and compressing an image reduces its quality. Always keep a copy of your original files and check the result before using it.</p>
<h2>Developer tools</h2>
<p>Developer utilities such as the JWT decoder only decode data; they do not verify signatures or prove that data is trustworthy. Do not rely on them for security decisions.</p>
<h2>Advertising and external links</h2>
<p>This site displays third-party advertisements and may link to external websites. We do not endorse and are not responsible for the products, services or content of advertisers or linked sites.</p>
<h2>Errors and availability</h2>
<p>We try to keep the tools accurate and available, but we make no guarantee that they are error-free or always online. If you find a mistake, please tell us at <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p>
"""
    return simple_page("/disclaimer/", "Disclaimer | MicroFree",
                       "Important information about the accuracy and limits of MicroFree calculators, converters and developer tools.",
                       "Disclaimer", inner)


def page_contact():
    inner = f"""
<p>We'd love to hear from you. Whether you found a bug, want a new feature, need help with a tool or have a business enquiry, the quickest way to reach us is by email.</p>
<div class="box">
<h2 style="margin-top:0">Email</h2>
<p style="font-size:18px;margin:0"><a href="mailto:{CONTACT_EMAIL}"><strong>{CONTACT_EMAIL}</strong></a></p>
<p style="margin-bottom:0">We usually reply within 2 working days.</p>
</div>
<h2>Help us help you</h2>
<p>When reporting a problem, please include:</p>
<ul>
<li>the name of the tool and the page address;</li>
<li>your browser and device (for example, Chrome on Android or Safari on iPhone);</li>
<li>what you expected to happen and what happened instead.</li>
</ul>
<p>Please do not email us confidential documents. Our tools work on your device, so we never need your files to help you.</p>
<h2>Privacy and data requests</h2>
<p>For questions about privacy or to exercise your data rights, email us with the subject "Privacy request". See our <a href="/privacy-policy/">Privacy Policy</a> for details.</p>
<h2>Advertising and partnerships</h2>
<p>For partnership enquiries, email us with the subject "Partnership".</p>
"""
    return simple_page("/contact/", "Contact Us | MicroFree",
                       "Contact the MicroFree team to report a bug, request a feature or ask about privacy and partnerships.",
                       "Contact Us", inner, updated=False)


def page_404():
    inner = '<p>Sorry, we couldn\'t find that page. It may have moved, or the address may be mistyped.</p><p><a href="/">Go to the homepage</a> to browse all tools.</p>'
    return head("Page not found | MicroFree", "The page you requested could not be found.", "/404.html").replace(
        '<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex" />'
    ) + f'<main class="page"><div class="wrap prose"><h1>Page not found</h1>{inner}</div></main>' + footer()


def write(out, rel, content):
    p = os.path.join(out, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    out = sys.argv[1]
    pub = sys.argv[2] if len(sys.argv) > 2 else ""
    here = os.path.dirname(os.path.abspath(__file__))
    tools_root = os.path.dirname(here)

    write(out, "index.html", page_home())
    write(out, "about/index.html", page_about())
    write(out, "privacy-policy/index.html", page_privacy())
    write(out, "terms/index.html", page_terms())
    write(out, "disclaimer/index.html", page_disclaimer())
    write(out, "contact/index.html", page_contact())
    write(out, "404.html", page_404())

    shutil.copy(os.path.join(here, "MicroFreeLogo.png"), os.path.join(out, "MicroFreeLogo.png"))
    shutil.copy(os.path.join(tools_root, "07-JSON-Formatter", "public", "favicon.svg"), os.path.join(out, "favicon.svg"))

    write(out, "robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n")
    today = datetime.date.today().isoformat()
    urls = ["/", "/about/", "/contact/", "/privacy-policy/", "/terms/", "/disclaimer/"]
    entries = "".join(
        f"  <url><loc>{SITE_URL}{u}</loc><lastmod>{today}</lastmod><priority>{'1.0' if u == '/' else '0.3'}</priority></url>\n"
        for u in urls)
    write(out, "sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{entries}</urlset>\n')

    if pub:
        pub_num = pub.replace("ca-", "")
        write(out, "ads.txt", f"google.com, {pub_num}, DIRECT, f08c47fec0942fa0\n")
    print(f"Portal pages written to {out}")


if __name__ == "__main__":
    main()
