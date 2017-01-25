var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = mongoose.model('recipes');

router
  .post('/', function (req, res) {
    var newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      preparation: req.body.preparation, 
      tags: req.body.tags 
    })


    // console.log(req.body, req.query)
    // save the task
    newRecipe.save(function (err, doc) {
      if (err) {
        return res.send("something is wrong")
      }
      res.send(doc);
    });
  })

  .get('/', function (req, res) {
    Recipe.find({}, function (err, recipes) {
      if (!err) {
        return res.send(recipes);
      } else {
        return res.send(err);
      }
    })
  })

module.exports = router;