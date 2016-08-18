const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const config = require('./config')
var db;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var Schema = mongoose.Schema;
var recipeSchema = new Schema ({
    name: String,
    ingredients: Array,
    preparation: String,
    tags: Array 
},{collection : 'recipes'});
var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

mongoose.connect(`mongodb://${config.database.login}:${config.database.password}${config.database.url}${config.database.dbname}`
, (err, database) => {
    if(err){
        return console.log(err)
    }
    db = database;
    app.listen(8000, function(){
        console.log("server is running on port 8000");
    })
    // get all the Results
    Recipe.find({}, function(err, recipes) {
        if (err) throw err;

    // object of all the results
    console.log(recipes);
    });
})


app.post('/addRecipe', (req,res)=>{
    var newRecipe = Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        tags: req.body.tags
    })
    console.log(req.body)
    // save the task
    newRecipe.save(function(err) {
    if (err){
        return console.log(err);
    }

    console.log("saved to database");
    res.redirect('/')
    });
})

app.get('/getRecipes', (req, res)=>{
  return Recipe.find({}, function(err, recipes) {
        if (!err) {
            return res.send(recipes);
        } else {
            return console.log(err);
        }
    })
})

// app.post('/update', (req, res)=>{
//     Task.findOneAndUpdate({action: req.body.action}, {done: req.body.done},function(err,task){
//         if (err){
//             throw err;
//         }
//     })
// })

// app.post('/delete', (req, res)=>{
//     Task.findOneAndRemove({action: req.body.action}, function(err,task){
//         if (err){
//             throw err;
//         }
//     })
// })
