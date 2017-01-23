var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = mongoose.model('recipes');

router
  .post('/', (req, res) => {
    var newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      preparation: req.body.preparation,
      tags: req.body.tags
    })
    console.log(req.body)
    // save the task
    newRecipe.save(function (err, doc) {
      if (err) {
        return res.send("something is wrong")
      }
      console.log("saved to database");
      res.redirect('/');
    });
  })

  .get('/', (req, res) => {
    return Recipe.find({}, function (err, recipes) {
      if (!err) {
        return res.send(recipes);
      } else {
        return console.log(err);
      }
    })
  })

module.exports = router;