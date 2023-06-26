package flows

import (
	comps "onyx-personal-management-dashboard-cli/components"
	helpers "onyx-personal-management-dashboard-cli/helpers"

	"github.com/pterm/pterm"
)

func APIKeyFlow(rs ResetFunction) {
	pterm.Println("[A]dd an API key")
	selection := comps.AskRune("What would you like to do?")

	switch selection {
	case 'A':
		AddAPIKey(rs)
		break
	}
}

func AddAPIKey(rs ResetFunction) {
	service := comps.AskText("What service would you like to add?")
	err := helpers.AddAPIKey(service)

	if err != nil {
		comps.WarningText(err.Error())
		rs()
		return
	}

	comps.InfoText("API key added successfully!")
	rs()
}
