// dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const errorHandler = require('../errorHandler');

router.use('/recipes', require('./recipes.js'));
router.use('/emailIngredientList', require('./emailIngredients.js'));
router.use('/orderIngredients', require('./orderIngredients.js'));
router.use('/register', require('./authentication/register.js'));
router.use('/login', require('./authentication/login.js'));
router.use(errorHandler);
  
module.exports = router; 