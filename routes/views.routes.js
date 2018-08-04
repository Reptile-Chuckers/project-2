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