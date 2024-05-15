package people

import (
	customErrors "aurora-stats/api/internal/errors"
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
	Create(firstName string, lastName string) (*int64, error)
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

func (m PersonRepository) Create(firstName string, lastName string) (*int64, error) {
	return m.create(m.db, firstName, lastName)
}

func (m PersonRepository) create(db *sqlx.DB, firstName string, lastName string) (*int64, error) {
	query := "INSERT INTO person(first_name, last_name) VALUES(:first_name, :last_name)"

	result, err := db.NamedExec(query, mysqlPerson{
		FirstName: firstName,
		LastName:  lastName})
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	log.Print("Person inserted with name: ", firstName, " ", lastName, " and id: ", id)
	return &id, nil
}

func (m PersonRepository) get(db *sqlx.DB, id int64, forUpdate bool) (*mysqlPerson, error) {
	query := "SELECT id, first_name, last_name, deleted from person WHERE id = ?"

	if forUpdate {
		query += " FOR UPDATE"
	}

	dbPerson := mysqlPerson{}

	err := db.Get(&dbPerson, query, id)

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
	query := "SELECT id, first_name, last_name FROM person where deleted = 0"

	rows, err := db.Queryx(query)
	if err != nil {
		return nil, err
	}

	var people []DomainPerson

	for rows.Next() {
		var person mysqlPerson
		err := rows.StructScan(&person)
		if err != nil {
			log.Fatalln(err)
		}
		people = append(people, MapPersonFromDbToDomain(person))
	}

	return people, nil
}

func (m PersonRepository) update(db *sqlx.DB, updatedPerson *mysqlPerson) (mysqlPerson, error) {
	tx, err := db.Beginx()
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		err = m.finishTransaction(err, tx)
	}()

	_, err = tx.NamedExec(
		`INSERT INTO person (id, first_name, last_name, deleted)
			VALUES(:id, :first_name, :last_name, :deleted)
		ON DUPLICATE KEY UPDATE
			first_name = :first_name, last_name = :last_name, deleted = :deleted`,
		updatedPerson)

	if err != nil {
		log.Fatal(err)
	}

	return *updatedPerson, nil
}

func (m PersonRepository) Delete(id int64) error {
	return m.delete(m.db, id)
}

func (m PersonRepository) delete(db *sqlx.DB, id int64) error {
	person, err := m.get(db, id, true)
	if errors.Is(err, sql.ErrNoRows) {
		return customErrors.NewNotFoundError("person", id)
	} else if err != nil {
		log.Fatal(err)
	}

	person.Deleted = true
	_, err = m.update(db, person)
	if err != nil {
		log.Fatal(err)
	}

	return nil
}

func (m PersonRepository) finishTransaction(err error, tx *sqlx.Tx) error {
	if err != nil {
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			log.Fatal(rollbackErr, err)
		}

		return err
	} else {
		if commitErr := tx.Commit(); commitErr != nil {
			log.Fatal(commitErr)
		}

		return nil
	}
}
