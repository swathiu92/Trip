(function() {
    "use strict";
    angular.module("common.services")
        .directive('topBar', function() {
            var controller = ['$scope', function($scope) {
                $scope.selectedCity = function(city) {
                    $scope.itinerary.localObj.currentCity = city;
                };
				$scope.viewDetails = function(city){
					angular.forEach($scope.itinerary.localObj.selectedFlights, function(value){
						if(value.id === city.id) {
							$scope.itinerary.localObj.viewDetails = value.booked;
							$scope.itinerary.localObj.viewDetails.viewFare = (parseInt(value.booked.adultprice) * $scope.itinerary.travellerDetails.adult) + (parseInt(value.booked.childprice) * $scope.itinerary.travellerDetails.child) + (parseInt(value.booked.infantprice) * $scope.itinerary.travellerDetails.infant);
						}
					});
				};
            }];
            return {
                restrict: 'E',
                scope: {
                    itinerary: "=",
                    type: "@"
                },
                templateUrl: 'app-assets/flight/views/common/topBar.html',
                controller: controller,
            }
        });
}());