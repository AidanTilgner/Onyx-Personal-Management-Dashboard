package components

import (
	p "github.com/pterm/pterm"
)

func PrintDefaultInfo(info string) {
	p.Info.Printfln(info)
}
