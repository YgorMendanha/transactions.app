export function parseAmount(amountStr: string): number {
  const raw = parseInt(amountStr, 10) || 0;
  return raw / 100; 
}