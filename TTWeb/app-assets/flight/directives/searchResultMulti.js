(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultMulti', ['$log', searchResultMulti]);
    function searchResultMulti() {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.travelDetails = ShareDataService.getSharedData().travelDetails;
			$scope.city = $scope.travelDetails.cities[0];
			$scope.selectedCity = function(city){
				$scope.city = city;
			};
			angular.forEach($scope.travelDetails.cities, function(value, key){
			      $scope.travelDetails.cities[key].from.key = $scope.travelDetails.cities[key].from.name.substring(0, 3);
			      $scope.travelDetails.cities[key].to.key = $scope.travelDetails.cities[key].to.name.substring(0, 3);
			 });
			 ShareDataService.setSharedData({
					travelDetails: $scope.travelDetails
	            }, 'travelDetails');
            flightService.getAirlines().then(function(data) {
			 $scope.results = data;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/searchResultMulti.html',
            controller: controller,
        }
    };
}());
