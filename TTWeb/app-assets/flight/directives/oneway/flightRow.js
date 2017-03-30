(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRow', function () {
        var controller = ['$scope', '$log', '$state', 'ShareDataService', function ($scope, $log, $state, ShareDataService) {
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			console.log($scope.itinerary);
			$scope.bookFlight = function(booked){
				booked.from = $scope.itinerary.itineraryDetails.from;
				booked.to = $scope.itinerary.itineraryDetails.to;
				$scope.itinerary.bookDetails = [];
				$scope.itinerary.bookDetails.push(booked);
				$scope.itinerary.localObj.showContainer ='review';
				/* ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel'); */
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
				$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/oneway/flightrow.html',
            controller: controller,
			scope: {
                data: "=",
				itinerary:"=",
				sortby: "=",
				sorted:"="
            }
        }
    });
}());
