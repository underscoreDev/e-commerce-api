# Storefront Backend Project

# Project Title

E-commerce backend API written in NodeJS-Typescript. This application has endpoints for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

- Node
- Postgres
- DB-migrate

## Technologies used

- Postgres for the database
- Typescript/Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine and supertest for unit/integration testing

### Clone the repo

`git clone https://github.com/underscoreDev/e-commerce-api.git`

### Install dependencies

`npm install`

<!-- ### Starting the server

`npm run dev`

### Run test

`npm run test` -->

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
ENV=dev
POSTGRES_PORT=5432
LOCAL_HOST_PORT=8989
LOCAL_HOST=127.0.0.1
POSTGRES_USER=postgres
POSTGRES_DEV_DB=store
POSTGRES_PASSWORD=Godis-4me
POSTGRES_TEST_DB=store_test
BCRYPT_PASSWORD=Godis-4me
SALT_ROUNDS=10
PEPPER=verySecurePassword
JWT_TOKEN_SECRET=The-Best-Underscore-Developer-Super-Secret-Json-Web-Token

```

Next, start the Postgres server in your terminal:

# Login to Postgres

`psql -U postgres`
enter the password when it prompts for a password

##### This will list out all the databases

\l

# If "store" database is not present

create database store;

````

Next, you need to run the database migrations:
```bash
db-migrate up
````

## Running the application

Use the following command to run the application in watch mode:

```bash
yarn dev
```

The application will run on http://localhost:8989/.

## Running test

Use the following command to run the unit tests:

```bash
yarn test
```

## Built With

- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [Yarn](https://yarnpkg.com/) - The dependency manager
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [Jasmine](https://jasmine.github.io/) - The unit testing framework

## Authors

- **Godswill Edet** - _Other work_ - [underscoredev](https://github.com/underscoreDev)

## Acknowledgments

- The official documentation of `db-migrate`
- The official Documentation of `Jasmine`
