var model = {
    recipes: [],
}

var owmApp = angular.module("owmApp", ["customFilters", "cart", "ngRoute"])
.config(function($routeProvider){
    $routeProvider.when("/recipes/:param", {
        templateUrl: "/views/recipes/:param.html"
    });

    $routeProvider.when("/recipes", {
        templateUrl: "/views/recipeList.html"
    });

    $routeProvider.otherwise({
        templateUrl: "/views/recipeList.html"
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
