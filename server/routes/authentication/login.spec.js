'use strict'
const mongoose = require('mongoose');
const User = mongoose.model('user');
const co = require('co');

describe('/POST login', () => {
  let newUser;
  before(co.wrap(function* () {
    yield User.remove({});
    newUser = new User();
    newUser.email = 'test@test.com';
    newUser.setPassword('pass');
    yield newUser.save()
  }))

  after(() => User.remove({}));

  it('user was created and is not null', () => {
    assert.isObject(newUser)
  })
  it('it should return a token', () => {
    let credentials = { email: 'test@test.com', password: 'pass' };
    return api
      .post('/login')
      .type('form')
      .send(credentials)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "token is not an object");
        assert(res.body.hasOwnProperty('token'), "res.body does not have token property");
        assert(typeof res.body.token === 'string', "res.body.token is not a string");
      })
  });
});