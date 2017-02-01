'use strict'
const express = require('express');
const router = express.Router();
const co = require('co');
// model
const mongoose = require('mongoose');

const Order = mongoose.model('order'); 
 
router
    .post('/', co.wrap(function* (req, res, next) {
        try {
            let newOrder = new Order({
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
            let order = yield newOrder.save();
            res.send(order);
        } catch (e) {
            next(e)
        }
    }))

module.exports = router;