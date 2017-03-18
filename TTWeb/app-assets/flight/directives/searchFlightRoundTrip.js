﻿(function () {
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
				$scope.city.from.key = $scope.city.from.name.substring(0, 3);
				$scope.city.to.key = $scope.city.to.name.substring(0, 3);
				ShareDataService.setSharedData({
					city: $scope.city
	            }, 'city');
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/searchflightroundtrip.html',
            controller: controller,
        }
    });
}());
