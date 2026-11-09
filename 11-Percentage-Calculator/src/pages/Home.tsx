import React, { useState } from 'react';
import { Percent, TrendingUp, TrendingDown, Tag, RefreshCcw, Sigma, Receipt, Calculator } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  percentOf,
  whatPercent,
  percentChange,
  percentDifference,
  reverseWhole,
  discount,
  tax,
  fmt,
} from '../services/percentageService';

const num = (s: string): number => (s.trim() === '' ? NaN : Number(s));

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}
const Field: React.FC<FieldProps> = ({ label, value, onChange, suffix, placeholder }) => (
  <div className="flex-1 min-w-0">
    <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

interface CardProps {
  icon: React.ReactNode;
  title: string;
  formula: string;
  example: string;
  children: React.ReactNode;
  result: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ icon, title, formula, example, children, result }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle hover:shadow-elevated hover:border-brand-200 transition flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <span className="rounded-lg bg-brand-100 p-2 text-brand-600">{icon}</span>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-3 mb-3">{children}</div>
    <div className="mt-auto space-y-2">
      <div className="rounded-lg bg-brand-50 border border-brand-100 px-3 py-2.5">{result}</div>
      <p className="text-[11px] text-slate-500 font-mono">{formula}</p>
      <p className="text-[11px] text-slate-400">{example}</p>
    </div>
  </div>
);

const ResultLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-2">
    <span className="text-xs text-brand-800">{label}</span>
    <span className="text-lg font-extrabold text-brand-700 tabular-nums">{value}</span>
  </div>
);

