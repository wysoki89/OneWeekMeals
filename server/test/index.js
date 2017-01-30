const chai = require('chai');
const app = require(`../app`);
const http = require('http');
const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
 
process.env.NODE_ENV = 'test';

global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;
global.api    = supertest(app);

before((done) => {
    app.on('ready', () => {
        const removeModels = Object
            .keys(mongoose.models)
            .map((key) => Promise.resolve(() => mongoose.models[key].remove({})));

        Promise
            // return array of promises and runs function remove on them - clears database 
            .all(removeModels)
            .then(() => done(), done);
    });
    app.on('error', done);
});
 