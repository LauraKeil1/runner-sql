"use strict";

/**
 * Validates the request by checking if query1 and query2 are available
 * TODO: Might need some more checks (depending on how the request should look like)
 */

const validateRequest = function (collectible) {
  return new Promise(function (resolve, reject) {
    if (collectible.query1 == undefined) {
      reject({ ...collectible, error: "query1 is missing in the request." });
    } else if (collectible.query2 == undefined) {
      reject({ ...collectible, error: "query2 is missing in the request." });
    } else {
      resolve(collectible);
    }
  });
};

exports.validateRequest = validateRequest;
