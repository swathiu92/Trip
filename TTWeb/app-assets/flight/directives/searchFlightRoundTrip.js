(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightRoundTrip', function () {
        var controller = ['$scope', '$state', 'flightService', 'ShareDataService', '$log','$filter', function ($scope, $state, flightService, ShareDataService, $log, $filter) {
            $scope.leftMargin = -50;
            $scope.departing = "Depating On";
            $scope.returning = "Returing On";
			var months = ShareDataService.getSharedData().months;
			var days = ShareDataService.getSharedData().days;
            $scope.search = function () {
                flightService.mode = 2
				$scope.searchmodel.from.key = $scope.searchmodel.from.name.substring(0, 3);
				$scope.searchmodel.to.key = $scope.searchmodel.to.name.substring(0, 3);
				$scope.searchmodel.departureDate = ($scope.searchmodel.departure)?($scope.searchmodel.departure.getDate()):"";
				$scope.searchmodel.departureMonth = ($scope.searchmodel.departure)?(months[$scope.searchmodel.departure.getMonth()]):"";
				$scope.searchmodel.departureDay = ($scope.searchmodel.departure)?(days[$scope.searchmodel.departure.getDay()]):"";
				$scope.searchmodel.departureYear = $filter("date")($scope.searchmodel.departure, "yy");
				$scope.searchmodel.arrivalDate = ($scope.searchmodel.arrival)?($scope.searchmodel.arrival.getDate()):"";
				$scope.searchmodel.arrivalMonth = ($scope.searchmodel.arrival)?(months[$scope.searchmodel.arrival.getMonth()]):"";
				$scope.searchmodel.arrivalDay = ($scope.searchmodel.arrival)?(days[$scope.searchmodel.arrival.getDay()]):"";
				$scope.searchmodel.arrivalYear = $filter("date")($scope.searchmodel.arrival, "yy");
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
			scope:{
				searchmodel: "="
			},
            templateUrl: 'app-assets/flight/views/searchflightroundtrip.html',
            controller: controller,
        }
    });
}());
