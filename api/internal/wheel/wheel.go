package wheel

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"log"
	"time"
)

var repo Repository

func InitWheelRepo(repository Repository) {
	repo = repository
}

func SaveWheelOption(name string) (int64, error) {
	if name == "" {
		log.Print("missing name when saving wheel option")
		return 0, customErrors.NewRequiredValueMissingError("name")
	}

	id, err := repo.CreateOption(name)
	if err != nil {
		log.Print(err)
		return 0, errors.New("there was an error creating this wheel option")
	}

	return id, err
}

func GetAllWheelOptions() ([]DomainWheelOption, error) {
	options, err := repo.GetOptions()
	if err != nil {
		return nil, errors.New("there was an error retrieving the wheel options")
	}

	return options, nil
}

func SaveWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error) {
	var validationErrors []string

	if date.IsZero() {
		validationErrors = append(validationErrors, "date")
	}

	if winnerId == 0 {
		validationErrors = append(validationErrors, "winnerId")
	}

	if resultId == 0 {
		validationErrors = append(validationErrors, "resultId")
	}

	if len(validationErrors) == 1 {
		return 0, customErrors.NewRequiredValueMissingError(validationErrors[0])
	} else if len(validationErrors) > 1 {
		return 0, customErrors.NewMultipleRequiredValueMissingError(validationErrors)
	}

	id, err := repo.CreateWheelRun(date, winnerId, resultId)
	if err != nil {
		return 0, errors.New("there was an error saving this wheel run")
	}

	return id, err
}

func GetWheelRuns(from time.Time, to *time.Time) ([]DomainWheelResult, error) {
	if time.Time.IsZero(from) {
		return nil, customErrors.NewRequiredValueMissingError("from")
	}

	filters := GetWheelRunFilters{
		from: &from,
		to:   to,
	}

	results, err := repo.GetWheelResults(filters)
	if err != nil {
		log.Print(err)
		return nil, errors.New("there was an error retrieving the wheel results")
	}

	return results, nil
}
