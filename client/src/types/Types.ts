export interface Arrangement {
  id: number;
  name: string;
  vesselType: string;
  vesselCount: number;
  vesselCost: number;
  foamCount: number;
  cardHolder: boolean;
  venmo: boolean;
  paypal: boolean;
  done: boolean;
  json: string;
  flowers: ArrangementFlower[];
  hardGoods: HardGood[];
}

export interface ArrangementFlower {
  id: number;
  name: string;
  count: number;
  category: string;
  pricePerStem: number;
  priceOverride: string;
}

export interface Flower {
  id: number;
  name: string;
  pricePerStem: number;
  pricePerBundle: number;
  stemCount: number;
}

export interface HardGood {
  id: number;
  name: string;
  price: number;
}
