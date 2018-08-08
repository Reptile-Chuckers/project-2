//requires
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var models = require("./models");


//imports
var viewsRoutes = require("./routes/views.routes.js");
var apiRoutes = require("./routes/api.routes.js");
var viewsRoutes = require("./routes/views.routes.js");

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
app.use(viewsRoutes);
app.use(viewsRoutes);
app.use('/api', apiRoutes);



//sequelize sync and listen
models.sequelize.sync({ force: false })
  .then(function () {
    app.listen(PORT, function () {
      console.log("Server listening on port " + PORT);
    });
  })

