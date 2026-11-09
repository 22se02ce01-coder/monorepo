export interface CompressedImageResult {
  id: string;
  originalFile: File;
  originalSize: number;
  originalPreviewUrl: string;
  compressedBlob: Blob;
  compressedSize: number;
  compressedPreviewUrl: string;
  reductionPercentage: number;
  width: number;
  height: number;
  format: string;
}

/**
 * Loads a File into an HTMLImageElement
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/**
 * Compresses an image using Canvas API
 */
export async function compressSingleImage(
  file: File,
  quality: number = 0.75, // 0.05 to 1.0
  targetSizeKb?: number,
  outputFormat?: 'image/jpeg' | 'image/webp' | 'image/png'
): Promise<CompressedImageResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('HTML5 Canvas is not supported in this browser.');

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  // Determine output mime type
  let mimeType = outputFormat;
  if (!mimeType) {
    if (file.type === 'image/png') mimeType = 'image/png';
    else if (file.type === 'image/webp') mimeType = 'image/webp';
    else mimeType = 'image/jpeg';
  }

  // Draw background: if converting transparent PNG to JPEG, fill white background
  if (mimeType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  let finalQuality = quality;

  // If target size in KB is specified and format is lossy, search for best quality
  if (targetSizeKb && (mimeType === 'image/jpeg' || mimeType === 'image/webp')) {
    let minQ = 0.05;
    let maxQ = 0.95;
    let bestBlob: Blob | null = null;

    for (let i = 0; i < 5; i++) {
      const midQ = (minQ + maxQ) / 2;
      const b = await canvasToBlob(canvas, mimeType, midQ);
      if (b.size / 1024 <= targetSizeKb) {
        bestBlob = b;
        minQ = midQ; // try higher quality
      } else {
        maxQ = midQ; // try lower quality
      }
    }

    if (bestBlob) {
      finalQuality = minQ;
    }
  }

  const compressedBlob = await canvasToBlob(canvas, mimeType, finalQuality);
  const originalPreviewUrl = URL.createObjectURL(file);
  const compressedPreviewUrl = URL.createObjectURL(compressedBlob);

  const reduction = Math.max(
    0,
    parseFloat((((file.size - compressedBlob.size) / file.size) * 100).toFixed(1))
  );

  return {
    id: Math.random().toString(36).substring(2, 9),
    originalFile: file,
    originalSize: file.size,
    originalPreviewUrl,
    compressedBlob,
    compressedSize: compressedBlob.size,
    compressedPreviewUrl,
    reductionPercentage: reduction,
    width: canvas.width,
    height: canvas.height,
    format: mimeType.replace('image/', '').toUpperCase(),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas compression failed'));
      },
      mime,
      quality
    );
  });
}

