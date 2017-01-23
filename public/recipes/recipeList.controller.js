angular.module("owmApp")
.constant('recipeListActiveClass', "btn-primary")
.constant("recipeListPageCount", 4)
.controller('recipeListCtrl', recipeListCtrl);
recipeListCtrl.$inject = ['recipeListActiveClass', 'recipeListPageCount', 'cartService', 'ingredientsService', '$scope', 'Recipe', 'recipesState'];
function recipeListCtrl(recipeListActiveClass, recipeListPageCount, cartService, ingredientsService, $scope, Recipe, recipesState){
        $scope.days = ["Poniedziałek","Wtorek", "Środa", "Czwartek", "Piątek"];
        $scope.recipes = Recipe.query();
        $scope.selectedRecipe = recipesState.selectedRecipe;
        $scope.selectedPage = 1;
        $scope.pageSize = recipeListPageCount;
        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;
        };
        $scope.selectCategory = function(newCategory){
            recipesState.selectedCategory = newCategory;
            $scope.selectedPage = 1;
        };
        $scope.categoryFilterfn = function(recipe){
                if (recipesState.selectedCategory === null){
                    return recipe;
                }
                if (recipe.tags.indexOf(recipesState.selectedCategory)>=0){
                    return recipe;
                }
        };
        $scope.getPageClass = function(page){
            return $scope.selectedPage === page ? recipeListActiveClass : "";
        };
        $scope.resetView = function(){
            recipesState.selectedCategory = null;
        };
        $scope.remove = function(id){
            cartService.removeProduct(id);
        };
}
