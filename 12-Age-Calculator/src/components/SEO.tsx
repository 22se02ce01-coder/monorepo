import React from 'react';
import { CalendarDays, Cake, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter Date of Birth',
      desc: 'Pick your birth date from the calendar. Everything is computed locally — your date never leaves the page.',
    },
    {
      step: '02',
      title: 'Choose the "Age As Of" Date',
      desc: 'By default we use today, but you can calculate your age on any past or future date, such as a specific anniversary.',
    },
    {
      step: '03',
      title: 'Read Your Exact Age',
      desc: 'Instantly see years, months, and days, total days lived, and the countdown to your next birthday.',
    },
  ];

  const faqs = [
    {
      q: "How is the exact age calculated?",
      a: "The calculator counts full calendar years first, then the remaining whole months, then counts the leftover days from your most recent “month-birthday”. If that day does not exist in a short month (for example the 31st in February), the last day of that month is used, so the result never goes negative. This matches how people naturally state age, for example “36 years, 5 months and 25 days”.",
    },
    {
      q: "Does the calculator handle leap years correctly?",
      a: "Yes. Day counts use the real length of each calendar month, including 29 days in February of a leap year, so totals such as days lived are accurate across leap-year boundaries.",
    },
    {
      q: "I was born on 29 February. When is my birthday counted?",
      a: "In leap years your birthday falls on 29 February as usual. In common years there is no 29 February, so the next-birthday countdown rolls over to 1 March. Legal conventions for leap-day birthdays vary by country, so check local rules if the exact date matters for paperwork.",
    },
    {
      q: "Why can I set an “age as of” date?",
      a: "It is useful for planning and paperwork, such as checking how old someone will be on an exam date, an application deadline or a retirement date, or how old they were on a past event. Set any date on or after the date of birth and the age recalculates instantly.",
    },
    {
      q: "What do total days, weeks, months and hours mean?",
      a: "Total days is the number of whole days between the date of birth and the “age as of” date. Total weeks is that figure divided by seven and rounded down. Total months is completed years × 12 plus the extra completed months. Total hours is total days × 24, so it counts whole days rather than the actual time of birth.",
    },
    {
      q: "Does the calculator use my time of birth or time zone?",
      a: "No. It works with calendar dates only, read in your device’s local time zone, and treats both dates as starting at midnight. If you need age to the hour, for example for a newborn, you would need to account for the time of birth separately.",
    },
    {
      q: "Why does the calculator show an error message?",
      a: "An error appears if either date is missing or invalid, or if the date of birth is later than the “age as of” date. Correct the date and the results return immediately.",
    },
    {
      q: "Can different age calculators give slightly different answers?",
      a: "Yes. Month lengths vary, so tools can differ in how they count the leftover days when the birth day is later in the month than the target day. Total days lived is unambiguous, so it is the best figure to compare if two tools disagree on the months-and-days part.",
    },
    {
      q: "How is the zodiac sign determined?",
      a: "It uses the commonly published Western tropical zodiac date ranges, for example Aries from 21 March to 19 April. Published boundaries can differ by a day between sources, so treat it as a light-hearted extra.",
    },
    {
      q: "Is my date of birth sent anywhere?",
      a: "Never. All date math runs entirely in your browser with JavaScript. Nothing is uploaded, stored on a server or shared with any third party.",
    },
  ];

  const h3 = 'text-lg font-bold text-slate-900 mt-8 mb-3';
  const p = 'text-base text-slate-700 leading-relaxed mb-4';
  const ul = 'list-disc pl-6 space-y-2 text-base text-slate-700 leading-relaxed mb-4';
  const box = 'text-sm bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-slate-800';

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <CalendarDays className="h-3.5 w-3.5" /> Precise Calendar Age Math
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Calculate Your Age
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Find your exact age and next birthday in seconds — down to the day.
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
                <Cake className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Private by Design</h4>
          <p>
            Your date of birth is a sensitive detail. This calculator performs every computation inside your
            browser's memory using native JavaScript date functions. No information is transmitted to our
            servers or any third party.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          Understanding Age Calculation
        </h2>
        <p className={p}>
          Working out how old someone is sounds trivial until you try to do it to the day. Years are easy to
          count, but months have 28, 29, 30 or 31 days, and leap years add an extra day every four years
          (with century exceptions such as 1900). That irregularity is why two people doing the sum in their
          heads can arrive at different answers, and why a calculator that follows the real calendar is
          useful for forms, eligibility checks and simple curiosity.
        </p>

        <h3 className={h3}>How this calculator counts years, months and days</h3>
        <p className={p}>
          The method is the same one most people use on paper, just applied consistently:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-base text-slate-700 leading-relaxed mb-4">
          <li>Subtract the birth year from the target year, the birth month from the target month, and the birth day from the target day.</li>
          <li>If the day difference is negative, take one month away and add the number of days in the calendar month just before the target month.</li>
          <li>If the month difference is then negative, take one year away and add 12 months.</li>
        </ol>
        <p className={p}>
          The result is your age in completed years, completed months and remaining days. Separately, the tool
          counts the exact number of whole days between the two dates, and derives total weeks, months and
          hours from it.
        </p>

        <h3 className={h3}>Worked example: a simple case</h3>
        <div className={box}>
          Date of birth: 15 May 1990 · Age as of: 9 November 2026
        </div>
        <p className={p}>
          From 15 May 1990 to 15 May 2026 is 36 full years. From 15 May to 15 October is 5 more full months.
          From 15 October to 9 November is 25 days (16 days to the end of October, plus 9). The age is
          therefore <strong>36 years, 5 months and 25 days</strong>, and the total number of days lived is
          13,327.
        </p>

        <h3 className={h3}>Worked example: counting across February</h3>
        <div className={box}>
          Date of birth: 20 August 1995 · Age as of: 10 March 2026
        </div>
        <p className={p}>
          The 30th birthday was on 20 August 2025. Counting whole months from there, the last completed month
          ends on 20 February 2026, which is 6 months later. 10 March has not reached the 20th yet, so the
          seventh month is not complete. From 20 February to 10 March is 8 days left in February 2026 (which has
          28 days) plus 10 days in March, or 18 days. The final answer is <strong>30 years, 6 months and 18 days</strong>.
          Had the target year been a leap year, February would have had 29 days and the answer would be 19 days.
        </p>

        <h3 className={h3}>Why the “age as of” date matters</h3>
        <p className={p}>
          Many rules are based on age on a specific date rather than today. Exams and scholarships often set
          an age limit on a cut-off date, school admissions may require a child to have reached a certain age
          by the start of the academic year, and pension or insurance documents may ask for age at a policy
          date. Changing the second date lets you answer those questions directly, including dates in the
          future. You can also use it in reverse, for example to find out how old a grandparent was on their
          wedding day.
        </p>

        <h3 className={h3}>The extra figures: totals and next birthday</h3>
        <p className={p}>
          Alongside the headline age, the tool shows total days, weeks, months and hours. Total days is the most
          precise of these and is ideal for comparing two dates or spotting milestones. The next-birthday card
          tells you which date your next birthday falls on, which weekday that is, how many days remain, and the
          age you will be turning. If the “age as of” date is your birthday, it simply wishes you a happy
          birthday instead of counting down.
        </p>

        <h3 className={h3}>Practical uses</h3>
        <ul className={ul}>
          <li>Checking age eligibility for exams, jobs, sports categories or government schemes.</li>
          <li>Filling in forms that ask for age in years and months.</li>
          <li>Tracking a baby’s or toddler’s age in months for health and development check-ups.</li>
          <li>Planning milestone birthdays with the next-birthday countdown.</li>
          <li>Counting days lived for a personal milestone, such as your 10,000th day.</li>
        </ul>

        <h3 className={h3}>Common mistakes and edge cases</h3>
        <ul className={ul}>
          <li>
            <strong>Dividing days by 365.</strong> Dividing total days by 365 drifts by roughly a day every
            four years because of leap years. Counting calendar years avoids that drift.
          </li>
          <li>
            <strong>Assuming every month has 30 days.</strong> The months-and-days figure depends on which
            months are involved, which is why the calculator counts the real calendar days since your last month-birthday.
          </li>
          <li>
            <strong>Leap-day birthdays.</strong> Someone born on 29 February only has that date in leap
            years; in other years the countdown here points to 1 March.
          </li>
          <li>
            <strong>Mixing up date formats.</strong> 03/04 means 3 April in some countries and 4 March in
            others. The date picker avoids ambiguity, but double-check any date you copy from a document.
          </li>
          <li>
            <strong>Expecting hour-level precision.</strong> Total hours is total days × 24. It does not use
            your time of birth.
          </li>
        </ul>

        <h3 className={h3}>Limitations</h3>
        <p className={p}>
          The calculator uses the Gregorian calendar and your device’s local date. It does not know your time
          of birth, does not convert between calendars such as lunar or regional calendars, and does not apply
          any country’s legal definition of when a birthday is reached. For official purposes, always confirm
          the age rules of the organisation you are dealing with. The zodiac sign is a fun extra based on
          standard Western date ranges.
        </p>

        <h3 className={h3}>Your privacy</h3>
        <p className={p}>
          A date of birth is personal data. Nothing you enter here is sent anywhere: the page has no form that
          submits to a server, and all the date arithmetic happens in your browser. Close the tab and the
          dates are gone.
        </p>
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
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
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
