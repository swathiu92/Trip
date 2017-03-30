	(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightOneWay', function () {
        var controller = ['$scope', '$state', '$filter', 'flightService','ShareDataService', '$log', function ($scope, $state, $filter, flightService, ShareDataService, $log) {
            $scope.displayText = "Departing On";
            $scope.leftMargin = -50;
			$scope.city = {};
			$scope.dateTime = {};
			var months = ShareDataService.getSharedData().months;
			var days = ShareDataService.getSharedData().days;
            $scope.search = function () {
                flightService.mode = 1;
				$scope.submitted = true;
				if($scope.itinerary.itineraryDetails.from && $scope.itinerary.itineraryDetails.to){
					console.log($scope.itinerary);
					$scope.itinerary.itineraryDetails.from.key = $filter('substringFilter')($scope.itinerary.itineraryDetails.from.name);
					$scope.itinerary.itineraryDetails.to.key = $filter('substringFilter')($scope.itinerary.itineraryDetails.to.name);
					$scope.itinerary.localObj.departureDetails = $filter("dateSplit")($scope.itinerary.itineraryDetails.departure, "yy");
					console.log("hey",$scope.itinerary.localObj.departureDetails);
					ShareDataService.setSharedData({
						itinerary: $scope.itinerary
					}, 'itinerary'); 
					$state.go('searchflight');
				}
            }
        }];

        return {
            restrict: 'E',
			scope:{
				itinerary: "="
			},
            templateUrl: 'app-assets/flight/views/oneway/searchflightoneway.html',
            controller: controller,
        }
    });
}());
