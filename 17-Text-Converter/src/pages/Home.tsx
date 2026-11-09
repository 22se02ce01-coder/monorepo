import React, { useState, useMemo } from 'react';
import {
  Copy,
  Download,
  Trash2,
  Check,
  Type as TypeIcon,
  FileText,
  Hash,
  AlignLeft,
  Clock,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  getStats,
  formatReadingTime,
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCapitalizedWords,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  removeExtraSpaces,
  removeDuplicateLines,
  removeEmptyLines,
  reverseText,
  reverseWords,
  sortLines,
} from '../services/textService';

const EXAMPLE_TEXT =
  'the quick brown fox jumps over the lazy dog.\nMicroFree builds fast, private browser tools.\nthe quick brown fox jumps over the lazy dog.';

type Transform = { label: string; fn: (t: string) => string };

const caseTransforms: Transform[] = [
  { label: 'UPPERCASE', fn: toUpperCase },
  { label: 'lowercase', fn: toLowerCase },
  { label: 'Title Case', fn: toTitleCase },
  { label: 'Sentence case', fn: toSentenceCase },
  { label: 'Capitalize Words', fn: toCapitalizedWords },
  { label: 'camelCase', fn: toCamelCase },
  { label: 'snake_case', fn: toSnakeCase },
  { label: 'kebab-case', fn: toKebabCase },
];

const utilityTransforms: Transform[] = [
  { label: 'Remove Extra Spaces', fn: removeExtraSpaces },
  { label: 'Remove Duplicate Lines', fn: removeDuplicateLines },
  { label: 'Remove Empty Lines', fn: removeEmptyLines },
  { label: 'Reverse Text', fn: reverseText },
  { label: 'Reverse Word Order', fn: reverseWords },
  { label: 'Sort Lines A–Z', fn: sortLines },
];

export const Home: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => getStats(text), [text]);

  const apply = (fn: (t: string) => string) => {
    setText((prev) => fn(prev));
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'microfree-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const statItems = [
    { icon: FileText, label: 'Words', value: stats.words },
    { icon: Hash, label: 'Characters', value: stats.characters },
    { icon: Hash, label: 'No Spaces', value: stats.charactersNoSpaces },
    { icon: AlignLeft, label: 'Lines', value: stats.lines },
    { icon: AlignLeft, label: 'Sentences', value: stats.sentences },
    { icon: AlignLeft, label: 'Paragraphs', value: stats.paragraphs },
  ];

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Text <span className="text-brand-600">Case Converter</span> & Counter
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Convert between case styles, clean up messy text, and count words, characters and lines — 100% in your browser.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
        {/* Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700">Your Text</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setText(EXAMPLE_TEXT)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Load Example
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here…"
            spellCheck={false}
            className="w-full min-h-[200px] rounded-xl border border-slate-300 bg-slate-50/50 p-4 text-sm text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white resize-y"
          />
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {statItems.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"
            >
              <div className="flex items-center justify-center gap-1 text-slate-400">
                <s.icon className="h-3 w-3" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">{s.label}</span>
              </div>
              <div className="text-lg font-bold text-slate-900">{s.value.toLocaleString()}</div>
            </div>
          ))}
          <div className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-center">
            <div className="flex items-center justify-center gap-1 text-brand-500">
              <Clock className="h-3 w-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Reading</span>
            </div>
            <div className="text-sm font-bold text-brand-700">
              {formatReadingTime(stats.readingTimeMinutes)}
            </div>
          </div>
        </div>

        {/* Case transforms */}
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <TypeIcon className="h-3.5 w-3.5" /> Change Case
          </h4>
          <div className="flex flex-wrap gap-2">
            {caseTransforms.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => apply(t.fn)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 transition"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Utility transforms */}
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <AlignLeft className="h-3.5 w-3.5" /> Clean Up & Reorder
          </h4>
          <div className="flex flex-wrap gap-2">
            {utilityTransforms.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => apply(t.fn)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 transition"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!text}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <Download className="h-4 w-4" />
            <span>Download .txt</span>
          </button>
          <button
            type="button"
            onClick={() => setText('')}
            disabled={!text}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-text" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
