package wheel

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"log"
	"testing"
	"time"
)

type mockWheelRepository struct {
	createOptionId   int64
	createWheelRunId int64
	wheelOptions     []DomainWheelOption
	wheelResults     []DomainWheelResult
	returnedError    error
}

func (m mockWheelRepository) CreateOption(optionName string) (int64, error) {
	return m.createOptionId, m.returnedError
}

func (m mockWheelRepository) CreateWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error) {
	return m.createWheelRunId, m.returnedError
}

func (m mockWheelRepository) GetOptions() ([]DomainWheelOption, error) {
	return m.wheelOptions, m.returnedError
}

func (m mockWheelRepository) GetWheelResults(filters GetWheelRunFilters) ([]DomainWheelResult, error) {
	return m.wheelResults, m.returnedError
}

func TestSaveWheelOption(t *testing.T) {
	cases := []struct {
		name            string
		createOptionId  int64
		wheelOptionName string
		returnedError   error
		expected        int64
		expectedError   error
	}{
		{
			name:            "It creates a new option and returns the id",
			createOptionId:  7,
			wheelOptionName: "Test Option",
			expected:        7,
		},
		{
			name:            "It returns an error if there is an error creating the wheel option",
			wheelOptionName: "Test Option",
			returnedError:   errors.New("blargh"),
			expectedError:   errors.New("there was an error creating this wheel option"),
		},
		{
			name:            "It returns an error if the option name is empty",
			wheelOptionName: "",
			expectedError:   customErrors.NewRequiredValueMissingError("name"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitWheelRepo(&mockWheelRepository{
				createOptionId: tc.createOptionId,
				returnedError:  tc.returnedError,
			})

			actual, err := SaveWheelOption(tc.wheelOptionName)

			if tc.expectedError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got nil", tc.expectedError)
				} else if err.Error() != tc.expectedError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.expectedError, err)
				}
			} else if err != nil {
				t.Errorf("Unexpected error: %s", err)
			} else if tc.expected != actual {
				t.Errorf("Expected: %d. Got: %d", tc.expected, actual)
			}
		})
	}
}

func TestGetAllWheelOptions(t *testing.T) {
	cases := []struct {
		name            string
		wheelOptions    []DomainWheelOption
		expectedOptions []DomainWheelOption
		returnedError   error
		expectedError   error
	}{
		{
			name: "It returns the wheel options",
			wheelOptions: []DomainWheelOption{
				{
					ID:   1,
					Name: "Option 1",
				},
				{
					ID:   4,
					Name: "Option 4",
				},
				{
					ID:   6,
					Name: "Option 6",
				},
			},
			expectedOptions: []DomainWheelOption{
				{
					ID:   1,
					Name: "Option 1",
				},
				{
					ID:   4,
					Name: "Option 4",
				},
				{
					ID:   6,
					Name: "Option 6",
				},
			},
		},
		{
			name:          "It returns an error if there was an error retrieving the wheel options",
			returnedError: errors.New("error"),
			expectedError: errors.New("there was an error retrieving the wheel options"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitWheelRepo(&mockWheelRepository{
				wheelOptions:  tc.wheelOptions,
				returnedError: tc.returnedError,
			})

			actual, err := GetAllWheelOptions()

			if tc.expectedError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got nil", tc.expectedError)
				} else if err.Error() != tc.expectedError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.expectedError, err)
				}
			} else if err != nil {
				t.Errorf("Unexpected error: %s", err)
			}

			if len(actual) != len(tc.expectedOptions) {
				t.Errorf("Actual array length does not match expected array length. Expected: %v. Got: %v", len(tc.expectedOptions), len(actual))
			}

			if len(tc.expectedOptions) == 0 {
				return
			}

			for i, item := range actual {
				if item.ID != tc.expectedOptions[i].ID {
					t.Errorf("Actual item at index %v does not match expected. Expected: %v. Got: %v", i, tc.expectedOptions[i], item)
				}
			}
		})
	}
}

func TestSaveWheelRun(t *testing.T) {
	cases := []struct {
		name             string
		date             time.Time
		winnerId         int64
		resultId         int64
		createWheelRunId int64
		expected         int64
		returnedError    error
		expectedError    error
	}{
		{
			name:             "It should save a wheel run",
			date:             parseTime("2024-05-17"),
			winnerId:         5,
			resultId:         2,
			createWheelRunId: 4,
			expected:         4,
		},
		{
			name:             "It should return an error when there is no date",
			winnerId:         5,
			resultId:         2,
			createWheelRunId: 4,
			expectedError:    customErrors.NewRequiredValueMissingError("date"),
		},
		{
			name:          "It should return an error when there is no winnerId",
			date:          parseTime("2024-05-17"),
			resultId:      2,
			expectedError: customErrors.NewRequiredValueMissingError("winnerId"),
		},
		{
			name:          "It should return an error when there is no resultId",
			date:          parseTime("2024-05-17"),
			winnerId:      5,
			expectedError: customErrors.NewRequiredValueMissingError("resultId"),
		},
		{
			name:          "It should return an error indicating there are multiple missing fields",
			expectedError: customErrors.NewMultipleRequiredValueMissingError([]string{"date", "winnerId", "resultId"}),
		},
		{
			name:          "It should return an error if there was an error saving the wheel run",
			date:          parseTime("2024-05-17"),
			winnerId:      5,
			resultId:      2,
			returnedError: errors.New("cheese alert"),
			expectedError: errors.New("there was an error saving this wheel run"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitWheelRepo(&mockWheelRepository{
				createWheelRunId: tc.createWheelRunId,
				returnedError:    tc.returnedError,
			})

			actual, err := SaveWheelRun(tc.date, tc.winnerId, tc.resultId)

			if tc.expectedError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got nil", tc.expectedError)
				} else if err.Error() != tc.expectedError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.expectedError, err)
				}
			} else if err != nil {
				t.Errorf("Unexpected error: %s", err)
			} else if tc.expected != actual {
				t.Errorf("Expected: %d. Got: %d", tc.expected, actual)
			}
		})
	}
}

func TestGetWheelRuns(t *testing.T) {
	cases := []struct {
		name          string
		from          time.Time
		to            *time.Time
		wheelResults  []DomainWheelResult
		expectedIds   []int64
		returnedError error
		expectedError error
	}{
		{
			name: "It returns the wheel results",
			from: parseTime("2024-04-17"),
			to:   toPointer(parseTime("2024-05-17")),
			wheelResults: []DomainWheelResult{
				{
					ID: 4,
				},
				{
					ID: 7,
				},
				{
					ID: 9,
				},
			},
			expectedIds: []int64{4, 7, 9},
		},
		// TODO: more cases
	}
	// TODO: run the test cases
}

func parseTime(dateString string) time.Time {
	t, err := time.Parse("2006-01-02", dateString)
	if err != nil {
		log.Fatal(err)
	}

	return t
}

func toPointer[T any](obj T) *T {
	return &obj
}
