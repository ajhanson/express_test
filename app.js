'use strict';

var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'jade');

//app.use(express.static('src/views'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/src/views'
    });
});

app.get('/jade', function (req, res) {
    res.render('index');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
