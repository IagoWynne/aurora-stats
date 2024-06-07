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

type DB struct {
	readConn  *sqlx.DB
	writeConn *sqlx.DB
}

func InitDB() *DB {
	return &DB{
		readConn:  initReadConn(),
		writeConn: initWriteConn(),
	}
}

func initReadConn() *sqlx.DB { 
	userName := os.Getenv("DB_READ_USER")
	password := os.Getenv("DB_READ_PASSWORD")
	host := os.Getenv("DB_READ_HOST")

	return initConn(userName, password, host)
}

func initWriteConn() *sqlx.DB { 
	userName := os.Getenv("DB_WRITE_USER")
	password := os.Getenv("DB_WRITE_PASSWORD")
	host := os.Getenv("DB_WRITE_HOST");

	return initWriteConn(username, password, host)
}

func initConn(username string, password string, host string) *sqlx.DB { 
	connectionString := fmt.Sprintf(`%s:%s@tcp(%s:%s)/%s?parseTime=true`, username, password, host, "3306", os.Getenv("DB_NAME"))

	var conn *sqlx.DB

	err := retry.Do(
		func() error {
			conn, err := sqlx.Connect("mysql", connectionString)
			if err != nil {
				return err
			}

			if err = conn.Ping(); err != nil {
				return err
			}
			return nil
		},
	)

	if err != nil {
		log.Panic(err)
	}

	return conn
}

func (m DB) CloseDB() error {
	err := m.readConn.Close()
	
	if err != nil {
		panic(err)
	}

	return m.writeConn.Close()
}

func (m DB) InsertRecordAndReturnId(query string, record any, entityType string) (int64, error) {
	tx, err := m.writeConn.Beginx()
	if err != nil {
		return 0, err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	result, err := m.writeConn.NamedExec(query, record)
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

func (m DB) BatchInsert[T any](query string, records []T, entityType string) error {
	tx, err := m.writeConn.Beginx()
	if err != nil {
		return err
	}

	defer func() {
		err = finishTransaction(err, tx)
	}()

	_, err = m.writeConn.NamedExec(query, records)
	if err != nil {
		return err
	}

	log.Printf("%d %s inserted", len(records), entityType)

	return nil
}

func (m DB) UpdateRecord[T any](query string, record T, entityType string) (T, error) {
	tx, err := m.writeConn.Beginx()
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

func (m DB) FindById(fields []string, id int64, table string, dest interface{}, forUpdate bool) error {
	query := "SELECT " + strings.Join(fields, ", ") + " FROM " + table + " WHERE id = ?"

	if forUpdate {
		query += " FOR UPDATE"
	}

	return m.readConn.Get(&dest, query, id)
}

func (m DB) GetMultiple[T any, U any](query string, mapFn func(U) T, args ...interface{}) ([]T, error) {
	rows, err := m.readConn.Queryx(query, args...)
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
