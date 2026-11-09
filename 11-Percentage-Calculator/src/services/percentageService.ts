/**
 * Pure percentage math helpers. All functions return numbers; the UI handles
 * formatting. NaN is returned when inputs are not finite so the UI can show a
 * neutral placeholder instead of "Infinity" / "NaN".
 */

export function isNum(v: number): boolean {
  return Number.isFinite(v);
}

/** Round to a sensible number of decimals, stripping floating-point noise. */
export function clean(value: number, decimals = 4): number {
  if (!Number.isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Human-friendly number formatting with thousands separators. */
export function fmt(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  const rounded = clean(value, decimals);
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/** What is X% of Y? */
export function percentOf(x: number, y: number): number {
  return clean((x / 100) * y);
}

/** X is what percent of Y? */
export function whatPercent(x: number, y: number): number {
  if (y === 0) return NaN;
  return clean((x / y) * 100);
}

/** Percentage increase from A to B (positive means growth). */
export function percentChange(a: number, b: number): number {
  if (a === 0) return NaN;
  return clean(((b - a) / Math.abs(a)) * 100);
}

/** Percentage difference between A and B relative to their average. */
export function percentDifference(a: number, b: number): number {
  const avg = (Math.abs(a) + Math.abs(b)) / 2;
  if (avg === 0) return NaN;
  return clean((Math.abs(a - b) / avg) * 100);
}

/** If X is P% of Y, find Y (the whole). */
export function reverseWhole(x: number, p: number): number {
  if (p === 0) return NaN;
  return clean((x * 100) / p);
}

export interface DiscountResult {
  finalPrice: number;
  saved: number;
}
export function discount(price: number, percent: number): DiscountResult {
  const saved = clean((price * percent) / 100);
  return { finalPrice: clean(price - saved), saved };
}

export interface TaxResult {
  addTax: number; // tax amount when `amount` is the pre-tax base
  gross: number; // amount + addTax
  base: number; // pre-tax base when `amount` is tax-inclusive
  inclusiveTax: number; // tax portion already inside a tax-inclusive amount
}
export function tax(amount: number, rate: number): TaxResult {
  const addTax = clean((amount * rate) / 100);
  const base = clean((amount * 100) / (100 + rate));
  return {
    addTax,
    gross: clean(amount + addTax),
    base,
    inclusiveTax: clean(amount - base),
  };
}
