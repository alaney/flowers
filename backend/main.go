package main

import (
	"encoding/json"
	"net/http"
)

func main() {
	connectDb()

	http.HandleFunc("/arrangements", func(w http.ResponseWriter, r *http.Request) {
		argmts := getArrangements()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(argmts)
	})

	http.ListenAndServe(":80", nil)

}
