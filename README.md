# Boilerplate for WECON 2.0 microservices in nestjs

## Description

This project is to be clone and use to start a new microservice from scratch

## Installation

```bash
$ yarn install
```

## Tracing

This project is sending the trace logs to honeycomb, to set the configurations to send tracing is required add 2 environment variables

- HONEYCOMB_API_KEY : to set the api key from honeycomb
- SERVICE_NAME : to set the service name to send the trace logs to the honeycomb
  with the `.env` file is preferred way to set this env variables because this file is ignored in `.gitignore` file

## Debugging the app

1. Docker compose + VSCode (recommended): To have all the dependencies the docker-compose is the easyest way, two steps are required:

- Run the docker compose for debug in terminal (could be the terminal embeded in VSCode), This command will start all the required containers to execute the app in docker.

```bash
docker-compose up db nats
```

- Start services (in launch.json):
  - `API` to start the REST API service
  - `BS Microservice` to start the Business Service (microservice)

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Notes

This is based to [@hvpaiva](https://github.com/hvpaiva) project [clean-architecture-nestjs](https://github.com/hvpaiva/clean-architecture-nestjs)

## Mermaid ER

This project use Mermaid to make the documentation of the Entity Relationship Diagrams

https://mermaid.js.org/syntax/entityRelationshipDiagram.html

If you can't see the Mermaid diagrams, use: https://mermaid-js.github.io/mermaid-live-editor/

Listed entities are:

- Business ([businessDiagramER](./docs/businessDiagramER.mmd))
  - Business Types.
  - Business Categories.
  - Business Suggested Categories.
  - Events Diagram.
- Products ([productsDiagramER](./docs/productsDiagramER.mmd))
  - Products
  - Products Categories
  - Products Brand
  - Products business relations
  - Pivot tables