# Setup

Prerequisites: [node](https://nodejs.org/en/) and [yarn 1.x.x](https://classic.yarnpkg.com/lang/en/) are installyed on your system

```
yarn install
```

# Running the server

```
yarn start
```

# Testing

```
yarn test
```

# Sample requests

### Getting the endpoints (Request / Response):

```
localhost:80/endpoints
```

```json
{
  "payload": "/payload"
}
```

### Handling the payload - Valid SQL-statements and same results (Request / Response):

```json
{
  "image": "runner-sql",
  "timeout": 30,
  "user": "test",
  "payload": {
    "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
    "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1"
  }
}
```

```json
{
  "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  "queryResult1": [
    {
      "id": 1,
      "lastName": "Weg",
      "firstName": "Renate",
      "address": "Nordweg 5",
      "city": "Bremen"
    }
  ],
  "queryResult2": [
    {
      "id": 1,
      "lastName": "Weg",
      "firstName": "Renate",
      "address": "Nordweg 5",
      "city": "Bremen"
    }
  ],
  "test_results": true
}
```

### Handling the payload - Valid SQL-statements and different results (Request / Response):

```json
{
  "image": "runner-sql",
  "timeout": 30,
  "user": "test",
  "payload": {
    "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 2",
    "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1"
  }
}
```

```json
{
  "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 2",
  "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  "queryResult1": [
    {
      "id": 1,
      "lastName": "Weg",
      "firstName": "Renate",
      "address": "Nordweg 5",
      "city": "Bremen"
    },
    {
      "id": 2,
      "lastName": "Weg",
      "firstName": "Heiko",
      "address": "Nordweg 5",
      "city": "Bremen"
    }
  ],
  "queryResult2": [
    {
      "id": 1,
      "lastName": "Weg",
      "firstName": "Renate",
      "address": "Nordweg 5",
      "city": "Bremen"
    }
  ],
  "test_results": false
}
```

### Handling the payload - Invalid SQL-Statement (Request / Response):

```json
{
  "image": "runner-sql",
  "timeout": 30,
  "user": "test",
  "payload": {
    "query1": "* FROM person ORDER BY lastName DESC LIMIT 2",
    "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1"
  }
}
```

```json
{
  "query1": "* FROM person ORDER BY lastName DESC LIMIT 2",
  "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  "test_results": false,
  "error": "query1 is not a SELECT-statement"
}
```
