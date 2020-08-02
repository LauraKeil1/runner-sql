"use strict";

// import functions
const compareQueryResults = require("../compareQueryResults.js")
  .compareQueryResults;

// import mock data
const eval_collectibleValidWithResultsSameResults = require("../__mockData__/server.mock")
  .eval_collectibleValidWithResultsSameResults;
const eval_collectibleValidWithResultsDifferentResults = require("../__mockData__/server.mock")
  .eval_collectibleValidWithResultsDifferentResults;

/**
 * Unit tests for compareQueryResults
 */

describe("Unit tests for compareQueryResults", () => {
  it("query results are identical", () => {
    expect.assertions(1);
    return compareQueryResults(
      eval_collectibleValidWithResultsSameResults,
      eval_collectibleValidWithResultsSameResults.queryResults1,
      eval_collectibleValidWithResultsSameResults.queryResults2
    ).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
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
    });
  });

  it("query results are not identical", () => {
    expect.assertions(1);
    return compareQueryResults(
      eval_collectibleValidWithResultsDifferentResults,
      eval_collectibleValidWithResultsDifferentResults.queryResult1,
      eval_collectibleValidWithResultsDifferentResults.queryResult2
    ).then((collectible) => {
      expect(collectible).toMatchInlineSnapshot(`
        Object {
          "query1": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
          "query2": "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2",
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
});
