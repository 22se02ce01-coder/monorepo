import { ProcessedImageItem, PdfConversionSettings, ImageQuality } from '../types/image';

export interface ProcessedImageData {
  bytes: Uint8Array;
  format: 'jpeg' | 'png';
  width: number;
  height: number;
}

/**
 * Returns numeric quality level for canvas JPEG export
 */
function getQualityMultiplier(quality: ImageQuality): number {
  switch (quality) {
    case 'draft':
      return 0.6;
    case 'medium':
      return 0.8;
    case 'high':
      return 0.92;
    case 'original':
      return 0.98;
    default:
      return 0.85;
  }
}

/**
 * Helper to load an HTMLImageElement from a Blob or URL
 */
function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image for processing'));
    img.src = src;
  });
}

/**
 * Processes an image using HTML5 Canvas:
 * - Handles rotations (90°, 180°, 270°)
 * - Converts WebP to JPEG/PNG (since pdf-lib does not support WebP natively)
 * - Fills background color (especially for transparent PNGs)
 * - Compresses based on image quality setting
 */
export async function processImageForPdf(
  item: ProcessedImageItem,
  settings: PdfConversionSettings
): Promise<ProcessedImageData> {
  const rotation = (item.rotation % 360 + 360) % 360;
  const isWebP = item.type === 'image/webp' || item.name.toLowerCase().endsWith('.webp');
  const isPng = item.type === 'image/png' || item.name.toLowerCase().endsWith('.png');

  // Fast path: If the image is already JPEG or PNG, no rotation is needed,
  // quality is original, and no special background manipulation is needed,
  // we can read raw bytes directly without canvas re-compression!
  if (rotation === 0 && settings.quality === 'original' && !isWebP) {
    const buffer = await item.file.arrayBuffer();
    return {
      bytes: new Uint8Array(buffer),
      format: isPng ? 'png' : 'jpeg',
      width: item.width,
      height: item.height,
    };
  }

  // Otherwise, use Canvas for transformations
  const img = await loadImageElement(item.previewUrl);

  const isRotated90or270 = rotation === 90 || rotation === 270;
  const canvasWidth = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
  const canvasHeight = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d', { alpha: true });

  if (!ctx) {
    throw new Error('Could not acquire 2D canvas context for image processing');
  }

  // Fill background color
  const bgColor = settings.backgroundColor || '#ffffff';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Apply rotation around center
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  ctx.restore();

  // Determine export format and quality
  // If original was PNG, quality is 'original' and user didn't request compression: export PNG
  // Otherwise export JPEG for high compression & speed
  let exportMime: 'image/jpeg' | 'image/png' = 'image/jpeg';
  if (isPng && settings.quality === 'original') {
    exportMime = 'image/png';
  }

  const qualityNum = getQualityMultiplier(settings.quality);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas export failed'));
      },
      exportMime,
      exportMime === 'image/jpeg' ? qualityNum : undefined
    );
  });

  const arrayBuffer = await blob.arrayBuffer();

  return {
    bytes: new Uint8Array(arrayBuffer),
    format: exportMime === 'image/png' ? 'png' : 'jpeg',
    width: canvasWidth,
    height: canvasHeight,
  };
}
