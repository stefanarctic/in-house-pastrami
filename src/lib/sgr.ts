export const SGR_ITEM_ID = "sgr";
export const SGR_AMOUNT_RON = 0.5;

export function formatLei(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(".", ",");
}

export function sgrQuantity(lines: { sgr?: boolean; quantity: number }[]): number {
  return lines.reduce((sum, line) => sum + (line.sgr ? line.quantity : 0), 0);
}

export function sgrTotalRon(lines: { sgr?: boolean; quantity: number }[]): number {
  return Math.round(sgrQuantity(lines) * SGR_AMOUNT_RON * 100) / 100;
}
