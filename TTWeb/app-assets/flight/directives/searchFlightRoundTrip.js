(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightRoundTrip', function () {
        var controller = ['$scope', '$state', 'flightService', 'ShareDataService', '$log', function ($scope, $state, flightService, ShareDataService, $log) {
            $scope.leftMargin = -50;
            $scope.departing = "Depating On";
            $scope.returning = "Returing On";
			//$scope.searchmodel = {};

            $scope.search = function () {
                flightService.mode = 2
				$scope.searchmodel.from.key = $scope.searchmodel.from.name.substring(0, 3);
				$scope.searchmodel.to.key = $scope.searchmodel.to.name.substring(0, 3);
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
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
