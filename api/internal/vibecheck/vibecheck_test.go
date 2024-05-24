package vibecheck

import (
	customErrors "aurora-stats/api/internal/errors"
	"aurora-stats/api/internal/people"
	"errors"
	"log"
	"testing"
	"time"
)

type mockVibeCheckReposity struct {
	createError error
	getScores   []DomainVibeCheckScore
	getError    error
	updateError error
}

func (m mockVibeCheckReposity) Create(date time.Time, scores []DomainVibeCheckScore) error {
	return m.createError
}

func (m mockVibeCheckReposity) GetBetweenDates(from time.Time, to time.Time) ([]DomainVibeCheckScore, error) {
	return m.getScores, m.getError
}

func (m mockVibeCheckReposity) Update(id int64, score float64) error {
	return m.updateError
}

func TestSaveVibeCheck(t *testing.T) {
	cases := []struct {
		name          string
		createError   error
		scores        []DomainVibeCheckScore
		date          time.Time
		expectedError error
	}{
		{
			name: "It saves the vibe check scores",
			scores: []DomainVibeCheckScore{
				{
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 1,
				},
				{
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 10,
				},
				{
					Person: people.DomainPerson{
						ID: 3,
					},
					Score: 5,
				},
			},
			date: parseTime("2024-05-23"),
		},
		{
			name: "It returns an error when there is no date",
			scores: []DomainVibeCheckScore{
				{
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 5,
				},
				{
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 6,
				},
			},
			expectedError: customErrors.NewRequiredValueMissingError("date"),
		},
		{
			name:          "It returns an error if no scores are provided",
			date:          parseTime("2024-05-23"),
			expectedError: customErrors.NewRequiredValueMissingError("scores"),
		},
		{
			name: "It returns an error if a score is missing",
			date: parseTime("2024-05-23"),
			scores: []DomainVibeCheckScore{
				{
					Person: people.DomainPerson{
						ID: 1,
					},
				},
				{
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 6,
				},
			},
			expectedError: customErrors.NewInvalidValueError("score", 0),
		},
		{
			name: "It returns an error if a score is < 1",
			date: parseTime("2024-05-23"),
			scores: []DomainVibeCheckScore{
				{
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: -1,
				},
				{
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 6,
				},
			},
			expectedError: customErrors.NewInvalidValueError("score", -1),
		},
		{
			name: "It returns an error if a score is > 10",
			date: parseTime("2024-05-23"),
			scores: []DomainVibeCheckScore{
				{
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 3,
				},
				{
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 11,
				},
			},
			expectedError: customErrors.NewInvalidValueError("score", 11),
		},
		{
			name: "It returns an error if there was an error saving the vibe check scores",
			date: parseTime("2024-05-23"),
			scores: []DomainVibeCheckScore{
				{
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 3,
				},
				{
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 10,
				},
			},
			createError:   errors.New("excessive ice cream alert"),
			expectedError: errors.New("there was an error saving the vibe check scores"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitVibeCheckRepo(&mockVibeCheckReposity{
				createError: tc.createError,
			})

			err := SaveVibeCheck(tc.date, tc.scores)

			if tc.expectedError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got nil", tc.expectedError)
				} else if err.Error() != tc.expectedError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.expectedError, err)
				}
			} else if err != nil {
				t.Errorf("Unexpected error: %s", err)
			}
		})
	}
}

