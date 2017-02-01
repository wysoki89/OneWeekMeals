var owmApp = angular.module("owmApp", ["customFilters", "cart", "ngRoute", "ngMaterial", "ngMessages", "ngResource"])
    .config(function ($routeProvider) {
        // $routeProvider.when("/recipes/:param", {
        //     templateUrl: "/views/recipes/:param.html"
        // });
        $routeProvider.when("/recipes", {
            templateUrl: "/recipes/recipeList.view.html",
        });
        $routeProvider.when("/recipeDetails", {
            templateUrl: "/recipes/recipeDetails.view.html",
        });
        $routeProvider.when("/checkout", {
            templateUrl: "/checkout/checkoutSummary.view.html",
            controller: 'checkoutCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/ingredients", {
            templateUrl: "/ingredients/ingredientsSummary.view.html",
            controller: 'ingredientsCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/ingredientsListSent", {
            templateUrl: "/ingredients/ingredientsListSent.view.html"
        });
        $routeProvider.when("/placeOrder", {
            templateUrl: "/ingredients/placeOrder.view.html",
            controller: 'ingredientsCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/orderCompleted", {
            templateUrl: "/ingredients/orderCompleted.view.html"
        });
        $routeProvider.when("/login", {
            templateUrl: "/auth/login/login.view.html",
            controller: 'loginCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/registerChoice", {
            templateUrl: "/auth/register/registerChoice.view.html",
            controller: 'registerCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/registerUser", {
            templateUrl: "/auth/register/registerUser.view.html",
            controller: 'registerCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/registerBlogger", {
            templateUrl: "/auth/register/registerBlogger.view.html",
            controller: 'registerCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.when("/newUserRegistered", {
            templateUrl: "/auth/register/newUserRegistered.view.html",
            controller: 'registerCtrl',
            controllerAs: 'vm'
        });
        $routeProvider.otherwise({
            redirectTo: "/recipes"
        });
    });

angular.module("cart", [])
    .directive("cartSummary", function (cartService) {
        return {
            restrict: "E",
            templateUrl: "cart/cartSummary.view.html",
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
                var cartData = cartService.getProducts();
                /**
                 * counts number of dishes in cart
                 * 
                 * @function dishCount
                 */
                vm.dishCount = function () {
                    var total = { breakfastSupper: 0, lunch: 0, dessert: 0 };
                    angular.forEach(cartData, item => {
                        if ((item.tags.indexOf("Śniadanie") >= 0) || (item.tags.indexOf("Kolacja") >= 0)) {
                            item.dish = "Śniadanie/Kolacja";
                            total.breakfastSupper += item.count;
                        }
                        else if (item.tags.indexOf("Obiad") >= 0) {
                            item.dish = "Obiad";
                            total.lunch += item.count;
                        }
                        else if (item.tags.indexOf("Deser") >= 0) {
                            item.dish = "Deser";
                            total.dessert += item.count;
                        }
                    });
                    return total;
                };
            }
        };
    })
angular.module("owmApp")
    .controller("checkoutCtrl", checkoutCtrl);
checkoutCtrl.$inject = ['cartService'];
function checkoutCtrl(cartService) {
    var vm = this;
    vm.cartData = cartService.getProducts();
    /**
     * removes product by id from service cartService
     * 
     * @function remove
     * @param {String} id
     */
    vm.remove = function (id) {
        cartService.removeProduct(id);
    };
}
angular.module("owmApp")
    .controller("ingredientsCtrl", ingredientsCtrl);
ingredientsCtrl.$inject = ['$http', '$httpParamSerializerJQLike', 'ingredientsService', 'cartService', '$location'];
function ingredientsCtrl($http, $httpParamSerializerJQLike, ingredientsService, cartService, $location) {
    var vm = this;
    /**
     * removes ingredient from service
     * 
     * @function removeIngredient
     * @param {String} name
     */
    vm.removeIngredient = function (name) {
        ingredientsService.removeIngredient(name);
    };
    /**
     * gets ingredients from service
     * 
     * @function ingredientsData
     */
    vm.ingredientsData = ingredientsService.getIngredients();
    /**
     * send email with ingredients list
     * 
     * @function emailIngredientList
     * @param {String} recipient
     */
    vm.emailIngredientList = function (recipient) {
        vm.emailFormSubmitted = true;
        var emailBody = function () {
            var tbody = document.createElement("tbody");
            var style = '<style>table{border-collapse: collapse;}table, th, tr, td{border:1px solid black;padding: 5px;}</style>';
            _.each(vm.ingredientsData, ingredient => {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.appendChild(document.createTextNode(ingredient.name));
                tr.appendChild(td);
                td.appendChild(document.createTextNode(ingredient.amount));
                tr.appendChild(td);
                tbody.appendChild(tr);
            });
            return (style + "<table><thead><tr><th>Produkt</th><th>Ilość</th></tr></thead>" + tbody.outerHTML + "</table>");
        };
        ingredientsService.emailIngredients(recipient, emailBody());
    };
    /**
     * send order details to database
     * 
     * @function orderIngredients
     * @param {Object} shippingDetails
     */
    vm.orderIngredients = function (shippingDetails) {
        var data = {};
        data.shippingDetails = shippingDetails;
        data.ingredients = angular.copy(ingredientsService.getIngredients());
        vm.orderFormSubmitted = true;
        ingredientsService.orderIngredients(data);
    };
    vm.myDate = new Date();
    vm.minDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth(),
        vm.myDate.getDate() + 1
    );
    vm.maxDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth(),
        vm.myDate.getDate() + 20
    );
}

