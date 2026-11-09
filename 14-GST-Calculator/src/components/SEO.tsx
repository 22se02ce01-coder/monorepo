import React from 'react';
import { Zap, Calculator, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter the Amount',
      desc: 'Type the price you are working with — either the base value (before tax) or the final value (after tax).',
    },
    {
      step: '02',
      title: 'Pick Add or Remove GST',
      desc: 'Choose "Add GST" for an exclusive base price, or "Remove GST" to extract the tax from an inclusive total.',
    },
    {
      step: '03',
      title: 'Read the Breakdown',
      desc: 'See the taxable value, GST amount, grand total, and the CGST / SGST / IGST split instantly in rupees.',
    },
  ];

  const faqs = [
    {
      q: "What is the difference between adding and removing GST?",
      a: "Adding GST starts from a tax-exclusive base price and calculates the tax on top of it. Removing GST starts from a tax-inclusive total and works backwards to find the original taxable value and the tax already contained within it.",
    },
    {
      q: "What formulas does the calculator use?",
      a: "To add GST: GST = base × rate ÷ 100 and total = base + GST. To remove GST: base = total ÷ (1 + rate ÷ 100) and GST = total − base. For example, ₹1,000 plus 18% GST is ₹1,180, and ₹1,180 including 18% GST has a taxable value of ₹1,000.",
    },
    {
      q: "Why can’t I just subtract 18% from a GST-inclusive price?",
      a: "Because the 18% was calculated on the base price, not on the total. Taking 18% off ₹1,180 gives ₹967.60, which is wrong. Dividing ₹1,180 by 1.18 gives the correct taxable value of ₹1,000.",
    },
    {
      q: "How are CGST and SGST calculated?",
      a: "For an intra-state supply, where the supplier and the place of supply are in the same state, the total GST is split equally into CGST (Central GST) and SGST (State GST). For example, 18% GST becomes 9% CGST plus 9% SGST. In union territories without a legislature, UTGST takes the place of SGST at the same rate.",
    },
    {
      q: "When does IGST apply instead of CGST and SGST?",
      a: "IGST (Integrated GST) generally applies to inter-state supplies, where the supplier and the place of supply are in different states or union territories, and to imports. The full rate is charged as a single IGST line instead of being split. Choose Inter-State in the calculator to see this view.",
    },
    {
      q: "Which GST rates are supported?",
      a: "The preset buttons cover 0%, 5%, 12%, 18% and 28%, and a custom field accepts any other rate. GST rates are revised by the GST Council from time to time, and a 2025 rationalisation moved many items between slabs, so always confirm the current rate for your goods or service before relying on a figure.",
    },
    {
      q: "Does the calculator include compensation cess?",
      a: "Not separately. It applies a single rate. If you need to include an additional cess, you can add the GST rate and the cess percentage together in the custom field to see the combined tax, but the CGST/SGST split shown will then include the cess, so treat it as an estimate.",
    },
    {
      q: "Why might the CGST and SGST figures differ from my invoice by a paisa?",
      a: "The calculator rounds each figure to two decimal places. Billing software may round per line item, per invoice, or to the nearest rupee, so tiny differences of a paisa or so are normal.",
    },
    {
      q: "Can I copy the result into an invoice or message?",
      a: "Yes. The Copy Results button copies a plain-text summary of the mode, rate, taxable value, GST amount, total and the CGST/SGST or IGST split to your clipboard so you can paste it anywhere.",
    },
    {
      q: "Is this tax advice, and is my data stored?",
      a: "It is not tax advice. Results are estimates based on standard GST formulas, and the correct rate and treatment depend on the item, the place of supply and current rules, so confirm with a qualified professional for filings. All calculations run in your browser and nothing you type is uploaded or stored.",
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
            <Zap className="h-3.5 w-3.5" /> Instant Indian GST Breakdowns
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Calculate GST Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Add or remove Goods and Services Tax and see the CGST, SGST and IGST split in seconds.
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
                <Calculator className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Calculations Stay on Your Device</h4>
          <p>
            Every figure is computed locally in your browser using standard GST formulas. Nothing you type is uploaded. These results are for general estimation — the actual tax treatment of a sale depends on the item, the place of supply and the latest GST rules, so confirm with a qualified tax professional for filings.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          GST Calculation Explained
        </h2>
        <p className={p}>
          The Goods and Services Tax (GST) is India’s indirect tax on the supply of goods and services. It
          replaced a patchwork of central and state levies in 2017 with a single destination-based system. For
          day-to-day purposes, most people need to do one of two things: work out the tax to add to a price, or
          work out how much tax is already hidden inside a price. This calculator does both and also shows how
          the tax is split between the Centre and the states.
        </p>

        <h3 className={h3}>Adding GST to a price</h3>
        <p className={p}>
          When a price is quoted “plus GST”, the quoted figure is the taxable value and the tax goes on top:
        </p>
        <div className={formula}>GST = base × rate ÷ 100 &nbsp;·&nbsp; total = base + GST</div>
        <p className={p}>
          <strong>Example:</strong> a service is quoted at ₹1,000 plus 18% GST. The tax is 1,000 × 18 ÷ 100 =
          ₹180, so the invoice total is ₹1,180. If you supply goods worth ₹2,000 at 5%, the GST is ₹100 and the
          total is ₹2,100.
        </p>

        <h3 className={h3}>Removing GST from an inclusive price</h3>
        <p className={p}>
          Retail prices and many quotes are GST-inclusive. To find the taxable value inside them, divide rather
          than subtract:
        </p>
        <div className={formula}>base = total ÷ (1 + rate ÷ 100) &nbsp;·&nbsp; GST = total − base</div>
        <p className={p}>
          <strong>Example:</strong> a product costs ₹1,180 including 18% GST. The base is 1,180 ÷ 1.18 =
          ₹1,000 and the GST inside it is ₹180. A common error is to take 18% of ₹1,180 (₹212.40) and subtract
          it, which gives ₹967.60, an understated base, because the 18% was originally applied to the smaller
          base figure, not the total. Similarly, ₹1,000 including 18% GST has a base of about ₹847.46 and tax of
          about ₹152.54.
        </p>

        <h3 className={h3}>CGST, SGST and IGST</h3>
        <p className={p}>
          GST is shared between the central and state governments, and which components appear on an invoice
          depends on where the supply takes place:
        </p>
        <ul className={ul}>
          <li>
            <strong>Intra-state supply</strong> (supplier and place of supply in the same state): the tax is
            split equally into CGST and SGST. At 18%, ₹1,000 attracts ₹90 CGST and ₹90 SGST. In union
            territories without their own legislature, UTGST replaces SGST.
          </li>
          <li>
            <strong>Inter-state supply</strong> (different states or union territories): the whole amount is
            charged as IGST. At 18%, ₹1,000 attracts a single ₹180 IGST line.
          </li>
        </ul>
        <p className={p}>
          The total tax is the same either way; only the way it is shown and credited differs. Determining the
          place of supply can be complex for services, online sales and some transport, so if you are unsure
          which applies, check with your accountant.
        </p>

        <h3 className={h3}>Reading the result panel</h3>
        <p className={p}>
          Whichever mode you use, the result panel always shows the same three core figures: the taxable (base)
          amount, the GST amount at the selected rate, and the total including GST. Underneath, it shows how
          that tax is presented on an invoice. With Intra-State selected you see CGST and SGST, each at half the
          rate; with Inter-State selected you see one IGST line at the full rate. Switching between the two never
          changes the total tax, which is a quick way to confirm you have understood the split. If you type a
          custom rate, the half-rates are worked out automatically, so a 3% rate, for instance, appears as 1.5%
          CGST and 1.5% SGST. The Copy Results button puts all of this on your clipboard as plain text.
        </p>

        <h3 className={h3}>About GST rates</h3>
        <p className={p}>
          GST uses a small set of standard rate slabs, with some essentials exempt or at 0%. The presets in this
          tool cover 0%, 5%, 12%, 18% and 28%, the slabs that applied to most goods and services for several
          years after GST was introduced. The GST Council revises rates periodically, and a 2025
          rationalisation moved many items between slabs, so the right rate for a given product can change. Use
          the custom field for any rate that is not in the presets, and always confirm the current rate for
          your specific goods or service from an official source or your tax adviser.
        </p>

        <h3 className={h3}>Who finds this useful</h3>
        <ul className={ul}>
          <li>Small businesses and freelancers preparing quotes and invoices.</li>
          <li>Shoppers checking how much tax is included in a bill.</li>
          <li>Accounts staff reconciling inclusive amounts back to taxable values.</li>
          <li>Students learning how indirect tax is calculated.</li>
        </ul>

        <h3 className={h3}>Tips and common mistakes</h3>
        <ul className={ul}>
          <li>
            <strong>Be clear whether a price is inclusive or exclusive</strong> before calculating. The same
            number gives different results in each mode.
          </li>
          <li>
            <strong>Don’t charge both IGST and CGST/SGST</strong> on the same supply. It is one or the other.
          </li>
          <li>
            <strong>Expect small rounding differences.</strong> This tool rounds every figure to the paisa;
            invoicing software may round per line or to the nearest rupee.
          </li>
          <li>
            <strong>Remember extras.</strong> Compensation cess, reverse charge and composition-scheme rules are
            outside the scope of a simple rate calculation.
          </li>
        </ul>

        <h3 className={h3}>Limitations and disclaimer</h3>
        <p className={p}>
          This calculator applies one rate to one amount. It does not decide which rate applies to your item,
          handle multiple items at different rates, calculate cess separately, or account for input tax credit,
          reverse charge or exemptions. Results are estimates for general guidance and are not tax advice;
          rules and rates change, so verify against current notifications or with a qualified professional
          before filing returns or issuing invoices. Every calculation runs in your browser, so the amounts you
          enter are never sent to a server.
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