func TestGetVibeChecksBetween(t *testing.T) {
	cases := []struct {
		name               string
		getScores          []DomainVibeCheckScore
		getError           error
		from               time.Time
		to                 time.Time
		expectedVibeChecks []DomainVibeCheck
		expectedError      error
	}{
		{
			name: "It gets the vibe check data between from and to",
			getScores: []DomainVibeCheckScore{
				{
					ID: 1,
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 5,
					Date:  parseTime("2024-05-23"),
				},
				{
					ID: 2,
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 5,
					Date:  parseTime("2024-05-23"),
				},
				{
					ID: 3,
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 6,
					Date:  parseTime("2024-05-24"),
				},
				{
					ID: 4,
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 9,
					Date:  parseTime("2024-05-24"),
				},
				{
					ID: 5,
					Person: people.DomainPerson{
						ID: 1,
					},
					Score: 6,
					Date:  parseTime("2024-05-22"),
				},
				{
					ID: 6,
					Person: people.DomainPerson{
						ID: 2,
					},
					Score: 9,
					Date:  parseTime("2024-05-22"),
				},
				{
					ID: 7,
					Person: people.DomainPerson{
						ID: 3,
					},
					Score: 3,
					Date:  parseTime("2024-05-22"),
				},
			},
			from: parseTime("2024-05-22"),
			to:   parseTime("2024-05-24"),
			expectedVibeChecks: []DomainVibeCheck{
				{
					Date: parseTime("2024-05-22"),
					Scores: []DomainVibeCheckScore{

						{
							ID: 5,
							Person: people.DomainPerson{
								ID: 1,
							},
							Score: 6,
							Date:  parseTime("2024-05-22"),
						},
						{
							ID: 6,
							Person: people.DomainPerson{
								ID: 2,
							},
							Score: 9,
							Date:  parseTime("2024-05-22"),
						},
						{
							ID: 7,
							Person: people.DomainPerson{
								ID: 3,
							},
							Score: 3,
							Date:  parseTime("2024-05-22"),
						},
					},
					AverageScore: 6,
				},
				{
					Date: parseTime("2024-05-23"),
					Scores: []DomainVibeCheckScore{

						{
							ID: 1,
							Person: people.DomainPerson{
								ID: 1,
							},
							Score: 5,
							Date:  parseTime("2024-05-23"),
						},
						{
							ID: 2,
							Person: people.DomainPerson{
								ID: 2,
							},
							Score: 5,
							Date:  parseTime("2024-05-23"),
						},
					},
					AverageScore: 5,
				},
				{
					Date: parseTime("2024-05-24"),
					Scores: []DomainVibeCheckScore{

						{
							ID: 3,
							Person: people.DomainPerson{
								ID: 1,
							},
							Score: 6,
							Date:  parseTime("2024-05-24"),
						},
						{
							ID: 4,
							Person: people.DomainPerson{
								ID: 2,
							},
							Score: 9,
							Date:  parseTime("2024-05-24"),
						},
					},
					AverageScore: 7.5,
				},
			},
		},
		{
			name:          "It returns an error when there is no from",
			to:            parseTime("2024-05-24"),
			expectedError: customErrors.NewRequiredValueMissingError("from"),
		},
		{
			name:          "It returns an error when there is no to",
			from:          parseTime("2024-05-22"),
			expectedError: customErrors.NewRequiredValueMissingError("to"),
		},
		{
			name:          "It returns an error when vibe check data cannot be retrieved",
			to:            parseTime("2024-05-24"),
			from:          parseTime("2024-05-22"),
			getError:      errors.New("Unexploded cheese in the bagging aisle"),
			expectedError: errors.New("there was an error retrieving vibe check scores"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			InitVibeCheckRepo(&mockVibeCheckReposity{
				getScores: tc.getScores,
				getError:  tc.getError,
			})

			actual, err := GetVibeChecksBetween(tc.from, tc.to)

			if tc.expectedError != nil {
				if err == nil {
					t.Errorf("Expected error: %s. Got nil", tc.expectedError)
				} else if err.Error() != tc.expectedError.Error() {
					t.Errorf("Expected error: %s. Got: %s", tc.expectedError, err)
				}
			} else if err != nil {
				t.Errorf("Unexpected error: %s", err)
			} else if len(actual) != len(tc.expectedVibeChecks) {
				t.Errorf("Actual vibe check length is different to expected. Actual: %v, Expected: %v", len(actual), len(tc.expectedVibeChecks))
			} else {
				for i, act := range actual {
					if act.Date != tc.expectedVibeChecks[i].Date {
						t.Errorf("Actual date is different to expected. Actual: %v, Expected: %v", act.Date, tc.expectedVibeChecks[i].Date)
					}

					if len(act.Scores) != len(tc.expectedVibeChecks[i].Scores) {
						t.Errorf("Actual scores are different to expected. Actual has %v scores. Expected has: %v", len(act.Scores), len(tc.expectedVibeChecks[i].Scores))
					}

					if act.AverageScore != tc.expectedVibeChecks[i].AverageScore {
						t.Errorf("Actual avg score is different to expected. Actual: %v, Expected: %v", act.AverageScore, tc.expectedVibeChecks[i].AverageScore)
					}
				}
			}
		})
	}
}

func parseTime(dateString string) time.Time {
	t, err := time.Parse("2006-01-02", dateString)
	if err != nil {
		log.Fatal(err)
	}

	return t
}
