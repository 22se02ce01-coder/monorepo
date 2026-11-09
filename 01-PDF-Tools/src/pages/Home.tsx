import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Layers,
  Scissors,
  Sliders,
  RotateCw,
  Trash2,
  Copy,
  Hash,
  Stamp,
  FileSearch,
  UploadCloud,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  FileText,
  X,
  ArrowRight,
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import {
  mergePdfs,
  splitPdf,
  rotatePdf,
  deletePdfPages,
  extractPdfPages,
  reorderPdfPages,
  addPageNumbers,
  addWatermark,
  compressPdf,
  readPdfMetadata,
  updatePdfMetadata,
  expandPageList,
  createZip,
  PdfMetadata,
} from '../services/pdfToolsService';

type ToolType =
  | 'merge'
  | 'split'
  | 'compress'
  | 'rotate'
  | 'delete'
  | 'extract'
  | 'reorder'
  | 'number'
  | 'watermark'
  | 'metadata';

const createPdfBlob = (bytes: Uint8Array): Blob => {
  return new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
};

export const Home: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    url: string;
    filename: string;
    info?: string;
  } | null>(null);

  // Tool Specific Options
  const [splitRanges, setSplitRanges] = useState('1-2, 3');
  const [rotationAngle, setRotationAngle] = useState(90);
  const [pagesToDelete, setPagesToDelete] = useState('1');
  const [pagesToExtract, setPagesToExtract] = useState('1');
  const [reorderInput, setReorderInput] = useState('');
  const [numberPosition, setNumberPosition] = useState<
    'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-center'
  >('bottom-center');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [metadata, setMetadata] = useState<PdfMetadata | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  const toolTabs = [
    { id: 'merge', label: 'Merge PDF', icon: Layers, multi: true },
    { id: 'split', label: 'Split PDF', icon: Scissors, multi: false },
    { id: 'compress', label: 'Compress PDF', icon: Sliders, multi: false },
    { id: 'rotate', label: 'Rotate PDF', icon: RotateCw, multi: false },
    { id: 'delete', label: 'Delete Pages', icon: Trash2, multi: false },
    { id: 'extract', label: 'Extract Pages', icon: Copy, multi: false },
    { id: 'reorder', label: 'Reorder Pages', icon: ArrowRight, multi: false },
    { id: 'number', label: 'Add Page Numbers', icon: Hash, multi: false },
    { id: 'watermark', label: 'Watermark', icon: Stamp, multi: false },
    { id: 'metadata', label: 'Metadata Viewer', icon: FileSearch, multi: false },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    if (selected.length === 0) {
      setErrorMessage('Please select valid PDF documents.');
      return;
    }

    setErrorMessage(null);
    setSuccessResult(null);

    const isMulti = toolTabs.find((t) => t.id === activeTool)?.multi;
    if (isMulti) {
      setFiles((prev) => [...prev, ...selected]);
    } else {
      setFiles([selected[0]]);
      if (activeTool === 'metadata') {
        try {
          const meta = await readPdfMetadata(selected[0]);
          setMetadata(meta);
          setEditTitle(meta.title);
          setEditAuthor(meta.author);
        } catch {
          // ignore error
        }
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (files.length <= 1) {
      setMetadata(null);
      setSuccessResult(null);
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleExecute = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select at least one PDF file.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      if (activeTool === 'merge') {
        if (files.length < 2) {
          throw new Error('Please select at least 2 PDF files to merge.');
        }
        const bytes = await mergePdfs(files);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: 'merged_document.pdf',
          info: `Successfully merged ${files.length} PDF files into a single document.`,
        });
        triggerCelebration();
      } else if (activeTool === 'split') {
        const results = await splitPdf(files[0], splitRanges);
        if (results.length === 0) throw new Error('No pages were split.');
        if (results.length === 1) {
          const url = URL.createObjectURL(createPdfBlob(results[0].data));
          setSuccessResult({ url, filename: results[0].filename, info: 'Split generated successfully (1 file).' });
        } else {
          // Several parts: bundle them into one ZIP so every part can be downloaded at once.
          const zip = createZip(results.map((r) => ({ name: r.filename, data: r.data })));
          const url = URL.createObjectURL(new Blob([zip as unknown as BlobPart], { type: 'application/zip' }));
          setSuccessResult({
            url,
            filename: `${files[0].name.replace(/\.[^/.]+$/, '')}_split.zip`,
            info: `Split into ${results.length} PDF files, bundled in one ZIP archive.`,
          });
        }
        triggerCelebration();
      } else if (activeTool === 'compress') {
        const result = await compressPdf(files[0]);
        const blob = createPdfBlob(result.data);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `optimized_${files[0].name}`,
          info: `Reduced from ${(result.originalSize / 1024).toFixed(1)} KB to ${(result.newSize / 1024).toFixed(1)} KB (${result.reductionPercentage}% reduction).`,
        });
        triggerCelebration();
      } else if (activeTool === 'rotate') {
        const bytes = await rotatePdf(files[0], rotationAngle);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `rotated_${files[0].name}`,
          info: `Pages rotated by ${rotationAngle}° successfully.`,
        });
        triggerCelebration();
      } else if (activeTool === 'delete') {
        const pageNums = expandPageList(pagesToDelete);
        if (pageNums.length === 0) throw new Error('Please enter the pages to delete (e.g. 2, 5-7).');
        const bytes = await deletePdfPages(files[0], pageNums);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `edited_${files[0].name}`,
          info: `Pages ${pagesToDelete} deleted successfully.`,
        });
        triggerCelebration();
      } else if (activeTool === 'extract') {
        const pageNums = expandPageList(pagesToExtract);
        if (pageNums.length === 0) throw new Error('Please enter the pages to extract (e.g. 1-3, 8).');
        const bytes = await extractPdfPages(files[0], pageNums);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `extracted_${files[0].name}`,
          info: `Extracted pages ${pagesToExtract} into new PDF document.`,
        });
        triggerCelebration();
      } else if (activeTool === 'reorder') {
        const order = expandPageList(reorderInput);
        if (order.length === 0) throw new Error('Please specify the new page order (e.g. 3, 1, 2).');
        const bytes = await reorderPdfPages(files[0], order);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `reordered_${files[0].name}`,
          info: `Pages reordered into sequence: ${reorderInput}.`,
        });
        triggerCelebration();
      } else if (activeTool === 'number') {
        const bytes = await addPageNumbers(files[0], numberPosition);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `numbered_${files[0].name}`,
          info: 'Page numbers inserted successfully.',
        });
        triggerCelebration();
      } else if (activeTool === 'watermark') {
        const bytes = await addWatermark(files[0], watermarkText, watermarkOpacity);
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `watermarked_${files[0].name}`,
          info: `Watermark "${watermarkText}" stamped across all pages.`,
        });
        triggerCelebration();
      } else if (activeTool === 'metadata') {
        const bytes = await updatePdfMetadata(files[0], {
          title: editTitle,
          author: editAuthor,
        });
        const blob = createPdfBlob(bytes);
        const url = URL.createObjectURL(blob);
        setSuccessResult({
          url,
          filename: `metadata_updated_${files[0].name}`,
          info: 'PDF document properties updated successfully.',
        });
        triggerCelebration();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while processing PDF.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Title & Intro */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          All-in-One <span className="text-brand-600">PDF Tools</span> Suite
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Merge, split, rotate, compress, watermark, and organize PDF documents in seconds. 100% private, free, and processed entirely inside your browser.
        </p>
      </div>

      {/* Tool Category Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {toolTabs.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id as ToolType);
                setSuccessResult(null);
                setErrorMessage(null);
                if (!tool.multi && files.length > 1) {
                  setFiles([files[0]]);
                }
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
        {/* Upload Dropzone */}
        <div className="relative mb-6">
          <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 transition">
            <UploadCloud className="h-10 w-10 text-brand-600 mb-3" />
            <span className="text-sm font-semibold text-slate-800">
              {activeTool === 'merge' ? 'Select or Drop Multiple PDF Files' : 'Select or Drop PDF File'}
            </span>
            <span className="mt-1 text-xs text-slate-500">
              100% Client-Side. Your documents are never sent over the network.
            </span>
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple={activeTool === 'merge'}
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Selected Files ({files.length})</span>
              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  setMetadata(null);
                  setSuccessResult(null);
                }}
                className="text-coral-500 hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-brand-600 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{file.name}</span>
                    <span className="text-slate-400 shrink-0">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="p-1 text-slate-400 hover:text-coral-500"
                    aria-label="Remove file"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool-Specific Options Form */}
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 mb-6 space-y-4">
          {activeTool === 'merge' && (
            <p className="text-xs text-slate-600">
              Upload 2 or more PDF documents. They will be seamlessly joined into a single PDF preserving all pages and vector content.
            </p>
          )}

          {activeTool === 'split' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Page Ranges to Split (e.g. &quot;1-2, 3&quot; or leave blank to split every page)
              </label>
              <input
                type="text"
                value={splitRanges}
                onChange={(e) => setSplitRanges(e.target.value)}
                placeholder="1-2, 3"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          )}

          {activeTool === 'compress' && (
            <div className="text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800">Browser-side PDF Stream Optimization:</span>
              <p>
                Recompresses document streams with Flate compression, eliminates dangling object references, and cleans xref tables locally without uploading files.
              </p>
            </div>
          )}

          {activeTool === 'rotate' && (
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-slate-700">Rotation Angle:</label>
              <div className="flex gap-2">
                {[90, 180, 270].map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setRotationAngle(angle)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                      rotationAngle === angle
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {angle}° Clockwise
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTool === 'delete' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pages to Delete (comma separated, e.g. 1, 3, 5):
              </label>
              <input
                type="text"
                value={pagesToDelete}
                onChange={(e) => setPagesToDelete(e.target.value)}
                placeholder="1, 4"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          )}

          {activeTool === 'extract' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pages to Extract (comma separated, e.g. 1, 2, 4):
              </label>
              <input
                type="text"
                value={pagesToExtract}
                onChange={(e) => setPagesToExtract(e.target.value)}
                placeholder="1, 2"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          )}

          {activeTool === 'reorder' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Page Order Sequence (e.g. 3, 1, 2):
              </label>
              <input
                type="text"
                value={reorderInput}
                onChange={(e) => setReorderInput(e.target.value)}
                placeholder="3, 1, 2"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          )}

          {activeTool === 'number' && (
            <div className="flex flex-wrap items-center gap-4">
              <label className="text-xs font-semibold text-slate-700">Number Position:</label>
              <select
                value={numberPosition}
                onChange={(e) => setNumberPosition(e.target.value as any)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>
          )}

          {activeTool === 'watermark' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Watermark Text:
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="CONFIDENTIAL"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Opacity ({Math.round(watermarkOpacity * 100)}%):
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}


          {activeTool === 'metadata' && metadata && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Pages</span>
                  <span className="font-bold text-slate-800">{metadata.pageCount}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">File Size</span>
                  <span className="font-bold text-slate-800">
                    {(metadata.fileSizeBytes / 1024).toFixed(1)} KB
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Created</span>
                  <span className="font-medium text-slate-800 truncate block">
                    {metadata.creationDate}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Producer</span>
                  <span className="font-medium text-slate-800 truncate block">
                    {metadata.producer}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Title:</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Author:</label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleExecute}
            disabled={files.length === 0 || isProcessing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Processing PDF...</span>
              </>
            ) : (
              <>
                <span>Run {toolTabs.find((t) => t.id === activeTool)?.label}</span>
                <ArrowRight className="h-4 w-4" />
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

        {/* Success Card with Download */}
        {successResult && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Operation Successful!</h4>
                  {successResult.info && (
                    <p className="text-xs text-emerald-800">{successResult.info}</p>
                  )}
                </div>
              </div>
              <a
                href={successResult.url}
                download={successResult.filename}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Result</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Ad Placement: Compliant & Cleanly Collapsible */}
      <AdSlot slotId="sample-ad-slot-pdf" format="horizontal" className="max-w-4xl mx-auto" />

      {/* SEO & Informational Section */}
      <SEO />
    </main>
  );
};
