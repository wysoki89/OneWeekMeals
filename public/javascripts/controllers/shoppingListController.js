angular.module("owmApp")
    .controller("shoppingListController", function($scope, cart){
        $scope.cartData = cart.getProducts();
        $scope.ingredients = function(){
            var results = [];
            angular.forEach($scope.cartData, recipe => {
                // var isAdded = false;
                angular.forEach(recipe.ingredients, ingredient=>{
                    // angular.forEach(results, result => {
                    //     if (ingredient.product === result.product){
                    //         console.log(ingredient.product);
                    //         result.amount += ingredient.amount;
                    //         isAdded = true;
                    //     }
                    // })
                    // var duplicateNames = _.filter(results, ['product', ingredient.product]);
                    // console.log(duplicateNames[0]) 
                    // if(duplicateNames.length > 0){
                    //     console.log("duplicate")
                    //     _.filter(results, ['name', ingredient.name])[0].amount += ingredient.amount;                        
                    // }
                    // else{
                        // if (!isAdded){
                            console.log("amount: " + ingredient.amount);
                            console.log("count: " + recipe.count)
                            ingredient.amount = ingredient.amount * recipe.count;
                            results.push(ingredient);
                        // }
                    // }
                })
            })
            // angular.forEach(results, result => {
            //     var duplicateNames = _.filter(results, ['product', result.product]);
            //     var sum = _.sum(_.map(duplicateNames,"amount"));
            //     // console.log(_.map(duplicateNames,"amount"))
            //     result.amount = sum;
            //     // if (duplicateNames.length > 0){
            //     //     })
            //     // console.log(duplicateNames[0])
            //     results = _.uniqBy(results, "name`")
            // })
            return results;
        }
    })

        // ,
        // {
        //     "amount": "2 łyżki",
        //     "product": "masło"
        // },
        // {
        //     "amount": "80g",
        //     "product": "wędzony łosoś"
        // },
        // {
        //     "amount": "2-3 łyżki",
        //     "product": "szczypiorek"
        // },
        // {
        //     "amount": "szczypta",
        //     "product": "sól morska"
        // },
        // {
        //     "amount": "szczypta",
        //     "product": "czarny pieprz"
        // },
        // {
        //     "amount": "2",
        //     "product": "bułki"
        // }