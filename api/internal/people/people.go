package people

import (
	database "aurora-stats/api/internal/pkg/db/mysql"
	"log"
)

// definition of a structure which represents a person
type Person struct {
	ID        int64  `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

// function to save a person to the database
func (person *Person) Save() int64 {
	// mysql query to insert a person into the person table
	stmt, err := database.Db.Prepare("INSERT INTO person(first_name, last_name) VALUES(?,?)")
	if err != nil {
		log.Fatal(err)
	}

	// execute the query using person.fullname
	res, err := stmt.Exec(person.FirstName, person.LastName)
	if err != nil {
		log.Fatal(err)
	}

	// get the last inserted id (in this case, the id of the new person)
	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("Error:", err.Error())
	}
	log.Print("Person inserted with name: ", person.FirstName, " ", person.LastName, " and id: ", id)
	return id
}

// function to get all people from the database
func GetAll() []Person {
	stmt, err := database.Db.Prepare("SELECT id, first_name, last_name FROM person")
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
		err := rows.Scan(&person.ID, &person.FirstName, &person.LastName)
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
