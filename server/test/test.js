var chai = require('chai');
var chaiHttp = require('chai-http')
var should = chai.should;
var server = require('../routes/index')
chai.use(chaiHttp);

// describe - groups tests
describe('/GET recipes', () => {
  //   it - used to create a test
  it('should get all the recipes', function() {
    chai.request(server)
            .get('/api/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });  
  });

