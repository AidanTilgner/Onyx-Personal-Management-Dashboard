package flows

import (
	comps "onyx-personal-management-system-cli/components"
)

type ResetFunction func()

func Directory(decision rune, rs ResetFunction) {
	menuItems := comps.GetMenuItems()

	if _, ok := menuItems[decision]; !ok {
		comps.WarningText("Invalid selection")
		return
	}

	switch decision {
	case 'A':
		APIKeyFlow(rs)
		break
	}
}
