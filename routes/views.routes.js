<<<<<<< HEAD
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

router.get('/home', function (req, res) {
  res.render('home', { Test: 'Test' })
})

router.get('/login', function (req, res) {
  res.render('login', { Test: 'Test' })
})

router.get('/profile', function (req, res) {
  res.render('profile', { Test: 'Test' })
})

//============================

=======
//requires
var express = require('express');

//router variable
var router = express.Router()

//routes
router.get("/profile", function (req, res) {
  res.render('profile');
})

//export
>>>>>>> ea3aae77071e24f9a67bb2ed0b88119e11ec785e
module.exports = router;
