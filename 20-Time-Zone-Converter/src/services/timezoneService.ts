export interface ZoneInfo {
  id: string; // IANA identifier, e.g. "America/New_York"
  city: string;
  country: string;
}

// Curated list of major IANA time zones with friendly labels.
export const ZONES: ZoneInfo[] = [
  { id: 'Pacific/Honolulu', city: 'Honolulu', country: 'United States' },
  { id: 'America/Anchorage', city: 'Anchorage', country: 'United States' },
  { id: 'America/Los_Angeles', city: 'Los Angeles', country: 'United States' },
  { id: 'America/Vancouver', city: 'Vancouver', country: 'Canada' },
  { id: 'America/Denver', city: 'Denver', country: 'United States' },
  { id: 'America/Phoenix', city: 'Phoenix', country: 'United States' },
  { id: 'America/Chicago', city: 'Chicago', country: 'United States' },
  { id: 'America/Mexico_City', city: 'Mexico City', country: 'Mexico' },
  { id: 'America/New_York', city: 'New York', country: 'United States' },
  { id: 'America/Toronto', city: 'Toronto', country: 'Canada' },
  { id: 'America/Bogota', city: 'Bogotá', country: 'Colombia' },
  { id: 'America/Sao_Paulo', city: 'São Paulo', country: 'Brazil' },
  { id: 'America/Argentina/Buenos_Aires', city: 'Buenos Aires', country: 'Argentina' },
  { id: 'Atlantic/Reykjavik', city: 'Reykjavík', country: 'Iceland' },
  { id: 'Europe/London', city: 'London', country: 'United Kingdom' },
  { id: 'Europe/Dublin', city: 'Dublin', country: 'Ireland' },
  { id: 'Europe/Lisbon', city: 'Lisbon', country: 'Portugal' },
  { id: 'Europe/Paris', city: 'Paris', country: 'France' },
  { id: 'Europe/Madrid', city: 'Madrid', country: 'Spain' },
  { id: 'Europe/Berlin', city: 'Berlin', country: 'Germany' },
  { id: 'Europe/Rome', city: 'Rome', country: 'Italy' },
  { id: 'Europe/Amsterdam', city: 'Amsterdam', country: 'Netherlands' },
  { id: 'Europe/Zurich', city: 'Zürich', country: 'Switzerland' },
  { id: 'Europe/Athens', city: 'Athens', country: 'Greece' },
  { id: 'Europe/Istanbul', city: 'Istanbul', country: 'Türkiye' },
  { id: 'Europe/Moscow', city: 'Moscow', country: 'Russia' },
  { id: 'Africa/Lagos', city: 'Lagos', country: 'Nigeria' },
  { id: 'Africa/Cairo', city: 'Cairo', country: 'Egypt' },
  { id: 'Africa/Johannesburg', city: 'Johannesburg', country: 'South Africa' },
  { id: 'Africa/Nairobi', city: 'Nairobi', country: 'Kenya' },
  { id: 'Asia/Jerusalem', city: 'Jerusalem', country: 'Israel' },
  { id: 'Asia/Riyadh', city: 'Riyadh', country: 'Saudi Arabia' },
  { id: 'Asia/Dubai', city: 'Dubai', country: 'United Arab Emirates' },
  { id: 'Asia/Tehran', city: 'Tehran', country: 'Iran' },
  { id: 'Asia/Karachi', city: 'Karachi', country: 'Pakistan' },
  { id: 'Asia/Kolkata', city: 'Mumbai · Delhi', country: 'India' },
  { id: 'Asia/Kathmandu', city: 'Kathmandu', country: 'Nepal' },
  { id: 'Asia/Dhaka', city: 'Dhaka', country: 'Bangladesh' },
  { id: 'Asia/Bangkok', city: 'Bangkok', country: 'Thailand' },
  { id: 'Asia/Jakarta', city: 'Jakarta', country: 'Indonesia' },
  { id: 'Asia/Singapore', city: 'Singapore', country: 'Singapore' },
  { id: 'Asia/Hong_Kong', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'Asia/Shanghai', city: 'Shanghai · Beijing', country: 'China' },
  { id: 'Asia/Taipei', city: 'Taipei', country: 'Taiwan' },
  { id: 'Asia/Seoul', city: 'Seoul', country: 'South Korea' },
  { id: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan' },
  { id: 'Australia/Perth', city: 'Perth', country: 'Australia' },
  { id: 'Australia/Adelaide', city: 'Adelaide', country: 'Australia' },
  { id: 'Australia/Sydney', city: 'Sydney', country: 'Australia' },
  { id: 'Australia/Brisbane', city: 'Brisbane', country: 'Australia' },
  { id: 'Pacific/Auckland', city: 'Auckland', country: 'New Zealand' },
  { id: 'Pacific/Fiji', city: 'Suva', country: 'Fiji' },
  { id: 'UTC', city: 'UTC', country: 'Coordinated Universal Time' },
];

export function getLocalZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

export function zoneLabel(id: string): ZoneInfo {
  const found = ZONES.find((z) => z.id === id);
  if (found) return found;
  const city = id.split('/').pop()?.replace(/_/g, ' ') || id;
  return { id, city, country: id.split('/')[0] || '' };
}

/**
 * Given a wall-clock date/time entered as being in `sourceZone`, produce the
 * absolute UTC instant (epoch ms) that it represents. DST-aware.
 */
export function wallTimeToInstant(
  year: number,
  month: number, // 1-12
  day: number,
  hour: number,
  minute: number,
  sourceZone: string
): number {
  // First guess: treat the wall time as if it were UTC.
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  // Find what that guessed instant looks like in the source zone,
  // then correct by the difference.
  const offset = getZoneOffsetMinutes(guess, sourceZone);
  return guess - offset * 60000;
}

const partsCache = new Map<string, Intl.DateTimeFormat>();
function fmt(zone: string, opts: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = zone + JSON.stringify(opts);
  let f = partsCache.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { ...opts, timeZone: zone });
    partsCache.set(key, f);
  }
  return f;
}

