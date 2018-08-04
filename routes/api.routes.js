//env
require('dotenv').config()


//packages
var express = require('express');
var plaid = require('plaid');

//IMPORTS
var models = require("../models");

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
  client.exchangePublicToken(req.body.publicToken, function (err, resp) {

    if (err) console.error(err);
    console.log(resp)
    models.Test.create({
      access_token: resp.access_token,
      item_id: resp.item_id
    })
      .then(function (dbPost) {
        res.json(dbPost);
      }).catch(
        function (err) {
          if (err) throw err;
          console.error(err);
        }
      )
  })
})

//============================

module.exports = router;