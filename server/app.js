// dependencies
var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
var passport = require('passport');
// displaying messages to user on authentication
var flash = require('connect-flash');
// encrypting password 
var bCrypt = require('bcrypt-nodejs');
// require routes
var routes = require('./routes/index');
// models
var User = require('./models/user');

var app = express();

app.use(express.static('public'));
// body parser enables to use .body on req and res
app.use(bodyParser.urlencoded({extended: true}));
// Passport config
require('./config/passport');
// passport initialize - checks if session contains a passport.user object
app.use(passport.initialize());
//  passport session - loads an object passport.user onto req.user if a serialized userb object was found
// app.use(passport.session());
// display flash messages stored in session
// app.use(flash()); 
// routes
app.use('/', routes);
// mongoose
var db;
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.database.login}:${config.database.password}${config.database.url}/${config.database.dbname}`
, (err, database) => {
    if(err){
        return console.log(err)
    }
    db = database;
    app.listen(8000, function(){
        console.log("server is running on port 8000");
    })
})
module.exports = app;