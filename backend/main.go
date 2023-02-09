package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	connectDb()

	argmts := getArrangements()

	log.Println(argmts)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	})

	http.ListenAndServe(":80", nil)

}
