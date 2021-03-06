# Setup/Getting started

- Prerequisites (1): [node](https://nodejs.org/en/) (version: v12.16.1) and [yarn](https://classic.yarnpkg.com/lang/en/) (version: 1.22.4) are installyed on your system
- Prerequisties (2): Optional (if you want to run it via Docker): [docker](https://www.docker.com/) (version: 19.03.8) is installed on your system

```
git clone https://github.com/LauraKeil1/runner-sql.git
cd runner-sql
```

```
yarn install
yarn start
```

## Custom Port

Express will start on port 80 if nothing else is specified. On same system root
rights are required to run a service on port 80. You can change the port by
setting an environment variable `PORT`. For example:

```
PORT=3000 yarn start
```

# Sample requests/responses

- All sample requests are included in the following Postman collection: https://www.postman.com/collections/61be4947eca78d87d714 (you can just open the link, copy everything and use the import feature in Postman)

### Getting the endpoints:

```json
curl --location --request GET 'localhost:80/endpoints'
```

```json
{
  "payload": "/payload"
}
```

### Handling the payload - validate - without error

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "timeout": 30,
    "user": "test",
    "payload": {
        "request_type": "validate",
        "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2"
    }
}'
```

```json
{
  "request_type": "validate",
  "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2",
  "queryResult1": [
    {
      "CustomerId": 37,
      "FirstName": "Fynn",
      "LastName": "Zimmermann",
      "Company": null,
      "Address": "Berger Straße 10",
      "City": "Frankfurt",
      "State": null,
      "Country": "Germany",
      "PostalCode": "60316",
      "Phone": "+49 069 40598889",
      "Fax": null,
      "Email": "fzimmermann@yahoo.de",
      "SupportRepId": 3
    },
    {
      "CustomerId": 49,
      "FirstName": "Stanisław",
      "LastName": "Wójcik",
      "Company": null,
      "Address": "Ordynacka 10",
      "City": "Warsaw",
      "State": null,
      "Country": "Poland",
      "PostalCode": "00-358",
      "Phone": "+48 22 828 37 39",
      "Fax": null,
      "Email": "stanisław.wójcik@wp.pl",
      "SupportRepId": 4
    }
  ],
  "test_results": true
}
```

### Handling the payload - validate - with validateQuery error

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "timeout": 30,
    "user": "test",
    "payload": {
        "request_type": "validate",
        "query1": " * FROM customers ORDER BY LastName DESC LIMIT 1"
    }
}'
```

```json
{
  "request_type": "validate",
  "query1": " * FROM customers ORDER BY LastName DESC LIMIT 1",
  "test_results": false,
  "error": {
    "queryId": "query1",
    "message": "Query is not a SELECT-statement"
  }
}
```

### Handling the payload - validate - with SQLite error

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "timeout": 30,
    "user": "test",
    "payload": {
        "request_type": "validate",
        "query1": "SELECT * FROM person ORDER BY LastName DESC LIMIT 1"
    }
}'
```

```json
{
  "request_type": "validate",
  "query1": "SELECT * FROM person ORDER BY LastName DESC LIMIT 1",
  "test_results": false,
  "error": {
    "queryId": "query1",
    "errno": 1,
    "code": "SQLITE_ERROR",
    "message": "SQLITE_ERROR: no such table: person"
  }
}
```

### Handling the payload - evaluate - without error and same query results

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "timeout": 30,
  "user": "test",
  "payload": {
  	"request_type": "evaluate",
    "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
    "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1"
  }
}'
```

```json
{
  "request_type": "evaluate",
  "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  "queryResult1": [
    {
      "CustomerId": 37,
      "FirstName": "Fynn",
      "LastName": "Zimmermann",
      "Company": null,
      "Address": "Berger Straße 10",
      "City": "Frankfurt",
      "State": null,
      "Country": "Germany",
      "PostalCode": "60316",
      "Phone": "+49 069 40598889",
      "Fax": null,
      "Email": "fzimmermann@yahoo.de",
      "SupportRepId": 3
    }
  ],
  "queryResult2": [
    {
      "CustomerId": 37,
      "FirstName": "Fynn",
      "LastName": "Zimmermann",
      "Company": null,
      "Address": "Berger Straße 10",
      "City": "Frankfurt",
      "State": null,
      "Country": "Germany",
      "PostalCode": "60316",
      "Phone": "+49 069 40598889",
      "Fax": null,
      "Email": "fzimmermann@yahoo.de",
      "SupportRepId": 3
    }
  ],
  "test_results": true
}
```

