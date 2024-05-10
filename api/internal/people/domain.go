package people

type DomainPerson struct {
	ID        int64
	FirstName string
	LastName  string
}

func MapPersonFromDbToDomain(dbPerson mysqlPerson) DomainPerson {
	return DomainPerson{
		ID:        dbPerson.ID,
		FirstName: dbPerson.FirstName,
		LastName:  dbPerson.LastName,
	}
}
