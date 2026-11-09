// ============================================================================
// MicroFree Developer Toolbox — pure, client-side helper functions.
// No eval(), no network, no unsafe HTML execution.
// ============================================================================

/* ---------------------------------- URL ---------------------------------- */
export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}
export function urlDecode(input: string): string {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/* --------------------------- HTML entity codec --------------------------- */
const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
export function encodeEntities(input: string): string {
  return input.replace(/[&<>"']/g, (c) => ENTITY_MAP[c]);
}
export function decodeEntities(input: string): string {
  const named: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    copy: '©',
    reg: '®',
    trade: '™',
    hellip: '…',
    mdash: '—',
    ndash: '–',
  };
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body[0] === '#') {
      const isHex = body[1] === 'x' || body[1] === 'X';
      const code = parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      if (!Number.isNaN(code)) {
        try {
          return String.fromCodePoint(code);
        } catch {
          return match;
        }
      }
      return match;
    }
    return named[body] ?? match;
  });
}

/* ------------------------- generic JS-like scanner ------------------------ */
// Splits code into segments flagged as 'code' | 'string' | 'comment' so that
// formatters/minifiers never corrupt string or comment contents.
type Seg = { type: 'code' | 'string' | 'comment' | 'regex'; value: string };

function scanCode(src: string): Seg[] {
  const segs: Seg[] = [];
  let i = 0;
  let code = '';
  const n = src.length;
  const pushCode = () => {
    if (code) {
      segs.push({ type: 'code', value: code });
      code = '';
    }
  };
  const prevNonSpace = (): string => {
    for (let k = code.length - 1; k >= 0; k--) {
      if (!/\s/.test(code[k])) return code[k];
    }
    // look back into previous segments
    for (let s = segs.length - 1; s >= 0; s--) {
      if (segs[s].type === 'code') {
        const v = segs[s].value.trimEnd();
        if (v) return v[v.length - 1];
      } else {
        return segs[s].type === 'string' ? '"' : ')';
      }
    }
    return '';
  };

  while (i < n) {
    const c = src[i];
    const next = src[i + 1];

    // line comment
    if (c === '/' && next === '/') {
      pushCode();
      let j = i;
      while (j < n && src[j] !== '\n') j++;
      segs.push({ type: 'comment', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // block comment
    if (c === '/' && next === '*') {
      pushCode();
      let j = i + 2;
      while (j < n && !(src[j] === '*' && src[j + 1] === '/')) j++;
      j = Math.min(n, j + 2);
      segs.push({ type: 'comment', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // strings
    if (c === '"' || c === "'" || c === '`') {
      pushCode();
      const quote = c;
      let j = i + 1;
      while (j < n) {
        if (src[j] === '\\') {
          j += 2;
          continue;
        }
        if (src[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      segs.push({ type: 'string', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // regex literal (heuristic: '/' not division)
    if (c === '/') {
      const p = prevNonSpace();
      const divisionContext = /[A-Za-z0-9_$)\]]/.test(p);
      if (!divisionContext) {
        pushCode();
        let j = i + 1;
        let inClass = false;
        while (j < n) {
          const ch = src[j];
          if (ch === '\\') {
            j += 2;
            continue;
          }
          if (ch === '[') inClass = true;
          else if (ch === ']') inClass = false;
          else if (ch === '/' && !inClass) {
            j++;
            break;
          } else if (ch === '\n') {
            break;
          }
          j++;
        }
        // trailing flags
        while (j < n && /[a-z]/i.test(src[j])) j++;
        segs.push({ type: 'regex', value: src.slice(i, j) });
        i = j;
        continue;
      }
    }

    code += c;
    i++;
  }
  pushCode();
  return segs;
}

/* ------------------------------ JS minifier ------------------------------ */
export function minifyJs(src: string): string {
  const segs = scanCode(src);
  let out = '';
  for (const seg of segs) {
    if (seg.type === 'comment') continue;
    if (seg.type === 'string' || seg.type === 'regex') {
      out += seg.value;
    } else {
      // collapse all runs of whitespace (incl. newlines) to a single space
      out += seg.value.replace(/\s+/g, ' ');
    }
  }
  // conservative: collapse space around structural punctuation only (safe — these
  // tokens never merge with identifiers/keywords to form a different token)
  return out
    .replace(/ ?([{};,]) ?/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/* ------------------------------ JS formatter ----------------------------- */
export function formatJs(src: string): string {
  // Work from a minified-ish single-space stream but keep strings/regex intact.
  const segs = scanCode(src);
  let stream = '';
  for (const seg of segs) {
    if (seg.type === 'comment') {
      stream += `\u0000C${btoaSafe(seg.value)}\u0000`;
    } else if (seg.type === 'string' || seg.type === 'regex') {
      stream += `\u0000S${btoaSafe(seg.value)}\u0000`;
    } else {
      stream += seg.value.replace(/\s+/g, ' ');
    }
  }

  let indent = 0;
  const pad = () => '  '.repeat(Math.max(0, indent));
  let result = '';
  for (let i = 0; i < stream.length; i++) {
    const ch = stream[i];
    if (ch === '\u0000') {
      // restore a protected token
      const end = stream.indexOf('\u0000', i + 1);
      const token = stream.slice(i + 1, end);
      const kind = token[0];
      const value = atobSafe(token.slice(1));
      if (kind === 'C') {
        result = result.replace(/[ ]+$/, '');
        if (result && !result.endsWith('\n')) result += '\n' + pad();
        result += value + '\n' + pad();
      } else {
        result += value;
      }
      i = end;
      continue;
    }
    if (ch === '{') {
      indent++;
      result = result.replace(/[ ]+$/, '');
      result += ' {\n' + pad();
    } else if (ch === '}') {
      indent = Math.max(0, indent - 1);
      result = result.replace(/\s+$/, '');
      result += '\n' + pad() + '}';
    } else if (ch === ';') {
      result = result.replace(/[ ]+$/, '');
      result += ';\n' + pad();
    } else {
      result += ch;
    }
  }
  return result
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l, idx, arr) => !(l === '' && arr[idx - 1] === ''))
    .join('\n')
    .trim();
}

function btoaSafe(s: string): string {
  return btoa(unescape(encodeURIComponent(s)));
}
function atobSafe(s: string): string {
  return decodeURIComponent(escape(atob(s)));
}

/* ------------------------------ CSS format/min --------------------------- */
export function minifyCss(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}
export function formatCss(src: string): string {
  const min = minifyCss(src);
  let out = '';
  let indent = 0;
  for (let i = 0; i < min.length; i++) {
    const c = min[i];
    if (c === '{') {
      indent++;
      out += ' {\n' + '  '.repeat(indent);
    } else if (c === '}') {
      indent = Math.max(0, indent - 1);
      out = out.replace(/\s+$/, '');
      out += '\n' + '  '.repeat(indent) + '}\n' + '  '.repeat(indent);
    } else if (c === ';') {
      out += ';\n' + '  '.repeat(indent);
    } else {
      out += c;
    }
  }
  return out
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l, idx, arr) => !(l.trim() === '' && (idx === 0 || arr[idx - 1].trim() === '')))
    .join('\n')
    .trim();
}

/* ---------------------------- HTML / XML format -------------------------- */
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

function formatMarkup(src: string, isHtml: boolean): string {
  // Normalise whitespace between tags.
  const tokens = src
    .replace(/>\s+</g, '><')
    .replace(/</g, '\n<')
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);

  let indent = 0;
  const lines: string[] = [];
  for (const tokenRaw of tokens) {
    const token = tokenRaw;
    const isClosing = /^<\//.test(token);
    const isDecl = /^<[!?]/.test(token);
    const tagMatch = token.match(/^<\/?([a-zA-Z0-9:-]+)/);
    const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
    const selfClosing =
      /\/>\s*$/.test(token) || (isHtml && VOID_TAGS.has(tagName)) || isDecl;
    const isOpening = /^<[^/!?]/.test(token) && !selfClosing;
    // text + inline close on same token e.g. <a>text</a>
    const hasInlineClose = /<\/[a-zA-Z0-9:-]+>\s*$/.test(token) && isOpening;

    if (isClosing) indent = Math.max(0, indent - 1);
    lines.push('  '.repeat(Math.max(0, indent)) + token);
    if (isOpening && !hasInlineClose) indent++;
  }
  return lines.join('\n');
}

export function formatHtml(src: string): string {
  return formatMarkup(src, true);
}
export function minifyHtml(src: string): string {
  return src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
export function formatXml(src: string): string {
  return formatMarkup(src.trim(), false);
}

/* -------------------------------- UUID v4 -------------------------------- */
export function uuidV4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
  return (
    hex.slice(0, 4).join('') +
    '-' +
    hex.slice(4, 6).join('') +
    '-' +
    hex.slice(6, 8).join('') +
    '-' +
    hex.slice(8, 10).join('') +
    '-' +
    hex.slice(10, 16).join('')
  );
}

/* ----------------------------- color helpers ----------------------------- */
export interface RGB {
  r: number;
  g: number;
  b: number;
}
export function hexToRgb(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
export function rgbToHex({ r, g, b }: RGB): string {
  const to = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + to(r) + to(g) + to(b);
}
export function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
export function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/* -------------------------- safe markdown → HTML ------------------------- */
export function markdownToSafeHtml(md: string): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inUl = false;
  let inOl = false;
  let inCode = false;
  const codeBuffer: string[] = [];

  const closeLists = () => {
    if (inUl) {
      html.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      html.push('</ol>');
      inOl = false;
    }
  };

  const inline = (text: string): string => {
    let t = esc(text);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    t = t.replace(/_([^_]+)_/g, '<em>$1</em>');
    // links [text](http...) — only http/https, text only, escaped
    t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label: string, url: string) => {
      const safeUrl = url.replace(/"/g, '%22');
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer nofollow">${label}</a>`;
    });
    return t;
  };

  for (const raw of lines) {
    const line = raw;
    if (/^```/.test(line.trim())) {
      if (inCode) {
        html.push('<pre><code>' + codeBuffer.map(esc).join('\n') + '</code></pre>');
        codeBuffer.length = 0;
        inCode = false;
      } else {
        closeLists();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuffer.push(line);
      continue;
    }
    if (/^\s*$/.test(line)) {
      closeLists();
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeLists();
      const level = h[1].length;
      html.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    if (/^\s*>\s?/.test(line)) {
      closeLists();
      html.push(`<blockquote>${inline(line.replace(/^\s*>\s?/, ''))}</blockquote>`);
      continue;
    }
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      closeLists();
      html.push('<hr/>');
      continue;
    }
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    if (ul) {
      if (inOl) {
        html.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        html.push('<ul>');
        inUl = true;
      }
      html.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ol) {
      if (inUl) {
        html.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        html.push('<ol>');
        inOl = true;
      }
      html.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }
    closeLists();
    html.push(`<p>${inline(line)}</p>`);
  }
  if (inCode) {
    html.push('<pre><code>' + codeBuffer.map(esc).join('\n') + '</code></pre>');
  }
  closeLists();
  return html.join('\n');
}

/* ------------------------------ timestamp -------------------------------- */
export interface TimestampResult {
  iso: string;
  utc: string;
  local: string;
  relative: string;
}
export function fromUnix(value: number, unit: 's' | 'ms'): TimestampResult {
  const ms = unit === 's' ? value * 1000 : value;
  const d = new Date(ms);
  const diff = Date.now() - ms;
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000);
  const hrs = Math.round(abs / 3600000);
  const days = Math.round(abs / 86400000);
  let rel = 'just now';
  if (mins >= 1 && mins < 60) rel = `${mins} minute(s)`;
  else if (hrs >= 1 && hrs < 24) rel = `${hrs} hour(s)`;
  else if (days >= 1) rel = `${days} day(s)`;
  const relative = mins < 1 ? 'moments ago' : `${rel} ${diff >= 0 ? 'ago' : 'from now'}`;
  return {
    iso: d.toISOString(),
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    relative,
  };
}
