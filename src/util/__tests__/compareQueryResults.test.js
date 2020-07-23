"use strict";

// imports
const assert = require("assert");

// import functions
const compareQueryResults = require("../compareQueryResults.js").compareQueryResults;

// import mock data
const collectibleValidWithResultsSameResults = require("../__mockData__/server.mock").collectibleValidWithResultsSameResults;
const collectibleValidWithResultsDifferentResults = require("../__mockData__/server.mock").collectibleValidWithResultsDifferentResults;

/**
 * Unit tests for compareQueryResults
 */
describe("Unit tests for compareQueryResults", () => {
  it("query results are identical", function () {
    return compareQueryResults(
      collectibleValidWithResultsSameResults,
      collectibleValidWithResultsSameResults.queryResults1,
      collectibleValidWithResultsSameResults.queryResults2
    ).then((collectible) => {
      assert.equal(
        JSON.stringify(collectible),
        JSON.stringify({
          query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          queryResult1: [
            {
              id: 1,
              lastName: "Weg",
              firstName: "Renate",
              address: "Nordweg 5",
              city: "Bremen",
            },
          ],
          queryResult2: [
            {
              id: 1,
              lastName: "Weg",
              firstName: "Renate",
              address: "Nordweg 5",
              city: "Bremen",
            },
          ],
          test_results: true,
        })
      );
    });
  });

  it("query results are not identical", function () {
    return compareQueryResults(
      collectibleValidWithResultsDifferentResults,
      collectibleValidWithResultsDifferentResults.queryResult1,
      collectibleValidWithResultsDifferentResults.queryResult2
    ).then((collectible) => {
      assert.equal(
        JSON.stringify(collectible),
        JSON.stringify({
          query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 2",
          queryResult1: [
            {
              id: 1,
              lastName: "Weg",
              firstName: "Renate",
              address: "Nordweg 5",
              city: "Bremen",
            },
          ],
          queryResult2: [
            {
              id: 1,
              lastName: "Weg",
              firstName: "Renate",
              address: "Nordweg 5",
              city: "Bremen",
            },
            {
              id: 2,
              lastName: "Weg",
              firstName: "Heiko",
              address: "Nordweg 5",
              city: "Bremen",
            },
          ],
          test_results: false,
        })
      );
    });
  });
});
