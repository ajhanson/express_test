'use strict';

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.set('views', './src/views');

app.set('view engine', 'ejs');

var posts = [
    {
        Title: 'post 1',
        Author: 'author 1',
        Desc: 'description 1'
    },
    {
        Title: 'post 2',
        Author: 'author 2',
        Desc: 'description 2'
    }];

var apiRouter = require('./src/routes/apiRoutes')(posts);

app.use('/api', apiRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'sent from app.js',
        list: ['a', 'b']
    });
});

var server = app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

module.exports = server;