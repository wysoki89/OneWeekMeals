angular.module("owmApp")
.controller('loginCtrl', function ($scope,$http, $httpParamSerializerJQLike, AuthService, $location){
    $scope.login = function(){
        AuthService.login(this.username, this.password)
        // .then(function(){
        //     $location.path('/recipes');
        //     console.log("logged in");
        // }, function (err){
        //     console.log("not logged in")
        // });
        // var data = {};
        // data.user = this.email;
        // data.password = this.password;
        // $http({
        //     method: 'POST',
        //     url: '/login',
        //     data: $httpParamSerializerJQLike(data),
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // })
        // .then(function(response){
        //     if(response.data){
        //         console.log(response.data)
        //     }
        //     else{
        //         console.log ("brak usera")
        //     }
        // }, function(error){
        //     $scope.orderError = error;
        //     console.log(error)
        //  })
        //  .finally(function(){
        //     $location.path("/adminMain")
        //  });
    };
    $scope.signup = function(){
        AuthService.signup(this.username, this.password)
    }
})
