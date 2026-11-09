import React from 'react';
import { Shield, Zap, ExternalLink } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="./MicroFreeLogo.png"
                alt="MicroFree"
                className="h-9 w-auto object-contain mix-blend-multiply"
              />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fast, privacy-friendly online utility tools. All operations happen entirely inside
              your browser with zero server file uploads.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span>100% Client-Side Architecture</span>
            </div>
          </div>

          {/* PDF & Images */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              PDF & Media
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>
                <a href="https://pdftools.microfree.store/" className="text-brand-600 font-semibold hover:underline">
                  All PDF Tools Suite
                </a>
              </li>
              <li>
                <a href="https://imagetopdf.microfree.store/" className="hover:text-slate-900 transition">
                  Image to PDF
                </a>
              </li>
              <li>
                <a href="https://pdftoword.microfree.store/" className="hover:text-slate-900 transition">
                  PDF to Word
                </a>
              </li>
              <li>
                <a href="https://imagecompressor.microfree.store/" className="hover:text-slate-900 transition">
                  Image Compressor
                </a>
              </li>
              <li>
                <a href="https://imageresizer.microfree.store/" className="hover:text-slate-900 transition">
                  Image Resizer
                </a>
              </li>
              <li>
                <a href="https://imageconverter.microfree.store/" className="hover:text-slate-900 transition">
                  Image Converter
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Developer Utilities
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>
                <a href="https://jsonformatter.microfree.store/" className="hover:text-slate-900 transition">
                  JSON Formatter & Validator
                </a>
              </li>
              <li>
                <a href="https://base64tools.microfree.store/" className="hover:text-slate-900 transition">
                  Base64 Encode & Decode
                </a>
              </li>
              <li>
                <a href="https://jwtdecoder.microfree.store/" className="hover:text-slate-900 transition">
                  JWT Token Decoder
                </a>
              </li>
              <li>
                <a href="https://developertoolbox.microfree.store/" className="hover:text-slate-900 transition">
                  Developer Toolbox (15+ Tools)
                </a>
              </li>
            </ul>
          </div>

          {/* Calculators & Converters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Calculators & Units
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>
                <a href="https://percentagecalculator.microfree.store/" className="hover:text-slate-900 transition">
                  Percentage Calculator
                </a>
              </li>
              <li>
                <a href="https://agecalculator.microfree.store/" className="hover:text-slate-900 transition">
                  Age & Milestone Calculator
                </a>
              </li>
              <li>
                <a href="https://emicalculator.microfree.store/" className="hover:text-slate-900 transition">
                  Loan EMI Calculator
                </a>
              </li>
              <li>
                <a href="https://gstcalculator.microfree.store/" className="hover:text-slate-900 transition">
                  GST Tax Calculator
                </a>
              </li>
              <li>
                <a href="https://unitconverter.microfree.store/" className="hover:text-slate-900 transition">
                  Universal Unit Converter
                </a>
              </li>
              <li>
                <a href="https://currencyconverter.microfree.store/" className="hover:text-slate-900 transition">
                  Currency Converter
                </a>
              </li>
              <li>
                <a href="https://timezoneconverter.microfree.store/" className="hover:text-slate-900 transition">
                  Time Zone Converter
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Trust & Legal
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>
                <a href="https://microfree.store/about/" className="hover:text-slate-900 transition">
                  About MicroFree
                </a>
              </li>
              <li>
                <a href="https://microfree.store/privacy-policy/" className="hover:text-slate-900 transition font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://microfree.store/terms/" className="hover:text-slate-900 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="https://microfree.store/disclaimer/" className="hover:text-slate-900 transition">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="https://microfree.store/contact/" className="hover:text-slate-900 transition">
                  Contact Us
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://qrgenerator.microfree.store/"
                  className="inline-flex items-center gap-1 text-[11px] text-brand-600 hover:underline"
                >
                  <span>QR Code Generator</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://passwordgenerator.microfree.store/"
                  className="inline-flex items-center gap-1 text-[11px] text-brand-600 hover:underline"
                >
                  <span>Password Generator</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MicroFree. All rights reserved. Free online utility tools.</p>
          <div className="flex items-center gap-2">
            <span>Built with local browser technology</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> High Performance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
