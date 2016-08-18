angular.module("owmApp")
    .controller("shoppingListController", function($scope, cart, recipesService){
        $scope.cartData = cart.getProducts();
        $scope.ingredients = function() {
            return recipesService.getIngredients();
        };
    })