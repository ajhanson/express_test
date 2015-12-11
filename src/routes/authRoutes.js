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

    // Express middleware function for logging out a user. The action is successful
    // if the user is no longer authenticated.
    authRouter.route('/logout')
        .get(function (req, res, next) {
            // Get rid of the session token. Then call `logout`; it does no harm.
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
                    password: req.body.user.password
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
