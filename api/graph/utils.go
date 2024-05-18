package graph

import (
	"aurora-stats/api/graph/model"
	"aurora-stats/api/internal/people"
	"aurora-stats/api/internal/wheel"
)

func mapPersonToGQL(domainPerson people.DomainPerson) *model.Person {
	return &model.Person{
		ID:        domainPerson.ID,
		FirstName: domainPerson.FirstName,
		LastName:  domainPerson.LastName,
	}
}

func mapWheelOptionToGQL(domainWheelOption wheel.DomainWheelOption) *model.WheelOption {
	return &model.WheelOption{ID: domainWheelOption.ID, Name: domainWheelOption.Name}
}

func mapDomainWheelResultToGQL(domainWheelResult wheel.DomainWheelResult) *model.WheelResult {
	return &model.WheelResult{
		ID:     domainWheelResult.ID,
		Date:   domainWheelResult.Date,
		Winner: mapPersonToGQL(domainWheelResult.Winner),
		Prize:  mapWheelOptionToGQL(domainWheelResult.Prize),
	}
}
