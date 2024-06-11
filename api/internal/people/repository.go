package people

import (
	database "aurora-stats/api/internal/pkg/db/mysql"
	"aurora-stats/api/internal/utils"
	"database/sql"
	"errors"
	"log"
)

type mysqlPerson struct {
	ID        int64  `db:"id"`
	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Deleted   bool   `db:"deleted"`
}

type PersonRepository struct{}

type Repository interface {
	Create(firstName string, lastName string) (int64, error)
	// Update(id int64, firstName string, lastName string) error
	GetAll() ([]DomainPerson, error)
	Delete(id int64) error
}

func NewPersonRepository() *PersonRepository {
	return &PersonRepository{}
}

func (m PersonRepository) Create(firstName string, lastName string) (int64, error) {
	return m.create(firstName, lastName)
}

func (m PersonRepository) create(firstName string, lastName string) (int64, error) {
	query := "INSERT INTO person(first_name, last_name) VALUES(:first_name, :last_name)"

	person := mysqlPerson{
		FirstName: firstName,
		LastName:  lastName}

	return database.InsertRecordAndReturnId(query, person, "person")
}

func (m PersonRepository) get(id int64, forUpdate bool) (*mysqlPerson, error) {
	dbPerson := mysqlPerson{}

	err := database.FindById([]string{"id", "first_name", "last_name", "deleted"}, id, "person", dbPerson, forUpdate)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, err
	} else if err != nil {
		log.Fatal(err)
	}

	return &dbPerson, err
}

func (m PersonRepository) GetAll() ([]DomainPerson, error) {
	return m.getAll()
}

func (m PersonRepository) getAll() ([]DomainPerson, error) {
	query := "SELECT id, first_name, last_name FROM person WHERE deleted = 0"

	results, err := database.GetMultiple[mysqlPerson](query)
	if err != nil {
		return nil, err
	}

	return utils.MapArray(results, mapPersonFromDbToDomain), nil
}

func mapPersonFromDbToDomain(dbPerson mysqlPerson) DomainPerson {
	return DomainPerson{
		ID:        dbPerson.ID,
		FirstName: dbPerson.FirstName,
		LastName:  dbPerson.LastName,
	}
}

func (m PersonRepository) update(person *mysqlPerson) (mysqlPerson, error) {
	query := `INSERT INTO person (id, first_name, last_name, deleted)
	VALUES(:id, :first_name, :last_name, :deleted)
		ON DUPLICATE KEY UPDATE
	first_name = :first_name, last_name = :last_name, deleted = :deleted`

	updatedPerson, err := database.UpdateRecord(query, person, "person")
	if err != nil {
		return mysqlPerson{}, err
	}

	return updatedPerson.(mysqlPerson), nil
}

func (m PersonRepository) Delete(id int64) error {
	return m.delete(id)
}

func (m PersonRepository) delete(id int64) error {
	person, err := m.get(id, true)
	if err != nil {
		return err
	}

	person.Deleted = true
	_, err = m.update(person)

	return err
}
