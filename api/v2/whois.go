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
	url := fmt.Sprintf("https://api.apilayer.com/whois/check?domain=%s", r.URL.Query().Get("domain"))
	req, err := http.NewRequest("GET", url, nil)
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
