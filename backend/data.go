package main

import (
	"database/sql"
	"fmt"
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

func getFlowersForArrangement(arrangement_id int) []FlowerDto {
	argmtFlowerRows, err := DB.Query(fmt.Sprintf("select f.id, f.name, af.count, af.category, f.price_per_stem from arrangements_flowers af, flowers f where af.arrangement_id = %d and af.flower_id = f.id", arrangement_id))

	if err != nil {
		log.Fatal(err)
	}

	defer argmtFlowerRows.Close()

	var flowers []FlowerDto
	for argmtFlowerRows.Next() {
		var flower FlowerDto
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
