"use strict";

// import functions
const handlePayload = require("../handlePayload").handlePayload;

// import mock data
const collectibleValidWithoutResultsSameResults = require("../__mockData__/server.mock")
  .collectibleValidWithoutResultsSameResults;
const collectibleInvalidWithoutResults_1 = require("../__mockData__/server.mock")
  .collectibleInvalidWithoutResults_1;
const collectibleValidWithoutResultsDifferentResults = require("../__mockData__/server.mock")
  .collectibleValidWithoutResultsDifferentResults;

/**
 * Unit tests for handlePayload
 * Also covers: connectToDatabase, getQueryResults and disconnectFromDatabase
 */

describe("Unit tests for handlePayload", () => {
  it("Request is handled correctly (without error) and query results are identical", () => {
    expect.assertions(1);
    return handlePayload(collectibleValidWithoutResultsSameResults).then(
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
            "test_results": true,
          }
        `);
      }
    );
  });

  it("Request is handled correctly (without error) and query results are not identical", () => {
    expect.assertions(1);
    return handlePayload(collectibleValidWithoutResultsDifferentResults).then(
      (collectible) => {
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
            "test_results": false,
          }
        `);
      }
    );
  });

  it("Request is handled correctly (with error)", () => {
    expect.assertions(1);
    return handlePayload(collectibleInvalidWithoutResults_1).catch(
      (collectible) => {
        expect(collectible).toMatchInlineSnapshot(`
          Object {
            "error": "query2 is not a SELECT-statement",
            "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
            "query2": "* FROM customers ORDER BY LastName DESC LIMIT 1",
            "queryResult1": undefined,
            "queryResult2": undefined,
            "test_results": false,
          }
        `);
      }
    );
  });
});
