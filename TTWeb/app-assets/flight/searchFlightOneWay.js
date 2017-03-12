(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightOneWay', function () {
        var controller = ['$scope', '$state', 'flightService', '$log', function ($scope, $state, flightService, $log) {
            $scope.displayText = "Departing On";
            $scope.leftMargin = -50;
			$scope.city = {};

            $scope.search = function () {
                flightService.mode = 1;
				$scope.submitted = true;
				console.log($scope.city);
				if($scope.city.from && $scope.city.to){
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
