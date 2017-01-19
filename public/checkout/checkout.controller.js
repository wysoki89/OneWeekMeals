angular.module("owmApp")
.controller("checkoutCtrl", checkoutCtrl);
checkoutCtrl.$inject = ['cartService'];
function checkoutCtrl(cartService){
        var vm = this;
        vm.cartData = cartService.getProducts();
        vm.remove = function(id){
            cartService.removeProduct(id);
        };
}