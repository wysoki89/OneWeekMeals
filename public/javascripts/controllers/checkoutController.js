angular.module("owmApp")
.controller("cartSummaryController", function($scope, cart){
        $scope.cartData = cart.getProducts();
        $scope.remove = function(id){
            cart.removeProduct(id)
        }
        // angular.forEach(cartData, item =>{
        //     if(item.tags.indexOf("Śniadanie/Kolacja")){
        //         item.dish = "Śniadanie/Kolacja"
        //     }
        //     else if(item.tags.indexOf(["Obiad"])){
        //         item.dish = "Obiad"
        //     }
        //     else if(item.tags.indexOf(["Deser"])){
        //         item.dish = "Deser"
        //     } 
        // })
})