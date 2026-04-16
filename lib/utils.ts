// Shared pure utility functions

/**
 * Formats a number as Indian Rupees (₹).
 * @example formatCurrency(4000) → "₹4,000"
 */
export function formatCurrency(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}
