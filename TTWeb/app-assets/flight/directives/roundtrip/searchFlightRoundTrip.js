(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightRoundTrip', function () {
        var controller = ['$scope', '$state', 'flightService', 'ShareDataService', '$log','$filter', function ($scope, $state, flightService, ShareDataService, $log, $filter) {
            $scope.leftMargin = -50;
            $scope.departing = "Depating On";
            $scope.returning = "Returing On";
			var months = ShareDataService.getSharedData().months;
			var days = ShareDataService.getSharedData().days;
            $scope.search = function () {
                flightService.mode = 2
				$scope.itinerary.itineraryDetails.from.key = $scope.itinerary.itineraryDetails.from.name.substring(0, 3);
				$scope.itinerary.itineraryDetails.to.key = $scope.itinerary.itineraryDetails.to.name.substring(0, 3);
				$scope.itinerary.localObj.departureDetails = $filter("dateSplit")($scope.itinerary.itineraryDetails.departure, "yyyy");
				$scope.itinerary.localObj.arrivalDetails = $filter("dateSplit")($scope.itinerary.itineraryDetails.arrival, "yyyy");
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
			scope:{
				itinerary: "="
			},
            templateUrl: 'app-assets/flight/views/roundtrip/searchflightroundtrip.html',
            controller: controller,
        }
    });
}());
