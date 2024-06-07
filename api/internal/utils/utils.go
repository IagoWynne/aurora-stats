package utils

func MapArray[T any, U any](results []U, mapFn func(U) T) []T {
	var output []T

	for _, result := range results {
		output = append(output, mapFn(result))
	}

	return output
}
