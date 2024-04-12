# Aurora Stats API
Created by following guide (here)[https://www.howtographql.com/graphql-go/2-queries/]
TODO: set this up to be dockerised and use input parameters

## Running the API
1. Temporary MySQL db using docker: `docker run -p 3306:3306 --name aurora-stats-mysql -e MYSQL_ROOT_PASSWORD=dbpass -e MYSQL_DATABASE=aurora-stats -d mysql:latest` 
   1. `docker exec -it aurora-stats-mysql bash`
   2. `mysql -u root -p` - will request password, enter `dbpass`
   3. `CREATE DATABASE aurora-stats;` Note: database might already exist. If it does, this is fine
2. Run `asdf install`
3. Run `go run ./server.go`
4. You may be prompted to install various `golang` modules. Install them.
5. View the GraphQL playground at `http://localhost:8080/`

## Updating Schema
1. Alter the schema `schema.grapqls`
2. When the schema has been altered, run `go run github.com/99designs/gqlgen generate`

## Inserting/Retrieving from the DB
### Migrations
TODO: Proper migrations

For now:
1. Create an `up` migration that adds a table for your type (e.g. `../mysql-temp-migrations/00001_create_person_table.up.sql`)
2. Log on to the docker mysql database
   1. `docker exec -it aurora-stats-mysql bash`
   2. `mysql -u root -p` - will request password, enter `dbpass`
   3. `USE aurora-stats;`
   4. Run the migration sql
3. Optionally: create a `down` migration

### Adding Struct Types
1. Create a folder for the type at `/graph/internal/` (e.g. `/graph/internal/people`)
2. Within this folder, create a file named after the type (e.g. `people.go`)
3. Create the type(s) you will need
4. Create functions to save/retrieve data (follow examples in `people.go`)