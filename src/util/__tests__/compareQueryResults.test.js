"use strict";

// import functions
const compareQueryResults = require("../compareQueryResults.js").compareQueryResults;

// import mock data
const collectibleValidWithResultsSameResults = require("../__mockData__/server.mock").collectibleValidWithResultsSameResults;
const collectibleValidWithResultsDifferentResults = require("../__mockData__/server.mock").collectibleValidWithResultsDifferentResults;

/**
 * Unit tests for compareQueryResults
 */

describe("Unit tests for compareQueryResults", () => {
  it("query results are identical", () => {
    expect.assertions(1);
    return compareQueryResults(
      collectibleValidWithResultsSameResults,
      collectibleValidWithResultsSameResults.queryResults1,
      collectibleValidWithResultsSameResults.queryResults2
    ).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
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

  it("query results are not identical", () => {
    expect.assertions(1);
    return compareQueryResults(
      collectibleValidWithResultsDifferentResults,
      collectibleValidWithResultsDifferentResults.queryResult1,
      collectibleValidWithResultsDifferentResults.queryResult2
    ).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 2",
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
});
