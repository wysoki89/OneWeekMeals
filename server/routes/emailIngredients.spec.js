'use strict'
xdescribe('/POST emailIngredients', () => {
    it('it should not POST a request without email and body', (done) => {
        let email = { to: 'twysokinski@gmail.com', emailBody: 'emailBody' };
        api
            .post('/emailIngredientList')
            .type('form')
            .send(email)
            .expect(200)
            .expect((res) => {
                assert.isObject(res.body, "email is not an object");
                assert.equal("twysokinski@gmail.com", res.body.to, "res.body.to is not an email");
                assert(typeof (res.body.html) === 'string', "html is not string");
            })
            .end(done);
    });
}); 