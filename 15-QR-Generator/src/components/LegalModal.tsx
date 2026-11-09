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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
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

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 text-sm leading-relaxed text-slate-600 space-y-4 max-h-[60vh]">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">About MicroFree</h3>
              <p>
                MicroFree is an independent suite of privacy-first, client-side digital utility tools designed to make everyday document, image, development, and calculation workflows fast, free, and secure.
              </p>
              <p>
                Unlike traditional online utility websites that upload your personal documents and images to remote cloud servers for processing, MicroFree tools execute entirely in your web browser. Your data never leaves your computer, laptop, or smartphone.
              </p>
              <div className="rounded-xl bg-brand-50 p-4 border border-brand-100">
                <h4 className="font-semibold text-brand-900 mb-1">Our Core Commitments:</h4>
                <ul className="list-disc list-inside space-y-1 text-brand-800 text-xs">
                  <li>Zero server uploads — 100% client-side privacy architecture.</li>
                  <li>No mandatory account registration or personal information collection.</li>
                  <li>Free unlimited access with non-intrusive, compliant advertisements.</li>
                  <li>Lightweight, accessible, and responsive user experiences.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Privacy Policy</h3>
              <p className="text-xs text-slate-500">Last updated: November 2026</p>
              <p>
                MicroFree is built on the fundamental principle of data minimization and client-side processing:
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">1. Local Processing Guarantee</h4>
                <p>
                  All document manipulation, image compression, formatting, calculations, and conversions are executed directly inside your web browser using HTML5 Canvas, Web Crypto, and JavaScript. Your files are not transmitted to our servers or any third-party processing backend.
                </p>
                <h4 className="font-semibold text-slate-800">2. Cookies and Advertisements</h4>
                <p>
                  MicroFree may display advertisements served by Google AdSense. Google AdSense uses cookies to serve ads based on prior visits. Users may opt out of personalized advertising by visiting Google Ads Settings.
                </p>
                <h4 className="font-semibold text-slate-800">3. Analytics and Telemetry</h4>
                <p>
                  We do not collect file contents, personal names, phone numbers, or passwords. Standard anonymous aggregated server traffic logs may record general visitor statistics.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Terms of Service</h3>
              <p className="text-xs text-slate-500">Last updated: November 2026</p>
              <p>
                By accessing and using MicroFree utilities, you agree to these Terms of Service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs">
                <li>MicroFree tools are provided for lawful, non-commercial and commercial personal productivity use.</li>
                <li>You must not use the services to process illegal, copyrighted, or malicious material without authorization.</li>
                <li>The services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranty of any kind.</li>
                <li>We reserve the right to update or modify tool capabilities to maintain browser compatibility and security standards.</li>
              </ul>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Legal Disclaimer</h3>
              <p>
                The utilities and calculators on MicroFree are created for general informational and productivity purposes. While calculations (e.g. loan EMIs, GST tax, financial formulas) are calibrated against standard mathematical conventions, actual commercial, tax, or legal determinations may vary according to jurisdiction, applicable tax codes, or financial institution terms. Always consult qualified tax or financial professionals for formal compliance.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
