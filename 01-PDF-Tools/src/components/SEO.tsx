import React from 'react';
import {
  Zap,
  Layers,
  Scissors,
  RotateCw,
  Hash,
  Stamp,
  Sliders,
  ChevronDown,
  Info,
} from 'lucide-react';

export const SEO: React.FC = () => {
  const toolsSummary = [
    {
      icon: Layers,
      title: 'Merge PDF Documents',
      desc: 'Combine two or more PDF files into a single document, in the order you selected them, without page limits.',
    },
    {
      icon: Scissors,
      title: 'Split, Extract & Delete Pages',
      desc: 'Pull a page range (e.g. 1-5) into its own file, copy chosen pages into a new PDF, or remove pages you do not need.',
    },
    {
      icon: Sliders,
      title: 'Browser-Side PDF Optimizer',
      desc: 'Rewrite the file structure with compressed object streams locally, without touching the readable text or images.',
    },
    {
      icon: RotateCw,
      title: 'Rotate & Reorder',
      desc: 'Turn every page 90°, 180° or 270° clockwise, or type a new page sequence such as 3, 1, 2 to rearrange the document.',
    },
    {
      icon: Hash,
      title: 'Add Page Numbers',
      desc: 'Stamp "Page X of Y" numbering at the bottom left, center or right, or the top center or right of every page.',
    },
    {
      icon: Stamp,
      title: 'Text Watermark & Metadata',
      desc: 'Place a diagonal, semi-transparent text watermark on every page, and view or edit the title and author fields.',
    },
  ];

  // NOTE: These FAQ strings are mirrored as FAQPage JSON-LD in index.html. Keep both in sync.
  const faqs = [
    {
      q: "Are my PDF files uploaded to a server?",
      a: "No. Every operation runs in JavaScript inside your browser tab using the open-source pdf-lib library. The file is read from your device into memory, processed there, and the result is offered back to you as a download. Nothing is sent to MicroFree or any third party, and closing the tab discards the data.",
    },
    {
      q: "How does the Compress PDF option reduce file size?",
      a: "It reloads the document and saves it again with compressed object streams, which packs the small internal objects (page dictionaries, font descriptors, cross-reference data) more efficiently. It does not downsample or recompress images, so text and graphics stay exactly as sharp as before. The trade-off is that savings are usually modest, and image-heavy or scanned PDFs may barely shrink at all.",
    },
    {
      q: "Why did my compressed PDF not get any smaller?",
      a: "Most of the size in a typical PDF comes from embedded images and fonts, which this optimizer leaves untouched. If the original was already saved with object streams by a modern application, there is little left to gain, and the tool will report a 0% reduction. In that case keep your original file.",
    },
    {
      q: "In what order are files merged?",
      a: "Files are joined in the order they appear in the selected files list, which is the order you picked them. To change the order, remove the files and add them again in the sequence you want. Every page of every file is copied, so you can then use Delete Pages or Reorder Pages on the merged result if needed.",
    },
    {
      q: "How do I write page numbers for Split, Extract, Delete and Reorder?",
      a: "Use commas between pages and a dash for ranges, for example 1-3, 5, 8-10. Split creates one PDF per group you type (1-3, 5 and 8-10 above become three files, downloaded together as a ZIP); leaving Split blank makes one file per page. Extract and Delete use the same format, and Reorder accepts ranges too, so 5-1 reverses a five-page file. Page numbers always count from 1, regardless of any numbering printed on the pages.",
    },
    {
      q: "Can I remove or add a password with this tool?",
      a: "No. These tools do not add or remove PDF passwords, and a password-protected file will show an error when you open it. To remove a password you know, open the file in a desktop PDF reader and save or print it to a new unprotected PDF, then use that copy here.",
    },
    {
      q: "Will bookmarks, links and form fields survive merging or splitting?",
      a: "Page content, text and images are copied faithfully. However, Merge, Split, Extract, Delete and Reorder build a brand-new document from the copied pages, so document-level features such as the bookmark outline, interactive form fields and internal links that point to other pages may not carry over. Check the result if those features matter to you.",
    },
    {
      q: "Can I use any language or symbol in a watermark?",
      a: "Watermarks and page numbers use the standard Helvetica font built into every PDF reader, which covers Latin characters such as English and most Western European languages. Characters outside that set, such as Chinese, Arabic, Cyrillic or emoji, cannot be drawn and the tool will report an error.",
    },
    {
      q: "Is a watermark a reliable way to protect a document?",
      a: "A watermark is a visible label, not a security control. It is drawn as text on top of each page and a determined person with PDF editing software can remove it. It is useful for marking drafts or showing who a copy was intended for, but it does not prevent copying, printing or editing.",
    },
    {
      q: "What is the largest PDF I can process?",
      a: "There is no fixed limit in the tool. Because the whole file is held in your device memory while it is processed, the practical limit depends on your browser and hardware. Files of tens of megabytes are generally fine on a laptop; very large files or long merges on a phone may be slow or cause the tab to run out of memory.",
    },
  ];

  const h2 = 'text-2xl font-bold text-slate-900 tracking-tight';
  const h3 = 'text-lg font-semibold text-slate-900 mt-6 mb-2';
  const p = 'text-base text-slate-700 leading-relaxed';
  const ul = 'list-disc pl-6 space-y-2 text-base text-slate-700 leading-relaxed';

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      {/* Tools Overview */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Full PDF Productivity Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need for PDF Management
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Ten browser-side PDF tools designed for privacy, speed and simplicity. No installation, no account and no file transfers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsSummary.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-brand-200 hover:shadow-elevated transition"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparency Note */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div className="text-sm text-blue-900 space-y-1">
          <h3 className="font-bold text-base text-blue-950">
            Transparent Client-Side Processing Note
          </h3>
          <p>
            MicroFree believes in transparent technology. These tools read and rewrite the internal structure of your PDF directly in the browser using the pdf-lib library. Your document is never sent over the network, and every output is a standard PDF that opens in any reader.
          </p>
        </div>
      </div>

      {/* Long-form guide */}
      <article className="max-w-3xl mx-auto space-y-4">
        <h2 className={h2}>A Practical Guide to Editing PDFs in Your Browser</h2>
        <p className={p}>
          PDF was designed as a finished, print-ready format: it records exactly where every
          character, line and image sits on a page so that the document looks identical on any
          device. That reliability is why contracts, invoices, manuals and school forms are
          shared as PDFs, but it is also why they feel awkward to change. Most everyday PDF
          chores, though, do not involve rewriting text at all. They are about organising
          pages: joining files, pulling out a chapter, turning a sideways scan the right way up,
          or adding page numbers before printing. That is exactly what this suite is built for.
        </p>

        <h3 className={h3}>How the tools work under the hood</h3>
        <p className={p}>
          Internally, a PDF is a collection of numbered objects: page dictionaries, content
          streams with drawing instructions, fonts, images and a cross-reference table that
          tells a reader where each object lives in the file. When you choose a file, your
          browser reads it into memory and the pdf-lib JavaScript library parses those objects.
          Each tool then performs a structural edit. Merging and splitting copy page objects
          (along with the fonts and images they depend on) into a fresh document. Rotating
          changes a single rotation value on each page. Page numbers and watermarks append a few
          extra drawing instructions on top of the existing content. Finally the document is
          serialised back into bytes and handed to you as a download link. No step involves a
          server, which is why the tool keeps working even if your connection drops after the
          page has loaded.
        </p>
        <p className={p}>
          Because pages are copied rather than re-rendered, text stays selectable and
          searchable, vector graphics stay sharp, and images are not recompressed. You get the
          same quality out that you put in.
        </p>

        <h3 className={h3}>Common situations where it helps</h3>
        <ul className={ul}>
          <li>
            <strong>Job and university applications:</strong> merge a cover letter, CV and
            certificates into one file when a portal accepts only a single upload.
          </li>
          <li>
            <strong>Sharing just the relevant part:</strong> extract the two signature pages of a
            long agreement, or split off one chapter of a manual, instead of sending the entire
            document.
          </li>
          <li>
            <strong>Fixing scans:</strong> rotate pages that came out of a scanner upside down or
            sideways, and delete blank pages produced by double-sided scanning.
          </li>
          <li>
            <strong>Preparing for print or review:</strong> add page numbers so reviewers can
            refer to &ldquo;page 7 of 12&rdquo;, or stamp DRAFT across a version that is not
            final.
          </li>
          <li>
            <strong>Tidying document properties:</strong> check the page count, creation date and
            producing software, and correct a misleading title or author field before you
            publish a file online.
          </li>
        </ul>

        <h3 className={h3}>Step-by-step tips for clean results</h3>
        <ol className="list-decimal pl-6 space-y-2 text-base text-slate-700 leading-relaxed">
          <li>
            Choose the tool tab first, then select your file. Merge accepts several files at once;
            every other tool works on one file at a time.
          </li>
          <li>
            Open your PDF in a viewer and note the page numbers you need. The tools count pages
            from 1 starting at the very first physical page, which may differ from numbers printed
            in the document (for example roman-numeral front matter).
          </li>
          <li>
            Separate pages with commas and use a dash for ranges, such as 1-3, 5, 8-10. This works
            in Split, Extract, Delete and Reorder.
          </li>
          <li>
            When reordering, include every page you want to keep. Any page you leave out of the
            sequence is dropped from the output, and a page listed twice appears twice.
          </li>
          <li>
            Chain tools when needed: merge first, download, then load the merged file into Add
            Page Numbers so the numbering runs continuously across the combined document.
          </li>
          <li>
            Always open the downloaded file and check it before you delete your original.
          </li>
        </ol>

        <h3 className={h3}>Troubleshooting and common mistakes</h3>
        <p className={p}>
          If a tool reports an error immediately, the most common cause is a password-protected
          or restricted PDF. Encrypted files cannot be decrypted by the browser library, so remove
          the protection with the software that created it and try again. If a split or extract
          produces fewer pages than expected, check that your numbers are within the document
          length; numbers beyond the last page are ignored. If a watermark or page number fails,
          make sure the text uses only basic Latin characters, since the built-in Helvetica font
          cannot draw other scripts. Finally, a merge that seems to stall on a phone is usually
          running out of memory; try combining fewer or smaller files at a time on a computer.
        </p>

        <h3 className={h3}>Limitations worth knowing</h3>
        <ul className={ul}>
          <li>
            These are page-level tools. They cannot edit existing text, replace images or run OCR
            on scanned pages.
          </li>
          <li>
            When Split produces several files they are delivered together in one ZIP archive,
            which you will need to unzip (every modern operating system can do this natively).
          </li>
          <li>
            Rotate applies the chosen angle to every page. To rotate only some pages, extract
            them, rotate, and merge the pieces back together.
          </li>
          <li>
            The optimizer restructures the file but does not downsample images, so it will not
            dramatically shrink scanned or photo-heavy PDFs.
          </li>
          <li>
            Bookmarks and fillable form fields may be lost when pages are copied into a new
            document.
          </li>
          <li>
            Password protection cannot be added or removed.
          </li>
        </ul>

        <h3 className={h3}>Privacy and security</h3>
        <p className={p}>
          Many PDFs contain exactly the kind of information you should not hand to an unknown
          website: bank statements, medical letters, ID scans and signed contracts. Uploading
          them to a conventional online converter means trusting someone else&rsquo;s server,
          storage and deletion policy. Here, the file is opened by your own browser, edited in
          memory and returned to you without ever leaving the device. You can confirm this by
          watching the network tab of your browser&rsquo;s developer tools while a tool runs: no
          request carries your document. As with any shared computer, remember to clear your
          downloads folder if other people use the same machine.
        </p>
      </article>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Learn more about how our client-side PDF utilities work.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{faq.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-brand-600" />
              </summary>
              <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
