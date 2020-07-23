const collectibleValidWithoutResultsSameResults = {
  query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleInvalidWithoutResults_1 = {
  query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  query2: "* FROM person ORDER BY lastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleInvalidWithoutResults_2 = {
  query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1; SELECT * FROM person",
  query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleInvalidWithoutResults_3 = {
  query1: "DROP TABLE person",
  query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleValidWithoutResultsDifferentResults = {
  query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 2;",
  queryResult1: undefined,
  queryResult2: undefined,
  test_results: undefined,
  error: undefined,
};

const collectibleValidWithResultsSameResults = {
  query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  queryResult1: [
    {
      id: 1,
      lastName: "Weg",
      firstName: "Renate",
      address: "Nordweg 5",
      city: "Bremen",
    },
  ],
  queryResult2: [
    {
      id: 1,
      lastName: "Weg",
      firstName: "Renate",
      address: "Nordweg 5",
      city: "Bremen",
    },
  ],
};

const collectibleValidWithResultsDifferentResults = {
  query1: "SELECT * FROM person ORDER BY lastName DESC LIMIT 1",
  query2: "SELECT * FROM person ORDER BY lastName DESC LIMIT 2",
  queryResult1: [
    {
      id: 1,
      lastName: "Weg",
      firstName: "Renate",
      address: "Nordweg 5",
      city: "Bremen",
    },
  ],
  queryResult2: [
    {
      id: 1,
      lastName: "Weg",
      firstName: "Renate",
      address: "Nordweg 5",
      city: "Bremen",
    },
    {
      id: 2,
      lastName: "Weg",
      firstName: "Heiko",
      address: "Nordweg 5",
      city: "Bremen",
    },
  ],
};

exports.collectibleValidWithoutResultsSameResults = collectibleValidWithoutResultsSameResults;
exports.collectibleInvalidWithoutResults_1 = collectibleInvalidWithoutResults_1;
exports.collectibleInvalidWithoutResults_2 = collectibleInvalidWithoutResults_2;
exports.collectibleInvalidWithoutResults_3 = collectibleInvalidWithoutResults_3;
exports.collectibleValidWithoutResultsDifferentResults = collectibleValidWithoutResultsDifferentResults;
exports.collectibleValidWithResultsSameResults = collectibleValidWithResultsSameResults;
exports.collectibleValidWithResultsDifferentResults = collectibleValidWithResultsDifferentResults;
