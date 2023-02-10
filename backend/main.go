package main

import (
	"encoding/json"
	"net/http"
)

func main() {
	connectDb()

	http.HandleFunc("/arrangements", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {
		case "GET":
			arrangements := getArrangements()
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(arrangements)
		case "PATCH":
			decoder := json.NewDecoder(r.Body)
			var a ArrangementDto
			err := decoder.Decode(&a)
			if err != nil {
				panic(err)
			}
			// updateArrangement(a)
		}
	})

	http.HandleFunc("/flowers", func(w http.ResponseWriter, r *http.Request) {
		flowers := getFlowers()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(flowers)
	})

	http.ListenAndServe(":80", nil)

}
