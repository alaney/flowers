export interface Arrangement {
  id: number
  name: string
  vesselType: string
  vesselCount: number
  vesselCost: number
  foamCount: number
  cardHolder: boolean
  venmo: boolean
  paypal: boolean
  done: boolean
  json: string
  flowers: Flower[]
  hardGoods: HardGood[]
}

export interface Flower {
  id: number
  name: string
  count: number
  category: string
  pricePerStem: number
}

export interface HardGood {
  id: number
  name: string
  price: number
}
