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
			//$scope.searchmodel = ShareDataService.getSharedData().searchmodel;
			$scope.bookFlight = function(booked, index){
				$scope.searchmodel.bookDetails = [];
				$scope.searchmodel.showContainer ='review';
				for(var i=0; i<$scope.searchmodel.cities.length;i++){
					$scope.searchmodel.bookDetails.push(booked);
				}	
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
				console.log($scope.searchmodel);
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
				searchmodel:"="
            }
        }
    });
}());