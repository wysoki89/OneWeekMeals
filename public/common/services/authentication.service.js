angular.module("owmApp")
  .service('authentication', function ($http, $httpParamSerializerJQLike, $window, $location) {
    var user = null;
    /**
     * saves token in sessionStorage
     * 
     * @function saveToken
     * @param {String} token
     */
    var saveToken = function (token) {
      $window.sessionStorage['owm-token'] = token;
    };
    /**
     * return token from sessionStorage
     * 
     * @function getToken
     */
    var getToken = function () {
      return $window.sessionStorage['owm-token'];
    };
    /**
     * check if user is logged in by checking if token exists and is not expired
     * 
     * @function isLoggedIn
     */
    this.isLoggedIn = function () {
      var token = getToken();
      // payload is part of token that contains data   
      var payload;

      if (token) {
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
    /**
     * returns email and name of current user
     * 
     * @function currentUser
     */
    this.currentUser = function () {
      if (this.isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };
    /**
     * send post request to register, save token and chage path
     * 
     * @function register
     * @param {Object} user
     */
    this.register = function (user) {
      return $http({
        method: 'POST',
        url: '/register',
        data: $httpParamSerializerJQLike(user),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(function (response) {
          saveToken(response.data.token);
          $location.path('newUserRegistered');
        }
          .catch(function (error) {
            $location.path('registerUser');
            console.log(error);
          }))
    };
    /**
     * send post request to login, save token
     * 
     * @function login
     * @param {Object} user
     */
    this.login = function (user) {
      return $http({
        method: 'POST',
        url: '/login',
        data: $httpParamSerializerJQLike(user),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(function (response) {
          saveToken(response.data.token);
        }, function (error) {
          console.log(error);
        });
    };
    /**
     * removes token from sessionStorage
     * 
     * @function logout
     */
    this.logout = function () {
      $window.sessionStorage.removeItem('owm-token');
    };
  });
