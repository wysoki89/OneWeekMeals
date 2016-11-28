angular.module("owmApp")
    .constant('recipeListActiveClass', "btn-primary")
    .constant("recipeListPageCount", 4)
    .controller('recipeListCtrl', function ($scope, recipeListActiveClass, recipeListPageCount, cart, ingredients){
        
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = recipeListPageCount;
        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;
        }
        $scope.selectCategory = function(newCategory){
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }
        $scope.categoryFilterfn = function(recipe){
                if (selectedCategory === null){
                    return recipe;
                }
                if (recipe.tags.indexOf(selectedCategory)>=0){
                    return recipe;
                }
        }
        $scope.getPageClass = function(page){
            return $scope.selectedPage === page ? recipeListActiveClass : "";
        }
        $scope.resetView = function(){
            selectedCategory = null;
        }
        $scope.showFullRecipe = function(recipeName){
            var url = `views/${recipeName}.html`;
        }
        $scope.addRecipe = function(recipe){
            cart.addProduct(recipe);
            ingredients.addIngredient(recipe);
        }
        $scope.remove = function(id){
            cart.removeProduct(id)
        }
    })
