'use strict';
const mongoose  = require('mongoose');
const User = mongoose.model('users');

describe('/POST register new user', () => { 
  before(() => User.remove({}));
  after(() => User.remove({}));

  it('it should return a token', (done) => {
    let credentials = { email: 'test@test.com', password: 'pass' };
    api
      .post('/register/')
      .type('form')
      .send(credentials)
      .expect(200)
      .expect((res) => {
        console.log(res.body)
        assert.isObject(res.body, "token is not an object");
        assert(res.body.hasOwnProperty('token'), "res.body does not have token property");
        assert(typeof res.body.token === 'string', "res.body.token is not a string");
      })
      .end(done);
  });
});