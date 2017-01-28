'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    name: String,
    surname: String,
    city: String,
    zip: String,
    street: String,
    address1: String,
    address2: String,
    deliveryDate: Date,
    ingredients: Array 
}, {collection : 'orders'});

mongoose.model('orders', orderSchema);
