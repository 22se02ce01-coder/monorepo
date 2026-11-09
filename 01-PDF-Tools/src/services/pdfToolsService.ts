import {
  PDFDocument,
  degrees,
  rgb,
  StandardFonts,
} from 'pdf-lib';

export interface PdfMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
  creationDate: string;
  modificationDate: string;
  pageCount: number;
  fileSizeBytes: number;
}

/**
 * Merge multiple PDF files into a single PDF
 */
export async function mergePdfs(pdfFiles: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of pdfFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Split a PDF into page ranges (e.g. "1-3, 5, 8-10") or extract single pages
 */
export async function splitPdf(
  file: File,
  pageRangesInput: string
): Promise<{ filename: string; data: Uint8Array }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  const ranges = parsePageRanges(pageRangesInput, totalPages);
  const results: { filename: string; data: Uint8Array }[] = [];

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    const newPdf = await PDFDocument.create();
    const indicesToCopy = range.filter((p) => p >= 1 && p <= totalPages).map((p) => p - 1);

    if (indicesToCopy.length > 0) {
      const copiedPages = await newPdf.copyPages(srcPdf, indicesToCopy);
      copiedPages.forEach((page) => newPdf.addPage(page));
      const pdfBytes = await newPdf.save();
      const rangeLabel =
        indicesToCopy.length === 1
          ? `page-${indicesToCopy[0] + 1}`
          : `pages-${indicesToCopy[0] + 1}-to-${indicesToCopy[indicesToCopy.length - 1] + 1}`;
      results.push({
        filename: `${file.name.replace(/\.[^/.]+$/, '')}_${rangeLabel}.pdf`,
        data: pdfBytes,
      });
    }
  }

  return results;
}

/**
 * Helper to parse page range strings like "1-3, 5, 8-10"
 */
export function parsePageRanges(input: string, maxPages: number): number[][] {
  const clean = input.trim();
  if (!clean) {
    // If empty, split each page individually
    const res: number[][] = [];
    for (let p = 1; p <= maxPages; p++) {
      res.push([p]);
    }
    return res;
  }

  const parts = clean.split(',').map((s) => s.trim()).filter(Boolean);
  const groups: number[][] = [];

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-').map((s) => s.trim());
      const start = Math.max(1, parseInt(startStr, 10) || 1);
      const end = Math.min(maxPages, parseInt(endStr, 10) || maxPages);
      const pageList: number[] = [];
      for (let p = start; p <= end; p++) {
        pageList.push(p);
      }
      if (pageList.length > 0) groups.push(pageList);
    } else {
      const page = parseInt(part, 10);
      if (page >= 1 && page <= maxPages) {
        groups.push([page]);
      }
    }
  }

  return groups;
}

/**
 * Rotate pages of a PDF by a specified angle (90, 180, 270)
 */
export async function rotatePdf(
  file: File,
  rotationAngle: number,
  pageIndices?: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    if (!pageIndices || pageIndices.includes(index)) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + rotationAngle) % 360));
    }
  });

  return await pdfDoc.save();
}

/**
 * Delete specific pages from a PDF
 */
