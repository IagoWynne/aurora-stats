package wheel

import (
	"aurora-stats/api/internal/people"
	database "aurora-stats/api/internal/pkg/db/mysql"
	"log"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
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

type WheelRepository struct {
	db *sqlx.DB
}

type Repository interface {
	CreateOption(optionName string) (int64, error)
	CreateWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error)
	GetOptions() ([]DomainWheelOption, error)
	GetWheelResults(filters GetWheelRunFilters) ([]DomainWheelResult, error)
}

func NewWheelRepository(db *sqlx.DB) *WheelRepository {
	if db == nil {
		log.Panic("missing db")
	}

	return &WheelRepository{db: db}
}

func (m WheelRepository) CreateOption(optionName string) (int64, error) {
	return m.createOption(m.db, optionName)
}

func (m WheelRepository) createOption(db *sqlx.DB, optionName string) (int64, error) {
	query := "INSERT INTO wheel_option(option_name) VALUES (:option_name)"
	option := mysqlWheelOption{
		OptionName: optionName,
	}

	return database.InsertRecordAndReturnId(db, query, option, "wheel_option")
}

func (m WheelRepository) CreateWheelRun(date time.Time, winnerId int64, resultId int64) (int64, error) {
	return m.createWheelRun(m.db, date, winnerId, resultId)
}

func (m WheelRepository) createWheelRun(db *sqlx.DB, date time.Time, winnerId int64, resultId int64) (int64, error) {
	query := "INSERT INTO wheel_run(run_date, winner_id, prize_id) VALUES (:run_date, :winner_id, :prize_id)"
	wheelRun := mysqlWheelRun{
		Date:     date,
		WinnerId: winnerId,
		PrizeId:  resultId,
	}

	return database.InsertRecordAndReturnId(db, query, wheelRun, "wheel_run")
}

func (m WheelRepository) GetOptions() ([]DomainWheelOption, error) {
	return m.getOptions(m.db)
}

func (m WheelRepository) getOptions(db *sqlx.DB) ([]DomainWheelOption, error) {
	query := "SELECT id, option_name FROM wheel_option"

	return database.GetMultiple(db, query, mapOptionFromDbToDomain)
}

func mapOptionFromDbToDomain(sqlOption mysqlWheelOption) DomainWheelOption {
	return DomainWheelOption{
		ID:   sqlOption.ID,
		Name: sqlOption.OptionName,
	}
}

func (m WheelRepository) GetWheelResults(filters GetWheelRunFilters) ([]DomainWheelResult, error) {
	return m.getWheelResults(m.db, filters)
}

func (m WheelRepository) getWheelResults(db *sqlx.DB, filters GetWheelRunFilters) ([]DomainWheelResult, error) {
	query := `SELECT wheel_run.id as id, run_date, winner_id, prize_id, first_name, last_name, option_name 
	FROM wheel_run 
	INNER JOIN wheel_option on wheel_run.prize_id = wheel_option.id
	INNER JOIN person on wheel_run.winner_id = person.id`

	var whereClauses []string

	if filters.to != nil {
		whereClauses = append(whereClauses, "to <= ?")
	}

	if filters.from != nil {
		whereClauses = append(whereClauses, "from >= ?")
	}

	if len(whereClauses) > 0 {
		query += " WHERE " + strings.Join(whereClauses, " AND ")
	}

	return database.GetMultiple(db, query, mapWheelResultFromDbToDomain)
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
