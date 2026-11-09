import React from 'react';
import { Zap, QrCode, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pick a Content Type',
      desc: 'Choose what the code should carry: a web link, plain text, email, phone, SMS, Wi-Fi login, or a contact card.',
    },
    {
      step: '02',
      title: 'Fill In & Style',
      desc: 'Enter your details, then adjust the colors, pixel size, and error-correction level to match your brand.',
    },
    {
      step: '03',
      title: 'Download PNG or SVG',
      desc: 'Preview updates instantly. Export a crisp PNG for digital use or a scalable SVG for print and large formats.',
    },
  ];

  const faqs = [
    {
      q: "What is the error-correction level and which should I choose?",
      a: "Error correction lets a QR code still scan when part of it is dirty, scratched or obscured. Level L can recover about 7% of the code, M about 15%, Q about 25% and H about 30%. Higher levels make the pattern denser, so M is a good default for screens and clean prints, while Q or H suits codes that will be printed small, used outdoors or handled a lot.",
    },
    {
      q: "Do the Wi-Fi and contact QR codes really work?",
      a: "Yes. The Wi-Fi code uses the widely supported WIFI: format that the built-in camera apps on most modern iPhone and Android phones recognise, offering to join the network. The contact code uses the vCard 3.0 format, which phones offer to save to the address book. Very old devices may need a separate scanner app.",
    },
    {
      q: "Do these QR codes expire or track scans?",
      a: "No. These are static QR codes: your link or text is encoded directly into the pattern, with no redirect service in between. They keep working for as long as the content they point to exists, and no scan data is collected. The flip side is that you cannot edit the destination after printing; you would need to generate a new code.",
    },
    {
      q: "Should I download PNG or SVG?",
      a: "PNG is a pixel image at the size you choose with the slider (120 to 800 pixels), ideal for websites, documents and messaging. SVG is a vector file that stays perfectly sharp at any size, so it is the better choice for printing, signage and design software.",
    },
    {
      q: "How much data can a QR code hold?",
      a: "The QR standard allows up to roughly 2,900 bytes of binary data at the lowest error-correction level, and less at higher levels. In practice, shorter content is better: a short URL produces a simpler pattern that scans faster and more reliably. If your input is too long, the tool shows an error instead of a code.",
    },
    {
      q: "Why does my code fail to scan sometimes?",
      a: "The most common causes are low contrast between the foreground and background colours, a code printed too small for the scanning distance, not enough blank space around the code, glare on glossy surfaces, or a very dense pattern from long content. The tool warns you when colour contrast is too low; keeping the code dark-on-light gives the most reliable results.",
    },
    {
      q: "Can I use custom colours?",
      a: "Yes. You can pick any foreground and background colour. Keep the foreground clearly darker than the background, because many scanners struggle with light-on-dark (inverted) codes and with low-contrast colour combinations. A warning appears if the contrast ratio drops too low.",
    },
    {
      q: "Is it safe to put my Wi-Fi password in a QR code?",
      a: "The password is stored in the code in readable form, so anyone who scans it, or photographs it, can see and use it. That is fine for a guest network displayed at home or in a café, but avoid publicly displaying codes for private networks. The code is generated on your device and the password is never sent to us.",
    },
    {
      q: "Can I use the QR codes commercially?",
      a: "Yes. The codes you create are yours to use on menus, packaging, flyers, business cards or websites. There is no watermark and no attribution required. Always test a printed sample with a few different phones before a large print run.",
    },
    {
      q: "Is my data sent anywhere?",
      a: "No. Every QR code is rendered locally in your browser. The text, Wi-Fi password or contact details you type never leave your device and are not stored on any server.",
    },
  ];

  const h3 = 'text-lg font-bold text-slate-900 mt-8 mb-3';
  const p = 'text-base text-slate-700 leading-relaxed mb-4';
  const ul = 'list-disc pl-6 space-y-2 text-base text-slate-700 leading-relaxed mb-4';

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Instant, Scannable QR Codes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Create a QR Code Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Turn links, Wi-Fi logins, and contact cards into a scannable code in three quick steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-brand-200 hover:shadow-elevated transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-brand-600 font-mono">{s.step}</span>
                <QrCode className="h-6 w-6 text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div className="text-sm text-blue-900 space-y-1">
          <h4 className="font-bold text-sm text-blue-950">Generated Privately on Your Device</h4>
          <p>
            Your URLs, network passwords, and contact details are encoded entirely in your browser. Nothing you enter is uploaded, logged, or shared — the finished PNG or SVG is built on your own machine.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          A Practical Guide to QR Codes
        </h2>
        <p className={p}>
          A QR (Quick Response) code is a two-dimensional barcode made of black and white squares called
          modules. Unlike a traditional barcode, which stores a short number in one direction, a QR code stores
          information both horizontally and vertically, so it can hold a full web address, a block of text or a
          set of contact details. Phone cameras can read them in a fraction of a second, which is why they now
          appear on restaurant menus, product packaging, posters, tickets and business cards.
        </p>

        <h3 className={h3}>What is inside a QR code</h3>
        <p className={p}>
          The three large squares in the corners are finder patterns that tell the scanner where the code is
          and which way up it is. Smaller alignment and timing patterns help it correct for angle and distortion.
          The rest of the grid holds your data plus extra error-correction data. The more you encode, and the
          higher the error-correction level, the more modules the code needs, and the finer the pattern becomes
          at a given size.
        </p>

        <h3 className={h3}>Content types this generator supports</h3>
        <ul className={ul}>
          <li><strong>URL</strong> opens a web page. Include the full address, starting with https://.</li>
          <li><strong>Text</strong> displays any plain text, such as a serial number, a short note or instructions.</li>
          <li><strong>Email</strong> opens a new email to the recipient, with an optional subject and message filled in.</li>
          <li><strong>Phone</strong> offers to call the number. Use the international format, such as +91 or +44, if the code may be scanned abroad.</li>
          <li><strong>SMS</strong> starts a text message to a number, optionally with the message pre-written.</li>
          <li><strong>Wi-Fi</strong> lets guests join a network without typing the password. Choose WPA/WPA2, WEP or no password, and tick “Hidden network” if your network does not broadcast its name.</li>
          <li><strong>Contact</strong> creates a vCard with name, phone, email, organisation, job title and website that can be saved straight to the address book.</li>
        </ul>

        <h3 className={h3}>Choosing an error-correction level</h3>
        <p className={p}>
          QR codes use Reed–Solomon error correction, the same family of techniques used on CDs, so a code can
          still be read when part of it is damaged. Level L restores about 7% of the code, M about 15%, Q about
          25% and H about 30%. The trade-off is density: a higher level adds more modules, which means smaller
          squares at the same printed size. For a short link shown on a screen, L or M is plenty. For stickers,
          outdoor signs or packaging that may get scuffed, Q or H is safer.
        </p>

        <h3 className={h3}>Size, colour and printing tips</h3>
        <ul className={ul}>
          <li>
            <strong>Print it large enough.</strong> A code that is easy to scan from a hand’s length may be
            impossible from across a room. A common rule of thumb is to make the code at least one-tenth of the
            expected scanning distance in width, and to test it at that distance.
          </li>
          <li>
            <strong>Use SVG for print.</strong> Vector files stay sharp at any size, whereas enlarging a small PNG
            makes the edges blurry.
          </li>
          <li>
            <strong>Keep it dark on light.</strong> Strong contrast is the single biggest factor in reliable
            scanning. Light-on-dark codes and pastel combinations fail on many phones.
          </li>
          <li>
            <strong>Leave clear space around it.</strong> The generator adds a white border, but avoid placing the
            code right up against text, images or the edge of a page.
          </li>
          <li>
            <strong>Shorter content scans better.</strong> A short URL creates a simpler, chunkier pattern than a
            long tracking link.
          </li>
          <li>
            <strong>Test before you print.</strong> Scan the downloaded file with at least two different phones,
            and check that the link opens the right page.
          </li>
        </ul>

        <h3 className={h3}>Common mistakes</h3>
        <ul className={ul}>
          <li>Typos in the URL, which are permanent once printed because static codes cannot be edited.</li>
          <li>Linking to a page that later moves or is taken down, leaving a broken code on printed material.</li>
          <li>Stretching the image unevenly, which distorts the square grid.</li>
          <li>Printing on curved, glossy or reflective surfaces without testing for glare.</li>
          <li>Displaying a private Wi-Fi password in a public place.</li>
        </ul>

        <h3 className={h3}>Static codes and their limitations</h3>
        <p className={p}>
          Every code made here is static: the content is encoded directly into the pattern. That means there is
          no subscription, no expiry date and no third-party redirect, and nobody is counting your scans. It also
          means you cannot change the destination or see analytics afterwards. If you need editable links or
          scan statistics, you would need a dynamic QR service, which works by pointing the code at a redirect
          URL it controls. This tool also does not add logos or decorative shapes, which keeps codes as readable
          as possible.
        </p>

        <h3 className={h3}>Privacy and security</h3>
        <p className={p}>
          The code is drawn in your browser using an open-source QR library, and the PNG or SVG file is built on
          your device. Nothing you type, including Wi-Fi passwords and contact details, is uploaded or stored.
          Remember, though, that anything inside a QR code is readable by whoever scans it. Likewise, be cautious
          about scanning codes from unknown sources, and check the address your phone shows before opening it.
        </p>
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-brand-600" />
              </summary>
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
