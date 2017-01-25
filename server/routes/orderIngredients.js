var express = require('express');
var router = express.Router();
// model
var mongoose = require('mongoose');
var Order = mongoose.model('orders');

router
    .post('/', function (req, res) {
        var newOrder = new Order({
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
        // // save the task
        newOrder.save(function (err, doc) {
            if (err) {
                return res.send("something is wrong")
            }
            else {
                console.log("saved to database");
                res.send(doc);
            }
        });
        // res.end();
    })

module.exports = router;