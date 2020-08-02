"use strict";

// import functions
const validateQuery = require("../validateQuery.js").validateQuery;

// import mock data
const eval_collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock").eval_collectibleValidWithoutResultsSameResults;
const eval_collectibleInvalidWithoutResults_1 = require("../__mockData__/server.mock").eval_collectibleInvalidWithoutResults_1;
const eval_collectibleInvalidWithoutResults_2 = require("../__mockData__/server.mock").eval_collectibleInvalidWithoutResults_2;
const eval_collectibleInvalidWithoutResults_3 = require("../__mockData__/server.mock").eval_collectibleInvalidWithoutResults_3;
const eval_collectibleValidWithoutResultsDifferentResults = require("../__mockData__/server.mock")
  .eval_collectibleValidWithoutResultsDifferentResults;

/**
 * Unit tests for validateQuery
 */

describe("Unit tests for validateQuery", () => {
  it("query is valid (without ';')", () => {
    expect.assertions(1);
    return validateQuery(eval_collectibleValidWithoutResultsSameResults, eval_collectibleValidWithoutResultsSameResults.query2, "query2").then(
      (collectible) => {
        expect(collectible).toEqual(eval_collectibleValidWithoutResultsSameResults);
      }
    );
  });

  it("query is valid (with ';')", () => {
    expect.assertions(1);
    return validateQuery(
      eval_collectibleValidWithoutResultsDifferentResults,
      eval_collectibleValidWithoutResultsDifferentResults.query2,
      "query2"
    ).then((collectible) => {
      expect(collectible).toEqual(eval_collectibleValidWithoutResultsDifferentResults);
    });
  });

  it("query is invalid (no SELECT-statement)", () => {
    expect.assertions(1);
    return validateQuery(eval_collectibleInvalidWithoutResults_1, eval_collectibleInvalidWithoutResults_1.query2, "query2").catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": "query2 is not a SELECT-statement",
          "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
          "query2": "* FROM customers ORDER BY LastName DESC LIMIT 1",
          "queryResult1": undefined,
          "queryResult2": undefined,
          "request_type": "evaluate",
          "test_results": false,
        }
      `);
    });
  });

  it("query is invalid (DROP-statement)", () => {
    expect.assertions(1);
    return validateQuery(eval_collectibleInvalidWithoutResults_3, eval_collectibleInvalidWithoutResults_3.query1, "query1").catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": "query1 is not a SELECT-statement",
          "query1": "DROP TABLE customers",
          "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
          "queryResult1": undefined,
          "queryResult2": undefined,
          "request_type": "evaluate",
          "test_results": false,
        }
      `);
    });
  });

  it("query is invalid (continues after ';')", () => {
    expect.assertions(1);
    return validateQuery(eval_collectibleInvalidWithoutResults_2, eval_collectibleInvalidWithoutResults_2.query1, "query1").catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": "query1 is an invalid SQL-statement. The statement needs to end after the ';'",
          "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1; SELECT * FROM customers",
          "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
          "queryResult1": undefined,
          "queryResult2": undefined,
          "request_type": "evaluate",
          "test_results": false,
        }
      `);
    });
  });
});
