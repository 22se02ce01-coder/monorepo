import React, { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  generateMany,
  estimateStrength,
  buildCharClasses,
  PasswordOptions,
} from '../services/passwordService';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
  requireEachClass: true,
};

export const Home: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [count, setCount] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hasClass = buildCharClasses(options).length > 0;
  const strength = estimateStrength(options);

  const regenerate = useCallback(() => {
    if (buildCharClasses(options).length === 0) {
      setPasswords([]);
      return;
    }
    setPasswords(generateMany(options, count));
    setCopiedIndex(null);
  }, [options, count]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const update = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopy = async (pwd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(pwd);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const toggles: { key: keyof PasswordOptions; label: string }[] = [
    { key: 'uppercase', label: 'Uppercase (A–Z)' },
    { key: 'lowercase', label: 'Lowercase (a–z)' },
    { key: 'numbers', label: 'Numbers (0–9)' },
    { key: 'symbols', label: 'Symbols (!@#$…)' },
  ];

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Secure <span className="text-brand-600">Password Generator</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Create strong, random passwords with the browser's cryptographic engine. 100% private — nothing is ever sent to a server.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
        {/* Primary output */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {count > 1 ? `${count} Passwords` : 'Your Password'}
            </span>
            <button
              type="button"
              onClick={regenerate}
              disabled={!hasClass}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Generate</span>
            </button>
          </div>

          {!hasClass ? (
            <div className="flex items-center gap-2 text-xs font-medium text-coral-600 py-4 justify-center">
              <ShieldAlert className="h-4 w-4" />
              <span>Select at least one character type below.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {passwords.map((pwd, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                >
                  <code className="font-mono text-sm text-slate-900 break-all">{pwd}</code>
                  <button
                    type="button"
                    onClick={() => handleCopy(pwd, idx)}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    aria-label="Copy password"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Strength meter */}
          {hasClass && (
            <div className="pt-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">Strength: {strength.label}</span>
                <span className="text-slate-400">~{strength.bits} bits of entropy</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${strength.colorClass}`}
                  style={{ width: `${Math.max(6, strength.percent)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Password Length</span>
              <span className="rounded bg-brand-50 px-2 py-0.5 text-brand-700">{options.length}</span>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={options.length}
              onChange={(e) => update('length', parseInt(e.target.value, 10))}
              className="w-full accent-brand-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {toggles.map((t) => (
              <label
                key={t.key}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={options[t.key] as boolean}
                  onChange={(e) => update(t.key, e.target.checked as PasswordOptions[typeof t.key])}
                  className="h-4 w-4 accent-brand-600"
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={options.excludeAmbiguous}
                onChange={(e) => update('excludeAmbiguous', e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              <span>Exclude ambiguous (O/0, l/1, I)</span>
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={options.requireEachClass}
                onChange={(e) => update('requireEachClass', e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              <span>Include at least one of each type</span>
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>How many passwords?</span>
              <span className="rounded bg-brand-50 px-2 py-0.5 text-brand-700">{count}</span>
            </div>
            <div className="flex gap-2">
              {[1, 3, 5, 10, 20].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                    count === n
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-4 text-xs text-brand-900">
          <KeyRound className="h-5 w-5 text-brand-600 shrink-0" />
          <p>
            Passwords are generated locally using the Web Crypto API and are <strong>never transmitted</strong> to any server. For maximum safety, store them in a reputable password manager and avoid reusing passwords across accounts.
          </p>
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-pwd" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
