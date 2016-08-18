angular.module("owmApp")
    .constant('recipeListActiveClass', "btn-primary")
    .constant("recipeListPageCount", 3)
    .controller('recipeListCtrl', function ($scope, recipeListActiveClass, recipeListPageCount, cart, recipesService){

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
                    return recipe
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
        $scope.addRecipeToCart = function(recipe){
            cart.addProduct(recipe);
        }
    })
