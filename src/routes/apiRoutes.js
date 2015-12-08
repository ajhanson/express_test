var express = require('express');

var apiRouter = express.Router();

var router = function (posts) {

    apiRouter.route('/posts')
        .get(function (req, res) {
            res.json({
                posts: posts
            });
        });

    return apiRouter;

};

module.exports = router;