angular.module('owmApp')
    .controller('navigationCtrl', navigationCtrl);
// inject service with recipes State
navigationCtrl.$inject = ['recipesState', 'authentication'];
function navigationCtrl(recipesState, authentication) {
    var vm = this;
    vm.categories = [
        { parent: "Posiłki", children: ["Śniadanie", "Obiad", "Kolacja"] },
        { parent: "Składniki", children: ["Jajka", "Mięso", "Makaron"] },
    ];
    /**
     * sets selectedCategory in service recipesState to null
     * 
     * @function resetView
     */
    vm.resetView = function () {
        recipesState.selectedCategory = null;
    };
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    vm.logout = authentication.logout();
}