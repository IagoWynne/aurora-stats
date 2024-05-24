package vibecheck

import (
	"aurora-stats/api/internal/people"
	"time"
)

type DomainVibeCheckScore struct {
	ID     int64
	Person people.DomainPerson
	Score  float64
	Date   time.Time
}

type DomainVibeCheck struct {
	Date         time.Time
	Scores       []DomainVibeCheckScore
	AverageScore float64
}
