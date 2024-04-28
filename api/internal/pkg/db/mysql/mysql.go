package database

import (
	"database/sql"
	"log"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/avast/retry-go"
)

var Db *sql.DB

// Use 172.17.0.2 if you're using windows
// const defaultHost = "localhost"

func BuildConnectionString() string {
	var sb strings.Builder
	host := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")

	sb.WriteString(dbUser)
	sb.WriteString(":")
	sb.WriteString(dbPass)
	sb.WriteString("@tcp(")
	sb.WriteString(host)
	sb.WriteString(")/aurora-stats")

	return sb.String()
}

func InitDB() {
	connectionString := BuildConnectionString()

	err := retry.Do(
		func () error {
			db, err := sql.Open("mysql", connectionString)	
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
