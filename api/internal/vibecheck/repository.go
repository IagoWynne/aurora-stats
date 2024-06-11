package vibecheck

import (
	"aurora-stats/api/internal/people"
	database "aurora-stats/api/internal/pkg/db/mysql"
	"aurora-stats/api/internal/utils"
	"time"
)

type mySqlVibeCheck struct {
	ID        int64     `db:"id"`
	Date      time.Time `db:"vibe_check_date"`
	PersonId  int64     `db:"person_id"`
	Score     float64   `db:"score"`
	FirstName string    `db:"first_name"`
	LastName  string    `db:"last_name"`
}

type VibeCheckRepository struct{}

type Repository interface {
	Create(date time.Time, scores []DomainVibeCheckScore) error
	GetBetweenDates(from time.Time, to time.Time) ([]DomainVibeCheckScore, error)
	Update(id int64, score float64) error
}

func NewVibeCheckRepository() *VibeCheckRepository {
	return &VibeCheckRepository{}
}

func (m VibeCheckRepository) Create(date time.Time, scores []DomainVibeCheckScore) error {
	query := "INSERT INTO vibe_check(vibe_check_date, person_id, score) VALUES(:vibe_check_date, :person_id, :score)"

	var records []mySqlVibeCheck

	for _, domainScore := range scores {
		records = append(records, mapScoreFromDomainToDb(domainScore, date))
	}

	err := database.BatchInsert(query, records, "vibe_check score")
	if err != nil {
		return err
	}

	return nil
}

func mapScoreFromDomainToDb(domainScore DomainVibeCheckScore, date time.Time) mySqlVibeCheck {
	return mySqlVibeCheck{
		Score:    domainScore.Score,
		PersonId: domainScore.Person.ID,
		Date:     date,
	}
}

func (m VibeCheckRepository) GetBetweenDates(from time.Time, to time.Time) ([]DomainVibeCheckScore, error) {
	query := `SELECT vibe_check.id as id, vibe_check_date, person_id, score, first_name, last_name
	FROM vibe_check
	INNER JOIN person on vibe_check.person_id = person.id
	WHERE vibe_check_date BETWEEN ? AND ?`

	filterVars := []any{from, to}

	results, err := database.GetMultiple[mySqlVibeCheck](query, filterVars...)
	if err != nil {
		return nil, err
	}

	return utils.MapArray(results, mapScoreFromDbToDomain), nil
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

	_, err := database.UpdateRecord(query, record, "vibe_check score")
	return err
}