### Handling the payload - evaluate - without error and different query results

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "timeout": 30,
  "user": "test",
  "payload": {
  	"request_type": "evaluate",
    "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2",
    "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1"
  }
}'
```

```json
{
  "request_type": "evaluate",
  "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2",
  "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  "queryResult1": [
    {
      "CustomerId": 37,
      "FirstName": "Fynn",
      "LastName": "Zimmermann",
      "Company": null,
      "Address": "Berger Straße 10",
      "City": "Frankfurt",
      "State": null,
      "Country": "Germany",
      "PostalCode": "60316",
      "Phone": "+49 069 40598889",
      "Fax": null,
      "Email": "fzimmermann@yahoo.de",
      "SupportRepId": 3
    },
    {
      "CustomerId": 49,
      "FirstName": "Stanisław",
      "LastName": "Wójcik",
      "Company": null,
      "Address": "Ordynacka 10",
      "City": "Warsaw",
      "State": null,
      "Country": "Poland",
      "PostalCode": "00-358",
      "Phone": "+48 22 828 37 39",
      "Fax": null,
      "Email": "stanisław.wójcik@wp.pl",
      "SupportRepId": 4
    }
  ],
  "queryResult2": [
    {
      "CustomerId": 37,
      "FirstName": "Fynn",
      "LastName": "Zimmermann",
      "Company": null,
      "Address": "Berger Straße 10",
      "City": "Frankfurt",
      "State": null,
      "Country": "Germany",
      "PostalCode": "60316",
      "Phone": "+49 069 40598889",
      "Fax": null,
      "Email": "fzimmermann@yahoo.de",
      "SupportRepId": 3
    }
  ],
  "test_results": false
}
```

### Handling the payload - evaluate - with validateQuery error

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "timeout": 30,
  "user": "test",
  "payload": {
  	"request_type": "evaluate",
    "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
    "query2": "* FROM customers ORDER BY LastName DESC LIMIT 1"
  }
}'
```

```json
{
  "request_type": "evaluate",
  "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  "query2": "* FROM customers ORDER BY LastName DESC LIMIT 1",
  "test_results": false,
  "error": {
    "queryId": "query2",
    "message": "Query is not a SELECT-statement"
  }
}
```

### Handling the payload - evaluate - with SQLite error

```json
curl --location --request POST 'localhost:80/payload' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "timeout": 30,
  "user": "test",
  "payload": {
  	"request_type": "evaluate",
    "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
    "query2": "SELECT * FROM person ORDER BY LastName DESC LIMIT 1"
  }
}'
```

```json
{
  "request_type": "evaluate",
  "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  "query2": "SELECT * FROM person ORDER BY LastName DESC LIMIT 1",
  "queryResult1": [
    {
      "CustomerId": 37,
      "FirstName": "Fynn",
      "LastName": "Zimmermann",
      "Company": null,
      "Address": "Berger Straße 10",
      "City": "Frankfurt",
      "State": null,
      "Country": "Germany",
      "PostalCode": "60316",
      "Phone": "+49 069 40598889",
      "Fax": null,
      "Email": "fzimmermann@yahoo.de",
      "SupportRepId": 3
    }
  ],
  "test_results": false,
  "error": {
    "queryId": "query2",
    "errno": 1,
    "code": "SQLITE_ERROR",
    "message": "SQLITE_ERROR: no such table: person"
  }
}
```

# Testing

```
yarn test
```

# Running via Docker

```
docker build --tag runner-sql:1.0 .
```

```
docker run --publish 80:80 --name runner-sql runner-sql:1.0
```
