package main

import (
	comps "onyx-personal-management-system-cli/components"
	flows "onyx-personal-management-system-cli/flows"
)

func main() {
	comps.Header()
	mainMenu()
}

func mainMenu() {
	comps.PrintMenu()
	decision := comps.AskRune("Enter selection")
	flows.Directory(decision, mainMenu)
}
