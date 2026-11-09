import React, { useState } from 'react';
import { Wrench } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { TOOLS } from '../components/tools/registry';

export const Home: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(TOOLS[0].id);
  const active = TOOLS.find((t) => t.id === activeId) ?? TOOLS[0];

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Developer <span className="text-brand-600">Toolbox</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {TOOLS.length} fast, privacy-first developer utilities — formatters, encoders, converters, and
          generators — all running 100% in your browser.
        </p>
      </div>

      {/* Mobile tool picker */}
      <div className="lg:hidden mb-4">
        <label className="block text-xs font-semibold text-slate-700 mb-1">Choose a tool</label>
        <select
          value={activeId}
          onChange={(e) => setActiveId(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
        >
          {TOOLS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-2 shadow-subtle">
            <div className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Wrench className="h-3.5 w-3.5" /> Tools
            </div>
            <nav className="space-y-0.5">
              {TOOLS.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === activeId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{t.short}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Active tool panel */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card min-h-[28rem]">
          {active.render()}
        </section>
      </div>

      <AdSlot slotId="sample-ad-slot-devtools" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
