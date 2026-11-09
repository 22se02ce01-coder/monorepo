import React from 'react';
import { Globe2, Clock, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Set the Source Time',
      desc: 'Pick a home time zone, date, and time — or just keep "Now" to work from the current moment in your local zone.',
    },
    {
      step: '02',
      title: 'Add Cities to Compare',
      desc: 'Search for any major city or region and add it to your comparison board. Stack as many zones as your meeting needs.',
    },
    {
      step: '03',
      title: 'Read the Results',
      desc: 'See each city’s local time, its daylight-saving-aware UTC offset, and a clear +1 / −1 day marker when the calendar date rolls over.',
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      "q": "Does this account for daylight saving time?",
      "a": "Yes. Offsets are calculated for the exact date and time you choose using the IANA time zone rules built into your browser. A conversion for a July date and a January date in the same city can therefore correctly differ by an hour. No fixed offsets are hard-coded."
    },
    {
      "q": "Why does a city show \"+1 day\" or \"−1 day\"?",
      "a": "When two places are far apart, the local date in the target city can fall on the day after or before your source date. The badge warns you so you do not schedule a call on the wrong day."
    },
    {
      "q": "What is the difference between a zone abbreviation and a UTC offset?",
      "a": "An abbreviation such as EST or CET is a human label, and some abbreviations mean different things in different countries. The UTC offset, such as UTC+05:30, is the exact difference from Coordinated Universal Time at that moment, which is why the tool always shows it."
    },
    {
      "q": "Why do some cities show GMT+5:30 instead of a name like IST?",
      "a": "Short zone names come from your browser's built-in formatting. For many zones the browser provides a generic label based on the offset rather than a local abbreviation. The UTC offset shown next to it is always exact."
    },
    {
      "q": "What is the difference between Live Now and Pick Date & Time?",
      "a": "Live Now shows the current moment in every city and updates every second, like a world clock. Pick Date & Time lets you enter a specific date and time in your source zone, which is what you need to plan a meeting or a launch."
    },
    {
      "q": "How do I make another city the source time?",
      "a": "Use the swap button on that city's card. It becomes the source zone, and the previous source moves onto the comparison board."
    },
    {
      "q": "Why is my city not in the list?",
      "a": "The list is curated to over fifty major cities and regions plus UTC, covering the main offsets around the world. If your city is missing, pick a listed city in the same time zone. You can search by city, country or IANA zone name."
    },
    {
      "q": "What happens with a time that is skipped or repeated when clocks change?",
      "a": "When clocks spring forward, some local times never occur, and when they fall back, some occur twice. The converter resolves such a time to a nearby instant, so double-check any meeting scheduled within an hour of a clock change."
    },
    {
      "q": "Why does the gap between two cities change during the year?",
      "a": "Countries change their clocks on different dates, and some never change them. The United States and Europe switch on different weekends, the southern hemisphere switches in the opposite season, and India and Japan do not use daylight saving at all."
    },
    {
      "q": "Is my location or schedule sent anywhere?",
      "a": "No. Your time zone is read from your browser settings, and all conversions run locally with the browser's Intl date engine. Your chosen cities, dates and times are not sent to any server or stored."
    }
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Globe2 className="h-3.5 w-3.5" /> Daylight-Saving-Aware World Clock
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Convert Time Across Zones
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Plan meetings, calls, and launches across continents without the usual +/- an hour guesswork.
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
                <Clock className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Accurate, Private, Offline-Capable</h4>
          <p>
            Conversions rely on the time zone rules already shipped inside your browser, so they stay accurate through daylight-saving transitions without contacting any server. Your schedule data never leaves the device.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-4 text-base text-slate-700 leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">A Practical Guide to Time Zone Conversion</h2>
        <p>Time zones exist so that local clocks roughly follow the sun: noon should be around the middle of the day wherever you are. In practice, the boundaries follow politics more than geography. Countries choose their own offsets, some use half-hour or even 45-minute offsets, and many move their clocks forward and back for daylight saving time on dates that differ from their neighbours. That is why "they're five hours ahead" is only true for part of the year, and why missed meetings across time zones are so common.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Key terms</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">UTC (Coordinated Universal Time)</strong> is the global reference clock. It does not change for daylight saving, which makes it the safest way to state an exact moment.</li>
          <li><strong className="font-semibold text-slate-900">UTC offset</strong> is how far a place's local time is from UTC at a given moment, for example UTC−05:00 for New York in winter or UTC+05:30 for India all year.</li>
          <li><strong className="font-semibold text-slate-900">IANA time zone</strong> is a named region with a complete history of its offset rules, such as America/New_York or Asia/Kolkata. Your browser ships with this database, and this tool relies on it.</li>
          <li><strong className="font-semibold text-slate-900">Daylight saving time (DST)</strong> is the practice of moving clocks forward, usually by one hour, during the warmer months. The northern and southern hemispheres do it in opposite halves of the year, and many countries, including India, Japan and China, do not use it at all.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">How this converter works</h3>
        <p>The tool has two modes. <strong className="font-semibold text-slate-900">Live Now</strong> shows the current moment and updates every second, which turns the page into a world clock. <strong className="font-semibold text-slate-900">Pick Date &amp; Time</strong> lets you choose a date and a time in your source zone, which is what you need for planning. The source zone defaults to the zone your browser reports, or to UTC if that zone is not in the list.</p>
        <p>Behind the scenes, the date and time you enter are turned into one exact instant. Every city on your board is then asked, through the browser's built-in Intl date formatting engine, what its local clock reads at that instant. Because the offset is looked up for that specific date, daylight saving is handled automatically: you never have to remember whether a city is on summer or winter time.</p>
        <p>Each card shows the local time, weekday, date, UTC offset and, where your browser provides one, a short zone name. A "+1 day" or "−1 day" badge appears when the city's date differs from your source date. Use the search box to add cities by city name, country or IANA identifier, the swap button to make any city the new source, and the 12h/24h switch to change the clock format.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Worked examples</h3>
        <p>Suppose you schedule a call for 9:00 AM in New York on a date in July. New York is on daylight time (UTC−04:00), so the call is at 2:00 PM in London (UTC+01:00), 6:30 PM in Mumbai (UTC+05:30) and 10:00 PM in Tokyo (UTC+09:00).</p>
        <p>Move the same 9:00 AM New York call to a date in January. New York is now UTC−05:00 and London UTC+00:00, so London is still 2:00 PM, but Mumbai becomes 7:30 PM and Tokyo 11:00 PM. Neither India nor Japan changed its clocks; the gap changed because New York did.</p>
        <p>Crossing the date line is the other classic trap. At 5:00 PM on a Friday in January in Los Angeles (UTC−08:00), it is already 12:00 noon on Saturday in Sydney (UTC+11:00, Australian summer time). The Sydney card would show the "+1 day" badge, warning you that your Friday afternoon is their Saturday.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Tips for scheduling across time zones</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Always check the actual date.</strong> Convert the specific day of the meeting rather than "a typical Tuesday", especially in March, April, October and November, when clocks change.</li>
          <li><strong className="font-semibold text-slate-900">Watch the transition weeks.</strong> The United States and Europe change their clocks on different weekends, so for a few weeks each spring and autumn the New York to London gap is four hours instead of five.</li>
          <li><strong className="font-semibold text-slate-900">Remember the southern hemisphere.</strong> Sydney and Auckland move their clocks forward when Europe and North America move theirs back, so gaps can change by two hours over the year.</li>
          <li><strong className="font-semibold text-slate-900">Look for neighbours that differ.</strong> Phoenix does not observe daylight saving, unlike Denver; Brisbane does not, unlike Sydney. The tool lists these separately for that reason.</li>
          <li><strong className="font-semibold text-slate-900">Mind the unusual offsets.</strong> India (UTC+05:30), Nepal (UTC+05:45), Iran (UTC+03:30) and Adelaide are not whole hours away from UTC.</li>
          <li><strong className="font-semibold text-slate-900">Write invitations with UTC or both times.</strong> "15:00 UTC (11:00 New York)" leaves far less room for error than "3 PM my time".</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Limitations</h3>
        <p>The city list is curated: it covers over fifty major cities and regions plus UTC, chosen to represent the main offsets around the world. If your city is not listed, choose another city that shares its zone. Short zone names come from your browser; depending on the browser and zone you may see a name such as EST or a generic label such as GMT+5:30, so rely on the UTC offset, which is always exact.</p>
        <p>Times that fall close to a daylight saving change deserve a second look. When clocks spring forward, some local times (for example 2:30 AM) never happen, and when they fall back, some times happen twice. The converter will resolve such a time to a nearby instant, so avoid scheduling anything in those hours. Results also depend on the time zone rules shipped with your browser, so keep the browser updated, as governments occasionally change their rules at short notice.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Privacy</h3>
        <p>All conversions are performed locally by your browser's built-in time zone engine. The cities you add, and the dates and times you enter, are not sent to any server or stored, and no network request is needed to convert a time once the page has loaded.</p>
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
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
