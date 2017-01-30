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
