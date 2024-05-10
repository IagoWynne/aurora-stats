package database

import (
	"log"
	"os"

	"github.com/avast/retry-go"
	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var Db *sqlx.DB

func InitDB() {
	config := mysql.Config{
		Addr:                 os.Getenv("DB_HOST"),
		User:                 os.Getenv("DB_USER"),
		Passwd:               os.Getenv("DB_PASS"),
		DBName:               "aurora-stats",
		AllowNativePasswords: true,
	}

	err := retry.Do(
		func() error {
			db, err := sqlx.Connect("mysql", config.FormatDSN())
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
