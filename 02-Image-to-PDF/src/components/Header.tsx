import React, { useState } from 'react';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout, onOpenPrivacy }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pdfDropdownOpen, setPdfDropdownOpen] = useState(false);
  const [imageDropdownOpen, setImageDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <a href="https://microfree.store/" className="flex items-center gap-2 group" aria-label="MicroFree Home">
          <img
            src="./MicroFreeLogo.png"
            alt="MicroFree"
            className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-slate-900 hover:text-brand-600 hover:bg-slate-50 transition"
          >
            Home
          </a>

          {/* PDF Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setPdfDropdownOpen(!pdfDropdownOpen);
                setImageDropdownOpen(false);
              }}
              onBlur={() => setTimeout(() => setPdfDropdownOpen(false), 200)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-brand-600 font-semibold bg-brand-50/60 hover:bg-brand-50 transition"
            >
              <span>PDF Tools</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {pdfDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-50">
                <a
                  href="#"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 bg-brand-50/50"
                >
                  <span>Image to PDF</span>
                  <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">Current</span>
                </a>
                <a
                  href="https://pdftools.microfree.store/"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  All PDF Tools
                </a>
                <a
                  href="https://pdftoword.microfree.store/"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  PDF to Word
                </a>
              </div>
            )}
          </div>

          {/* Image Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setImageDropdownOpen(!imageDropdownOpen);
                setPdfDropdownOpen(false);
              }}
              onBlur={() => setTimeout(() => setImageDropdownOpen(false), 200)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 hover:text-brand-600 hover:bg-slate-50 transition"
            >
              <span>Image Tools</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {imageDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-50">
                <a
                  href="https://imagecompressor.microfree.store/"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  Image Compressor
                </a>
                <a
                  href="https://imageresizer.microfree.store/"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  Image Resizer
                </a>
                <a
                  href="https://imageconverter.microfree.store/"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  Image Converter
                </a>
              </div>
            )}
          </div>

          <a
            href="https://developertoolbox.microfree.store/"
            className="rounded-lg px-3 py-2 hover:text-brand-600 hover:bg-slate-50 transition"
          >
            Other Tools
          </a>

          <button
            onClick={onOpenAbout}
            className="rounded-lg px-3 py-2 hover:text-brand-600 hover:bg-slate-50 transition"
          >
            About
          </button>
        </nav>

        {/* Right Action / Privacy Badge */}
        <div className="hidden lg:flex items-center gap-3">

        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 p-2.5 text-xs font-medium text-emerald-800 border border-emerald-200">
            <Shield className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Files are processed locally on your phone or computer. Zero data leaves your device.</span>
          </div>

          <div className="pt-2 space-y-1 text-base font-medium">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-brand-600 font-semibold bg-brand-50"
            >
              Image to PDF Converter (Current)
            </a>
            <a
              href="https://pdftools.microfree.store/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              PDF Tools
            </a>
            <a
              href="https://imagecompressor.microfree.store/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              Image Tools
            </a>
            <a
              href="https://developertoolbox.microfree.store/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              Other Tools
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAbout) onOpenAbout();
              }}
              className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              About MicroFree
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPrivacy) onOpenPrivacy();
              }}
              className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
