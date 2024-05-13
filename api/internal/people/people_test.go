package people

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"testing"
)

type mockPersonRepository struct {
	createdId    int64
	createError  error
	createCalls  []map[string]string
	getAllPeople []DomainPerson
	getAllError  error
	deleteError  error
}

func (m mockPersonRepository) Create(firstName string, lastName string) (*int64, error) {
	m.createCalls = append(m.createCalls, map[string]string{"firstName": firstName, "lastName": lastName})
	return &m.createdId, m.createError
}

func (m mockPersonRepository) GetAll() ([]DomainPerson, error) {
	return m.getAllPeople, m.getAllError
}

func (m mockPersonRepository) Delete(id int64) error {
	return m.deleteError
}

func TestCreatePerson(t *testing.T) {
	cases := []struct {
		createdId       int64
		createError     error
		name            string
		expected        int64
		validationError error
		firstName       string
		lastName        string
	}{
		{
			name:        "Successful Create Person",
			createdId:   4,
			createError: nil,
			expected:    4,
			firstName:   "Test",
			lastName:    "Person",
		},
		{
			name:        "Database Error",
			createError: errors.New("Create person failed"),
			firstName:   "Test",
			lastName:    "Person",
		},
		{
			name:            "First Name Missing",
			validationError: customErrors.NewRequiredValueMissingError("firstName"),
			firstName:       "",
			lastName:        "Person",
		},
		{
			name:            "Last Name Missing",
			validationError: customErrors.NewRequiredValueMissingError("lastName"),
			firstName:       "Test",
			lastName:        "",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitPeopleRepo(&mockPersonRepository{
				createdId:   tc.createdId,
				createError: tc.createError,
			})

			actual, err := CreatePerson(tc.firstName, tc.lastName)

			if tc.createError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got: nil", tc.createError)
				} else if err.Error() != tc.createError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.createError, err)
				}
			} else if tc.validationError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got nil", tc.validationError)
				} else if err.Error() != tc.validationError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.validationError, err)
				}
			} else if err != nil {
				t.Errorf("Unexpected error: %s", err)
			} else if *actual != tc.expected {
				t.Errorf("Expected: %d. Got: %d", tc.expected, *actual)
			}
		})
	}
}
