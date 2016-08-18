/**
 * Tworzę ten service abyś miał stan appki w jednym miejscu, on będzie komunikował między kontrolerami.
 */
angular.module("owmApp")
    .service("recipesService", function(cart){
        this.addRecipe = function addRecipe(){
            //tutaj powinnienes tak naprawde pracowac z cartem i miec metody, jak juz go uzyles w tym serwisie
            //a w kontrolerze je wywoływać z recipesService a nie cart
        }

        this.removeRecipe = function removeRecipe(){
            //tak samo...
        }

        this.getRecipies = function getRecipies(){
            //tak samo...
        }

        /**
         * Gównokod ale działa.
         */
        this.getIngredients = function getIngredients() {
            return _.transform(cart.getProducts(), function(result, product) {
               _.each(product.ingredients, function(ingredient) {
                   if(_.isObject(ingredient)){
                        result[ingredient.product] = result.hasOwnProperty(ingredient.product)
                            ? (result[ingredient.product] + ingredient.amount)*product.count
                            : result[ingredient.product] = ingredient.amount*product.count; 
                   }else{
                       result[ingredient] = parseInt(ingredient)
                   }
               });
            }, {})
        }
    })
