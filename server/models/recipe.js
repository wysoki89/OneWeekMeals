'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    name: String,
    ingredients: Array,
    preparation: String,
    tags: Array 
}, {collection : 'recipes'});

module.exports = mongoose.model('recipes', recipeSchema);