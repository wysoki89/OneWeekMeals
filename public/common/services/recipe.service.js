angular.module("owmApp").factory('Recipe', function ($resource){
    return $resource('/recipes/:id');    
});
angular.module("owmApp")
.service('recipesState', function () {
    this.selectedCategory = null;
    this.selectedRecipe = null;
});
