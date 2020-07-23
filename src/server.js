// imports
const express = require("express");

// import functions
const handlePayload = require("./util/handlePayload").handlePayload;

// server setup
const app = express();
app.use(express.json());

// define first endpoint (returns the real endpoint for posting the payload)
app.get("/endpoints", function (req, res) {
  res.json({ payload: "/payload" });
});

// define second endpoint (handles the payload by running both queries and comparing the results)
app.post("/payload", function (req, res) {
  const query1 = req.body.payload.query1 ? req.body.payload.query1 : [];
  const query2 = req.body.payload.query2 ? req.body.payload.query2 : [];

  const collectible = {
    query1,
    query2,
    queryResult1: undefined,
    queryResult2: undefined,
    test_results: undefined,
    error: undefined,
  };

  handlePayload(collectible)
    .then((collectible) => res.json(collectible))
    .catch((collectible) => res.json(collectible));
});

app.listen(80, function () {
  console.log("SQL Runner listening on port 80!");
});
