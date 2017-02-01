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
