angular.module("owmApp")
.service('authentication', function ($http, $httpParamSerializerJQLike, $window, $location) {
    var user = null;
    var saveToken = function(token){
        $window.sessionStorage['owm-token'] = token;
    };
    var getToken = function () {
      return $window.sessionStorage['owm-token'];
    };
    this.isLoggedIn = function() {
      var token = getToken();
      // payload is part of token that contains data   
      var payload;

      if(token){
        payload = token.split('.')[1];
        // atob is a built in browser function that decodes Base64 string
        payload = $window.atob(payload);
        // JSON.parse changes text to JSON
        payload = JSON.parse(payload);
        // check if the token expired
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    this.currentUser = function() {
      if(this.isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    this.register =  function(user){
        return $http({
            method: 'POST',
            url: '/register',
            data: $httpParamSerializerJQLike(user),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response){
            saveToken(response.data.token);
            $location.path('newUserRegistered');
        }, function(error){
            $location.path('registerUser');
            console.log(error);
         });
    };
    this.login = function(user){
        return $http({
            method: 'POST',
            url: '/login',
            data: $httpParamSerializerJQLike(user),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response){
            saveToken(response.data.token);
        }, function(error){
            console.log(error);
            
         });
    };
    this.logout = function() {
      $window.sessionStorage.removeItem('owm-token');
    };
});
