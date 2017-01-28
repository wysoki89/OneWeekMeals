'use strict';
const passport = require('passport');
// passport-local enables authentication via username-password after logging in
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

passport.use('login', new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    // search for user
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.isValidPassword(user, password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

passport.use('register', new LocalStrategy({
    usernameField: 'email',
  },
  function(username, password, done) {
      // findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({email:username},function(err, user) {
        // In case of any error return
        if (err){
          return done(err);
        }
        // already exists
        if (user) {
          return done(null, false, {
            message: 'User already exists'
          })
        } 
        else {
          // if there is no user with that email
          // create the user
          let newUser = new User();
          // set the user's local credentials
          newUser.email = username;
          newUser.setPassword(password);
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    // };
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop - in other words: make this function async like setTimeOut(function)
    // process.nextTick(findOrCreateUser);
  }));  

