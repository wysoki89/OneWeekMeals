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
.controller("ingredientsController", ingredientsController);
ingredientsController.$inject = ['$http', '$httpParamSerializerJQLike', 'ingredients', 'cart', '$location'];
function ingredientsController($http, $httpParamSerializerJQLike, ingredients, cart, $location){
            var vm = this;
            vm.removeIngredient = function(name){
                ingredients.removeIngredient(name);
            }
            vm.ingredientsData = ingredients.getIngredients();
            vm.emailIngredientList = function (recipient){
                vm.emailFormSubmitted = true;
                var emailBody = function(){
                    var tbody = document.createElement("tbody");
                    var style = '<style>table{border-collapse: collapse;}table, th, tr, td{border:1px solid black;padding: 5px;}</style>'
                    _.each(vm.ingredientsData, ingredient=> {
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
                    data: $httpParamSerializerJQLike({to:recipient, list: vm.ingredientsData, emailBody:emailBody()}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    cart.getProducts().length = 0;
                    ingredients.getIngredients().length = 0;
                }, function(error){
                    vm.emailSendingError = error;
                 }).finally(function(){
                    $location.path("/ingredientsListSent")
                 });
            }
            vm.orderIngredients = function(shippingDetails){
                var data = {};
                data.shippingDetails = shippingDetails;
                data.ingredients = angular.copy(ingredients.getIngredients());
                vm.orderFormSubmitted = true;
                $http({
                    method: 'POST',
                    url: '/orderIngredients',
                    data: $httpParamSerializerJQLike(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    cart.getProducts().length = 0;
                    ingredients.getIngredients().length = 0;
                }, function(error){
                    vm.orderError = error;
                 })
                 .finally(function(){
                    $location.path("/orderCompleted")
                 });
            }
            vm.myDate = new Date();
            vm.minDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth(),
                vm.myDate.getDate()+1
            );
            vm.maxDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth(),
                vm.myDate.getDate()+20
            );
}
