import React from 'react';
import { Zap, Binary, ChevronDown, Info } from 'lucide-react';

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
    title: 'Choose a Mode',
    desc: 'Switch between Text ⇄ Base64, Image → Base64, or Base64 → Image depending on what you need to convert.',
  },
  {
    step: '02',
    title: 'Paste or Upload',
    desc: 'Type your text, paste a Base64 string, or drop in an image. Everything is processed locally in your browser.',
  },
  {
    step: '03',
    title: 'Copy or Download',
    desc: 'Grab the result with one click, toggle URL-safe output, or download it as a file — no account needed.',
  },
];

const guide: GuideSection[] = [
  {
    h2: 'Understanding Base64: A Practical Guide',
    blocks: [
      {
        h3: 'What Base64 is',
        p: [
          'Base64 is a way of writing arbitrary binary data using only 64 safe, printable characters: the letters A to Z and a to z, the digits 0 to 9, and the symbols + and /. The equals sign = is used as padding at the end. It exists because many systems that move data around, such as email, JSON, XML, HTML attributes and URLs, were designed for text and can corrupt or reject raw bytes. Encoding those bytes as Base64 lets them travel safely through text-only channels.',
          'It is important to understand what Base64 is not. It is not encryption and it is not compression. Anyone can decode a Base64 string instantly, and the encoded form is always larger than the original.',
        ],
      },
      {
        h3: 'How the encoding works',
        p: [
          'Base64 reads the input three bytes (24 bits) at a time and splits those bits into four groups of six bits. Each six-bit group is a number from 0 to 63, which is mapped to one character of the alphabet. Three bytes therefore become four characters, which is why Base64 output is about 33 percent larger than the input. When the input length is not a multiple of three, the last group is padded and one or two = characters are added so the output length is always a multiple of four.',
          'Text has to become bytes before it can be encoded. This tool converts your text to bytes using UTF-8, the encoding used by almost all modern software, so accented letters, non-Latin scripts and emoji survive the round trip. When decoding, the bytes are interpreted as UTF-8 again.',
        ],
      },
    ],
  },
  {
    h2: 'What Each Mode Does',
    blocks: [
      {
        ul: [
          'Text ⇄ Base64 encodes any text you type to Base64, or decodes a Base64 string back to text. When encoding you can tick the URL-safe option, which swaps + for -, / for _ and removes the = padding. When decoding, the tool accepts both standard and URL-safe input, ignores spaces and line breaks, and restores missing padding automatically.',
          'Image → Base64 reads an image file from your device and produces a complete data URI, for example data:image/png;base64,... You can copy it as is, or tick the option to copy only the raw Base64 without the data: prefix. A preview confirms the right file was read.',
          'Base64 → Image takes either a full data URI or a raw Base64 string, shows a preview of the decoded picture, and lets you download it. If you paste raw Base64 without a prefix, it is treated as a PNG data URI for display.',
        ],
      },
    ],
  },
  {
    h2: 'Common Use Cases',
    blocks: [
      {
        ul: [
          'Embedding a small icon or logo directly in HTML or CSS as a data URI so it loads without an extra network request.',
          'Inspecting the value of an HTTP Basic Authorization header, which is the Base64 of username:password, while debugging an API.',
          'Reading Base64 fields in API responses, Kubernetes secrets, configuration files or email source code.',
          'Producing URL-safe tokens or identifiers that can be placed in query strings and file names without escaping.',
          'Checking whether an image stored as Base64 in a database or JSON payload is actually the picture you expect.',
        ],
      },
    ],
  },
  {
    h2: 'Tips and Troubleshooting',
    blocks: [
      {
        ol: [
          'If decoding fails with an invalid input message, check that the whole string was copied. A length that leaves one stray character after grouping into fours cannot be valid Base64, and characters outside the alphabet, such as quotes or commas picked up from surrounding code, will also cause an error.',
          'If decoded text shows strange symbols such as the replacement character, the original data was probably not UTF-8 text. It may be an image, a compressed file or text in a legacy encoding, which cannot be shown correctly as text.',
          'If a decoded image does not appear, the data may be truncated or may not be an image at all. Make sure you pasted the complete string, including the end.',
          'Prefer data URIs only for small assets. Because Base64 adds roughly a third to the size and cannot be cached separately by the browser, large images are usually better served as normal files.',
          'Use URL-safe output when the result will appear in a URL, cookie or file name; use standard output for email, JSON and most APIs unless their documentation says otherwise.',
        ],
      },
    ],
  },
  {
    h2: 'Limitations and Privacy',
    blocks: [
      {
        p: [
          'The text decoder always interprets bytes as UTF-8, so it is designed for text, not for recovering arbitrary binary files. The image converter accepts any image type your browser can read, and very large files produce very long strings that can make the text areas slow to scroll. Downloaded decoded images are saved under a generic file name, so you may want to add the correct extension yourself.',
          'Because Base64 is trivially reversible, never treat it as a way to hide passwords or secrets. All encoding and decoding on this page happens inside your browser using native JavaScript, and nothing you paste or upload is sent to a server.',
        ],
      },
    ],
  },
];

