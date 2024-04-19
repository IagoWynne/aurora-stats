package wheel

import (
	database "aurora-stats/api/internal/pkg/db/mysql"
	"log"
)

type WheelOption struct {
	ID   string `json:"id"`
	Name string `json:"optionName"`
}

func SaveWheelOption(name string) int64 {
	stmt, err := database.Db.Prepare("INSERT INTO wheel_options(optionName) VALUES(?)")
	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec(name)
	if err != nil {
		log.Fatal(err)
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("Error:", err.Error())
	}

	log.Print("Wheel option inserted with name: ", name, " and id: ", id)
	return id
}

func GetAllWheelOptions() []WheelOption {
	stmt, err := database.Db.Prepare("SELECT id, optionName FROM wheel_options")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var wheelOptions []WheelOption
	for rows.Next() {
		var wheelOption WheelOption
		err := rows.Scan(&wheelOption.ID, &wheelOption.Name)
		if err != nil {
			log.Fatal(err)
		}
		wheelOptions = append(wheelOptions, wheelOption)
	}

	return wheelOptions
}
