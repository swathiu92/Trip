(function() {
    "use strict";
    angular.module("common.services")
        .directive('fareDetails', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'ShareDataService', function($scope, $state, $filter, $timeout, $log, ShareDataService) {
				$scope.status = {openBase: false, openFare: false, openExtra: false};
				$scope.popover= {isMealsOpen: false, isBaggageOpen: false};
				$scope.removeMeal = function(index, meal){
					$scope.itinerary.travelInfo.meals.splice(index, 1);
					$scope.itinerary.travelInfo.mealsPrice = $scope.itinerary.travelInfo.mealsPrice - meal.price;
					$scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travelInfo.totalTravellerPrice + $scope.itinerary.travelInfo.totalExtraPrice;
					$scope.itinerary.travelInfo.mealDetails[index] = false;
					$scope.popover.isMealsOpen = false;
				};
				$scope.removeBaggage = function(){
					$scope.itinerary.travelInfo.baggage = "";
					$scope.itinerary.travelInfo.baggagePrice = 0;
					$scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travelInfo.totalTravellerPrice + $scope.itinerary.travelInfo.totalExtraPrice;
					$scope.popover.isBaggageOpen = false;
					angular.forEach($scope.itinerary.travelInfo.baggageDetails, function(value, key) {
                            $scope.itinerary.travelInfo.baggageDetails[key] = false;
                    });
				};
			
            }];

            return {
                scope: {
					itinerary : "="
				},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/common/fareDetails.html',
                controller: controller,
            }
        });
}());