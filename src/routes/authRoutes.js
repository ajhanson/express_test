var express = require('express');
var passport = require('passport');
var mongodb = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/posts';
var authRouter = express.Router();

var router = function (posts) {

    authRouter.route('/login')
        .post(passport.authenticate('local', {
                failureRedirect: '/'
            }),
            function (req, res) {
                res.redirect('/auth/profile');
            });

    authRouter.route('/signup')
        .post(function (req, res) {
            console.log(req.body);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };

                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });

            });

        });


    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;

};

module.exports = router;
