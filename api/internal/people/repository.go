package people

import (
	database "aurora-stats/api/internal/pkg/db/mysql"
	"database/sql"
	"errors"
	"log"

	"github.com/jmoiron/sqlx"
)

type mysqlPerson struct {
	ID        int64  `db:"id"`
	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Deleted   bool   `db:"deleted"`
}

type PersonRepository struct {
	db *sqlx.DB
}

type Repository interface {
	Create(firstName string, lastName string) (int64, error)
	// Update(id int64, firstName string, lastName string) error
	GetAll() ([]DomainPerson, error)
	Delete(id int64) error
}

func NewPersonRepository(db *sqlx.DB) *PersonRepository {
	if db == nil {
		log.Panic("missing db")
	}

	return &PersonRepository{db: db}
}

func (m PersonRepository) Create(firstName string, lastName string) (int64, error) {
	return m.create(m.db, firstName, lastName)
}

func (m PersonRepository) create(db *sqlx.DB, firstName string, lastName string) (int64, error) {
	query := "INSERT INTO person(first_name, last_name) VALUES(:first_name, :last_name)"

	person := mysqlPerson{
		FirstName: firstName,
		LastName:  lastName}

	return database.InsertRecordAndReturnId(db, query, person, "person")
}

func (m PersonRepository) get(db *sqlx.DB, id int64, forUpdate bool) (*mysqlPerson, error) {
	dbPerson := mysqlPerson{}

	err := database.FindById(db, []string{"id", "first_name", "last_name", "deleted"}, id, "person", dbPerson, forUpdate)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, err
	} else if err != nil {
		log.Fatal(err)
	}

	return &dbPerson, err
}

func (m PersonRepository) GetAll() ([]DomainPerson, error) {
	return m.getAll(m.db)
}

func (m PersonRepository) getAll(db *sqlx.DB) ([]DomainPerson, error) {
	query := "SELECT id, first_name, last_name FROM person WHERE deleted = 0"

	return database.GetMultiple(db, query, mapPersonFromDbToDomain)
}

func mapPersonFromDbToDomain(dbPerson mysqlPerson) DomainPerson {
	return DomainPerson{
		ID:        dbPerson.ID,
		FirstName: dbPerson.FirstName,
		LastName:  dbPerson.LastName,
	}
}

func (m PersonRepository) update(db *sqlx.DB, person *mysqlPerson) (mysqlPerson, error) {
	query := `INSERT INTO person (id, first_name, last_name, deleted)
	VALUES(:id, :first_name, :last_name, :deleted)
		ON DUPLICATE KEY UPDATE
	first_name = :first_name, last_name = :last_name, deleted = :deleted`

	updatedPerson, err := database.UpdateRecord(db, query, person, "person")

	return *updatedPerson, err
}

func (m PersonRepository) Delete(id int64) error {
	return m.delete(m.db, id)
}

func (m PersonRepository) delete(db *sqlx.DB, id int64) error {
	person, err := m.get(db, id, true)
	if err != nil {
		return err
	}

	person.Deleted = true
	_, err = m.update(db, person)

	return err
}
