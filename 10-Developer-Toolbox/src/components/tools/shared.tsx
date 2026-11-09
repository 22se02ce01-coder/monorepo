import React, { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

export const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500';

export const monoAreaClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y';

export const CopyButton: React.FC<{ value: string; label?: string; small?: boolean }> = ({
  value,
  label = 'Copy',
  small = false,
}) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50 transition ${
        small ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
      }`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
};

export const ClearButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
  >
    <Trash2 className="h-3.5 w-3.5" />
    <span>Clear</span>
  </button>
);

export const ToolHeading: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
  </div>
);

export const ErrorNote: React.FC<{ message: string }> = ({ message }) => (
  <p className="text-xs font-medium text-coral-600 mt-2">{message}</p>
);
