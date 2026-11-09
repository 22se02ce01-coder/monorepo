export interface ProcessedImageItem {
  id: string;
  file: File;
  name: string;
  size: number; // in bytes
  type: string; // e.g. 'image/jpeg', 'image/png', 'image/webp'
  previewUrl: string; // Blob or Object URL
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
}

export type PageSize = 'a4' | 'a3' | 'letter' | 'legal' | 'original';

export type PageOrientation = 'portrait' | 'landscape' | 'auto';

export type ImageFitting = 'fit' | 'fill' | 'original';

export type MarginSize = 'none' | 'small' | 'medium' | 'large';

export type ImageQuality = 'draft' | 'medium' | 'high' | 'original';

export interface PdfConversionSettings {
  pageSize: PageSize;
  orientation: PageOrientation;
  fitting: ImageFitting;
  margin: MarginSize;
  backgroundColor: string;
  quality: ImageQuality;
  filename: string;
}

export interface ConversionProgress {
  isGenerating: boolean;
  currentStep: number;
  totalSteps: number;
  statusMessage: string;
  progressPercent: number;
  error?: string | null;
}

export interface GeneratedPdfResult {
  blob: Blob;
  url: string;
  filename: string;
  size: number;
  pageCount: number;
  createdAt: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

