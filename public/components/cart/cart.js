angular.module("cart",[])
.factory("cart", function(){
    var cartData = [];
    return {
        addProduct: function(recipe){
            var addedToExistingItem = false;
            angular.forEach(cartData, (item,index) => {
                if(item._id === recipe._id){
                    item.count++;
                    addedToExistingItem = true;
                }
            })
            if (!addedToExistingItem){
                recipe.count = 1;
                cartData.push(recipe)
                
            }
        },
        removeProduct: function(id){
            angular.forEach(cartData, (item,index) =>{
                if(item._id === id){
                    cartData.splice(index,1);
                }
            })
        },
        getProducts:function(){
            return cartData;
        }
    }
})
.directive("cartSummary", function(cart){
    return{
        restrict: "E",
          templateUrl: "components/cart/cartSummary.html",
          controller: function ($scope){
            var cartData = cart.getProducts();

            $scope.total = function(){
                var total = [];
                angular.forEach(cartData, item =>{
                    total.push(item.ingredients)
                })
                return total;
            }
            $scope.dishCount = function(){
                var total = {breakfastSupper:0, lunch:0, dessert:0};
                angular.forEach(cartData, item =>{
                    if((item.tags.indexOf("Śniadanie") >= 0) || (item.tags.indexOf("Kolacja") >= 0)){
                        item.dish = "Śniadanie/Kolacja"
                        total.breakfastSupper += item.count;
                    }
                    else if(item.tags.indexOf("Obiad")>= 0){
                        item.dish = "Obiad"
                        total.lunch += item.count;
                    }
                    else if(item.tags.indexOf("Deser") >= 0){
                        item.dish = "Deser"
                        total.dessert += item.count;
                    }
                })
                    return total;
            }
        }
    }
})