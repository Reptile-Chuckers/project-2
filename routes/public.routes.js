//requires
var express = require('express');

//router variable
var router = express.Router()

//routes
router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/register', function (req, res) {
  res.render('register')
})

router.get("/", function (req, res) {
  res.render('home');
})

//export
module.exports = router;
