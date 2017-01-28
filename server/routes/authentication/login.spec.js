'use strict';
var User = require('../../models/user');

describe('/POST login', () => {
  var newUser;
  before((done) => {
    User.remove({});
    newUser = new User();
    newUser.email = 'test@test.com';
    newUser.setPassword('pass');
    newUser.save(function (err) {
      if (err) {
        console.log('Error in Saving user: ' + err);
        return done(err);
      }
      console.log('User Registration succesful');
      return done(null, newUser);
    });;
  });

  after((done) => {
    newUser.remove();
    return done()
  })

  it('user was created and is not null', () => {
    assert.isObject(newUser)
  })
  it('it should return a token', (done) => {
    let credentials = { email: 'test@test.com', password: 'pass' };
    api
      .post('/login/')
      .type('form')
      .send(credentials)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "token is not an object");
        assert(res.body.hasOwnProperty('token'), "res.body does not have token property");
        assert(typeof res.body.token === 'string', "res.body.token is not a string");
      })
      .end(done);
  });
});