/**
 * Offset in minutes (zone - UTC) for a given instant, DST-aware.
 */
export function getZoneOffsetMinutes(instant: number, zone: string): number {
  const dtf = fmt(zone, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = dtf.formatToParts(new Date(instant));
  const map: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = parseInt(p.value, 10);
  }
  let hour = map.hour;
  if (hour === 24) hour = 0;
  const asUTC = Date.UTC(map.year, map.month - 1, map.day, hour, map.minute, map.second);
  return Math.round((asUTC - instant) / 60000);
}

export function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function getAbbreviation(instant: number, zone: string): string {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'short',
      hour: '2-digit',
    });
    const part = dtf.formatToParts(new Date(instant)).find((p) => p.type === 'timeZoneName');
    return part?.value || '';
  } catch {
    return '';
  }
}

export interface ZoneDisplay {
  id: string;
  city: string;
  country: string;
  time: string;
  date: string;
  weekday: string;
  offset: string;
  abbr: string;
  dayDiff: number; // relative to reference date string
}

function civilDateKey(instant: number, zone: string): string {
  const dtf = fmt(zone, { year: 'numeric', month: '2-digit', day: '2-digit' });
  const parts = dtf.formatToParts(new Date(instant));
  const map: Record<string, string> = {};
  for (const p of parts) if (p.type !== 'literal') map[p.type] = p.value;
  return `${map.year}-${map.month}-${map.day}`;
}

export function describeZone(
  instant: number,
  zone: string,
  hour12: boolean,
  referenceZone: string
): ZoneDisplay {
  const info = zoneLabel(zone);
  const timeFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  });
  const dateFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const weekdayFmt = new Intl.DateTimeFormat('en-US', { timeZone: zone, weekday: 'long' });

  const refKey = civilDateKey(instant, referenceZone);
  const thisKey = civilDateKey(instant, zone);
  const refDate = new Date(refKey + 'T00:00:00Z').getTime();
  const thisDate = new Date(thisKey + 'T00:00:00Z').getTime();
  const dayDiff = Math.round((thisDate - refDate) / 86400000);

  return {
    id: zone,
    city: info.city,
    country: info.country,
    time: timeFmt.format(new Date(instant)),
    date: dateFmt.format(new Date(instant)),
    weekday: weekdayFmt.format(new Date(instant)),
    offset: formatOffset(getZoneOffsetMinutes(instant, zone)),
    abbr: getAbbreviation(instant, zone),
    dayDiff,
  };
}
