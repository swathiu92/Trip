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
			$scope.travelDetails = ShareDataService.getSharedData().city;
			$scope.bookFlight = function(booked){
				$scope.travelDetails.bookDetails = [];
				$scope.travelDetails.bookDetails.push(booked);
				$scope.travelDetails.showContainer ='review';
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					travelDetails: $scope.travelDetails
	            }, 'travelDetails');
				$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/flightrow.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"="
            }
        }
    });
}());
