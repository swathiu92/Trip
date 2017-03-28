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
			console.log($scope.searchmodel);
			$scope.searchmodel.cities = [];
			$scope.bookFlight = function(booked){
				booked.from = $scope.searchmodel.from;
				booked.to = $scope.searchmodel.to;
				$scope.searchmodel.bookDetails = [];
				$scope.searchmodel.bookDetails.push(booked);
				$scope.searchmodel.showContainer ='review';
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
				$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/flightrow.html',
            controller: controller,
			scope: {
                data: "=",
				searchmodel:"=",
				sortby: "=",
				sorted:"="
            }
        }
    });
}());
