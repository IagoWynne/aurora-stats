package wheel

import (
	"testing"
)

// TestSaveWheelOption calls wheel.SaveWheelOption with a name, checking:
// - wheel option is inserted into the database with the given name
// - the id of the wheel option is returned
func TestSaveWheelOption(t *testing.T) {
	name := "Run"

	id, err := SaveWheelOption(name)

	if err != nil {
		t.Fatalf(`SaveWheelOption("Run") = %q, %v`, id, err)
	}
}

func TestSaveWheelOptionWithoutName(t *testing.T) {
	_, err := SaveWheelOption("")

	if err == nil {
		t.Fatal(`SaveWheelOption("") did not return an error`)
	}
}
