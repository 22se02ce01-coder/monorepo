import React from 'react';
import { Zap, Ruler, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pick a Category',
      desc: 'Choose from length, weight, temperature, area, volume, speed, time, data, energy or pressure.',
    },
    {
      step: '02',
      title: 'Enter a Value',
      desc: 'Type the amount and select the unit you are converting from and the unit you want to convert to.',
    },
    {
      step: '03',
      title: 'Read the Result',
      desc: 'The converted value appears instantly, along with a quick-reference table showing every unit in the category.',
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      "q": "How accurate are the conversions?",
      "a": "The converter uses internationally defined factors, many of which are exact, such as 1 inch = 0.0254 meters and 1 pound = 0.45359237 kilograms. Results are displayed with up to twelve significant digits, which is far more precision than everyday measurements need."
    },
    {
      "q": "How does temperature conversion work?",
      "a": "Temperature scales have different zero points, so the tool uses formulas instead of factors. It converts your value to Celsius first and then to the target scale, for example °F = °C × 9/5 + 32 and K = °C + 273.15. Celsius, Fahrenheit, Kelvin and Rankine are supported."
    },
    {
      "q": "Why does converting 10 °C give 50 °F instead of 18 °F?",
      "a": "The converter converts temperature readings, not temperature differences. A reading of 10 °C equals 50 °F, but a change of 10 °C equals a change of 18 °F. To convert a difference, multiply by 9/5 instead."
    },
    {
      "q": "What is the difference between KB and KiB?",
      "a": "Decimal units use powers of 1000 (1 KB = 1,000 bytes, 1 GB = 1,000,000,000 bytes), which is how storage manufacturers label capacity. Binary units use powers of 1024 (1 KiB = 1,024 bytes, 1 GiB = 1,073,741,824 bytes), which many operating systems use. That is why a 500 GB drive is shown as about 465.66 GiB."
    },
    {
      "q": "Are the cups, pints and gallons US or UK measures?",
      "a": "Cups, pints, quarts, fluid ounces, tablespoons and teaspoons are US customary measures. Gallons are offered in both versions: a US gallon is 3.785411784 liters and a UK gallon is 4.54609 liters."
    },
    {
      "q": "Is the calorie the same as the Calorie on food labels?",
      "a": "No. The calorie in this tool is the small calorie, exactly 4.184 joules. Food labels use the kilocalorie (kcal), equal to 1,000 small calories or 4,184 joules, which the tool also lists."
    },
    {
      "q": "How are months and years handled in time conversions?",
      "a": "For simplicity a month is treated as exactly 30 days and a year as exactly 365 days. Real calendar months and leap years vary, so use a date calculator when you need exact calendar arithmetic."
    },
    {
      "q": "Why do some results use scientific notation?",
      "a": "Values smaller than 0.000001 or of 10^15 and above are shown in scientific notation, such as 8.000000e+15 bits in a petabyte, so that significant digits are not lost or hidden. Everyday values are shown as plain decimals with trailing zeros removed."
    },
    {
      "q": "Can I see a value in every unit at once?",
      "a": "Yes. The reference table under the result lists your value converted into every unit of the selected category, and the target unit is highlighted. The copy button copies the full equation for the selected pair."
    },
    {
      "q": "Is my data sent to a server?",
      "a": "No. Every calculation runs locally in your browser using a fixed table of conversion factors. Nothing you enter is uploaded, logged or stored."
    }
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Accurate Metric & Imperial Conversions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Convert Units Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Convert across ten measurement categories with standardized factors — instantly and privately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-brand-200 hover:shadow-elevated transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-brand-600 font-mono">{s.step}</span>
                <Ruler className="h-6 w-6 text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div className="text-sm text-blue-900 space-y-1">
          <h4 className="font-bold text-sm text-blue-950">Standardized & Private</h4>
          <p>
            Conversion factors follow SI and international definitions, and every calculation happens in your browser. No value you enter is ever uploaded to a server.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-4 text-base text-slate-700 leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">A Practical Guide to Unit Conversion</h2>
        <p>Units are agreements about how big a measurement is. Most of the world uses the metric system (SI), the United States still uses US customary units for everyday life, and the United Kingdom mixes both: road signs in miles, food labels in grams and body weight often in stone. Science, cooking, travel, engineering and online shopping all regularly push us across those boundaries, and a small mistake can mean a ruined recipe, a wrongly sized part or a misread tyre pressure. This converter covers ten categories with exact, published definitions so you can switch between systems with confidence.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">How the converter works</h3>
        <p>For nine of the ten categories, every unit is defined by a single factor relative to a base unit: meters for length, kilograms for mass, square meters for area, liters for volume, meters per second for speed, seconds for time, bytes for data, joules for energy and pascals for pressure. To convert, the tool multiplies your value by the factor of the source unit to reach the base unit, then divides by the factor of the target unit. Because every unit uses the same route, any pair of units in a category converts consistently, and swapping the direction always gives the inverse result.</p>
        <p>Many of these factors are exact by international agreement. One inch is exactly 0.0254 meters, one pound is exactly 0.45359237 kilograms, one US gallon is exactly 3.785411784 liters and one standard atmosphere is exactly 101,325 pascals. The converter uses these definitions rather than rounded approximations.</p>
        <p>Temperature is different. Celsius, Fahrenheit, Kelvin and Rankine do not share a common zero point, so a simple factor does not work. The tool converts your value to Celsius with the correct formula, then from Celsius to the target scale. For example, °F = °C × 9/5 + 32 and K = °C + 273.15.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Worked examples</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Running distance:</strong> 5 km = 3.10686 mi, so a "5K" is just over three miles.</li>
          <li><strong className="font-semibold text-slate-900">Body weight:</strong> 70 kg = 154.324 lb.</li>
          <li><strong className="font-semibold text-slate-900">Body temperature:</strong> 98.6 °F = 37 °C.</li>
          <li><strong className="font-semibold text-slate-900">Cooking:</strong> 2 US cups = 473.176 mL.</li>
          <li><strong className="font-semibold text-slate-900">Hard drive capacity:</strong> 500 GB = 465.661 GiB. This is why a new "500 GB" drive looks smaller in your operating system: the manufacturer counts in powers of 1000, many systems count in powers of 1024.</li>
          <li><strong className="font-semibold text-slate-900">Driving speed:</strong> 100 km/h = 62.1371 mph.</li>
          <li><strong className="font-semibold text-slate-900">Energy:</strong> 1 kWh = 3,412.14 BTU, useful when comparing electric heaters with gas appliances.</li>
          <li><strong className="font-semibold text-slate-900">Tyre pressure:</strong> 32 psi = 220.632 kPa = 2.20632 bar.</li>
          <li><strong className="font-semibold text-slate-900">Land:</strong> 1 acre = 4,046.86 m², or about 0.405 hectares.</li>
        </ul>
        <p>Below the main result, the reference table shows your value converted into every unit in the selected category at once, which is often the quickest way to answer "how much is that in…" questions without switching units repeatedly. The copy button copies the full equation, for example "1 m = 3.28083989501 ft", so it can be pasted into a document or message.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Precision and number formatting</h3>
        <p>Results are shown with up to twelve significant digits, with trailing zeros removed. Very small values (below 0.000001) and very large values (10^15 and above) switch to scientific notation, such as 8.000000e+15 for the number of bits in a petabyte, so that significant digits are not hidden. For everyday use you will usually round the result yourself; how much precision you keep should match how precise the original measurement was. A board measured to the nearest centimeter does not become more accurate because its length in inches has ten decimal places.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Common mistakes to avoid</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">US versus UK volumes.</strong> A US gallon is about 3.785 liters, while a UK (imperial) gallon is 4.546 liters. The tool lists both separately. Its cups, pints, quarts, fluid ounces, tablespoons and teaspoons are US customary measures; a US cup is about 236.6 mL, not the 250 mL "metric cup" used in some recipes.</li>
          <li><strong className="font-semibold text-slate-900">Converting a temperature change.</strong> The converter converts temperature readings. A rise of 10 °C is a rise of 18 °F, but entering 10 °C returns 50 °F, because that is the reading. For differences, multiply by 9/5 instead.</li>
          <li><strong className="font-semibold text-slate-900">Decimal versus binary data units.</strong> KB, MB, GB and TB are powers of 1000; KiB, MiB, GiB and TiB are powers of 1024. Mixing them up produces errors of around 7% at the gigabyte level and more at larger sizes.</li>
          <li><strong className="font-semibold text-slate-900">Bits versus bytes.</strong> Internet speeds are usually quoted in bits per second, file sizes in bytes. One byte is eight bits.</li>
          <li><strong className="font-semibold text-slate-900">Calories on food labels.</strong> The kilocalorie (kcal) is what food labels call a "Calorie". The tool's calorie is the small calorie, defined as exactly 4.184 joules.</li>
          <li><strong className="font-semibold text-slate-900">Months and years in the time category.</strong> A month is treated as 30 days and a year as 365 days. Real calendar months and leap years vary, so use a date calculator for exact calendar arithmetic.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">What is included</h3>
        <p>The ten categories are length (millimeters to nautical miles), weight and mass (milligrams to metric tonnes, ounces, pounds and stone), temperature (Celsius, Fahrenheit, Kelvin and Rankine), area (square millimeters to square miles, hectares and acres), volume (milliliters to cubic meters and US kitchen measures), speed (m/s, km/h, mph, ft/s and knots), time (milliseconds to years), data storage (bits to petabytes and tebibytes), energy (joules, calories, watt-hours, BTU and foot-pounds) and pressure (pascals, bar, psi, atmospheres, mmHg and inches of mercury).</p>
        <p>The tool does not handle currencies, cooking conversions between volume and weight (which depend on the ingredient's density) or compound engineering units outside these lists. It also does not check physical limits, so it will accept a temperature below absolute zero.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Privacy</h3>
        <p>Every calculation runs locally in your browser using plain JavaScript and a fixed table of conversion factors. Values you enter are not uploaded, logged or stored, and no network connection is needed to perform a conversion once the page has loaded.</p>
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-brand-600" />
              </summary>
              <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
