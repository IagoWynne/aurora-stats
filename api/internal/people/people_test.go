package people

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"testing"
)

type mockPersonRepository struct {
	createdId    int64
	createError  error
	getAllPeople []DomainPerson
	getAllError  error
	deleteError  error
}

func (m mockPersonRepository) Create(firstName string, lastName string) (*int64, error) {
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
			name:        "It creates a new person and returns the id",
			createdId:   4,
			createError: nil,
			expected:    4,
			firstName:   "Test",
			lastName:    "Person",
		},
		{
			name:        "It returns an error if there is an error creating the person in the repo",
			createError: errors.New("Create person failed"),
			firstName:   "Test",
			lastName:    "Person",
		},
		{
			name:            "It returns a required value missing error for firstName if firstName is missing",
			validationError: customErrors.NewRequiredValueMissingError("firstName"),
			firstName:       "",
			lastName:        "Person",
		},
		{
			name:            "It returns a required value missing error for lastName if lastName is missing",
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

func TestGetAll(t *testing.T) {
	cases := []struct {
		name         string
		expectedIds  []int64
		getAllPeople []DomainPerson
		getAllError  error
	}{
		{name: "It returns a list of people",
			getAllPeople: []DomainPerson{
				{
					FirstName: "Test 1",
					LastName:  "Test 1",
					ID:        1,
				},
				{
					FirstName: "Test 2",
					LastName:  "Test 2",
					ID:        2,
				}},
			expectedIds: []int64{1, 2},
		},
		{
			name:        "It returns an empty array if there's an error retrieving people from the repo",
			getAllError: errors.New("Error"),
			expectedIds: []int64{},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitPeopleRepo(&mockPersonRepository{
				getAllPeople: tc.getAllPeople,
				getAllError:  tc.getAllError,
			})

			actual := GetAll()

			if len(actual) != len(tc.expectedIds) {
				t.Errorf("Actual array length does not match expected array length. Expected: %v. Got: %v", len(tc.expectedIds), len(actual))
			}

			if len(tc.expectedIds) == 0 {
				return
			}

			for i, person := range actual {
				if person.ID != tc.expectedIds[i] {
					t.Errorf("Actual ID at index %v does not match expected. Expected: %v. Got: %v", i, tc.expectedIds[i], person.ID)
				}
			}

		})
	}
}

func TestDeletePerson(t *testing.T) {
	cases := []struct {
		name             string
		personId         string
		deleteError      error
		expectedErrorMsg string
	}{
		{
			name:     "It returns nil if the operation is successful",
			personId: "5",
		},
		{
			name:             "It returns an error if the id cannot be parsed to int64",
			personId:         "Squirrel",
			expectedErrorMsg: "there was an error deleting this person",
		},
		{
			name:             "It returns an error if the record cannot be located",
			personId:         "3",
			deleteError:      customErrors.NewNotFoundError("person", 3),
			expectedErrorMsg: "there was an error deleting this person",
		},
		{
			name:             "It returns an error if there are any other errors",
			personId:         "4",
			deleteError:      errors.New("Unexpected error"),
			expectedErrorMsg: "there was an error deleting this person",
		},
	}

	for _, tc := range cases {
		InitPeopleRepo(&mockPersonRepository{
			deleteError: tc.deleteError,
		})

		err := DeletePerson(tc.personId)

		if tc.expectedErrorMsg == "" && err != nil {
			t.Errorf("Unexpected error: %s", err)
		} else if tc.expectedErrorMsg != "" && err.Error() != tc.expectedErrorMsg {
			t.Errorf("Expected does not match actual. Expected: %s. Got: %s", tc.expectedErrorMsg, err.Error())
		}
	}
}
