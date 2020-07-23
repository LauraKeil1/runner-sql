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
  return validateQuery(collectible, collectible.query1, "query1")
    .then((collectible) => validateQuery(collectible, collectible.query2, "query2"))
    .then((collectible) => connectToDatabase(collectible))
    .then((collectible) => getQueryResults(collectible, collectible.query1, "query1"))
    .then((collectible) => getQueryResults(collectible, collectible.query2, "query2"))
    .then((collectible) => disconnectFromDatabase(collectible))
    .then((collectible) => compareQueryResults(collectible, collectible.queryResult1, collectible.queryResult2));
};

exports.handlePayload = handlePayload;
