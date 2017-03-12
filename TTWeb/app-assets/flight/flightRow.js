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
			$scope.bookFlight = function(booked){
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					booked: booked
	            }, 'booked');
				console.log(ShareDataService.getSharedData().booked);
				$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/flightrow.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"="
            }
        }
    });
}());
