export function formatDollar(amt: number | string): string {
  const val = Number(amt);
  return (Math.round(val * 100) / 100).toFixed(2);
}
