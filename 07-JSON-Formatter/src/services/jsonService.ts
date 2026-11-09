export interface ValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

export interface JsonStats {
  keys: number;
  nodes: number;
  depth: number;
}

export type IndentOption = '2' | '4' | 'tab';

export function indentValue(opt: IndentOption): string | number {
  if (opt === 'tab') return '\t';
  return parseInt(opt, 10);
}

/** Compute 1-based line and column for a character position in the source. */
function positionToLineCol(source: string, pos: number): { line: number; column: number } {
  let line = 1;
  let column = 1;
  const limit = Math.min(pos, source.length);
  for (let i = 0; i < limit; i++) {
    if (source[i] === '\n') {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}

export function validateJson(input: string): ValidationResult {
  if (input.trim() === '') {
    return { valid: false, error: 'Input is empty. Paste or type some JSON to validate.' };
  }
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON.';
    const posMatch = message.match(/position (\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const { line, column } = positionToLineCol(input, pos);
      const cleaned = message.replace(/\s*in JSON at position \d+.*$/i, '').replace(/\s*\(line \d+ column \d+.*$/i, '');
      return { valid: false, error: cleaned, line, column };
    }
    return { valid: false, error: message };
  }
}

export function formatJson(input: string, indent: IndentOption): string {
  const parsed: unknown = JSON.parse(input);
  return JSON.stringify(parsed, null, indentValue(indent));
}

export function minifyJson(input: string): string {
  const parsed: unknown = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function computeStats(input: string): JsonStats {
  const parsed: unknown = JSON.parse(input);
  let keys = 0;
  let nodes = 0;
  let maxDepth = 0;

  const walk = (value: unknown, depth: number) => {
    nodes++;
    if (depth > maxDepth) maxDepth = depth;
    if (Array.isArray(value)) {
      value.forEach((v) => walk(v, depth + 1));
    } else if (value !== null && typeof value === 'object') {
      for (const k of Object.keys(value as Record<string, unknown>)) {
        keys++;
        walk((value as Record<string, unknown>)[k], depth + 1);
      }
    }
  };

  walk(parsed, 0);
  return { keys, nodes, depth: maxDepth };
}

export type TokenClass =
  | 'key'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'punctuation'
  | 'whitespace';

export interface Token {
  text: string;
  cls: TokenClass;
}

/**
 * Tokenize a well-formed (already JSON.stringify'd) JSON string into typed
 * tokens for safe, span-based syntax highlighting. Input is assumed valid.
 */
export function tokenizeJson(formatted: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = formatted.length;

  const readString = (): string => {
    let str = formatted[i]; // opening quote
    i++;
    while (i < n) {
      const ch = formatted[i];
      str += ch;
      i++;
      if (ch === '\\') {
        // escaped char — include next verbatim
        if (i < n) {
          str += formatted[i];
          i++;
        }
      } else if (ch === '"') {
        break;
      }
    }
    return str;
  };

  while (i < n) {
    const ch = formatted[i];

    if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') {
      let ws = '';
      while (i < n && (formatted[i] === ' ' || formatted[i] === '\n' || formatted[i] === '\t' || formatted[i] === '\r')) {
        ws += formatted[i];
        i++;
      }
      tokens.push({ text: ws, cls: 'whitespace' });
      continue;
    }

    if (ch === '"') {
      const str = readString();
      // Look ahead past whitespace to decide key vs string value.
      let j = i;
      while (j < n && (formatted[j] === ' ' || formatted[j] === '\n' || formatted[j] === '\t' || formatted[j] === '\r')) j++;
      const isKey = formatted[j] === ':';
      tokens.push({ text: str, cls: isKey ? 'key' : 'string' });
      continue;
    }

    if (ch === '-' || (ch >= '0' && ch <= '9')) {
      let num = '';
      while (i < n && /[0-9eE+\-.]/.test(formatted[i])) {
        num += formatted[i];
        i++;
      }
      tokens.push({ text: num, cls: 'number' });
      continue;
    }

    if (formatted.startsWith('true', i)) {
      tokens.push({ text: 'true', cls: 'boolean' });
      i += 4;
      continue;
    }
    if (formatted.startsWith('false', i)) {
      tokens.push({ text: 'false', cls: 'boolean' });
      i += 5;
      continue;
    }
    if (formatted.startsWith('null', i)) {
      tokens.push({ text: 'null', cls: 'null' });
      i += 4;
      continue;
    }

    // punctuation: { } [ ] : ,
    tokens.push({ text: ch, cls: 'punctuation' });
    i++;
  }

  return tokens;
}

export const EXAMPLE_JSON = `{
  "store": "MicroFree Tools",
  "active": true,
  "version": 3.4,
  "tools": [
    { "id": 1, "name": "JSON Formatter", "tags": ["developer", "json"] },
    { "id": 2, "name": "Base64 Tools", "tags": ["developer", "encoding"] }
  ],
  "owner": null,
  "settings": { "theme": "light", "indent": 2, "privacy": "client-side" }
}`;
