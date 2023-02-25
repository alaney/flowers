package main

import (
	"database/sql"
	"log"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func connectDb() {
	connStr := "postgresql://postgres:password@localhost/flowers?sslmode=disable"
	// Connect to database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	DB = db
}

func getArrangements() ([]ArrangementDto, error) {
	argmtRows, err := DB.Query("select * from arrangements")

	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer argmtRows.Close()

	var argmtDtos = []ArrangementDto{}

	for argmtRows.Next() {
		var argmt ArrangementDto
		err := argmtRows.Scan(&argmt.Id, &argmt.Name, &argmt.Vessel_Type, &argmt.Vessel_Count, &argmt.Foam_Count, &argmt.Card_Holder, &argmt.Venmo, &argmt.Paypal, &argmt.Done, &argmt.Vessel_Price, &argmt.Json)

		if err != nil {
			log.Println(err)
			return nil, err
		}

		f, err := getFlowersForArrangement(argmt.Id)
		h, err := getHardGoodsForArrangement(argmt.Id)

		if err != nil {
			return nil, err
		}

		argmt.Flowers = f
		argmt.Hard_Goods = h

		argmtDtos = append(argmtDtos, argmt)
	}

	return argmtDtos, nil
}

func getArrangement(id int) (ArrangementDto, error) {
	argmtRows, err := DB.Query("select * from arrangements where id = $1", id)

	if err != nil {
		log.Println(err)
		return ArrangementDto{}, err
	}

	defer argmtRows.Close()

	argmtRows.Next()
	var argmt ArrangementDto
	err = argmtRows.Scan(&argmt.Id, &argmt.Name, &argmt.Vessel_Type, &argmt.Vessel_Count, &argmt.Foam_Count, &argmt.Card_Holder, &argmt.Venmo, &argmt.Paypal, &argmt.Done, &argmt.Vessel_Price, &argmt.Json)

	if err != nil {
		log.Println(err)
		return ArrangementDto{}, err
	}

	f, err := getFlowersForArrangement(argmt.Id)
	h, err := getHardGoodsForArrangement(argmt.Id)

	if err != nil {
		log.Println(err)
		return ArrangementDto{}, err
	}

	argmt.Flowers = f
	argmt.Hard_Goods = h

	return argmt, nil
}

func getFlowersForArrangement(arrangement_id int) ([]ArrangementFlowerDto, error) {
	argmtFlowerRows, err := DB.Query("select f.id, f.name, af.count, af.category, f.price_per_stem, af.price_override from arrangements_flowers af, flowers f where af.arrangement_id = $1 and af.flower_id = f.id", arrangement_id)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer argmtFlowerRows.Close()

	flowers := []ArrangementFlowerDto{}
	for argmtFlowerRows.Next() {
		var flower ArrangementFlowerDto
		err := argmtFlowerRows.Scan(&flower.Id, &flower.Name, &flower.Count, &flower.Category, &flower.Price_Per_Stem, &flower.Price_Override)

		if err != nil {
			log.Println(err)
			return nil, err
		}

		flowers = append(flowers, flower)
	}

	return flowers, nil
}

func getHardGoodsForArrangement(arrangement_id int) ([]HardGood, error) {
	hardGoodRows, err := DB.Query("select id, name, price from hard_goods where arrangement_id = $1", arrangement_id)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer hardGoodRows.Close()

	hardGoods := []HardGood{}
	for hardGoodRows.Next() {
		var hardGood HardGood
		err := hardGoodRows.Scan(&hardGood.Id, &hardGood.Name, &hardGood.Price)

		if err != nil {
			log.Println(err)
			return nil, err
		}

		hardGoods = append(hardGoods, hardGood)
	}

	return hardGoods, nil
}

func getFlowers() ([]Flower, error) {
	flowerRows, err := DB.Query("select * from flowers order by name")

	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer flowerRows.Close()

	var flowers = []Flower{}
	for flowerRows.Next() {
		var flower Flower
		err := flowerRows.Scan(&flower.Id, &flower.Name, &flower.Price_Per_Bundle, &flower.Stem_Count, &flower.Price_Per_Stem)

		if err != nil {
			log.Println(err)
			return nil, err
		}

		flowers = append(flowers, flower)
	}

	return flowers, nil
}

func patchFlower(flower Flower) (Flower, error) {
	flowerRow, err := DB.Query("update flowers set name = $1, price_per_bundle = $2, stem_count = $3 where id = $4 returning *", flower.Name, flower.Price_Per_Bundle, flower.Stem_Count, flower.Id)

	if err != nil {
		log.Println(err)
		return Flower{}, err
	}

	flowerRow.Next()
	var updatedFlower Flower
	err = flowerRow.Scan(&updatedFlower.Id, &updatedFlower.Name, &updatedFlower.Price_Per_Bundle, &updatedFlower.Stem_Count, &updatedFlower.Price_Per_Stem)

	if err != nil {
		log.Println(err)
		return Flower{}, err
	}

	return updatedFlower, nil
}

func createFlower(flower Flower) (Flower, error) {
	flowerRow, err := DB.Query("insert into flowers (name, price_per_bundle, stem_count) values ($1, $2, $3) returning *", flower.Name, flower.Price_Per_Bundle, flower.Stem_Count)

	if err != nil {
		log.Println(err)
		return Flower{}, err
	}

	flowerRow.Next()
	var newFlower Flower
	err = flowerRow.Scan(&newFlower.Id, &newFlower.Name, &newFlower.Price_Per_Bundle, &newFlower.Stem_Count, &newFlower.Price_Per_Stem)

	if err != nil {
		log.Println(err)
		return Flower{}, err
	}

	return newFlower, nil
}

func postArrangement(arrangement ArrangementDto) (ArrangementDto, error) {
	Tx, err := DB.Begin()

	var arrId int
	err = Tx.QueryRow(`insert into arrangements 
		(name, 
		vessel_type, 
		vessel_count, 
		vessel_price, 
		foam_count, 
		card_holder, 
		venmo,
		paypal,
		done,
		json)
		values (
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7,
			$8,
			$9,
			$10
		) returning id`,
		arrangement.Name,
		arrangement.Vessel_Type,
		arrangement.Vessel_Count,
		arrangement.Vessel_Price,
		arrangement.Foam_Count,
		arrangement.Card_Holder,
		arrangement.Venmo,
		arrangement.Paypal,
		arrangement.Done,
		arrangement.Json).Scan(&arrId)

	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	s := pq.CopyIn("arrangements_flowers", "flower_id", "arrangement_id", "count", "category", "price_override")
	stmt, err := Tx.Prepare(s)
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	for _, af := range arrangement.Flowers {
		_, err = stmt.Exec(af.Id, arrId, af.Count, af.Category, af.Price_Override)
		if err != nil {
			Tx.Rollback()
			log.Println(err)
			return ArrangementDto{}, err
		}
	}

	_, err = stmt.Exec()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	err = stmt.Close()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	h := pq.CopyIn("hard_goods", "arrangement_id", "name", "price")
	stmt2, err := Tx.Prepare(h)
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	for _, hg := range arrangement.Hard_Goods {
		_, err = stmt2.Exec(arrId, hg.Name, hg.Price)
		if err != nil {
			Tx.Rollback()
			log.Println(err)
			return ArrangementDto{}, err
		}
	}

	_, err = stmt2.Exec()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	err = stmt2.Close()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	if err == nil {
		err = Tx.Commit()
	}

	if err != nil {
		log.Println(err)
		return ArrangementDto{}, err
	}

	return getArrangement(arrId)
}

func patchArrangement(arrangement ArrangementDto) (ArrangementDto, error) {
	Tx, err := DB.Begin()

	_, err = Tx.Exec(`update arrangements 
						set 
							name = $1, 
							vessel_type = $2, 
							vessel_count = $3, 
							vessel_price = $4, 
							foam_count = $5, 
							card_holder = $6, 
							venmo = $7,
							paypal = $8,
							done = $9,
							json = $10
						where
							id = $11`,
		arrangement.Name,
		arrangement.Vessel_Type,
		arrangement.Vessel_Count,
		arrangement.Vessel_Price,
		arrangement.Foam_Count,
		arrangement.Card_Holder,
		arrangement.Venmo,
		arrangement.Paypal,
		arrangement.Done,
		arrangement.Json,
		arrangement.Id)

	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	Tx.Exec("delete from arrangements_flowers where arrangement_id = $1", arrangement.Id)

	s := pq.CopyIn("arrangements_flowers", "flower_id", "arrangement_id", "count", "category", "price_override")
	stmt, err := Tx.Prepare(s)
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	for _, af := range arrangement.Flowers {
		_, err = stmt.Exec(af.Id, arrangement.Id, af.Count, af.Category, af.Price_Override)
		if err != nil {
			Tx.Rollback()
			log.Println(err)
			return ArrangementDto{}, err
		}
	}

	_, err = stmt.Exec()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	err = stmt.Close()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	Tx.Exec("delete from hard_goods where arrangement_id = $1", arrangement.Id)

	h := pq.CopyIn("hard_goods", "arrangement_id", "name", "price")
	stmt2, err := Tx.Prepare(h)
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	for _, hg := range arrangement.Hard_Goods {
		_, err = stmt2.Exec(arrangement.Id, hg.Name, hg.Price)
		if err != nil {
			Tx.Rollback()
			log.Println(err)
			return ArrangementDto{}, err
		}
	}

	_, err = stmt2.Exec()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	err = stmt2.Close()
	if err != nil {
		Tx.Rollback()
		log.Println(err)
		return ArrangementDto{}, err
	}

	if err == nil {
		err = Tx.Commit()
	}

	if err != nil {
		log.Println(err)
		return ArrangementDto{}, err

	}

	return getArrangement(arrangement.Id)
}
