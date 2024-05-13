package people

import (
	customErrors "aurora-stats/api/internal/errors"
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
		log.Fatal(err)
	}

	return domainPeople
}

func DeletePerson(id string) {
	i, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		panic(err)
	}

	err = repo.Delete(i)
	if err != nil {
		log.Fatal(err)
	}
}
