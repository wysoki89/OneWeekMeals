var express = require('express');
var router = express.Router();
const co = require('co');
// model
var mongoose = require('mongoose');
var Order = mongoose.model('orders');

router
    .post('/', co.wrap(function* (req, res, next) {
        try {
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
            const order = yield newOrder.save();
            res.send(order);
        } catch (e) {
            next(e)
        }
    }))

module.exports = router;