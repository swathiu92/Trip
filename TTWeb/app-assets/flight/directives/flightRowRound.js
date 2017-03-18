(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowRound', function () {
        var controller = ['$scope', '$log', '$state', 'ShareDataService', function ($scope, $log, $state, ShareDataService) {
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			$scope.sorting1 = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			$scope.travelDetails = ShareDataService.getSharedData().city;
			$scope.flightSelected = function(details, status, index){
				$scope.travelDetails.bookDetails = [];
				$scope.travelDetails.bookDetails.push(details);
				$scope.travelDetails.bookDetails.push($scope.data[status][index]);
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
            templateUrl: 'app-assets/flight/views/flightrowround.html',
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
