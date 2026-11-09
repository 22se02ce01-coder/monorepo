import React from 'react';
import { Type, ChevronDown, Info, Zap } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Paste or Type Text',
      desc: 'Drop any block of text into the editor. Statistics update instantly as you type.',
    },
    {
      step: '02',
      title: 'Pick a Transformation',
      desc: 'Choose a case style (UPPERCASE, Title Case, camelCase…) or a cleanup action like removing duplicate lines.',
    },
    {
      step: '03',
      title: 'Copy or Download',
      desc: 'The editor is rewritten in place. Copy the result to your clipboard or download it as a .txt file.',
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      "q": "What is the difference between Title Case and Capitalize Words?",
      "a": "Capitalize Words uppercases the first letter of every word and leaves the remaining letters unchanged. Title Case follows headline style: it lowercases each word, capitalizes its first letter, and keeps short words such as a, an, the, and, of, to, in and for lowercase unless they begin the text."
    },
    {
      "q": "Why did my acronyms become lowercase?",
      "a": "Title Case and Sentence case lowercase every word before capitalizing, so NASA becomes Nasa and proper nouns inside a sentence lose their capitals. Fix those words by hand afterwards, or use Capitalize Words, which never lowercases letters."
    },
    {
      "q": "What are camelCase, snake_case and kebab-case used for?",
      "a": "They are naming conventions for code and URLs. camelCase (myVariableName) is common for JavaScript variables, snake_case (my_variable_name) for Python and database columns, and kebab-case (my-variable-name) for URL slugs, CSS classes and file names. The converter splits on spaces, punctuation and existing camel-case boundaries, then joins the words in the chosen style."
    },
    {
      "q": "How is reading time calculated?",
      "a": "It divides the word count by an average silent-reading speed of 200 words per minute and shows the result in minutes and seconds. It is an estimate; technical or unfamiliar text takes longer to read."
    },
    {
      "q": "How are words, sentences and paragraphs counted?",
      "a": "Words are runs of characters separated by spaces, tabs or line breaks. Sentences are counted by ending punctuation (full stops, question marks and exclamation marks), so abbreviations such as e.g. can inflate the count. Paragraphs are blocks of text separated by at least one blank line."
    },
    {
      "q": "What exactly does Remove Extra Spaces do?",
      "a": "It collapses runs of spaces and tabs into a single space, trims spaces from the start and end of every line, and reduces three or more consecutive line breaks to a single blank line. Single line breaks are kept."
    },
    {
      "q": "Is Remove Duplicate Lines case-sensitive?",
      "a": "Yes. Lines are removed only when they match an earlier line exactly, including capitalization and spacing. The first occurrence is kept in its original position. Run Remove Extra Spaces first if lines differ only by stray spaces."
    },
    {
      "q": "Why does Sort Lines put 10 before 2?",
      "a": "Lines are sorted alphabetically as text, so they are compared character by character. Pad numbers with leading zeros (02, 10) if you need numeric order."
    },
    {
      "q": "Can I undo a transformation?",
      "a": "There is no undo button, because each action rewrites the editor in place. Before a lossy step such as lowercase or a code-style conversion, copy your original text or download it as a .txt file so you can restore it."
    },
    {
      "q": "Does this tool send my text anywhere?",
      "a": "No. Every transformation and count runs locally in JavaScript in your browser tab. Your text is never uploaded, logged or stored, and it is gone when you close or refresh the page."
    }
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Instant Text Transformation & Counting
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Convert and Count Text Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Switch between case styles, clean up messy text, and read live statistics in seconds.
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
                <Type className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Everything Stays On Your Device</h4>
          <p>
            This converter is a pure client-side JavaScript utility. Your text is processed in
            browser memory only — nothing is transmitted to MicroFree servers or any third party.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-4 text-base text-slate-700 leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">A Practical Guide to Text Case Conversion and Cleanup</h2>
        <p>Most of the text we handle is copied from somewhere else: an email, a PDF, a spreadsheet export, a chat message or a web page. It rarely arrives in the shape we need. Headings are in capitals, lists contain duplicates, spacing is uneven and variable names need to follow a coding convention. This tool gathers the small, repetitive fixes into one editor so you can reshape text in a few clicks and see live statistics while you work.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">The case styles explained</h3>
        <p>Each button rewrites the whole editor in place. Here is what happens to the example phrase "the quick brown fox jumps over the lazy dog":</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">UPPERCASE</strong> gives THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG. Useful for labels and short warnings, but tiring to read in long passages.</li>
          <li><strong className="font-semibold text-slate-900">lowercase</strong> gives the quick brown fox jumps over the lazy dog. Handy for normalizing data such as email addresses or tags before comparing them.</li>
          <li><strong className="font-semibold text-slate-900">Title Case</strong> gives The Quick Brown Fox Jumps Over the Lazy Dog. Short connecting words (a, an, the, and, as, at, but, by, for, in, nor, of, on, or, per, to, vs, via) stay lowercase unless they start the text.</li>
          <li><strong className="font-semibold text-slate-900">Sentence case</strong> gives The quick brown fox jumps over the lazy dog. It capitalizes the first letter of the text and the first letter after each full stop, question mark or exclamation mark.</li>
          <li><strong className="font-semibold text-slate-900">Capitalize Words</strong> gives The Quick Brown Fox Jumps Over The Lazy Dog. Every word starts with a capital, including the small words.</li>
          <li><strong className="font-semibold text-slate-900">camelCase</strong> gives theQuickBrownFoxJumpsOverTheLazyDog.</li>
          <li><strong className="font-semibold text-slate-900">snake_case</strong> gives the_quick_brown_fox_jumps_over_the_lazy_dog.</li>
          <li><strong className="font-semibold text-slate-900">kebab-case</strong> gives the-quick-brown-fox-jumps-over-the-lazy-dog.</li>
        </ul>
        <p>The last three are programming conventions. The converter splits your text on spaces, punctuation and existing camel-case boundaries, so "userFirstName", "user first name" and "user-first-name" all become user_first_name in snake_case. That makes it quick to move a name between a JavaScript variable, a Python function and a URL slug.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Cleanup and reordering tools</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Remove Extra Spaces</strong> collapses runs of spaces and tabs into one space, trims every line and reduces large gaps of blank lines to a single blank line. Ideal after pasting from a PDF, where spacing is often broken.</li>
          <li><strong className="font-semibold text-slate-900">Remove Duplicate Lines</strong> keeps the first occurrence of each line and deletes later exact copies. Use it to deduplicate email lists, keywords or log entries.</li>
          <li><strong className="font-semibold text-slate-900">Remove Empty Lines</strong> deletes every blank or whitespace-only line, turning a loosely spaced list into a compact one.</li>
          <li><strong className="font-semibold text-slate-900">Reverse Text</strong> flips the order of every character, while <strong className="font-semibold text-slate-900">Reverse Word Order</strong> flips the order of words, for example turning "one two three" into "three two one".</li>
          <li><strong className="font-semibold text-slate-900">Sort Lines A–Z</strong> orders lines alphabetically using your browser's language-aware comparison.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Reading the statistics</h3>
        <p>The counters update as you type. Words are counted as runs of characters separated by whitespace, so "well-known" counts as one word. Characters include spaces and line breaks, and a second figure shows the count without any whitespace, which is what some forms and social platforms mean by "characters". Sentences are counted by their ending punctuation, and paragraphs are blocks separated by a blank line. Reading time assumes about 200 words per minute, so a 1,000-word article shows roughly five minutes.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Practical use cases</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fixing a heading that was typed with Caps Lock on: apply Sentence case or Title Case.</li>
          <li>Checking a meta description, tweet or product title against a character limit.</li>
          <li>Preparing a list of names for a spreadsheet: Remove Extra Spaces, then Remove Duplicate Lines, then Sort Lines.</li>
          <li>Turning a column title such as "Order Date Placed" into order_date_placed for a database, or a blog title into a kebab-case URL slug.</li>
          <li>Estimating how long a speech or article takes to read.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Common mistakes and limitations</h3>
        <p>Title Case and Sentence case lowercase the whole text before capitalizing, so acronyms (NASA, HTML) and proper names in the middle of a sentence lose their capitals. Fix those by hand, or use Capitalize Words, which never lowercases anything. Capitalize Words treats an apostrophe as a word boundary, so a contraction such as "don't" can come out as "Don'T"; Title Case handles contractions correctly.</p>
        <p>The code-style conversions recognize only the plain letters A–Z and digits. Accented letters such as é or ü are treated as separators and dropped, so check the output if your text is not plain English. These conversions also join the entire editor into one identifier, so convert one name at a time rather than a whole paragraph.</p>
        <p>Sorting is alphabetical, not numeric, so "10" sorts before "2". Duplicate removal is exact and case-sensitive: "Apple" and "apple" are both kept. Sentence counts can be thrown off by abbreviations such as "e.g." and by decimal numbers. Some emoji count as two characters because of how browsers store them internally.</p>
        <p>There is no undo button. Every action replaces the text in the editor, so copy or download your original first if you might need it again. The Download button saves the current text as a plain .txt file.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Privacy</h3>
        <p>All counting and conversion happens in JavaScript inside your browser tab. Your text is not uploaded to MicroFree or anyone else, not logged and not saved; refreshing or closing the page clears it. That makes the tool safe for drafts, internal documents and other text you would rather not paste into an online service that processes it on a server.</p>
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
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
