var express = require('express');
var apiRouter = express.Router();

var router = function (dbService) {
    apiRouter.route('/posts')
        .get(dbService.getPosts)
        .post(dbService.addPost);

    return apiRouter;

};

module.exports = router;
