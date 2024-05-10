package people

import (
	"context"
	"log"
	"strconv"
)

var repo Repository

func InitPeopleRepo(repository Repository) {
	repo = repository
}

// TODO - add validation logic for saving new person

// function to save a person to the database
func CreatePerson(ctx context.Context, firstName string, lastName string) int64 {
	id, err := repo.Create(ctx, firstName, lastName)

	if err != nil {
		return 0
	}

	return *id
}

// function to get all people from the database
func GetAll(ctx context.Context) []DomainPerson {
	domainPeople, err := repo.GetAll(ctx)

	if err != nil {
		log.Fatal(err)
	}

	return domainPeople
}

func DeletePerson(ctx context.Context, id string) {
	i, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		panic(err)
	}

	err = repo.Delete(ctx, i)
	if err != nil {
		log.Fatal(err)
	}
}
