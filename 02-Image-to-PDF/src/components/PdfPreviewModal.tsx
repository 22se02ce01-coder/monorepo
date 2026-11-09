import React from 'react';
import { X, Download, FileCheck, ExternalLink } from 'lucide-react';
import { GeneratedPdfResult } from '../types/image';
import { formatFileSize } from '../utils/formatFileSize';

interface PdfPreviewModalProps {
  pdfResult: GeneratedPdfResult | null;
  onClose: () => void;
  onDownload: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  pdfResult,
  onClose,
  onDownload,
}) => {
  if (!pdfResult) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative flex h-[92vh] max-w-5xl w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 bg-slate-50">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <FileCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="truncate text-sm font-bold text-slate-800" title={pdfResult.filename}>
                {pdfResult.filename}
              </h3>
              <p className="text-[11px] text-slate-500">
                {pdfResult.pageCount} {pdfResult.pageCount === 1 ? 'Page' : 'Pages'} • {formatFileSize(pdfResult.size)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-brand-700 active:scale-95 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>

            <a
              href={pdfResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
              title="Open in new browser tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open in Tab</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              aria-label="Close PDF preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full bg-slate-800 relative">
          <iframe
            src={`${pdfResult.url}#toolbar=1`}
            title="Generated PDF Preview"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};

