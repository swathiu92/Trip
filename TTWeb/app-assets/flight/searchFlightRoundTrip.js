(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightRoundTrip', function () {
        var controller = ['$scope', '$state', 'flightService', 'ShareDataService', '$log', function ($scope, $state, flightService, ShareDataService, $log) {
            $scope.leftMargin = -50;
            $scope.departing = "Depating On";
            $scope.returning = "Returing On";
			$scope.city = {};

            $scope.search = function () {
                flightService.mode = 2
				ShareDataService.setSharedData({
					city: $scope.city
	            }, 'city');
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/searchflightroundtrip.html',
            controller: controller,
        }
    });
}());
