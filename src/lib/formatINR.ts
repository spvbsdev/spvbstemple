/** Format rupee amounts with Lakh / Crore labels (matches projects page). */
export function formatINRWithLabel(amount?: number): string {
  if (amount == null) return 'Not specified';
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Crore`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}
