angular.module("owmApp")
.factory("ingredients", function(){
    var ingredients = [];
    return {
        addIngredient: function(recipe){
            _.each(recipe.ingredients, ingredient=> { 
			      var isNew = true;
                  _.each(ingredients, function(result){
                    if(result.product === ingredient.product){
				        result.amount += ingredient.amount;
                        isNew = false;
                    }
                  })
                  if(isNew){
                    ingredients.push(ingredient)
                    }
            })
        },
        removeIngredient: function(name){
            _.each(ingredients, (item,index) =>{
                if(name === item.product){
                    ingredients.splice(index,1);
                }
            })
        },
        getIngredients:function(){
            return ingredients;
        }
    }
})
.controller("ingredientsSummaryController", function ($scope, $http, $httpParamSerializerJQLike, ingredients, cart, $location){
            $scope.removeIngredient = function(name){
                ingredients.removeIngredient(name);
            }
            $scope.ingredientsData = ingredients.getIngredients();
            $scope.emailIngredientList = function (){
                var form = this;
                $scope.emailFormSubmitted = true;
                var emailBody = function(){
                    var tbody = document.createElement("tbody");
                    var style = '<style>table{border-collapse: collapse;}table, th, tr, td{border:1px solid black;padding: 5px;}</style>'
                    _.each($scope.ingredientsData, ingredient=> {
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(ingredient.product));
                        tr.appendChild(td);
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(ingredient.amount));
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    })
                    return (style+"<table><thead><tr><th>Produkt</th><th>Ilość</th></tr></thead>"+tbody.outerHTML+"</table>");
                }
                $http({
                    method: 'POST',
                    url: '/sendIngredientList',
                    data: $httpParamSerializerJQLike({to:form.recipient, list: $scope.ingredientsData, emailBody:emailBody()}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    cart.getProducts().length = 0;
                    ingredients.getIngredients().length = 0;
                }, function(error){
                    $scope.emailSendingError = error;
                 }).finally(function(){
                    $location.path("/ingredientsListSent")
                 });
            }
            $scope.orderIngredients = function(){
                var data = {};
                data.shippingDetails = this.shippingDetails;
                data.ingredients = angular.copy(ingredients.getIngredients());
                $scope.orderFormSubmitted = true;
                $http({
                    method: 'POST',
                    url: '/orderIngredients',
                    data: $httpParamSerializerJQLike(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    cart.getProducts().length = 0;
                    ingredients.getIngredients().length = 0;
                }, function(error){
                    $scope.orderError = error;
                 })
                 .finally(function(){
                    $location.path("/orderCompleted")
                 });
                
            }
            $scope.myDate = new Date();
            $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth(),
                $scope.myDate.getDate()+1
            );
            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth(),
                $scope.myDate.getDate()+20
            );
})
