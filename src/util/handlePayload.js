"use strict";

// import functions
const connectToDatabase = require("./connectToDatabase").connectToDatabase;
const validateQuery = require("./validateQuery").validateQuery;
const getQueryResults = require("./getQueryResults").getQueryResults;
const disconnectFromDatabase = require("./disconnectFromDatabase").disconnectFromDatabase;
const compareQueryResults = require("./compareQueryResults").compareQueryResults;

/**
 * Handles the incoming request and sends response
 */

const handlePayload = function (collectible) {
  // in case of validation of the teacher's query: validate and run the query to check if an error occurs
  if (collectible.request_type == "validate") {
    return validateQuery(collectible, collectible.query1, "query1")
      .then((collectible) => connectToDatabase(collectible))
      .then(({ collectible, db }) => getQueryResults(collectible, collectible.query1, "query1", db))
      .then(({ collectible, db }) => disconnectFromDatabase(collectible, db));
  }
  // in case of evaluation of the student's soltuions: validate and run both queries and compare results
  else if (collectible.request_type == "evaluate") {
    return validateQuery(collectible, collectible.query1, "query1")
      .then((collectible) => validateQuery(collectible, collectible.query2, "query2"))
      .then((collectible) => connectToDatabase(collectible))
      .then(({ collectible, db }) => getQueryResults(collectible, collectible.query1, "query1", db))
      .then(({ collectible, db }) => getQueryResults(collectible, collectible.query2, "query2", db))
      .then(({ collectible, db }) => disconnectFromDatabase(collectible, db))
      .then((collectible) => compareQueryResults(collectible, collectible.queryResult1, collectible.queryResult2));
  }
};

exports.handlePayload = handlePayload;
