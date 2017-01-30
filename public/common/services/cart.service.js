angular.module("owmApp")
    .service('cartService', function () {
        var cartData = [];
        /**
         * add recipe to cart. if it already exists increase property count of the recipe in cartDate
         * 
         * @function addProduct
         * @param {Object} recipe
         */
        this.addProduct = function (recipe) {
            var addedToExistingItem = false;
            angular.forEach(cartData, (item, index) => {
                if (item._id === recipe._id) {
                    item.count++;
                    addedToExistingItem = true;
                }
            });
            if (!addedToExistingItem) {
                recipe.count = 1;
                cartData.push(recipe);
            }
        };
        /**
         * removes product from cart
         * 
         * @function removeProduct
         * @param {String} id
         */
        this.removeProduct = function (id) {
            angular.forEach(cartData, (item, index) => {
                if (item._id === id) {
                    cartData.splice(index, 1);
                }
            });
        };
        /**
         * returns products from the cart
         * 
         * @function getProducts
         */
        this.getProducts = function () {
            return cartData;
        }
    });