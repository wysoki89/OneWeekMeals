'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/user');

router
    .post('/', function (req, res, next) {
        try {
            passport.authenticate('register', function (err, newUser, info) {
                if (newUser) {
                    let token;
                    token = newUser.generateJwt();
                    res.status(200);
                    res.json({
                        "token": token
                    });
                    console.log(`new user ${newUser.email} was added`)
                }
            })(req, res);
        } catch (e) {
            next(e)
        }
    });
module.exports = router;
