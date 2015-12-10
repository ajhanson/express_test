var express = require('express');
var mongodb = require('mongodb').MongoClient;

var apiRouter = express.Router();
var url = 'mongodb://localhost:27017/posts'

var router = function () {

    apiRouter.route('/posts')
        .get(function (req, res) {
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('posts');
                collection.find({}).toArray(function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        })
        .post(function (req, res) {
            console.log(req.content);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('posts');
                collection.insertOne({
                    post: req.content,
                    author: req.author
                }, function (err, results) {
                    res.send(true);
                    db.close();
                });
            });
        });

    return apiRouter;

};

module.exports = router;
