package database

import (
	"database/sql"
	"log"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/golang-migrate/migrate/source/file"
)

var Db *sql.DB

// Use 172.17.0.2 if you're using windows
const defaultHost = "localhost"

func BuildConnectionString() string {
	var sb strings.Builder
	host := os.Getenv("DB_HOST")

	if host == "" {
		host = defaultHost
	}

	sb.WriteString("root:dbpass@tcp(")
	sb.WriteString(host)
	sb.WriteString(")/aurora-stats")

	return sb.String()
}

func InitDB() {
	connectionString := BuildConnectionString()

	// TODO: need to implement some kind of retry here
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Panic(err)
	}

	if err = db.Ping(); err != nil {
		log.Panic(err)
	}
	Db = db
}

func CloseDB() error {
	return Db.Close()
}