export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  rawHeader: string;
  rawPayload: string;
}

export interface JwtClaimInfo {
  key: string;
  label: string;
  rawValue: unknown;
  display: string;
}

const STANDARD_CLAIM_LABELS: Record<string, string> = {
  iss: 'Issuer (iss)',
  sub: 'Subject (sub)',
  aud: 'Audience (aud)',
  exp: 'Expiration (exp)',
  nbf: 'Not Before (nbf)',
  iat: 'Issued At (iat)',
  jti: 'JWT ID (jti)',
  azp: 'Authorized Party (azp)',
  scope: 'Scope (scope)',
  typ: 'Type (typ)',
  alg: 'Algorithm (alg)',
};

const TIME_CLAIMS = new Set(['exp', 'nbf', 'iat', 'auth_time', 'updated_at']);

/** Decode a base64url string into a UTF-8 JavaScript string. */
export function base64UrlDecode(input: string): string {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad === 2) base64 += '==';
  else if (pad === 3) base64 += '=';
  else if (pad === 1) throw new Error('Invalid base64url string length.');

  const binary = atob(base64);
  // Correctly decode UTF-8 multi-byte sequences.
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
}

/** Decode a complete JWT into header/payload objects. Throws on structural errors. */
export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();
  if (!trimmed) throw new Error('Please paste a JWT token.');

  const parts = trimmed.split('.');
  if (parts.length !== 3) {
    throw new Error(
      `A JWT must have exactly 3 parts separated by dots (header.payload.signature). Found ${parts.length} part${parts.length === 1 ? '' : 's'}.`
    );
  }

  const [headerPart, payloadPart, signature] = parts;

  let rawHeader: string;
  let rawPayload: string;
  try {
    rawHeader = base64UrlDecode(headerPart);
  } catch {
    throw new Error('The header segment is not valid base64url.');
  }
  try {
    rawPayload = base64UrlDecode(payloadPart);
  } catch {
    throw new Error('The payload segment is not valid base64url.');
  }

  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = JSON.parse(rawHeader);
  } catch {
    throw new Error('The decoded header is not valid JSON.');
  }
  try {
    payload = JSON.parse(rawPayload);
  } catch {
    throw new Error('The decoded payload is not valid JSON.');
  }

  return { header, payload, signature, rawHeader, rawPayload };
}

export function formatUnixTime(value: unknown): string {
  if (typeof value !== 'number') return String(value);
  const date = new Date(value * 1000);
  if (isNaN(date.getTime())) return String(value);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** Build a friendly list of claims from a payload. */
export function describeClaims(payload: Record<string, unknown>): JwtClaimInfo[] {
  return Object.entries(payload).map(([key, rawValue]) => {
    let display: string;
    if (TIME_CLAIMS.has(key)) {
      display = formatUnixTime(rawValue);
    } else if (typeof rawValue === 'object' && rawValue !== null) {
      display = JSON.stringify(rawValue);
    } else {
      display = String(rawValue);
    }
    return {
      key,
      label: STANDARD_CLAIM_LABELS[key] ?? key,
      rawValue,
      display,
    };
  });
}

export type TokenTimeStatus =
  | { kind: 'valid'; detail: string }
  | { kind: 'expired'; detail: string }
  | { kind: 'not-yet-valid'; detail: string }
  | { kind: 'no-expiry'; detail: string };

function humanizeDuration(seconds: number): string {
  const abs = Math.abs(seconds);
  const days = Math.floor(abs / 86400);
  const hours = Math.floor((abs % 86400) / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes || parts.length === 0) parts.push(`${minutes}m`);
  return parts.join(' ');
}

export function getTokenTimeStatus(payload: Record<string, unknown>): TokenTimeStatus {
  const now = Math.floor(Date.now() / 1000);
  const exp = typeof payload.exp === 'number' ? payload.exp : undefined;
  const nbf = typeof payload.nbf === 'number' ? payload.nbf : undefined;

  if (nbf !== undefined && now < nbf) {
    return {
      kind: 'not-yet-valid',
      detail: `Becomes valid in ${humanizeDuration(nbf - now)} (nbf: ${formatUnixTime(nbf)}).`,
    };
  }

  if (exp === undefined) {
    return { kind: 'no-expiry', detail: 'No "exp" claim present — this token has no expiration time.' };
  }

  if (now >= exp) {
    return { kind: 'expired', detail: `Expired ${humanizeDuration(now - exp)} ago (exp: ${formatUnixTime(exp)}).` };
  }

  return { kind: 'valid', detail: `Expires in ${humanizeDuration(exp - now)} (exp: ${formatUnixTime(exp)}).` };
}

export function createExampleToken(): string {
  const enc = (obj: Record<string, unknown>) => {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: '1234567890',
    name: 'Ada Lovelace',
    email: 'ada@microfree.store',
    role: 'admin',
    iss: 'https://microfree.store',
    aud: 'microfree-client',
    iat: now - 3600,
    nbf: now - 3600,
    exp: now + 3600,
    jti: 'a1b2c3d4-0001',
  };
  return `${enc(header)}.${enc(payload)}.sIgNaTuReExAmPlEnOtVeRiFiEd`;
}
