package database

import (
	"fmt"
	"log"
	"os"

	"github.com/avast/retry-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var Db *sqlx.DB

func InitDB() {
	connectionString := fmt.Sprintf(`%s:%s@tcp(%s:%s)/%s`, os.Getenv("DB_USER"), os.Getenv("DB_PASS"), os.Getenv("DB_HOST"), "3306", "aurora-stats")

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
