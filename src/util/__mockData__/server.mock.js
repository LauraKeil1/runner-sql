"use strict";

const collectibleWithoutRequestType = {
  request_type: undefined,
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: undefined,
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleWithoutQuery1 = {
  request_type: "evaluate",
  query1: undefined,
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const val_collectibleWithoutQuery1 = {
  request_type: "validate",
  query1: undefined,
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleWithoutQuery2 = {
  request_type: "evaluate",
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: undefined,
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleValidWithoutResultsSameResults = {
  request_type: "evaluate",
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const val_collectibleValidWithoutResults = {
  request_type: "validate",
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const val_collectibleValidSQLError = {
  request_type: "validate",
  query1: "SELECT * FROM person ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const val_collectibleInvalid = {
  request_type: "validate",
  query1: " * FROM person ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleValidSQLError = {
  request_type: "evaluate",
  query1: "SELECT * FROM person ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleInvalidWithoutResults_1 = {
  request_type: "evaluate",
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "* FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleInvalidWithoutResults_2 = {
  request_type: "evaluate",
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1; SELECT * FROM customers",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleInvalidWithoutResults_3 = {
  request_type: "evaluate",
  query1: "DROP TABLE customers",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleValidWithoutResultsDifferentResults = {
  request_type: "evaluate",
  query1: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 1",
  query2: "SELECT * FROM customers ORDER BY LastName DESC LIMIT 2;",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const eval_collectibleValidWithResultsSameResults = {
  request_type: "evaluate",
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

const eval_collectibleValidWithResultsDifferentResults = {
  request_type: "evaluate",
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

exports.collectibleWithoutRequestType = collectibleWithoutRequestType;
exports.eval_collectibleWithoutQuery1 = eval_collectibleWithoutQuery1;
exports.val_collectibleWithoutQuery1 = val_collectibleWithoutQuery1;
exports.eval_collectibleWithoutQuery2 = eval_collectibleWithoutQuery2;
exports.eval_collectibleValidWithoutResultsSameResults = eval_collectibleValidWithoutResultsSameResults;
exports.val_collectibleValidWithoutResults = val_collectibleValidWithoutResults;
exports.eval_collectibleInvalidWithoutResults_1 = eval_collectibleInvalidWithoutResults_1;
exports.eval_collectibleInvalidWithoutResults_2 = eval_collectibleInvalidWithoutResults_2;
exports.eval_collectibleInvalidWithoutResults_3 = eval_collectibleInvalidWithoutResults_3;
exports.eval_collectibleValidWithoutResultsDifferentResults = eval_collectibleValidWithoutResultsDifferentResults;
exports.eval_collectibleValidWithResultsSameResults = eval_collectibleValidWithResultsSameResults;
exports.eval_collectibleValidWithResultsDifferentResults = eval_collectibleValidWithResultsDifferentResults;
exports.val_collectibleValidSQLError = val_collectibleValidSQLError;
exports.val_collectibleInvalid = val_collectibleInvalid;
exports.eval_collectibleValidSQLError = eval_collectibleValidSQLError;
