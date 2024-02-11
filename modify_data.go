package main

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"log"
	"strings"
)

func main() {
	html := `<html><body><div id="example" data-custom="123">Hello, <span>world!</span></div></body></html>`

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		log.Fatal(err)
	}

	// Find the element by ID
	element := doc.Find("#example")

	// Get the value of the "data-custom" attribute
	customData, _ := element.Attr("data-custom")

	fmt.Println("Custom Data:", customData)
}