angular.module('owmApp')
    .directive('recipeList', function () {
        return {
            restrict: 'E',
            templateUrl: 'recipes/recipe.view.html',
            scope: {
                recipe: '='
            },
            replace: true,
            controller: function ($scope, cartService, ingredientsService, $location, recipesState) {
                /**
                 * adds recipe
                 * 
                 * @function addRecipe
                 * @param {Object} recipe
                 */
                $scope.addRecipe = function (recipe) {
                    cartService.addProduct(recipe);
                    ingredientsService.addIngredient(recipe);
                };
                 /**
                 * show full recipe
                 * 
                 * @function showFullRecipe
                 * @param {Object} recipe
                 */
                $scope.showFullRecipe = function (recipe) {
                    recipesState.selectedRecipe = recipe;
                    $location.path('recipeDetails');
                };
            }
        };
    });
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

angular.module('customFilters', [])
    .filter("range", function () {
        return function (data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                }
                else {
                    return data.splice(start_index, size);
                }
            }
            else {
                return data;
            }

        };
    })
    .filter("pageCount", function () {
        return function (data, size) {
            if (angular.isArray(data)) {
                var results = [];
                for (var i = 0; i < Math.ceil(data.length / size); i++) {
                    results.push(i);
                }
                return results;
            }
            else {
                return data;
            }
        };
    });
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

angular.module("owmApp")
    .service('cartService', function () {
        var cartData = [];
        /**
         * add recipe to cart. if it already exists increase property count of the recipe in cartDate
         * 
         * @function addProduct
         * @param {Object} recipe
         */
        this.addProduct = function (recipe) {
            var addedToExistingItem = false;
            angular.forEach(cartData, (item, index) => {
                if (item._id === recipe._id) {
                    item.count++;
                    addedToExistingItem = true;
                }
            });
            if (!addedToExistingItem) {
                recipe.count = 1;
                cartData.push(recipe);
            }
        };
        /**
         * removes product from cart
         * 
         * @function removeProduct
         * @param {String} id
         */
        this.removeProduct = function (id) {
            angular.forEach(cartData, (item, index) => {
                if (item._id === id) {
                    cartData.splice(index, 1);
                }
            });
        };
        /**
         * returns products from the cart
         * 
         * @function getProducts
         */
        this.getProducts = function () {
            return cartData;
        }
    });
angular.module("owmApp")
    .service('ingredientsService', function ($http, $httpParamSerializerJQLike, $location, cartService) {
        var that = this;
        var ingredients = [];
        /**
         * adds ingredients -> checks if the ingredient is new and increase the amount property
         * 
         * @function addIngredient
         * @param {Object} recipe
         */
        this.addIngredient = function (recipe) {
            _.each(recipe.ingredients, ingredient => {
                var isNew = true;
                _.each(ingredients, function (result) {
                    if (result.name === ingredient.name) {
                        result.amount += ingredient.amount;
                        isNew = false;
                    }
                });
                if (isNew) {
                    ingredients.push(ingredient);
                }
            });
        };
        /**
         * removes ingredient by splicing the array
         * 
         * @function removeIngredient
         * @param {String} name
         */
        this.removeIngredient = function (name) {
            _.each(ingredients, (item, index) => {
                if (name === item.name) {
                    ingredients.splice(index, 1);
                }
            });
        };
        /**
         * returns ingredients
         * 
         * @function getIngredients
         */
        this.getIngredients = function () {
            return ingredients;
        };
        /**
         * sends POST request to orderIngredients
         * 
         * @function orderIngredients
         * @param {Object} data
         */
        this.orderIngredients = function (data) {
            $http({
                method: 'POST',
                url: '/order',
                data: $httpParamSerializerJQLike(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function (response) {
                    cartService.getProducts().length = 0;
                    that.getIngredients().length = 0;
                }, function (error) {
                    console.log(error);
                })
                .finally(function () {
                    $location.path("/orderCompleted");
                });
        }
        /**
         * sends POST request to emailIngredientList
         * 
         * @function emailIngredients
         * @param {String} recipient
         * @param {String} emailBody
         */
        this.emailIngredients = function (recipient, emailBody) {
            $http({
                method: 'POST',
                url: '/email',
                data: $httpParamSerializerJQLike({ to: recipient, emailBody: emailBody }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                cartService.getProducts().length = 0;
                that.getIngredients().length = 0;
                $location.path("/ingredientsListSent");
            }, function (error) {
                console.log(error)
            })
        }
    });

angular.module("owmApp").factory('Recipe', function ($resource){
    return $resource('/recipes/:id');    
});
angular.module("owmApp")
.service('recipesState', function () {
    this.selectedCategory = null;
    this.selectedRecipe = null;
});

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
angular.module('owmApp')
    .directive('navigation', navigation);
function navigation() {
    return {
        restrict: 'E',
        templateUrl: '/common/directives/navigation/navigation.view.html',
        controller: 'navigationCtrl',
        controllerAs: 'vm'
    };
}