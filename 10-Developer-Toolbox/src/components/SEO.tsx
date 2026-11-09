import React from 'react';
import { Terminal, ChevronDown, ShieldCheck } from 'lucide-react';
import { TOOLS } from './tools/registry';

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
    title: 'Pick a Utility',
    desc: 'Select any of the tools from the sidebar — formatters, encoders, converters, or generators.',
  },
  {
    step: '02',
    title: 'Paste or Type',
    desc: 'Drop in your code, text, or value. Everything is processed instantly in your browser.',
  },
  {
    step: '03',
    title: 'Copy the Result',
    desc: 'Grab the formatted, encoded, or generated output with one click. Nothing is ever uploaded.',
  },
];

const guide: GuideSection[] = [
  {
    h2: 'A Guide to the Developer Toolbox',
    blocks: [
      {
        p: [
          'Most development work involves small, repetitive chores: decoding a URL from a log, tidying a block of minified CSS, checking what a timestamp means, or confirming that a regular expression matches what you think it does. Each one takes seconds if the right tool is at hand and minutes if you have to search for it. This toolbox collects these everyday utilities on one page, with a consistent layout and no sign-up. Every tool runs as plain JavaScript in your browser, so results appear as you work and nothing you paste leaves your device.',
        ],
      },
      {
        h3: 'Encoders and decoders',
        p: [
          'The URL encoder uses the standard encodeURIComponent function, which percent-encodes every character except letters, digits and a few safe symbols such as - _ . ! ~ * \' ( ). Use it for individual query-string values or path segments rather than a complete URL, because it also encodes the : / ? & and = characters that give a URL its structure. The decoder turns + into a space before decoding, matching how HTML forms submit data.',
          'The HTML entity encoder escapes the five characters that matter in markup, & < > " and \', so text can be shown safely inside HTML. The decoder understands numeric entities in decimal and hexadecimal form plus common named entities such as &nbsp;, &copy;, &mdash; and &hellip;.',
        ],
      },
      {
        h3: 'Formatters and minifiers',
        p: [
          'The HTML, CSS, JavaScript and XML tools re-indent code so its structure is easy to scan, and the minifiers remove comments and unnecessary whitespace to make files smaller. They are deliberately lightweight, text-based tools rather than full parsers or compilers. The JavaScript minifier keeps strings, template literals and regular expressions intact but does not rename variables or remove dead code, so it will not match the output of a build tool such as Terser or esbuild. The XML formatter indents elements but does not validate the document against a schema.',
        ],
      },
      {
        h3: 'Generators and converters',
        p: [
          'The UUID generator creates between 1 and 100 version 4 UUIDs at a time using crypto.getRandomValues, the browser cryptographically secure random number source. The Unix timestamp converter accepts seconds or milliseconds and shows the moment as an ISO 8601 string, a UTC date, your local date and a relative description such as 3 hours ago; it can also turn a typed date back into a timestamp. The colour converter keeps HEX, RGB and HSL values in sync with a live swatch.',
        ],
      },
      {
        h3: 'Testers and previewers',
        p: [
          'The regex tester compiles your pattern with the JavaScript RegExp engine, highlights every match in the test text, and lists capture groups and the match count. You can toggle the g, i, m, s and u flags. The Markdown previewer renders headings, bold and italic text, inline code, fenced code blocks, blockquotes, ordered and unordered lists, horizontal rules and http or https links. All input is HTML-escaped first, so raw HTML and scripts in the Markdown are displayed as text, never executed.',
        ],
      },
    ],
  },
  {
    h2: 'Practical Use Cases',
    blocks: [
      {
        ul: [
          'Decoding a percent-encoded redirect URL or tracking parameter copied from server logs.',
          'Pretty-printing a minified stylesheet or script from a production site to understand how a page is built.',
          'Generating test IDs for database fixtures, mock API responses or idempotency keys.',
          'Converting a timestamp from a log line, database row or JWT claim into a readable date, or finding the epoch value for a specific deadline.',
          'Building and debugging a validation pattern for emails, order numbers or log parsing before putting it into code.',
          'Translating a designer HEX colour into RGB or HSL for CSS variables, or adjusting lightness in HSL and copying the new HEX value.',
        ],
      },
    ],
  },
  {
    h2: 'Tips and Common Mistakes',
    blocks: [
      {
        ol: [
          'Do not URL-encode a whole URL when you only need to encode one parameter value; encoding the entire string breaks its structure. Encode the value, then join it into the URL.',
          'Watch the timestamp unit. Unix time is usually in seconds, but JavaScript and many APIs use milliseconds. If a converted date lands in 1970 or tens of thousands of years in the future, switch between seconds and milliseconds.',
          'Dates typed without a time zone, such as 2026-11-07 14:30, are generally read as your local time, while ISO strings ending in Z are UTC. Include an offset when precision matters.',
          'In the regex tester, enable the g flag to see every match; without it only the first match is reported. Remember that patterns are JavaScript flavour, which differs in places from PCRE, Python or Java.',
          'Review minified CSS that uses calc(). The CSS minifier removes spaces around + characters, and calc() requires spaces around + and -, so check those expressions after minifying.',
          'HTML formatting and minification collapse whitespace between tags. Content inside pre elements or spacing between inline elements can change, so check the result if exact whitespace matters.',
        ],
      },
    ],
  },
  {
    h2: 'Privacy and Limitations',
    blocks: [
      {
        p: [
          'Because everything runs locally, the toolbox is safe to use with internal code and data that should not be uploaded to a third-party service, and it keeps working if your connection drops after the page has loaded. The trade-off is that these are quick utilities rather than replacements for your build pipeline, linter or test suite. For production assets, keep using a dedicated bundler and minifier, and treat the output here as a convenient first look rather than a final artefact.',
        ],
      },
    ],
  },
];

