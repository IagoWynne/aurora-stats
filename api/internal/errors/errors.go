package customErrors

import (
	"fmt"
	"strings"
)

type NotFoundError struct {
	msg string
}

func (error *NotFoundError) Error() string {
	return error.msg
}

func NewNotFoundError(entity string, id int64) error {
	msg := fmt.Sprintf("could not find %s with ID %d", entity, id)

	return &NotFoundError{
		msg,
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
		fmt.Sprintf("required value missing: %s", field)

	return &RequiredValueMissingError{
		msg,
	}
}

func NewMultipleRequiredValueMissingError(fields []string) error {
	msg := fmt.Sprintf("multiple required values missing: %s", strings.Join(fields, ", "))

	return &RequiredValueMissingError{
		msg,
	}
}
