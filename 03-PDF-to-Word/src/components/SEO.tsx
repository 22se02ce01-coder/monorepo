import React from 'react';
import {
  FileCheck2,
  Zap,
  ChevronDown,
  Info,
} from 'lucide-react';

const faqs = [
  {
    q: 'Will the generated DOCX file open in Microsoft Word?',
    a: 'Yes. The converter writes a standard Office Open XML (.docx) package containing the document body, a basic style sheet, and the required relationship files. It opens in current versions of Microsoft Word and can also be imported into Google Docs, LibreOffice Writer, and other editors that read the .docx format.',
  },
  {
    q: 'Does this converter support scanned PDFs or OCR?',
    a: 'No. The tool only reads text that is already stored as text inside the PDF. A scanned page or a photographed document is just a picture of words, and this tool has no optical character recognition (OCR) engine. When little or no text is detected, the result screen shows a notice, and the affected pages contain the placeholder [No selectable text found on this page].',
  },
  {
    q: 'Are images, tables, and formatting kept in the Word file?',
    a: 'No. This is a text extraction converter. Images, vector graphics, table borders, columns, fonts, colors, bold and italic styling, links, headers and footers are not carried over. Every detected paragraph becomes a plain paragraph in Calibri 12 pt on a US Letter page with 1-inch margins, and each PDF page starts on a new page in Word.',
  },
  {
    q: 'Why does my converted document contain no text, or only placeholders?',
    a: 'The most common cause is a scanned PDF: the pages are pictures of text with no text layer, and this tool has no OCR. Password-protected PDFs cannot be opened either. Occasionally a PDF is made with fonts that have no character map, so the text cannot be turned back into readable letters. Check the Extracted Text Preview before downloading to see what was found on each page.',
  },
  {
    q: 'Why are some words joined together or split with extra spaces?',
    a: 'PDFs do not store words and sentences the way a word processor does. They store small runs of characters with positions on the page. The extractor works out spaces from the horizontal gap between runs, which is right for almost all documents, but unusual letter spacing or justified text can occasionally join two words or split one. A quick find-and-replace pass in Word usually fixes this.',
  },
  {
    q: 'Does it work with non-English text?',
    a: 'Usually. pdf.js reads the character maps that most PDF creators embed, so accented letters and scripts such as Cyrillic, Greek, Arabic or Hindi normally come through as real text. Results depend on how the PDF was made: some files, especially older Chinese, Japanese or Korean documents that rely on fonts not embedded in the file, may still produce missing or garbled characters, so check the preview.',
  },
  {
    q: 'Are my documents uploaded to a server?',
    a: 'No. The PDF is read with the browser File API and parsed by JavaScript running on your own device, and the Word file is assembled in memory and offered as a local download. The document content is not sent to our servers or to any third party for conversion.',
  },
  {
    q: 'Can I convert password-protected PDFs?',
    a: 'Generally no. The tool does not ask for or apply a password. If a PDF is encrypted, its text is stored in encrypted form and the extractor will usually produce empty or unreadable output. Remove the protection with software you are authorized to use, then convert the unlocked copy.',
  },
  {
    q: 'Is there a page limit or file size limit?',
    a: 'There is no fixed limit set by the tool. Because everything runs in your browser, the practical limit is your device memory and speed. Large files with hundreds of pages take longer and may slow down older phones. Only one PDF is converted at a time.',
  },
];

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload Your PDF',
      desc: 'Drag and drop your document or click to select a PDF from your computer or phone.',
    },
    {
      step: '02',
      title: 'Local Text Extraction',
      desc: 'A browser-based parser reads the text commands on each page and turns every text block into a paragraph.',
    },
    {
      step: '03',
      title: 'Download Word (.docx)',
      desc: 'Preview the extracted text page by page, then download a plain, editable .docx file for Word, Google Docs, or LibreOffice.',
    },
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      {/* 3 Step Guide */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Fast & 100% Private
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How PDF to Word Conversion Works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Pull the text out of contracts, essays, reports, and manuals into an editable document in 3 simple steps.
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
                <FileCheck2 className="h-6 w-6 text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Transparency Notice */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-700 shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div className="text-sm text-amber-900 space-y-1">
          <h4 className="font-bold text-sm text-amber-950">
            Transparent Note on In-Browser PDF Conversion
          </h4>
          <p>
            This tool extracts text only. Images, tables, columns, fonts, and styling are not reproduced, so the Word file is a clean text draft rather than a visual copy of the PDF. Scanned pages without a text layer and password-protected files produce little or no text. Always check the preview before downloading.
          </p>
        </div>
      </div>

      {/* Long-form Guide */}
      <article className="max-w-3xl mx-auto text-base text-slate-700 leading-relaxed space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          A Practical Guide to Getting Editable Text Out of a PDF
        </h2>
        <p>
          PDF was designed to make a document look the same everywhere, not to make it easy to edit. That is why copying a paragraph out of a PDF so often gives you broken lines, stray spaces, or nothing at all. This converter takes a focused approach: instead of trying to rebuild the whole page as a visual replica, it pulls out the text the PDF contains and places it into a simple Word document that you can edit, reformat, and reuse.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-2">What actually happens to your file</h3>
        <p>
          When you choose a PDF, your browser reads it straight from your disk. The tool opens the file with pdf.js, the open-source PDF engine from Mozilla that also powers Firefox's built-in PDF viewer, running in a background worker inside your browser. pdf.js decompresses each page, decodes the fonts (including the character maps that turn font glyph codes back into real letters) and returns every run of text together with its position and size on the page.
        </p>
        <p>
          The converter then rebuilds the reading flow: pieces that share a baseline are joined into lines, spaces are added where there is a visible gap, lines that sit close together are merged into paragraphs, words hyphenated at a line end are re-joined, and a change in font size (such as a heading) starts a new paragraph. When the page is done, the tool moves to the next page and inserts a page break so that page 3 of the PDF still starts on its own page in Word. Finally, it writes the standard pieces of a .docx package (the document body, a style sheet using Calibri 12 pt, and the relationship files) and compresses them into a ZIP archive, which is all a .docx file really is. All of this runs in JavaScript on your device.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-2">When this tool is a good fit</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reusing the wording of a simple, text-based document, such as a letter, policy, or plain report, without retyping it.</li>
          <li>Getting a rough draft of an article or essay into Word so you can quote, summarize, or edit sections.</li>
          <li>Feeding document text into a spell checker, translation tool, or word counter that needs an editable file.</li>
          <li>Working with sensitive material, such as contracts or HR documents, that you would rather not upload to an online converter.</li>
        </ul>
        <p>
          It is not the right tool when you need the result to look like the original. Brochures, forms with boxes, invoices built from tables, slide decks exported to PDF, and anything that relies on images will lose their layout, because only text is carried across.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-2">Tips for the best result</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Check that the PDF has real text.</strong> Open it in any PDF viewer and try to highlight a sentence. If you can select individual words, there is a text layer. If the whole page highlights as one image, it is a scan and needs OCR software first.
          </li>
          <li>
            <strong>Use the preview.</strong> After conversion, the Extracted Text Preview shows what was found on each page. Flip through a few pages before downloading; if they are empty or full of odd symbols, the Word file will be too.
          </li>
          <li>
            <strong>Clean up in Word.</strong> Use find and replace to fix doubled spaces, then apply your own heading styles. Because the output uses plain paragraphs, restyling is quick.
          </li>
          <li>
            <strong>Delete the page breaks you do not need.</strong> Page breaks mirror the PDF, which is useful for cross-referencing but often unnecessary in an edited version. Turn on formatting marks in Word to find and remove them.
          </li>
        </ol>

        <h3 className="text-xl font-bold text-slate-900 pt-2">Common problems and why they happen</h3>
        <p>
          <strong>Pages say "No selectable text found".</strong> The page is almost certainly an image, such as a scan or a photo saved as PDF. There is no text to extract, so you need OCR software first. Password-protected PDFs cannot be opened at all until the password is removed.
        </p>
        <p>
          <strong>Words run together or have extra gaps.</strong> PDFs often position each word, or even each letter, separately. The space you see on screen may be a cursor movement rather than a space character, so the tool has to infer it from the gap. Very tight letter spacing or wide justified text can occasionally fool that guess.
        </p>
        <p>
          <strong>The order of text looks wrong.</strong> The tool follows the order in which the PDF draws its text. For most single-column documents that matches the reading order, but in multi-column layouts, sidebars, or footnotes the software that made the PDF may have drawn things in a different sequence.
        </p>
        <p>
          <strong>Symbols or foreign characters are garbled.</strong> pdf.js uses each font's character map to recover real letters, so accented and non-Latin text usually comes through correctly. A small number of PDFs are produced with fonts that have no usable character map; their text cannot be recovered by any extractor and will appear as odd symbols.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-2">Limitations at a glance</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Text only: no images, tables, columns, fonts, colors, links, headers, or footers.</li>
          <li>No OCR, so scanned or photographed pages produce no text.</li>
          <li>Password-protected PDFs must be unlocked first.</li>
          <li>Text in multi-column layouts may come out in the order the PDF drew it.</li>
          <li>One file at a time, with speed limited by your device.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-2">Privacy</h3>
        <p>
          Your PDF is never uploaded for conversion. The file is opened through your browser, parsed in memory, and the finished .docx is created as a local download link. Closing or refreshing the tab discards the data. That makes the tool a reasonable choice for confidential paperwork, as long as you keep in mind that the downloaded Word file is now an ordinary file on your device and should be stored with the same care as the original.
        </p>
      </article>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Everything you need to know about our browser-based PDF to Word tool.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
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
