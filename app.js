'use strict';

var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {title: 'sent from app.js', list: ['a', 'b']});
});

var server = app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

module.exports = server;
