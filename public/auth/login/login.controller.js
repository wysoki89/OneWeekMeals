angular.module("owmApp")
.controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['authentication', '$location'];
function loginCtrl(authentication, $location){
    var vm = this;
    vm.credentials = {
        email: "",
        password: ""
    };
    vm.login = function(){
        authentication.login(vm.credentials)
        .then(function(){
            $location.path('recipes');
        });
    };
}
