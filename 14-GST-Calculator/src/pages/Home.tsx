import React, { useMemo, useState } from 'react';
import {
  Calculator,
  Copy,
  Check,
  Plus,
  Minus,
  Building2,
  Globe2,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { addGst, removeGst, formatINR, GST_RATES, GstResult } from '../services/gstService';

type Mode = 'add' | 'remove';
type Supply = 'intra' | 'inter';

export const Home: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [mode, setMode] = useState<Mode>('add');
  const [rate, setRate] = useState<number>(18);
  const [customRate, setCustomRate] = useState<string>('');
  const [supply, setSupply] = useState<Supply>('intra');
  const [copied, setCopied] = useState<boolean>(false);

  const effectiveRate = customRate.trim() !== '' ? parseFloat(customRate) || 0 : rate;

  const result: GstResult = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    return mode === 'add' ? addGst(amt, effectiveRate) : removeGst(amt, effectiveRate);
  }, [amount, mode, effectiveRate]);

  const handleCopy = async () => {
    const lines = [
      `GST Calculation (${mode === 'add' ? 'Add GST' : 'Remove GST'} @ ${effectiveRate}%)`,
      `Taxable / Base Amount: ${formatINR(result.base)}`,
      `GST Amount: ${formatINR(result.gst)}`,
      `Total (incl. GST): ${formatINR(result.gross)}`,
      supply === 'intra'
        ? `CGST (${effectiveRate / 2}%): ${formatINR(result.cgst)} | SGST (${effectiveRate / 2}%): ${formatINR(result.sgst)}`
        : `IGST (${effectiveRate}%): ${formatINR(result.igst)}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">GST Calculator</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Add or remove Indian GST with instant CGST, SGST and IGST breakdowns and rupee formatting. 100% private, in-browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {/* Inputs */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
          {/* Mode */}
          <div className="flex rounded-xl bg-slate-100 p-1 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('add')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition ${
                mode === 'add' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="h-3.5 w-3.5" /> Add GST (exclusive)
            </button>
            <button
              type="button"
              onClick={() => setMode('remove')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition ${
                mode === 'remove' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Minus className="h-3.5 w-3.5" /> Remove GST (inclusive)
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {mode === 'add' ? 'Base Amount (before GST)' : 'Total Amount (including GST)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white pl-7 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Rate */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">GST Rate</label>
            <div className="flex flex-wrap gap-2">
              {GST_RATES.map((r) => {
                const active = customRate.trim() === '' && rate === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRate(r);
                      setCustomRate('');
                    }}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold border transition ${
                      active
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {r}%
                  </button>
                );
              })}
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  placeholder="Custom"
                  className={`w-24 rounded-lg border bg-white pl-3 pr-6 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    customRate.trim() !== '' ? 'border-brand-500' : 'border-slate-300'
                  }`}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
              </div>
            </div>
          </div>

          {/* Supply type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Transaction Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSupply('intra')}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold border transition ${
                  supply === 'intra'
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building2 className="h-3.5 w-3.5" /> Intra-State (CGST + SGST)
              </button>
              <button
                type="button"
                onClick={() => setSupply('inter')}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold border transition ${
                  supply === 'inter'
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Globe2 className="h-3.5 w-3.5" /> Inter-State (IGST)
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-card text-white flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="h-5 w-5 text-brand-300" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Result</h2>
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Taxable / Base Amount</span>
              <span className="text-sm font-semibold">{formatINR(result.base)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">GST Amount ({effectiveRate}%)</span>
              <span className="text-sm font-semibold text-brand-300">{formatINR(result.gst)}</span>
            </div>
            <div className="h-px bg-slate-700" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Total (incl. GST)</span>
              <span className="text-xl font-extrabold text-emerald-400">{formatINR(result.gross)}</span>
            </div>

            <div className="rounded-xl bg-slate-800 p-4 mt-4 space-y-2">
              {supply === 'intra' ? (
                <>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">CGST ({effectiveRate / 2}%)</span>
                    <span className="font-semibold">{formatINR(result.cgst)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">SGST ({effectiveRate / 2}%)</span>
                    <span className="font-semibold">{formatINR(result.sgst)}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">IGST ({effectiveRate}%)</span>
                  <span className="font-semibold">{formatINR(result.igst)}</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-700 transition"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy Results'}</span>
          </button>
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-gst" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
