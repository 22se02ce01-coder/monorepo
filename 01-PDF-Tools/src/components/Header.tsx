import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTool?: string;
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTool = '01-PDF-Tools', onOpenAbout, onOpenPrivacy }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navCategories = [
    {
      name: 'PDF Tools',
      items: [
        { name: 'All PDF Tools', path: 'https://pdftools.microfree.store/', id: '01-PDF-Tools' },
        { name: 'Image to PDF', path: 'https://imagetopdf.microfree.store/', id: '02-Image-to-PDF' },
        { name: 'PDF to Word', path: 'https://pdftoword.microfree.store/', id: '03-PDF-to-Word' },
      ],
    },
    {
      name: 'Image Tools',
      items: [
        { name: 'Image Compressor', path: 'https://imagecompressor.microfree.store/', id: '04-Image-Compressor' },
        { name: 'Image Resizer', path: 'https://imageresizer.microfree.store/', id: '05-Image-Resizer' },
        { name: 'Image Converter', path: 'https://imageconverter.microfree.store/', id: '06-Image-Converter' },
      ],
    },
    {
      name: 'Developer',
      items: [
        { name: 'JSON Formatter', path: 'https://jsonformatter.microfree.store/', id: '07-JSON-Formatter' },
        { name: 'Base64 Tools', path: 'https://base64tools.microfree.store/', id: '08-Base64-Tools' },
        { name: 'JWT Decoder', path: 'https://jwtdecoder.microfree.store/', id: '09-JWT-Decoder' },
        { name: 'Developer Toolbox', path: 'https://developertoolbox.microfree.store/', id: '10-Developer-Toolbox' },
      ],
    },
    {
      name: 'Calculators',
      items: [
        { name: 'Percentage Calc', path: 'https://percentagecalculator.microfree.store/', id: '11-Percentage-Calculator' },
        { name: 'Age Calculator', path: 'https://agecalculator.microfree.store/', id: '12-Age-Calculator' },
        { name: 'EMI Calculator', path: 'https://emicalculator.microfree.store/', id: '13-EMI-Calculator' },
        { name: 'GST Calculator', path: 'https://gstcalculator.microfree.store/', id: '14-GST-Calculator' },
      ],
    },
    {
      name: 'Utilities',
      items: [
        { name: 'QR Code Generator', path: 'https://qrgenerator.microfree.store/', id: '15-QR-Generator' },
        { name: 'Password Generator', path: 'https://passwordgenerator.microfree.store/', id: '16-Password-Generator' },
        { name: 'Text Converter', path: 'https://textconverter.microfree.store/', id: '17-Text-Converter' },
        { name: 'Unit Converter', path: 'https://unitconverter.microfree.store/', id: '18-Unit-Converter' },
        { name: 'Currency Converter', path: 'https://currencyconverter.microfree.store/', id: '19-Currency-Converter' },
        { name: 'Time Zone Converter', path: 'https://timezoneconverter.microfree.store/', id: '20-Time-Zone-Converter' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <a href="https://microfree.store/" className="flex items-center gap-2 group" aria-label="MicroFree Home">
          <img
            src="./MicroFreeLogo.png"
            alt="MicroFree"
            className="h-10 sm:h-11 w-auto object-contain mix-blend-multiply transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          {navCategories.map((cat) => {
            const hasActiveItem = cat.items.some((item) => item.id === currentTool);
            return (
              <div key={cat.name} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(cat.name)}
                  onBlur={() => setTimeout(() => setActiveDropdown(null), 250)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 transition ${
                    hasActiveItem
                      ? 'text-brand-600 font-semibold bg-brand-50/70'
                      : 'hover:text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeDropdown === cat.name && (
                  <div className="absolute left-0 mt-1.5 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    {cat.items.map((item) => {
                      const isCurrent = item.id === currentTool;
                      return (
                        <a
                          key={item.name}
                          href={item.path}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                            isCurrent
                              ? 'text-brand-600 font-semibold bg-brand-50/80'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-brand-600'
                          }`}
                        >
                          <span>{item.name}</span>
                          {isCurrent && (
                            <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                              Current
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Actions & Mobile Trigger */}
        <div className="flex items-center gap-2">
          {onOpenPrivacy && (
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span>100% Private</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-4 shadow-lg max-h-[80vh] overflow-y-auto">
          {navCategories.map((cat) => (
            <div key={cat.name} className="space-y-1">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                {cat.name}
              </h5>
              <div className="grid grid-cols-2 gap-1">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className={`block rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                      item.id === currentTool
                        ? 'bg-brand-50 text-brand-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-slate-100 flex gap-2 text-xs">
            {onOpenAbout && (
              <button
                type="button"
                onClick={() => {
                  onOpenAbout();
                  setMobileMenuOpen(false);
                }}
                className="text-slate-600 hover:text-brand-600"
              >
                About
              </button>
            )}
            {onOpenPrivacy && (
              <button
                type="button"
                onClick={() => {
                  onOpenPrivacy();
                  setMobileMenuOpen(false);
                }}
                className="text-slate-600 hover:text-brand-600"
              >
                Privacy
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

