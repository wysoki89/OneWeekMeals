'use strict';
const passport = require('passport');
// passport-local enables authentication via username-password after logging in
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user')
const co = require('co');

passport.use('login', new LocalStrategy({
  usernameField: 'email'
},
  co.wrap(function* (username, password, next) {
    try {
      var theUser = yield User.findOne({ email: username });
      if (!theUser) { throw 'User dont exists' }
      if (!theUser.isValidPassword(theUser, password)) { throw 'Password dont match' }
      next(null, theUser);
    } catch (e) {
      next(e, false)
    }
  })
))

passport.use('register', new LocalStrategy({
  usernameField: 'email',
},
  co.wrap(function* (username, password, next) {
    try {
      var theUser = yield User.findOne({ email: username });
      if (theUser) { throw 'User already exists' }
      else {
        // if there is no user with that email
        // create the user
        const newUser = new User();
        // set the user's local credentials
        newUser.email = username;
        newUser.setPassword(password);
        // save the user
        yield newUser.save()
        next(null, newUser);
      }
    } catch (e) {
      next(e, false)
    }
  })
))
