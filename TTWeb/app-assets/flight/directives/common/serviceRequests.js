(function() {
    "use strict";
    angular.module("common.services")
        .directive('serviceRequests', function() {
            var controller = ['$scope', 'flightService', function($scope, flightService) {
                flightService.getMeals().then(function(data) {
                    $scope.mealList = data;
                }, function(rejection) {});
                flightService.getBaggages().then(function(data) {
                    $scope.baggageList = data;
                }, function(rejection) {});
                $scope.addMeals = function() {
                    $scope.itinerary.travelInfo.meals = [];
                    $scope.itinerary.travelInfo.mealsPrice = 0;
                    angular.forEach($scope.itinerary.travelInfo.mealDetails, function(value) {
                        (value) ? ($scope.itinerary.travelInfo.meals.push(value)) : "";
                        if (value) {
                            $scope.itinerary.travelInfo.mealsPrice = $scope.itinerary.travelInfo.mealsPrice + parseInt(value.price);
                        }
                    });
                    $scope.itinerary.travelInfo.totalExtraPrice = parseInt($scope.itinerary.travelInfo.mealsPrice) + parseInt($scope.itinerary.travelInfo.baggagePrice);
                    $scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travelInfo.totalTravellerPrice + $scope.itinerary.travelInfo.totalFares + $scope.itinerary.travelInfo.totalExtraPrice;
                };
                $scope.unselectOther = function(id) {
                    $scope.itinerary.travelInfo.baggagePrice = 0;
                    angular.forEach($scope.itinerary.travelInfo.baggageDetails, function(value, key) {
                        if (id !== Number(key)) {
                            $scope.itinerary.travelInfo.baggageDetails[key] = false;
                        }
                        $scope.itinerary.travelInfo.baggage = "";
                        if ($scope.itinerary.travelInfo.baggageDetails[key]) {
                            $scope.itinerary.travelInfo.baggage = $scope.itinerary.travelInfo.baggageDetails[key];
                            $scope.itinerary.travelInfo.baggagePrice = $scope.itinerary.travelInfo.baggage.price;
                        }
                        $scope.itinerary.travelInfo.totalExtraPrice = parseInt($scope.itinerary.travelInfo.mealsPrice) + parseInt($scope.itinerary.travelInfo.baggagePrice);
                        $scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travelInfo.totalTravellerPrice + $scope.itinerary.travelInfo.totalFares + $scope.itinerary.travelInfo.totalExtraPrice;
                    });
                };
            }];

            return {
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/common/serviceRequests.html',
                controller: controller,
                scope: {
                    itinerary: "="
                }
            }
        });
}());