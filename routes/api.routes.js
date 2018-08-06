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

var testAccessToken;
//--receive public token and exchange for access token and item id--
router.post('/public-token', function (req, res) {
  client.exchangePublicToken(req.body.publicToken, function (err, resp) {
    models.Test.create({
      access_token: resp.access_token,
      item_id: resp.item_id
    })
      .then(function (dbPost) {
        res.json(dbPost);
        testAccessToken = dbPost.dataValues.access_token
      })
      .catch(
        function (err) {
          if (err) throw err;
          console.error(err);
        }
      )
  })
});

router.get('/accounts', function (request, response, next) {
  client.getAuth(testAccessToken, function (error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg
      });
    }
    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers,
    });
  });
});

//============================

module.exports = router;