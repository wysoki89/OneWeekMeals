angular.module('owmApp')
    .controller('navigationCtrl', navigationCtrl);
// inject service with recipes State
navigationCtrl.$inject = ['recipesState', 'authentication'];
function navigationCtrl(recipesState, authentication) {
    var navvm = this;
    navvm.categories = [
        { parent: "Posiłki", children: ["Śniadanie", "Obiad", "Kolacja"] },
        { parent: "Składniki", children: ["Jajka", "Mięso", "Makaron"] },
    ];
    /**
     * sets selectedCategory in service recipesState to null
     * 
     * @function resetView
     */
    navvm.resetView = function () {
        recipesState.selectedCategory = null;
    };
    navvm.isLoggedIn = authentication.isLoggedIn();
    navvm.currentUser = authentication.currentUser();
    navvm.logout = authentication.logout();
}