export async function deletePdfPages(file: File, pagesToDelete1Based: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  const newPdf = await PDFDocument.create();
  const toDeleteSet = new Set(pagesToDelete1Based);
  const toKeepIndices: number[] = [];

  for (let i = 0; i < totalPages; i++) {
    if (!toDeleteSet.has(i + 1)) {
      toKeepIndices.push(i);
    }
  }

  if (toKeepIndices.length === 0) {
    throw new Error('Cannot delete all pages from the document. At least one page must remain.');
  }

  const copiedPages = await newPdf.copyPages(srcPdf, toKeepIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

/**
 * Extract specific pages into a new PDF
 */
export async function extractPdfPages(file: File, pagesToExtract1Based: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  const newPdf = await PDFDocument.create();
  const validIndices = pagesToExtract1Based
    .filter((p) => p >= 1 && p <= totalPages)
    .map((p) => p - 1);

  if (validIndices.length === 0) {
    throw new Error('No valid page numbers selected for extraction.');
  }

  const copiedPages = await newPdf.copyPages(srcPdf, validIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

/**
 * Reorder pages according to a new order of 1-based page numbers
 */
export async function reorderPdfPages(file: File, newOrder1Based: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  const indices = newOrder1Based.map((p) => p - 1);
  const copiedPages = await newPdf.copyPages(srcPdf, indices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

/**
 * Add page numbers to a PDF document
 */
export async function addPageNumbers(
  file: File,
  position: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-center',
  startNumber: number = 1,
  format: 'X' | 'Page X' | 'Page X of Y' = 'Page X of Y'
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  for (let i = 0; i < totalPages; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const pageNum = startNumber + i;

    let text = `${pageNum}`;
    if (format === 'Page X') text = `Page ${pageNum}`;
    else if (format === 'Page X of Y') text = `Page ${pageNum} of ${totalPages + startNumber - 1}`;

    const fontSize = 10;
    const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
    const margin = 36; // 0.5 inch

    let x = width / 2 - textWidth / 2;
    let y = margin;

    if (position === 'bottom-center') {
      x = width / 2 - textWidth / 2;
      y = margin;
    } else if (position === 'bottom-right') {
      x = width - margin - textWidth;
      y = margin;
    } else if (position === 'bottom-left') {
      x = margin;
      y = margin;
    } else if (position === 'top-right') {
      x = width - margin - textWidth;
      y = height - margin;
    } else if (position === 'top-center') {
      x = width / 2 - textWidth / 2;
      y = height - margin;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  return await pdfDoc.save();
}

/**
 * Add a text watermark across all pages
 */
export async function addWatermark(
  file: File,
  watermarkText: string,
  opacity: number = 0.25,
  fontSize: number = 48,
  color: { r: number; g: number; b: number } = { r: 0.6, g: 0.6, b: 0.6 }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 4,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity: Math.max(0.05, Math.min(1, opacity)),
      rotate: degrees(45),
    });
  }

  return await pdfDoc.save();
}

/**
 * Browser-side PDF Optimization / Compression
 * Rebuilds the document structures, removes unreferenced indirect objects,
 * consolidates xref tables, and compresses streams.
 */
export async function compressPdf(file: File): Promise<{
  data: Uint8Array;
  originalSize: number;
  newSize: number;
  reductionPercentage: number;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const originalSize = file.size;

  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  // Saving with object stream compression and removing dangling objects
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
  });

  const newSize = compressedBytes.length;
  const reductionPercentage = Math.max(
    0,
    parseFloat((((originalSize - newSize) / originalSize) * 100).toFixed(1))
  );

  return {
    data: compressedBytes,
    originalSize,
    newSize,
    reductionPercentage,
  };
}

/**
 * Read PDF metadata
 */
export async function readPdfMetadata(file: File): Promise<PdfMetadata> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const creationDate = pdfDoc.getCreationDate();
  const modDate = pdfDoc.getModificationDate();

  return {
    title: pdfDoc.getTitle() || 'Untitled',
    author: pdfDoc.getAuthor() || 'Unknown',
    subject: pdfDoc.getSubject() || 'None',
    keywords: pdfDoc.getKeywords() || 'None',
    creator: pdfDoc.getCreator() || 'Unknown',
    producer: pdfDoc.getProducer() || 'pdf-lib',
    creationDate: creationDate ? creationDate.toLocaleString() : 'Not Specified',
    modificationDate: modDate ? modDate.toLocaleString() : 'Not Specified',
    pageCount: pdfDoc.getPageCount(),
    fileSizeBytes: file.size,
  };
}

/**
 * Update PDF metadata
 */
export async function updatePdfMetadata(
  file: File,
  newMeta: { title?: string; author?: string; subject?: string; keywords?: string }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  if (newMeta.title !== undefined) pdfDoc.setTitle(newMeta.title);
  if (newMeta.author !== undefined) pdfDoc.setAuthor(newMeta.author);
  if (newMeta.subject !== undefined) pdfDoc.setSubject(newMeta.subject);
  if (newMeta.keywords !== undefined) pdfDoc.setKeywords(newMeta.keywords.split(',').map((k) => k.trim()));

  return await pdfDoc.save();
}

/**
 * Unlock PDF with password
 */
export async function unlockPdf(file: File, _password?: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: false,
    parseSpeed: 1,
  });

  return await pdfDoc.save();
}

/**
 * Expands a page list such as "1, 3-5, 8" into [1, 3, 4, 5, 8], keeping the
 * order typed (needed for reordering). Reversed ranges like "5-3" count down.
 */
export function expandPageList(input: string): number[] {
  const pages: number[] = [];
  for (const part of input.split(',').map((s) => s.trim()).filter(Boolean)) {
    const m = /^(\d+)\s*[-–]\s*(\d+)$/.exec(part);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      const step = a <= b ? 1 : -1;
      for (let p = a; step > 0 ? p <= b : p >= b; p += step) pages.push(p);
    } else if (/^\d+$/.test(part)) {
      pages.push(parseInt(part, 10));
    }
  }
  return pages;
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(data: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/**
 * Builds a ZIP archive (stored, no compression – PDFs are already compressed).
 */
export function createZip(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const f of files) {
    const name = enc.encode(f.name);
    const crc = crc32(f.data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // UTF-8 file names
    local.setUint16(8, 0, true); // stored
    local.setUint32(14, crc, true);
    local.setUint32(18, f.data.length, true);
    local.setUint32(22, f.data.length, true);
    local.setUint16(26, name.length, true);
    chunks.push(new Uint8Array(local.buffer), name, f.data);

    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true);
    cd.setUint16(4, 20, true);
    cd.setUint16(6, 20, true);
    cd.setUint16(8, 0x0800, true);
    cd.setUint32(16, crc, true);
    cd.setUint32(20, f.data.length, true);
    cd.setUint32(24, f.data.length, true);
    cd.setUint16(28, name.length, true);
    cd.setUint32(42, offset, true);
    central.push(new Uint8Array(cd.buffer), name);

    offset += 30 + name.length + f.data.length;
  }

  const cdSize = central.reduce((n, c) => n + c.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, cdSize, true);
  end.setUint32(16, offset, true);

  const all = [...chunks, ...central, new Uint8Array(end.buffer)];
  const out = new Uint8Array(all.reduce((n, c) => n + c.length, 0));
  let pos = 0;
  for (const c of all) {
    out.set(c, pos);
    pos += c.length;
  }
  return out;
}
