'use strict';

// imports
const express = require('express');

// import functions
const handlePayload = require('./util/handlePayload').handlePayload;
const validateRequest = require('./util/validateRequest').validateRequest;

// server setup
const app = express();
app.use(express.json());

// define first endpoint (returns the real endpoint for posting the payload)
app.get('/endpoints', function (req, res) {
  res.json({ payload: '/payload' });
});

// define second endpoint (handles the payload by running both queries and comparing the results)
app.post('/payload', function (req, res) {
  const request_type = req.body.payload.request_type
    ? req.body.payload.request_type
    : undefined;
  const query1 = req.body.payload.query1 ? req.body.payload.query1 : undefined;
  const query2 = req.body.payload.query2 ? req.body.payload.query2 : undefined;

  const collectible = {
    request_type,
    query1,
    query2,
    queryResult1: undefined,
    queryResult2: undefined,
    test_results: undefined,
    error: undefined,
  };
  validateRequest(collectible)
    .then((collectible) => handlePayload(collectible))
    .then((collectible) => res.json(collectible))
    .catch((collectible) => res.json(collectible));
});

const port = process.env.PORT || 80;

app.listen(port, function () {
  console.log(`SQL Runner listening on port ${port}!`);
});
