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

func getData() {
	rows, err := DB.Query("select * from flowers")

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var flower Flower
		err2 := rows.Scan(&flower.id, &flower.name)

		log.Println(flower.id, flower.name)
		if err2 != nil {
			log.Fatal(err)
		}
	}
}
