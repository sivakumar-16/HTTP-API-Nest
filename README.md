# HTTP API applicationfestivalData

## project overview

This task is to creare a HTTP API application that lists out music festival data in a particular manner.

## technology used

- Node
- Typescipt
- NestJs
- Docker
- jest

## Installation

```bash
git clone https://github.com/sivakumar-16/HTTP-API-Nest.git
```

```bash
cd HTTP-API-Nest
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```

## Docker

This project includes a Dockerfile to build a Docker image for the application.run the following command in the root directory of your project:

    ```bash
    # docker build
    $ docker build -t imagename:tagname -f Dockerfile.
    #docker run
    $ docker run -d -p 3000:3000 imagename
    ```

# Accessing the Application

After running the container, you can access the application by navigating to http://localhost:3000 in your browser.

## Test

```bash
# unit tests
$ npm run test
# test coverage
$ npm run test:cov
```

# API Endpoints

The application exposes the following endpoints: \* GET /festivals: Fetches and sorts festival data alphabetically by record label, band, and festival name.

## Logging

This project uses a logging mechanism to help monitor and debug the application. By default, NestJS provides a built-in logging service, but you can customize or extend it based on your needs.

## Download link

[git repo](https://github.com/sivakumar-16/HTTP-API-Nest.git)
