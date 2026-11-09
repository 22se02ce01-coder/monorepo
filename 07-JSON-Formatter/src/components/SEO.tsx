import React from 'react';
import { Zap, Braces, ChevronDown, Info } from 'lucide-react';

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
    title: 'Paste Your JSON',
    desc: 'Drop raw, messy, or minified JSON straight into the editor. API responses, config files, and log fragments all work.',
  },
  {
    step: '02',
    title: 'Format or Validate',
    desc: 'Click Beautify to indent it cleanly, Minify to compact it, or Validate to catch syntax errors with their line and column position.',
  },
  {
    step: '03',
    title: 'Copy or Download',
    desc: 'Grab the highlighted result with one click to clipboard, or download it as a .json file ready to commit or share.',
  },
];

const guide: GuideSection[] = [
  {
    h2: 'A Practical Guide to Formatting and Validating JSON',
    blocks: [
      {
        h3: 'What JSON is and why formatting matters',
        p: [
          'JSON (JavaScript Object Notation) is a plain-text format for structured data. It is built from just a few pieces: objects wrapped in curly braces that hold "key": value pairs, arrays wrapped in square brackets, and values that are strings, numbers, true, false or null. Almost every web API, many configuration files and a lot of logging systems use it.',
          'Machines do not care about whitespace, so JSON is often sent as one long line. That is efficient, but nearly impossible for a person to read or debug. A formatter adds consistent indentation and line breaks so you can see the nesting at a glance, while a validator tells you whether the text is legal JSON at all and, if not, roughly where it breaks.',
        ],
      },
      {
        h3: 'How this tool works under the hood',
        p: [
          'When you click Beautify, Minify or Validate, the text you pasted is handed to your browser built-in JSON parser, the same strict parser that JavaScript applications use. If parsing succeeds, the resulting data is written back out: with your chosen indentation (2 spaces, 4 spaces or tabs) for Beautify, or with no optional whitespace at all for Minify. The output is then split into tokens so keys, strings, numbers, booleans and null can be coloured differently.',
          'If parsing fails, the tool reads the error message from the browser. Where the message includes a character offset, that offset is converted into a line and column number so you know where to look. After a successful run you also see a short summary: the number of keys, the total number of values (nodes) and how deeply the structure is nested.',
        ],
      },
    ],
  },
  {
    h2: 'Common Use Cases',
    blocks: [
      {
        ul: [
          'Reading an API response copied from browser developer tools, curl or Postman that arrives as a single unreadable line.',
          'Checking a package.json, tsconfig-style or application config file for a syntax error before deploying.',
          'Minifying JSON before embedding it in an HTML attribute, an environment variable or a request body where size and single-line output matter.',
          'Normalising indentation so two JSON files can be compared in a diff tool without whitespace noise.',
          'Getting a quick sense of the size and depth of an unfamiliar payload using the key, node and depth counts.',
        ],
      },
    ],
  },
  {
    h2: 'Step-by-Step Tips',
    blocks: [
      {
        ol: [
          'Paste the complete document. A truncated copy, for example from a log viewer that cuts long lines, will always fail validation with an "unexpected end" style error.',
          'Choose your indentation before clicking Beautify. Two spaces is the most common convention in JavaScript projects, four spaces is common in Python and Java projects, and tabs suit teams that prefer them.',
          'Use Validate when you only want a yes or no answer and the error location, without replacing the output pane.',
          'If an error is reported, go to the line and column shown and also check the character just before it. A missing comma or quote is usually detected one token after the actual mistake.',
          'Use Copy or Download once you are happy. The download is saved as microfree-formatted.json.',
        ],
      },
    ],
  },
  {
    h2: 'Common Mistakes and Troubleshooting',
    blocks: [
      {
        p: ['Most invalid JSON comes from habits that are fine in JavaScript or other formats but not allowed by the JSON standard:'],
        ul: [
          'Trailing commas, such as a comma after the last item in an array or object.',
          'Single quotes around strings or keys. JSON requires double quotes for both.',
          'Unquoted keys, as in { name: "Ada" } instead of { "name": "Ada" }.',
          'Comments using // or /* */. Standard JSON has no comment syntax, so files like JSONC or JSON5 need their comments removed first.',
          'Special values like undefined, NaN or Infinity, and numbers with leading zeros or a leading plus sign.',
          'Unescaped line breaks or tab characters inside a string, or a lone backslash that should be written as \\\\.',
          'Smart quotes pasted from a word processor or chat app, which look like quotes but are different characters.',
        ],
      },
    ],
  },
  {
    h2: 'Limitations Worth Knowing',
    blocks: [
      {
        p: [
          'Because the tool re-serialises your data rather than just re-spacing the text, a few details can change. Numbers larger than JavaScript can represent exactly (above 9,007,199,254,740,991) may lose precision, so very large IDs should be stored as strings. If an object contains the same key twice, only the last value is kept. Keys that look like whole numbers, such as "10" or "2", are output before other keys and in numeric order, which is how JavaScript objects order such keys. Number formats can also be normalised, for example 1.0 becomes 1.',
          'The tool formats exactly one JSON document at a time, so newline-delimited JSON (one object per line) will be reported as invalid. Very large documents are limited only by your browser memory, but syntax highlighting of many megabytes of output can make the page feel slower.',
        ],
      },
      {
        h3: 'Privacy',
        p: [
          'Everything happens locally in your browser tab. Your JSON is never sent to a server, which makes the tool suitable for payloads containing internal data, though as a general habit you should still avoid pasting live production secrets into any website.',
        ],
      },
    ],
  },
];

