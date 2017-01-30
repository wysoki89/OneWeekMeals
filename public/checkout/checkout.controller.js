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