'use strict';

const chai = require('chai');
const app = require(`../app`);
const http = require('http');
const mongoose = require('mongoose');
const _ = require('lodash');

var server;

process.env.NODE_ENV = 'testing';

global.expect = chai.expect;
global.assert = chai.assert;

before((done) => {
    app.set('port', 3100);
    server = http.createServer(app);
    server.listen(3100);
    server.on('listening', () => {
        app.on('ready', () => done())
    });
});

before((done) => {
    Promise
        .all(_.map(mongoose.models, Model => Model.remove()))
        .then(() => done(), done);
});

after((done) => {
    server.close(done);
});

describe('dummy test', () => {
    it('test test', () => {
        assert.equal(true, true, 'is Ok');
    })
});
