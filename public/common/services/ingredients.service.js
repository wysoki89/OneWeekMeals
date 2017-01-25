angular.module("owmApp")
.service('ingredientsService', function ($http, $httpParamSerializerJQLike, $location, cartService) {
    var that = this;
    var ingredients = [];
    this.addIngredient = function(recipe){
            _.each(recipe.ingredients, ingredient=> { 
			      var isNew = true;
                  _.each(ingredients, function(result){
                    if(result.name === ingredient.name){
				        result.amount += ingredient.amount;
                        isNew = false;
                    }
                  });
                  if(isNew){
                    ingredients.push(ingredient);
                    }
            });
    };
    this.removeIngredient = function(name){
            _.each(ingredients, (item,index) =>{
                if(name === item.name){
                    ingredients.splice(index,1);
                }
            });
    };
    this.getIngredients = function(){
        return ingredients;
    };
   
    this.orderIngredients = function(data){
    $http({
         method: 'POST',
         url: '/orderIngredients',
         data: $httpParamSerializerJQLike(data),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     })
     .then(function(response){
         cartService.getProducts().length = 0;
         that.getIngredients().length = 0;
     },function(error){
         console.log(error);
        })
        .finally(function(){
         $location.path("/orderCompleted");
      });
    }
});
