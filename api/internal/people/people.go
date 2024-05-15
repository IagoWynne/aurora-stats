package people

import (
	customErrors "aurora-stats/api/internal/errors"
	"errors"
	"log"
	"strconv"
)

var repo Repository

func InitPeopleRepo(repository Repository) {
	repo = repository
}

// function to save a person to the database
func CreatePerson(firstName string, lastName string) (*int64, error) {
	if firstName == "" {
		return nil, customErrors.NewRequiredValueMissingError("firstName")
	}

	if lastName == "" {
		return nil, customErrors.NewRequiredValueMissingError("lastName")
	}

	id, err := repo.Create(firstName, lastName)

	if err != nil {
		return nil, err
	}

	return id, nil
}

// function to get all people from the database
func GetAll() []DomainPerson {
	domainPeople, err := repo.GetAll()

	if err != nil {
		log.Printf("Error retrieving people from repo: %s", err)
		return []DomainPerson{}
	}

	return domainPeople
}

func DeletePerson(id string) error {
	i, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		log.Printf("Error parsing ID for delete person: %s", err)
		return errors.New("there was an error deleting this person")
	}

	err = repo.Delete(i)
	if err != nil {
		log.Printf("Error deleting person: %s", err)
		return errors.New("there was an error deleting this person")
	}

	return nil
}
