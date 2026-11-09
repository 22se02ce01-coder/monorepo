import React, { useState, useMemo } from 'react';
import {
  Braces,
  Minimize2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Trash2,
  FileJson,
  Check,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  validateJson,
  formatJson,
  minifyJson,
  computeStats,
  tokenizeJson,
  EXAMPLE_JSON,
  IndentOption,
  TokenClass,
  JsonStats,
} from '../services/jsonService';

const TOKEN_COLORS: Record<TokenClass, string> = {
  key: 'text-brand-700 font-semibold',
  string: 'text-emerald-700',
  number: 'text-amber-600',
  boolean: 'text-coral-600 font-medium',
  null: 'text-slate-400 italic',
  punctuation: 'text-slate-500',
  whitespace: '',
};

export const Home: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [indent, setIndent] = useState<IndentOption>('2');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [stats, setStats] = useState<JsonStats | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const tokens = useMemo(() => (output ? tokenizeJson(output) : []), [output]);

  const resetStatus = () => {
    setError(null);
    setIsValid(false);
    setStats(null);
  };

  const handleFormat = () => {
    const check = validateJson(input);
    if (!check.valid) {
      setOutput('');
      setIsValid(false);
      setStats(null);
      setError(
        check.line
          ? `${check.error} (line ${check.line}, column ${check.column})`
          : check.error || 'Invalid JSON.'
      );
      return;
    }
    try {
      const formatted = formatJson(input, indent);
      setOutput(formatted);
      setStats(computeStats(input));
      setIsValid(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to format JSON.');
    }
  };

  const handleMinify = () => {
    const check = validateJson(input);
    if (!check.valid) {
      setOutput('');
      setIsValid(false);
      setStats(null);
      setError(
        check.line
          ? `${check.error} (line ${check.line}, column ${check.column})`
          : check.error || 'Invalid JSON.'
      );
      return;
    }
    try {
      const minified = minifyJson(input);
      setOutput(minified);
      setStats(computeStats(input));
      setIsValid(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to minify JSON.');
    }
  };

  const handleValidate = () => {
    const check = validateJson(input);
    if (check.valid) {
      setIsValid(true);
      setStats(computeStats(input));
      setError(null);
    } else {
      setIsValid(false);
      setStats(null);
      setError(
        check.line
          ? `${check.error} (line ${check.line}, column ${check.column})`
          : check.error || 'Invalid JSON.'
      );
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    resetStatus();
  };

  const handleExample = () => {
    setInput(EXAMPLE_JSON);
    setOutput('');
    resetStatus();
  };

  const handleCopy = async () => {
    const text = output || input;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleDownload = () => {
    const text = output || input;
    if (!text) return;
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'microfree-formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputBytes = new Blob([input]).size;

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">JSON Formatter</span> & Validator
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Beautify, minify, and validate JSON with syntax highlighting and precise error locations. 100% private, client-side processing.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            type="button"
            onClick={handleFormat}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
          >
            <Braces className="h-3.5 w-3.5" /> Beautify
          </button>
          <button
            type="button"
            onClick={handleMinify}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Minimize2 className="h-3.5 w-3.5" /> Minify
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Validate
          </button>

          <div className="flex items-center gap-1 ml-auto">
            <span className="text-[11px] font-semibold text-slate-500">Indent:</span>
            {(['2', '4', 'tab'] as IndentOption[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setIndent(opt)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold border transition ${
                  indent === opt
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt === 'tab' ? 'Tab' : `${opt} sp`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <FileJson className="h-4 w-4 text-brand-600" /> Input JSON
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleExample}
                  className="text-[11px] font-semibold text-brand-600 hover:underline"
                >
                  Load Example
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-coral-600"
                >
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                resetStatus();
              }}
              spellCheck={false}
              placeholder='{ "hello": "world" }'
              className="h-80 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              {input.length.toLocaleString()} characters • {(inputBytes / 1024).toFixed(2)} KB
            </p>
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">Formatted Output</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output && !input}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-brand-600 disabled:opacity-40"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!output && !input}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-brand-600 disabled:opacity-40"
                >
                  <Download className="h-3 w-3" /> Download
                </button>
              </div>
            </div>
            <div className="h-80 w-full overflow-auto rounded-xl border border-slate-300 bg-slate-900 p-4">
              {output ? (
                <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
                  {tokens.map((t, idx) => (
                    <span key={idx} className={TOKEN_COLORS[t.cls] || 'text-slate-200'}>
                      {t.text}
                    </span>
                  ))}
                </pre>
              ) : (
                <p className="font-mono text-xs text-slate-500">
                  Formatted, syntax-highlighted JSON appears here.
                </p>
              )}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {output ? `${output.length.toLocaleString()} characters` : 'Awaiting output'}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4">
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-coral-100 bg-coral-50 px-4 py-3 text-xs font-medium text-coral-600">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {isValid && !error && (
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Valid JSON
              </span>
              {stats && (
                <>
                  <span>{stats.keys.toLocaleString()} keys</span>
                  <span>{stats.nodes.toLocaleString()} nodes</span>
                  <span>depth {stats.depth}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-json" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
