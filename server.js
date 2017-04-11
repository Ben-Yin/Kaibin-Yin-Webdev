var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var session      = require('express-session');
// var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
// app.use(passport.initialize());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);

