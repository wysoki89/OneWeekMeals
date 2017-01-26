'use strict';

describe('/POST emailIngredients', () => {
    it('it should not POST a request without email and body', (done) => {
        let email = { to: 'test@test.com', emailBody: 'emailBody' };
        let validateEmail = function (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        api
            .post('/emailIngredientList/')
            .type('form')
            .send(email)
            .expect(200)
            .expect((res) => {
                assert.isObject(res.body, "email is not an object");
                assert(validateEmail(res.body.to), "res.body.to is not an email");
                assert(typeof (res.body.html) === 'string', "html is not string");
            })
            .end(done);
    });
});