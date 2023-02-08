package main

type Flower struct {
	id             int
	name           string
	price_per_stem float32
}

type Arrangement struct {
	id           int
	name         string
	vessel_type  string // const or enum?
	vessel_count int
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
	id    int
	name  string
	price float32
}

type Arrangement_HardGood struct {
	arrangement_id int
	hard_goods_id  int
}

type Flower_Arrangement struct {
	flower_id      int
	arrangement_id int
	count          int
	category       string // const or enum?
}
