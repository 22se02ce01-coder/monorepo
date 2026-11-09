import React from 'react';
import { Zap, Globe, ChevronDown, Info } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter an Amount',
      desc: 'Type the value you want to convert and choose the currency you are converting from.',
    },
    {
      step: '02',
      title: 'Pick the Target Currency',
      desc: 'Select the currency to convert into, or tap the swap button to reverse the direction instantly.',
    },
    {
      step: '03',
      title: 'Read the Live Result',
      desc: 'See the converted amount, the effective per-unit rate, and the timestamp of the exchange-rate feed.',
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      "q": "Where do the exchange rates come from?",
      "a": "Your browser fetches them from a third-party service, the Exchange Rate API at open.er-api.com, which returns a table of rates against the US dollar. The time that feed last updated its rates is shown under the result."
    },
    {
      "q": "Are these live, real-time rates?",
      "a": "No. They are daily reference rates; the provider updates its data roughly once a day. They are suitable for estimates and comparisons, but they are not live market quotes and must not be used for trading."
    },
    {
      "q": "Will my bank or card give me the same rate?",
      "a": "Usually not. Banks, card networks and money-transfer services add their own margin and sometimes fees, so the amount you actually receive will normally be lower than the result shown here. Always confirm the final rate with your provider before a real transaction."
    },
    {
      "q": "How can I tell how much a transfer service is really charging?",
      "a": "Convert the same amount here and compare it with the amount the service says will arrive. The difference, plus any separate fee, is the true cost. For example, at a reference rate of 83.30 and an offered rate of 82.00, sending 1,000 USD costs about 1,300 INR in margin."
    },
    {
      "q": "How are rates between two non-dollar currencies calculated?",
      "a": "All rates are quoted against the US dollar, so the converter divides your amount by the source currency's rate and multiplies by the target currency's rate. For instance, if 1 USD = 0.92 EUR and 1 USD = 83.30 INR, then 1 EUR is about 90.54 INR."
    },
    {
      "q": "What happens if the rate service is unavailable?",
      "a": "The converter switches to a small built-in demo rate table and displays a clear warning that the figures are not live. Demo results are examples only. Press the refresh button to try the live feed again."
    },
    {
      "q": "Which currencies are supported?",
      "a": "Twenty widely used currencies: USD, INR, EUR, GBP, AED, CAD, AUD, JPY, CNY, SGD, CHF, HKD, NZD, ZAR, SAR, BRL, RUB, KRW, MXN and THB. Any of them can be converted into any other."
    },
    {
      "q": "How does the conversion history work?",
      "a": "Press \"Save to history\" to keep a conversion. Up to eight recent entries are stored in your browser's local storage on this device, and the clear button removes them. History is never uploaded."
    },
    {
      "q": "Is my conversion data sent anywhere?",
      "a": "The only network request goes to open.er-api.com to download the US-dollar rate table. It does not include the amounts or currencies you convert, although, like any web request, the provider can see technical details such as your IP address. All calculations run in your browser."
    },
    {
      "q": "Can I use this converter for trading or financial decisions?",
      "a": "No. The rates are indicative and may be up to a day old. They are provided for information only and are not financial advice or an offer to buy or sell currency."
    }
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Live Mid-Market Exchange Rates
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Convert Currencies Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Convert between the world&apos;s major currencies using fresh reference rates, updated daily.
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
                <Globe className="h-6 w-6 text-brand-400" />
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
          <h4 className="font-bold text-sm text-blue-950">Reference Rates, Not Financial Advice</h4>
          <p>
            MicroFree shows indicative mid-market exchange rates for information only. They are not an offer to buy or sell currency, and the final rate from your bank or provider will include their own spread and fees.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-4 text-base text-slate-700 leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">A Practical Guide to Currency Conversion</h2>
        <p>An exchange rate is the price of one currency expressed in another. If 1 US dollar buys 83 Indian rupees, the USD/INR rate is 83. Rates move constantly while foreign-exchange markets are open, driven by trade flows, interest rates, inflation expectations and news. For most everyday purposes, such as checking a price on a foreign website, budgeting a trip or estimating an invoice, you do not need a tick-by-tick price. You need a reliable reference figure and an understanding of how far the rate you will actually receive is likely to differ from it. This page explains both.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Where the rates on this page come from</h3>
        <p>When the page loads, your browser requests the latest rates from a third-party service, the Exchange Rate API at open.er-api.com. The service returns a table of rates against the US dollar, together with the time it last updated them. That update time is displayed under the result, so you always know how fresh the figures are. The provider refreshes its data roughly once a day, so these are daily reference rates, not live market quotes. Press the refresh button to fetch the table again.</p>
        <p>The rates are indicative reference rates, close to what is often called the mid-market rate: the midpoint between the prices at which large institutions buy and sell a currency. They are suitable for estimates and comparisons. They are not a quote from any bank, they are not an offer to exchange money, and they should not be used for trading or any decision where timing and precision matter.</p>
        <p>If the rate service cannot be reached, for example because you are offline or the provider is down, the converter falls back to a small built-in demo table and shows a prominent warning that the figures are not live. Treat any result shown in demo mode as an example only.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">How cross rates are calculated</h3>
        <p>Because every rate in the feed is quoted against the US dollar, converting between two other currencies is a two-step calculation: the amount is first converted to dollars, then from dollars to the target currency. Mathematically, amount ÷ (rate of source currency) × (rate of target currency).</p>
        <p>A worked example with illustrative figures: suppose 1 USD = 0.92 EUR and 1 USD = 83.30 INR. Then 1 EUR = 83.30 ÷ 0.92 ≈ 90.54 INR, and 250 EUR ≈ 22,636 INR. The converter shows both the converted amount and the per-unit rate ("1 EUR = … INR") so you can reuse the rate for quick mental arithmetic. The swap button reverses the direction; the reverse rate is simply the reciprocal of the forward rate.</p>
        <p>Amounts of 100 or more are rounded to two decimal places, and smaller amounts are shown with up to four, which helps when converting into currencies with large unit values or when checking the price of a single low-cost item.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Why your bank's rate is different</h3>
        <p>Almost nobody exchanges money at the reference rate. Banks, card networks, airport bureaus and transfer services add a margin, called the spread, and may charge fees on top. The difference can be significant.</p>
        <p>Another illustrative example: if the reference rate is 1 USD = 83.30 INR but your provider offers 82.00, then sending 1,000 USD delivers 82,000 INR instead of 83,300 INR. The 1,300 INR gap, about 1.6%, is a cost even if the service advertises "zero fees". Using a reference converter like this one is the easiest way to see that hidden cost: convert the amount here, compare it with the amount the provider says will arrive, and the difference is what you are paying.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Practical uses</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Travel budgeting:</strong> convert your daily budget into the local currency, then allow a few percent for card or cash-exchange margins.</li>
          <li><strong className="font-semibold text-slate-900">Online shopping:</strong> check what a price in pounds, euros or yen is likely to cost in your own currency before checkout.</li>
          <li><strong className="font-semibold text-slate-900">Freelance and business invoices:</strong> estimate what a payment in a client's currency will be worth, remembering that the rate on the day of payment may differ.</li>
          <li><strong className="font-semibold text-slate-900">Comparing transfer services:</strong> use the reference result as a benchmark for the quotes you receive.</li>
          <li><strong className="font-semibold text-slate-900">Salary and price comparisons:</strong> get a rough sense of an amount abroad, keeping in mind that exchange rates say nothing about differences in living costs.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Tips and common mistakes</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Check the update time.</strong> A rate from yesterday is fine for budgeting but not for a large transfer you are about to make.</li>
          <li><strong className="font-semibold text-slate-900">Do not confuse reference and offered rates.</strong> The figure here is a benchmark; your provider's own rate is the one that applies.</li>
          <li><strong className="font-semibold text-slate-900">Watch for dynamic currency conversion.</strong> When a card terminal or website abroad offers to charge you in your home currency, the exchange rate it uses is usually worse than letting your card issuer convert. Paying in the local currency is often cheaper.</li>
          <li><strong className="font-semibold text-slate-900">Remember symbol overlaps.</strong> The ¥ sign is used for both the Japanese yen and the Chinese yuan, and several countries use "$". The three-letter codes such as JPY and CNY are unambiguous.</li>
          <li><strong className="font-semibold text-slate-900">Do not round the rate too early.</strong> For large amounts, use the full per-unit rate shown rather than a rounded figure.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Supported currencies and history</h3>
        <p>The converter offers 20 widely used currencies: USD, INR, EUR, GBP, AED, CAD, AUD, JPY, CNY, SGD, CHF, HKD, NZD, ZAR, SAR, BRL, RUB, KRW, MXN and THB. Any of them can be converted to any other. The "Save to history" button stores up to eight recent conversions so you can compare them later, and the clear button deletes them.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Privacy</h3>
        <p>Fetching rates requires one request from your browser to open.er-api.com. That request asks only for the latest US-dollar rate table; it does not include the amounts or currencies you convert. As with any website request, the provider can see technical details such as your IP address, under its own privacy policy. All calculations happen in your browser, and your saved history is kept only in your browser's local storage on this device. It is never uploaded to MicroFree.</p>
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
