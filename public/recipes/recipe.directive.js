 angular.module('owmApp')
.directive('recipeList', function () {
    return {
        restrict: 'E',
        templateUrl: 'recipes/recipe.view.html',
        scope: {
            recipe: '='
        },
        replace: true,
        controller: function($scope, cartService, ingredientsService, $location, recipesState){
            $scope.addRecipe = function(recipe){
                cartService.addProduct(recipe);
                ingredientsService.addIngredient(recipe);
            };
            $scope.showFullRecipe = function(recipe){
                recipesState.selectedRecipe = recipe;
                $location.path('recipeDetails');
            };
        }
    };
});