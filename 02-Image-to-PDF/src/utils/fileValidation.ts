import { ValidationResult } from '../types/image';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);

/**
 * Validates whether an uploaded file is a supported image format (JPG, PNG, WebP)
 */
export function validateImageFile(file: File): ValidationResult {
  if (!file) {
    return { isValid: false, errorMessage: 'No file provided.' };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const lastDot = fileName.lastIndexOf('.');
  const ext = lastDot !== -1 ? fileName.slice(lastDot + 1) : '';

  const hasValidExt = ALLOWED_EXTENSIONS.has(ext);
  const hasValidMime = ALLOWED_MIME_TYPES.has(file.type.toLowerCase()) || 
    (file.type === '' && hasValidExt); // Fallback if browser didn't resolve MIME

  if (!hasValidExt && !hasValidMime) {
    return {
      isValid: false,
      errorMessage: `"${file.name}" is not supported. Please upload JPG, PNG, or WebP images only.`,
    };
  }

  // Check reasonable file size limit (e.g. 100MB per image to prevent browser out-of-memory crashes)
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      errorMessage: `"${file.name}" exceeds the maximum recommended size of 100 MB.`,
    };
  }

  return { isValid: true };
}

/**
 * Loads an image file into an HTMLImageElement to verify integrity and retrieve dimensions
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        previewUrl: objectUrl,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load "${file.name}". The file may be corrupted or not a valid image.`));
    };

    img.src = objectUrl;
  });
}

