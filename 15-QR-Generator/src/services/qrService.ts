import QRCode from 'qrcode';
import type { QRCodeErrorCorrectionLevel } from 'qrcode';

export type QrType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard';

export interface QrOptions {
  foreground: string;
  background: string;
  size: number;
  level: QRCodeErrorCorrectionLevel;
}

export interface EmailFields {
  to: string;
  subject: string;
  body: string;
}

export interface SmsFields {
  phone: string;
  message: string;
}

export interface WifiFields {
  ssid: string;
  password: string;
  auth: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VcardFields {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  org: string;
  title: string;
  url: string;
}

/** Escape special characters for Wi-Fi / vCard payloads. */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

export function buildEmailPayload(f: EmailFields): string {
  const params: string[] = [];
  if (f.subject) params.push(`subject=${encodeURIComponent(f.subject)}`);
  if (f.body) params.push(`body=${encodeURIComponent(f.body)}`);
  const query = params.length ? `?${params.join('&')}` : '';
  return `mailto:${f.to}${query}`;
}

export function buildSmsPayload(f: SmsFields): string {
  const body = f.message ? `?body=${encodeURIComponent(f.message)}` : '';
  return `sms:${f.phone}${body}`;
}

export function buildWifiPayload(f: WifiFields): string {
  if (!f.ssid) return '';
  const auth = f.auth;
  const ssid = escapeWifi(f.ssid);
  const pass = auth === 'nopass' ? '' : escapeWifi(f.password);
  const hidden = f.hidden ? 'H:true;' : '';
  const passPart = auth === 'nopass' ? '' : `P:${pass};`;
  return `WIFI:T:${auth};S:${ssid};${passPart}${hidden};`;
}

export function buildVcardPayload(f: VcardFields): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeWifi(f.lastName)};${escapeWifi(f.firstName)};;;`,
    `FN:${escapeWifi(`${f.firstName} ${f.lastName}`.trim())}`,
  ];
  if (f.org) lines.push(`ORG:${escapeWifi(f.org)}`);
  if (f.title) lines.push(`TITLE:${escapeWifi(f.title)}`);
  if (f.phone) lines.push(`TEL;TYPE=CELL:${f.phone}`);
  if (f.email) lines.push(`EMAIL:${f.email}`);
  if (f.url) lines.push(`URL:${f.url}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

/** Render the payload onto an existing canvas element. Larger margin keeps the quiet zone scannable. */
export async function renderToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  opts: QrOptions
): Promise<void> {
  await QRCode.toCanvas(canvas, text, {
    width: opts.size,
    margin: 2,
    errorCorrectionLevel: opts.level,
    color: {
      dark: opts.foreground,
      light: opts.background,
    },
  });
}

/** Produce an SVG string for download. */
export async function renderToSvg(text: string, opts: QrOptions): Promise<string> {
  return QRCode.toString(text, {
    type: 'svg',
    width: opts.size,
    margin: 2,
    errorCorrectionLevel: opts.level,
    color: {
      dark: opts.foreground,
      light: opts.background,
    },
  });
}

/** Relative luminance (WCAG) for a #rrggbb color. */
function luminance(hex: string): number {
  const m = hex.replace('#', '');
  const r = parseInt(m.substring(0, 2), 16) / 255;
  const g = parseInt(m.substring(2, 4), 16) / 255;
  const b = parseInt(m.substring(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contrast ratio between foreground and background. QR scanners generally need >= ~2.5. */
export function contrastRatio(fg: string, bg: string): number {
  try {
    const l1 = luminance(fg);
    const l2 = luminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  } catch {
    return 21;
  }
}
