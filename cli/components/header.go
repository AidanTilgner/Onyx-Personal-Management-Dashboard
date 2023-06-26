package components

import (
	s "onyx-personal-management-system-cli/styles"

	p "github.com/pterm/pterm"
)

func Header() {
	header := p.DefaultHeader.WithBackgroundStyle(s.BlueBackground()).WithFullWidth(true)
	p.DefaultCenter.Println(header.Sprint("Welcome to The Onyx Personal Management System CLI!"))
}
