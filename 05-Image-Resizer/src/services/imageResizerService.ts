export interface ImageDimensions {
  width: number;
  height: number;
}

export interface PresetDimension {
  name: string;
  category: string;
  width: number;
  height: number;
}

export const SOCIAL_PRESETS: PresetDimension[] = [
  { name: 'Instagram Square (1:1)', category: 'Instagram', width: 1080, height: 1080 },
  { name: 'Instagram Portrait (4:5)', category: 'Instagram', width: 1080, height: 1350 },
  { name: 'Instagram Story / Reel (9:16)', category: 'Instagram', width: 1080, height: 1920 },
  { name: 'YouTube Thumbnail (16:9)', category: 'YouTube', width: 1280, height: 720 },
  { name: 'YouTube Channel Banner', category: 'YouTube', width: 2560, height: 1440 },
  { name: 'Facebook Shared Post', category: 'Facebook', width: 1200, height: 630 },
  { name: 'Twitter / X Header', category: 'Twitter', width: 1500, height: 500 },
  { name: 'LinkedIn Cover Banner', category: 'LinkedIn', width: 1584, height: 396 },
  { name: 'Full HD Web Banner', category: 'Website', width: 1920, height: 1080 },
  { name: 'Avatar / Profile Picture', category: 'Website', width: 512, height: 512 },
];

export interface ResizedImageResult {
  blob: Blob;
  previewUrl: string;
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  newWidth: number;
  newHeight: number;
  newSize: number;
  format: string;
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

export async function getImageDimensions(file: File): Promise<ImageDimensions> {
  const img = await loadImage(file);
  return {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  format: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg',
  quality: number = 0.92,
  fitMode: 'stretch' | 'contain' | 'crop' = 'stretch'
): Promise<ResizedImageResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas 2D context not available.');

  canvas.width = Math.max(1, Math.round(targetWidth));
  canvas.height = Math.max(1, Math.round(targetHeight));

  // High quality interpolation
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (format === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (fitMode === 'stretch') {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  } else if (fitMode === 'contain') {
    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  } else if (fitMode === 'crop') {
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas export failed'));
      },
      format,
      quality
    );
  });

  const previewUrl = URL.createObjectURL(blob);

  return {
    blob,
    previewUrl,
    originalWidth: img.naturalWidth,
    originalHeight: img.naturalHeight,
    originalSize: file.size,
    newWidth: canvas.width,
    newHeight: canvas.height,
    newSize: blob.size,
    format: format.replace('image/', '').toUpperCase(),
  };
}

