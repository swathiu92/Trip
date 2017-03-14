(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowRound', function () {
        var controller = ['$scope', '$log', 'ShareDataService', function ($scope, $log, ShareDataService) {
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			$scope.cityDetails = ShareDataService.getSharedData().city;
			$scope.bookFlight = function(booked){
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					booked: booked
	            }, 'booked');
				$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/flightrowround.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"=",
				status: '@'
            }
        }
    });
}());
