package wheel

import (
	"aurora-stats/api/internal/people"
	database "aurora-stats/api/internal/pkg/db/mysql"
	"errors"
	"log"
	"time"
)

type WheelOption struct {
	ID   int64  `json:"id"`
	Name string `json:"optionName"`
}

type WheelRun struct {
	ID       int64  `json:"id"`
	Date     string `json:"date"`
	WinnerId int64  `json:"winnerId"`
	ResultId int64  `json:"resultId"`
}

type WheelRunResult struct {
	ID              string `json:"id"`
	Date            string `json:"date"`
	WinnerId        int64  `json:"winnerId"`
	WinnerFirstName string `json:"winnerFirstName"`
	WinnerLastName  string `json:"winnerLastName"`
	PrizeId         int64  `json:"resultId"`
	ResultName      string `json:"resultName"`
}

type WheelResult struct {
	ID     string              `json:"id"`
	Date   string              `json:"date"`
	Winner people.DomainPerson `json:"winner"`
	Prize  WheelOption         `json:"result"`
}

func SaveWheelOption(name string) (int64, error) {
	if name == "" {
		log.Printf("Error saving wheel option: name is empty")
		// todo: custom error types
		return 0, errors.New("name is required")
	}

	stmt, err := database.Db.Prepare("INSERT INTO wheel_option(option_name) VALUES(?)")
	if err != nil {
		log.Print("Error:", err.Error())
		return 0, errors.New("there was an error saving the data")
	}

	res, err := stmt.Exec(name)
	if err != nil {
		log.Print("Error:", err.Error())
		return 0, errors.New("there was an error saving the data")
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Print("Error:", err.Error())
		return 0, errors.New("there was an error retrieving the id")
	}

	log.Print("Wheel option inserted with name: ", name, " and id: ", id)
	return id, nil
}

func GetAllWheelOptions() []WheelOption {
	stmt, err := database.Db.Prepare("SELECT id, option_name FROM wheel_option")
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

func SaveWheelRun(date string, winnerId int, resultId int) int64 {
	stmt, err := database.Db.Prepare("INSERT INTO wheel_run(run_date, winner_id, prize_id) VALUES(?,?,?)")
	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec(date, winnerId, resultId)
	if err != nil {
		log.Fatal(err)
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("Error:", err.Error())
	}

	log.Print("Wheel run inserted with date: ", date, ", winnerId: ", winnerId, "resultId: ", resultId, " and id: ", id)
	return id
}

func GetWheelRuns(from string, to *string) []WheelResult {
	if to == nil {
		t := time.Now().UTC().Format("2006-01-02")
		to = &t
	}
	stmt, err := database.Db.Prepare("SELECT wheel_run.id, run_date, winner_id, prize_id, first_name, last_name, option_name FROM wheel_run INNER JOIN wheel_option ON wheel_run.prize_id = wheel_option.id INNER JOIN person ON wheel_run.winner_id = person.id WHERE run_date BETWEEN ? AND ?")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := stmt.Query(from, *to)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var wins []WheelResult
	for rows.Next() {
		var result WheelRunResult
		err := rows.Scan(&result.ID, &result.Date, &result.WinnerId, &result.PrizeId, &result.WinnerFirstName, &result.WinnerLastName, &result.ResultName)
		if err != nil {
			log.Fatal(err)
		}

		var win WheelResult
		win.ID = result.ID
		win.Date = result.Date
		win.Winner.ID = result.WinnerId
		win.Winner.FirstName = result.WinnerFirstName
		win.Winner.LastName = result.WinnerLastName
		win.Prize.ID = result.PrizeId
		win.Prize.Name = result.ResultName
		wins = append(wins, win)
	}

	return wins
}
