// dependencies
var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
var passport = require('passport');

// encrypting password 

var app = express();

// mongoose
mongoose.Promise = global.Promise;
const env = process.env.NODE_ENV || 'dev';
const dblink = (env === 'test') 
    ? `mongodb://${config.database[env].url}/${config.database[env].dbname}`
    : `mongodb://${config.database[env].login}:${config.database[env].password}${config.database[env].url}/${config.database[env].dbname}`

mongoose.connect(dblink, (err, database) => {
    if(err){
        return console.log(err)
    }

    app.use(express.static('public'));
    // body parser enables to use .body on req and res
    app.use(bodyParser.urlencoded({extended: true}));
    // Passport config
    //TODO:
    /**
     * Zrobic petle po katalogu models i na kazdym itemie zrobic require
     */
    require('./models/order');
    require('./models/user');
    require('./models/recipe');  
    //END TODO
    require('./config/passport');

    // passport initialize - checks if session contains a passport.user object
    app.use(passport.initialize());
    //  passport session - loads an object passport.user onto req.user if a serialized userb object was found
    // app.use(passport.session());

    // routes
    app.use('/', require('./routes/index'));

    app.listen(3000, function(){
        app.emit('ready');
        console.log("server is running on port 3000");
    })
})

module.exports = app;