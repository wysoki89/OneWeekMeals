angular.module('owmApp')
    .directive('recipeList', function () {
        return {
            restrict: 'E',
            templateUrl: 'recipes/recipe.view.html',
            scope: {
                recipe: '<'
            },
            replace: true,
            controller: function ($scope, cartService, ingredientsService, $location, recipesState) {
                /**
                 * adds recipe
                 * 
                 * @function addRecipe
                 * @param {Object} recipe
                 */
                $scope.addRecipe = function (recipe) {
                    cartService.addProduct(recipe);
                    ingredientsService.addIngredient(recipe);
                };
                 /**
                 * show full recipe
                 * 
                 * @function showFullRecipe
                 * @param {Object} recipe
                 */
                $scope.showFullRecipe = function (recipe) {
                    recipesState.selectedRecipe = recipe;
                    $location.path('recipeDetails');
                };
            }
        };
    });