import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  Zap,
  ArrowRight,
  Download,
  Eye,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { UploadArea } from '../components/UploadArea';
import { ImageGrid } from '../components/ImageGrid';
import { PdfSettings } from '../components/PdfSettings';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { LightboxModal } from '../components/LightboxModal';
import { PdfPreviewModal } from '../components/PdfPreviewModal';
import { useImageFiles } from '../hooks/useImageFiles';
import { generatePdf } from '../services/pdfGenerator';
import {
  PdfConversionSettings,
  GeneratedPdfResult,
  ConversionProgress,
  ProcessedImageItem,
} from '../types/image';
import { formatFileSize } from '../utils/formatFileSize';
import { ADSENSE_CONFIG } from '../config/adsenseConfig';

const INITIAL_SETTINGS: PdfConversionSettings = {
  pageSize: 'a4',
  orientation: 'auto',
  fitting: 'fit',
  margin: 'small',
  backgroundColor: '#ffffff',
  quality: 'high',
  filename: 'microfree-document',
};

export const Home: React.FC = () => {
  const {
    images,
    isLoading: isUploading,
    validationErrors,
    addFiles,
    removeImage,
    clearAllImages,
    reorderImages,
    rotateImage,
    sortByName,
    clearErrors,
  } = useImageFiles();

  const [settings, setSettings] = useState<PdfConversionSettings>(INITIAL_SETTINGS);
  const [progress, setProgress] = useState<ConversionProgress>({
    isGenerating: false,
    currentStep: 0,
    totalSteps: 0,
    statusMessage: '',
    progressPercent: 0,
    error: null,
  });
  const [pdfResult, setPdfResult] = useState<GeneratedPdfResult | null>(null);

  // Modals state
  const [lightboxItem, setLightboxItem] = useState<ProcessedImageItem | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);

  const workspaceRef = useRef<HTMLDivElement | null>(null);

  // Rotate all images by 90 degrees
  const handleRotateAll = () => {
    images.forEach((img) => rotateImage(img.id, 90));
  };

  // Trigger PDF Generation
  const handleGeneratePdf = async () => {
    if (images.length === 0) return;

    // Reset previous result
    if (pdfResult) {
      URL.revokeObjectURL(pdfResult.url);
      setPdfResult(null);
    }

    try {
      const result = await generatePdf(images, settings, (p) => {
        setProgress(p);
      });

      setPdfResult(result);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {
        // gracefully ignore if canvas confetti is blocked
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred while generating PDF.';
      setProgress((prev) => ({
        ...prev,
        isGenerating: false,
        error: msg,
      }));
    }
  };

  // Download PDF
  const handleDownloadPdf = () => {
    if (!pdfResult) return;
    const link = document.createElement('a');
    link.href = pdfResult.url;
    link.download = pdfResult.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset workspace to convert another batch
  const handleReset = () => {
    if (pdfResult) {
      URL.revokeObjectURL(pdfResult.url);
      setPdfResult(null);
    }
    clearAllImages();
    setProgress({
      isGenerating: false,
      currentStep: 0,
      totalSteps: 0,
      statusMessage: '',
      progressPercent: 0,
      error: null,
    });
  };

  return (
    <main className="flex-1 w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50 border-b border-slate-200/60 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Privacy badge */}
        

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Convert Images to PDF Online{' '}
            <span className="text-brand-600">for Free</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
            Combine JPG, PNG, and WebP images into a single PDF document in seconds. No installation,
            no registration, and no file uploads required.
          </p>

          {/* Quick Feature Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-subtle border border-slate-200/80">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> Free Forever
            </span>
            <span className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-subtle border border-slate-200/80">
              <FileText className="h-3.5 w-3.5 text-brand-600" /> All Paper Sizes
            </span>
            <span className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-subtle border border-slate-200/80">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> No Watermarks
            </span>
          </div>
          
        </div>
      </section>

      {/* 2. Main Converter Workspace */}
      <section
        ref={workspaceRef}
        id="converter"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: Converter Workspace */}
          <div className={`space-y-6 ${ADSENSE_CONFIG.enabled && ADSENSE_CONFIG.slots.sidebarRight ? 'lg:col-span-8' : 'lg:col-span-12 max-w-5xl mx-auto w-full'}`}>
            {/* If no images uploaded yet: Show Upload Dropzone */}
            {images.length === 0 ? (
              <UploadArea
                onFilesSelected={addFiles}
                isLoading={isUploading}
                errors={validationErrors}
                onClearErrors={clearErrors}
              />
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Uploaded Image Grid & Management */}
                <ImageGrid
                  images={images}
                  onAddFiles={addFiles}
                  onRemove={removeImage}
                  onClearAll={clearAllImages}
                  onReorder={reorderImages}
                  onRotate={rotateImage}
                  onRotateAll={handleRotateAll}
                  onSortByName={sortByName}
                  onViewLightbox={(item) => setLightboxItem(item)}
                />

                {/* PDF Configuration Settings Panel */}
                <PdfSettings
                  settings={settings}
                  onChange={setSettings}
                  disabled={progress.isGenerating}
                />

                {/* Error Box if Generation Failed */}
                {progress.error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800">PDF Generation Failed</h4>
                      <p className="mt-0.5 text-xs text-red-700">{progress.error}</p>
                    </div>
                  </div>
                )}

                {/* Conversion Action Bar / Progress / Download Card */}
                {!pdfResult ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50/50 p-5 shadow-subtle">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Ready to convert {images.length} {images.length === 1 ? 'image' : 'images'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Estimated {images.length} {images.length === 1 ? 'page' : 'pages'} in your output document
                      </p>
                    </div>

                    {progress.isGenerating ? (
                      <div className="w-full sm:w-64 space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-brand-700">
                          <span>{progress.statusMessage}</span>
                          <span>{progress.progressPercent}%</span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-200/60">
                          <div
                            className="h-full bg-brand-600 transition-all duration-200"
                            style={{ width: `${progress.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleGeneratePdf}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-600/25 hover:bg-brand-700 active:scale-95 transition-all"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Convert to PDF</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  /* Post-generation Download Result Card */
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-card animate-in zoom-in-95 duration-300">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 text-center md:text-left">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                          <FileCheck2 className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <h3 className="text-lg font-bold text-slate-900">
                              Your PDF is Ready!
                            </h3>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                              Success
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600">
                            <strong>{pdfResult.filename}</strong> • {pdfResult.pageCount} pages • {formatFileSize(pdfResult.size)}
                          </p>
                        </div>
                      </div>

                      {/* Download & Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
                        <button
                          type="button"
                          onClick={handleDownloadPdf}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700 active:scale-95 transition"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowPdfPreview(true)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                          title="Preview the generated PDF document"
                        >
                          <Eye className="h-4 w-4 text-slate-500" />
                          <span>Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                          title="Start over with new images"
                        >
                          <RefreshCw className="h-4 w-4 text-slate-500" />
                          <span>Convert More</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Configurable Ad Slot below converter (Desktop & Mobile) */}
            <AdSlot
              slotId={ADSENSE_CONFIG.slots.belowConverter}
              label="Sponsored"
              format="horizontal"
            />
          </div>

          {/* Right Sidebar Ad Slot (Desktop only, prominent & non-intrusive) */}
          {ADSENSE_CONFIG.enabled && ADSENSE_CONFIG.slots.sidebarRight && (
            <div className="hidden lg:block lg:col-span-4 sticky top-20">
              <AdSlot
                slotId={ADSENSE_CONFIG.slots.sidebarRight}
                format="rectangle"
                label="Advertisement"
              />
            </div>
          )}
        </div>

        {/* 3. SEO Content: How it Works, Features, Guide, FAQs */}
        <div className="mt-12">
          {/* Configurable Responsive Ad Slot between content sections */}
          <AdSlot
            slotId={ADSENSE_CONFIG.slots.betweenContent}
            label="Sponsored Link"
            format="auto"
          />

          <SEO />
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onRotate={(id) => rotateImage(id, 90)}
      />

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <PdfPreviewModal
          pdfResult={pdfResult}
          onClose={() => setShowPdfPreview(false)}
          onDownload={handleDownloadPdf}
        />
      )}
    </main>
  );
};
