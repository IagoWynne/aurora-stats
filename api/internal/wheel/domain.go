package wheel

import (
	"aurora-stats/api/internal/people"
	"time"
)

type DomainWheelOption struct {
	ID   int64
	Name string
}

type DomainWheelResult struct {
	ID     int64
	Date   time.Time
	Winner people.DomainPerson
	Prize  DomainWheelOption
}

type GetWheelRunFilters struct {
	from *time.Time
	to   *time.Time
}
