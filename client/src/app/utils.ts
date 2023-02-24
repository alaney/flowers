import { Arrangement } from "../types/Types";

export function formatDollar(amt: number | string): string {
  const val = Number(amt);
  return (Math.round(val * 100) / 100).toFixed(2);
}

export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const calculateFlowersSubtotal = (arrangement: Arrangement): number => {
  const flowers = arrangement.flowers;
  return (
    flowers.reduce<number>((a, f) => {
      const price = f.pricePerStem * f.count;
      a += price;
      return a;
    }, 0) * 2
  );
};

const calculateHardGoodsSubtotal = (arrangement: Arrangement): number => {
  let subTotal = arrangement.vesselCost * arrangement.vesselCount * 2;
  subTotal += arrangement.foamCount * 1 * 2;
  subTotal += arrangement.cardHolder ? 0.3 * 2 : 0;
  if (arrangement.hardGoods) {
    subTotal +=
      arrangement.hardGoods.reduce<number>((a, h) => {
        a += h.price;
        return a;
      }, 0) * 2;
  }

  return subTotal;
};

export interface ArrangementSubtotals {
  flowersSubtotal: number;
  hardGoodsSubtotal: number;
  laborSubtotal: number;
  taxSubtotal: number;
  taxTotal: number;
  venmoTotal: number;
  venmoSubtotal: number;
  paypalSubtotal: number;
  paypalTotal: number;
}

export const calculateSubtotals = (arrangement: Arrangement): ArrangementSubtotals => {
  const flowersSubtotal = calculateFlowersSubtotal(arrangement);
  const hardGoodsSubtotal = calculateHardGoodsSubtotal(arrangement);
  const laborSubtotal = (flowersSubtotal + hardGoodsSubtotal) * 0.2;
  const taxSubtotal = (laborSubtotal + flowersSubtotal + hardGoodsSubtotal) * 0.09;
  const taxTotal = (laborSubtotal + flowersSubtotal + hardGoodsSubtotal) * 1.09;
  const venmoSubtotal = (laborSubtotal + flowersSubtotal + hardGoodsSubtotal + taxSubtotal) * 0.026;
  const venmoTotal = (laborSubtotal + flowersSubtotal + hardGoodsSubtotal + taxSubtotal) * 1.026;
  const paypalSubtotal = (laborSubtotal + flowersSubtotal + hardGoodsSubtotal + taxSubtotal) * 0.03;
  const paypalTotal = (laborSubtotal + flowersSubtotal + hardGoodsSubtotal + taxSubtotal) * 1.03;
  return {
    flowersSubtotal,
    hardGoodsSubtotal,
    laborSubtotal,
    taxSubtotal,
    venmoSubtotal,
    paypalSubtotal,
    taxTotal,
    venmoTotal,
    paypalTotal,
  };
};
