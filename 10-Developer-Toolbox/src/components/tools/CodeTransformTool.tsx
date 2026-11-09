import React, { useState } from 'react';
import { CopyButton, ClearButton, ToolHeading, ErrorNote, monoAreaClass } from './shared';

export interface TransformAction {
  label: string;
  fn: (input: string) => string;
}

interface CodeTransformToolProps {
  title: string;
  desc: string;
  placeholder: string;
  actions: TransformAction[];
  example?: string;
  rows?: number;
}

export const CodeTransformTool: React.FC<CodeTransformToolProps> = ({
  title,
  desc,
  placeholder,
  actions,
  example,
  rows = 8,
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const run = (fn: (v: string) => string) => {
    setError(null);
    if (!input.trim()) {
      setError('Please enter some input first.');
      setOutput('');
      return;
    }
    try {
      setOutput(fn(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Operation failed.');
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div>
      <ToolHeading title={title} desc={desc} />

      <label className="block text-xs font-semibold text-slate-700 mb-1">Input</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={monoAreaClass}
      />

      <div className="flex flex-wrap items-center gap-2 mt-3">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => run(a.fn)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
          >
            {a.label}
          </button>
        ))}
        {example && (
          <button
            type="button"
            onClick={() => setInput(example)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Load Example
          </button>
        )}
        <ClearButton onClick={clearAll} />
      </div>

      {error && <ErrorNote message={error} />}

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">Output</label>
            <CopyButton value={output} small />
          </div>
          <textarea readOnly value={output} rows={rows} className={`${monoAreaClass} bg-slate-50`} />
        </div>
      )}
    </div>
  );
};
