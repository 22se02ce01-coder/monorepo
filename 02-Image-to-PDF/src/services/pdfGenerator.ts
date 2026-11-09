import { PDFDocument, rgb } from 'pdf-lib';
import {
  ProcessedImageItem,
  PdfConversionSettings,
  GeneratedPdfResult,
  ConversionProgress,
  PageSize,
  MarginSize,
} from '../types/image';
import { processImageForPdf } from './imageProcessor';

// Standard paper dimensions in points (72 points = 1 inch)
const PAGE_DIMENSIONS: Record<Exclude<PageSize, 'original'>, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  a3: { width: 841.89, height: 1190.55 },
  letter: { width: 612.0, height: 792.0 },
  legal: { width: 612.0, height: 1008.0 },
};

// Margins in points
const MARGIN_POINTS: Record<MarginSize, number> = {
  none: 0,
  small: 18, // 0.25 in (~6.35 mm)
  medium: 36, // 0.5 in (~12.7 mm)
  large: 54, // 0.75 in (~19 mm)
};

/**
 * Parses a hex color string into 0-1 RGB components for pdf-lib
 */
function hexToRgbComponents(hex: string): { r: number; g: number; b: number } {
  let cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return { r: 1, g: 1, b: 1 };
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

/**
 * Sanitizes user-provided filename to ensure a valid .pdf file
 */
export function sanitizeFilename(filename: string): string {
  let clean = filename.trim().replace(/[/\\?%*:|"<>]/g, '-');
  if (!clean) {
    clean = 'microfree-document';
  }
  if (!clean.toLowerCase().endsWith('.pdf')) {
    clean += '.pdf';
  }
  return clean;
}

/**
 * Generates a PDF from an array of image items and conversion settings.
 * All operations run completely client-side in the browser.
 */
export async function generatePdf(
  images: ProcessedImageItem[],
  settings: PdfConversionSettings,
  onProgress?: (progress: ConversionProgress) => void
): Promise<GeneratedPdfResult> {
  if (!images || images.length === 0) {
    throw new Error('No images provided for PDF generation.');
  }

  // Create empty PDF document
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(settings.filename || 'MicroFree Image to PDF');
  pdfDoc.setProducer('MicroFree Image to PDF Converter (Browser)');
  pdfDoc.setCreator('MicroFree Utility Tools');

  const marginPt = MARGIN_POINTS[settings.margin] ?? 0;
  const bgComponents = hexToRgbComponents(settings.backgroundColor || '#ffffff');
  const bgColorRgb = rgb(bgComponents.r, bgComponents.g, bgComponents.b);

  const total = images.length;

  for (let i = 0; i < total; i++) {
    const item = images[i];

    // Report progress
    if (onProgress) {
      onProgress({
        isGenerating: true,
        currentStep: i + 1,
        totalSteps: total,
        statusMessage: `Processing image ${i + 1} of ${total}: ${item.name}...`,
        progressPercent: Math.round(((i + 0.1) / total) * 100),
      });
      // Yield to let browser update DOM
      await new Promise((r) => setTimeout(r, 16));
    }

    // Process image (handles rotation, WebP conversion, canvas rendering)
    const processed = await processImageForPdf(item, settings);

    // Embed image into pdf-lib
    let embeddedImage;
    if (processed.format === 'png') {
      embeddedImage = await pdfDoc.embedPng(processed.bytes);
    } else {
      embeddedImage = await pdfDoc.embedJpg(processed.bytes);
    }

    // Determine target page dimensions
    let pageWidth: number;
    let pageHeight: number;

    if (settings.pageSize === 'original') {
      // In original size mode, the page takes the image's dimensions + margins
      pageWidth = processed.width + 2 * marginPt;
      pageHeight = processed.height + 2 * marginPt;
    } else {
      const baseDimensions = PAGE_DIMENSIONS[settings.pageSize] || PAGE_DIMENSIONS.a4;
      let isLandscape = false;

      if (settings.orientation === 'landscape') {
        isLandscape = true;
      } else if (settings.orientation === 'portrait') {
        isLandscape = false;
      } else {
        // Automatic orientation based on processed image dimensions
        isLandscape = processed.width > processed.height;
      }

      pageWidth = isLandscape ? Math.max(baseDimensions.width, baseDimensions.height) : Math.min(baseDimensions.width, baseDimensions.height);
      pageHeight = isLandscape ? Math.min(baseDimensions.width, baseDimensions.height) : Math.max(baseDimensions.width, baseDimensions.height);
    }

    // Add page to PDF
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Draw background color
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: bgColorRgb,
    });

    // Calculate image placement within margins
    const printableWidth = Math.max(pageWidth - 2 * marginPt, 1);
    const printableHeight = Math.max(pageHeight - 2 * marginPt, 1);

    let drawWidth: number;
    let drawHeight: number;

    if (settings.fitting === 'fit') {
      // Fit to page (contain): scale down/up to fit within bounds preserving aspect ratio
      const scale = Math.min(printableWidth / processed.width, printableHeight / processed.height);
      drawWidth = processed.width * scale;
      drawHeight = processed.height * scale;
    } else if (settings.fitting === 'fill') {
      // Fill page (cover): scale to cover printable area
      const scale = Math.max(printableWidth / processed.width, printableHeight / processed.height);
      drawWidth = processed.width * scale;
      drawHeight = processed.height * scale;
    } else {
      // Original dimensions: 1pt per pixel, scaled down only if exceeding printable area
      drawWidth = processed.width;
      drawHeight = processed.height;
      if (drawWidth > printableWidth || drawHeight > printableHeight) {
        const scale = Math.min(printableWidth / drawWidth, printableHeight / drawHeight);
        drawWidth *= scale;
        drawHeight *= scale;
      }
    }

    // Center image within the printable area
    const x = marginPt + (printableWidth - drawWidth) / 2;
    const y = marginPt + (printableHeight - drawHeight) / 2;

    // Draw embedded image
    page.drawImage(embeddedImage, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
    });
  }

  // Update progress for final PDF serialization
  if (onProgress) {
    onProgress({
      isGenerating: true,
      currentStep: total,
      totalSteps: total,
      statusMessage: 'Finalizing and compressing PDF document...',
      progressPercent: 98,
    });
    await new Promise((r) => setTimeout(r, 20));
  }

  // Save the PDF into a binary Uint8Array
  const pdfBytes = await pdfDoc.save();

  // Convert Uint8Array to Blob safely
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const finalFilename = sanitizeFilename(settings.filename || 'microfree-document.pdf');

  if (onProgress) {
    onProgress({
      isGenerating: false,
      currentStep: total,
      totalSteps: total,
      statusMessage: 'PDF document generated successfully!',
      progressPercent: 100,
    });
  }

  return {
    blob,
    url,
    filename: finalFilename,
    size: blob.size,
    pageCount: total,
    createdAt: new Date(),
  };
}
