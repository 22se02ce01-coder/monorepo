export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

export function getStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const lines = text.length === 0 ? 0 : text.split(/\r\n|\r|\n/).length;
  const sentences = (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length ||
    (trimmed.length > 0 ? 1 : 0);
  const paragraphs = trimmed.length === 0
    ? 0
    : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const readingTimeMinutes = words === 0 ? 0 : Math.max(1 / 60, words / 200);

  return {
    words,
    characters,
    charactersNoSpaces,
    lines,
    sentences,
    paragraphs,
    readingTimeMinutes,
  };
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 0) return '0 sec';
  const totalSeconds = Math.round(minutes * 60);
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return secs === 0 ? `${mins} min` : `${mins} min ${secs} sec`;
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  const minor = new Set([
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor',
    'of', 'on', 'or', 'per', 'the', 'to', 'vs', 'via',
  ]);
  return text.replace(/\w\S*/g, (word, offset: number) => {
    const lower = word.toLowerCase();
    if (offset !== 0 && minor.has(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

export function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

export function toCapitalizedWords(text: string): string {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

function words(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}

export function toCamelCase(text: string): string {
  const w = words(text);
  return w
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

export function toSnakeCase(text: string): string {
  return words(text).map((w) => w.toLowerCase()).join('_');
}

export function toKebabCase(text: string): string {
  return words(text).map((w) => w.toLowerCase()).join('-');
}

export function removeExtraSpaces(text: string): string {
  return text
    .split(/\r\n|\r|\n/)
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function removeDuplicateLines(text: string): string {
  const seen = new Set<string>();
  return text
    .split(/\r\n|\r|\n/)
    .filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    })
    .join('\n');
}

export function removeEmptyLines(text: string): string {
  return text
    .split(/\r\n|\r|\n/)
    .filter((line) => line.trim().length > 0)
    .join('\n');
}

export function reverseText(text: string): string {
  return Array.from(text).reverse().join('');
}

export function reverseWords(text: string): string {
  return text.trim().split(/\s+/).reverse().join(' ');
}

export function sortLines(text: string): string {
  return text
    .split(/\r\n|\r|\n/)
    .sort((a, b) => a.localeCompare(b))
    .join('\n');
}
