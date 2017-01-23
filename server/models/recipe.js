var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema ({
    name: String,
    ingredients: Array,
    preparation: String,
    tags: Array 
}, {collection : 'recipes'});

mongoose.model('recipes', recipeSchema);
