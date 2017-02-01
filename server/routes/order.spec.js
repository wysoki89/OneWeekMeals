'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model('order');

describe('/POST orderIngredients', () => { 
  beforeEach(() => Order.remove({}));

  it('it should not POST an order without all details', (done) => {
    let order = {
      shippingDetails: {
        name: 'Tomasz',
        surname: 'Wysokinski',
        city: 'Krakow',
        zip: '30-733',
        street: 'Bagrowa',
        address1: 11,
        address2: 11,
        deliveryDate: new Date(),
      },
      ingredients: []
    };
    api
      .post('/order/')
      .type('form')
      .send(order)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "order is not an object");
        assert.equal("Tomasz", res.body.name, "name is not Tomasz");
        assert.equal("Wysokinski", res.body.surname, "surname is not Wysokinski");
        assert.equal("Krakow", res.body.city, "city is not Krakow");
        assert.equal("30-733", res.body.zip, "zip is not 30-733");
        assert.equal("Bagrowa", res.body.street, "street is not Bagrowa");
        assert.equal(11, res.body.address1, "address1 is not 11");
        assert.equal(11, res.body.address2, "address2 is not 11");
        assert(typeof res.body.deliveryDate === "string", "deliveryDate is not a string");
        assert(Array.isArray(res.body.ingredients), "ingredients is not array");
      })
      .end(done);
  });
});