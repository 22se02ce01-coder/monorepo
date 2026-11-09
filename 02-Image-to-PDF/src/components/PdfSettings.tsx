import React from 'react';
import {
  Sliders,
  FileSpreadsheet,
  Maximize,
  Compass,
  Palette,
  Sparkles,
  FileEdit,
  Check,
} from 'lucide-react';
import {
  PdfConversionSettings,
  PageSize,
  PageOrientation,
  ImageFitting,
  MarginSize,
  ImageQuality,
} from '../types/image';

interface PdfSettingsProps {
  settings: PdfConversionSettings;
  onChange: (settings: PdfConversionSettings) => void;
  disabled?: boolean;
}

export const PdfSettings: React.FC<PdfSettingsProps> = ({
  settings,
  onChange,
  disabled = false,
}) => {
  const updateSetting = <K extends keyof PdfConversionSettings>(
    key: K,
    val: PdfConversionSettings[K]
  ) => {
    onChange({
      ...settings,
      [key]: val,
    });
  };

  const pageSizes: { id: PageSize; label: string; sub: string }[] = [
    { id: 'a4', label: 'A4', sub: 'Standard (210×297 mm)' },
    { id: 'a3', label: 'A3', sub: 'Large (297×420 mm)' },
    { id: 'letter', label: 'Letter', sub: 'US (8.5×11 in)' },
    { id: 'legal', label: 'Legal', sub: 'US (8.5×14 in)' },
    { id: 'original', label: 'Original', sub: 'Match Image Size' },
  ];

  const orientations: { id: PageOrientation; label: string; icon: string }[] = [
    { id: 'auto', label: 'Auto (Smart)', icon: '⚡' },
    { id: 'portrait', label: 'Portrait', icon: '▯' },
    { id: 'landscape', label: 'Landscape', icon: '▭' },
  ];

  const fittings: { id: ImageFitting; label: string; desc: string }[] = [
    { id: 'fit', label: 'Fit to Page', desc: 'Contain image with margins' },
    { id: 'fill', label: 'Fill Page', desc: 'Cover page completely' },
    { id: 'original', label: 'Original Size', desc: 'Keep 1:1 pixel scale' },
  ];

  const margins: { id: MarginSize; label: string; desc: string }[] = [
    { id: 'none', label: 'No Margin', desc: '0 pt' },
    { id: 'small', label: 'Small', desc: '18 pt (~6 mm)' },
    { id: 'medium', label: 'Medium', desc: '36 pt (~13 mm)' },
    { id: 'large', label: 'Large', desc: '54 pt (~19 mm)' },
  ];

  const qualities: { id: ImageQuality; label: string; desc: string }[] = [
    { id: 'high', label: 'High Quality', desc: 'Crisp images (~92%)' },
    { id: 'medium', label: 'Balanced', desc: 'Fast & optimized (~80%)' },
    { id: 'draft', label: 'Small File', desc: 'Compressed (~60%)' },
    { id: 'original', label: 'Original / Lossless', desc: 'No compression' },
  ];

  const presetColors = [
    { name: 'White', hex: '#ffffff' },
    { name: 'Warm Cream', hex: '#fdfbf7' },
    { name: 'Cool Slate', hex: '#f1f5f9' },
    { name: 'Dark Mode', hex: '#0f172a' },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-card">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Sliders className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">PDF Configuration</h3>
          <p className="text-xs text-slate-500">
            Customize page format, orientation, margins, and output quality
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {/* 1. Page Size */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <FileSpreadsheet className="h-3.5 w-3.5 text-brand-600" />
            <span>Page Size</span>
          </label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {pageSizes.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={disabled}
                onClick={() => updateSetting('pageSize', item.id)}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition border ${
                  settings.pageSize === item.id
                    ? 'border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-500/20 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold">{item.label}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Orientation (Disabled if pageSize is 'original') */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5 text-brand-600" />
            <span>Page Orientation</span>
            {settings.pageSize === 'original' && (
              <span className="text-[10px] text-slate-400 font-normal lowercase">
                (automatic in original size)
              </span>
            )}
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {orientations.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={disabled || settings.pageSize === 'original'}
                onClick={() => updateSetting('orientation', item.id)}
                className={`flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs transition border ${
                  settings.orientation === item.id && settings.pageSize !== 'original'
                    ? 'border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-500/20 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Margins & Image Fitting Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fitting */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <Maximize className="h-3.5 w-3.5 text-brand-600" />
              <span>Image Fitting</span>
            </label>
            <div className="mt-2 space-y-1.5">
              {fittings.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => updateSetting('fitting', item.id)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition border ${
                    settings.fitting === item.id
                      ? 'border-brand-600 bg-brand-50/60 text-brand-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                  {settings.fitting === item.id && <Check className="h-4 w-4 text-brand-600 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Margins */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <FileSpreadsheet className="h-3.5 w-3.5 text-brand-600" />
              <span>Margins</span>
            </label>
            <div className="mt-2 space-y-1.5">
              {margins.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => updateSetting('margin', item.id)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition border ${
                    settings.margin === item.id
                      ? 'border-brand-600 bg-brand-50/60 text-brand-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                  {settings.margin === item.id && <Check className="h-4 w-4 text-brand-600 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Background Color & Image Quality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          {/* Background color */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <Palette className="h-3.5 w-3.5 text-brand-600" />
              <span>Page Background</span>
            </label>
            <div className="mt-2 flex items-center gap-2">
              {presetColors.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  disabled={disabled}
                  onClick={() => updateSetting('backgroundColor', col.hex)}
                  className={`h-8 w-8 rounded-full border-2 transition-transform ${
                    settings.backgroundColor.toLowerCase() === col.hex.toLowerCase()
                      ? 'scale-110 border-brand-600 shadow-sm'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}

              {/* Custom Color Input */}
              <div className="relative flex items-center">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  disabled={disabled}
                  className="h-8 w-8 cursor-pointer rounded-full border border-slate-300 p-0.5 overflow-hidden"
                  title="Choose custom background color"
                />
              </div>
            </div>
          </div>

          {/* Image Quality */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span>Output Quality</span>
            </label>
            <select
              value={settings.quality}
              disabled={disabled}
              onChange={(e) => updateSetting('quality', e.target.value as ImageQuality)}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {qualities.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label} – {q.desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. Custom Output Filename */}
        <div className="pt-2 border-t border-slate-100">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <FileEdit className="h-3.5 w-3.5 text-brand-600" />
            <span>PDF Filename</span>
          </label>
          <div className="mt-2 relative">
            <input
              type="text"
              value={settings.filename}
              disabled={disabled}
              onChange={(e) => updateSetting('filename', e.target.value)}
              placeholder="microfree-document"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <span className="absolute right-3.5 top-2.5 text-sm font-semibold text-slate-400">
              .pdf
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

