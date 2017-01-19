angular.module("owmApp").factory('Recipe', function ($resource){
    return $resource('/api/recipes/:id');    
});
angular.module("owmApp")
.service('recipesState', function () {
    this.selectedCategory = null;
});
