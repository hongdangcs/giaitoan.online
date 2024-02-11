package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"net/url"
	"strings"
	"time"
)

func main() {

	http.HandleFunc("/api/v1/calculate", func(w http.ResponseWriter, r *http.Request) {

		integral_url := "https://www.integral-calculator.com/int.php"
		method := "POST"

		queryString := r.URL.Query()
		expression := queryString.Get("expression")
		expressionCanonical := queryString.Get("expressionCanonical")
		lowerBound := queryString.Get("lowerBound")
		upperBound := queryString.Get("upperBound")

		secondsSinceFirstQuery := 18 + rand.Int()%330
		intVar := "x"
		numericalOnly := "false"
		simplifyExpressions := "false"
		simplifyAllRoots := "false"
		complexMode := "false"
		keepDecimals := "false"
		alternatives := "{}"
		lowerBoundCanonical := lowerBound
		upperBoundCanonical := upperBound
		v := "1678782505"

		jsonString := `q={"secondsSinceFirstQuery":` + fmt.Sprintf("%d", secondsSinceFirstQuery) + `,"expression":"` + expression + `","expressionCanonical":"` + expressionCanonical + `","intVar":"` + intVar + `","lowerBound":"` + lowerBound + `","upperBound":"` + upperBound + `","numericalOnly":` + numericalOnly + `,"simplifyExpressions":` + simplifyExpressions + `,"simplifyAllRoots":` + simplifyAllRoots + `,"complexMode":` + complexMode + `,"keepDecimals":` + keepDecimals + `,"alternatives":` + alternatives + `,"lowerBoundCanonical":"` + lowerBoundCanonical + `","upperBoundCanonical":"` + upperBoundCanonical + `"}` + "&v=" + v
		encodedJsonString := url.QueryEscape(jsonString)
		payload := strings.NewReader(encodedJsonString)

		client := &http.Client{}
		req, err := http.NewRequest(method, integral_url, payload)

		if err != nil {
			fmt.Println(err)
			return
		}
		req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Add("Cookie", "gdpr=0")

		res, err := client.Do(req)

		if err != nil {
			fmt.Println(err)
			return
		}
		defer res.Body.Close()
		body, err := ioutil.ReadAll(res.Body)

		if err != nil {
			fmt.Println(err)
			return

		}
		fmt.Println(encodedJsonString)
		w.Write(body)

	})

	http.HandleFunc("/api/v1/manual", func(w http.ResponseWriter, r *http.Request) {
		url := "https://www.integral-calculator.com/manualint.php"
		method := "POST"

		payload := strings.NewReader("q=%7B%22secondsSinceFirstQuery%22%3A19%2C%22expression%22%3A%22(((sin((sqrt(x))%2Ba))*(%25e%5E(sqrt(x))))%2F(sqrt(x)))%22%2C%22expressionCanonical%22%3A%22*(%5E(e%2C%5E(x%2C%5E(2%2C-1)))%2C%5E(x%2C*(-1%2C%5E(2%2C-1)))%2Csin(%2B(a%2C%5E(x%2C%5E(2%2C-1)))))%22%2C%22intVar%22%3A%22x%22%2C%22complexMode%22%3Afalse%2C%22keepDecimals%22%3Afalse%2C%22alternatives%22%3A%7B%7D%2C%22f%22%3A%22F%22%2C%22shareURL%22%3A%22https%3A%2F%2Fwww.integral-calculator.com%2F%23expr%3D%2528sin%2528sqrt%2528x%2529%252Ba%2529%252Ae%255Esqrt%2528x%2529%2529%252Fsqrt%2528x%2529%22%2C%22maximaFoundAnElementaryAntiderivative%22%3Atrue%2C%22c%22%3A%22C%22%7D&v=1678782505")

		client := &http.Client{}
		req, err := http.NewRequest(method, url, payload)

		if err != nil {
			fmt.Println(err)
			return
		}
		req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Add("Cookie", "gdpr=0")

		currentTime := time.Now()
		res, err := client.Do(req)
		fmt.Println("/manual executed in: ", time.Since(currentTime))
		if err != nil {
			fmt.Println(err)
			return
		}
		defer res.Body.Close()

	})

	http.ListenAndServe(":3050", nil)

}
