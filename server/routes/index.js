// dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const errorHandler = require('../errorHandler');

const ctrlAuth = require('../controllers/authentication');

router.use('/recipes', require('./recipes.js'));
router.use('/emailIngredientList', require('./emailIngredients.js'));
router.use('/orderIngredients', require('./orderIngredients.js'));
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.use(errorHandler);

module.exports = router;  