/**
 * Gets the results for query1 and query2
 */

const getQueryResults = function (collectible, query, queryId, db) {
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject({ ...collectible, test_results: false, error: err });
      }
      if (queryId == "query1") {
        resolve({ collectible: { ...collectible, queryResult1: rows }, db });
      }
      if (queryId == "query2") {
        resolve({ collectible: { ...collectible, queryResult2: rows }, db });
      }
    });
  });
};

exports.getQueryResults = getQueryResults;
