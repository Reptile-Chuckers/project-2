//env
require('dotenv').config()

//packages
var express = require('express');
var plaid = require('plaid');
var moment = require('moment');

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

//token
var testAccessToken;

//routes
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

router.get('/transactions', function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(testAccessToken, '2017-01-01', '2017-02-15', {
    count: 250,
    offset: 0,
  }, function (error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({ error: error });
    }
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
    response.json(transactionsResponse);
  });
});

// router.get('/transaction/get', function(req, response, next){
//   // Retrieve transactions from Jan 1 until Feb 15
// // NOTE: This endpoint may return a `PRODUCT_NOT_READY` error if transactions
// // are not yet processed for the Item.
// client.getTransactions(testAccessToken, '2017-01-01', '2017-02-15', {
//   count: 250,
//   offset: 0,
// }, function(err, result){
//   // Handle err
//   var transactions = result.transactions;
// });
// })

//export
module.exports = router;