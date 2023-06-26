package components

import (
	"fmt"

	"github.com/pterm/pterm"
)

func AskText(query string) string {
	printer := &pterm.InteractiveTextInputPrinter{
		DefaultText: query,
		TextStyle:   &pterm.ThemeDefault.PrimaryStyle,
	}
	result, _ := printer.Show()
	fmt.Println()
	return result
}

func AskRune(query string) rune {
	asString := AskText(query)
	// if it's convertable to a rune, return it
	if len(asString) == 1 {
		return rune(asString[0])
	}
	// otherwise, return the null rune
	return rune(0)
}

func WarningText(text string) {
	pterm.Warning.Println(text)
}

func InfoText(text string) {
	pterm.Info.Println(text)
}
