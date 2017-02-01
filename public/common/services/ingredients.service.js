angular.module("owmApp")
    .service('ingredientsService', function ($http, $httpParamSerializerJQLike, $location, cartService) {
        var that = this;
        var ingredients = [];
        /**
         * adds ingredients -> checks if the ingredient is new and increase the amount property
         * 
         * @function addIngredient
         * @param {Object} recipe
         */
        this.addIngredient = function (recipe) {
            _.each(recipe.ingredients, ingredient => {
                var isNew = true;
                _.each(ingredients, function (result) {
                    if (result.name === ingredient.name) {
                        result.amount += ingredient.amount;
                        isNew = false;
                    }
                });
                if (isNew) {
                    ingredients.push(ingredient);
                }
            });
        };
        /**
         * removes ingredient by splicing the array
         * 
         * @function removeIngredient
         * @param {String} name
         */
        this.removeIngredient = function (name) {
            _.each(ingredients, (item, index) => {
                if (name === item.name) {
                    ingredients.splice(index, 1);
                }
            });
        };
        /**
         * returns ingredients
         * 
         * @function getIngredients
         */
        this.getIngredients = function () {
            return ingredients;
        };
        /**
         * sends POST request to orderIngredients
         * 
         * @function orderIngredients
         * @param {Object} data
         */
        this.orderIngredients = function (data) {
            $http({
                method: 'POST',
                url: '/order',
                data: $httpParamSerializerJQLike(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function (response) {
                    cartService.getProducts().length = 0;
                    that.getIngredients().length = 0;
                }, function (error) {
                    console.log(error);
                })
                .finally(function () {
                    $location.path("/orderCompleted");
                });
        }
        /**
         * sends POST request to emailIngredientList
         * 
         * @function emailIngredients
         * @param {String} recipient
         * @param {String} emailBody
         */
        this.emailIngredients = function (recipient, emailBody) {
            $http({
                method: 'POST',
                url: '/email',
                data: $httpParamSerializerJQLike({ to: recipient, emailBody: emailBody }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                cartService.getProducts().length = 0;
                that.getIngredients().length = 0;
                $location.path("/ingredientsListSent");
            }, function (error) {
                console.log(error)
            })
        }
    });
