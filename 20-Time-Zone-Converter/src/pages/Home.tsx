import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe2,
  Clock,
  Search,
  Plus,
  X,
  CalendarClock,
  Radio,
  ArrowRightLeft,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  ZONES,
  getLocalZone,
  wallTimeToInstant,
  describeZone,
  ZoneDisplay,
} from '../services/timezoneService';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export const Home: React.FC = () => {
  const localZone = useMemo(() => getLocalZone(), []);

  const [hour12, setHour12] = useState<boolean>(true);
  const [liveMode, setLiveMode] = useState<boolean>(true);
  const [sourceZone, setSourceZone] = useState<string>(
    ZONES.some((z) => z.id === localZone) ? localZone : 'UTC'
  );

  const now = new Date();
  const [dateStr, setDateStr] = useState<string>(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  );
  const [timeStr, setTimeStr] = useState<string>(`${pad(now.getHours())}:${pad(now.getMinutes())}`);

  const [targets, setTargets] = useState<string[]>(() => {
    const defaults = ['America/New_York', 'Europe/London', 'Asia/Kolkata', 'Asia/Tokyo'];
    return defaults.filter((d) => d !== sourceZone);
  });
  const [search, setSearch] = useState<string>('');
  const [tick, setTick] = useState<number>(Date.now());

  // Live clock
  useEffect(() => {
    if (!liveMode) return;
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [liveMode]);

  const instant = useMemo(() => {
    if (liveMode) return tick;
    const [y, m, d] = dateStr.split('-').map((v) => parseInt(v, 10));
    const [hh, mm] = timeStr.split(':').map((v) => parseInt(v, 10));
    if ([y, m, d, hh, mm].some((v) => Number.isNaN(v))) return Date.now();
    return wallTimeToInstant(y, m, d, hh, mm, sourceZone);
  }, [liveMode, tick, dateStr, timeStr, sourceZone]);

  const sourceDisplay: ZoneDisplay = useMemo(
    () => describeZone(instant, sourceZone, hour12, sourceZone),
    [instant, sourceZone, hour12]
  );

  const targetDisplays: ZoneDisplay[] = useMemo(
    () => targets.map((z) => describeZone(instant, z, hour12, sourceZone)),
    [instant, targets, hour12, sourceZone]
  );

  const availableToAdd = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ZONES.filter(
      (z) => z.id !== sourceZone && !targets.includes(z.id)
    ).filter(
      (z) =>
        !term ||
        z.city.toLowerCase().includes(term) ||
        z.country.toLowerCase().includes(term) ||
        z.id.toLowerCase().includes(term)
    ).slice(0, 8);
  }, [search, sourceZone, targets]);

  const addTarget = (id: string) => {
    setTargets((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setSearch('');
  };

  const removeTarget = (id: string) => {
    setTargets((prev) => prev.filter((z) => z !== id));
  };

  const swapWithSource = (id: string) => {
    setTargets((prev) => [sourceZone, ...prev.filter((z) => z !== id)]);
    setSourceZone(id);
  };

  const dayBadge = (diff: number) => {
    if (diff === 0) return null;
    const label = diff > 0 ? `+${diff} day${diff > 1 ? 's' : ''}` : `${diff} day${diff < -1 ? 's' : ''}`;
    return (
      <span
        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
          diff > 0 ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
        }`}
      >
        {label}
      </span>
    );
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          World <span className="text-brand-600">Time Zone Converter</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Compare a date and time across cities worldwide with daylight-saving-aware offsets. 100% in your browser.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* Mode toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLiveMode(true)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
                liveMode ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="h-3.5 w-3.5" /> Live Now
            </button>
            <button
              type="button"
              onClick={() => setLiveMode(false)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
                !liveMode ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarClock className="h-3.5 w-3.5" /> Pick Date &amp; Time
            </button>
          </div>

          {/* Source zone */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Home / Source Zone</label>
            <select
              value={sourceZone}
              onChange={(e) => setSourceZone(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.city} — {z.country} ({z.id})
                </option>
              ))}
            </select>
          </div>

          {/* 12/24 toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setHour12(true)}
              className={`rounded-lg px-3 py-2 transition ${
                hour12 ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12h
            </button>
            <button
              type="button"
              onClick={() => setHour12(false)}
              className={`rounded-lg px-3 py-2 transition ${
                !hour12 ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              24h
            </button>
          </div>
        </div>

        {/* Date/time inputs when manual */}
        {!liveMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time</label>
              <input
                type="time"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        )}

        {/* Source big card */}
        <div className="rounded-2xl border-2 border-brand-200 bg-brand-50/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <Globe2 className="h-3.5 w-3.5" /> Source
              </div>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                {sourceDisplay.city} <span className="text-slate-400 font-medium">· {sourceDisplay.country}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {sourceDisplay.weekday}, {sourceDisplay.date} · {sourceDisplay.offset}
                {sourceDisplay.abbr ? ` · ${sourceDisplay.abbr}` : ''}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-brand-700 font-mono tabular-nums">
                {sourceDisplay.time}
              </div>
              {liveMode && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> live
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Add zone */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Add a city to compare</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city, country, or zone (e.g. Sydney, India, Berlin)"
              className="w-full text-xs text-slate-800 focus:outline-none"
            />
          </div>
          {search.trim() && (
            <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl max-h-72 overflow-y-auto">
              {availableToAdd.length === 0 ? (
                <p className="px-3 py-2 text-xs text-slate-500">No matching time zones.</p>
              ) : (
                availableToAdd.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => addTarget(z.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition"
                  >
                    <span>
                      <span className="font-semibold">{z.city}</span> · {z.country}
                    </span>
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Target comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {targetDisplays.length === 0 && (
            <p className="col-span-full text-center text-xs text-slate-500 py-6">
              Add one or more cities above to compare them against your source time.
            </p>
          )}
          {targetDisplays.map((z) => (
            <div
              key={z.id}
              className="group relative rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-200 hover:shadow-elevated transition"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-bold text-slate-900">{z.city}</h4>
                  <p className="truncate text-[11px] text-slate-500">{z.country}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => swapWithSource(z.id)}
                    className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-brand-600 transition"
                    aria-label="Make source"
                    title="Make this the source zone"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTarget(z.id)}
                    className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-coral-600 transition"
                    aria-label="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">{z.time}</div>
                {dayBadge(z.dayDiff)}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{z.date}</span>
                <span className="text-slate-300">·</span>
                <span className="font-medium text-slate-600">{z.offset}</span>
                {z.abbr && <span className="text-slate-400">({z.abbr})</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-tz" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
