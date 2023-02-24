package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path"
	"strings"
)

func main() {
	connectDb()

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
		case "POST":
			decoder := json.NewDecoder(r.Body)
			var a ArrangementDto
			err := decoder.Decode(&a)
			if err != nil {
				panic(err)
			}
			updatedArrangement := postArrangement(a)
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

	// http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fs := http.FileServer(http.Dir("./static/"))
		// If the requested file exists then return if; otherwise return index.html (fileserver default page)
		if r.URL.Path != "/api" {
			fullPath := "./static/" + strings.TrimPrefix(path.Clean(r.URL.Path), "/")
			_, err := os.Stat(fullPath)
			if err != nil {
				if !os.IsNotExist(err) {
					panic(err)
				}
				// Requested file does not exist so we return the default (resolves to index.html)
				r.URL.Path = "/"
			}
		}
		fs.ServeHTTP(w, r)
		// http.FileServer(http.Dir("./static"))
	})

	http.ListenAndServe(":8888", nil)

}
