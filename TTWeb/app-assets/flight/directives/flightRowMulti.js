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
			$scope.travelDetails = ShareDataService.getSharedData().travelDetails;
			$scope.bookFlight = function(booked, index){
				$scope.travelDetails.bookDetails = [];
				for(var i=0; i<$scope.travelDetails.cities.length;i++){
					$scope.travelDetails.bookDetails.push(booked);
				}	
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					travelDetails: $scope.travelDetails
	            }, 'travelDetails');
				console.log($scope.travelDetails);
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
				city:"=",
				cities:"="
            }
        }
    });
}());