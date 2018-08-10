//env
require('dotenv').config()

//requires
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var jwt = require('express-jwt');

//imports
var models = require("./models");
var viewsRoutes = require("./routes/views.routes.js");
var apiRoutes = require("./routes/api.routes.js");
var publicRoutes = require('./routes/public.routes.js')
var authRoutes = require('./routes/auth.routes.js')

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

//jwt auth
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

//public routes
app.use(publicRoutes)
app.use('/auth', authRoutes);
app.use(viewsRoutes);

//protected routes
app.use(auth);
app.use('/api', apiRoutes);
// app.use(function (err, req, res, next) {
//   if (401 == err.status) {
//     res.redirect('/login')
//   }
// });

//environment
const isDev = process.env.NODE_ENV === "development";

//sequelize sync and listen
models.sequelize.sync({ force: isDev })
  .then(function () {
    app.listen(PORT, function () {
      console.log("Server listening on port " + PORT);
    });
  })

