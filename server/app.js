// dependencies
const express = require('express');
const bodyParser = require('body-parser')
const config = require('./config');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const requireDir = require('require-dir');
const app = express();
// mongoose
mongoose.Promise = global.Promise;
const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;
const dblink = (env === 'test')
    ? `mongodb://${config.database[env].url}/${config.database[env].dbname}`
    : `mongodb://${config.database[env].login}:${config.database[env].password}${config.database[env].url}/${config.database[env].dbname}`

var dir = requireDir('./models')

mongoose
    .connect(dblink)
    .then(() => {
        app.use(express.static('public'));
        // body parser enables to use .body on req and res
        app.use(bodyParser.urlencoded({ extended: true }));
        // Passport config
        require('./config/passport');
        // passport initialize - checks if session contains a passport.user object
        app.use(passport.initialize());
        // routes
        app.use('/', require('./routes'));
        app.emit('ready');
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

module.exports = app;