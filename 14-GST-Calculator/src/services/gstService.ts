export interface GstResult {
  base: number;   // net / taxable value
  gst: number;    // total GST amount
  gross: number;  // total incl. GST
  cgst: number;   // half of GST (intra-state)
  sgst: number;   // half of GST (intra-state)
  igst: number;   // full GST (inter-state)
}

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/** Add GST on top of a tax-exclusive base amount. */
export function addGst(baseAmount: number, rate: number): GstResult {
  const base = baseAmount > 0 ? baseAmount : 0;
  const gst = (base * rate) / 100;
  return buildResult(base, gst);
}

/** Remove GST from a tax-inclusive gross amount to find the base. */
export function removeGst(grossAmount: number, rate: number): GstResult {
  const gross = grossAmount > 0 ? grossAmount : 0;
  const base = gross / (1 + rate / 100);
  const gst = gross - base;
  return buildResult(base, gst);
}

function buildResult(base: number, gst: number): GstResult {
  return {
    base: round2(base),
    gst: round2(gst),
    gross: round2(base + gst),
    cgst: round2(gst / 2),
    sgst: round2(gst / 2),
    igst: round2(gst),
  };
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export function formatINR(n: number): string {
  if (!isFinite(n)) return '₹0.00';
  return inr.format(n);
}

export const GST_RATES = [0, 5, 12, 18, 28];
