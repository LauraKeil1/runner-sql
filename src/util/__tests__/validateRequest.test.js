"use strict";

// import functions
const validateRequest = require("../validateRequest.js").validateRequest;

// import mock data
const collectibleWithoutQuery1 = require("../__mockData__/server.mock").collectibleWithoutQuery1;
const collectibleWithoutQuery2 = require("../__mockData__/server.mock").collectibleWithoutQuery2;
const collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock").collectibleValidWithoutResultsSameResults;

/**
 * Unit tests for validateRequest
 */

describe("Unit tests for validateRequest", () => {
  it("query1 is missing in the request", () => {
    expect.assertions(1);
    return validateRequest(collectibleWithoutQuery1).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": "query1 is missing in the request.",
          "query1": undefined,
          "query2": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          "queryResult1": undefined,
          "queryResult2": undefined,
          "test_results": undefined,
        }
      `);
    });
  });

  it("query2 is missing in the request", () => {
    expect.assertions(1);
    return validateRequest(collectibleWithoutQuery2).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": "query2 is missing in the request.",
          "query1": "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
          "query2": undefined,
          "queryResult1": undefined,
          "queryResult2": undefined,
          "test_results": undefined,
        }
      `);
    });
  });

  it("query1 and query2 are included in the request", () => {
    expect.assertions(1);
    return validateRequest(collectibleValidWithoutResultsSameResults).then((collectible) => {
      expect(collectible).toEqual(collectible);
    });
  });
});
