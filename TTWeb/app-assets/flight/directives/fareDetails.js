(function() {
    "use strict";
    angular.module("common.services")
        .directive('fareDetails', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'ShareDataService', function($scope, $state, $filter, $timeout, $log, ShareDataService) {
				$scope.status = {openBase: false, openFare: false, openExtra: false};
				$scope.popover= {isMealsOpen: false, isBaggageOpen: false};
				$scope.removeMeal = function(index){
					$scope.searchmodel.meals.splice(index, 1);
					$scope.popover.isMealsOpen = false;
				};
				$scope.removeBaggage = function(index){
					$scope.searchmodel.baggage = "";
					$scope.popover.isBaggageOpen = false;
				};
			
            }];

            return {
                scope: {
					searchmodel : "="
				},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/fareDetails.html',
                controller: controller,
            }
        });
}());