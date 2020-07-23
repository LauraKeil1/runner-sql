// imports
const assert = require("assert");

// import functions
const validateQuery = require("../validateQuery.js").validateQuery;

// import mock data
const collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock").collectibleValidWithoutResultsSameResults;
const collectibleInvalidWithoutResults_1 = require("../__mockData__/server.mock").collectibleInvalidWithoutResults_1;
const collectibleInvalidWithoutResults_2 = require("../__mockData__/server.mock").collectibleInvalidWithoutResults_2;
const collectibleInvalidWithoutResults_3 = require("../__mockData__/server.mock").collectibleInvalidWithoutResults_3;
const collectibleValidWithoutResultsDifferentResults = require("../__mockData__/server.mock").collectibleValidWithoutResultsDifferentResults;

/**
 * Unit tests for validateQuery
 */
describe("Unit tests for validateQuery", () => {
  it("query is valid (without ';')", function () {
    return validateQuery(collectibleValidWithoutResultsSameResults, collectibleValidWithoutResultsSameResults.query2, "query2").then(
      (collectible) => {
        assert.equal(collectible, collectibleValidWithoutResultsSameResults);
      }
    );
  });

  it("query is valid (with ';')", function () {
    return validateQuery(collectibleValidWithoutResultsDifferentResults, collectibleValidWithoutResultsDifferentResults.query2, "query2").then(
      (collectible) => {
        assert.equal(collectible, collectibleValidWithoutResultsDifferentResults);
      }
    );
  });

  it("query is invalid (no SELECT-statement)", function () {
    return validateQuery(collectibleInvalidWithoutResults_1, collectibleInvalidWithoutResults_1.query2, "query2").catch((collectible) => {
      assert.equal(
        JSON.stringify(collectible),
        JSON.stringify({
          query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          query2: "* FROM person ORDER BY lastName DESC LIMIT 1",
          queryResult1: undefined,
          queryResult2: undefined,
          test_results: false,
          error: "query2 is not a SELECT-statement",
        })
      );
    });
  });

  it("query is invalid (DROP-statement)", function () {
    return validateQuery(collectibleInvalidWithoutResults_3, collectibleInvalidWithoutResults_3.query1, "query1").catch((collectible) => {
      assert.equal(
        JSON.stringify(collectible),
        JSON.stringify({
          query1: "DROP TABLE person",
          query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          queryResult1: undefined,
          queryResult2: undefined,
          test_results: false,
          error: "query1 is not a SELECT-statement",
        })
      );
    });
  });

  it("query is invalid (continues after ';')", function () {
    return validateQuery(collectibleInvalidWithoutResults_2, collectibleInvalidWithoutResults_2.query1, "query1").catch((collectible) => {
      assert.equal(
        JSON.stringify(collectible),
        JSON.stringify({
          query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1; SELECT * FROM person",
          query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          queryResult1: undefined,
          queryResult2: undefined,
          test_results: false,
          error: "query1 is an invalid SQL-statement. The statement needs to end after the ';'",
        })
      );
    });
  });
});
