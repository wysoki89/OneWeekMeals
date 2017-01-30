angular.module("owmApp")
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['authentication', '$location'];
function loginCtrl(authentication, $location) {
    var vm = this;
    vm.credentials = {
        email: "",
        password: ""
    };
    /**
     * run login function from service authentication
     * 
     * @function login
     * @param {Object} credentials
     */
    vm.login = function () {
        authentication.login(vm.credentials)
            .then(function () {
                $location.path('recipes');
            });
    };
}
