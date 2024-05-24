# Aurora Stats API
Created by following guide (here)[https://www.howtographql.com/graphql-go/2-queries/]

## Updating Schema
1. Alter the schema `schema.grapqls`
2. When the schema has been altered, run `go run github.com/99designs/gqlgen generate`
   1. If it asks you to `go get` a lot of packages, use `go get github.com/99designs/gqlgen@v0.17.45 && go get github.com/99designs/gqlgen/codegen@v0.17.45 && go get github.com/99designs/gqlgen/internal/imports@v0.17.45 && go get github.com/99designs/gqlgen/codegen/config@v0.17.45 && go run github.com/99designs/gqlgen generate` instead

## Adding Struct Types
1. Create a folder for the type at `/graph/internal/` (e.g. `/graph/internal/people`)
2. Within this folder, create a file named after the type (e.g. `people.go`)
3. Create the type(s) you will need
4. Create functions to save/retrieve data (follow examples in `people.go` or `wheel.go`)
