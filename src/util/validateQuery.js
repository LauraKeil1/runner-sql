"use strict";

/**
 * Validates the queries in two steps:
 * 1. Checking whether it's a SELECT statement (and not DROP etc.)
 * 2. Checking whether statement continues after ";"
 */

const validateQuery = function (collectible, query, queryId) {
  return new Promise(function (resolve, reject) {
    if (
      !query.toLowerCase().includes("select") ||
      query.toLowerCase().includes("drop") ||
      query.toLowerCase().includes("alter") ||
      query.toLowerCase().includes("delete") ||
      query.toLowerCase().includes("insert") ||
      query.toLowerCase().includes("truncate")
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
