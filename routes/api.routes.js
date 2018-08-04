//env
require('dotenv').config()

//packages
var express = require('express');
var plaid = require('plaid');

//router variable
var router = express.Router()

//plaid client
var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments[process.env.PLAID_ENV]
);

//========== routes ==========

router.get('*', function (req, res) {
  res.render('index', { Test: 'Test' })
})

router.post('/api/public-token', function (req, res) {
  process.env.PUBLIC_TOKEN = req.body.publicToken;
  client.exchangePublicToken(publicToken, function (err, res) {
    if (err) console.error(err);
    process.env.ACCESS_TOKEN = res.access_token;
    process.env.ITEM_ID = res.item_id;
  })
})

//============================

module.exports = router;