'use strict';

var request = require('supertest');

describe('application', function () {
    var server;
    
    beforeEach(function () {
       server = require('../app');
    });
    
    afterEach(function () {
        server.close();
    });

    it('/ returns 200', function (done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('other returns 404', function (done) {
        request(server)
            .get('/about')
            .expect(404, done);
    });

    it('/jade returns 200', function (done) {
        request(server)
            .get('/jade')
            .expect(200, done);
    });
});