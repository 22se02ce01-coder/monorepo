import React from 'react';
import {
  Zap,
  Sliders,
  ChevronDown,
  Info,
} from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Select Photos',
      desc: 'Click the upload area and choose one or several JPG, PNG, or WebP images at once. You can add more files before compressing.',
    },
    {
      step: '02',
      title: 'Tune Compression',
      desc: 'Set the quality slider (10–95%), optionally enter a target size in KB, and choose whether to keep the original format or convert to WebP, JPEG, or PNG.',
    },
    {
      step: '03',
      title: 'Download Optimized Images',
      desc: 'Compare the original and compressed versions side by side, check the size saving, then download images one at a time or all together.',
    },
  ];

  // Keep these strings in sync with the FAQPage JSON-LD in index.html.
  const faqs = [
    {
      q: 'Are my images uploaded to a server?',
      a: 'No. The images are decoded, re-encoded, and previewed entirely inside your browser using the HTML5 Canvas API. The files are never sent to MicroFree or any other server.',
    },
    {
      q: 'Which image formats can I compress?',
      a: 'You can upload JPG/JPEG, PNG, and WebP files. The output can stay in the original format or be converted to WebP, JPEG, or PNG using the Output Format menu.',
    },
    {
      q: 'What does the quality slider actually change?',
      a: 'The slider (10% to 95%) sets the encoder quality used when the image is saved as JPEG or WebP. Lower values discard more fine detail and produce smaller files. It has no effect on PNG output, because PNG is a lossless format.',
    },
    {
      q: 'How does the Target Size (KB) option work?',
      a: 'When you enter a target size and the output format is JPEG or WebP, the tool tries several quality levels in a short binary search and keeps the highest quality it found that fits under your limit, overriding the slider. If no tested quality fits, the image is saved at your slider quality instead, so always check the final size. The target size is ignored for PNG output.',
    },
    {
      q: 'Why is my compressed PNG not much smaller, or even the same size?',
      a: 'PNG is lossless, so re-saving it in the browser cannot throw away detail the way JPEG or WebP can. If an already optimized PNG is re-encoded, the result may be about the same size or occasionally larger. For big savings on photos or screenshots, convert to WebP or JPEG instead.',
    },
    {
      q: 'What happens to transparent backgrounds?',
      a: 'Transparency is kept when the output is PNG or WebP. JPEG does not support transparency, so when an image is converted to JPEG the transparent areas are filled with white.',
    },
    {
      q: 'Does the tool resize my images or keep EXIF data?',
      a: 'The pixel dimensions stay exactly the same; the tool does not resize or crop. Because each image is redrawn on a canvas and re-encoded, metadata such as EXIF camera details and GPS location is not copied into the compressed file.',
    },
    {
      q: 'Why does my converted file still have the old extension?',
      a: 'Downloaded files are named compressed_ followed by the original file name, so a PNG converted to WebP keeps the .png extension in its name. The file content is in the new format; rename the extension to .webp or .jpg if another program relies on it.',
    },
    {
      q: 'Is there a limit on file size or number of images?',
      a: 'There is no fixed limit set by the tool. Images are processed one after another in your browser, so the practical limit depends on your device memory. Very large photos or long batches may be slow on phones and older computers.',
    },
    {
      q: 'Is the image compressor free?',
      a: 'Yes. The tool is free to use, does not require an account, and does not add watermarks to your images.',
    },
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> High Performance Image Compression
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Compress Images in Seconds
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Shrink JPG, PNG, and WebP files in three steps, with a before-and-after preview to check the result.
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
                <Sliders className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Zero Server Uploads</h4>
          <p>
            Unlike compression services that upload your pictures to remote storage, MicroFree decodes and re-encodes every image locally in your browser&apos;s memory. Your files are never transmitted anywhere.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-10 text-base text-slate-700 leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            A Practical Guide to Image Compression
          </h2>
          <p>
            Images are usually the heaviest part of a web page, an email attachment, or an online form submission. A photo straight from a modern phone can easily be several megabytes, yet most of that data describes detail nobody will notice on a screen. Image compression is the process of storing the same picture in fewer bytes, either by describing it more efficiently or by deliberately discarding information the eye is unlikely to miss. This guide explains how that works, how this tool applies it, and how to get good results without ruining your photos.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Lossy vs. lossless compression</h3>
          <p>
            <strong>Lossless</strong> compression shrinks a file without changing a single pixel. When you open the file again you get back exactly what you started with. PNG works this way, which makes it ideal for logos, icons, diagrams, and screenshots with sharp text, but it cannot make a detailed photograph dramatically smaller.
          </p>
          <p>
            <strong>Lossy</strong> compression permanently throws away some information in exchange for much smaller files. JPEG and lossy WebP split the image into small blocks, convert them into patterns of frequencies, and store fine, high-frequency detail with less precision than broad areas of color. At sensible settings the difference is very hard to see; push too far and you start to notice blocky patches, smeared textures, and halos around edges.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Choosing between JPEG, WebP, and PNG</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>JPEG</strong> is the most widely compatible choice for photographs. Every browser, operating system, and upload form accepts it. It does not support transparency.
            </li>
            <li>
              <strong>WebP</strong> generally produces smaller files than JPEG at similar visual quality and also supports transparency. All current major browsers display it, but some older software, desktop apps, and government or job portals still only accept JPG or PNG.
            </li>
            <li>
              <strong>PNG</strong> is lossless and keeps transparency. Use it for graphics with flat colors and crisp edges, or when you need a pixel-perfect copy. It is usually a poor choice for photos because the files stay large.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">How this tool works under the hood</h3>
          <p>
            Everything happens in your browser. When you press the compress button, each selected file is loaded into an image element, drawn onto an HTML5 canvas at its original width and height, and then exported again with the browser&apos;s built-in encoder for the format you picked. For JPEG and WebP the quality slider value is passed straight to that encoder. If you convert to JPEG, any transparent areas are first filled with white, because JPEG has no alpha channel.
          </p>
          <p>
            If you enter a target size, the tool runs a quick binary search: it encodes the image at a middle quality, checks the resulting size, and moves up or down, five times in total. It then keeps the highest quality it tried that came in under your limit. Images are processed one after another, and the results panel shows the original size, the new size, and the percentage saved, together with a side-by-side preview.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Common use cases</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Meeting the upload limit on application, exam, or ID portals that ask for a photo under a specific number of kilobytes.</li>
            <li>Making blog and store product images lighter so pages load faster, especially on mobile data.</li>
            <li>Shrinking a batch of holiday photos before attaching them to an email or sharing them in a chat app.</li>
            <li>Converting large PNG screenshots of photographic content to WebP or JPEG to save storage space.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Tips for the best results</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Start with the default quality of 75%. For most photos it gives a large saving with little visible change.</li>
            <li>Use the side-by-side preview, and open the downloaded file at full size to check faces, text, and fine textures before you delete the original.</li>
            <li>If you need a specific size, enter it in the Target Size box rather than guessing slider values, and choose JPEG or WebP so the option can take effect.</li>
            <li>Pick WebP when the image is only going on the web, and JPEG when it must work everywhere, such as official forms.</li>
            <li>Always compress from the original file. Each lossy re-save adds new artifacts, so compressing an already compressed JPEG again tends to lose quality quickly.</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Troubleshooting and common mistakes</h3>
          <p>
            <strong>The file barely got smaller.</strong> This usually means the original was already well compressed or is a PNG being saved as PNG again. Converting to WebP or JPEG, or lowering the quality, gives the encoder room to work.
          </p>
          <p>
            <strong>The target size was not reached.</strong> The tool keeps the original pixel dimensions, so a very large photo may still exceed a small limit even at the lowest quality it tries. In that case the slider quality is used instead. Resize the image to smaller dimensions in another editor first, then compress it here.
          </p>
          <p>
            <strong>A transparent logo now has a white background.</strong> It was converted to JPEG. Choose PNG or WebP to keep the transparency.
          </p>
          <p>
            <strong>Download All opened a browser prompt.</strong> Each image downloads as a separate file, and some browsers ask for permission before a site saves several files at once. Allow it, or download the images individually.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Limitations and privacy</h3>
          <p>
            Because compression relies on your browser&apos;s own encoders, results can differ slightly between Chrome, Firefox, Safari, and Edge, and a browser that cannot encode a particular format may fall back to another one. The tool does not resize, crop, or rotate images, and it does not produce ZIP archives. Very large images use a lot of memory while being drawn on the canvas, so phones and older computers may struggle with huge files or long batches.
          </p>
          <p>
            On the privacy side, your pictures never leave your device: there is no upload step, no account, and nothing is stored after you close the tab. Re-encoding also means that EXIF metadata, including camera details and any GPS location embedded by your phone, is not carried over to the compressed copy. That is helpful when sharing photos publicly, but keep your originals if you need that information later.
          </p>
        </div>
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
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <h3>{faq.q}</h3>
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
