angular.module("owmApp")
.controller("cartSummaryController", cartSummaryController);
cartSummaryController.$inject = ['cart']
function cartSummaryController(cart){
        var vm = this;
        vm.cartData = cart.getProducts();
        vm.remove = function(id){
            cart.removeProduct(id)
        }
}