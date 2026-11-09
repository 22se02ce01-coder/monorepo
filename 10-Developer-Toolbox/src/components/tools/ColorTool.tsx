import React, { useState } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, RGB } from '../../services/devToolsService';
import { CopyButton, ToolHeading, inputClass } from './shared';

export const ColorTool: React.FC = () => {
  const [rgb, setRgb] = useState<RGB>({ r: 37, g: 99, b: 235 });

  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);

  const setFromHex = (value: string) => {
    const parsed = hexToRgb(value);
    if (parsed) setRgb(parsed);
  };
  const setChannel = (k: keyof RGB, v: number) => {
    setRgb((cur) => ({ ...cur, [k]: Math.max(0, Math.min(255, v || 0)) }));
  };
  const setHsl = (h: number, s: number, l: number) => setRgb(hslToRgb(h, s, l));

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div>
      <ToolHeading
        title="Color Code Converter"
        desc="Convert colors between HEX, RGB, and HSL with a live preview and picker."
      />

      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-32 w-32 rounded-2xl border border-slate-200 shadow-inner"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex}
            onChange={(e) => setFromHex(e.target.value)}
            className="h-10 w-32 cursor-pointer rounded border border-slate-300 bg-white"
            aria-label="Color picker"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">HEX</label>
            <div className="flex gap-2">
              <input value={hex} onChange={(e) => setFromHex(e.target.value)} className={`${inputClass} font-mono`} />
              <CopyButton value={hex} small />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">RGB</label>
              <CopyButton value={rgbStr} small />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['r', 'g', 'b'] as const).map((k) => (
                <div key={k}>
                  <span className="text-[10px] uppercase text-slate-400">{k}</span>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[k]}
                    onChange={(e) => setChannel(k, parseInt(e.target.value, 10))}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">HSL</label>
              <CopyButton value={hslStr} small />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] uppercase text-slate-400">H</span>
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={hsl.h}
                  onChange={(e) => setHsl(parseInt(e.target.value, 10) || 0, hsl.s, hsl.l)}
                  className={inputClass}
                />
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400">S%</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.s}
                  onChange={(e) => setHsl(hsl.h, parseInt(e.target.value, 10) || 0, hsl.l)}
                  className={inputClass}
                />
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400">L%</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.l}
                  onChange={(e) => setHsl(hsl.h, hsl.s, parseInt(e.target.value, 10) || 0)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
