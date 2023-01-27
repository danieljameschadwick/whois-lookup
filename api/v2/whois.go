package handler

import (
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
  "os"
)

func Handler(w http.ResponseWriter, r *http.Request) {
  client := &http.Client{}
  req, err := http.NewRequest("GET", "https://api.apilayer.com/whois/check?domain=danielchadwick.co.uk", nil)
  req.Header.Add("apikey", os.Getenv("APILAYER_API_KEY"))

  res, err := client.Do(req)
  
  if err != nil {
      fmt.Print(err.Error())
      os.Exit(1)
  }

  responseData, err := ioutil.ReadAll(res.Body)

  if err != nil {
      log.Fatal(err)
  }

  fmt.Fprintf(w, string(responseData))
}
