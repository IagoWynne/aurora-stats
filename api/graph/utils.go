package graph

import (
	"aurora-stats/api/graph/model"
	"aurora-stats/api/internal/people"
	"aurora-stats/api/internal/vibecheck"
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

func mapGQLVibeCheckScoreToDomain(inputScore *model.VibeCheckInputScore) vibecheck.DomainVibeCheckScore {
	return vibecheck.DomainVibeCheckScore{
		Person: people.DomainPerson{ID: inputScore.PersonID},
		Score:  inputScore.Score,
	}
}

func mapDomainVibeCheckToGQL(domainVibeCheck vibecheck.DomainVibeCheck) *model.VibeCheck {
	var scores []*model.VibeCheckScore

	for _, score := range domainVibeCheck.Scores {
		scores = append(scores, mapDomainVibeCheckScoreToGQL(score))
	}

	return &model.VibeCheck{
		Date:         domainVibeCheck.Date,
		Scores:       scores,
		AverageScore: domainVibeCheck.AverageScore,
	}
}

func mapDomainVibeCheckScoreToGQL(domainVibeCheckScore vibecheck.DomainVibeCheckScore) *model.VibeCheckScore {
	return &model.VibeCheckScore{
		ID:     domainVibeCheckScore.ID,
		Person: mapPersonToGQL(domainVibeCheckScore.Person),
		Score:  domainVibeCheckScore.Score,
	}
}
