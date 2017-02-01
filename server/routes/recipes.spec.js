const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');
const co = require('co');

describe('recipes', () => { 
  var recipe;

  before(co.wrap(function* () {
    recipe = yield Recipe.create({
      name: 'recipe1',
      ingredients: ['eggs'],
      preparation: 'boil',
      tags: ['breakfast']
    })
  }))
  after(co.wrap(function* () {
    yield Recipe.remove({});
  }))
  it('resources are defined', () => {
    assert.isOk(recipe, 'recipe was created')
  })
  it('it should GET all the recipes', (done) => {
    api
      .get('/recipes/')
      .expect(200)
      .expect((res) => {
        assert(Array.isArray(res.body), "type is array");
      })
      .end(done)
  });
  it('it should not POST a recipe without name, ingredients, preparation and tags', (done) => {
    var postRecipe = {
      name: 'recipe1',
      ingredients: ['eggs'],
      preparation: 'boil',
      tags: ['breakfast']
    }
    api
      .post('/recipes/')
      .type('form')
      .send(postRecipe)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "recipe is not an object");
        assert.equal("recipe1", res.body.name, "name is not recipe1");
        assert(Array.isArray(res.body.ingredients), "ingredients is not array");
        assert(res.body.ingredients.length > 0, "ingredients array is empty");
        assert(typeof (res.body.preparation) === 'string', "preparation is not string");
        assert(Array.isArray(res.body.tags), "tags is not array");
        assert(res.body.tags.length > 0, "tags array is empty");
      })
      .end(done);
  });
  it('it should GET recipe by id', (done) => {
    api
      .get(`/recipes/${recipe._id}`)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "res.body is not an object");
        assert.equal(res.body._id, recipe._id, "id's are not equal")
      })
      .end(done)
  });
  it('it should DELETE recipe by id', (done) => {
    api
      .delete(`/recipes/${recipe._id}`)
      .expect(200)
      .expect((res) => {
        assert.isObject(res.body, "res.body is not an object");
        assert.equal(res.body.status, "OK", "status is not ok")
      })
      .end(done)
  });
})