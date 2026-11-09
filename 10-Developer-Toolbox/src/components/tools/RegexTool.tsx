import React, { useMemo, useState } from 'react';
import { ToolHeading, inputClass, monoAreaClass, ErrorNote } from './shared';

interface MatchInfo {
  index: number;
  text: string;
  groups: string[];
}

export const RegexTool: React.FC = () => {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    'Contact us at hello@microfree.store or support@example.com for help.'
  );

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as MatchInfo[], error: null as string | null };
    let re: RegExp;
    try {
      re = new RegExp(pattern, flags);
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Invalid regular expression.' };
    }
    const found: MatchInfo[] = [];
    try {
      if (re.global) {
        let m: RegExpExecArray | null;
        let guard = 0;
        while ((m = re.exec(testString)) !== null) {
          found.push({ index: m.index, text: m[0], groups: m.slice(1) });
          if (m.index === re.lastIndex) re.lastIndex++;
          if (++guard > 10000) break;
        }
      } else {
        const m = re.exec(testString);
        if (m) found.push({ index: m.index, text: m[0], groups: m.slice(1) });
      }
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Matching failed.' };
    }
    return { matches: found, error: null };
  }, [pattern, flags, testString]);

  // Build highlighted output safely (React escapes automatically).
  const highlighted = useMemo(() => {
    if (error || matches.length === 0) return null;
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    matches.forEach((m, i) => {
      if (m.index < cursor) return;
      parts.push(<span key={`t${i}`}>{testString.slice(cursor, m.index)}</span>);
      parts.push(
        <mark key={`m${i}`} className="bg-amber-200 text-amber-900 rounded px-0.5">
          {m.text}
        </mark>
      );
      cursor = m.index + m.text.length;
    });
    parts.push(<span key="tend">{testString.slice(cursor)}</span>);
    return parts;
  }, [matches, error, testString]);

  const toggleFlag = (f: string) => {
    setFlags((cur) => (cur.includes(f) ? cur.replace(f, '') : cur + f));
  };

  return (
    <div>
      <ToolHeading
        title="Regex Tester"
        desc="Test JavaScript regular expressions live — see matches, capture groups, and match count."
      />
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pattern</label>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} className={`${inputClass} font-mono`} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Flags</label>
            <div className="flex gap-1">
              {['g', 'i', 'm', 's', 'u'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFlag(f)}
                  className={`w-8 rounded-lg py-2 text-xs font-bold border ${
                    flags.includes(f)
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Test string</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={5}
            className={monoAreaClass}
          />
        </div>

        {error && <ErrorNote message={error} />}

        {!error && (
          <>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-mono whitespace-pre-wrap break-words leading-relaxed">
              {highlighted ?? <span className="text-slate-400">No matches.</span>}
            </div>
            <p className="text-xs font-semibold text-slate-700">
              {matches.length} match{matches.length === 1 ? '' : 'es'} found
            </p>
            {matches.some((m) => m.groups.length > 0) && (
              <div className="space-y-1.5">
                {matches.map((m, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                    <span className="font-semibold text-brand-700">Match {i + 1}:</span>{' '}
                    <code className="font-mono">{m.text}</code>
                    {m.groups.length > 0 && (
                      <div className="mt-1 text-slate-600">
                        {m.groups.map((g, gi) => (
                          <span key={gi} className="mr-3">
                            <span className="text-slate-400">group {gi + 1}:</span>{' '}
                            <code className="font-mono">{g ?? '∅'}</code>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
