export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  requireEachClass: boolean;
}

const SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?/~',
};

// Characters that are easy to confuse with one another.
const AMBIGUOUS = new Set('O0oIl1|`\'".,;:{}[]()/\\'.split(''));

function filterAmbiguous(chars: string): string {
  return chars
    .split('')
    .filter((c) => !AMBIGUOUS.has(c))
    .join('');
}

/**
 * Returns a cryptographically secure random integer in [0, max) using
 * rejection sampling to avoid modulo bias.
 */
function secureRandomInt(max: number): number {
  if (max <= 0) throw new Error('max must be positive');
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let value = 0;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return value % max;
}

function pick(chars: string): string {
  return chars.charAt(secureRandomInt(chars.length));
}

/** Fisher–Yates shuffle using secure randomness. */
function secureShuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildCharClasses(opts: PasswordOptions): string[] {
  const classes: string[] = [];
  const add = (set: string) => {
    const s = opts.excludeAmbiguous ? filterAmbiguous(set) : set;
    if (s.length > 0) classes.push(s);
  };
  if (opts.uppercase) add(SETS.uppercase);
  if (opts.lowercase) add(SETS.lowercase);
  if (opts.numbers) add(SETS.numbers);
  if (opts.symbols) add(SETS.symbols);
  return classes;
}

export function generatePassword(opts: PasswordOptions): string {
  const classes = buildCharClasses(opts);
  if (classes.length === 0) return '';

  const pool = classes.join('');
  const chars: string[] = [];

  // Guarantee at least one character from each selected class.
  if (opts.requireEachClass) {
    for (const cls of classes) {
      if (chars.length < opts.length) chars.push(pick(cls));
    }
  }

  while (chars.length < opts.length) {
    chars.push(pick(pool));
  }

  return secureShuffle(chars).join('');
}

export function generateMany(opts: PasswordOptions, count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(generatePassword(opts));
  return out;
}

export interface StrengthResult {
  bits: number;
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  percent: number;
  colorClass: string;
}

/** Entropy in bits = length * log2(poolSize). */
export function estimateStrength(opts: PasswordOptions): StrengthResult {
  const classes = buildCharClasses(opts);
  const poolSize = classes.reduce((sum, c) => sum + c.length, 0);
  const bits = poolSize > 0 ? Math.round(opts.length * Math.log2(poolSize)) : 0;

  let label: StrengthResult['label'];
  let colorClass: string;
  if (bits < 28) {
    label = 'Very Weak';
    colorClass = 'bg-rose-500';
  } else if (bits < 50) {
    label = 'Weak';
    colorClass = 'bg-orange-500';
  } else if (bits < 80) {
    label = 'Fair';
    colorClass = 'bg-amber-500';
  } else if (bits < 120) {
    label = 'Strong';
    colorClass = 'bg-emerald-500';
  } else {
    label = 'Very Strong';
    colorClass = 'bg-emerald-600';
  }

  const percent = Math.min(100, Math.round((bits / 128) * 100));
  return { bits, label, percent, colorClass };
}
