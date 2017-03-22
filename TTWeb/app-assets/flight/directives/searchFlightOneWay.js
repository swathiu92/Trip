	(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightOneWay', function () {
        var controller = ['$scope', '$state', '$filter', 'flightService','ShareDataService', '$log', function ($scope, $state, $filter, flightService, ShareDataService, $log) {
            $scope.displayText = "Departing On";
            $scope.leftMargin = -50;
			$scope.city = {};
			$scope.dateTime = {};
			var months = ShareDataService.getSharedData().months;
			var days = ShareDataService.getSharedData().days;
            $scope.search = function () {
                flightService.mode = 1;
				$scope.submitted = true;
				if($scope.searchmodel.from && $scope.searchmodel.to && ($scope.searchmodel.adult || $scope.searchmodel.infant || $scope.searchmodel.child)){
					console.log($scope.searchmodel);
					$scope.searchmodel.from.key = $scope.searchmodel.from.name.substring(0, 3);
					$scope.searchmodel.to.key = $scope.searchmodel.to.name.substring(0, 3);
					$scope.searchmodel.departureDate = ($scope.searchmodel.departure)?($scope.searchmodel.departure.getDate()):"";
					$scope.searchmodel.departureMonth = ($scope.searchmodel.departure)?(months[$scope.searchmodel.departure.getMonth()]):"";
					$scope.searchmodel.departureDay = ($scope.searchmodel.departure)?(days[$scope.searchmodel.departure.getDay()]):"";
					$scope.searchmodel.departureYear = $filter("date")($scope.searchmodel.departure, "yy");
					console.log($scope.searchmodel.departureDate);
					ShareDataService.setSharedData({
						searchmodel: $scope.searchmodel
					}, 'searchmodel'); 
					$state.go('searchflight');
				}
            }
        }];

        return {
            restrict: 'E',
			scope:{
				searchmodel: "="
			},
            templateUrl: 'app-assets/flight/views/searchflightoneway.html',
            controller: controller,
        }
    });
}());
