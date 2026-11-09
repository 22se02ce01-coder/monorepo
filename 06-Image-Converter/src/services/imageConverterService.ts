export type TargetFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ConvertedImageItem {
  id: string;
  originalFile: File;
  originalSize: number;
  originalFormat: string;
  targetFormat: TargetFormat;
  targetFormatLabel: string;
  convertedBlob: Blob;
  convertedSize: number;
  previewUrl: string;
  width: number;
  height: number;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

export async function convertImage(
  file: File,
  targetFormat: TargetFormat,
  quality: number = 0.92,
  backgroundColor: string = '#ffffff'
): Promise<ConvertedImageItem> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas 2D context is unavailable.');

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  // Handle transparency if converting to JPEG (which lacks alpha channel)
  if (targetFormat === 'image/jpeg') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const convertedBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Image conversion failed.'));
      },
      targetFormat,
      quality
    );
  });

  const previewUrl = URL.createObjectURL(convertedBlob);

  const formatLabels: Record<TargetFormat, string> = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WEBP',
  };

  const originalFormat = (file.type.split('/')[1] || 'UNKNOWN').toUpperCase();

  return {
    id: Math.random().toString(36).substring(2, 9),
    originalFile: file,
    originalSize: file.size,
    originalFormat,
    targetFormat,
    targetFormatLabel: formatLabels[targetFormat],
    convertedBlob,
    convertedSize: convertedBlob.size,
    previewUrl,
    width: canvas.width,
    height: canvas.height,
  };
}

