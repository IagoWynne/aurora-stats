package database

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/avast/retry-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var Db *sqlx.DB

func InitDB() {
	connectionString := fmt.Sprintf(`%s:%s@tcp(%s:%s)/%s?parseTime=true`, os.Getenv("DB_USER"), os.Getenv("DB_PASS"), os.Getenv("DB_HOST"), "3306", "aurora-stats")

	err := retry.Do(
		func() error {
			db, err := sqlx.Connect("mysql", connectionString)
			if err != nil {
				return err
			}

			if err = db.Ping(); err != nil {
				return err
			}
			Db = db
			return nil
		},
	)

	if err != nil {
		log.Panic(err)
	}
}

func CloseDB() error {
	return Db.Close()
}

func InsertRecordAndReturnId(db *sqlx.DB, query string, record any, entityType string) (int64, error) {
	tx, err := db.Beginx()
	if err != nil {
		return 0, err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	result, err := db.NamedExec(query, record)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	log.Printf("%s inserted with id: %d", entityType, id)

	return id, nil
}

func BatchInsert[T any](db *sqlx.DB, query string, records []T, entityType string) error {
	tx, err := db.Beginx()
	if err != nil {
		return err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	_, err = db.NamedExec(query, records)
	if err != nil {
		return err
	}

	log.Printf("%d %s inserted", len(records), entityType)

	return nil
}

func UpdateRecord[T any](db *sqlx.DB, query string, record T, entityType string) (T, error) {
	tx, err := db.Beginx()
	if err != nil {
		return record, err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	_, err = tx.NamedExec(query, record)

	if err != nil {
		return record, err
	}

	log.Printf("%s updated successfully", entityType)

	return record, nil
}

func finishTransaction(err error, tx *sqlx.Tx) error {
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

func FindById(db *sqlx.DB, fields []string, id int64, table string, dest interface{}, forUpdate bool) error {
	query := "SELECT " + strings.Join(fields, ", ") + " FROM " + table + " WHERE id = ?"

	if forUpdate {
		query += " FOR UPDATE"
	}

	return db.Get(&dest, query, id)
}

func GetMultiple[T any, U any](db *sqlx.DB, query string, mapFn func(U) T, args ...interface{}) ([]T, error) {
	rows, err := db.Queryx(query, args...)
	if err != nil {
		return nil, err
	}

	var results []T

	for rows.Next() {
		var result U
		err := rows.StructScan(&result)
		if err != nil {
			return nil, err
		}

		results = append(results, mapFn(result))
	}

	return results, nil
}
