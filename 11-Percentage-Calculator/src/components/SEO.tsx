import React from 'react';
import { Percent, BookOpen, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pick a Calculator',
      desc: 'Choose from eight everyday percentage tasks — from "X% of Y" to discounts, growth rates and tax.',
    },
    {
      step: '02',
      title: 'Type Your Numbers',
      desc: 'Enter your values. Results recalculate live, so there is no submit button to press and no page reload.',
    },
    {
      step: '03',
      title: 'Read the Formula',
      desc: 'Each card shows the exact formula and a worked example, so you learn the method, not just the answer.',
    },
  ];

  const faqs = [
    {
      q: "How do I calculate what percentage one number is of another?",
      a: "Divide the part by the whole and multiply by 100. For example, 45 out of 180 is (45 ÷ 180) × 100 = 25%. The “X is what percent of Y?” card does this instantly as you type.",
    },
    {
      q: "How do I find X% of a number?",
      a: "Divide the percentage by 100 to turn it into a decimal, then multiply by the number. For example, 15% of 200 is 0.15 × 200 = 30. A quick mental shortcut is to find 10% by moving the decimal point one place to the left and then scale from there.",
    },
    {
      q: "What is the difference between percentage change and percentage difference?",
      a: "Percentage change compares a new value against a specific starting point, so direction matters and the result can be an increase or a decrease. Percentage difference measures how far apart two values are relative to their average and is always a positive number, which makes it suitable when neither value is the obvious starting point.",
    },
    {
      q: "Why does a 10% increase followed by a 10% decrease not bring me back to the original number?",
      a: "Because the second percentage is applied to a different base. 100 increased by 10% is 110, and 10% of 110 is 11, so decreasing it gives 99. Successive percentage changes multiply rather than add, so the net effect here is a 1% loss.",
    },
    {
      q: "How does the reverse percentage calculator work?",
      a: "If you know that a part is a certain percentage of an unknown whole, the whole is (part × 100) ÷ percentage. For example, if 30 represents 25% of a total, the total is (30 × 100) ÷ 25 = 120.",
    },
    {
      q: "How is tax added to and removed from a price?",
      a: "To add tax, multiply the amount by the rate divided by 100 and add it on: 1,000 at 18% becomes 1,180. To remove tax from a tax-inclusive price, multiply by 100 and divide by (100 + rate): 1,000 including 18% tax has a base of about 847.46. Simply subtracting 18% from the inclusive price would give the wrong answer.",
    },
    {
      q: "Are two discounts of 20% and 10% the same as a 30% discount?",
      a: "No. Stacked discounts apply one after the other, so 20% off and then 10% off leaves you paying 0.8 × 0.9 = 72% of the original price, which is a total discount of 28%, not 30%. You can check this by running the discount card twice.",
    },
    {
      q: "What is the difference between a percent and a percentage point?",
      a: "A percentage point is the plain arithmetic difference between two percentages, while a percent change is relative. If an interest rate moves from 4% to 5%, it rose by 1 percentage point, but that is a 25% increase relative to the original 4%.",
    },
    {
      q: "Why do some cards show a dash instead of a result?",
      a: "A dash appears when the calculation is undefined, because it would require dividing by zero, for example asking what percent a number is of 0, or measuring percentage change from a starting value of 0. Fill in a non-zero value and the result will appear.",
    },
    {
      q: "Are my numbers sent anywhere?",
      a: "No. Every calculation runs entirely in your browser with JavaScript. Nothing you type is uploaded, logged or shared, and the tool keeps working without a connection once the page has loaded.",
    },
  ];

  const h3 = 'text-lg font-bold text-slate-900 mt-8 mb-3';
  const p = 'text-base text-slate-700 leading-relaxed mb-4';
  const ul = 'list-disc pl-6 space-y-2 text-base text-slate-700 leading-relaxed mb-4';
  const formula = 'font-mono text-sm bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-slate-800 overflow-x-auto';

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Percent className="h-3.5 w-3.5" /> Fast, Accurate Percentage Math
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Use the Percentage Calculator
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Solve any percentage problem in seconds and understand exactly how the answer was reached.
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
                <BookOpen className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">The Core Percentage Formula</h4>
          <p>
            Every percentage problem is a variation of one relationship:{' '}
            <span className="font-mono font-semibold">part = (percentage ÷ 100) × whole</span>. Rearranging
            this single equation solves for the part, the percentage, or the whole — which is exactly what
            the eight calculators above do for you.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          A Practical Guide to Percentages
        </h2>
        <p className={p}>
          “Per cent” simply means “per hundred”. When you say 18%, you mean 18 out of every 100, or the
          fraction 18/100, or the decimal 0.18. Those three forms are interchangeable, and switching between
          them is the whole trick behind percentage arithmetic. Percentages are popular because they put
          numbers of very different sizes on the same scale: a 5 rupee saving on a 50 rupee item and a 500
          rupee saving on a 5,000 rupee item are both 10%, even though the amounts look nothing alike.
        </p>

        <h3 className={h3}>The three questions every percentage problem asks</h3>
        <p className={p}>
          Almost every percentage question you will meet is one of three rearrangements of the formula in the
          box above. Recognising which one you are facing is usually harder than the arithmetic itself.
        </p>
        <ul className={ul}>
          <li>
            <strong>Find the part.</strong> “What is 15% of 200?” Multiply 0.15 by 200 to get 30. This is the
            “What is X% of Y?” card.
          </li>
          <li>
            <strong>Find the percentage.</strong> “45 is what percent of 180?” Divide 45 by 180 and multiply
            by 100 to get 25%. This is the “X is what percent of Y?” card.
          </li>
          <li>
            <strong>Find the whole.</strong> “30 is 25% of what?” Multiply 30 by 100 and divide by 25 to get
            120. This is the reverse percentage card.
          </li>
        </ul>

        <h3 className={h3}>Percentage change: increases and decreases</h3>
        <p className={p}>
          To measure how much something has grown or shrunk, compare the change with the starting value:
        </p>
        <div className={formula}>percentage change = (new − old) ÷ |old| × 100</div>
        <p className={p}>
          If a monthly bill goes from 120 to 150, the change is 30, and 30 ÷ 120 × 100 = 25%, so the bill rose
          by 25%. If a price falls from 250 to 200, the change is −50, and −50 ÷ 250 × 100 = −20%, a 20%
          decrease. Notice that the starting value is always the denominator. That is why going from 200 back
          up to 250 is a 25% increase, not 20%: the base has changed. The calculator divides by the absolute
          value of the starting number, so the sign of the answer always tells you the direction of the move.
        </p>

        <h3 className={h3}>Percentage difference: when there is no “before” and “after”</h3>
        <p className={p}>
          Sometimes you want to compare two values that have equal standing, such as the prices of the same
          product at two shops, or two measurements taken in a lab. Picking one as the base would make the
          answer depend on the order you typed them. Percentage difference avoids that by dividing by the
          average of the two:
        </p>
        <div className={formula}>percentage difference = |a − b| ÷ ((|a| + |b|) ÷ 2) × 100</div>
        <p className={p}>
          For 40 and 60, the gap is 20 and the average is 50, so the percentage difference is 40% regardless
          of which number comes first. By contrast, the percentage change from 40 to 60 is 50%, and from 60 to
          40 it is −33.3%.
        </p>

        <h3 className={h3}>Discounts and tax in everyday shopping</h3>
        <p className={p}>
          A 20% discount on a price of 1,999 saves 0.20 × 1,999 = 399.80, leaving you to pay 1,599.20. An
          easier way to think about it is that you pay 80% of the price, so you can multiply by 0.8 directly.
          This “multiplier” view is very handy for stacked discounts: 20% off followed by an extra 10% off
          means multiplying by 0.8 and then by 0.9, which equals 0.72. You pay 72% of the original, a combined
          discount of 28%, not 30%.
        </p>
        <p className={p}>
          Tax works the same way in reverse. Adding 18% tax to 1,000 gives 1,000 × 1.18 = 1,180. Taking tax{' '}
          <em>out</em> of a price that already includes it is where many people slip up. If a receipt shows
          1,000 including 18% tax, the pre-tax amount is not 1,000 − 180 = 820. It is 1,000 ÷ 1.18 ≈ 847.46, and
          the tax inside it is about 152.54. The tax card shows both directions side by side so you can pick
          the one that matches your situation.
        </p>

        <h3 className={h3}>Where percentages show up</h3>
        <ul className={ul}>
          <li>Working out marks and exam scores as a percentage of the total.</li>
          <li>Checking whether a “sale” price is really the discount advertised.</li>
          <li>Comparing month-on-month sales, traffic, expenses or salary changes.</li>
          <li>Splitting a bill, tip or commission as a share of a total.</li>
          <li>Recovering an original price from a discounted or tax-inclusive figure.</li>
          <li>Comparing two quotes or measurements without favouring either one.</li>
        </ul>

        <h3 className={h3}>Common mistakes to avoid</h3>
        <ul className={ul}>
          <li>
            <strong>Using the wrong base.</strong> Percentage change always divides by the starting value.
            Swapping old and new gives a different answer.
          </li>
          <li>
            <strong>Adding successive percentages.</strong> A 10% rise followed by a 10% fall leaves you at
            99% of where you began, because the second change applies to a bigger number.
          </li>
          <li>
            <strong>Confusing percent with percentage points.</strong> A rate moving from 4% to 5% is a rise
            of 1 percentage point, but a 25% relative increase.
          </li>
          <li>
            <strong>Subtracting tax from an inclusive price.</strong> Divide by (1 + rate) instead.
          </li>
          <li>
            <strong>Over-trusting rounded figures.</strong> Results here are rounded for display to two
            decimal places, so very small values or chained calculations may differ slightly from a
            spreadsheet that keeps more digits.
          </li>
        </ul>

        <h3 className={h3}>Limitations and privacy</h3>
        <p className={p}>
          The calculators handle plain numbers, including decimals and negative values, but they do not know
          about currencies, units or compound growth over many periods. For loan interest or investment
          returns over years, a dedicated compound interest or EMI calculator is the right tool. When an
          answer is mathematically undefined, such as dividing by zero, the card shows a dash rather than a
          misleading number. All the arithmetic runs inside your browser, so the figures you type stay on
          your device and are never sent to a server.
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
