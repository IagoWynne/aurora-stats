// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AvailableOption struct {
	OptionID int `json:"optionId"`
	Count    int `json:"count"`
}

type Mutation struct {
}

type Person struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type Query struct {
}

type WheelOption struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type WheelResult struct {
	ID       string `json:"id"`
	Date     int    `json:"date"`
	OptionID int    `json:"optionId"`
	PersonID int    `json:"personId"`
}
