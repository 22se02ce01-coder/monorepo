export interface AmortizationRow {
  period: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface YearlyRow {
  year: number;
  principal: number;
  interest: number;
  totalPaid: number;
  balance: number;
}

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  months: number;
  schedule: AmortizationRow[];
  yearly: YearlyRow[];
}

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const inrFormatter2 = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export function formatINR(value: number, decimals = false): string {
  if (!isFinite(value)) return '—';
  return decimals ? inrFormatter2.format(value) : inrFormatter.format(value);
}

export function formatNumberIN(value: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(value));
}

/**
 * Compute EMI, totals and an amortization schedule.
 * @param principal loan amount (P)
 * @param annualRatePct annual interest rate in percent
 * @param months loan tenure in months (n)
 */
export function calculateEmi(
  principal: number,
  annualRatePct: number,
  months: number
): EmiResult {
  const P = Math.max(0, principal);
  const n = Math.max(1, Math.round(months));
  const r = annualRatePct / 12 / 100;

  let emi: number;
  if (r === 0) {
    emi = P / n;
  } else {
    const pow = Math.pow(1 + r, n);
    emi = (P * r * pow) / (pow - 1);
  }

  const schedule: AmortizationRow[] = [];
  let balance = P;
  let totalInterest = 0;

  for (let period = 1; period <= n; period++) {
    const interest = balance * r;
    let principalPaid = emi - interest;
    // guard against tiny negative residue on the final payment
    if (period === n || principalPaid > balance) {
      principalPaid = balance;
    }
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    schedule.push({
      period,
      emi: principalPaid + interest,
      principal: principalPaid,
      interest,
      balance,
    });
  }

  const totalPayment = P + totalInterest;

  // Yearly rollup (12 months per year)
  const yearly: YearlyRow[] = [];
  for (let i = 0; i < schedule.length; i += 12) {
    const chunk = schedule.slice(i, i + 12);
    const principalSum = chunk.reduce((s, row) => s + row.principal, 0);
    const interestSum = chunk.reduce((s, row) => s + row.interest, 0);
    yearly.push({
      year: Math.floor(i / 12) + 1,
      principal: principalSum,
      interest: interestSum,
      totalPaid: principalSum + interestSum,
      balance: chunk[chunk.length - 1].balance,
    });
  }

  return {
    emi,
    totalInterest,
    totalPayment,
    principal: P,
    months: n,
    schedule,
    yearly,
  };
}
