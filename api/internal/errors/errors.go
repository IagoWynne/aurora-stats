package customErrors

import (
	"fmt"
)

type NotFoundError struct {
	msg string
}

func (error *NotFoundError) Error() string {
	return error.msg
}

func NewNotFoundError() error {
	return &NotFoundError{
		"Could not find record",
	}
}

type RequiredValueMissingError struct {
	msg string
}

func (error *RequiredValueMissingError) Error() string {
	return error.msg
}

func NewRequiredValueMissingError(field string) error {
	msg :=
		fmt.Sprintf("Required value missing: %s", field)

	return &RequiredValueMissingError{
		msg,
	}
}
