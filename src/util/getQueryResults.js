"use strict";

/**
 * Gets the results for query1 and query2
 */

const getQueryResults = function (collectible, query, queryId, db) {
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject({ ...collectible, test_results: false, error: {queryId: queryId, errno: err.errno, code: err.code, message: err.message}});
      }
      if (collectible.request_type == "evaluate") {
        if (queryId == "query1") {
          resolve({ collectible: { ...collectible, queryResult1: rows }, db });
        }
        if (queryId == "query2") {
          resolve({ collectible: { ...collectible, queryResult2: rows }, db });
        }
      } else if (collectible.request_type == "validate") {
        resolve({ collectible: { ...collectible, queryResult1: rows, test_results: true }, db });
      }
    });
  });
};

exports.getQueryResults = getQueryResults;
