(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowMulti', function () {
        var controller = ['$scope', '$log', '$state', 'ShareDataService', function ($scope, $log, $state, ShareDataService) {
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			$scope.cityDetails = $scope.city;
			$scope.bookFlight = function(booked){
				var bookDetails = [];
				bookDetails.push(booked);
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					bookDetails: bookDetails
	            }, 'bookDetails');
				console.log(ShareDataService.getSharedData().bookDetails);
				$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/flightRowMulti.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"=",
				city:"="
            }
        }
    });
}());