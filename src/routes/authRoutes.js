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
                res.redirect('/');
            });

    authRouter.route('/logout')
        .post(function (req, res, next) {
            req.logout();
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        });

    authRouter.route('/signup')
        .post(function (req, res) {
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
                        res.redirect('/auth/profile');
                    });
                });

            });

        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                next();
            }
        })
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;

};

module.exports = router;
