import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  Cake,
  AlertCircle,
  Clock,
  Hourglass,
  Sparkles,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  calculateAge,
  parseLocalDate,
  formatLocalDate,
} from '../services/ageService';

const numberFmt = new Intl.NumberFormat('en-US');
const dateFmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const Home: React.FC = () => {
  const today = useMemo(() => formatLocalDate(new Date()), []);
  const [dobInput, setDobInput] = useState<string>('2000-01-01');
  const [asOfInput, setAsOfInput] = useState<string>(today);

  const { result, error } = useMemo(() => {
    const dob = parseLocalDate(dobInput);
    const asOf = parseLocalDate(asOfInput);
    if (!dob) return { result: null, error: 'Please enter a valid date of birth.' };
    if (!asOf) return { result: null, error: 'Please enter a valid "age as of" date.' };
    if (dob.getTime() > asOf.getTime()) {
      return { result: null, error: 'Date of birth cannot be after the "age as of" date.' };
    }
    return { result: calculateAge(dob, asOf), error: null };
  }, [dobInput, asOfInput]);

  const primaryStats = result
    ? [
        { label: 'Years', value: result.years },
        { label: 'Months', value: result.months },
        { label: 'Days', value: result.days },
      ]
    : [];

  const secondaryStats = result
    ? [
        { label: 'Total Days', value: numberFmt.format(result.totalDays), icon: CalendarDays },
        { label: 'Total Weeks', value: numberFmt.format(result.totalWeeks), icon: CalendarDays },
        { label: 'Total Months', value: numberFmt.format(result.totalMonths), icon: CalendarDays },
        { label: 'Total Hours', value: numberFmt.format(result.totalHours), icon: Clock },
      ]
    : [];

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">Age Calculator</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Calculate your exact age in years, months, and days, total days lived, and the countdown to your
          next birthday. 100% private and instant.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dobInput}
              max={asOfInput}
              onChange={(e) => setDobInput(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Calculate Age As Of</label>
            <input
              type="date"
              value={asOfInput}
              onChange={(e) => setAsOfInput(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {error && (
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-coral-100 bg-coral-50 px-4 py-3 text-xs font-medium text-coral-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-6">
            {/* Primary age */}
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6">
              <div className="flex items-center gap-2 mb-4 text-brand-700">
                <Hourglass className="h-5 w-5" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Your Exact Age</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {primaryStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-brand-100 bg-white p-4 text-center shadow-subtle"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-brand-600 font-mono">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {secondaryStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle"
                  >
                    <Icon className="h-5 w-5 text-brand-400 mb-2" />
                    <div className="text-lg font-bold text-slate-900">{s.value}</div>
                    <div className="text-[11px] text-slate-500">{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Next birthday + zodiac */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <Cake className="h-5 w-5" />
                  <h3 className="text-sm font-bold">Next Birthday</h3>
                </div>
                {result.isBirthdayToday ? (
                  <p className="text-sm font-semibold text-emerald-900">
                    🎉 Happy Birthday! Today is the big day.
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-black text-emerald-900">
                      {result.daysUntilNextBirthday} day{result.daysUntilNextBirthday === 1 ? '' : 's'} to go
                    </p>
                    <p className="text-xs text-emerald-800 mt-1">
                      {dateFmt.format(result.nextBirthday)} — turning {result.turningAge}
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2 text-amber-700 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="text-sm font-bold">Zodiac Sign</h3>
                </div>
                <p className="text-lg font-black text-amber-900">{result.zodiac}</p>
                <p className="text-xs text-amber-800 mt-1">Based on your date of birth (Western astrology).</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdSlot slotId="sample-ad-slot-age" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
