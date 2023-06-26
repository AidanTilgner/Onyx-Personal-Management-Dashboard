package helpers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type APIKeys map[string][]string

func AddAPIKey(service string) error {
	filePath := ".api-keys.json"

	// Read the JSON file
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("error reading file: %v", err)
	}

	// Unmarshal the JSON data into a map
	var keys APIKeys
	if err := json.Unmarshal(data, &keys); err != nil {
		return fmt.Errorf("error unmarshaling JSON: %v", err)
	}

	generatedString, err := GenerateRandomBytes(32)

	if err != nil {
		return fmt.Errorf("error generating API key: %v", err)
	}

	newAPIKey := "sk-" + generatedString

	// Add the service and generate a key
	if _, exists := keys[service]; exists {
		keys[service] = append(keys[service], newAPIKey)
	} else {
		keys[service] = []string{newAPIKey}
	}

	// Marshal the updated map back to JSON
	updatedData, err := json.MarshalIndent(keys, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling JSON: %v", err)
	}

	// Write the updated JSON back to the file
	if err := ioutil.WriteFile(filePath, updatedData, 0644); err != nil {
		return fmt.Errorf("error writing file: %w", err)
	}

	return nil
}
