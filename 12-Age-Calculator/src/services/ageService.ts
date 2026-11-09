export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: Date;
  daysUntilNextBirthday: number;
  isBirthdayToday: boolean;
  turningAge: number;
  zodiac: string;
}

/** Parse a YYYY-MM-DD string into a LOCAL date (avoids UTC drift of new Date(str)). */
export function parseLocalDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const d = new Date(year, month - 1, day);
  // Guard against invalid rollovers (e.g. 2023-02-30)
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return null;
  }
  return d;
}

export function formatLocalDate(value: Date): string {
  const y = value.getFullYear();
  const m = String(value.getMonth() + 1).padStart(2, '0');
  const d = String(value.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

const ZODIAC: { name: string; from: [number, number]; to: [number, number] }[] = [
  { name: 'Capricorn', from: [12, 22], to: [1, 19] },
  { name: 'Aquarius', from: [1, 20], to: [2, 18] },
  { name: 'Pisces', from: [2, 19], to: [3, 20] },
  { name: 'Aries', from: [3, 21], to: [4, 19] },
  { name: 'Taurus', from: [4, 20], to: [5, 20] },
  { name: 'Gemini', from: [5, 21], to: [6, 20] },
  { name: 'Cancer', from: [6, 21], to: [7, 22] },
  { name: 'Leo', from: [7, 23], to: [8, 22] },
  { name: 'Virgo', from: [8, 23], to: [9, 22] },
  { name: 'Libra', from: [9, 23], to: [10, 22] },
  { name: 'Scorpio', from: [10, 23], to: [11, 21] },
  { name: 'Sagittarius', from: [11, 22], to: [12, 21] },
];

function getZodiac(month: number, day: number): string {
  for (const sign of ZODIAC) {
    const [fm, fd] = sign.from;
    const [tm, td] = sign.to;
    if (fm === tm) {
      if (month === fm && day >= fd && day <= td) return sign.name;
    } else if (fm > tm) {
      // wraps year boundary (Capricorn)
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return sign.name;
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return sign.name;
    }
  }
  return 'Capricorn';
}

export function calculateAge(dob: Date, asOf: Date): AgeResult {
  // Normalize to midnight to compare whole days
  const birth = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
  const now = new Date(asOf.getFullYear(), asOf.getMonth(), asOf.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  // Math.round (not floor): local-midnight differences can be off by an hour across DST changes.
  const dayDiff = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / msPerDay);

  // Whole calendar months completed since birth.
  let completedMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) completedMonths -= 1;

  // The date exactly `completedMonths` after birth, clamped to the month's last day
  // (e.g. 31 Jan + 1 month = 28/29 Feb), then count the remaining days from there.
  const anchorYear = birth.getFullYear() + Math.floor((birth.getMonth() + completedMonths) / 12);
  const anchorMonth = (birth.getMonth() + completedMonths) % 12;
  const anchor = new Date(
    anchorYear,
    anchorMonth,
    Math.min(birth.getDate(), daysInMonth(anchorYear, anchorMonth))
  );

  const years = Math.floor(completedMonths / 12);
  const months = completedMonths % 12;
  const days = dayDiff(anchor, now);

  const totalDays = dayDiff(birth, now);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalDays * 24 * 60;

  // Next birthday relative to "now"
  let nbYear = now.getFullYear();
  let nextBirthday = new Date(nbYear, birth.getMonth(), birth.getDate());
  const isBirthdayToday =
    now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate();
  if (nextBirthday.getTime() <= now.getTime() && !isBirthdayToday) {
    nbYear += 1;
    nextBirthday = new Date(nbYear, birth.getMonth(), birth.getDate());
  } else if (nextBirthday.getTime() < now.getTime()) {
    nbYear += 1;
    nextBirthday = new Date(nbYear, birth.getMonth(), birth.getDate());
  }

  const daysUntilNextBirthday = isBirthdayToday
    ? 0
    : Math.ceil((nextBirthday.getTime() - now.getTime()) / msPerDay);

  const turningAge = nextBirthday.getFullYear() - birth.getFullYear();

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    nextBirthday,
    daysUntilNextBirthday,
    isBirthdayToday,
    turningAge,
    zodiac: getZodiac(birth.getMonth() + 1, birth.getDate()),
  };
}
