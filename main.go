package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
)

type IntegralExpressionInput struct {
	Expression string
	StepByStep string
	Result     string
}

type IntegralExpressionRequest struct {
	SecondsSinceFirstQuery int               `json:"secondsSinceFirstQuery"`
	Expression             string            `json:"expression"`
	ExpressionCanonical    string            `json:"expressionCanonical"`
	IntVar                 string            `json:"intVar"`
	LowerBound             string            `json:"lowerBound"`
	UpperBound             string            `json:"upperBound"`
	NumericalOnly          bool              `json:"numericalOnly"`
	SimplifyExpressions    bool              `json:"simplifyExpressions"`
	SimplifyAllRoots       bool              `json:"simplifyAllRoots"`
	ComplexMode            bool              `json:"complexMode"`
	KeepDecimals           bool              `json:"keepDecimals"`
	Alternatives           map[string]string `json:"alternatives"`
	LowerBoundCanonical    string            `json:"lowerBoundCanonical"`
	UpperBoundCanonical    string            `json:"upperBoundCanonical"`
}

type ExpressionResponse struct {
	Expression string        `json:"expression"`
	StepByStep template.HTML `json:"stepByStep"`
	Result     string        `json:"result"`
}

var dir, _ = os.Getwd()

// var dir, _ = filepath.Abs(filepath.Dir(os.Args[0]))

func main() {
	fmt.Println("Go app...")

	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir(dir+"/assets"))))
	http.HandleFunc("/", handleIndex)
	http.HandleFunc("/integral-form", handleIntegralForm)

	log.Fatal(http.ListenAndServe(":8000", nil))

	//simple test
	/*
		http.Handle(
			"/",
			//print hello world
			http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				fmt.Fprintln(w, "Hello, world!")
			}),
		)
		log.Fatal(http.ListenAndServe(":8000", nil))
	*/
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles(dir + "/index.html"))
	tmpl.ExecuteTemplate(w, "index.html", nil)
}

func handleIntegralForm(w http.ResponseWriter, r *http.Request) {
	time.Sleep(1 * time.Second)
	url := "https://www.integral-calculator.com/int.php"
	method := "POST"
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusInternalServerError)
		return
	}
	tmpl := template.Must(template.ParseFiles(dir + "/index.html"))

	collapseInput := r.FormValue("expression-value-collapse")
	expression := r.PostFormValue("expression-value")
	lowerBound := r.PostFormValue("lower-bound")
	upperBound := r.PostFormValue("upper-bound")

	expressionResponse := ExpressionResponse{
		Expression: "",
		StepByStep: "",
		Result:     "",
	}

	if expression == "" || lowerBound == "" || upperBound == "" {
		expressionResponse = ExpressionResponse{
			Expression: "",
			StepByStep: "",
			Result:     "Biểu thức trống hoặc các tham số không hợp lệ!",
		}

		tmpl.ExecuteTemplate(w, "executed-expression", expressionResponse)
		return

	}

	secondsSinceFirstQuery := 18 + rand.Int()%330
	queryString := "q=%7B%22secondsSinceFirstQuery%22%3A" + strconv.Itoa(secondsSinceFirstQuery) + "%2C%22expression%22%3A%22" + expression + "%22%2C%22expressionCanonical%22%3A%22" + collapseInput + "%22%2C%22intVar%22%3A%22x%22%2C%22lowerBound%22%3A%22" + lowerBound + "%22%2C%22upperBound%22%3A%22" + upperBound + "%22%2C%22numericalOnly%22%3Afalse%2C%22simplifyExpressions%22%3Afalse%2C%22simplifyAllRoots%22%3Afalse%2C%22complexMode%22%3Afalse%2C%22keepDecimals%22%3Afalse%2C%22alternatives%22%3A%7B%7D%2C%22lowerBoundCanonical%22%3A%22" + lowerBound + "%22%2C%22upperBoundCanonical%22%3A%22" + upperBound + "%22%7D&v=1678782505"
	payload := strings.NewReader(queryString)
	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

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
	reader := strings.NewReader(string(body))

	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		log.Fatal(err)
	}

	if doc.Find(".calc-error").Length() > 0 {
		expressionResponse.Result = "Đã có lỗi xảy ra, vui lòng thử lại!"
		tmpl.ExecuteTemplate(w, "executed-expression", expressionResponse)
		return
	}

	inputEquation := `\boldsymbol{f(x) =}`

	doc.Find("#calc .calc-content .calc-math").Each(func(i int, s *goquery.Selection) {
		if i != 0 {
			return
		}
		text := s.Text()
		re := regexp.MustCompile(`\$([^$]*)\$`)
		matches := re.FindAllStringSubmatch(text, -1)

		for _, match := range matches {
			inputEquation += match[1]
		}
	})
	expressionResponse.Expression = "$$" + inputEquation + "$$"
	resultResponsePre := `\Leftrightarrow \boldsymbol{\int\limits^{` + upperBound + `}_{` + lowerBound + `}{\operatorname{f}(x)}\,\mathrm{d}x =}`
	resultResponse := ``

	lastElementText := doc.Find(".calc-content").Last().Text()
	re := regexp.MustCompile(`\$([^$]*)\$`)
	matches := re.FindAllStringSubmatch(lastElementText, -1)
	for _, match := range matches {
		resultResponse += `$$` + resultResponsePre + match[1] + `$$`
	}
	expressionResponse.Result = resultResponse

	expressionResponse.StepByStep = template.HTML(getManualSteps(strconv.Itoa(secondsSinceFirstQuery), expression, collapseInput))
	tmpl.ExecuteTemplate(w, "executed-expression", expressionResponse)
}

