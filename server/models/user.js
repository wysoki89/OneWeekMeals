'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String 
}, {collection : 'users'});

userSchema.methods.setPassword = function(password){
  // Generates hash using bCrypt. hash function takes password and salt(additional input which is random data)
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

userSchema.methods.isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
}
userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  // expiry = now + 30 minutes
  expiry = expiry.getTime() + 30*60*1000;

  // create jwt 
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry / 1000), 
  }, config.jwt.secret); // secret is signature for server to verify existing tokens and sign new ones
};

module.exports = mongoose.model('users', userSchema);
