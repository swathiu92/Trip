(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultMulti', ['$log', searchResultMulti]);
    function searchResultMulti() {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.cityDetails = ShareDataService.getSharedData().cities;
			$scope.city = $scope.cityDetails[0];
			$scope.selectedCity = function(city){
				$scope.city = city;
			};
			angular.forEach($scope.cityDetails, function(value, key){
			      $scope.cityDetails[key].from.key = $scope.cityDetails[key].from.name.substring(0, 3);
			      $scope.cityDetails[key].to.key = $scope.cityDetails[key].to.name.substring(0, 3);
			 });
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
