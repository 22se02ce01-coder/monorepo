import React from 'react';
import { X, RotateCw, ZoomIn, Info } from 'lucide-react';
import { ProcessedImageItem } from '../types/image';
import { formatFileSize } from '../utils/formatFileSize';

interface LightboxModalProps {
  item: ProcessedImageItem | null;
  onClose: () => void;
  onRotate?: (id: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onRotate }) => {
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[92vh] max-w-4xl w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <div className="flex items-center gap-2 overflow-hidden">
            <ZoomIn className="h-5 w-5 text-brand-600 shrink-0" />
            <h3 className="truncate text-sm font-bold text-slate-800" title={item.name}>
              {item.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {onRotate && (
              <button
                type="button"
                onClick={() => onRotate(item.id)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                title="Rotate 90 degrees"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Rotate</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="relative flex min-h-[300px] max-h-[70vh] flex-1 items-center justify-center overflow-auto bg-slate-900/5 p-6">
          <img
            src={item.previewUrl}
            alt={item.name}
            style={{
              transform: `rotate(${item.rotation}deg)`,
              transition: 'transform 0.25s ease-in-out',
            }}
            className="max-h-[65vh] max-w-full rounded object-contain shadow-md"
          />
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium">
              <Info className="h-3.5 w-3.5 text-slate-400" />
              Dimensions: <strong className="text-slate-800">{item.width} × {item.height} px</strong>
            </span>
            <span>
              Size: <strong className="text-slate-800">{formatFileSize(item.size)}</strong>
            </span>
            <span>
              Format: <strong className="uppercase text-slate-800">{item.type.replace('image/', '')}</strong>
            </span>
            {item.rotation !== 0 && (
              <span>
                Rotation: <strong className="text-brand-600">{item.rotation}°</strong>
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-3 py-1 font-semibold text-slate-700 hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

