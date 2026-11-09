import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { fromUnix, TimestampResult } from '../../services/devToolsService';
import { CopyButton, ToolHeading, inputClass, ErrorNote } from './shared';

export const TimestampTool: React.FC = () => {
  const [raw, setRaw] = useState(String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<'s' | 'ms'>('s');
  const [dateStr, setDateStr] = useState('');
  const [error, setError] = useState<string | null>(null);

  let result: TimestampResult | null = null;
  const num = Number(raw.trim());
  if (raw.trim() !== '' && !Number.isNaN(num)) {
    result = fromUnix(num, unit);
  }

  const now = () => {
    setRaw(unit === 's' ? String(Math.floor(Date.now() / 1000)) : String(Date.now()));
    setError(null);
  };

  const toTimestamp = () => {
    setError(null);
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) {
      setError('Could not parse that date/time. Try e.g. 2026-11-07 14:30 or an ISO string.');
      return;
    }
    setUnit('s');
    setRaw(String(Math.floor(d.getTime() / 1000)));
  };

  return (
    <div>
      <ToolHeading
        title="Unix Timestamp Converter"
        desc="Convert between Unix epoch time and human-readable dates, in seconds or milliseconds."
      />

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Unix timestamp</label>
            <input value={raw} onChange={(e) => setRaw(e.target.value)} className={inputClass} />
          </div>
          <div className="flex gap-1 text-xs">
            {(['s', 'ms'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`rounded-lg px-3 py-2 font-semibold border ${
                  unit === u
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {u === 's' ? 'Seconds' : 'Millis'}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={now}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
          >
            <Clock className="h-3.5 w-3.5" /> Now
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Local Time', value: result.local },
            { label: 'UTC', value: result.utc },
            { label: 'ISO 8601', value: result.iso },
            { label: 'Relative', value: result.relative },
          ].map((row) => (
            <div key={row.label} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {row.label}
                </span>
                <CopyButton value={row.value} small />
              </div>
              <p className="font-mono text-xs text-slate-800 mt-1 break-all">{row.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Date → Timestamp (parse any date string)
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            placeholder="2026-11-07 14:30 or ISO 8601"
            className={`${inputClass} flex-1 min-w-[200px]`}
          />
          <button
            type="button"
            onClick={toTimestamp}
            className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
          >
            Convert to Unix
          </button>
        </div>
        {error && <ErrorNote message={error} />}
      </div>
    </div>
  );
};
