package vibecheck

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"log"
	"slices"
	"time"
)

var repo Repository

func InitVibeCheckRepo(repository Repository) {
	repo = repository
}

func SaveVibeCheck(date time.Time, scores []DomainVibeCheckScore) error {
	if date.IsZero() {
		return customErrors.NewRequiredValueMissingError("date")
	}

	if len(scores) == 0 {
		return customErrors.NewRequiredValueMissingError("scores")
	}

	for _, score := range scores {
		if score.Score < 1 || score.Score > 10 {
			return customErrors.NewInvalidValueError("score", score.Score)
		}
	}

	err := repo.Create(date, scores)

	if err != nil {
		log.Print(err)
		return errors.New("there was an error saving the vibe check scores")
	}

	return nil
}

func GetVibeChecksBetween(from time.Time, to time.Time) ([]DomainVibeCheck, error) {
	if from.IsZero() {
		return nil, customErrors.NewRequiredValueMissingError("from")
	}

	if to.IsZero() {
		return nil, customErrors.NewRequiredValueMissingError("to")
	}

	scores, err := repo.GetBetweenDates(from, to)
	if err != nil {
		return nil, errors.New("there was an error retrieving vibe check scores")
	}

	return mapVibeCheckScores(scores), nil
}

func mapVibeCheckScores(scores []DomainVibeCheckScore) []DomainVibeCheck {
	var vibeChecks []DomainVibeCheck

	for _, score := range scores {
		idx := findIdxOfDateVibeCheck(vibeChecks, score.Date)

		if idx == -1 {
			vibeCheck := DomainVibeCheck{
				Date:         score.Date,
				Scores:       []DomainVibeCheckScore{score},
				AverageScore: score.Score,
			}
			vibeChecks = append(vibeChecks, vibeCheck)
		} else {
			vibeChecks[idx].Scores = append(vibeChecks[idx].Scores, score)
			vibeChecks[idx].AverageScore = calcVibeCheckAvgScore(vibeChecks[idx].Scores)
		}
	}

	slices.SortFunc(vibeChecks, func(a, b DomainVibeCheck) int { return a.Date.Compare(b.Date) })
	return vibeChecks
}

func findIdxOfDateVibeCheck(vibeChecks []DomainVibeCheck, date time.Time) int {
	vibeCheckIdx := -1

	for i := range vibeChecks {
		if vibeChecks[i].Date == date {
			vibeCheckIdx = i
			break
		}
	}

	return vibeCheckIdx
}

func calcVibeCheckAvgScore(scores []DomainVibeCheckScore) float64 {
	scoreSum := 0.0

	for i := range scores {
		scoreSum += scores[i].Score
	}

	return scoreSum / float64(len(scores))
}
