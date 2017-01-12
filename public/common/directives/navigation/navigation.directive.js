 angular.module('owmApp')
.directive('navigation', navigation);
function navigation () {
    return {
        restrict: 'E',
        templateUrl: '/common/directives/navigation/navigation.view.html',
        controller: 'navigationCtrl',
        controllerAs: 'navvm'
    };
  }