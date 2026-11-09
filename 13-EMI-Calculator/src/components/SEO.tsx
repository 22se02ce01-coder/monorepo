import React from 'react';
import { Calculator, TrendingUp, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter Loan Details',
      desc: 'Type or drag the loan amount, annual interest rate, and tenure. Switch the tenure between months and years as you prefer.',
    },
    {
      step: '02',
      title: 'See Your EMI Instantly',
      desc: 'The calculator applies the reducing-balance EMI formula in real time and shows your monthly instalment, total interest, and total repayment.',
    },
    {
      step: '03',
      title: 'Review the Schedule',
      desc: 'Study the principal-vs-interest chart and the full amortization table, switching between a month-by-month and a compact yearly summary.',
    },
  ];

  const faqs = [
    {
      q: "How is EMI calculated?",
      a: "EMI uses the reducing-balance formula EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments. When the rate is 0%, the EMI is simply the principal divided by the number of months.",
    },
    {
      q: "What is an amortization schedule?",
      a: "It is a month-by-month breakdown of each EMI into the portion that pays interest and the portion that reduces your outstanding principal. Early instalments are interest-heavy; as the balance falls, more of each EMI goes toward principal until the loan is fully repaid. This calculator shows the schedule monthly or summarised by year.",
    },
    {
      q: "What does reducing balance mean?",
      a: "Interest each month is charged only on the principal still outstanding, not on the original loan amount. As you repay principal, the interest portion of each EMI shrinks. This is different from a flat-rate loan, where interest is calculated on the full original amount for the whole tenure and the effective cost is higher than the quoted rate suggests.",
    },
    {
      q: "Is a longer tenure better because the EMI is lower?",
      a: "A longer tenure lowers the monthly EMI but increases the total interest you pay, often substantially. For example, ₹25 lakh at 8.5% costs about ₹21,696 a month over 20 years with roughly ₹27.07 lakh of total interest, versus about ₹24,618 a month over 15 years with roughly ₹19.31 lakh of interest. Choose the shortest tenure whose EMI you can comfortably afford.",
    },
    {
      q: "Does the calculator account for processing fees or prepayments?",
      a: "No. It models a fixed-rate loan with equal monthly instalments and no additional charges. Processing fees, insurance, taxes on fees, floating-rate changes and prepayments are not included, so your lender’s figures may differ.",
    },
    {
      q: "Can I use it for a floating-rate loan?",
      a: "You can use it to estimate the EMI at today’s rate, and you can re-run it with a higher or lower rate to see how a change would affect you. It cannot model a rate that changes during the loan. In practice, lenders often adjust the tenure rather than the EMI when a floating rate changes, so check your lender’s policy.",
    },
    {
      q: "Why is my EMI slightly different from my bank’s figure?",
      a: "Lenders may round the EMI to the nearest rupee or upwards, charge broken-period interest between disbursement and the first EMI, calculate interest on a daily basis, or add fees and insurance. The formula here is the standard one, so differences are usually small and come from those adjustments.",
    },
    {
      q: "What are the input limits?",
      a: "You can type a loan amount up to ₹10 crore, an annual interest rate from 0% to 40%, and a tenure of up to 40 years or 480 months. The sliders cover the most common ranges, up to ₹2 crore and 20%, but the typed fields accept the full range.",
    },
    {
      q: "Is this calculator only for Indian rupees?",
      a: "The amounts are displayed in rupees with Indian digit grouping, but the EMI formula is the same in any currency. If you enter amounts in another currency, the numbers are still correct; only the ₹ symbol will be wrong.",
    },
    {
      q: "Are my numbers sent anywhere?",
      a: "No. Every calculation runs entirely inside your browser using JavaScript. Nothing you type is uploaded to any server, logged or shared. Results are estimates for planning only and are not financial advice or a loan offer.",
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
            <Calculator className="h-3.5 w-3.5" /> Accurate Reducing-Balance EMI Math
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Use the Loan EMI Calculator
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Plan home, car, and personal loans with a transparent EMI breakdown and amortization schedule.
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
                <TrendingUp className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Estimates, Not Loan Offers</h4>
          <p>
            Results are indicative and assume a fixed interest rate with equal monthly instalments. Your bank or NBFC may apply fees, taxes, floating rates, or different rounding, so confirm the exact figures with your lender before borrowing.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          A Plain-English Guide to Loan EMIs
        </h2>
        <p className={p}>
          An EMI, or equated monthly instalment, is the fixed amount you pay your lender every month until a
          loan is repaid. Home loans, car loans, personal loans and education loans in India are usually
          structured this way. Each EMI is the same size, but what it pays for changes over time: part of it
          covers the interest due that month, and the rest chips away at the amount you borrowed. Knowing how
          that split works helps you choose a sensible tenure, compare offers and decide when prepaying makes
          sense.
        </p>

        <h3 className={h3}>The EMI formula</h3>
        <p className={p}>
          Most lenders use the reducing-balance method, where interest is charged only on the principal that
          is still outstanding. The EMI that exactly repays the loan over <em>n</em> months is:
        </p>
        <div className={formula}>EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</div>
        <ul className={ul}>
          <li><strong>P</strong> is the principal, the amount you borrow.</li>
          <li><strong>r</strong> is the monthly interest rate: the annual rate ÷ 12 ÷ 100. An annual rate of 9% gives r = 0.0075.</li>
          <li><strong>n</strong> is the number of monthly instalments: 5 years is 60 months.</li>
        </ul>
        <p className={p}>
          If the interest rate is 0%, the formula breaks down mathematically, so the calculator simply divides
          the principal equally across the months.
        </p>

        <h3 className={h3}>Worked example</h3>
        <p className={p}>
          Suppose you borrow ₹10,00,000 at 9% a year for 5 years. Then P = 10,00,000, r = 0.0075 and n = 60.
          Plugging these in gives an EMI of about <strong>₹20,758</strong>. Over 60 months you pay roughly
          ₹12,45,501 in total, of which about <strong>₹2,45,501 is interest</strong>.
        </p>
        <p className={p}>
          Look at the first instalment. Interest for month one is 0.0075 × ₹10,00,000 = ₹7,500, so only about
          ₹13,258 of the ₹20,758 EMI reduces the principal. In month two, interest is charged on the slightly
          smaller balance, so the interest share falls and the principal share rises. By the final year almost
          the whole EMI is going toward principal. The amortization table above shows this shift month by month
          or year by year.
        </p>

        <h3 className={h3}>Reading the results on this page</h3>
        <p className={p}>
          The donut chart shows what share of everything you will repay is interest (in red) and what share is
          the original principal (in blue). On a short personal loan the interest slice is small; on a 20- or
          30-year home loan it can approach or even exceed half of the total, which is a useful reality check.
          Below the chart, the amortization schedule opens in a yearly view, adding up the principal and
          interest paid in each 12-month block along with the balance left at the end of that year. Switch to
          the monthly view to see every instalment. The final instalment may differ by a few paise or rupees
          from the others because the calculator clears any tiny remaining balance exactly, rather than leaving
          a rounding residue.
        </p>

        <h3 className={h3}>How tenure changes the total cost</h3>
        <p className={p}>
          Stretching a loan over more years reduces the EMI, but you pay interest for longer. Take a ₹25 lakh
          home loan at 8.5%:
        </p>
        <ul className={ul}>
          <li>Over 15 years the EMI is about ₹24,618 and total interest is about ₹19.31 lakh.</li>
          <li>Over 20 years the EMI drops to about ₹21,696, but total interest rises to about ₹27.07 lakh.</li>
        </ul>
        <p className={p}>
          A saving of roughly ₹2,900 a month costs nearly ₹7.8 lakh more in interest. That trade-off can still
          be reasonable if it keeps your budget safe, but it should be a deliberate choice. Try a few tenures in
          the calculator and watch the interest share in the chart.
        </p>

        <h3 className={h3}>Practical tips</h3>
        <ul className={ul}>
          <li>
            <strong>Keep EMIs affordable.</strong> Many lenders look at what share of your monthly income goes
            to all EMIs combined. Leave room for emergencies, rate rises and other goals rather than borrowing
            the maximum you are offered.
          </li>
          <li>
            <strong>Compare offers on the same basis.</strong> Enter each lender’s rate with the same amount and
            tenure to see the true difference in EMI and total interest, then add their fees separately.
          </li>
          <li>
            <strong>Understand prepayment.</strong> Because early EMIs are interest-heavy, a part-prepayment in
            the early years reduces the outstanding balance on which future interest is charged. Check whether
            your lender charges a prepayment fee and whether it reduces your EMI or your tenure.
          </li>
          <li>
            <strong>Stress-test floating rates.</strong> If your rate can change, re-run the calculation with a
            rate one or two points higher to see whether you would still be comfortable.
          </li>
        </ul>

        <h3 className={h3}>Common mistakes</h3>
        <ul className={ul}>
          <li>
            <strong>Confusing flat and reducing rates.</strong> A “flat” rate charges interest on the original
            amount throughout, so a 10% flat rate is considerably more expensive than a 10% reducing-balance
            rate. This calculator uses the reducing-balance method.
          </li>
          <li>
            <strong>Looking only at the EMI.</strong> Total interest and total payment are what the loan really
            costs you.
          </li>
          <li>
            <strong>Ignoring fees.</strong> Processing fees, insurance and other charges are not part of the EMI
            formula but are part of the cost of borrowing.
          </li>
        </ul>

        <h3 className={h3}>Limitations and disclaimer</h3>
        <p className={p}>
          This tool assumes a fixed annual rate, equal monthly instalments starting one month after
          disbursement, and no fees, prepayments or rate changes. Lenders may calculate interest daily, round the
          EMI, or charge interest for the period before your first EMI, so their numbers can differ slightly.
          Treat every figure here as an estimate for planning and comparison, not as financial advice or a
          loan offer, and confirm the final terms in your lender’s sanction letter. All calculations run in your
          browser; nothing you enter is sent to a server.
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
