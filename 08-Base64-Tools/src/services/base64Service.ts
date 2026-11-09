// Base64 helpers — all client-side, Unicode-safe.

/** Encode a UTF-8 string to standard Base64. */
export function encodeText(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Decode a standard Base64 string to a UTF-8 string. */
export function decodeText(input: string): string {
  const binary = atob(normalizeBase64(input));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/** Convert standard Base64 to URL-safe (- _ , no padding). */
export function toUrlSafe(b64: string): string {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/** Normalize URL-safe or padded Base64 back to standard padded Base64. */
export function normalizeBase64(b64: string): string {
  let s = b64.trim().replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad === 2) s += '==';
  else if (pad === 3) s += '=';
  else if (pad === 1) throw new Error('Invalid Base64 length.');
  return s;
}

/** Validate that a string is decodable Base64. */
export function isValidBase64(input: string): boolean {
  try {
    atob(normalizeBase64(input));
    return true;
  } catch {
    return false;
  }
}

/** Read a File as a data URI (data:<mime>;base64,....). */
export function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

/** Split a data URI into its mime type and raw base64 payload. */
export function splitDataUri(dataUri: string): { mime: string; base64: string } {
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUri.trim());
  if (!match) {
    // Treat as raw base64 with unknown mime
    return { mime: 'application/octet-stream', base64: dataUri.trim() };
  }
  return { mime: match[1] || 'application/octet-stream', base64: match[3] };
}

/** Build a full data URI from a mime + base64 payload. */
export function buildDataUri(base64: string, mime = 'image/png'): string {
  const trimmed = base64.trim();
  if (trimmed.startsWith('data:')) return trimmed;
  return `data:${mime};base64,${normalizeBase64(trimmed)}`;
}
