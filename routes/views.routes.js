//requires
var express = require('express');

//router variable
var router = express.Router()

//routes
router.get("/profile", function (req, res) {
  res.render('profile');
})

//export
module.exports = router;
