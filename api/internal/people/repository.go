package people

import (
	"context"
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
	Create(ctx context.Context, firstName string, lastName string) (*int64, error)
	// Update(ctx context.Context, id int64, firstName string, lastName string) error
	GetAll(ctx context.Context) ([]DomainPerson, error)
	Delete(ctx context.Context, id int64) error
}

func NewPersonRepository(db *sqlx.DB) *PersonRepository {
	if db == nil {
		panic("missing db")
	}

	return &PersonRepository{db: db}
}

func (m PersonRepository) Create(ctx context.Context, firstName string, lastName string) (*int64, error) {
	return m.create(ctx, m.db, firstName, lastName)
}

func (m PersonRepository) create(ctx context.Context, db *sqlx.DB, firstName string, lastName string) (*int64, error) {
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

func (m PersonRepository) get(ctx context.Context, db *sqlx.DB, id int64, forUpdate bool) (*mysqlPerson, error) {
	query := "SELECT id, first_name, last_name, deleted from person WHERE id = ?"

	if forUpdate {
		query += " FOR UPDATE"
	}

	// query += " VALUES(:id)"

	dbPerson := mysqlPerson{}

	err := db.Get(&dbPerson, query, id)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, err
	} else if err != nil {
		log.Fatal(err)
	}

	return &dbPerson, err
}

func (m PersonRepository) GetAll(ctx context.Context) ([]DomainPerson, error) {
	return m.getAll(ctx, m.db)
}

func (m PersonRepository) getAll(ctx context.Context, db *sqlx.DB) ([]DomainPerson, error) {
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

func (m PersonRepository) update(ctx context.Context, db *sqlx.DB, updatedPerson *mysqlPerson) (mysqlPerson, error) {
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

func (m PersonRepository) Delete(ctx context.Context, id int64) error {
	return m.delete(ctx, m.db, id)
}

func (m PersonRepository) delete(ctx context.Context, db *sqlx.DB, id int64) error {
	person, err := m.get(ctx, db, id, true)
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	} else if err != nil {
		log.Fatal(err)
	}

	person.Deleted = true
	_, err = m.update(ctx, db, person)
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

// func (m MySQLPersonRepository) GetAll() ([]Person, error) {
// 	query := "SELECT id, first_name, last_name FROM person where deleted = 0"

// 	stmt, err := m.db.Prepare(query)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer stmt.Close()

// 	rows, err := stmt.Query()
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer rows.Close()

// 	var people []Person
// 	for rows.Next() {
// 		var person Person
// 		err := rows.Scan(&person.ID, &person.FirstName, &person.LastName)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		people = append(people, person)
// 	}
// 	if err = rows.Err(); err != nil {
// 		log.Fatal(err)
// 	}

// 	return people
// }
