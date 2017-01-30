angular.module("owmApp")
    .constant('recipeListActiveClass', "btn-primary")
    .constant("recipeListPageCount", 4)
    .controller('recipeListCtrl', recipeListCtrl);
recipeListCtrl.$inject = ['recipeListActiveClass', 'recipeListPageCount', 'cartService', 'ingredientsService', '$scope', 'Recipe', 'recipesState'];
function recipeListCtrl(recipeListActiveClass, recipeListPageCount, cartService, ingredientsService, $scope, Recipe, recipesState) {
    $scope.days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
    $scope.recipes = Recipe.query();
    $scope.selectedRecipe = recipesState.selectedRecipe;
    $scope.selectedPage = 1;
    $scope.pageSize = recipeListPageCount;
    /**
     * selects page
     * 
     * @function selectPage
     * @param {Number} newPage
     */
    $scope.selectPage = function (newPage) {
        $scope.selectedPage = newPage;
    };
    /**
     * selects category
     * 
     * @function selectCategory
     * @param {String} newCategory
     */
    $scope.selectCategory = function (newCategory) {
        recipesState.selectedCategory = newCategory;
        $scope.selectedPage = 1;
    };
    /**
     * filters recipes by selected category
     * 
     * @function categoryFilterfn
     * @param {Object} recipe
     */
    $scope.categoryFilterfn = function (recipe) {
        if (recipesState.selectedCategory === null) {
            return recipe;
        }
        if (recipe.tags.indexOf(recipesState.selectedCategory) >= 0) {
            return recipe;
        }
    };
    /**
     * gets page class
     * 
     * @function getPageClass
     * @param {Number} page
     */
    $scope.getPageClass = function (page) {
        return $scope.selectedPage === page ? recipeListActiveClass : "";
    };
    /**
     * resets view
     * 
     * @function resetView
     */
    $scope.resetView = function () {
        recipesState.selectedCategory = null;
    };
    /**
     * removes product from cart
     * 
     * @function remove
     * @param {String} id
     */
    $scope.remove = function (id) {
        cartService.removeProduct(id);
    };
}
