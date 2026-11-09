import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, ShieldCheck, AlertCircle, FileCheck2 } from 'lucide-react';

interface UploadAreaProps {
  onFilesSelected: (files: FileList | File[]) => void;
  isLoading?: boolean;
  errors?: string[];
  onClearErrors?: () => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onFilesSelected,
  isLoading = false,
  errors = [],
  onClearErrors,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      // Reset input so same files can be re-selected if removed
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
        id="image-file-input"
        aria-label="Upload image files"
      />

      {/* Validation Error Banner */}
      {errors.length > 0 && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Unsupported File or Read Error</h4>
                <ul className="mt-1 list-disc list-inside space-y-0.5 text-xs text-red-700">
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
            {onClearErrors && (
              <button
                onClick={onClearErrors}
                className="text-xs font-semibold text-red-600 hover:text-red-800 underline underline-offset-2"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      )}

      {/* Interactive Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerFileInput();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Upload images by dropping them here or clicking to select"
        className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 ${
          isDragging
            ? 'border-brand-500 bg-brand-50/60 scale-[1.01] shadow-lg shadow-brand-500/10'
            : 'border-slate-300 hover:border-brand-400 bg-white hover:bg-slate-50/70 shadow-sm'
        }`}
      >
        {/* Floating icon */}
        <div
          className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl transition-all duration-300 ${
            isDragging
              ? 'bg-brand-600 text-white scale-110 shadow-lg shadow-brand-600/30'
              : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100 group-hover:scale-105'
          }`}
        >
          {isDragging ? (
            <FileCheck2 className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce" />
          ) : (
            <UploadCloud className="h-8 w-8 sm:h-10 sm:w-10" />
          )}
        </div>

        {/* Action text */}
        <div className="mt-4 sm:mt-5 max-w-md">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-brand-600 transition">
            {isDragging ? 'Drop images right here' : 'Drop your images here, or browse files'}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Combine multiple pictures into one clean PDF document. Select as many photos as you want.
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-6">
          <button
            type="button"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/20 hover:bg-brand-700 active:scale-95 transition-all"
          >
            <ImageIcon className="h-4 w-4" />
            <span>{isLoading ? 'Processing Files...' : 'Select Images'}</span>
          </button>
        </div>

        {/* Supported Formats Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">JPG</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">JPEG</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">PNG</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">WebP</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">High Quality & Lossless Support</span>
        </div>

        {/* Privacy Note */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Your images stay on your device. 100% client-side privacy.</span>
        </div>
      </div>
    </div>
  );
};

