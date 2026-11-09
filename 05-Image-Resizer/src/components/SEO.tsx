import React from 'react';
import {
  Zap,
  Maximize2,
  ChevronDown,
  Info,
} from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose an Image',
      desc: 'Click the upload area and pick a JPG, PNG, or WebP file from your device. Its original pixel size and file size are shown straight away.',
    },
    {
      step: '02',
      title: 'Set the New Size',
      desc: 'Type an exact width and height, scale by a percentage from 10% to 200%, or pick one of ten social media and web presets.',
    },
    {
      step: '03',
      title: 'Resize & Download',
      desc: 'Choose JPG, PNG, or WebP and a quality level, click Resize, check the preview and the new file size, then download the result.',
    },
  ];

  const faqs = [
    {
      q: 'How does the aspect ratio lock work?',
      a: 'In the By Pixels mode the lock is on by default. While it is on, typing a new width automatically recalculates the height (and vice versa) using the proportions of your original image, so the picture is never stretched. Turn the lock off if you need a width and height that do not match the original shape.',
    },
    {
      q: 'What do the Contain, Crop, and Stretch fit modes do?',
      a: 'They decide what happens when the target size has a different shape from your photo. Contain fits the whole image inside the frame and fills the leftover space with white (JPG) or transparency (PNG and WebP). Crop fills the entire frame and trims the edges that overflow, keeping the image centered. Stretch forces the image to the exact width and height, which distorts it if the proportions differ. Contain is the default.',
    },
    {
      q: 'Will resizing reduce the sharpness of my photo?',
      a: 'Making an image smaller usually keeps it looking crisp, because the browser combines several source pixels into each new pixel using its high-quality smoothing setting. Making an image larger cannot add detail that was never captured, so enlarging well beyond the original size will look soft or blurry. For the best results, start from the largest original you have and scale down.',
    },
    {
      q: 'Are my photos uploaded to a server?',
      a: 'No. The image is decoded, redrawn, and encoded entirely inside your browser using the HTML5 Canvas API. The file is never sent to MicroFree or any other server, and the resized copy exists only in your browser memory until you download it or close the page.',
    },
    {
      q: 'Which file formats can I upload and download?',
      a: 'You can upload JPG, PNG, and WebP images and save the result as JPG, PNG, or WebP, regardless of the original format. That means the tool can also convert between these formats while resizing.',
    },
    {
      q: 'Why did the transparent background of my PNG turn white?',
      a: 'JPG does not support transparency, so when you export to JPG the tool fills the background with white before drawing your image. Choose PNG or WebP as the output format if you need to keep transparent areas.',
    },
    {
      q: 'What does the Quality slider change?',
      a: 'The slider (20% to 100%, default 90%) controls compression for JPG and WebP output. Lower values produce smaller files with more visible compression artifacts. PNG is a lossless format, so the browser ignores the quality setting when you export to PNG.',
    },
    {
      q: 'Can I resize several images at once?',
      a: 'Not at the moment. The tool works on one image at a time. After downloading a result, click Change Image to load the next file. Your chosen format and quality settings stay in place, so repeating the process is quick.',
    },
    {
      q: 'Does resizing keep the photo metadata (EXIF)?',
      a: 'No. Because the image is redrawn on a canvas and saved as a new file, camera metadata such as the capture date, camera model, and GPS location is not copied into the resized image. This is often useful for privacy before sharing a photo online.',
    },
    {
      q: 'What are the recommended dimensions for Instagram posts?',
      a: 'The built-in presets use 1080 x 1080 pixels for square posts (1:1), 1080 x 1350 for portrait posts (4:5), and 1080 x 1920 for Stories and Reels (9:16). Platforms change their guidelines from time to time, so it is worth checking the current recommendations if exact sizing matters.',
    },
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Fast, Private Image Scaling
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Resize Images Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Resize photos by pixels, percentages, or ready-made social templates in seconds.
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
                <Maximize2 className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Local Processing Guarantee</h4>
          <p>
            All image transformations happen in your browser's memory. Your files are never uploaded to our servers or to any cloud service.
          </p>
        </div>
      </div>

      {/* Long-form guide */}
      <article className="max-w-3xl mx-auto text-base text-slate-700 leading-relaxed space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            A Practical Guide to Resizing Images
          </h2>
          <p>
            Resizing sounds simple, but a few basic ideas make the difference between a sharp, correctly
            sized picture and one that is blurry, stretched, or far heavier than it needs to be. This guide
            explains what actually changes when you resize an image, how this tool does it, and how to get
            good results for the most common jobs.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Pixel dimensions vs. file size</h3>
          <p>
            Every digital image is a grid of pixels. A photo described as 4000 × 3000 has 4,000 pixels across
            and 3,000 down, or twelve million pixels in total. That grid is the image's <strong>dimensions</strong>,
            and it is what this tool changes.
          </p>
          <p>
            <strong>File size</strong>, measured in kilobytes or megabytes, is a separate thing. It depends on
            the number of pixels, but also on the file format, the compression level, and how much detail the
            picture contains. A photo of a clear blue sky compresses far better than a photo of gravel at the
            same dimensions. Reducing dimensions almost always reduces file size, because there are fewer pixels
            to store, but the two are not linked by a fixed formula. Halving the width and height leaves a
            quarter of the pixels, and the file typically shrinks by a similar order of magnitude, though the
            exact result varies. That is why the tool shows the new file size after each resize, so you can see
            the real outcome rather than guess.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">The DPI myth</h3>
          <p>
            You will often see advice to save web images at "72 DPI". DPI (dots per inch) or PPI only matters
            when an image is printed: it tells a printer how many pixels to place in each inch of paper. Screens
            ignore it entirely. A 1080 × 1080 image looks identical on a website whether its file says 72 or 300
            DPI. If you need a certain size on screen, change the pixel dimensions. If you are preparing a print,
            work backwards: a 6 × 4 inch print at 300 pixels per inch needs roughly 1800 × 1200 pixels.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Downscaling vs. upscaling</h3>
          <p>
            Making an image smaller (downscaling) is the safe direction. Several original pixels are blended into
            each new one, so edges stay clean and the result usually looks crisp. Making an image larger
            (upscaling) is different: the software has to invent the new pixels by averaging their neighbours.
            It cannot recover detail the camera never recorded, so a heavily enlarged image looks soft. Small
            enlargements, up to the 200% this tool allows, can be acceptable for things like web banners, but
            whenever possible start from the largest original you have and scale down.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Aspect ratio and fitting to a new shape</h3>
          <p>
            Aspect ratio is the relationship between width and height: 1:1 for a square, 4:3 for many camera
            photos, 16:9 for widescreen video. When you change one side without the other, the image gets
            squashed or stretched. In the <strong>By Pixels</strong> mode the aspect ratio lock is switched on by
            default and recalculates the other side from your original proportions. Percentage scaling always
            keeps the proportions because both sides change by the same amount.
          </p>
          <p>
            Presets are different, because a 16:9 YouTube thumbnail and a 4:5 Instagram portrait rarely match the
            shape of your photo. The <strong>Fit Mode</strong> option decides what happens:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Contain</strong> (default) keeps the whole image visible and centers it, filling the empty
              bands with white for JPG or leaving them transparent for PNG and WebP.
            </li>
            <li>
              <strong>Crop</strong> fills the frame completely and trims whatever overflows, evenly from both
              sides. Best when the subject is in the middle of the photo.
            </li>
            <li>
              <strong>Stretch</strong> forces the exact dimensions and distorts the picture if the shapes differ.
              Rarely what you want for photos.
            </li>
          </ul>
          <p>
            The fit mode is selected in the presets panel, but the chosen setting also applies when you unlock
            the aspect ratio in By Pixels mode and enter a width and height of a different shape.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">How this tool works under the hood</h3>
          <p>
            When you choose a file, your browser decodes it locally and reads its original width and height.
            When you click Resize, the tool creates an HTML5 canvas at the target size, draws your image onto it
            with the browser's high-quality smoothing enabled, and then encodes the canvas as a JPG, PNG, or WebP
            file. The finished file is held in memory and offered as a download. Nothing is sent over the
            network, which also means the speed depends on your device rather than an internet connection.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Common use cases</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Social media:</strong> presets cover Instagram square, portrait and Story sizes, YouTube
              thumbnails and channel banners, Facebook shared posts, the Twitter / X header and the LinkedIn cover.
            </li>
            <li>
              <strong>Websites and blogs:</strong> a 6000-pixel camera photo shown in an 800-pixel column wastes
              bandwidth. Resizing to roughly the displayed width (or twice that for high-density screens) makes
              pages load faster.
            </li>
            <li>
              <strong>Email and forms:</strong> many upload forms and mailboxes cap attachment sizes. Scaling to
              50% and exporting as JPG is often enough to get under the limit.
            </li>
            <li>
              <strong>Profile pictures:</strong> the 512 × 512 avatar preset produces a clean square for most
              services.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Tips for the best result</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Check the original dimensions shown after you pick a file, and avoid enlarging small images by much.</li>
            <li>Pick the output format for the content: JPG for photos, PNG for screenshots, logos and anything with transparency, WebP when you want smaller files for the web.</li>
            <li>For JPG and WebP, a quality of 80–90% is a sensible starting point. Lower it gradually if the file is still too large, and check the preview for blockiness.</li>
            <li>When using a preset with a photo of a different shape, try Crop first for a full-frame look, and switch to Contain if important parts get cut off.</li>
            <li>Keep your original file. Each resize creates a new copy, and resizing an already-resized image repeatedly loses quality.</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Troubleshooting common problems</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>The image looks squashed:</strong> the aspect ratio lock was off, or Stretch was selected.
              Turn the lock back on or switch the fit mode to Contain or Crop.
            </li>
            <li>
              <strong>White or empty bars appeared:</strong> this is Contain mode fitting your image into a frame of
              a different shape. Use Crop to fill the frame instead.
            </li>
            <li>
              <strong>Transparency disappeared:</strong> JPG cannot store transparency, so the background is
              filled with white. Export as PNG or WebP.
            </li>
            <li>
              <strong>The file got bigger:</strong> converting a photo to PNG, enlarging it, or setting quality to
              100% can all increase the size. Use JPG or WebP at a lower quality.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Limitations and privacy</h3>
          <p>
            The tool processes one image at a time, accepts JPG, PNG and WebP files, and scales between 10% and
            200% in percentage mode. Very large images are limited by your browser's memory and maximum canvas
            size, so extremely high-resolution files may fail to process on phones or older computers. Animated
            images are not supported as animations, and camera metadata such as EXIF and GPS location is not
            carried over to the resized file.
          </p>
          <p>
            Because everything runs inside your browser, your photos are never uploaded, stored, or seen by
            anyone else. Closing or refreshing the page discards the image and its resized copy.
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
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm sm:text-base font-semibold">{faq.q}</h3>
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