func getManualSteps(secondsSinceFirstQueryString string, dataExpression string, dataExpressionCanonical string) string {
	returnString := ``

	url := "https://www.integral-calculator.com/manualint.php"
	method := "POST"

	payload := strings.NewReader("q=%7B%22secondsSinceFirstQuery%22%3A" + secondsSinceFirstQueryString + "%2C%22expression%22%3A%22" + dataExpression + "%22%2C%22expressionCanonical%22%3A%22" + dataExpressionCanonical + "%22%2C%22intVar%22%3A%22x%22%2C%22complexMode%22%3Afalse%2C%22keepDecimals%22%3Afalse%2C%22alternatives%22%3A%7B%7D%2C%22f%22%3A%22F%22%2C%22maximaFoundAnElementaryAntiderivative%22%3Atrue%2C%22c%22%3A%22C%22%7D&v=1678782505")

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return "Đã có lỗi xảy ra!!!"
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return "Đã có lỗi xảy ra!!!"
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return "Đã có lỗi xảy ra!!!"
	}
	reader := strings.NewReader(string(body))

	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		log.Fatal(err)
	}

	if doc.Find(".calc-error").Length() > 0 {
		return "Đã có lỗi xảy ra trong quá trình tính chi tiết kết quả!!!"
	}

	doc.Find("#manual-steps").Find(".calc-math").Each(func(i int, s *goquery.Selection) {
		html, err := goquery.OuterHtml(s)
		if err != nil {
			log.Fatal(err)
		}
		if strings.Contains(html, "choose an alternative") {
			return
		}
		if strings.Contains(html, "This is a special integral") {
			return
		}
		returnString += html
	})
	returnString = strings.ReplaceAll(returnString, "$", "$$")
	returnString = strings.ReplaceAll(returnString, "Problem:", "Giải:")
	returnString = strings.ReplaceAll(returnString, "Now solving:", "Giải:")
	returnString = strings.ReplaceAll(returnString, "Apply linearity:", "Áp dụng tích phân của tổng:")
	returnString = strings.ReplaceAll(returnString, "Apply power rule", "Giải tích phân số mũ:")
	returnString = strings.ReplaceAll(returnString, "Apply constant rule:", "Giải tích phân hằng số:")
	returnString = strings.ReplaceAll(returnString, "Plug in solved integrals:", "Ghép vào phương trình ban đầu:")
	returnString = strings.ReplaceAll(returnString, " with ", " với ")
	returnString = strings.ReplaceAll(returnString, "We will integrate by parts twice in a row:", "Giải tích phân từng phần:")
	returnString = strings.ReplaceAll(returnString, "First time:", "Phần 1:")
	returnString = strings.ReplaceAll(returnString, "Second time:", "Phần 2:")
	returnString = strings.ReplaceAll(returnString, "The integral", "Tích phân")
	returnString = strings.ReplaceAll(returnString, "appears again on the right side of the equation, we can solve for it:", "")
	returnString = strings.ReplaceAll(returnString, "Undo substitution", "Thế ngược lại:")
	returnString = strings.ReplaceAll(returnString, "Substitute ", "Thế ")
	returnString = strings.ReplaceAll(returnString, "The problem is solved:", "Kết quả:")
	returnString = strings.ReplaceAll(returnString, "Rewrite/simplify:", `$$\Leftrightarrow $$`)
	returnString = strings.ReplaceAll(returnString, "Prepare for substitution:", ``)
	returnString = strings.ReplaceAll(returnString, `$$\downarrow$$`, ``)

	return returnString
}
