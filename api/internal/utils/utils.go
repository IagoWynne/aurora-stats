package utils

import "time"

func MapArray[T any, U any](results []U, mapFn func(U) T) []T {
	var output []T

	for _, result := range results {
		output = append(output, mapFn(result))
	}

	return output
}

func TruncateToDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}
