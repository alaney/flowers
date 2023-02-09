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
		err2 := argmtRows.Scan(&argmt.id, &argmt.name, &argmt.vessel_type, &argmt.vessel_count, &argmt.foam_count, &argmt.card_holder, &argmt.venmo, &argmt.paypal, &argmt.done, &argmt.vessel_cost, &argmt.json)

		if err2 != nil {
			log.Fatal(err2)
		}

		f := getFlowersForArrangement(argmt.id)

		argmt.flowers = f

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
		err := argmtFlowerRows.Scan(&flower.id, &flower.name, &flower.count, &flower.category, &flower.price_per_stem)

		if err != nil {
			log.Fatal(err)
		}

		flowers = append(flowers, flower)
	}

	return flowers
}
