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

func initReadConn() *sqlx.DB {
	username := os.Getenv("DB_READ_USER")
	password := os.Getenv("DB_READ_PASSWORD")
	host := os.Getenv("DB_READ_HOST")

	return initConn(username, password, host)
}

func initWriteConn() *sqlx.DB {
	username := os.Getenv("DB_WRITE_USER")
	password := os.Getenv("DB_WRITE_PASSWORD")
	host := os.Getenv("DB_WRITE_HOST")

	return initConn(username, password, host)
}

func initConn(username string, password string, host string) *sqlx.DB {
	connectionString := fmt.Sprintf(`%s:%s@tcp(%s:%s)/%s?parseTime=true`, username, password, host, "3306", os.Getenv("DB_NAME"))

	var dbConn *sqlx.DB

	err := retry.Do(
		func() error {
			conn, err := sqlx.Connect("mysql", connectionString)
			if err != nil {
				return err
			}

			if err = conn.Ping(); err != nil {
				return err
			}

			if conn == nil {
				log.Panic("no connection")
			}

			dbConn = conn

			return nil
		},
	)

	if err != nil || dbConn == nil {
		log.Panic(err)
	}

	return dbConn
}

func closeConnection(conn *sqlx.DB) {
	err := conn.Close()

	if err != nil {
		panic(err)
	}
}

func InsertRecordAndReturnId[T any](query string, record T, entityType string) (int64, error) {
	writeConn := initWriteConn()
	defer closeConnection(writeConn)

	tx, err := writeConn.Beginx()
	if err != nil {
		return 0, err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	result, err := writeConn.NamedExec(query, record)
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

func BatchInsert[T any](query string, records []T, entityType string) error {
	writeConn := initWriteConn()
	defer closeConnection(writeConn)

	tx, err := writeConn.Beginx()
	if err != nil {
		return err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	_, err = writeConn.NamedExec(query, records)
	if err != nil {
		return err
	}

	log.Printf("%d %s inserted", len(records), entityType)

	return nil
}

func UpdateRecord[T any](query string, record T, entityType string) (any, error) {
	writeConn := initWriteConn()
	defer closeConnection(writeConn)

	tx, err := writeConn.Beginx()
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

func FindById(fields []string, id int64, table string, dest interface{}, forUpdate bool) error {
	query := "SELECT " + strings.Join(fields, ", ") + " FROM " + table + " WHERE id = ?"

	if forUpdate {
		query += " FOR UPDATE"
	}

	readConn := initReadConn()
	defer closeConnection(readConn)

	return readConn.Get(&dest, query, id)
}

func GetMultiple[T any](query string, args ...interface{}) ([]T, error) {
	readConn := initReadConn()
	defer closeConnection(readConn)

	log.Printf("running query %s", query)

	rows, err := readConn.Queryx(query, args...)
	if err != nil {
		return nil, err
	}

	var results []T

	log.Print("mapping rows to objects...")

	for rows.Next() {
		var result T
		err := rows.StructScan(&result)
		if err != nil {
			return nil, err
		}

		results = append(results, result)
	}

	log.Print("returning results...")

	return results, nil
}
