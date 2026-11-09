import React from 'react';
import {
  UploadCloud,
  Sliders,
  DownloadCloud,
  ShieldCheck,
  Zap,
  Smartphone,
  EyeOff,
  CheckCircle2,
  ChevronDown,
  Layers,
} from 'lucide-react';

/**
 * FAQ content. Keep this list in sync with the FAQPage JSON-LD in index.html:
 * questions and answers there must match this text exactly.
 */
const faqs = [
  {
    q: 'How do I convert images to a PDF?',
    a: 'Drop your JPG, PNG or WebP files onto the upload area, or click it to choose files. Arrange the pages, pick a page size, orientation, image fitting, margin, background colour and output quality, then click Convert to PDF. When the document is ready you can preview it and download it with one click.',
  },
  {
    q: 'Can I combine multiple images into one PDF?',
    a: 'Yes. Select as many images as you like and each one becomes its own page in a single PDF. You can drag thumbnails to reorder them, use the Move Up and Move Down buttons, or sort the whole set by file name (A to Z or Z to A). You can also add more images to the set at any time before converting.',
  },
  {
    q: 'Which image formats are supported?',
    a: 'JPG, JPEG, PNG and WebP. Other formats such as HEIC (the default on many iPhones), GIF, BMP, TIFF and SVG are not accepted, so convert them to JPG or PNG first. WebP images are converted to JPEG during processing because the PDF format cannot store WebP directly.',
  },
  {
    q: 'Is there a file size or image count limit?',
    a: 'Each image can be up to 100 MB. There is no fixed limit on how many images you can add, but everything is processed in your browser, so a very large batch of high-resolution photos can be slow or run out of memory on older phones and laptops. If that happens, convert the images in smaller groups.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. Your images are read, processed and assembled into a PDF entirely inside your browser using JavaScript. They are not sent to MicroFree or any other server, and nothing is kept after you close or reload the page.',
  },
  {
    q: 'Will converting reduce the quality of my images?',
    a: 'It depends on the Output Quality setting. High (about 92%), Balanced (about 80%) and Small File (about 60%) re-encode every image as a JPEG, which reduces file size and can soften fine detail at lower settings. Original keeps unrotated JPG and PNG files exactly as they are; rotated images and WebP files still have to be redrawn, and are saved at very high quality.',
  },
  {
    q: 'What is the difference between Fit to Page, Fill Page and Original Size?',
    a: 'Fit to Page scales the image so the whole picture fits inside the margins, which may leave empty space around it. Fill Page scales the image until the page is fully covered, so parts of the picture that extend past the page edge are cropped. Original Size draws one image pixel as one PDF point (1/72 of an inch) and only shrinks the image if it is too big for the page.',
  },
  {
    q: 'Can I change the page orientation?',
    a: 'Yes. Choose Portrait, Landscape or Auto. Auto picks the orientation for each page separately, so wide images get landscape pages and tall images get portrait pages within the same PDF. When the page size is set to Original, each page simply takes the shape of its image, so the orientation option is not used.',
  },
  {
    q: 'Will the text in my scanned images be searchable in the PDF?',
    a: 'No. The tool places each image on a page as a picture and does not perform OCR (optical character recognition). The PDF will look like your images, but you cannot search or select the text in it unless you run it through a separate OCR tool afterwards.',
  },
  {
    q: 'Is the converter free, and does it work on phones?',
    a: 'Yes, it is free to use with no account and no watermark added to your PDF. It runs in modern browsers on Windows, macOS, Linux, Android and iOS. On touchscreens, where dragging thumbnails can be unreliable, use the Move Up and Move Down buttons to change the page order.',
  },
];

