# ccd-complex-case-poc

## Case Orchestration Service (this app)

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Testing the app

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## CCD stack

### Installation

Follow instruction on https://github.com/hmcts/ccd-docker.

### Configuration

Add following users to https://github.com/hmcts/ccd-docker/blob/master/bin/users.json and re-run scripts that add roles and users.

```json
[
  {"email": "caseworker.poc.ca@gmail.com", "roles": "caseworker,caseworker-poc,caseworker-poc-ca", "lastName": "POC", "firstName": "Caseworker"},

  {"email": "caseworker.poc.solicitor-1@gmail.com", "roles": "caseworker,caseworker-poc,caseworker-poc-solicitor", "lastName": "POC", "firstName": "Solicitor #1"},

  {"email": "caseworker.poc.solicitor-2@gmail.com", "roles": "caseworker,caseworker-poc,caseworker-poc-solicitor", "lastName": "POC", "firstName": "Solicitor #2"} 
]
```

## License

[MIT licensed](LICENSE).
