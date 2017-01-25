// dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');

var ctrlAuth = require('../controllers/authentication');

router.use('/recipes', require('./recipes.js'));
router.use('/emailIngredientList', require('./emailIngredients.js'));
router.use('/orderIngredients', require('./orderIngredients.js'));
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;  