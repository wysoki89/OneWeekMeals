angular.module('customFilters', [])
    // .filter("unique", function(){
    //     return function(data, propertyName, property){
    //         if(angular.isArray(data) && angular.isString(property) && angular.isString(propertyName)){
    //             var results = [];
    //             angular.forEach(data, function(item, index){
    //                 if (item[propertyName] === property){
    //                 results.push(item);
    //                 }
    //             })
    //             return results;
    //         } else {
    //             return data
    //         } 
    //     }
    // })
    .filter("range", function(){
        return function(data, page, size){
            if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
                var start_index = (page-1)*size;
                if (data.length < start_index) {
                    return [];
                } 
                else {
                    return data.splice(start_index, size);
                }

            }
            else{
                return data;
            }
        }
    })
    .filter("pageCount", function(){
        return function(data, size){
            if(angular.isArray(data)){
                var results = [];
                for (var i = 0; i < Math.ceil(data.length/size); i++){
                    results.push(i)
                }
                return results
            }
            else{
                return data;
            }
        }
    })