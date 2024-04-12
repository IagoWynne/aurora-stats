package people

import (
	database "aurora-stats/api/internal/pkg/db/mysql"
	"log"
)

// definition of a structure which represents a person
type Person struct {
	ID       string `json:"id"`
	Fullname string `json:"fullname"`
}

// function to save a person to the database
func (person *Person) Save() int64 {
	// mysql query to insert a person into the people table
	stmt, err := database.Db.Prepare("INSERT INTO people(fullname) VALUES(?)")
	if err != nil {
		log.Fatal(err)
	}

	// execute the query using person.fullname
	res, err := stmt.Exec(person.Fullname)
	if err != nil {
		log.Fatal(err)
	}

	// get the last inserted id (in this case, the id of the new person)
	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("Error:", err.Error())
	}
	log.Print("Person inserted with name: ", person.Fullname, " and id: ", id)
	return id
}

// function to get all people from the database
func GetAll() []Person {
	stmt, err := database.Db.Prepare("SELECT id, fullname FROM people")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var people []Person
	for rows.Next() {
		var person Person
		err := rows.Scan(&person.ID, &person.Fullname)
		if err != nil {
			log.Fatal(err)
		}
		people = append(people, person)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return people
}
