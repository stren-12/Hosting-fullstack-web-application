# Storefront Backend Project
Author: Sultan Fahad Aljohani 
## About
Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements. Create a RESTful API to be accessible to the frontend developer. You will also have written test, secured user information with encryption, and provide tokens for integration into the frontend.

## Instaltion
### Prerequisites
In order to install this app packages and make it work as expected you need below softwares to be installed

1. Node js (16 or 18)
2. yarn (or npm)
3. db-migrate and db-migrate-pg (to migration)
4. Postgres database 

### Package installation
Run `yarn` (or `npm install`) command in the project directory to install the packages.
This will install the package at node_modules directory and create a look file (a verbose log of installed packages with the versions and dependences)
### Database config

Rename (or copy) .env-example to .env by `cp .env-example .env` and database-example.json to database.json by `cp database-example.json database.json  database.json`, fill the two files with proper environment variables.
Find an explanation below for both files:
#### .env
| environment variable | descrebtion   |
| :-----: | :---: |
| PGUSER | database user   |
| PGHOST | database host   |
| PGPASSWORD | database password   |
| PGDATABASE | database name   |
| PGDATABASE_TEST | test database (prefer mcit_nanodegree_test) |
| PGPORT | database port for postgres it's 5432   |
| SALT | Salt for bcrypt hashing   |
| TOKEN_SECRET | JWT token secret  |


#### database.json
Note we have two json objects here in this file `test` and `dev` the values must be the same except for the `test` database name (prefer mcit_nanodegree_test)

| value | descrebtion   |
| :-----: | :---: |
| driver | db-migreate driver (keep it as it's 'pg')   |
| host | database host   |
| database | database name   |
| user | database user   |
| password | password |


Install db-migrate and postgres driver globally by the command `npm -g i db-migrate db-migrate-pg` and then apply migrations by
`db-migrate up`

Note that test database must be named mcit_nanodegree_test due to package.json test script (change it if needed in both db:create and db:drop)

### serving the app 
The backend is runing at port 3000 with localhost as base_url to run the app issue command `yarn watch` or you can issue two command `yarn tsc` and `yarn start`, the `watch` command will compile and run the server for you 

### Testing
We have six diffrent test Specs and 17 unit tests to run the tests issue command `yarn test` and the script will test the app with the test databse (mcit_nanodegree_test) and drop it after the test is done 
