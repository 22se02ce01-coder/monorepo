import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Trash2,
  Eye,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { compressSingleImage, CompressedImageResult } from '../services/imageCompressionService';

export const Home: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<number>(75);
  const [targetSizeKb, setTargetSizeKb] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState<'original' | 'image/jpeg' | 'image/webp' | 'image/png'>('original');

  const [isCompressing, setIsCompressing] = useState(false);
  const [results, setResults] = useState<CompressedImageResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) {
      setErrorMessage('Please select valid image files (JPG, PNG, WebP).');
      return;
    }
    setSelectedFiles((prev) => [...prev, ...files]);
    setErrorMessage(null);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    setResults([]);
    setActivePreviewId(null);
    setErrorMessage(null);
  };

  const handleCompress = async () => {
    if (selectedFiles.length === 0) return;

    setIsCompressing(true);
    setErrorMessage(null);

    try {
      const q = quality / 100;
      const targetKb = targetSizeKb ? parseFloat(targetSizeKb) : undefined;
      const fmt = outputFormat === 'original' ? undefined : outputFormat;

      const newResults: CompressedImageResult[] = [];
      for (const file of selectedFiles) {
        const res = await compressSingleImage(file, q, targetKb, fmt);
        newResults.push(res);
      }

      setResults(newResults);
      if (newResults.length > 0) {
        setActivePreviewId(newResults[0].id);
      }

      try {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error during compression.';
      setErrorMessage(msg);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownloadAll = () => {
    results.forEach((res) => {
      const link = document.createElement('a');
      link.href = res.compressedPreviewUrl;
      link.download = `compressed_${res.originalFile.name}`;
      link.click();
    });
  };

  const activeResult = results.find((r) => r.id === activePreviewId) || results[0];

  const totalOriginalBytes = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalCompressedBytes = results.reduce((acc, r) => acc + r.compressedSize, 0);
  const overallReduction = totalOriginalBytes > 0
    ? Math.max(0, parseFloat((((totalOriginalBytes - totalCompressedBytes) / totalOriginalBytes) * 100).toFixed(1)))
    : 0;

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Smart Image <span className="text-brand-600">Compressor</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Make JPG, PNG and WebP pictures smaller with adjustable quality or a target size in KB. 100% private, client-side batch optimizer.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {/* Upload Zone */}
        <div className="relative mb-6">
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange({ target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 transition">
            <UploadCloud className="h-10 w-10 text-brand-600 mb-3" />
            <span className="text-sm font-semibold text-slate-800">
              Select or Drop Images Here (JPG, PNG, WebP)
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Multiple image selection supported • Zero server uploads
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {/* Selected Images List */}
        {selectedFiles.length > 0 && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Selected Images ({selectedFiles.length})</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-coral-500 hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg border border-slate-200 bg-slate-50 p-2 text-center text-xs overflow-hidden"
                >
                  <p className="font-medium text-slate-800 truncate">{file.name}</p>
                  <span className="text-[10px] text-slate-400">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="absolute top-1 right-1 rounded-full bg-slate-900/60 p-1 text-white hover:bg-coral-600 transition"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compression Controls */}
        <div className="rounded-xl bg-slate-50 p-5 border border-slate-200 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quality Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Quality Level: {quality}%</span>
                <span className="text-brand-600">
                  {quality > 80 ? 'High' : quality > 50 ? 'Balanced' : 'Aggressive'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                className="w-full accent-brand-600"
              />
            </div>

            {/* Target Size (KB) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Optional Target Size (KB):
              </label>
              <input
                type="number"
                placeholder="e.g. 150"
                value={targetSizeKb}
                onChange={(e) => setTargetSizeKb(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Output Format:
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="original">Keep Original Format</option>
                <option value="image/webp">Convert to WebP (Best Compression)</option>
                <option value="image/jpeg">Convert to JPEG</option>
                <option value="image/png">Convert to PNG</option>
              </select>
            </div>
          </div>
        </div>

        {/* Compress Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleCompress}
            disabled={selectedFiles.length === 0 || isCompressing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition"
          >
            {isCompressing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Compressing Images...</span>
              </>
            ) : (
              <>
                <Sliders className="h-4 w-4" />
                <span>Compress {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''} Images</span>
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

        {/* Results Overview & Downloads */}
        {results.length > 0 && (
          <div className="mt-8 space-y-6 pt-6 border-t border-slate-200">
            {/* Summary Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Compressed {results.length} image{results.length > 1 ? 's' : ''}!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Total saved: {(totalOriginalBytes / 1024).toFixed(0)} KB → {(totalCompressedBytes / 1024).toFixed(0)} KB ({overallReduction}% reduction)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadAll}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download All</span>
              </button>
            </div>

            {/* Results Grid with Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* List */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {results.map((r) => {
                  const isSelected = r.id === activePreviewId;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setActivePreviewId(r.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <img
                          src={r.compressedPreviewUrl}
                          alt="preview"
                          className="h-10 w-10 rounded object-cover border border-slate-200 shrink-0"
                        />
                        <div className="truncate text-xs">
                          <p className="font-semibold text-slate-800 truncate">{r.originalFile.name}</p>
                          <p className="text-slate-500">
                            {(r.originalSize / 1024).toFixed(0)} KB → {(r.compressedSize / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                          -{r.reductionPercentage}%
                        </span>
                        <a
                          href={r.compressedPreviewUrl}
                          download={`compressed_${r.originalFile.name}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-slate-400 hover:text-brand-600"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Before/After Viewer */}
              {activeResult && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-brand-600" />
                    <span>Side-by-Side Preview: {activeResult.originalFile.name}</span>
                  </span>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Original ({(activeResult.originalSize / 1024).toFixed(0)} KB)
                      </span>
                      <div className="h-44 w-full bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden border border-slate-300">
                        <img
                          src={activeResult.originalPreviewUrl}
                          alt="Original"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase text-emerald-600 block mb-1">
                        Compressed ({(activeResult.compressedSize / 1024).toFixed(0)} KB • -{activeResult.reductionPercentage}%)
                      </span>
                      <div className="h-44 w-full bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden border border-emerald-300">
                        <img
                          src={activeResult.compressedPreviewUrl}
                          alt="Compressed"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <a
                    href={activeResult.compressedPreviewUrl}
                    download={`compressed_${activeResult.originalFile.name}`}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download This Image</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ad Placement */}
      <AdSlot slotId="sample-ad-slot-compressor" format="horizontal" className="max-w-4xl mx-auto" />

      {/* Educational & SEO Sections */}
      <SEO />
    </main>
  );
};
