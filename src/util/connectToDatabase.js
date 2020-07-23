"use strict";

// imports
const sqlite3 = require("sqlite3");

/**
 * Connects to the database
 */

const connectToDatabase = function (collectible) {
  return new Promise(function (resolve, reject) {
    const db = new sqlite3.Database("src/database.db", sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        reject({ ...collectible, test_results: false, error: err });
      }
      resolve({ collectible, db });
    });
  });
};

exports.connectToDatabase = connectToDatabase;
