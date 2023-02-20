package main

import (
	"encoding/json"
	"net/http"
)

func main() {
	connectDb()

	// http.Handle("/", http.FileServer(http.Dir("./static")))

	http.HandleFunc("/api/arrangements", func(w http.ResponseWriter, r *http.Request) {

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
			updatedArrangement := patchArrangement(a)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(updatedArrangement)
		}
	})

	http.HandleFunc("/api/flowers", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {
		case "GET":
			flowers := getFlowers()
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(flowers)
		case "PATCH":
			decoder := json.NewDecoder(r.Body)
			var flower Flower
			err := decoder.Decode(&flower)
			if err != nil {
				panic(err)
			}
			updatedFlower := patchFlower(flower)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(updatedFlower)
		case "POST":
			decoder := json.NewDecoder(r.Body)
			var flower Flower
			err := decoder.Decode(&flower)
			if err != nil {
				panic(err)
			}
			newFlower := createFlower(flower)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(newFlower)
		}
	})

	http.ListenAndServe(":80", nil)

}
