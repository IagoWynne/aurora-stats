package people

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"log"
)

var repo Repository

func InitPeopleRepo(repository Repository) {
	repo = repository
}

// function to save a person to the database
func CreatePerson(firstName string, lastName string) (int64, error) {
	if firstName == "" {
		return 0, customErrors.NewRequiredValueMissingError("firstName")
	}

	if lastName == "" {
		return 0, customErrors.NewRequiredValueMissingError("lastName")
	}

	id, err := repo.Create(firstName, lastName)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// function to get all people from the database
func GetAll() ([]DomainPerson, error) {
	domainPeople, err := repo.GetAll()

	if err != nil {
		log.Printf("Error retrieving people from repo: %s", err)
		return nil, errors.New("there was an error retrieving people")
	}

	return domainPeople, nil
}

func DeletePerson(id int64) error {
	err := repo.Delete(id)
	if err != nil {
		log.Printf("Error deleting person: %s", err)
		return errors.New("there was an error deleting this person")
	}

	return nil
}
