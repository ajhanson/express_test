'use strict';

var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var port = process.env.PORT || 8080;
var secret = process.env.secret || 'expresstest';

var dbService = require('./src/services/dbService')();
var authRouter = require('./src/routes/authRoutes')(dbService);
var apiRouter = require('./src/routes/apiRoutes')(dbService);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: secret
}));
require('./src/config/passport')(app);

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'sirius.ly?',
        loggedin: !(!req.user),
        user: req.user
    });
});

var server = app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

module.exports = server;
