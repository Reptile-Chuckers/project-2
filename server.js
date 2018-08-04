//requires
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");


//imports
var apiRoutes = require("./routes/api.routes.js");

//app variable
var app = express();

//port
var PORT = process.env.PORT || 3000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//static content
app.use(express.static('public'));

//view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//controller
app.use(apiRoutes);

//listen on port
app.listen(PORT, function () {
  console.log("Server listening on port " + PORT);
});