const faqs: Faq[] = [
  {
    q: 'How does the validator pinpoint errors?',
    a: 'The tool parses your text with the browser native JSON parser. When parsing fails and the browser reports a character position, that position is converted into a line and column number so you can jump to the trailing comma, missing quote or stray bracket. The actual mistake is often just before the reported spot.',
  },
  {
    q: 'What is the difference between beautify and minify?',
    a: 'Beautify expands JSON with consistent indentation and line breaks so people can read nested structures easily. Minify removes every optional space and line break to produce the smallest valid text, which is useful for network transfer or embedding.',
  },
  {
    q: 'Which indentation options are available?',
    a: 'You can beautify with 2 spaces, 4 spaces or tab characters. Choose the option before clicking Beautify; it does not affect minified output.',
  },
  {
    q: 'Is my JSON sent to a server?',
    a: 'No. Parsing, formatting, highlighting and validation all run locally in your browser tab using native JavaScript. Your data is never uploaded or stored.',
  },
  {
    q: 'Can it handle large JSON documents?',
    a: 'Yes, within the limits of your browser memory. There is no upload cap because nothing is uploaded, but highlighting very large outputs of many megabytes can make the page slower to respond.',
  },
  {
    q: 'Why does my JSON with comments or trailing commas fail validation?',
    a: 'The tool follows the strict JSON standard, which does not allow comments, trailing commas, single-quoted strings or unquoted keys. Formats such as JSONC and JSON5 permit these, so remove them before formatting.',
  },
  {
    q: 'Why did a very large number change after formatting?',
    a: 'JavaScript numbers can only represent integers exactly up to 9,007,199,254,740,991. Larger integers lose precision when parsed and re-written. If you need exact large IDs, store them as strings in your JSON.',
  },
  {
    q: 'Does formatting change the order of my keys?',
    a: 'Key order is preserved in general, with one exception: keys that look like non-negative whole numbers, such as "1" or "42", are written first in ascending numeric order, because that is how JavaScript objects order such keys.',
  },
  {
    q: 'What do the keys, nodes and depth numbers mean?',
    a: 'After a successful run, keys is the total number of object keys, nodes is the total number of values including objects, arrays and the root, and depth is how many levels deep the most nested value sits.',
  },
];
// end faqs

export const SEO: React.FC = () => {
  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Instant Browser-Side JSON Processing
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Format & Validate JSON Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Turn unreadable JSON into clean, validated, syntax-highlighted output in seconds.
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
                <Braces className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-base text-blue-950">Zero-Upload Privacy</h4>
          <p>
            This formatter never transmits your JSON. Parsing and highlighting happen in your browser memory, making it safe for API keys, access tokens, and confidential configuration.
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
