package main

//func main() {
//
//	url := "https://www.integral-calculator.com/int.php"
//	method := "POST"
//
//	secondsSinceFirstQuery := 18 + rand.Int()%330
//	secondsSinceFirstQueryString := fmt.Sprintf("%d", secondsSinceFirstQuery)
//	expression := "(sin(sqrt(x)%2Ba)+*+e%5Esqrt(x))+%2F+sqrt(x)"
//	expressionCanonical := "*(%5E(e%2C%5E(x%2C%5E(2%2C-1)))%2C%5E(x%2C*(-1%2C%5E(2%2C-1)))%2Csin(%2B(a%2C%5E(x%2C%5E(2%2C-1)))))"
//
//	queryString := "q=%7B%22secondsSinceFirstQuery%22%3A" + secondsSinceFirstQueryString + "%2C%22expression%22%3A%22" + expression + "%22%2C%22expressionCanonical%22%3A%22" + expressionCanonical + "%22%2C%22intVar%22%3A%22x%22%2C%22lowerBound%22%3A%222%22%2C%22upperBound%22%3A%223%22%2C%22numericalOnly%22%3Afalse%2C%22simplifyExpressions%22%3Afalse%2C%22simplifyAllRoots%22%3Afalse%2C%22complexMode%22%3Afalse%2C%22keepDecimals%22%3Afalse%2C%22alternatives%22%3A%7B%7D%2C%22lowerBoundCanonical%22%3A%222%22%2C%22upperBoundCanonical%22%3A%223%22%7D&v=1678782505"
//	payload := strings.NewReader(queryString)
//	fmt.Println(payload)
//	client := &http.Client{}
//	req, err := http.NewRequest(method, url, payload)
//
//	if err != nil {
//		fmt.Println(err)
//		return
//	}
//	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
//
//	res, err := client.Do(req)
//	if err != nil {
//		fmt.Println(err)
//		return
//	}
//	defer res.Body.Close()
//
//	body, err := ioutil.ReadAll(res.Body)
//	if err != nil {
//		fmt.Println(err)
//		return
//	}
//
//	// reader := strings.NewReader(string(body))
//
//	fmt.Println(string(body))
//
//	// doc, err := goquery.NewDocumentFromReader(reader)
//	// if err != nil {
//	// 	log.Fatal(err)
//	// }
//
//	manualSteps := getManualSteps(secondsSinceFirstQueryString, expression, expressionCanonical)
//	fmt.Println(manualSteps)
//}
