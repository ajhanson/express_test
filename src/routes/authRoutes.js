var express = require('express');
var passport = require('passport');
var authRouter = express.Router();

var router = function (dbService) {

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
        .post(dbService.signup);

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
