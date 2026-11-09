import React, { useMemo, useState } from 'react';
import {
  IndianRupee,
  Percent,
  CalendarClock,
  AlertCircle,
  Wallet,
  PiggyBank,
  Receipt,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  calculateEmi,
  formatINR,
  AmortizationRow,
  YearlyRow,
} from '../services/emiService';

type TenureUnit = 'years' | 'months';
type ScheduleView = 'monthly' | 'yearly';

const PRINCIPAL_COLOR = '#2563eb';
const INTEREST_COLOR = '#f43f5e';

export const Home: React.FC = () => {
  const [amount, setAmount] = useState<number>(2500000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureValue, setTenureValue] = useState<number>(20);
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>('years');
  const [scheduleView, setScheduleView] = useState<ScheduleView>('yearly');

  const months = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;

  const error = useMemo(() => {
    if (amount <= 0) return 'Enter a loan amount greater than zero.';
    if (rate < 0) return 'Interest rate cannot be negative.';
    if (months <= 0) return 'Enter a loan tenure greater than zero.';
    return null;
  }, [amount, rate, months]);

  const result = useMemo(() => {
    if (error) return null;
    return calculateEmi(amount, rate, months);
  }, [amount, rate, months, error]);

  const interestFraction = result && result.totalPayment > 0 ? result.totalInterest / result.totalPayment : 0;
  const principalFraction = 1 - interestFraction;

  // Donut geometry
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const interestDash = circumference * interestFraction;

  const clampAmount = (v: number) => Math.min(100000000, Math.max(0, v));
  const clampRate = (v: number) => Math.min(40, Math.max(0, v));
  const maxTenure = tenureUnit === 'years' ? 40 : 480;

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Loan <span className="text-brand-600">EMI Calculator</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Calculate your monthly EMI, total interest, and repayment for home, car, and personal loans — with a full amortization schedule. 100% private, in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-7">
          {/* Loan amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <IndianRupee className="h-3.5 w-3.5 text-brand-600" /> Loan Amount
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 py-1">
                <span className="text-xs text-slate-400">₹</span>
                <input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(clampAmount(parseFloat(e.target.value) || 0))}
                  className="w-32 bg-transparent px-1 text-right text-sm font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={10000}
              max={20000000}
              step={10000}
              value={Math.min(amount, 20000000)}
              onChange={(e) => setAmount(parseInt(e.target.value, 10))}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹10K</span>
              <span>₹2Cr</span>
            </div>
          </div>

          {/* Interest rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Percent className="h-3.5 w-3.5 text-brand-600" /> Annual Interest Rate
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 py-1">
                <input
                  type="number"
                  min={0}
                  max={40}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(clampRate(parseFloat(e.target.value) || 0))}
                  className="w-16 bg-transparent px-1 text-right text-sm font-semibold text-slate-800 focus:outline-none"
                />
                <span className="text-xs text-slate-400">%</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={0.1}
              value={Math.min(rate, 20)}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <CalendarClock className="h-3.5 w-3.5 text-brand-600" /> Loan Tenure
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 py-1">
                  <input
                    type="number"
                    min={1}
                    max={maxTenure}
                    value={tenureValue}
                    onChange={(e) =>
                      setTenureValue(Math.min(maxTenure, Math.max(1, parseInt(e.target.value, 10) || 1)))
                    }
                    className="w-16 bg-transparent px-1 text-right text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="flex rounded-lg border border-slate-300 bg-slate-50 p-0.5 text-xs font-semibold">
                  {(['years', 'months'] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setTenureUnit(u)}
                      className={`rounded-md px-2 py-1 capitalize transition ${
                        tenureUnit === u ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={maxTenure}
              step={1}
              value={tenureValue}
              onChange={(e) => setTenureValue(parseInt(e.target.value, 10))}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 {tenureUnit === 'years' ? 'yr' : 'mo'}</span>
              <span>{maxTenure} {tenureUnit === 'years' ? 'yrs' : 'mos'}</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs font-medium text-coral-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results + donut */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-card flex flex-col items-center justify-center">
          {result ? (
            <>
              <div className="text-center mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Monthly EMI</p>
                <p className="text-3xl font-black text-brand-600 mt-1">{formatINR(result.emi)}</p>
              </div>

              <div className="relative">
                <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
                  <circle cx="90" cy="90" r={radius} fill="none" stroke={PRINCIPAL_COLOR} strokeWidth="28" />
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={INTEREST_COLOR}
                    strokeWidth="28"
                    strokeDasharray={`${interestDash} ${circumference - interestDash}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Interest</span>
                  <span className="text-lg font-bold text-slate-900">{(interestFraction * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-5 w-full space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: PRINCIPAL_COLOR }} />
                    Principal ({(principalFraction * 100).toFixed(1)}%)
                  </span>
                  <span className="font-semibold text-slate-800">{formatINR(result.principal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: INTEREST_COLOR }} />
                    Total Interest ({(interestFraction * 100).toFixed(1)}%)
                  </span>
                  <span className="font-semibold text-slate-800">{formatINR(result.totalInterest)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="font-semibold text-slate-700">Total Payment</span>
                  <span className="font-bold text-slate-900">{formatINR(result.totalPayment)}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">Enter valid loan details to see your EMI.</p>
          )}
        </div>
      </div>

      {/* Summary stat cards */}
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <StatCard icon={<Wallet className="h-5 w-5" />} label="Monthly EMI" value={formatINR(result.emi)} />
          <StatCard icon={<Receipt className="h-5 w-5" />} label="Total Interest" value={formatINR(result.totalInterest)} />
          <StatCard icon={<PiggyBank className="h-5 w-5" />} label="Total Payment" value={formatINR(result.totalPayment)} />
        </div>
      )}

      <AdSlot slotId="sample-ad-slot-emi" format="horizontal" className="max-w-4xl mx-auto" />

      {/* Amortization schedule */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-base font-bold text-slate-900">Amortization Schedule</h3>
            <div className="flex rounded-lg border border-slate-300 bg-slate-50 p-0.5 text-xs font-semibold self-start">
              {(['yearly', 'monthly'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setScheduleView(v)}
                  className={`rounded-md px-3 py-1 capitalize transition ${
                    scheduleView === v ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">{scheduleView === 'yearly' ? 'Year' : 'Month'}</th>
                  <th className="px-3 py-2 text-right font-semibold">Principal</th>
                  <th className="px-3 py-2 text-right font-semibold">Interest</th>
                  <th className="px-3 py-2 text-right font-semibold">{scheduleView === 'yearly' ? 'Total Paid' : 'EMI'}</th>
                  <th className="px-3 py-2 text-right font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scheduleView === 'yearly'
                  ? result.yearly.map((row: YearlyRow) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-medium text-slate-700">Year {row.year}</td>
                        <td className="px-3 py-2 text-right text-slate-600">{formatINR(row.principal)}</td>
                        <td className="px-3 py-2 text-right text-coral-600">{formatINR(row.interest)}</td>
                        <td className="px-3 py-2 text-right text-slate-700">{formatINR(row.totalPaid)}</td>
                        <td className="px-3 py-2 text-right font-medium text-slate-800">{formatINR(row.balance)}</td>
                      </tr>
                    ))
                  : result.schedule.map((row: AmortizationRow) => (
                      <tr key={row.period} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-medium text-slate-700">{row.period}</td>
                        <td className="px-3 py-2 text-right text-slate-600">{formatINR(row.principal)}</td>
                        <td className="px-3 py-2 text-right text-coral-600">{formatINR(row.interest)}</td>
                        <td className="px-3 py-2 text-right text-slate-700">{formatINR(row.emi)}</td>
                        <td className="px-3 py-2 text-right font-medium text-slate-800">{formatINR(row.balance)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Showing {scheduleView === 'yearly' ? `${result.yearly.length} year(s)` : `${result.schedule.length} month(s)`}. Scroll within the table to see the full schedule.
          </p>
        </div>
      )}

      <SEO />
    </main>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle">
    <div className="flex items-center gap-2 text-brand-600">
      {icon}
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
    </div>
    <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
  </div>
);
