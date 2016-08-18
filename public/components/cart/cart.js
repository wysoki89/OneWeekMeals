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
                if(item._id = _id){
                    cartData.splice(index,1);
                }
            })
        },
        getProducts:function(){
            return cartData;
        }
    }
})
.directive("ingredientsSummary", function(cart){
    return{
        restrict: "E",
          templateUrl: "components/cart/ingredientsSummary.html",
        controller: function ($scope){
            var cartData = cart.getProducts();

            $scope.total = function(){
                var total = [];
                angular.forEach(cartData, item =>{
                    total.push(item.ingredients)
                })
                return total;
            }

            $scope.itemCount = function(){
                var total = 0;
                angular.forEach(cartData, item =>{
                    total += item.count;
                })
                return total;
            }
        }
    }
})