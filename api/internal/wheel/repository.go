package wheel

import (
	"aurora-stats/api/internal/people"
	database "aurora-stats/api/internal/pkg/db/mysql"
	"aurora-stats/api/internal/utils"
	"strings"
	"time"
)

type mysqlWheelOption struct {
	ID         int64  `db:"id"`
	OptionName string `db:"option_name"`
}

type mysqlWheelRun struct {
	Date     time.Time `db:"run_date"`
	WinnerId int64     `db:"winner_id"`
	PrizeId  int64     `db:"prize_id"`
}

type mysqlWheelResult struct {
	ID         int64     `db:"id"`
	Date       time.Time `db:"run_date"`
	WinnerId   int64     `db:"winner_id"`
	PrizeId    int64     `db:"prize_id"`
	FirstName  string    `db:"first_name"`
	LastName   string    `db:"last_name"`
	OptionName string    `db:"option_name"`
}

type WheelRepository struct{}

type Repository interface {
	CreateOption(optionName string) (int64, error)
	CreateWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error)
	GetOptions() ([]DomainWheelOption, error)
	GetWheelResults(filters GetWheelRunFilters) ([]DomainWheelResult, error)
}

func NewWheelRepository() *WheelRepository {
	return &WheelRepository{}
}

func (m WheelRepository) CreateOption(optionName string) (int64, error) {
	return m.createOption(optionName)
}

func (m WheelRepository) createOption(optionName string) (int64, error) {
	query := "INSERT INTO wheel_option(option_name) VALUES (:option_name)"
	option := mysqlWheelOption{
		OptionName: optionName,
	}

	return database.InsertRecordAndReturnId(query, option, "wheel_option")
}

func (m WheelRepository) CreateWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error) {
	return m.createWheelRun(date, winnerId, resultId)
}

func (m WheelRepository) createWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error) {
	query := "INSERT INTO wheel_run(run_date, winner_id, prize_id) VALUES (:run_date, :winner_id, :prize_id)"
	wheelRun := mysqlWheelRun{
		Date:     date,
		WinnerId: winnerId,
		PrizeId:  resultId,
	}

	return database.InsertRecordAndReturnId(query, wheelRun, "wheel_run")
}

func (m WheelRepository) GetOptions() ([]DomainWheelOption, error) {
	return m.getOptions()
}

func (m WheelRepository) getOptions() ([]DomainWheelOption, error) {
	query := "SELECT id, option_name FROM wheel_option"

	results, err := database.GetMultiple[mysqlWheelOption](query)
	if err != nil {
		return nil, err
	}

	return utils.MapArray(results, mapOptionFromDbToDomain), nil
}

func mapOptionFromDbToDomain(sqlOption mysqlWheelOption) DomainWheelOption {
	return DomainWheelOption{
		ID:   sqlOption.ID,
		Name: sqlOption.OptionName,
	}
}

func (m WheelRepository) GetWheelResults(filters GetWheelRunFilters) ([]DomainWheelResult, error) {
	return m.getWheelResults(filters)
}

func (m WheelRepository) getWheelResults(filters GetWheelRunFilters) ([]DomainWheelResult, error) {
	query := `SELECT wheel_run.id as id, run_date, winner_id, prize_id, first_name, last_name, option_name 
	FROM wheel_run 
	INNER JOIN wheel_option on wheel_run.prize_id = wheel_option.id
	INNER JOIN person on wheel_run.winner_id = person.id`

	var whereClauses []string
	var filterVars []any

	if filters.from != nil {
		whereClauses = append(whereClauses, "run_date >= ?")
		filterVars = append(filterVars, filters.from)
	}

	if filters.to != nil {
		whereClauses = append(whereClauses, "run_date <= ?")
		filterVars = append(filterVars, filters.to)
	}

	if len(whereClauses) > 0 {
		query += " WHERE " + strings.Join(whereClauses, " AND ")
	}

	results, err := database.GetMultiple[mysqlWheelResult](query, filterVars...)
	if err != nil {
		return nil, err
	}

	return utils.MapArray(results, mapWheelResultFromDbToDomain), nil
}

func mapWheelResultFromDbToDomain(sqlResult mysqlWheelResult) DomainWheelResult {
	return DomainWheelResult{
		ID:   sqlResult.ID,
		Date: sqlResult.Date,
		Winner: people.DomainPerson{
			ID:        sqlResult.WinnerId,
			FirstName: sqlResult.FirstName,
			LastName:  sqlResult.LastName,
		},
		Prize: DomainWheelOption{
			ID:   sqlResult.PrizeId,
			Name: sqlResult.OptionName,
		},
	}
}
