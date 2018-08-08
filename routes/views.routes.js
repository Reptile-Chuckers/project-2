//requires
var express = require('express');

//router variable
var router = express.Router()

//===========routes============================
router.get('/login', function (req, res) {
    res.render('login')
  })
  
  router.get("/", function(req, res) {
    res.render('home');
  })

  router.get("/profile", function(req, res) {
    res.render('profile');
  })

  //============================================

  module.exports = router;
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
