import React, { useState, useCallback } from 'react';
import {
  ArrowRightLeft,
  Image as ImageIcon,
  FileImage,
  Copy,
  Download,
  Trash2,
  Check,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  encodeText,
  decodeText,
  toUrlSafe,
  fileToDataUri,
  splitDataUri,
  buildDataUri,
  isValidBase64,
} from '../services/base64Service';

type Mode = 'text' | 'img2b64' | 'b642img';
type TextDir = 'encode' | 'decode';

export const Home: React.FC = () => {
  const [mode, setMode] = useState<Mode>('text');

  // Text mode
  const [textDir, setTextDir] = useState<TextDir>('encode');
  const [textInput, setTextInput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);

  // Image -> Base64
  const [imgDataUri, setImgDataUri] = useState<string>('');
  const [imgName, setImgName] = useState<string>('');
  const [copyRaw, setCopyRaw] = useState(false);

  // Base64 -> Image
  const [b64Input, setB64Input] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const flashCopied = (key: string) => {
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => flashCopied(key)).catch(() => {});
  };

  // ---- Text mode output ----
  let textOutput = '';
  let textError: string | null = null;
  if (mode === 'text' && textInput) {
    try {
      if (textDir === 'encode') {
        const enc = encodeText(textInput);
        textOutput = urlSafe ? toUrlSafe(enc) : enc;
      } else {
        textOutput = decodeText(textInput);
      }
    } catch {
      textError = textDir === 'decode' ? 'Invalid Base64 input — cannot decode.' : 'Encoding failed.';
    }
  }

  const handleImageUpload = useCallback(async (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file.');
      return;
    }
    try {
      const uri = await fileToDataUri(file);
      setImgDataUri(uri);
      setImgName(file.name);
    } catch {
      setError('Failed to read the image.');
    }
  }, []);

  const onImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleImageUpload(e.target.files[0]);
    e.target.value = '';
  };

  const onImgDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleImageUpload(e.dataTransfer.files[0]);
  };

  // ---- Base64 -> Image ----
  let decodedImgSrc = '';
  let b64ImgError: string | null = null;
  if (mode === 'b642img' && b64Input.trim()) {
    const { base64, mime } = splitDataUri(b64Input);
    if (isValidBase64(base64)) {
      try {
        decodedImgSrc = buildDataUri(base64, mime.startsWith('image/') ? mime : 'image/png');
      } catch {
        b64ImgError = 'Could not build an image from this Base64 string.';
      }
    } else {
      b64ImgError = 'Invalid Base64 — check for typos or truncated data.';
    }
  }

  const downloadText = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const imgCopyValue = copyRaw ? splitDataUri(imgDataUri).base64 : imgDataUri;

  const tabs: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: 'text', label: 'Text ⇄ Base64', icon: <ArrowRightLeft className="h-3.5 w-3.5" /> },
    { id: 'img2b64', label: 'Image → Base64', icon: <ImageIcon className="h-3.5 w-3.5" /> },
    { id: 'b642img', label: 'Base64 → Image', icon: <FileImage className="h-3.5 w-3.5" /> },
  ];

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Base64 <span className="text-brand-600">Encoder & Decoder</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Encode and decode Base64 for text and images with full Unicode support and URL-safe output. 100% private, in your browser.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-6">
        {/* Mode tabs */}
        <div className="flex flex-col sm:flex-row border border-slate-200 bg-slate-50 rounded-xl p-1 gap-1 text-xs font-semibold">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setMode(t.id);
                setError(null);
              }}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
                mode === t.id ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs font-medium text-coral-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ---- TEXT MODE ---- */}
        {mode === 'text' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTextDir('encode')}
                  className={`px-3 py-1.5 rounded-md transition ${
                    textDir === 'encode' ? 'bg-brand-600 text-white' : 'text-slate-600'
                  }`}
                >
                  Encode to Base64
                </button>
                <button
                  type="button"
                  onClick={() => setTextDir('decode')}
                  className={`px-3 py-1.5 rounded-md transition ${
                    textDir === 'decode' ? 'bg-brand-600 text-white' : 'text-slate-600'
                  }`}
                >
                  Decode from Base64
                </button>
              </div>

              {textDir === 'encode' && (
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urlSafe}
                    onChange={(e) => setUrlSafe(e.target.checked)}
                    className="h-4 w-4 accent-brand-600"
                  />
                  <span>URL-safe output</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {textDir === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={textDir === 'encode' ? 'Type or paste text, emoji 😀, any language…' : 'Paste Base64 to decode…'}
                  className="h-52 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {textDir === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                </label>
                <textarea
                  readOnly
                  value={textError ? '' : textOutput}
                  placeholder="Result appears here…"
                  className="h-52 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {textError && (
              <div className="flex items-center gap-2 text-xs font-medium text-coral-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{textError}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!textOutput}
                onClick={() => copyToClipboard(textOutput, 'text')}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-40 transition"
              >
                {copied === 'text' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied === 'text' ? 'Copied!' : 'Copy Output'}</span>
              </button>
              <button
                type="button"
                disabled={!textOutput}
                onClick={() => downloadText(textOutput, textDir === 'encode' ? 'encoded.txt' : 'decoded.txt')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .txt</span>
              </button>
              <button
                type="button"
                disabled={!textInput}
                onClick={() => setTextInput('')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        )}

        {/* ---- IMAGE -> BASE64 ---- */}
        {mode === 'img2b64' && (
          <div className="space-y-4">
            {!imgDataUri ? (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={onImgDrop}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 transition"
              >
                <UploadCloud className="h-12 w-12 text-brand-600 mb-3" />
                <span className="text-base font-semibold text-slate-800">Click or Drop an Image</span>
                <span className="mt-1 text-xs text-slate-500">Generates a Base64 data URI locally</span>
                <input type="file" accept="image/*" onChange={onImgInput} className="sr-only" />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex justify-center bg-slate-50 p-3 rounded-xl border border-slate-200 sm:w-56 shrink-0">
                    <img src={imgDataUri} alt={imgName} className="max-h-40 max-w-full object-contain rounded" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{imgName}</p>
                    <p className="text-xs text-slate-500 mb-2">
                      {imgDataUri.length.toLocaleString()} characters
                    </p>
                    <textarea
                      readOnly
                      value={imgDataUri}
                      className="h-28 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-mono text-slate-700 break-all focus:outline-none"
                    />
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={copyRaw}
                    onChange={(e) => setCopyRaw(e.target.checked)}
                    className="h-4 w-4 accent-brand-600"
                  />
                  <span>Copy raw Base64 only (exclude the data: prefix)</span>
                </label>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(imgCopyValue, 'img')}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition"
                  >
                    {copied === 'img' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied === 'img' ? 'Copied!' : copyRaw ? 'Copy Base64' : 'Copy Data URI'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadText(imgCopyValue, 'image-base64.txt')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .txt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImgDataUri('');
                      setImgName('');
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- BASE64 -> IMAGE ---- */}
        {mode === 'b642img' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paste Base64 or a data URI
              </label>
              <textarea
                value={b64Input}
                onChange={(e) => setB64Input(e.target.value)}
                placeholder="iVBORw0KGgo…  or  data:image/png;base64,iVBORw0KGgo…"
                className="h-36 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-[11px] font-mono text-slate-800 break-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {b64ImgError && (
              <div className="flex items-center gap-2 text-xs font-medium text-coral-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{b64ImgError}</span>
              </div>
            )}

            {decodedImgSrc && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
                <div className="flex justify-center bg-white p-3 rounded-lg border border-emerald-200 max-h-72 overflow-hidden">
                  <img
                    src={decodedImgSrc}
                    alt="Decoded"
                    className="max-h-64 max-w-full object-contain rounded"
                    onError={() => undefined}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={decodedImgSrc}
                    download="decoded-image"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Image</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setB64Input('')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AdSlot slotId="sample-ad-slot-base64" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
