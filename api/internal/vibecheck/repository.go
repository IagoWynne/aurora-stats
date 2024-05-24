package vibecheck

import (
	"aurora-stats/api/internal/people"
	database "aurora-stats/api/internal/pkg/db/mysql"
	"log"
	"time"

	"github.com/jmoiron/sqlx"
)

type mySqlVibeCheck struct {
	ID        int64     `db:"id"`
	Date      time.Time `db:"vibe_check_date"`
	PersonId  int64     `db:"person_id"`
	Score     float64   `db:"score"`
	FirstName string    `db:"first_name"`
	LastName  string    `db:"last_name"`
}

type VibeCheckRepository struct {
	db *sqlx.DB
}

type Repository interface {
	Create(date time.Time, scores []DomainVibeCheckScore) error
	GetBetweenDates(from time.Time, to time.Time) ([]DomainVibeCheckScore, error)
	Update(id int64, score float64) error
}

func NewVibeCheckRepository(db *sqlx.DB) *VibeCheckRepository {
	if db == nil {
		log.Panic("missing db")
	}

	return &VibeCheckRepository{db: db}
}

func (m VibeCheckRepository) Create(date time.Time, scores []DomainVibeCheckScore) error {
	query := "INSERT INTO vibe_check(vibe_check_date, person_id, score) VALUES(:vibe_check_date, :person_id, :score)"

	var records []mySqlVibeCheck

	for _, domainScore := range scores {
		records = append(records, mapScoreFromDomainToDb(domainScore))
	}

	err := database.BatchInsert(m.db, query, records, "vibe_check score")
	if err != nil {
		return err
	}

	return nil
}

func mapScoreFromDomainToDb(domainScore DomainVibeCheckScore) mySqlVibeCheck {
	return mySqlVibeCheck{
		Score:    domainScore.Score,
		PersonId: domainScore.Person.ID,
	}
}

func (m VibeCheckRepository) GetBetweenDates(from time.Time, to time.Time) ([]DomainVibeCheckScore, error) {
	query := `SELECT id, person_id, score, first_name, last_name
	FROM vibe_check
	INNER JOIN person on vibe_check.person_id = person.id
	WHERE vibe_check_date BETWEEN ? AND ?`

	filterVars := []any{from, to}

	return database.GetMultiple(m.db, query, mapScoreFromDbToDomain, filterVars...)
}

func mapScoreFromDbToDomain(dbScore mySqlVibeCheck) DomainVibeCheckScore {
	return DomainVibeCheckScore{
		ID:    dbScore.ID,
		Score: dbScore.Score,
		Date:  dbScore.Date,
		Person: people.DomainPerson{
			ID:        dbScore.PersonId,
			FirstName: dbScore.FirstName,
			LastName:  dbScore.LastName,
		},
	}
}

func (m VibeCheckRepository) Update(id int64, score float64) error {
	query := `INSERT INTO vibe_check (id, score)
	VALUES(:id, :score)
	ON DUPLICATE KEY UPDATE
	score = :score`

	record := mySqlVibeCheck{
		ID:    id,
		Score: score,
	}

	_, err := database.UpdateRecord(m.db, query, record, "vibe_check score")
	return err
}
