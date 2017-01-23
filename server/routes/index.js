// dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('./../config');
var mailer = require("nodemailer");
// models
var Order = require('../models/order.js');
var User = require('../models/user.js');

var ctrlAuth = require('../controllers/authentication');

router.use('/recipes', require('./recipes.js'))

router.post('/sendIngredientList',function(req,res){
    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.mailer.auth.user,
            pass: config.mailer.auth.pass
        }
    });
    console.log(req.body.to)
    var mailOptions={
        from: "twysokinski@gmail.com",
        to : req.body.to,
        subject : "Lista zakupów",
        html : req.body.emailBody 
    }
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
                console.log(error);
            res.end("error");
        }else{
                console.log("Message sent: " + response.message);
            res.end("sent");
            }
        smtpTransport.close();
    });
});

router.post('/orderIngredients', function(req,res){
    var newOrder = Order({
        name: req.body.shippingDetails.name,
        surname: req.body.shippingDetails.surname,
        city: req.body.shippingDetails.city,
        zip: req.body.shippingDetails.zip,
        street: req.body.shippingDetails.street,
        address1: req.body.shippingDetails.address1,
        address2: req.body.shippingDetails.address2,
        deliveryDate: req.body.shippingDetails.deliveryDate,
        ingredients: req.body.ingredients
    })
    // save the task
    newOrder.save(function(err) {
        if (err){
            return console.log(err);
        }
        console.log("saved to database");
        res.end("saved");
    });
})

router.post('/register',ctrlAuth.register);
router.post('/login',ctrlAuth.login);

module.exports = router;