"use strict";

/**
 * Validates the request by checking if all mandatory params are available
 */

const validateRequest = function (collectible) {
  return new Promise(function (resolve, reject) {
    if (collectible.request_type == undefined) {
      reject({ ...collectible, error: "request_type is missing in the request." });
    } else {
      // in case of "evaluate", query1 and query2 are mandatory in the request
      if (collectible.request_type == "evaluate") {
        if (collectible.query1 == undefined) {
          reject({ ...collectible, error: "query1 is missing in the request." });
        } else if (collectible.query2 == undefined) {
          reject({ ...collectible, error: "query2 is missing in the request." });
        } else {
          resolve(collectible);
        }
        // in case of "validate", only query1 is mandatory in the request
      } else if (collectible.request_type == "validate") {
        if (collectible.query1 == undefined) {
          reject({ ...collectible, error: "query1 is missing in the request." });
        } else {
          resolve(collectible);
        }
      }
    }
  });
};

exports.validateRequest = validateRequest;
