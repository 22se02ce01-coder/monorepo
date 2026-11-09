import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRightLeft,
  RefreshCw,
  AlertTriangle,
  Clock,
  History,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  fetchRates,
  convert,
  unitRate,
  formatMoney,
  getMeta,
  availableCurrencies,
  loadHistory,
  saveHistory,
  clearHistory,
  RateData,
  HistoryEntry,
} from '../services/currencyService';

export const Home: React.FC = () => {
  const [rateData, setRateData] = useState<RateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>('100');
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('INR');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchRates();
    setRateData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    setHistory(loadHistory());
  }, [refresh]);

  const numericAmount = parseFloat(amount);
  const validAmount = !isNaN(numericAmount) && numericAmount >= 0;

  const result =
    rateData && validAmount ? convert(numericAmount, from, to, rateData.rates) : null;
  const perUnit = rateData ? unitRate(from, to, rateData.rates) : null;

  const currencies = rateData ? availableCurrencies(rateData.rates) : [];

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const recordHistory = () => {
    if (result === null || !validAmount) return;
    const entry: HistoryEntry = {
      amount: numericAmount,
      from,
      to,
      result,
      at: Date.now(),
    };
    const next = [entry, ...history].slice(0, 8);
    setHistory(next);
    saveHistory(next);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Live <span className="text-brand-600">Currency Converter</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Convert between INR, USD, EUR, GBP and 15+ major world currencies using fresh mid-market reference rates.
        </p>
      </div>

      {rateData?.isDemo && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <p className="font-bold">Demo rates — live rates are currently unavailable.</p>
            <p>
              The converter is using a small built-in rate table so you can still try it out. These figures are <strong>not live</strong> — do not rely on them for real transactions. Press refresh to retry the live feed.
            </p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          {/* From */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Amount &amp; From</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {currencies.map((c) => {
                  const m = getMeta(c);
                  return (
                    <option key={c} value={c}>
                      {m.flag} {c}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Swap */}
          <div className="flex justify-center pb-1">
            <button
              type="button"
              onClick={handleSwap}
              className="rounded-full border border-slate-300 bg-white p-2.5 text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition"
              aria-label="Swap currencies"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {currencies.map((c) => {
                const m = getMeta(c);
                return (
                  <option key={c} value={c}>
                    {m.flag} {c} — {m.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/60 p-6 text-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-brand-700">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Fetching live rates…</span>
            </div>
          ) : result !== null && validAmount ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                {getMeta(from).flag} {formatMoney(numericAmount, from)} =
              </p>
              <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-slate-900">
                {getMeta(to).flag} {formatMoney(result, to)}
              </p>
              {perUnit !== null && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-600">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-500" />
                  1 {from} = {perUnit.toLocaleString('en-US', { maximumFractionDigits: 6 })} {to}
                </p>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={recordHistory}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition"
                >
                  <History className="h-3.5 w-3.5" />
                  Save to history
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Enter a valid amount to see the conversion.</p>
          )}
        </div>

        {/* Rate meta */}
        {rateData && !loading && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {rateData.isDemo ? 'Demo data (not live)' : `Rates updated: ${rateData.timestamp}`}
            </span>
            <div className="flex items-center gap-3">
              <span>Source: {rateData.source}</span>
              <button
                type="button"
                onClick={refresh}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <History className="h-4 w-4 text-brand-600" /> Recent Conversions
            </h3>
            <button
              type="button"
              onClick={handleClearHistory}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-coral-600"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
          </div>
          <ul className="divide-y divide-slate-100 text-xs">
            {history.map((h, i) => (
              <li key={i} className="py-2 flex items-center justify-between">
                <span className="text-slate-700">
                  {getMeta(h.from).flag} {formatMoney(h.amount, h.from)} →{' '}
                  <span className="font-semibold text-slate-900">
                    {getMeta(h.to).flag} {formatMoney(h.result, h.to)}
                  </span>
                </span>
                <span className="text-slate-400">
                  {new Date(h.at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AdSlot slotId="sample-ad-slot-currency" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
