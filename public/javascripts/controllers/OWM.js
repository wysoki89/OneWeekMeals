var model = {}

var owmApp = angular.module("owmApp", ["customFilters", "cart", "ngRoute", "ngMaterial", "ngMessages", "datePicker"])
.config(function($routeProvider){
    $routeProvider.when("/recipes/:param", {
        templateUrl: "/views/recipes/:param.html"
    });
    $routeProvider.when("/recipes", {
        templateUrl: "/views/recipeList.html"
    });
    $routeProvider.when("/checkout", {
        templateUrl: "/views/checkoutSummary.html"
    });
    $routeProvider.when("/ingredients", {
        templateUrl: "/views/ingredientsSummary.html"
    });
    $routeProvider.when("/ingredientsListSent", {
        templateUrl: "/views/ingredientsListSent.html"
    });
    $routeProvider.when("/placeOrder", {
        templateUrl: "/views/placeOrder.html"
    });
    $routeProvider.when("/orderCompleted", {
        templateUrl: "/views/orderCompleted.html"
    });
    $routeProvider.when("/login", {
        templateUrl: "/views/auth/login/login.html",
        controller: 'loginCtrl'
    });
    $routeProvider.when("/adminLogin", {
        templateUrl: "/views/adminLogin.html"
    });
    $routeProvider.when("/register1", {
        templateUrl: "/views/register1.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/recipes"
    })
})

.run(function($http){
    $http.get("/getRecipes")
        .success(function(data){
            model.recipes = data;
        })
        .error(function(data){
            model.error = error;
        })
})
.controller('owmCtrl', function owmApp($scope, $http, $httpParamSerializerJQLike){
    $scope.data = model,
    $scope.categories = [
        {parent: "Posiłki", children: ["Śniadanie", "Obiad", "Kolacja"]}, 
        {parent: "Składniki", children: ["Jajka", "Mięso", "Makaron"]},
    ]
    $scope.addNewRecipe = function(item){
        var newRecipe = item;
        $scope.data.recipes.push(newRecipe);
        $http({
            method: 'POST',
            url: '/addRecipe',
            data: $httpParamSerializerJQLike(newRecipe),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }
    $scope.days = ["Poniedziałek","Wtorek", "Środa", "Czwartek", "Piątek"]
})
