//env
require('dotenv').config()


//packages
var express = require('express');

//IMPORTS
var models = require("../models");

//router variable
var router = express.Router()

//========== routes ==========

//--index page--
router.get('/', function (req, res) {
  res.render('index', { Test: 'Test' })
})

//============================

module.exports = router;