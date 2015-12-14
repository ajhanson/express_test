var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/posts';

var service = function () {

    var me = {
        signup: function (req, res, done) {
            console.log(req.body);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.user.username,
                    password: req.body.user.password,
                    email: req.body.user.email,
                    name: req.body.user.name
                };

                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        done(res.redirect('/auth/profile'));
                    });
                });

            });

        },
        getPosts: function (req, res, done) {
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('posts');
                collection.find({}).sort({
                    date: -1
                }).limit(25).toArray(function (err, results) {
                    done(res.send(results));
                    db.close();
                });
            });
        },
        addPost: function (req, res, done) {
            console.log(req.content);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('posts');
                collection.insertOne({
                    post: req.body.content,
                    author: req.body.author,
                    date: Date.now()
                }, function (err, results) {
                    done(res.json(true));
                    db.close();
                });
            });
        }
    };

    return me;

};

module.exports = service;
