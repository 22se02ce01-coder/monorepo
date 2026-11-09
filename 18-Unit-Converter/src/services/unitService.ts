// Universal unit conversion service.
// Factor-based categories convert through a base unit (value_in_base = value * factor).
// Temperature uses explicit formulas via Celsius as the pivot.

export interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  factor: number; // value in base unit = input * factor (ignored for temperature)
}

export interface CategoryDef {
  id: string;
  name: string;
  baseNote: string;
  units: UnitDef[];
  isTemperature?: boolean;
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'length',
    name: 'Length',
    baseNote: 'All lengths are converted through meters (SI base unit).',
    units: [
      { id: 'mm', name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { id: 'm', name: 'Meter', symbol: 'm', factor: 1 },
      { id: 'km', name: 'Kilometer', symbol: 'km', factor: 1000 },
      { id: 'in', name: 'Inch', symbol: 'in', factor: 0.0254 },
      { id: 'ft', name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { id: 'yd', name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { id: 'mi', name: 'Mile', symbol: 'mi', factor: 1609.344 },
      { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
    ],
  },
  {
    id: 'weight',
    name: 'Weight / Mass',
    baseNote: 'All masses are converted through kilograms (SI base unit).',
    units: [
      { id: 'mg', name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      { id: 'g', name: 'Gram', symbol: 'g', factor: 0.001 },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1 },
      { id: 't', name: 'Metric Tonne', symbol: 't', factor: 1000 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', factor: 0.028349523125 },
      { id: 'lb', name: 'Pound', symbol: 'lb', factor: 0.45359237 },
      { id: 'st', name: 'Stone', symbol: 'st', factor: 6.35029318 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    baseNote: 'Temperature uses exact formulas (via Celsius), not linear factors.',
    isTemperature: true,
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', factor: 1 },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { id: 'k', name: 'Kelvin', symbol: 'K', factor: 1 },
      { id: 'r', name: 'Rankine', symbol: '°R', factor: 1 },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    baseNote: 'All areas are converted through square meters.',
    units: [
      { id: 'mm2', name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      { id: 'cm2', name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      { id: 'm2', name: 'Square Meter', symbol: 'm²', factor: 1 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', factor: 10000 },
      { id: 'km2', name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      { id: 'in2', name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
      { id: 'ft2', name: 'Square Foot', symbol: 'ft²', factor: 0.09290304 },
      { id: 'yd2', name: 'Square Yard', symbol: 'yd²', factor: 0.83612736 },
      { id: 'ac', name: 'Acre', symbol: 'ac', factor: 4046.8564224 },
      { id: 'mi2', name: 'Square Mile', symbol: 'mi²', factor: 2589988.110336 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    baseNote: 'All volumes are converted through liters.',
    units: [
      { id: 'ml', name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      { id: 'l', name: 'Liter', symbol: 'L', factor: 1 },
      { id: 'm3', name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      { id: 'cm3', name: 'Cubic Centimeter', symbol: 'cm³', factor: 0.001 },
      { id: 'ft3', name: 'Cubic Foot', symbol: 'ft³', factor: 28.316846592 },
      { id: 'in3', name: 'Cubic Inch', symbol: 'in³', factor: 0.016387064 },
      { id: 'galus', name: 'Gallon (US)', symbol: 'gal', factor: 3.785411784 },
      { id: 'galuk', name: 'Gallon (UK)', symbol: 'gal', factor: 4.54609 },
      { id: 'qt', name: 'Quart (US)', symbol: 'qt', factor: 0.946352946 },
      { id: 'pt', name: 'Pint (US)', symbol: 'pt', factor: 0.473176473 },
      { id: 'cup', name: 'Cup (US)', symbol: 'cup', factor: 0.2365882365 },
      { id: 'floz', name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735295625 },
      { id: 'tbsp', name: 'Tablespoon (US)', symbol: 'tbsp', factor: 0.01478676478125 },
      { id: 'tsp', name: 'Teaspoon (US)', symbol: 'tsp', factor: 0.00492892159375 },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    baseNote: 'All speeds are converted through meters per second.',
    units: [
      { id: 'mps', name: 'Meter / second', symbol: 'm/s', factor: 1 },
      { id: 'kmh', name: 'Kilometer / hour', symbol: 'km/h', factor: 0.2777777777777778 },
      { id: 'mph', name: 'Mile / hour', symbol: 'mph', factor: 0.44704 },
      { id: 'fps', name: 'Foot / second', symbol: 'ft/s', factor: 0.3048 },
      { id: 'kn', name: 'Knot', symbol: 'kn', factor: 0.5144444444444445 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    baseNote: 'All durations are converted through seconds. Month = 30 days, Year = 365 days.',
    units: [
      { id: 'ms', name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      { id: 's', name: 'Second', symbol: 's', factor: 1 },
      { id: 'min', name: 'Minute', symbol: 'min', factor: 60 },
      { id: 'h', name: 'Hour', symbol: 'h', factor: 3600 },
      { id: 'd', name: 'Day', symbol: 'd', factor: 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', factor: 604800 },
      { id: 'mo', name: 'Month (30d)', symbol: 'mo', factor: 2592000 },
      { id: 'yr', name: 'Year (365d)', symbol: 'yr', factor: 31536000 },
    ],
  },
  {
    id: 'data',
    name: 'Data Storage',
    baseNote: 'Converted through bytes. Decimal (KB=1000) and binary (KiB=1024) units both included.',
    units: [
      { id: 'bit', name: 'Bit', symbol: 'bit', factor: 0.125 },
      { id: 'byte', name: 'Byte', symbol: 'B', factor: 1 },
      { id: 'kb', name: 'Kilobyte', symbol: 'KB', factor: 1000 },
      { id: 'mb', name: 'Megabyte', symbol: 'MB', factor: 1000000 },
      { id: 'gb', name: 'Gigabyte', symbol: 'GB', factor: 1000000000 },
      { id: 'tb', name: 'Terabyte', symbol: 'TB', factor: 1000000000000 },
      { id: 'pb', name: 'Petabyte', symbol: 'PB', factor: 1000000000000000 },
      { id: 'kib', name: 'Kibibyte', symbol: 'KiB', factor: 1024 },
      { id: 'mib', name: 'Mebibyte', symbol: 'MiB', factor: 1048576 },
      { id: 'gib', name: 'Gibibyte', symbol: 'GiB', factor: 1073741824 },
      { id: 'tib', name: 'Tebibyte', symbol: 'TiB', factor: 1099511627776 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    baseNote: 'All energy values are converted through joules.',
    units: [
      { id: 'j', name: 'Joule', symbol: 'J', factor: 1 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      { id: 'cal', name: 'Calorie', symbol: 'cal', factor: 4.184 },
      { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      { id: 'wh', name: 'Watt-hour', symbol: 'Wh', factor: 3600 },
      { id: 'kwh', name: 'Kilowatt-hour', symbol: 'kWh', factor: 3600000 },
      { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', factor: 1055.05585262 },
      { id: 'ftlb', name: 'Foot-pound', symbol: 'ft·lb', factor: 1.3558179483314004 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure',
    baseNote: 'All pressures are converted through pascals.',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', factor: 1 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', factor: 100000 },
      { id: 'psi', name: 'Pound / inch²', symbol: 'psi', factor: 6894.757293168 },
      { id: 'atm', name: 'Atmosphere', symbol: 'atm', factor: 101325 },
      { id: 'torr', name: 'Torr (mmHg)', symbol: 'mmHg', factor: 133.322387415 },
      { id: 'inhg', name: 'Inch of Mercury', symbol: 'inHg', factor: 3386.389 },
    ],
  },
];

// --- Temperature conversions (pivot: Celsius) ---
function toCelsius(value: number, unitId: string): number {
  switch (unitId) {
    case 'c':
      return value;
    case 'f':
      return (value - 32) * (5 / 9);
    case 'k':
      return value - 273.15;
    case 'r':
      return (value - 491.67) * (5 / 9);
    default:
      return value;
  }
}

function fromCelsius(celsius: number, unitId: string): number {
  switch (unitId) {
    case 'c':
      return celsius;
    case 'f':
      return celsius * (9 / 5) + 32;
    case 'k':
      return celsius + 273.15;
    case 'r':
      return (celsius + 273.15) * (9 / 5);
    default:
      return celsius;
  }
}

export function getCategory(id: string): CategoryDef {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export function convert(
  value: number,
  fromId: string,
  toId: string,
  category: CategoryDef
): number {
  if (category.isTemperature) {
    return fromCelsius(toCelsius(value, fromId), toId);
  }
  const from = category.units.find((u) => u.id === fromId);
  const to = category.units.find((u) => u.id === toId);
  if (!from || !to) return NaN;
  const base = value * from.factor;
  return base / to.factor;
}

// Format a number with sensible precision and no float noise / trailing zeros.
export function formatNumber(value: number): string {
  if (!isFinite(value)) return '—';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  let out: string;
  if (abs !== 0 && (abs < 1e-6 || abs >= 1e15)) {
    out = value.toExponential(6);
  } else {
    // up to 10 significant-ish digits, then strip trailing zeros
    out = value.toPrecision(12);
    if (out.indexOf('e') === -1 && out.indexOf('.') !== -1) {
      out = out.replace(/0+$/, '').replace(/\.$/, '');
    }
  }
  return out;
}
