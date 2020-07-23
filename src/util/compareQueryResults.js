/**
 * Compares the results for query1 and query2 (taking order into consideration)
 */

const compareQueryResults = function (collectible, queryResults1, queryResults2) {
  return new Promise(function (resolve, reject) {
    if (JSON.stringify(queryResults1) == JSON.stringify(queryResults2)) {
      resolve({ ...collectible, test_results: true });
    } else {
      resolve({ ...collectible, test_results: false });
    }
  });
};

exports.compareQueryResults = compareQueryResults;
