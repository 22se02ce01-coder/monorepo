import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Maximize2,
  Lock,
  Unlock,
  X,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  resizeImage,
  getImageDimensions,
  SOCIAL_PRESETS,
  ResizedImageResult,
  ImageDimensions,
} from '../services/imageResizerService';

type ResizeMode = 'pixels' | 'percentage' | 'presets';

export const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalDims, setOriginalDims] = useState<ImageDimensions | null>(null);

  const [mode, setMode] = useState<ResizeMode>('pixels');
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [scalePercent, setScalePercent] = useState<number>(50);
  const [selectedPreset, setSelectedPreset] = useState<string>('Instagram Square (1:1)');

  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [fitMode, setFitMode] = useState<'stretch' | 'contain' | 'crop'>('contain');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ResizedImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    try {
      const dims = await getImageDimensions(file);
      setSelectedFile(file);
      setOriginalDims(dims);
      setTargetWidth(dims.width);
      setTargetHeight(dims.height);
      setResult(null);
      setErrorMessage(null);
    } catch {
      setErrorMessage('Failed to load image.');
    }
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspect && originalDims && originalDims.width > 0) {
      const ratio = originalDims.height / originalDims.width;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspect && originalDims && originalDims.height > 0) {
      const ratio = originalDims.width / originalDims.height;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const handlePercentChange = (pct: number) => {
    setScalePercent(pct);
    if (originalDims) {
      setTargetWidth(Math.round((originalDims.width * pct) / 100));
      setTargetHeight(Math.round((originalDims.height * pct) / 100));
    }
  };

  const handleApplyPreset = (presetName: string) => {
    setSelectedPreset(presetName);
    const p = SOCIAL_PRESETS.find((pr) => pr.name === presetName);
    if (p) {
      setTargetWidth(p.width);
      setTargetHeight(p.height);
    }
  };

  const handleResize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      let finalW = targetWidth;
      let finalH = targetHeight;

      if (mode === 'percentage' && originalDims) {
        finalW = Math.round((originalDims.width * scalePercent) / 100);
        finalH = Math.round((originalDims.height * scalePercent) / 100);
      }

      const res = await resizeImage(
        selectedFile,
        finalW,
        finalH,
        exportFormat,
        quality / 100,
        fitMode
      );

      setResult(res);

      try {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error during resize.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalDims(null);
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Online <span className="text-brand-600">Image Resizer</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Resize JPG, PNG, and WebP pictures by pixels, percentage, or social media templates. 100% private, client-side photo scaling.
        </p>
      </div>

      {/* Main Workspace Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {!selectedFile ? (
          /* Dropzone */
          <div className="relative">
            <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange({ target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 transition">
              <UploadCloud className="h-12 w-12 text-brand-600 mb-3" />
              <span className="text-base font-semibold text-slate-800">
                Click or Drop Image File Here (JPG, PNG, WebP)
              </span>
              <span className="mt-1 text-xs text-slate-500">
                100% Client-Side • Your photo never leaves your device
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>
        ) : (
          /* File Selected Workspace */
          <div className="space-y-6">
            {/* Selected File Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-brand-100 p-2 text-brand-600 shrink-0">
                  <Maximize2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedFile.name}</h4>
                  <p className="text-xs text-slate-500">
                    Original: {originalDims?.width} × {originalDims?.height} px • {(selectedFile.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="self-end sm:self-auto inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                <span>Change Image</span>
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50 rounded-xl p-1 gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('pixels')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'pixels'
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                By Pixels (Custom Width / Height)
              </button>
              <button
                type="button"
                onClick={() => setMode('percentage')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'percentage'
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                By Percentage (%)
              </button>
              <button
                type="button"
                onClick={() => setMode('presets')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'presets'
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Social Media Presets
              </button>
            </div>

            {/* Configuration Controls based on Mode */}
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200 space-y-4">
              {mode === 'pixels' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Width (pixels):
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={targetWidth}
                        onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 1)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Height (pixels):
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={targetHeight}
                        onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 1)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setLockAspect(!lockAspect)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                          lockAspect
                            ? 'bg-brand-50 border-brand-300 text-brand-700'
                            : 'bg-white border-slate-300 text-slate-600'
                        }`}
                      >
                        {lockAspect ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                        <span>{lockAspect ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'percentage' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Scale Percentage: {scalePercent}%</span>
                    <span className="text-slate-500">
                      Result: {originalDims ? Math.round((originalDims.width * scalePercent) / 100) : 0} × {originalDims ? Math.round((originalDims.height * scalePercent) / 100) : 0} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={scalePercent}
                    onChange={(e) => handlePercentChange(parseInt(e.target.value, 10))}
                    className="w-full accent-brand-600"
                  />
                  <div className="flex gap-2 pt-1">
                    {[25, 50, 75, 100, 150, 200].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => handlePercentChange(pct)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${
                          scalePercent === pct
                            ? 'bg-brand-600 text-white border-brand-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'presets' && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Select Social Media or Web Template:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {SOCIAL_PRESETS.map((preset) => {
                      const isSelected = selectedPreset === preset.name;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => handleApplyPreset(preset.name)}
                          className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition ${
                            isSelected
                              ? 'bg-brand-50/80 border-brand-500 text-brand-900 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-xs font-bold">{preset.name}</span>
                          <span className="text-[10px] text-slate-500">
                            {preset.width} × {preset.height} px • {preset.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-slate-700">Fit Mode:</span>
                    <div className="flex gap-2 text-xs">
                      {(['contain', 'crop', 'stretch'] as const).map((fm) => (
                        <button
                          key={fm}
                          type="button"
                          onClick={() => setFitMode(fm)}
                          className={`rounded px-2.5 py-1 capitalize font-medium border ${
                            fitMode === fm
                              ? 'bg-brand-600 text-white border-brand-600'
                              : 'bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          {fm}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Export Format & Quality */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Output Image Format:
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                  >
                    <option value="image/jpeg">JPG / JPEG (Best for Photos)</option>
                    <option value="image/png">PNG (Preserves Transparency)</option>
                    <option value="image/webp">WebP (Modern High Efficiency)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quality ({quality}%):
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
              </div>
            </div>

            {/* Resize Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleResize}
                disabled={isProcessing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Resizing Image...</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Resize to {targetWidth} × {targetHeight} px</span>
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

            {/* Result Preview & Download */}
            {result && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 animate-in fade-in space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Resizing Complete!</h4>
                      <p className="text-xs text-emerald-800">
                        {result.newWidth} × {result.newHeight} px • {(result.newSize / 1024).toFixed(0)} KB ({result.format})
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.previewUrl}
                    download={`resized_${result.newWidth}x${result.newHeight}_${selectedFile.name.replace(/\.[^/.]+$/, '')}.${result.format.toLowerCase()}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Resized Image</span>
                  </a>
                </div>

                <div className="flex justify-center bg-white p-3 rounded-xl border border-emerald-200 max-h-72 overflow-hidden">
                  <img
                    src={result.previewUrl}
                    alt="Resized Result"
                    className="max-h-64 max-w-full object-contain rounded"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ad Placement */}
      <AdSlot slotId="sample-ad-slot-resizer" format="horizontal" className="max-w-4xl mx-auto" />

      {/* Educational & SEO Sections */}
      <SEO />
    </main>
  );
};