export const Home: React.FC = () => {
  // 1. X% of Y
  const [p1x, setP1x] = useState('15');
  const [p1y, setP1y] = useState('200');
  // 2. X is what % of Y
  const [p2x, setP2x] = useState('45');
  const [p2y, setP2y] = useState('180');
  // 3. increase A->B
  const [incA, setIncA] = useState('120');
  const [incB, setIncB] = useState('150');
  // 4. decrease A->B
  const [decA, setDecA] = useState('250');
  const [decB, setDecB] = useState('200');
  // 5. difference
  const [dA, setDA] = useState('40');
  const [dB, setDB] = useState('60');
  // 6. reverse
  const [revX, setRevX] = useState('30');
  const [revP, setRevP] = useState('25');
  // 7. discount
  const [price, setPrice] = useState('1999');
  const [disc, setDisc] = useState('20');
  // 8. tax
  const [taxAmt, setTaxAmt] = useState('1000');
  const [taxRate, setTaxRate] = useState('18');

  const r1 = percentOf(num(p1x), num(p1y));
  const r2 = whatPercent(num(p2x), num(p2y));
  const r3 = percentChange(num(incA), num(incB));
  const r4 = percentChange(num(decA), num(decB));
  const r5 = percentDifference(num(dA), num(dB));
  const r6 = reverseWhole(num(revX), num(revP));
  const dres = discount(num(price), num(disc));
  const tres = tax(num(taxAmt), num(taxRate));

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">Percentage Calculator</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Eight live percentage calculators in one place — percent of a number, percent change,
          discounts, reverse percentages and tax. Every result updates instantly as you type, with
          the formula shown.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card
          icon={<Percent className="h-5 w-5" />}
          title="What is X% of Y?"
          formula="result = (X ÷ 100) × Y"
          example="Example: 15% of 200 = 30"
          result={<ResultLine label={`${p1x || '?'}% of ${p1y || '?'} is`} value={fmt(r1)} />}
        >
          <Field label="Percentage (X)" value={p1x} onChange={setP1x} suffix="%" />
          <Field label="Of value (Y)" value={p1y} onChange={setP1y} />
        </Card>

        <Card
          icon={<Sigma className="h-5 w-5" />}
          title="X is what percent of Y?"
          formula="result = (X ÷ Y) × 100"
          example="Example: 45 is 25% of 180"
          result={<ResultLine label={`${p2x || '?'} is`} value={fmt(r2) + (Number.isFinite(r2) ? '%' : '')} />}
        >
          <Field label="Value (X)" value={p2x} onChange={setP2x} />
          <Field label="Total (Y)" value={p2y} onChange={setP2y} />
        </Card>

        <Card
          icon={<TrendingUp className="h-5 w-5" />}
          title="Percentage Increase"
          formula="change = ((B − A) ÷ |A|) × 100"
          example="Example: 120 → 150 is a 25% increase"
          result={
            <ResultLine
              label="Change"
              value={(Number.isFinite(r3) ? (r3 >= 0 ? '+' : '') : '') + fmt(r3) + (Number.isFinite(r3) ? '%' : '')}
            />
          }
        >
          <Field label="Original (A)" value={incA} onChange={setIncA} />
          <Field label="New (B)" value={incB} onChange={setIncB} />
        </Card>

        <Card
          icon={<TrendingDown className="h-5 w-5" />}
          title="Percentage Decrease"
          formula="change = ((B − A) ÷ |A|) × 100"
          example="Example: 250 → 200 is a 20% decrease"
          result={
            <ResultLine
              label="Change"
              value={(Number.isFinite(r4) ? (r4 >= 0 ? '+' : '') : '') + fmt(r4) + (Number.isFinite(r4) ? '%' : '')}
            />
          }
        >
          <Field label="Original (A)" value={decA} onChange={setDecA} />
          <Field label="New (B)" value={decB} onChange={setDecB} />
        </Card>

        <Card
          icon={<Calculator className="h-5 w-5" />}
          title="Percentage Difference"
          formula="diff = (|A − B| ÷ ((|A|+|B|)/2)) × 100"
          example="Example: 40 and 60 differ by 40%"
          result={<ResultLine label="Difference" value={fmt(r5) + (Number.isFinite(r5) ? '%' : '')} />}
        >
          <Field label="Value A" value={dA} onChange={setDA} />
          <Field label="Value B" value={dB} onChange={setDB} />
        </Card>

        <Card
          icon={<RefreshCcw className="h-5 w-5" />}
          title="Reverse Percentage"
          formula="whole = (X × 100) ÷ P"
          example="Example: 30 is 25% of 120"
          result={<ResultLine label={`If ${revX || '?'} is ${revP || '?'}% of a number, it is`} value={fmt(r6)} />}
        >
          <Field label="Known part (X)" value={revX} onChange={setRevX} />
          <Field label="Percentage (P)" value={revP} onChange={setRevP} suffix="%" />
        </Card>

        <Card
          icon={<Tag className="h-5 w-5" />}
          title="Discount Calculator"
          formula="saved = price × (discount ÷ 100)"
          example="Example: ₹1999 at 20% off → ₹1,599.20"
          result={
            <div className="space-y-1">
              <ResultLine label="Final price" value={fmt(dres.finalPrice)} />
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-emerald-800">You save</span>
                <span className="text-sm font-bold text-emerald-700 tabular-nums">{fmt(dres.saved)}</span>
              </div>
            </div>
          }
        >
          <Field label="Price" value={price} onChange={setPrice} />
          <Field label="Discount" value={disc} onChange={setDisc} suffix="%" />
        </Card>

        <Card
          icon={<Receipt className="h-5 w-5" />}
          title="Add / Remove Tax (GST)"
          formula="tax = amount × (rate ÷ 100); base = amount × 100 ÷ (100+rate)"
          example="Example: 1000 + 18% = 1180; 1000 incl. 18% → base 847.46"
          result={
            <div className="space-y-1">
              <ResultLine label={`Add ${taxRate || '?'}% → total`} value={fmt(tres.gross)} />
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-brand-800">Remove tax → base</span>
                <span className="text-sm font-bold text-brand-700 tabular-nums">{fmt(tres.base)}</span>
              </div>
            </div>
          }
        >
          <Field label="Amount" value={taxAmt} onChange={setTaxAmt} />
          <Field label="Tax rate" value={taxRate} onChange={setTaxRate} suffix="%" />
        </Card>
      </div>

      <AdSlot slotId="sample-ad-slot-pct" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
