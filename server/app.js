// dependencies
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo')({ session: expressSession });
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

mongoose.createConnection(dblink, (err, database) => {
    if (err) {
        return console.log(err)
    }
    app.use(express.static('public'));
    // body parser enables to use .body on req and res
    app.use(bodyParser.urlencoded({ extended: true }));
    const dir = requireDir('./models');
    require('./config/passport'); 
    // Passport config
    // passport initialize - checks if session contains a passport.user object
    app.use(passport.initialize());
    //  passport session - loads an object passport.user onto req.user if a serialized userb object was found
    // app.use(passport.session());

    // routes
    app.use('/', require('./routes/index'));
    app.emit('ready');
})

module.exports = app;