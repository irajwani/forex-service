## Description

Generic TS (REST + GraphQL) based service to provide exchange rates between currencies with low latency
It hydrates the cache every 1 hour with certain chosen currencies

## Installation

```bash
$ git clone <this-repo>
$ npm install
```

## Running the app

```bash
$ docker build -t xanpool-assignment .
$ docker-compose up
```

Then proceed to usage section

Alternatively, if you would like to run the app locally, and node_modules fail to install, it might be a node version issue (I used node 12.18.1)
In this case, install nvm with:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Then follow the instructions provided to make 'nvm' command available within your terminal
Then,

```bash
$ nvm install 12.18.1
$ nvm use 12.18.1
$ npm i
$ npm run dev
```

and run a redis container within docker

## Usage

Simply visit the [swagger documentation](http://localhost:3000/documentation) to see all available endpoints and their required parameters

[GraphQL playground](http://localhost:3000/graphql)

Sample query:

```bash
query {
  rates(from: USD, to: [SGD, GBP]) {
    pair
    rate
    date
  }
}
```

```bash
# Unit/Integration tests
npm run test

# End to End tests
npm run test:e2e

# Coverage report
npm run test:cov
```
