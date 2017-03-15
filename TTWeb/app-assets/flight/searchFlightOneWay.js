(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightOneWay', function () {
        var controller = ['$scope', '$state', 'flightService','ShareDataService', '$log', function ($scope, $state, flightService, ShareDataService, $log) {
            $scope.displayText = "Departing On";
            $scope.leftMargin = -50;
			$scope.city = {};
			$scope.dateTime = {};
            $scope.search = function () {
				$scope.city.departure = $scope.dateTime;
                flightService.mode = 1;
				$scope.submitted = true;
				ShareDataService.setSharedData({
					city: $scope.city
	            }, 'city');
				if($scope.city.from && $scope.city.to && ($scope.city.adult || $scope.city.infant || $scope.city.child) && $scope.dateTime){
					$state.go('searchflight');
				}
            }
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/searchflightoneway.html',
            controller: controller,
        }
    });
}());
