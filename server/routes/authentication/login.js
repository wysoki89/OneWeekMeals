'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user');

router
  .post('/', function (req, res, next) {
    try { 
      passport.authenticate('login', function (err, user, info) {
        let token;
        // If a user is found
        if (user) {
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token": token
          });
          console.log(`user ${user.email} found, password correct`)
        }
      })(req, res);
    }
    catch (e) {
      next(e)
    }
  });
module.exports = router;
