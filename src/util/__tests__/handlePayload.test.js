"use strict";

// import functions
const handlePayload = require("../handlePayload").handlePayload;

// import mock data
const collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock").collectibleValidWithoutResultsSameResults;
const collectibleInvalidWithoutResults_1 = require("../__mockData__/server.mock").collectibleInvalidWithoutResults_1;
const collectibleValidWithoutResultsDifferentResults = require("../__mockData__/server.mock").collectibleValidWithoutResultsDifferentResults;

/**
 * Unit tests for handlePayload
 * Also covers: connectToDatabase, getQueryResults and disconnectFromDatabase
 */

describe("Unit tests for handlePayload", () => {
  it("Request is handled correctly (without error) and query results are identical", () => {
    expect.assertions(1);
    return handlePayload(collectibleValidWithoutResultsSameResults).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": undefined,
            "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
            "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
            "queryResult1": Array [
              Object {
                "address": "Nordweg 5",
                "city": "Bremen",
                "firstName": "Renate",
                "id": 1,
                "lastName": "Weg",
              },
            ],
            "queryResult2": Array [
              Object {
                "address": "Nordweg 5",
                "city": "Bremen",
                "firstName": "Renate",
                "id": 1,
                "lastName": "Weg",
              },
            ],
            "test_results": true,
          }
        `);
    });
  });

  it("Request is handled correctly (without error) and query results are not identical", () => {
    expect.assertions(1);
    return handlePayload(collectibleValidWithoutResultsDifferentResults).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": undefined,
            "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
            "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 2;",
            "queryResult1": Array [
              Object {
                "address": "Nordweg 5",
                "city": "Bremen",
                "firstName": "Renate",
                "id": 1,
                "lastName": "Weg",
              },
            ],
            "queryResult2": Array [
              Object {
                "address": "Nordweg 5",
                "city": "Bremen",
                "firstName": "Renate",
                "id": 1,
                "lastName": "Weg",
              },
              Object {
                "address": "Nordweg 5",
                "city": "Bremen",
                "firstName": "Heiko",
                "id": 2,
                "lastName": "Weg",
              },
            ],
            "test_results": false,
          }
        `);
    });
  });

  it("Request is handled correctly (with error)", () => {
    expect.assertions(1);
    return handlePayload(collectibleInvalidWithoutResults_1).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": "query2 is not a SELECT-statement",
            "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
            "query2": "* FROM person ORDER BY lastName DESC LIMIT 1",
            "queryResult1": undefined,
            "queryResult2": undefined,
            "test_results": false,
          }
        `);
    });
  });
});
