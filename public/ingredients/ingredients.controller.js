angular.module("owmApp")
.controller("ingredientsCtrl", ingredientsCtrl);
ingredientsCtrl.$inject = ['$http', '$httpParamSerializerJQLike', 'ingredientsService', 'cartService', '$location'];
function ingredientsCtrl($http, $httpParamSerializerJQLike, ingredientsService, cartService, $location){
            var vm = this;
            vm.removeIngredient = function(name){
                ingredientsService.removeIngredient(name);
            };
            vm.ingredientsData = ingredientsService.getIngredients();
            vm.emailIngredientList = function (recipient){
                vm.emailFormSubmitted = true;
                var emailBody = function(){
                    var tbody = document.createElement("tbody");
                    var style = '<style>table{border-collapse: collapse;}table, th, tr, td{border:1px solid black;padding: 5px;}</style>';
                    _.each(vm.ingredientsData, ingredient=> {
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(ingredient.product));
                        tr.appendChild(td);
                        td.appendChild(document.createTextNode(ingredient.amount));
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    });
                    return (style+"<table><thead><tr><th>Produkt</th><th>Ilość</th></tr></thead>"+tbody.outerHTML+"</table>");
                };
                $http({
                    method: 'POST',
                    url: '/sendIngredientList',
                    data: $httpParamSerializerJQLike({to:recipient, list: vm.ingredientsData, emailBody:emailBody()}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                    cartService.getProducts().length = 0;
                    ingredientsService.getIngredients().length = 0;
                }, function(error){
                    vm.emailSendingError = error;
                 }).finally(function(){
                    $location.path("/ingredientsListSent");
                 });
            };
            vm.orderIngredients = function(shippingDetails){
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
                vm.myDate.getDate()+1
            );
            vm.maxDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth(),
                vm.myDate.getDate()+20
            );
}
