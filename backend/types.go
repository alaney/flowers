package main

type Flower struct {
	Id               int     `json:"id"`
	Name             string  `json:"name"`
	Price_Per_Stem   float32 `json:"pricePerStem"`
	Stem_Count       int     `json:"stemCount"`
	Price_Per_Bundle float32 `json:"pricePerBundle"`
}

type Arrangement struct {
	id           int
	name         string
	vessel_type  string // const or enum?
	vessel_count int
	vessel_cost  float32
	foam_count   int
	card_holder  bool
	venmo        bool
	paypal       bool
	done         bool
	json         string
}

type Multiplier struct {
	name  string
	value float32
}

type HardGood struct {
	Id    int     `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

type Arrangement_HardGood struct {
	arrangement_id int
	hard_goods_id  int
}

type Arrangement_Flower struct {
	flower_id      int
	arrangement_id int
	count          int
	category       string // const or enum?
}

type ArrangementFlowerDto struct {
	Id             int     `json:"id"`
	Name           string  `json:"name"`
	Count          int     `json:"count"`
	Category       string  `json:"category"`
	Price_Per_Stem float32 `json:"pricePerStem"`
}

type ArrangementDto struct {
	Id           int                    `json:"id"`
	Name         string                 `json:"name"`
	Vessel_Type  string                 `json:"vesselType"`
	Vessel_Count int                    `json:"vesselCount"`
	Vessel_Price float32                `json:"vesselCost"`
	Foam_Count   int                    `json:"foamCount"`
	Card_Holder  bool                   `json:"cardHolder"`
	Venmo        bool                   `json:"venmo"`
	Paypal       bool                   `json:"paypal"`
	Done         bool                   `json:"done"`
	Json         string                 `json:"json"`
	Flowers      []ArrangementFlowerDto `json:"flowers"`
	Hard_Goods   []HardGood             `json:"hardGoods"`
}
