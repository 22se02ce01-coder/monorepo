import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  FileCheck2,
  Eye,
  X,
  FileQuestion,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { extractPdfDocumentText } from '../services/pdfTextExtractor';
import { buildDocxDocument, PageContent } from '../services/docxBuilder';

export const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [extractedPages, setExtractedPages] = useState<PageContent[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [hasTextLayer, setHasTextLayer] = useState<boolean>(true);
  const [docxDownloadUrl, setDocxDownloadUrl] = useState<string | null>(null);
  const [docxFilename, setDocxFilename] = useState<string>('');
  const [activePreviewPage, setActivePreviewPage] = useState<number>(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setErrorMessage('Please select a valid PDF file.');
      return;
    }

    setSelectedFile(file);
    setErrorMessage(null);
    setExtractedPages([]);
    setWordCount(0);
    setDocxDownloadUrl(null);
  };

  const handleStartConversion = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setErrorMessage(null);
    setProgressStatus('Reading PDF streams and parsing text...');

    try {
      const result = await extractPdfDocumentText(selectedFile, (curr, total) => {
        setProgressStatus(`Analyzing page ${curr} of ${total}...`);
      });

      setExtractedPages(result.pages);
      setWordCount(result.totalWordCount);
      setHasTextLayer(result.hasText);

      setProgressStatus('Compiling Microsoft Word (.docx) document...');

      // Generate DOCX
      const docxBytes = buildDocxDocument(result.pages, selectedFile.name);
      const blob = new Blob([docxBytes as unknown as BlobPart], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const url = URL.createObjectURL(blob);
      const name = selectedFile.name.replace(/\.[^/.]+$/, '') + '.docx';

      setDocxDownloadUrl(url);
      setDocxFilename(name);
      setActivePreviewPage(1);

      try {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during conversion.';
      setErrorMessage(msg);
    } finally {
      setIsConverting(false);
      setProgressStatus('');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setExtractedPages([]);
    setDocxDownloadUrl(null);
    setErrorMessage(null);
    setWordCount(0);
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Title & Tagline */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          PDF to <span className="text-brand-600">Word Converter</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Convert PDF documents into editable Microsoft Word (.docx) documents. Extracts text streams, organizes paragraphs, and preserves reading flow — 100% private in your browser.
        </p>
      </div>

      {/* Main Workspace Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {!selectedFile ? (
          /* Dropzone */
          <div className="relative">
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 transition">
              <UploadCloud className="h-12 w-12 text-brand-600 mb-3" />
              <span className="text-base font-semibold text-slate-800">
                Click or Drag & Drop PDF File Here
              </span>
              <span className="mt-1 text-xs text-slate-500">
                100% Client-Side. No files uploaded to remote servers.
              </span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>
        ) : (
          /* File Selected Card */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-brand-100 p-2 text-brand-600 shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedFile.name}</h4>
                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for conversion
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="self-end sm:self-auto inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                <span>Change File</span>
              </button>
            </div>

            {/* Action Bar */}
            {!docxDownloadUrl && (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleStartConversion}
                  disabled={isConverting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>{progressStatus || 'Converting...'}</span>
                    </>
                  ) : (
                    <>
                      <FileCheck2 className="h-4 w-4" />
                      <span>Convert to Word (.docx)</span>
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
            )}

            {/* Success Download Banner */}
            {docxDownloadUrl && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 animate-in fade-in space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Conversion Complete!
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Extracted {extractedPages.length} page(s) and ~{wordCount} words into editable Microsoft Word (.docx).
                      </p>
                    </div>
                  </div>
                  <a
                    href={docxDownloadUrl}
                    download={docxFilename}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Word (.docx)</span>
                  </a>
                </div>

                {!hasTextLayer && (
                  <div className="flex items-center gap-2 rounded-lg bg-amber-100 p-2.5 text-xs text-amber-900 border border-amber-200">
                    <FileQuestion className="h-4 w-4 shrink-0 text-amber-700" />
                    <span>
                      Notice: Limited or no digital text was detected. This PDF may contain scanned images. If the exported file has empty text, an OCR scanner is required.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Document Content Preview */}
            {extractedPages.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Eye className="h-4 w-4 text-brand-600" />
                    <span>Extracted Text Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Page:</span>
                    <select
                      value={activePreviewPage}
                      onChange={(e) => setActivePreviewPage(parseInt(e.target.value, 10))}
                      className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800"
                    >
                      {extractedPages.map((p) => (
                        <option key={p.pageNumber} value={p.pageNumber}>
                          Page {p.pageNumber} of {extractedPages.length}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 max-h-72 overflow-y-auto space-y-2 bg-white text-xs leading-relaxed text-slate-700 font-mono">
                  {extractedPages
                    .find((p) => p.pageNumber === activePreviewPage)
                    ?.paragraphs.map((para, idx) => (
                      <p key={idx} className="bg-slate-50 p-2 rounded border border-slate-100">
                        {para}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ad Placement */}
      <AdSlot slotId="sample-ad-slot-pdf2word" format="horizontal" className="max-w-4xl mx-auto" />

      {/* Educational & SEO Sections */}
      <SEO />
    </main>
  );
};
