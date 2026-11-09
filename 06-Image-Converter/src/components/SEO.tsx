import React from 'react';
import {
  Zap,
  Repeat,
  ChevronDown,
  Info,
} from 'lucide-react';

interface GuideBlock {
  h3?: string;
  p?: string[];
  ul?: string[];
  ol?: string[];
}

interface GuideSection {
  h2: string;
  blocks: GuideBlock[];
}

interface Faq {
  q: string;
  a: string;
}

const steps = [
  {
    step: '01',
    title: 'Select Pictures',
    desc: 'Drag & drop one or several JPG, PNG, or WebP files from your phone or desktop.',
  },
  {
    step: '02',
    title: 'Choose Target Format',
    desc: 'Convert to PNG (lossless), WebP (web speed), or JPG (universal compatibility).',
  },
  {
    step: '03',
    title: 'Download Converted Files',
    desc: 'Inspect the previews and size changes, then download each converted photo.',
  },
];

const guide: GuideSection[] = [
  {
    h2: 'A Practical Guide to Converting JPG, PNG and WebP Images',
    blocks: [
      {
        h3: 'What this image converter does',
        p: [
          'This tool takes images you already have and re-saves them in a different file format. You can turn a PNG screenshot into a compact JPG, convert a phone photo into WebP for a website, or turn a WebP image downloaded from the web back into a PNG or JPG that older software can open. You can add several files at once, pick a single target format, and convert the whole set in one pass. For every result you see the new dimensions, the original and new file size, and a preview before you download.',
        ],
      },
      {
        h3: 'How the conversion works under the hood',
        p: [
          'Nothing is uploaded. When you press Convert, your browser decodes each file with its own built-in image decoder, draws it onto an invisible HTML5 canvas at its original pixel dimensions, and then asks the canvas to export the pixels in the format you chose. For JPG and WebP the quality slider is passed to the browser encoder; for PNG it is ignored because PNG is always lossless.',
          'Because JPG has no transparency channel, the canvas is first painted with your chosen background colour (white by default) before the image is drawn on top. When the target is PNG or WebP the canvas is left transparent, so transparent logos and icons keep their see-through areas.',
        ],
      },
    ],
  },
  {
    h2: 'Choosing the Right Output Format',
    blocks: [
      {
        ul: [
          'JPG (JPEG) is a lossy format built for photographs. It handles smooth gradients and natural scenes well and is supported by practically every device, email client and printing service. It does not support transparency and it blurs sharp edges such as text when compression is high.',
          'PNG is lossless, so every pixel is stored exactly. It is the best choice for screenshots, diagrams, user-interface graphics and anything with text or hard edges, and it supports full transparency. The trade-off is size: a photo saved as PNG is usually several times larger than the same photo as JPG.',
          'WebP is a newer format designed for the web. It supports both lossy compression and transparency, and Google reports that lossy WebP files are typically around a quarter to a third smaller than comparable JPGs. All current major browsers display WebP, though some desktop software and older apps still cannot open it.',
        ],
      },
      {
        p: [
          'A simple rule of thumb: photos go to JPG or WebP, graphics with text or transparency go to PNG or WebP, and when you are not sure who will open the file, JPG is the safest choice.',
        ],
      },
    ],
  },
  {
    h2: 'Common Use Cases',
    blocks: [
      {
        ul: [
          'Shrinking large PNG screenshots to JPG or WebP before attaching them to an email or support ticket.',
          'Preparing product photos or blog images as WebP to speed up page loads on your own website.',
          'Converting WebP images saved from a browser into PNG or JPG so they open in an older image editor, presentation tool or upload form that rejects WebP.',
          'Turning a transparent logo into a JPG with a specific brand background colour for platforms that do not accept PNG.',
          'Converting a batch of mixed files into one consistent format before uploading them to a CMS or online store.',
        ],
      },
    ],
  },
  {
    h2: 'Step-by-Step Tips for the Best Results',
    blocks: [
      {
        ol: [
          'Start from the highest-quality original you have. Every lossy save throws away some detail, so converting a JPG that has already been compressed several times will not bring that detail back.',
          'For JPG and WebP, begin with the default quality of 92% and compare the preview and file size. Values between roughly 75% and 90% are often visually indistinguishable for photos while being much smaller; go lower only if file size matters more than fine detail.',
          'When converting a transparent PNG or WebP to JPG, pick the background colour that matches where the image will be shown, otherwise you may see a white box around a logo placed on a dark page.',
          'Check the size readout for each file. If a converted file is larger than the original, keep the original or try a different format.',
          'Download each result with its Download button. If your browser asks whether this site may download multiple files, allow it so the remaining files are saved.',
        ],
      },
    ],
  },
  {
    h2: 'Common Mistakes and Troubleshooting',
    blocks: [
      {
        ul: [
          'Expecting PNG to improve a blurry JPG. Converting to a lossless format only preserves what is already there; it cannot restore detail the JPG compression removed, and the file will usually get bigger.',
          'Saving photos as PNG for the web. A large photo saved as PNG can be many megabytes; use JPG or WebP instead unless you specifically need lossless output.',
          'Losing transparency. JPG cannot store transparent pixels, so they are always filled with the background colour. Use PNG or WebP if you need to keep transparency.',
          'A file is rejected. The file picker accepts JPG, PNG and WebP. Other formats such as HEIC from some iPhones may not be decodable by your browser and need to be exported as JPG on the device first.',
          'WebP output looks unusually large. A few browsers, notably some versions of Safari, cannot encode WebP from a canvas and fall back to PNG data. If that happens, try the conversion in a Chromium-based browser or Firefox.',
        ],
      },
    ],
  },
  {
    h2: 'Limitations and Privacy',
    blocks: [
      {
        p: [
          'The converter keeps the original width and height; it does not resize, crop or rotate images. Because the image is redrawn on a canvas, metadata such as EXIF camera details, GPS location and editing history is not carried over to the new file, which is often useful for privacy but worth knowing if you rely on that information. Animated images are not supported as animations; only a single frame is converted. Very large images are limited by the memory your browser and device allow for a canvas.',
          'All decoding and encoding happens locally in your browser tab. Your photos are never sent to a server, stored, or seen by anyone else, and closing the tab discards everything.',
        ],
      },
    ],
  },
];

