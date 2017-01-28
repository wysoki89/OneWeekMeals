'use strict';

const chai = require('chai');
const app = require(`../app`);
const http = require('http');
const mongoose = require('mongoose');
const _ = require('lodash');

var supertest = require('supertest');

var server;
process.env.NODE_ENV = 'test';
process.env.PORT = 3100;

global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;

before((done) => {
    app.set('port', 3100);

    app.on('ready', () => done());
    global.api = supertest(app);

    server = app.listen(3100, function (err) {
        if (err) throw err;
    })
});

before((done) => {
    Promise
        // return array of promises and runs function remove on them - clears database 
        .all(_.map(mongoose.models, Model => Model.remove()))
        .then(() => done(), done);
});

after((done) => {
    server.close(() => done());
});
 