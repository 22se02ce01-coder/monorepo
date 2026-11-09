import React, { useState, useRef } from 'react';
import { Plus, Trash2, ArrowUpDown, RotateCw, Layers } from 'lucide-react';
import { ProcessedImageItem } from '../types/image';
import { ImagePreview } from './ImagePreview';
import { formatFileSize } from '../utils/formatFileSize';

interface ImageGridProps {
  images: ProcessedImageItem[];
  onAddFiles: (files: FileList | File[]) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onRotate: (id: string) => void;
  onRotateAll?: () => void;
  onSortByName: (asc: boolean) => void;
  onViewLightbox: (item: ProcessedImageItem) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onAddFiles,
  onRemove,
  onClearAll,
  onReorder,
  onRotate,
  onRotateAll,
  onSortByName,
  onViewLightbox,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalSize = images.reduce((acc, curr) => acc + curr.size, 0);

  const handleDragStart = (_e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, _index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleToggleSort = () => {
    const nextSort = !sortAsc;
    setSortAsc(nextSort);
    onSortByName(nextSort);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden File Input for "Add More" */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onAddFiles(e.target.files);
            e.target.value = '';
          }
        }}
        className="hidden"
      />

      {/* Grid Toolbar & Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-subtle">
        {/* Left: Summary */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                {images.length} {images.length === 1 ? 'Image' : 'Images'}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {formatFileSize(totalSize)} total
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Drag images or use move buttons to arrange page order
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Add more button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/70 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100/80 active:scale-95 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add More</span>
          </button>

          {/* Sort By Name */}
          <button
            type="button"
            onClick={handleToggleSort}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 active:scale-95 transition"
            title={`Sort ${sortAsc ? 'A to Z' : 'Z to A'}`}
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
            <span>Sort {sortAsc ? 'A-Z' : 'Z-A'}</span>
          </button>

          {/* Rotate All */}
          {onRotateAll && (
            <button
              type="button"
              onClick={onRotateAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 active:scale-95 transition"
              title="Rotate all images 90 degrees"
            >
              <RotateCw className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Rotate All</span>
            </button>
          )}

          {/* Clear All */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all images?')) {
                onClearAll();
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/60 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100/70 active:scale-95 transition"
            title="Clear all uploaded images"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <ImagePreview
            key={img.id}
            item={img}
            index={idx}
            totalCount={images.length}
            onRotate={onRotate}
            onRemove={onRemove}
            onMoveLeft={(i) => onReorder(i, i - 1)}
            onMoveRight={(i) => onReorder(i, i + 1)}
            onViewLightbox={onViewLightbox}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedIndex === idx}
          />
        ))}
      </div>
    </div>
  );
};