const faqs: Faq[] = [
  {
    q: 'How does PNG to JPG conversion handle transparent backgrounds?',
    a: 'JPG files do not support transparency. Before your image is drawn, the converter paints the canvas with a solid background colour, white by default, so transparent areas become that colour instead of turning black. When JPG is selected you can pick any background colour with the colour picker.',
  },
  {
    q: 'Why should I convert images to WebP?',
    a: 'WebP is a modern web format that supports both lossy compression and transparency. Google reports that lossy WebP files are typically around 25 to 34 percent smaller than comparable JPGs, which helps web pages load faster. All current major browsers can display WebP, but some older software cannot open it.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. The entire conversion runs inside your web browser using the HTML5 canvas. Your images are never uploaded, stored or shared, and they are discarded when you close or reset the page.',
  },
  {
    q: 'Can I convert multiple photos at once?',
    a: 'Yes. You can select or drop several images and convert them all to the chosen format in one click. Each converted file then has its own Download button; your browser may ask for permission to download multiple files.',
  },
  {
    q: 'What does the quality slider do?',
    a: 'The quality slider, from 20 to 100 percent with a default of 92, controls how strongly JPG and WebP output is compressed. Lower values give smaller files with more visible compression artefacts. It is hidden for PNG because PNG is always lossless.',
  },
  {
    q: 'Will converting a JPG to PNG improve its quality?',
    a: 'No. PNG stores pixels exactly, but it cannot recover detail that JPG compression has already removed. The PNG will look the same as the source JPG and will usually be a larger file.',
  },
  {
    q: 'Does the converter resize or crop my images?',
    a: 'No. Converted images keep the same pixel width and height as the originals. The tool changes only the file format and, for JPG and WebP, the compression level.',
  },
  {
    q: 'Is EXIF metadata such as camera details or GPS location kept?',
    a: 'No. Because each image is redrawn on a canvas and re-encoded, metadata such as EXIF camera information and GPS coordinates is not copied to the converted file.',
  },
  {
    q: 'Why is my converted file bigger than the original?',
    a: 'This usually happens when a photo is converted to PNG, which is lossless, or when an already compressed JPG is re-saved at a high quality setting. Try JPG or WebP with a lower quality value, or keep the original if it is already smaller.',
  },
];
// end faqs

export const SEO: React.FC = () => {
  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> High Speed Batch Image Conversion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Convert Images Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Convert seamlessly between JPG, PNG, and WebP formats right in your browser.
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
                <Repeat className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-base text-blue-950">100% Client-Side Privacy</h4>
          <p>
            All image decoding and re-encoding is performed by your device browser engine. Your personal files never leave your computer.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-12">
        {guide.map((sec, sIdx) => (
          <section key={sIdx}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">{sec.h2}</h2>
            <div className="space-y-6">
              {sec.blocks.map((b, bIdx) => (
                <div key={bIdx} className="space-y-3">
                  {b.h3 && <h3 className="text-lg font-semibold text-slate-900">{b.h3}</h3>}
                  {b.p?.map((text, pIdx) => (
                    <p key={pIdx} className="text-base text-slate-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                  {b.ul && (
                    <ul className="list-disc pl-6 space-y-2 text-base text-slate-700 leading-relaxed">
                      {b.ul.map((item, iIdx) => (
                        <li key={iIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {b.ol && (
                    <ol className="list-decimal pl-6 space-y-2 text-base text-slate-700 leading-relaxed">
                      {b.ol.map((item, iIdx) => (
                        <li key={iIdx}>{item}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{faq.q}</h3>
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
