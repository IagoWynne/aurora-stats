# Aurora Stats

## Website
- Built with react
- See `/website/README.md` for more info

## API
- GraphQL API build in go
- See `/api/README.md` for more info

## Database
- MySQL database
- Migrations managed with Flyway
- Migrations are stored in `/mysql/migrations`
    - Migration files must be named `V{version_number}__{migration name}.sql`
    - Flyway will automatically pick these up and run new ones