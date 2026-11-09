import React from 'react';
import { Shield, Heart } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              Fast, privacy-friendly online utility tools. All file conversions happen entirely in
              your browser with zero server uploads.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span>100% Client-Side Architecture</span>
            </div>
          </div>

          {/* PDF Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              PDF Utilities
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>
                <a href="#" className="text-brand-600 font-semibold hover:underline">
                  Image to PDF Converter
                </a>
              </li>
              <li>
                <a href="https://pdftools.microfree.store/" className="hover:text-slate-900 transition">
                  PDF Tools Suite
                </a>
              </li>
              <li>
                <a href="https://pdftoword.microfree.store/" className="hover:text-slate-900 transition">
                  PDF to Word
                </a>
              </li>
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Image Utilities
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 MicroFree Tools. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for privacy & speed</span>
            <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
            <span>Zero server storage</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

