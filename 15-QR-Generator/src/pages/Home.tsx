import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  QrCode,
  Link2,
  Type,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  Contact,
  Download,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  QrType,
  QrOptions,
  buildEmailPayload,
  buildSmsPayload,
  buildWifiPayload,
  buildVcardPayload,
  renderToCanvas,
  renderToSvg,
  contrastRatio,
} from '../services/qrService';
import type { QRCodeErrorCorrectionLevel } from 'qrcode';

const TYPE_TABS: { id: QrType; label: string; icon: React.ReactNode }[] = [
  { id: 'url', label: 'URL', icon: <Link2 className="h-4 w-4" /> },
  { id: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> },
  { id: 'email', label: 'Email', icon: <Mail className="h-4 w-4" /> },
  { id: 'phone', label: 'Phone', icon: <Phone className="h-4 w-4" /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="h-4 w-4" /> },
  { id: 'vcard', label: 'Contact', icon: <Contact className="h-4 w-4" /> },
];

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500';
const labelClass = 'block text-xs font-semibold text-slate-700 mb-1';

export const Home: React.FC = () => {
  const [type, setType] = useState<QrType>('url');

  const [text, setText] = useState('');
  const [url, setUrl] = useState('https://microfree.store');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });
  const [sms, setSms] = useState({ phone: '', message: '' });
  const [wifi, setWifi] = useState<{ ssid: string; password: string; auth: 'WPA' | 'WEP' | 'nopass'; hidden: boolean }>({
    ssid: '',
    password: '',
    auth: 'WPA',
    hidden: false,
  });
  const [vcard, setVcard] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    org: '',
    title: '',
    url: '',
  });

  const [options, setOptions] = useState<QrOptions>({
    foreground: '#0f172a',
    background: '#ffffff',
    size: 320,
    level: 'M',
  });

  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const buildPayload = useCallback((): string => {
    switch (type) {
      case 'text':
        return text;
      case 'url':
        return url;
      case 'phone':
        return phone ? `tel:${phone}` : '';
      case 'email':
        return email.to ? buildEmailPayload(email) : '';
      case 'sms':
        return sms.phone ? buildSmsPayload(sms) : '';
      case 'wifi':
        return buildWifiPayload(wifi);
      case 'vcard':
        return vcard.firstName || vcard.lastName || vcard.phone || vcard.email
          ? buildVcardPayload(vcard)
          : '';
      default:
        return '';
    }
  }, [type, text, url, phone, email, sms, wifi, vcard]);

  const payload = buildPayload();
  const contrast = contrastRatio(options.foreground, options.background);
  const lowContrast = contrast < 2.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!payload) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = options.size;
        canvas.height = options.size;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setError(null);
      return;
    }
    renderToCanvas(canvas, payload, options)
      .then(() => setError(null))
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Unable to generate QR code (input may be too long).');
      });
  }, [payload, options]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || !payload) return;
    const link = document.createElement('a');
    link.download = 'microfree-qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadSvg = async () => {
    if (!payload) return;
    try {
      const svg = await renderToSvg(payload, options);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'microfree-qr-code.svg';
      link.href = href;
      link.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unable to export SVG.');
    }
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">QR Code Generator</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Create scannable QR codes for links, Wi-Fi, contacts and more. Customize colors and size, then download PNG or SVG — 100% in your browser.
        </p>
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-6">
        {TYPE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setType(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
              type === t.id
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Controls */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-5">
          <h2 className="text-sm font-bold text-slate-900">Content</h2>

          {type === 'text' && (
            <div>
              <label className={labelClass}>Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="Enter any text to encode…"
                className={inputClass}
              />
            </div>
          )}

          {type === 'url' && (
            <div>
              <label className={labelClass}>Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>
          )}

          {type === 'phone' && (
            <div>
              <label className={labelClass}>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className={inputClass}
              />
            </div>
          )}

          {type === 'email' && (
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Recipient email</label>
                <input
                  type="email"
                  value={email.to}
                  onChange={(e) => setEmail({ ...email, to: e.target.value })}
                  placeholder="hello@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Subject (optional)</label>
                <input
                  type="text"
                  value={email.subject}
                  onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Message (optional)</label>
                <textarea
                  value={email.body}
                  onChange={(e) => setEmail({ ...email, body: e.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {type === 'sms' && (
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Phone number</label>
                <input
                  type="tel"
                  value={sms.phone}
                  onChange={(e) => setSms({ ...sms, phone: e.target.value })}
                  placeholder="+1 555 123 4567"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Message (optional)</label>
                <textarea
                  value={sms.message}
                  onChange={(e) => setSms({ ...sms, message: e.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Network name (SSID)</label>
                <input
                  type="text"
                  value={wifi.ssid}
                  onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Encryption</label>
                  <select
                    value={wifi.auth}
                    onChange={(e) => setWifi({ ...wifi, auth: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
                    className={inputClass}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No password</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input
                    type="text"
                    value={wifi.password}
                    onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                    disabled={wifi.auth === 'nopass'}
                    className={`${inputClass} disabled:bg-slate-100 disabled:text-slate-400`}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={wifi.hidden}
                  onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                  className="accent-brand-600"
                />
                Hidden network
              </label>
            </div>
          )}

          {type === 'vcard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>First name</label>
                <input type="text" value={vcard.firstName} onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input type="text" value={vcard.lastName} onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" value={vcard.phone} onChange={(e) => setVcard({ ...vcard, phone: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={vcard.email} onChange={(e) => setVcard({ ...vcard, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Organization</label>
                <input type="text" value={vcard.org} onChange={(e) => setVcard({ ...vcard, org: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Job title</label>
                <input type="text" value={vcard.title} onChange={(e) => setVcard({ ...vcard, title: e.target.value })} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Website</label>
                <input type="url" value={vcard.url} onChange={(e) => setVcard({ ...vcard, url: e.target.value })} className={inputClass} />
              </div>
            </div>
          )}

          {/* Styling options */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Appearance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Foreground</label>
                <input
                  type="color"
                  value={options.foreground}
                  onChange={(e) => setOptions({ ...options, foreground: e.target.value })}
                  className="h-9 w-full rounded border border-slate-300 bg-white cursor-pointer"
                />
              </div>
              <div>
                <label className={labelClass}>Background</label>
                <input
                  type="color"
                  value={options.background}
                  onChange={(e) => setOptions({ ...options, background: e.target.value })}
                  className="h-9 w-full rounded border border-slate-300 bg-white cursor-pointer"
                />
              </div>
              <div>
                <label className={labelClass}>Size ({options.size}px)</label>
                <input
                  type="range"
                  min="120"
                  max="800"
                  step="20"
                  value={options.size}
                  onChange={(e) => setOptions({ ...options, size: parseInt(e.target.value, 10) })}
                  className="w-full accent-brand-600 mt-2"
                />
              </div>
              <div>
                <label className={labelClass}>Error correction</label>
                <select
                  value={options.level}
                  onChange={(e) => setOptions({ ...options, level: e.target.value as QRCodeErrorCorrectionLevel })}
                  className={inputClass}
                >
                  <option value="L">L — Low (7%)</option>
                  <option value="M">M — Medium (15%)</option>
                  <option value="Q">Q — Quartile (25%)</option>
                  <option value="H">H — High (30%)</option>
                </select>
              </div>
            </div>

            {lowContrast && (
              <div className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Low color contrast may prevent scanning. Use a dark foreground on a light background.</span>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-card flex flex-col items-center">
          <h2 className="text-sm font-bold text-slate-900 self-start mb-4">Live Preview</h2>
          <div className="flex-1 flex items-center justify-center w-full">
            {payload ? (
              <div className="rounded-xl border border-slate-200 p-3 bg-white">
                <canvas ref={canvasRef} className="max-w-full h-auto" style={{ imageRendering: 'pixelated' }} />
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-400 py-12">
                <QrCode className="h-14 w-14 mb-3" />
                <p className="text-xs">Enter content to generate your QR code</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-coral-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3 w-full">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={!payload}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 disabled:opacity-40 transition"
            >
              <Download className="h-4 w-4" />
              <span>PNG</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadSvg}
              disabled={!payload}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-600 px-4 py-2.5 text-xs font-bold text-brand-700 hover:bg-brand-50 disabled:opacity-40 transition"
            >
              <Download className="h-4 w-4" />
              <span>SVG</span>
            </button>
          </div>
        </div>
      </div>

      <AdSlot slotId="sample-ad-slot-qr" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