const faqs: Faq[] = [
  {
    q: 'What is Base64 encoding used for?',
    a: 'Base64 represents binary data using 64 printable characters so it can travel through systems designed for text. It is commonly used to embed images in HTML or CSS as data URIs, carry binary data inside JSON or XML, encode email attachments and build HTTP Basic authentication headers.',
  },
  {
    q: 'Is Base64 a form of encryption?',
    a: 'No. Base64 is an encoding, not encryption. Anyone can decode it without a key, so it must never be used on its own to protect passwords, tokens or other secrets.',
  },
  {
    q: 'Why is Base64 output larger than the input?',
    a: 'Every 3 bytes of input become 4 characters of output, so encoded data is roughly 33 percent larger than the original, plus up to two padding characters.',
  },
  {
    q: 'Does this tool handle emoji and non-English text correctly?',
    a: 'Yes. Text is converted to UTF-8 bytes with the browser TextEncoder before encoding and decoded back with TextDecoder, so emoji, accented letters and scripts such as Arabic, Hindi and Chinese round-trip correctly.',
  },
  {
    q: 'What is URL-safe Base64?',
    a: 'Standard Base64 uses the + and / characters and = padding, which have special meanings in URLs. URL-safe Base64 replaces + with -, / with _ and removes the padding. Tick the URL-safe option when encoding text to produce this variant.',
  },
  {
    q: 'Can I decode URL-safe Base64 or strings without padding?',
    a: 'Yes. The decoder converts - and _ back to + and /, removes spaces and line breaks, and adds any missing = padding before decoding.',
  },
  {
    q: 'How do I convert an image to a Base64 data URI?',
    a: 'Open the Image to Base64 tab and choose or drop an image file. The tool produces a full data URI that you can paste into an img src attribute or a CSS url() value. Tick the raw option if you only need the Base64 part without the data: prefix.',
  },
  {
    q: 'Why does my decoded text contain strange characters?',
    a: 'The decoder interprets the bytes as UTF-8 text. If the original data was binary, such as an image or compressed file, or text in a different character encoding, it cannot be displayed correctly and invalid sequences appear as replacement characters.',
  },
  {
    q: 'Are my files or text sent to a server?',
    a: 'No. All encoding and decoding happens entirely in your browser using native JavaScript APIs. Your text, images and tokens are never uploaded, logged or stored.',
  },
];
// end faqs

export const SEO: React.FC = () => {
  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Unicode-Safe Base64 Conversion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Encode & Decode Base64 Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Convert text and images to and from Base64 in seconds, with full UTF-8 and URL-safe support.
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
                <Binary className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-base text-blue-950">100% Local Processing</h4>
          <p>
            Base64 conversion runs on native browser APIs in your device memory. No text, token, or
            image is ever transmitted to our servers or any third-party server.
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
