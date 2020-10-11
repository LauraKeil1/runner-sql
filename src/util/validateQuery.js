"use strict";

/**
 * Validates the queries in two steps:
 * 1. Checking whether it's a SELECT statement (and not DROP etc.)
 * 2. Checking whether statement continues after ";"
 */

const validateQuery = function (collectible, query, queryId) {
  return new Promise(function (resolve, reject) {
    if (
      !query.includes("SELECT") ||
      query.includes("DROP") ||
      query.includes("ALTER") ||
      query.includes("DELETE") ||
      query.includes("INSERT")
      // TODO: add more words that are "forbidden"
    ) {
      reject({
        ...collectible,
        test_results: false,
        error: 
        {queryId: queryId,
         message: "Query is not a SELECT-statement",
        }
      });
    } else {
      if (query.indexOf(";") >= 0 && query.length - query.indexOf(";") > 1) {
        reject({
          ...collectible,
          test_results: false,
          error: {
            queryId: queryId,
            message: "Query is an invalid SQL-statement. The statement needs to end after the ';'",
          }
        });
      } else {
        resolve(collectible);
      }
    }
  });
};

exports.validateQuery = validateQuery;