export const SEO: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Images',
      desc: 'Drag and drop your photos into the converter or click the upload area to browse. Supports JPG, JPEG, PNG and WebP files up to 100 MB each.',
      icon: UploadCloud,
    },
    {
      number: '02',
      title: 'Arrange & Configure',
      desc: 'Reorder pages with drag-and-drop or the move buttons, sort by name, rotate sideways photos, and choose page size (A4, A3, Letter, Legal or Original), orientation, fitting, margins and quality.',
      icon: Sliders,
    },
    {
      number: '03',
      title: 'Generate & Download PDF',
      desc: 'Click "Convert to PDF". The document is built locally on your device, then you can preview it and download it with one click.',
      icon: DownloadCloud,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Free, No Account, No Watermark',
      desc: 'Use the converter as often as you like without signing up. Nothing is stamped on your pages.',
    },
    {
      icon: EyeOff,
      title: 'No Image Uploads',
      desc: 'Image processing and PDF assembly happen inside your browser. Your pictures are never sent to a server.',
    },
    {
      icon: Layers,
      title: 'Many Images, One PDF',
      desc: 'Combine a batch of pictures into a single multi-page PDF, one image per page, in exactly the order you choose.',
    },
    {
      icon: Sliders,
      title: 'Practical Layout Controls',
      desc: 'Choose page size, portrait/landscape/auto orientation, fit/fill/original sizing, margins, page background colour and output quality.',
    },
    {
      icon: Smartphone,
      title: 'Works on Desktop and Mobile',
      desc: 'Responsive layout for phones, tablets and computers, with tap-friendly move buttons for reordering on touchscreens.',
    },
    {
      icon: ShieldCheck,
      title: 'JPG, PNG and WebP Support',
      desc: 'JPG and PNG can be embedded unchanged at Original quality; WebP is converted to JPEG automatically so any PDF reader can open it.',
    },
  ];

  const pClass = 'mt-3 text-sm sm:text-base leading-relaxed text-slate-600';
  const h3Class = 'mt-8 text-lg font-bold text-slate-900';
  const ulClass = 'mt-3 space-y-2 text-sm sm:text-base text-slate-600';
  const liClass = 'flex items-start gap-2';
  const bullet = <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-1" />;

  return (
    <div className="w-full space-y-16 py-12">
      {/* 1. How It Works Section */}
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600 border border-brand-200/60">
            Simple 3-Step Process
          </span>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            How to Convert Images to PDF Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Turn photos, scans and screenshots into a single, tidy PDF document.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-subtle hover:shadow-card transition"
              >
                <div className="absolute -top-3.5 left-6 rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-extrabold text-white">
                  {step.number}
                </div>
                <div className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Key Features Grid */}
      <section aria-labelledby="features-heading">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200/60">
            Why Choose MicroFree
          </span>
          <h2
            id="features-heading"
            className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            Built for Privacy, Speed, and Quality
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            The settings you actually need for turning images into a PDF, with no installation or sign-up.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle hover:border-brand-200 transition"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. In-Depth Guide */}
      <section
        aria-labelledby="guide-heading"
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-subtle text-slate-700"
      >
        <article className="max-w-3xl">
          <h2 id="guide-heading" className="text-2xl font-bold text-slate-900">
            A Practical Guide to Turning Images into a PDF
          </h2>
          <p className={pClass}>
            A PDF built from images is simply a document where every page holds one picture. That
            sounds trivial, but it solves a real problem: a folder of loose photos is awkward to email,
            easy to shuffle out of order, and often rejected by upload forms that ask for &ldquo;a
            single PDF file&rdquo;. A PDF keeps the pages in a fixed sequence, opens on practically
            every device, and prints at a predictable paper size. This tool does exactly that job, and
            this guide explains how it works so you can get a clean result the first time.
          </p>

          <h3 className={h3Class}>What happens when you click Convert</h3>
          <p className={pClass}>
            Everything runs inside your browser. When you add files, the page checks that each one is
            a JPG, PNG or WebP image no larger than 100 MB and loads it to read its dimensions. When you
            convert, an open-source JavaScript library called pdf-lib builds a new PDF in memory, one
            page per image, in the order shown on screen. How each image is handled depends on your
            settings:
          </p>
          <ul className={ulClass}>
            <li className={liClass}>
              {bullet}
              <span>
                <strong>Original quality, no rotation, JPG or PNG:</strong> the file&rsquo;s bytes are
                embedded as they are, with no re-compression. PNG transparency is kept, so the page
                background colour shows through transparent areas.
              </span>
            </li>
            <li className={liClass}>
              {bullet}
              <span>
                <strong>Any other case:</strong> the image is drawn onto an HTML canvas, rotated if you
                asked for it, placed on your chosen background colour and saved as a JPEG at the
                selected quality (about 92%, 80% or 60%). At Original quality a rotated PNG stays PNG,
                while rotated JPGs and all WebP files are saved as JPEG at very high quality.
              </span>
            </li>
            <li className={liClass}>
              {bullet}
              <span>
                <strong>WebP files</strong> always go through the canvas step, because the PDF format
                has no native way to store WebP images.
              </span>
            </li>
          </ul>
          <p className={pClass}>
            Each image is then centred on a page sized according to your settings, and the finished
            file is handed to your browser as a download. Your images never leave your device.
          </p>

          <h3 className={h3Class}>Where it comes in handy</h3>
          <ul className={ulClass}>
            <li className={liClass}>{bullet}<span>Bundling photographed receipts into one file for an expense claim or tax records.</span></li>
            <li className={liClass}>{bullet}<span>Submitting scanned forms, certificates or ID pages to portals that accept only one PDF.</span></li>
            <li className={liClass}>{bullet}<span>Turning a multi-page paper document you photographed page by page back into a single document.</span></li>
            <li className={liClass}>{bullet}<span>Collecting screenshots for a bug report, a how-to, or a record of an online conversation.</span></li>
            <li className={liClass}>{bullet}<span>Sharing class notes, whiteboard photos, sketches or a small photo portfolio as one attachment.</span></li>
          </ul>

          <h3 className={h3Class}>Choosing the right settings</h3>
          <p className={pClass}>
            <strong>Page size.</strong> Use A4 or Letter if the PDF will be printed or submitted
            somewhere official; A4 (210 &times; 297 mm) is standard in most countries, Letter
            (8.5 &times; 11 in) in the US and Canada. Legal (8.5 &times; 14 in) suits long forms, and A3
            (297 &times; 420 mm) is useful for drawings and posters. <strong>Original</strong> makes
            each page exactly the size of its image (one pixel per point, plus margins), which is ideal
            for on-screen reading but produces pages of different sizes.
          </p>
          <p className={pClass}>
            <strong>Orientation.</strong> Auto gives wide images landscape pages and tall images
            portrait pages, which is usually what you want in a mixed batch. Force Portrait or
            Landscape when every page must match.
          </p>
          <p className={pClass}>
            <strong>Fitting.</strong> Fit to Page shows the whole image inside the margins. Fill Page
            covers the page completely and crops whatever spills over the edge. Original Size keeps a
            1:1 scale and only shrinks images that are too large, so small images stay small.
          </p>
          <p className={pClass}>
            <strong>Margins, background and quality.</strong> Margins range from none to about 19 mm.
            The background colour fills each page and any transparent areas of your images. For email
            attachments, Balanced or Small File quality keeps the PDF compact; use Original when you
            want unrotated JPGs and PNGs left completely untouched. Finally, give the file a sensible
            name; characters that are not allowed in file names are replaced with hyphens.
          </p>

          <h3 className={h3Class}>A reliable workflow</h3>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm sm:text-base text-slate-600">
            <li>Name your files with numbers (for example page-01, page-02) and use Sort A-Z, which understands numbers so page-2 comes before page-10.</li>
            <li>Open any image you are unsure about in the full-size preview and rotate pages that are sideways; Rotate All handles a whole batch scanned the wrong way.</li>
            <li>Pick your settings, convert, and use Preview to flip through the result before downloading. Previewing relies on your browser&rsquo;s built-in PDF viewer, so on some phones it is easier to download and open the file.</li>
            <li>Check the settings before converting. Convert More clears the current images so you can start a fresh document, so if the result is wrong you will need to add your images again.</li>
          </ol>

          <h3 className={h3Class}>Troubleshooting common problems</h3>
          <ul className={ulClass}>
            <li className={liClass}>{bullet}<span><strong>A file is rejected:</strong> it is probably HEIC, GIF, TIFF, BMP or SVG, or larger than 100 MB. Export it as JPG or PNG first. On iPhone, setting the camera format to Most Compatible produces JPG photos.</span></li>
            <li className={liClass}>{bullet}<span><strong>A phone photo looks sideways or stretched:</strong> some cameras store orientation as a hidden tag that PDF readers ignore. Switch Output Quality from Original to High so the photo is redrawn, or rotate it manually.</span></li>
            <li className={liClass}>{bullet}<span><strong>The PDF is too big to email:</strong> modern phone photos are large. Choose Balanced or Small File quality and convert again.</span></li>
            <li className={liClass}>{bullet}<span><strong>Edges are cut off:</strong> you are using Fill Page. Switch to Fit to Page.</span></li>
            <li className={liClass}>{bullet}<span><strong>A tiny image sits in the middle of the page:</strong> Original Size never enlarges images. Use Fit to Page instead.</span></li>
            <li className={liClass}>{bullet}<span><strong>The browser slows down or the tab crashes:</strong> very large batches use a lot of memory. Close other tabs or split the job into smaller PDFs.</span></li>
          </ul>

          <h3 className={h3Class}>Limitations worth knowing</h3>
          <p className={pClass}>
            The tool places one image per page; it does not make collages or contact sheets. It does not
            run OCR, so text in your images will not be searchable. It cannot edit, merge, split or
            password-protect existing PDFs, and it does not add page numbers. The only way it reduces
            file size is through the JPEG quality setting.
          </p>

          <h3 className={h3Class}>A note on privacy</h3>
          <p className={pClass}>
            Because conversion happens locally, your images are not uploaded, stored or seen by anyone
            else, and they are discarded when you clear the workspace or close the tab. The web page
            itself still loads like any other site, but your files are not part of that traffic. The
            finished PDF contains your chosen file name as its document title and lists MicroFree as the
            producing application; it does not include your images&rsquo; original file names.
          </p>

          {/* Format and paper reference */}
          <h3 className={h3Class}>
            JPG vs PNG vs WebP: Which should you convert to PDF?
          </h3>
          <ul className={ulClass}>
            <li className={liClass}>
              {bullet}
              <span>
                <strong>JPG / JPEG:</strong> Best for photos and camera scans. Small files, and at
                Original quality they are embedded without any loss.
              </span>
            </li>
            <li className={liClass}>
              {bullet}
              <span>
                <strong>PNG:</strong> Best for screenshots, diagrams and text-heavy scans where sharp
                edges matter. Use Original quality to keep them lossless.
              </span>
            </li>
            <li className={liClass}>
              {bullet}
              <span>
                <strong>WebP:</strong> A compact web format. It is converted to JPEG during processing,
                and any transparency is filled with your background colour.
              </span>
            </li>
          </ul>

          <h3 className={h3Class}>
            Page Sizes at a Glance
          </h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="font-bold text-slate-800">A4 (210 × 297 mm):</span>
              <p className="mt-0.5 text-slate-500">The standard office paper size in most of the world.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="font-bold text-slate-800">US Letter (8.5 × 11 in):</span>
              <p className="mt-0.5 text-slate-500">The standard paper size in the United States and Canada.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="font-bold text-slate-800">US Legal (8.5 × 14 in):</span>
              <p className="mt-0.5 text-slate-500">A taller page used for contracts and long forms.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="font-bold text-slate-800">A3 (297 × 420 mm):</span>
              <p className="mt-0.5 text-slate-500">Twice the area of A4; good for drawings, posters and wide charts.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:col-span-2">
              <span className="font-bold text-slate-800">Original:</span>
              <p className="mt-0.5 text-slate-500">Each page matches its image, at one pixel per PDF point, plus any margin you choose.</p>
            </div>
          </div>
        </article>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Section */}
      <section aria-labelledby="faq-heading">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600 border border-brand-200/60">
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Answers to common questions about our free online Image to PDF Converter.
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-subtle transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-800 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm sm:text-base font-semibold">{faq.q}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-brand-600" />
              </summary>
              <div className="border-t border-slate-100 px-4 sm:px-5 pb-5 pt-3 text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/50">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};
