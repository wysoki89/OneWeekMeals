angular.module("cart", [])
    .directive("cartSummary", function (cartService) {
        return {
            restrict: "E",
            templateUrl: "cart/cartSummary.view.html",
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
                var cartData = cartService.getProducts();
                /**
                 * counts number of dishes in cart
                 * 
                 * @function dishCount
                 */
                vm.dishCount = function () {
                    var total = { breakfastSupper: 0, lunch: 0, dessert: 0 };
                    angular.forEach(cartData, item => {
                        if ((item.tags.indexOf("Śniadanie") >= 0) || (item.tags.indexOf("Kolacja") >= 0)) {
                            item.dish = "Śniadanie/Kolacja";
                            total.breakfastSupper += item.count;
                        }
                        else if (item.tags.indexOf("Obiad") >= 0) {
                            item.dish = "Obiad";
                            total.lunch += item.count;
                        }
                        else if (item.tags.indexOf("Deser") >= 0) {
                            item.dish = "Deser";
                            total.dessert += item.count;
                        }
                    });
                    return total;
                };
            }
        };
    })