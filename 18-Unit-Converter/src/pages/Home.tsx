import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Ruler, Copy, Check } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { CATEGORIES, getCategory, convert, formatNumber } from '../services/unitService';

export const Home: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>('length');
  const [value, setValue] = useState<string>('1');
  const [fromId, setFromId] = useState<string>('m');
  const [toId, setToId] = useState<string>('ft');
  const [copied, setCopied] = useState<boolean>(false);

  const category = useMemo(() => getCategory(categoryId), [categoryId]);

  const handleCategoryChange = (id: string) => {
    const cat = getCategory(id);
    setCategoryId(id);
    setFromId(cat.units[0].id);
    setToId(cat.units[1]?.id ?? cat.units[0].id);
  };

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const numeric = parseFloat(value);
  const hasValue = value.trim() !== '' && !isNaN(numeric);

  const result = hasValue ? convert(numeric, fromId, toId, category) : NaN;

  const fromUnit = category.units.find((u) => u.id === fromId);
  const toUnit = category.units.find((u) => u.id === toId);

  const handleCopy = async () => {
    if (!hasValue) return;
    try {
      await navigator.clipboard.writeText(
        `${formatNumber(numeric)} ${fromUnit?.symbol} = ${formatNumber(result)} ${toUnit?.symbol}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Universal <span className="text-brand-600">Unit Converter</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Convert length, weight, temperature, area, volume, speed, time, data, energy and pressure — accurately and privately in your browser.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const active = cat.id === categoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                  active
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Converter row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">From</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 mb-2"
              placeholder="Enter value"
            />
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
            >
              {category.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center md:pb-2">
            <button
              type="button"
              onClick={handleSwap}
              className="rounded-full border border-slate-300 bg-slate-50 p-2.5 text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition"
              aria-label="Swap units"
              title="Swap units"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">To</label>
            <div className="w-full rounded-lg border border-brand-200 bg-brand-50/60 px-3 py-2 text-sm font-bold text-brand-900 mb-2 min-h-[42px] flex items-center justify-between gap-2">
              <span className="truncate">{hasValue ? formatNumber(result) : '—'}</span>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!hasValue}
                className="shrink-0 text-brand-500 hover:text-brand-700 disabled:opacity-40"
                aria-label="Copy result"
                title="Copy result"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
            >
              {category.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Equation line */}
        {hasValue && fromUnit && toUnit && (
          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
            <span className="font-semibold text-slate-900">
              {formatNumber(numeric)} {fromUnit.symbol}
            </span>{' '}
            =
            <span className="font-semibold text-brand-700">
              {' '}
              {formatNumber(result)} {toUnit.symbol}
            </span>
          </div>
        )}

        {/* All-units reference table */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="h-4 w-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {formatNumber(hasValue ? numeric : 1)} {fromUnit?.symbol} in every {category.name} unit
            </h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">Unit</th>
                  <th className="text-left px-4 py-2 font-semibold">Symbol</th>
                  <th className="text-right px-4 py-2 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {category.units.map((u) => {
                  const v = convert(hasValue ? numeric : 1, fromId, u.id, category);
                  const isTarget = u.id === toId;
                  return (
                    <tr key={u.id} className={isTarget ? 'bg-brand-50/50' : 'hover:bg-slate-50'}>
                      <td className="px-4 py-2 text-slate-700">{u.name}</td>
                      <td className="px-4 py-2 text-slate-400">{u.symbol}</td>
                      <td className={`px-4 py-2 text-right font-mono ${isTarget ? 'font-bold text-brand-700' : 'text-slate-800'}`}>
                        {formatNumber(v)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{category.baseNote}</p>
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-unit" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
