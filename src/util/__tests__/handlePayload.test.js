"use strict";

// import functions
const handlePayload = require("../handlePayload").handlePayload;

// import mock data
const eval_collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock")
  .eval_collectibleValidWithoutResultsSameResults;
const eval_collectibleInvalidWithoutResults_1 = require("../__mockData__/server.mock")
  .eval_collectibleInvalidWithoutResults_1;
const eval_collectibleValidWithoutResultsDifferentResults = require("../__mockData__/server.mock")
  .eval_collectibleValidWithoutResultsDifferentResults;

const eval_collectibleValidSQLError = require("../__mockData__/server.mock")
  .eval_collectibleValidSQLError;

const val_collectibleValidWithoutResults = require("../__mockData__/server.mock")
  .val_collectibleValidWithoutResults;
const val_collectibleValidSQLError = require("../__mockData__/server.mock")
  .val_collectibleValidSQLError;
const val_collectibleInvalid = require("../__mockData__/server.mock")
  .val_collectibleInvalid;

/**
 * Unit tests for handlePayload
 * Also covers: connectToDatabase, getQueryResults and disconnectFromDatabase
 */

describe("Unit tests for handlePayload - validate", () => {
  it("validate - without error", () => {
    expect.assertions(1);
    return handlePayload(val_collectibleValidWithoutResults).then(
      (collectible) => {
        expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": undefined,
            "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "queryResult1": Array [
              Object {
                "Address": "Berger Straße 10",
                "City": "Frankfurt",
                "Company": null,
                "Country": "Germany",
                "CustomerId": 37,
                "Email": "fzimmermann@yahoo.de",
                "Fax": null,
                "FirstName": "Fynn",
                "LastName": "Zimmermann",
                "Phone": "+49 069 40598889",
                "PostalCode": "60316",
                "State": null,
                "SupportRepId": 3,
              },
            ],
            "queryResult2": undefined,
            "request_type": "validate",
            "test_results": true,
          }
        `);
      }
    );
  });

  it("validate - with validateQuery error)", () => {
    expect.assertions(1);
    return handlePayload(val_collectibleInvalid).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": Object {
            "message": "Query is not a SELECT-statement",
            "queryId": "query1",
          },
          "query1": " * FROM person ORDER BY LastName DESC LIMIT 1",
          "queryResult1": undefined,
          "queryResult2": undefined,
          "request_type": "validate",
          "test_results": false,
        }
      `);
    });
  });

  it("validate - with SQLite error", () => {
    expect.assertions(1);
    return handlePayload(val_collectibleValidSQLError).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": Object {
            "code": "SQLITE_ERROR",
            "errno": 1,
            "message": "SQLITE_ERROR: no such table: person",
            "queryId": "query1",
          },
          "query1": "SELECT * FROM person ORDER BY LastName DESC LIMIT 1",
          "queryResult1": undefined,
          "queryResult2": undefined,
          "request_type": "validate",
          "test_results": false,
        }
      `);
    });
  });
});

describe("Unit tests for handlePayload - evaluate", () => {
  it("evaluate - without error and same query results", () => {
    expect.assertions(1);
    return handlePayload(eval_collectibleValidWithoutResultsSameResults).then(
      (collectible) => {
        expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": undefined,
            "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "queryResult1": Array [
              Object {
                "Address": "Berger Straße 10",
                "City": "Frankfurt",
                "Company": null,
                "Country": "Germany",
                "CustomerId": 37,
                "Email": "fzimmermann@yahoo.de",
                "Fax": null,
                "FirstName": "Fynn",
                "LastName": "Zimmermann",
                "Phone": "+49 069 40598889",
                "PostalCode": "60316",
                "State": null,
                "SupportRepId": 3,
              },
            ],
            "queryResult2": Array [
              Object {
                "Address": "Berger Straße 10",
                "City": "Frankfurt",
                "Company": null,
                "Country": "Germany",
                "CustomerId": 37,
                "Email": "fzimmermann@yahoo.de",
                "Fax": null,
                "FirstName": "Fynn",
                "LastName": "Zimmermann",
                "Phone": "+49 069 40598889",
                "PostalCode": "60316",
                "State": null,
                "SupportRepId": 3,
              },
            ],
            "request_type": "evaluate",
            "test_results": true,
          }
        `);
      }
    );
  });

  it("evaluate - without error and different query results", () => {
    expect.assertions(1);
    return handlePayload(
      eval_collectibleValidWithoutResultsDifferentResults
    ).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": undefined,
          "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
          "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2;",
          "queryResult1": Array [
            Object {
              "Address": "Berger Straße 10",
              "City": "Frankfurt",
              "Company": null,
              "Country": "Germany",
              "CustomerId": 37,
              "Email": "fzimmermann@yahoo.de",
              "Fax": null,
              "FirstName": "Fynn",
              "LastName": "Zimmermann",
              "Phone": "+49 069 40598889",
              "PostalCode": "60316",
              "State": null,
              "SupportRepId": 3,
            },
          ],
          "queryResult2": Array [
            Object {
              "Address": "Berger Straße 10",
              "City": "Frankfurt",
              "Company": null,
              "Country": "Germany",
              "CustomerId": 37,
              "Email": "fzimmermann@yahoo.de",
              "Fax": null,
              "FirstName": "Fynn",
              "LastName": "Zimmermann",
              "Phone": "+49 069 40598889",
              "PostalCode": "60316",
              "State": null,
              "SupportRepId": 3,
            },
            Object {
              "Address": "Ordynacka 10",
              "City": "Warsaw",
              "Company": null,
              "Country": "Poland",
              "CustomerId": 49,
              "Email": "stanisław.wójcik@wp.pl",
              "Fax": null,
              "FirstName": "Stanisław",
              "LastName": "Wójcik",
              "Phone": "+48 22 828 37 39",
              "PostalCode": "00-358",
              "State": null,
              "SupportRepId": 4,
            },
          ],
          "request_type": "evaluate",
          "test_results": false,
        }
      `);
    });
  });

  it("evaluate - with validateQuery error", () => {
    expect.assertions(1);
    return handlePayload(eval_collectibleInvalidWithoutResults_1).catch(
      (collectible) => {
        expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": Object {
              "message": "Query is not a SELECT-statement",
              "queryId": "query2",
            },
            "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "query2": "* FROM customers ORDER BY LastName DESC LIMIT 1",
            "queryResult1": undefined,
            "queryResult2": undefined,
            "request_type": "evaluate",
            "test_results": false,
          }
        `);
      }
    );
  });

  it("evaluate - with SQLite error", () => {
    expect.assertions(1);
    return handlePayload(eval_collectibleValidSQLError).catch((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "error": Object {
            "code": "SQLITE_ERROR",
            "errno": 1,
            "message": "SQLITE_ERROR: no such table: person",
            "queryId": "query1",
          },
          "query1": "SELECT * FROM person ORDER BY LastName DESC LIMIT 1",
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
