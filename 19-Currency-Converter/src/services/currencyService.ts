export interface CurrencyMeta {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface RateData {
  base: string;
  rates: Record<string, number>;
  timestamp: string; // human-readable UTC string
  source: string;
  isDemo: boolean;
}

// Display metadata for commonly used currencies. Any code present in the live
// feed but missing here still works (falls back to the code as its own label).
export const CURRENCY_META: CurrencyMeta[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
];

const META_BY_CODE: Record<string, CurrencyMeta> = CURRENCY_META.reduce(
  (acc, m) => {
    acc[m.code] = m;
    return acc;
  },
  {} as Record<string, CurrencyMeta>
);

export function getMeta(code: string): CurrencyMeta {
  return META_BY_CODE[code] || { code, name: code, symbol: code, flag: '🏳️' };
}

const PRIMARY_ENDPOINT = 'https://open.er-api.com/v6/latest/USD';

// Static fallback rates (per 1 USD). Clearly surfaced as DEMO when used.
const DEMO_RATES: Record<string, number> = {
  USD: 1, INR: 83.3, EUR: 0.92, GBP: 0.79, AED: 3.67, CAD: 1.36,
  AUD: 1.52, JPY: 151.2, CNY: 7.24, SGD: 1.34, CHF: 0.9, HKD: 7.81,
  NZD: 1.66, ZAR: 18.6, SAR: 3.75, BRL: 5.1, RUB: 92.5, KRW: 1345,
  MXN: 17.1, THB: 36.2,
};

export async function fetchRates(): Promise<RateData> {
  try {
    const res = await fetch(PRIMARY_ENDPOINT);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.result !== 'success' || !data.rates) {
      throw new Error('Unexpected response');
    }
    return {
      base: data.base_code || 'USD',
      rates: data.rates,
      timestamp: data.time_last_update_utc || new Date().toUTCString(),
      source: 'open.er-api.com (Exchange Rate API)',
      isDemo: false,
    };
  } catch {
    return {
      base: 'USD',
      rates: DEMO_RATES,
      timestamp: 'Built-in demo rates — not live',
      source: 'Built-in demo table',
      isDemo: true,
    };
  }
}

// Cross-rate derived from a common (USD) base: amount in `from` -> `to`.
export function convert(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): number | null {
  const rFrom = rates[from];
  const rTo = rates[to];
  if (!rFrom || !rTo) return null;
  return (amount / rFrom) * rTo;
}

export function unitRate(
  from: string,
  to: string,
  rates: Record<string, number>
): number | null {
  return convert(1, from, to, rates);
}

export function formatMoney(value: number, code: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: value >= 100 ? 2 : 4,
    }).format(value);
  } catch {
    return `${getMeta(code).symbol} ${value.toFixed(2)}`;
  }
}

export interface HistoryEntry {
  amount: number;
  from: string;
  to: string;
  result: number;
  at: number;
}

const HISTORY_KEY = 'microfree_currency_history';

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, 8)));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    /* ignore */
  }
}

// Which display currencies to show: those present in the rate feed, metadata order first.
export function availableCurrencies(rates: Record<string, number>): string[] {
  const known = CURRENCY_META.map((m) => m.code).filter((c) => rates[c]);
  return known;
}
