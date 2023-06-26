package components

import (
	p "github.com/pterm/pterm"
)

func GetMenuItems() map[rune]string {
	MenuItems := map[rune]string{
		'A': "Manage API Keys",
	}

	return MenuItems
}

func PrintMenu() {
	p.Println("\n\nMain Menu\n")
	menuItems := GetMenuItems()
	for option, description := range menuItems {
		p.Println(p.Sprintf("%c: %s", option, description))
	}
}
