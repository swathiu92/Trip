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
				$scope.searchmodel.departure = $scope.dateTime;
                flightService.mode = 1;
				$scope.submitted = true;
				if($scope.searchmodel.from && $scope.searchmodel.to && ($scope.searchmodel.adult || $scope.searchmodel.infant || $scope.searchmodel.child) && $scope.dateTime){
					$scope.searchmodel.from.key = $scope.searchmodel.from.name.substring(0, 3);
					$scope.searchmodel.to.key = $scope.searchmodel.to.name.substring(0, 3);
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
