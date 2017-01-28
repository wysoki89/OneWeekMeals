'use strict';
const express = require('express');
const router = express.Router();
const co = require('co');
const mongoose = require('mongoose');
const Recipe = mongoose.model('recipes');
   
router
// tj/co lib resolves all promises in yield until some yield returns {done: true}
//  function * - constructor function - can be exited and later re-entered with saved context across re-entrances.
  .post('/', co.wrap(function *(req,res,next){
    try{
      var newRecipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation, 
        tags: req.body.tags 
      })
      // recipe return solved promise so actual recipe; newRecipe.save itself is a promise.
      const recipe = yield newRecipe.save();
      res.send(recipe);
    } catch(e){
      next (e)
    }
  }))

  .get('/', co.wrap(function *(req,res,next){
  try{
     const recipes = yield Recipe.find();
     res.send(recipes)
  } catch(e){
    next(e)
  }
  }))

module.exports = router;