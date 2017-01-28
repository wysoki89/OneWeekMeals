'use strict';
const mongoose = require('mongoose');
const Recipe = mongoose.model('recipes');
describe('recipes', () => {
  beforeEach((done) => {
    Recipe.remove({}, (err) => {
      done();
    });
  });
})

describe('/GET recipes', () => {
  it('it should GET all the recipes', (done) => {
    api
      .get('/recipes/')
      .expect(200)
      .end(function (err, res) {
        assert(Array.isArray(res.body), "type is not array");
        done(err); 
      });
  });
});

describe('/POST recipe', () => {
  it('it should not POST a recipe without name, ingredients, preparation and tags', (done) => {
    let recipe = { name: 'recipe1', ingredients: ['eggs'], preparation: 'boil', tags: ['breakfast'] };
    api
      .post('/recipes/')
      .type('form')
      .send(recipe)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "recipe is not an object");
        assert.equal("recipe1", res.body.name, "name is not recipe1");
        assert(Array.isArray(res.body.ingredients), "ingredients is not array");
        assert(res.body.ingredients.length > 0 , "ingredients array is empty");
        assert(typeof(res.body.preparation) === 'string', "preparation is not string");
        assert(Array.isArray(res.body.tags), "tags is not array");
        assert(res.body.tags.length > 0 , "tags array is empty");
      })
      .end(done);
  });
});