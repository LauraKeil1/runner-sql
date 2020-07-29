"use strict";

const collectibleWithoutQuery1 = {
  query1: undefined,
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleWithoutQuery2 = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: undefined,
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleValidWithoutResultsSameResults = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleInvalidWithoutResults_1 = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "* FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleInvalidWithoutResults_2 = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1; SELECT * FROM customers",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleInvalidWithoutResults_3 = {
  query1: "DROP TABLE customers",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleValidWithoutResultsDifferentResults = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2;",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleValidWithResultsSameResults = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: [
    {
      CustomerId: 37,
      FirstName: "Fynn",
      LastName: "Zimmermann",
      Company: null,
      Address: "Berger Straße 10",
      City: "Frankfurt",
      State: null,
      Country: "Germany",
      PostalCode: "60316",
      Phone: "+49 069 40598889",
      Fax: null,
      Email: "fzimmermann@yahoo.de",
      SupportRepId: 3,
    },
  ],
  queryResult2: [
    {
      CustomerId: 37,
      FirstName: "Fynn",
      LastName: "Zimmermann",
      Company: null,
      Address: "Berger Straße 10",
      City: "Frankfurt",
      State: null,
      Country: "Germany",
      PostalCode: "60316",
      Phone: "+49 069 40598889",
      Fax: null,
      Email: "fzimmermann@yahoo.de",
      SupportRepId: 3,
    },
  ],
};

const collectibleValidWithResultsDifferentResults = {
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2",
  queryResult1: [
    {
      CustomerId: 37,
      FirstName: "Fynn",
      LastName: "Zimmermann",
      Company: null,
      Address: "Berger Straße 10",
      City: "Frankfurt",
      State: null,
      Country: "Germany",
      PostalCode: "60316",
      Phone: "+49 069 40598889",
      Fax: null,
      Email: "fzimmermann@yahoo.de",
      SupportRepId: 3,
    },
  ],
  queryResult2: [
    {
      CustomerId: 37,
      FirstName: "Fynn",
      LastName: "Zimmermann",
      Company: null,
      Address: "Berger Straße 10",
      City: "Frankfurt",
      State: null,
      Country: "Germany",
      PostalCode: "60316",
      Phone: "+49 069 40598889",
      Fax: null,
      Email: "fzimmermann@yahoo.de",
      SupportRepId: 3,
    },
    {
      CustomerId: 49,
      FirstName: "Stanisław",
      LastName: "Wójcik",
      Company: null,
      Address: "Ordynacka 10",
      City: "Warsaw",
      State: null,
      Country: "Poland",
      PostalCode: "00-358",
      Phone: "+48 22 828 37 39",
      Fax: null,
      Email: "stanisław.wójcik@wp.pl",
      SupportRepId: 4,
    },
  ],
};

exports.collectibleWithoutQuery1 = collectibleWithoutQuery1;
exports.collectibleWithoutQuery2 = collectibleWithoutQuery2;
exports.collectibleValidWithoutResultsSameResults = collectibleValidWithoutResultsSameResults;
exports.collectibleInvalidWithoutResults_1 = collectibleInvalidWithoutResults_1;
exports.collectibleInvalidWithoutResults_2 = collectibleInvalidWithoutResults_2;
exports.collectibleInvalidWithoutResults_3 = collectibleInvalidWithoutResults_3;
exports.collectibleValidWithoutResultsDifferentResults = collectibleValidWithoutResultsDifferentResults;
exports.collectibleValidWithResultsSameResults = collectibleValidWithResultsSameResults;
exports.collectibleValidWithResultsDifferentResults = collectibleValidWithResultsDifferentResults;
