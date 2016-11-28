angular.module("owmApp")
.factory('AuthService', function ($http, $httpParamSerializerJQLike) {
    var user = null;
    return {
        login: function(username, password){
        $http({
            method: 'POST',
            url: '/login',
            data: $httpParamSerializerJQLike({username:username, password: password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
      //   // handle success
      //   .success(function (data, status) {
      //     if(status === 200 && data.status){
      //       user = true;
      //       deferred.resolve();
      //     } else {
      //       user = false;
      //       deferred.reject();
      //     }
      //   })
      //   // handle error
      //   .error(function (data) {
      //     user = false;
      //     deferred.reject();
      //   });

      // // return promise object
      // return deferred.promise;
      
        // .then(function(response){
        //     if(response.data){
        //         console.log(response.data)
        //     }
        // else{
        //         console.log ("brak usera")
        //     }
        // }, function(error){
        //     $scope.orderError = error;
        //     console.log(error)
        //  })
        //  .finally(function(){
        //     $location.path("/adminMain")
        //  });
      },
      signup: function(username, password){
        console.log(username, password)
        $http({
            method: 'POST',
            url: '/signup',
            data: $httpParamSerializerJQLike({username:username, password: password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
      }
    } 
})