const faqs: Faq[] = [
  {
    q: 'Is my code or data sent to a server?',
    a: 'No. Every utility in the Developer Toolbox runs entirely in your browser using native JavaScript APIs. Your snippets and text never leave your device.',
  },
  {
    q: 'How good is the JavaScript minifier?',
    a: 'It is a conservative minifier: it strips comments and collapses whitespace while preserving strings, template literals and regular expressions. It is useful for quick size reduction, but it does not rename variables or remove unused code like a full optimising tool such as Terser or esbuild.',
  },
  {
    q: 'Is the Markdown previewer safe from XSS?',
    a: 'Yes. All input is HTML-escaped first and only a small, known set of tags is generated. Links are only created for http and https addresses. Raw HTML, scripts, iframes and event handlers in your Markdown are shown as text and never executed.',
  },
  {
    q: 'Are the generated UUIDs truly random?',
    a: 'The UUID generator uses crypto.getRandomValues, the browser cryptographically secure random source, to produce RFC 4122 version 4 identifiers. You can generate between 1 and 100 at a time.',
  },
  {
    q: 'What is the difference between URL encoding and HTML entity encoding?',
    a: 'URL encoding replaces unsafe characters with percent codes such as %20 so text can be placed inside a URL. HTML entity encoding replaces characters such as < and & with entities such as &lt; and &amp; so text can be displayed safely inside HTML. They solve different problems and are not interchangeable.',
  },
  {
    q: 'Why does my converted timestamp show a date in 1970 or far in the future?',
    a: 'The value is probably in the wrong unit. A Unix timestamp in seconds read as milliseconds lands near 1970, and a millisecond value read as seconds lands thousands of years ahead. Switch between seconds and milliseconds in the converter.',
  },
  {
    q: 'Which regular expression syntax does the regex tester use?',
    a: 'It uses the JavaScript RegExp engine built into your browser, with the g, i, m, s and u flags available. Most common syntax is shared with other languages, but some features differ from PCRE, Python or Java, so test in your target language as well.',
  },
  {
    q: 'Which colour formats can the colour converter handle?',
    a: 'It converts between HEX, RGB and HSL. Changing any one of them updates the others and the live colour swatch.',
  },
  {
    q: 'Does the XML formatter validate my XML?',
    a: 'No. It re-indents elements to make the structure readable but does not check the document for well-formedness or validate it against a schema or DTD.',
  },
];
// end faqs

export const SEO: React.FC = () => {
  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Terminal className="h-3.5 w-3.5" /> {TOOLS.length} Utilities in One Place
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your All-in-One Developer Toolbox
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A fast, offline-capable collection of the formatting, encoding, and generation tools
            developers reach for every day.
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
                <Terminal className="h-6 w-6 text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tool grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 text-center mb-6">Every Tool Included</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-200 transition"
              >
                <div className="rounded-lg bg-brand-50 p-2 text-brand-600 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{t.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 shrink-0">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="text-sm text-blue-900 space-y-1">
          <h4 className="font-bold text-base text-blue-950">100% Client-Side & Private</h4>
          <p>
            None of your code, text, or data is ever transmitted. All formatting, encoding, decoding,
            and generation happens locally in your browser — even if you go offline after loading the page.
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
