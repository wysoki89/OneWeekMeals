angular.module("owmApp")
    .controller('registerCtrl', registerCtrl);
registerCtrl.$inject = ['authentication', '$location'];
function registerCtrl(authentication, $location) {
    var vm = this;
    vm.credentials = {
        email: "",
        password: ""
    };
    /**
     * run register function from service authentication
     * 
     * @function register
     * @param {Object} credentials
     */
    vm.register = function () {
        authentication.register(vm.credentials)
    };
}
