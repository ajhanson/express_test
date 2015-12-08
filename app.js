'use strict';

var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.set('views', './src/views');

//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/src/views'
    });
});

app.get('/jade', function (req, res) {
    res.render('index', {title: 'sent from app.js', list: ['a', 'b']});
});

var server = app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

module.exports = server;
