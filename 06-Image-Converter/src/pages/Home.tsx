import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  Download,
  AlertCircle,
  RefreshCw,
  ImageIcon,
  X,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  convertImage,
  TargetFormat,
  ConvertedImageItem,
} from '../services/imageConverterService';

const FORMAT_OPTIONS: { value: TargetFormat; label: string; note: string }[] = [
  { value: 'image/png', label: 'PNG', note: 'Lossless • Transparency' },
  { value: 'image/jpeg', label: 'JPG', note: 'Small size • Photos' },
  { value: 'image/webp', label: 'WebP', note: 'Modern • Efficient' },
];

export const Home: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>('image/png');
  const [quality, setQuality] = useState<number>(92);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [results, setResults] = useState<ConvertedImageItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const valid: File[] = [];
    for (const f of Array.from(incoming)) {
      if (f.type.startsWith('image/')) valid.push(f);
    }
    if (valid.length === 0) {
      setErrorMessage('Please select valid image files (JPG, PNG, WebP).');
      return;
    }
    setErrorMessage(null);
    setResults([]);
    setFiles((prev) => [...prev, ...valid]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResults([]);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setErrorMessage(null);
    results.forEach((r) => URL.revokeObjectURL(r.previewUrl));
    setResults([]);

    try {
      const converted: ConvertedImageItem[] = [];
      for (const file of files) {
        const item = await convertImage(file, targetFormat, quality / 100, backgroundColor);
        converted.push(item);
      }
      setResults(converted);
      try {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
      } catch {
        /* ignore */
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error during conversion.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    results.forEach((r) => URL.revokeObjectURL(r.previewUrl));
    setFiles([]);
    setResults([]);
    setErrorMessage(null);
  };

  const downloadName = (item: ConvertedImageItem) => {
    const base = item.originalFile.name.replace(/\.[^/.]+$/, '');
    const ext = item.targetFormatLabel.toLowerCase().replace('jpg', 'jpg');
    return `${base}.${ext === 'webp' ? 'webp' : ext}`;
  };

  const needsBackground = targetFormat === 'image/jpeg';

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">Image Converter</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Convert JPG, PNG, and WebP images in any direction. Batch processing, transparency control, and 100% private client-side conversion.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {files.length === 0 ? (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition ${
              isDragging
                ? 'border-brand-500 bg-brand-50/50'
                : 'border-slate-300 bg-slate-50/50 hover:border-brand-500 hover:bg-brand-50/30'
            }`}
          >
            <UploadCloud className="h-12 w-12 text-brand-600 mb-3" />
            <span className="text-base font-semibold text-slate-800">
              Click or Drop Images Here (JPG, PNG, WebP)
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Multiple files supported • 100% Client-Side • Nothing is uploaded
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="space-y-6">
            {/* Selected files list */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">
                {files.length} image{files.length > 1 ? 's' : ''} selected
              </h4>
              <div className="flex gap-2">
                <label className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Add More</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="h-4 w-4 text-brand-600 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 truncate">{file.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 shrink-0"
                    aria-label="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Conversion settings */}
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Convert To Format:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FORMAT_OPTIONS.map((opt) => {
                    const selected = targetFormat === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTargetFormat(opt.value)}
                        className={`flex flex-col items-center p-3 rounded-lg border transition ${
                          selected
                            ? 'bg-brand-50/80 border-brand-500 text-brand-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm font-bold">{opt.label}</span>
                        <span className="text-[10px] text-slate-500">{opt.note}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {targetFormat !== 'image/png' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Output Quality ({quality}%):
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                    className="w-full accent-brand-600"
                  />
                </div>
              )}

              {needsBackground && (
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-slate-700">
                    Transparency Background Fill:
                  </label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-8 w-14 rounded border border-slate-300 bg-white cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500">
                    JPG has no alpha channel — transparent areas are filled with this color.
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4" />
                    <span>
                      Convert {files.length} image{files.length > 1 ? 's' : ''} to{' '}
                      {FORMAT_OPTIONS.find((o) => o.value === targetFormat)?.label}
                    </span>
                  </>
                )}
              </button>

              {errorMessage && (
                <div className="flex items-center gap-2 text-xs font-medium text-coral-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-emerald-950">
                  Converted {results.length} image{results.length > 1 ? 's' : ''} — download below
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 space-y-3"
                    >
                      <div className="flex justify-center bg-white p-2 rounded-lg border border-emerald-200 h-36 overflow-hidden">
                        <img
                          src={item.previewUrl}
                          alt={item.originalFile.name}
                          className="max-h-32 max-w-full object-contain rounded"
                        />
                      </div>
                      <div className="text-xs text-emerald-900">
                        <p className="font-semibold truncate">{downloadName(item)}</p>
                        <p className="text-emerald-700">
                          {item.originalFormat} → {item.targetFormatLabel} • {(item.convertedSize / 1024).toFixed(0)} KB • {item.width}×{item.height}
                        </p>
                      </div>
                      <a
                        href={item.previewUrl}
                        download={downloadName(item)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
                {results.length > 1 && (
                  <p className="text-[11px] text-slate-500 text-center">
                    Tip: Use each Download button to save files individually. Your browser may ask permission to download multiple files at once.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <AdSlot slotId="sample-ad-slot-converter" format="horizontal" className="max-w-4xl mx-auto" />

      <SEO />
    </main>
  );
};
