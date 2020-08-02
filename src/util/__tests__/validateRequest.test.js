"use strict";

// import functions
const validateRequest = require("../validateRequest.js").validateRequest;

// import mock data
const collectibleWithoutRequestType = require("../__mockData__/server.mock").collectibleWithoutRequestType;
const eval_collectibleWithoutQuery1 = require("../__mockData__/server.mock").eval_collectibleWithoutQuery1;
const val_collectibleWithoutQuery1 = require("../__mockData__/server.mock").val_collectibleWithoutQuery1;
const eval_collectibleWithoutQuery2 = require("../__mockData__/server.mock").eval_collectibleWithoutQuery2;
const eval_collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock").eval_collectibleValidWithoutResultsSameResults;
const val_collectibleValidWithoutResults = require("../__mockData__/server.mock").val_collectibleValidWithoutResults;

/**
 * Unit tests for validateRequest
 */

describe("Unit tests for validateRequest", () => {
  it("request_type is missing in the request", () => {
    expect.assertions(1);
    return validateRequest(collectibleWithoutRequestType).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": "request_type is missing in the request.",
            "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "query2": undefined,
            "queryResult1": undefined,
            "queryResult2": undefined,
            "request_type": undefined,
            "test_results": undefined,
          }
        `);
    });
  });

  it("evaluate - query1 is missing in the request", () => {
    expect.assertions(1);
    return validateRequest(eval_collectibleWithoutQuery1).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": "query1 is missing in the request.",
            "query1": undefined,
            "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "queryResult1": undefined,
            "queryResult2": undefined,
            "request_type": "evaluate",
            "test_results": undefined,
          }
        `);
    });
  });

  it("evaluate - query2 is missing in the request", () => {
    expect.assertions(1);
    return validateRequest(eval_collectibleWithoutQuery2).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": "query2 is missing in the request.",
            "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "query2": undefined,
            "queryResult1": undefined,
            "queryResult2": undefined,
            "request_type": "evaluate",
            "test_results": undefined,
          }
        `);
    });
  });

  it("evaluate - Mandatory params are included in the request", () => {
    expect.assertions(1);
    return validateRequest(eval_collectibleValidWithoutResultsSameResults).then((collectible) => {
      expect(collectible).toEqual(collectible);
    });
  });

  it("validate - query1 is missing in the request", () => {
    expect.assertions(1);
    return validateRequest(val_collectibleWithoutQuery1).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": "query1 is missing in the request.",
            "query1": undefined,
            "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "queryResult1": undefined,
            "queryResult2": undefined,
            "request_type": "validate",
            "test_results": undefined,
          }
        `);
    });
  });

  it("validate - Mandatory params are included in the request", () => {
    expect.assertions(1);
    return validateRequest(val_collectibleValidWithoutResults).then((collectible) => {
      expect(collectible).toEqual(collectible);
    });
  });
});
