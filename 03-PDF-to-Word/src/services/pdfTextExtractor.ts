import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { PageContent } from './docxBuilder';

// pdf.js parses the PDF (including compressed streams, font encodings and
// ToUnicode maps) in a Web Worker served from this site. Nothing is uploaded.
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface Line {
  text: string;
  y: number;
  height: number;
  endX: number;
}

/**
 * Groups pdf.js text items into visual lines, then joins lines into paragraphs
 * whenever the vertical gap between them is no larger than normal line spacing.
 */
function itemsToParagraphs(items: TextItem[]): string[] {
  const lines: Line[] = [];
  let current: Line | null = null;

  for (const item of items) {
    const y = item.transform[5];
    const height = Math.abs(item.height) || Math.abs(item.transform[3]) || 10;

    if (current && Math.abs(current.y - y) > height * 0.5 && item.str.trim()) {
      // Item sits on a different baseline: close the current line.
      lines.push(current);
      current = null;
    }
    const x = item.transform[4];
    if (!current) current = { text: '', y, height, endX: x };

    // Only insert a space when there is a real horizontal gap between two pieces
    // (ligatures such as "fi" arrive as separate pieces that touch each other).
    const gapX = x - current.endX;
    const needsSpace =
      current.text && !/\s$/.test(current.text) && item.str && !/^\s/.test(item.str) && gapX > height * 0.15;
    current.text += (needsSpace ? ' ' : '') + item.str;
    current.height = Math.max(current.height, height);
    current.endX = x + item.width;

    if (item.hasEOL) {
      lines.push(current);
      current = null;
    }
  }
  if (current) lines.push(current);

  const paragraphs: string[] = [];
  let para = '';
  let prev: Line | null = null;
  for (const line of lines) {
    const text = line.text.replace(/\s+/g, ' ').trim();
    if (!text) {
      if (para) paragraphs.push(para);
      para = '';
      prev = null;
      continue;
    }
    const gap = prev ? Math.abs(prev.y - line.y) : 0;
    const sizeChanged = prev ? Math.abs(prev.height - line.height) > Math.min(prev.height, line.height) * 0.2 : false;
    const newParagraph = !prev || sizeChanged || gap > Math.max(prev.height, line.height) * 1.6;
    if (newParagraph) {
      if (para) paragraphs.push(para);
      para = text;
    } else if (para.endsWith('-') && /^[a-z]/.test(text)) {
      para = para.slice(0, -1) + text; // re-join a hyphenated word split across lines
    } else {
      para += ' ' + text;
    }
    prev = line;
  }
  if (para) paragraphs.push(para);
  return paragraphs;
}

/**
 * Extract all text from a PDF file page-by-page
 */
export async function extractPdfDocumentText(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<{
  pages: PageContent[];
  totalWordCount: number;
  hasText: boolean;
}> {
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const totalPages = pdf.numPages;

  const pagesResult: PageContent[] = [];
  let totalWords = 0;

  try {
    for (let i = 1; i <= totalPages; i++) {
      if (onProgress) onProgress(i, totalPages);

      let paragraphs: string[] = [];
      try {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const items = content.items.filter((it): it is TextItem => 'str' in it);
        paragraphs = itemsToParagraphs(items);
        page.cleanup();
      } catch (err) {
        console.warn(`Error extracting text from page ${i}:`, err);
      }

      totalWords += paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
      pagesResult.push({
        pageNumber: i,
        paragraphs: paragraphs.length > 0 ? paragraphs : ['[No selectable text found on this page]'],
      });
    }
  } finally {
    await pdf.destroy();
  }

  return {
    pages: pagesResult,
    totalWordCount: totalWords,
    hasText: totalWords > 5,
  };
}
