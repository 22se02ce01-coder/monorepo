import React, { useState } from 'react';
import { X, Shield, FileText, Info, AlertTriangle } from 'lucide-react';

export type LegalTab = 'about' | 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[90vh] max-w-3xl w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <img
              src="./MicroFreeLogo.png"
              alt="MicroFree"
              className="h-7 w-auto object-contain mix-blend-multiply"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Documentation
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 transition ${
              activeTab === 'about'
                ? 'border-brand-600 text-brand-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="h-4 w-4" />
            <span>About MicroFree</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 transition ${
              activeTab === 'privacy'
                ? 'border-brand-600 text-brand-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 transition ${
              activeTab === 'terms'
                ? 'border-brand-600 text-brand-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 transition ${
              activeTab === 'disclaimer'
                ? 'border-brand-600 text-brand-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Disclaimer</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-600 leading-relaxed space-y-4">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">About MicroFree</h2>
              <p>
                <strong>MicroFree</strong> is an independent initiative delivering fast,
                privacy-respecting, zero-installation browser utility tools. Our philosophy is
                simple: everyday digital tasks like combining images into PDFs, compressing
                photos, formatting code, and calculating units should be free, lightning fast, and
                completely private.
              </p>
              <h3 className="text-base font-semibold text-slate-800">Why Browser-Only Processing?</h3>
              <p>
                Traditional online converters require you to upload your personal photos, receipts,
                scanned IDs, or sensitive documents to third-party cloud servers. This exposes your
                confidential files to potential data breaches, unauthorized retention, and cloud
                bandwidth delays.
              </p>
              <p>
                MicroFree utilizes cutting-edge WebAssembly, HTML5 Canvas, and modern Web APIs to
                execute 100% of the image manipulation and PDF compilation right in your browser
                memory. No file ever travels over the internet to our servers.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Privacy Policy</h2>
              <p className="text-xs text-slate-500">Last updated: November 2026</p>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900">
                <strong>Zero File Upload Guarantee:</strong> When you select or drag images into
                MicroFree Image to PDF Converter, the files are read directly by your local browser
                engine using standard JavaScript FileReader and Canvas APIs. No file is ever
                transmitted, uploaded, stored, or processed on any remote server.
              </div>
              <h3 className="text-base font-semibold text-slate-800">1. Data We Do NOT Collect</h3>
              <p>
                We do not collect, view, or retain your images, generated PDF documents, metadata,
                or personal identities. Everything happens locally within your browser tab.
              </p>
              <h3 className="text-base font-semibold text-slate-800">2. Temporary Memory Management</h3>
              <p>
                Image thumbnails and PDF downloads are stored in temporary browser memory (Object
                URLs). When you close or refresh the page, or click &ldquo;Clear All&rdquo;, this
                temporary memory is immediately released.
              </p>
              <h3 className="text-base font-semibold text-slate-800">3. Third-Party Advertisements (Google AdSense)</h3>
              <p>
                To support free operation of MicroFree tools, we may display non-intrusive
                advertisements powered by Google AdSense. Google and its advertising partners may
                use cookies to serve ads based on your prior visits to our website or other sites.
                You can manage personalized advertising preferences at{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 underline"
                >
                  Google Ads Settings
                </a>
                .
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Terms of Service</h2>
              <p>
                By using MicroFree Image to PDF Converter (&ldquo;Service&rdquo;), you agree to
                comply with these terms.
              </p>
              <h3 className="text-base font-semibold text-slate-800">1. License & Usage</h3>
              <p>
                MicroFree grants you a free, non-exclusive license to use the converter for
                personal, educational, or commercial purposes. You retain full ownership and
                copyright of all images and generated documents.
              </p>
              <h3 className="text-base font-semibold text-slate-800">2. Prohibited Conduct</h3>
              <p>
                You may not attempt to reverse engineer, disrupt, overload, or deploy automated
                scraping bots against MicroFree services.
              </p>
              <h3 className="text-base font-semibold text-slate-800">3. Limitation of Liability</h3>
              <p>
                The service is provided &ldquo;AS IS&rdquo; without warranties of any kind.
                MicroFree is not liable for data corruption, browser crashes, or unintended results
                arising from local image conversions. Always keep backups of your original images.
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Disclaimer</h2>
              <p>
                MicroFree is an independent web utility and is not affiliated with, endorsed by, or
                connected to Adobe Inc., PDF association, or any other commercial document
                management software vendor.
              </p>
              <p>
                PDF is an open standard (ISO 32000-1). All PDFs created by MicroFree comply with
                standard specification standards readable by Adobe Acrobat Reader, Google Chrome,
                Apple Preview, Edge, and standard mobile document viewers.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

