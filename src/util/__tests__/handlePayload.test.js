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

it("Request is handled correctly (without error) and query results are identical", () => {
  expect.assertions(1);
  return handlePayload(collectibleValidWithoutResultsSameResults).then((collectible) => {
    expect(JSON.stringify(collectible)).toEqual(
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

it("Request is handled correctly (without error) and query results are not identical", () => {
  expect.assertions(1);
  return handlePayload(collectibleValidWithoutResultsDifferentResults).then((collectible) => {
    expect(JSON.stringify(collectible)).toEqual(
      JSON.stringify({
        query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
        query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 2;",
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

it("Request is handled correctly (with error)", () => {
  expect.assertions(1);
  return handlePayload(collectibleInvalidWithoutResults_1).catch((collectible) => {
    expect(JSON.stringify(collectible)).toEqual(
      JSON.stringify({
        query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
        query2: "* FROM person ORDER BY lastName DESC LIMIT 1",
        test_results: false,
        error: "query2 is not a SELECT-statement",
      })
    );
  });
});
