var express = require('express');

var apiRouter = express.Router();

var router = function () {

    apiRouter.route('/posts')
        .get(function (req, res) {
                res.json({
                        posts: [{
                            title: 'title 1',
                            author: 'author 1'
                        }]
                });
        });

return apiRouter;

};

module.exports = router;