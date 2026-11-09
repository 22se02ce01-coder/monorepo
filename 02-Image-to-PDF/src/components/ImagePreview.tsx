import React from 'react';
import { RotateCw, Trash2, Maximize2, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { ProcessedImageItem } from '../types/image';
import { formatFileSize } from '../utils/formatFileSize';

interface ImagePreviewProps {
  item: ProcessedImageItem;
  index: number;
  totalCount: number;
  onRotate: (id: string) => void;
  onRemove: (id: string) => void;
  onMoveLeft?: (index: number) => void;
  onMoveRight?: (index: number) => void;
  onViewLightbox?: (item: ProcessedImageItem) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  isDragging?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  item,
  index,
  totalCount,
  onRotate,
  onRemove,
  onMoveLeft,
  onMoveRight,
  onViewLightbox,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging = false,
}) => {
  const isRotated90or270 = item.rotation === 90 || item.rotation === 270;
  const displayWidth = isRotated90or270 ? item.height : item.width;
  const displayHeight = isRotated90or270 ? item.width : item.height;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, index)}
      onDragOver={(e) => onDragOver && onDragOver(e, index)}
      onDrop={(e) => onDrop && onDrop(e, index)}
      className={`group relative flex flex-col rounded-xl border bg-white p-3 shadow-subtle transition-all duration-200 hover:shadow-card hover:border-brand-300 ${
        isDragging ? 'opacity-40 scale-95 border-brand-500 border-dashed' : 'border-slate-200'
      }`}
    >
      {/* Top Header: Page Number Badge & Drag Handle & Delete */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          <div
            className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600 rounded"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <span className="flex items-center justify-center rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 border border-brand-100">
            Page {index + 1}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Lightbox / Zoom */}
          {onViewLightbox && (
            <button
              type="button"
              onClick={() => onViewLightbox(item)}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              title="Preview full image"
              aria-label={`Preview ${item.name}`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Remove */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
            title="Remove image"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Image Thumbnail Container */}
      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100/80 border border-slate-100">
        <div className="relative flex h-full w-full items-center justify-center p-2">
          <img
            src={item.previewUrl}
            alt={item.name}
            style={{
              transform: `rotate(${item.rotation}deg)`,
              transition: 'transform 0.25s ease-in-out',
            }}
            className="max-h-full max-w-full object-contain drop-shadow-sm select-none pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Rotation indicator badge if rotated */}
        {item.rotation !== 0 && (
          <span className="absolute bottom-2 left-2 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
            {item.rotation}°
          </span>
        )}

        {/* Quick Rotate Button overlay */}
        <button
          type="button"
          onClick={() => onRotate(item.id)}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-brand-50 hover:text-brand-600 transition active:scale-95"
          title="Rotate 90 degrees clockwise"
        >
          <RotateCw className="h-3 w-3" />
          <span className="text-[11px]">Rotate</span>
        </button>
      </div>

      {/* Meta Information */}
      <div className="mt-2.5 flex flex-col gap-0.5">
        <p
          className="truncate text-xs font-semibold text-slate-800"
          title={item.name}
        >
          {item.name}
        </p>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>{formatFileSize(item.size)}</span>
          <span className="font-mono text-[10px] text-slate-400">
            {displayWidth} × {displayHeight}
          </span>
        </div>
      </div>

      {/* Mobile/Accessibility Move Controls */}
      <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMoveLeft && onMoveLeft(index)}
          className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
          title="Move earlier in PDF"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Move Up</span>
        </button>

        <button
          type="button"
          disabled={index === totalCount - 1}
          onClick={() => onMoveRight && onMoveRight(index)}
          className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
          title="Move later in PDF"
        >
          <span>Move Down</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

