var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.register = function (req, res) {
  passport.authenticate('register', function (err, newUser, info) {
    if (newUser) {
      var token;
      token = newUser.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
      console.log(`new user ${newUser.email} was added`)
    }
    else {
      // If user is not found
      console.log(info);
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.login = function (req, res) {
  passport.authenticate('login', function (err, user, info) {
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
      console.log(`user ${user.email} found, password correct`)
    } else {
      // If user is not found
      console.log(info);
      res.status(401).json(info);
    }
  })(req, res);
};

