package handler

import (
  "fmt"
  "net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
  fmt.Println("----------")
  fmt.Println(r.URL.Query())
  fmt.Println(r.URL.Query().Get("domain"))

  url := fmt.Sprintf("https://api.apilayer.com/whois/check?domain=%s", r.URL.Query().Get("domain"))

  fmt.Println(url)

  fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
