# Aurora Stats
## Running the Project
- Clone the repo
- Checkout `main` branch
- Run `docker compose up` from the root directory to run the app locally. Changes made to the website will automatically be picked up and included. Changes made to the api will require a full rebuild of the container.

## Info
### Website
- Built with react
- See `/website/README.md` for more info

### API
- GraphQL API build in go
- See `/api/README.md` for more info

### Database
- MySQL database
- Migrations managed with Flyway
- Migrations are stored in `/mysql/migrations`
    - Migration files must be named `V{version_number}__{migration name}.sql`
    - Flyway will automatically pick these up and run new ones