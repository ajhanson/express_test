'use strict';

var express = require('express');

var app = express();

var port = 5000;

app.get('/', function (req, res) {
    res.send('eriamjh');
});

app.get('/test', function (req, res) {
    res.send('testing');
});


app.listen(5000, function (err) {
    console.log('running server on port ' + port);
});
