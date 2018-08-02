//requires
var express = require('express');

//router variable
var router = express.Router()

//========== routes ==========

router.get('*', function (req, res) {
  res.render('index', { Test: 'Test' })
})

//============================

module.exports = router;