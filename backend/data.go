package main

import (
	"database/sql"
	"log"

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

func getArrangements() []ArrangementDto {
	argmtRows, err := DB.Query("select * from arrangements")

	if err != nil {
		log.Fatal(err)
	}

	defer argmtRows.Close()

	var argmtDtos []ArrangementDto

	for argmtRows.Next() {
		var argmt ArrangementDto
		err2 := argmtRows.Scan(&argmt.Id, &argmt.Name, &argmt.Vessel_Type, &argmt.Vessel_Count, &argmt.Foam_Count, &argmt.Card_Holder, &argmt.Venmo, &argmt.Paypal, &argmt.Done, &argmt.Vessel_Cost, &argmt.Json)

		if err2 != nil {
			log.Fatal(err2)
		}

		f := getFlowersForArrangement(argmt.Id)

		argmt.Flowers = f

		argmtDtos = append(argmtDtos, argmt)
	}

	return argmtDtos
}

func getFlowersForArrangement(arrangement_id int) []ArrangementFlowerDto {
	argmtFlowerRows, err := DB.Query("select f.id, f.name, af.count, af.category, f.price_per_stem from arrangements_flowers af, flowers f where af.arrangement_id = $1 and af.flower_id = f.id", arrangement_id)

	if err != nil {
		log.Fatal(err)
	}

	defer argmtFlowerRows.Close()

	var flowers []ArrangementFlowerDto
	for argmtFlowerRows.Next() {
		var flower ArrangementFlowerDto
		err := argmtFlowerRows.Scan(&flower.Id, &flower.Name, &flower.Count, &flower.Category, &flower.Price_Per_Stem)

		if err != nil {
			log.Fatal(err)
		}

		flowers = append(flowers, flower)
	}

	return flowers
}

// func updateArrangement(arrangement ArrangementDto) (ArrangementDto, error) {
// 	DB.Query("update arrangements")
// }

func getFlowers() []Flower {
	flowerRows, err := DB.Query("select * from flowers order by name")

	if err != nil {
		log.Fatal(err)
	}

	defer flowerRows.Close()

	var flowers []Flower
	for flowerRows.Next() {
		var flower Flower
		err := flowerRows.Scan(&flower.Id, &flower.Name, &flower.Price_Per_Bundle, &flower.Stem_Count, &flower.Price_Per_Stem)

		if err != nil {
			log.Fatal(err)
		}

		flowers = append(flowers, flower)
	}

	return flowers
}

func patchFlower(flower Flower) Flower {
	flowerRow, err1 := DB.Query("update flowers set name = $1, price_per_bundle = $2, stem_count = $3 where id = $4 returning *", flower.Name, flower.Price_Per_Bundle, flower.Stem_Count, flower.Id)

	if err1 != nil {
		log.Fatal(err1)
	}

	flowerRow.Next()
	var updatedFlower Flower
	err2 := flowerRow.Scan(&updatedFlower.Id, &updatedFlower.Name, &updatedFlower.Price_Per_Bundle, &updatedFlower.Stem_Count, &updatedFlower.Price_Per_Stem)

	if err2 != nil {
		log.Fatal(err2)
	}

	return updatedFlower

}
