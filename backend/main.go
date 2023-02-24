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
			arrangements, err := getArrangements()
			w.Header().Set("Content-Type", "application/json")

			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(err)
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(arrangements)
			}
		case "PATCH":
			w.Header().Set("Content-Type", "application/json")
			decoder := json.NewDecoder(r.Body)
			var a ArrangementDto
			err := decoder.Decode(&a)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(err)
			} else {
				updatedArrangement, err := patchArrangement(a)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(err)
				} else {
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(updatedArrangement)
				}
			}
		case "POST":
			w.Header().Set("Content-Type", "application/json")
			decoder := json.NewDecoder(r.Body)
			var a ArrangementDto
			err := decoder.Decode(&a)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(err)
			} else {
				updatedArrangement, err := postArrangement(a)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(err)
				} else {
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(updatedArrangement)
				}
			}
		}
	})

	http.HandleFunc("/api/flowers", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {
		case "GET":
			flowers, err := getFlowers()
			w.Header().Set("Content-Type", "application/json")
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(err)
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(flowers)
			}
		case "PATCH":
			w.Header().Set("Content-Type", "application/json")
			decoder := json.NewDecoder(r.Body)
			var flower Flower
			err := decoder.Decode(&flower)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(err)
			} else {
				updatedFlower, err := patchFlower(flower)

				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(err)
				} else {
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(updatedFlower)
				}
			}
		case "POST":
			w.Header().Set("Content-Type", "application/json")
			decoder := json.NewDecoder(r.Body)
			var flower Flower
			err := decoder.Decode(&flower)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(err)
			} else {
				newFlower, err := createFlower(flower)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(err)
				} else {
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(newFlower)
				}
			}
		}
	})

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
	})

	http.ListenAndServe(":8888", nil)

}
