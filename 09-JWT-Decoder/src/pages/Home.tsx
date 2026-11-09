import React, { useMemo, useState } from 'react';
import {
  KeyRound,
  AlertCircle,
  Copy,
  Check,
  Trash2,
  FileText,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  decodeJwt,
  describeClaims,
  getTokenTimeStatus,
  createExampleToken,
  DecodedJwt,
  TokenTimeStatus,
} from '../services/jwtService';

interface CopyButtonProps {
  value: string;
  label?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
};

const StatusBadge: React.FC<{ status: TokenTimeStatus }> = ({ status }) => {
  const map = {
    valid: {
      icon: <CheckCircle2 className="h-4 w-4" />,
      cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Within Valid Time Window',
    },
    expired: {
      icon: <XCircle className="h-4 w-4" />,
      cls: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Expired',
    },
    'not-yet-valid': {
      icon: <AlertTriangle className="h-4 w-4" />,
      cls: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Not Yet Valid',
    },
    'no-expiry': {
      icon: <Clock className="h-4 w-4" />,
      cls: 'bg-slate-50 text-slate-600 border-slate-200',
      title: 'No Expiration Set',
    },
  } as const;
  const m = map[status.kind];
  return (
    <div className={`rounded-xl border p-4 flex items-start gap-3 ${m.cls}`}>
      <span className="shrink-0 mt-0.5">{m.icon}</span>
      <div>
        <p className="text-sm font-bold">{m.title}</p>
        <p className="text-xs opacity-90">{status.detail}</p>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const [token, setToken] = useState('');

  const decoded = useMemo<{ data: DecodedJwt | null; error: string | null }>(() => {
    if (!token.trim()) return { data: null, error: null };
    try {
      return { data: decodeJwt(token), error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to decode token.' };
    }
  }, [token]);

  const claims = useMemo(() => (decoded.data ? describeClaims(decoded.data.payload) : []), [decoded.data]);
  const status = useMemo(() => (decoded.data ? getTokenTimeStatus(decoded.data.payload) : null), [decoded.data]);

  const headerJson = decoded.data ? JSON.stringify(decoded.data.header, null, 2) : '';
  const payloadJson = decoded.data ? JSON.stringify(decoded.data.payload, null, 2) : '';

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          JWT <span className="text-brand-600">Token Decoder</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Decode and inspect the header, payload and claims of any JSON Web Token. 100% private — nothing is ever uploaded.
        </p>
      </div>

      {/* Security note — always visible */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">This tool only decodes.</span> It does <span className="font-bold">not</span> verify the
          signature or prove the token is authentic or trusted. The token is processed entirely in your browser and is never
          transmitted to any server.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="jwt-input" className="text-sm font-bold text-slate-900">
              Encoded JWT
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setToken(createExampleToken())}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Load Example</span>
              </button>
              <button
                type="button"
                onClick={() => setToken('')}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
          <textarea
            id="jwt-input"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your token here: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0..."
            spellCheck={false}
            className="w-full h-32 resize-y rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 break-all"
          />
        </div>

        {decoded.error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{decoded.error}</span>
          </div>
        )}

        {decoded.data && status && (
          <div className="space-y-6">
            <StatusBadge status={status} />

            {/* Header & Payload JSON */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Header</span>
                  <CopyButton value={headerJson} label="Copy JSON" />
                </div>
                <pre className="overflow-x-auto p-4 text-xs font-mono text-slate-800 leading-relaxed max-h-80">
                  {headerJson}
                </pre>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Payload</span>
                  <CopyButton value={payloadJson} label="Copy JSON" />
                </div>
                <pre className="overflow-x-auto p-4 text-xs font-mono text-slate-800 leading-relaxed max-h-80">
                  {payloadJson}
                </pre>
              </div>
            </div>

            {/* Claims table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Decoded Claims</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-100">
                      <th className="px-4 py-2 font-semibold">Claim</th>
                      <th className="px-4 py-2 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((c) => (
                      <tr key={c.key} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                        <td className="px-4 py-2 font-semibold text-slate-800 align-top whitespace-nowrap">{c.label}</td>
                        <td className="px-4 py-2 font-mono text-slate-700 break-all">{c.display}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signature */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <KeyRound className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Signature (not verified)</span>
              </div>
              <p className="font-mono text-xs text-slate-600 break-all">{decoded.data.signature}</p>
              <p className="mt-2 text-[11px] text-slate-500">
                The signature is shown as-is. Verifying it requires the issuer&rsquo;s secret or public key and must be done on a
                trusted server.
              </p>
            </div>
          </div>
        )}
      </div>

      <AdSlot slotId="sample-ad-slot-jwt" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
