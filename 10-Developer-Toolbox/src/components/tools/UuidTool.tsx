import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { uuidV4 } from '../../services/devToolsService';
import { CopyButton, ToolHeading, inputClass } from './shared';

export const UuidTool: React.FC = () => {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, uuidV4));

  const generate = () => {
    const n = Math.max(1, Math.min(100, count));
    setUuids(Array.from({ length: n }, uuidV4));
  };

  return (
    <div>
      <ToolHeading
        title="UUID Generator (v4)"
        desc="Cryptographically random RFC-4122 version-4 identifiers, generated locally with the Web Crypto API."
      />
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">How many?</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
            className={`${inputClass} w-28`}
          />
        </div>
        <button
          type="button"
          onClick={generate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Generate
        </button>
        <CopyButton value={uuids.join('\n')} label="Copy All" />
      </div>
      <div className="space-y-2">
        {uuids.map((u, i) => (
          <div
            key={`${u}-${i}`}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <code className="font-mono text-xs text-slate-800 break-all">{u}</code>
            <CopyButton value={u} small />
          </div>
        ))}
      </div>
    </div>
  );
};
