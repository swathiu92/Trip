(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightRoundTrip', function () {
        var controller = ['$scope', '$state', 'flightService', '$log', function ($scope, $state, flightService, $log) {
            $scope.leftMargin = -50;
            $scope.departing = "Depating On";
            $scope.returning = "Returing On";
			$scope.city = {};

            $scope.search = function () {
                flightService.mode = 2
				console.log($scope.city);
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
