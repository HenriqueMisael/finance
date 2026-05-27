import type { AccountType } from "@/types";

export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "investment", label: "Investment" },
];

/** DD/MM/YYYY → YYYY-MM-DD */
export function parseBrDate(raw: string): string {
  const parts = raw.trim().split("/");
  if (parts.length !== 3) return raw;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

/** "R$ 5.000,00" → 5000.00 */
export function parseBrCurrency(raw: string): number {
  const cleaned = raw
    .replace(/R\$\s*/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return parseFloat(cleaned);
}

/** Convert a decimal amount to the smallest currency unit (e.g. dollars → cents) */
export function toSmallestUnit(amount: number, decimalPlaces: number): number {
  return Math.round(amount * Math.pow(10, decimalPlaces));
}

/** Format a value in smallest currency unit to display string */
export function formatCurrencyValue(
  value: number,
  symbol: string,
  decimalPlaces: number
): string {
  const amount = value / Math.pow(10, decimalPlaces);
  return `${symbol} ${amount.toFixed(decimalPlaces)}`;
}
