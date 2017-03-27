(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultMulti', ['$log', searchResultMulti]);
    function searchResultMulti() {
        var controller = ['$scope', '$log', '$state', 'flightService','ShareDataService', function ($scope, $log, $state, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.searchmodel = ShareDataService.getSharedData().searchmodel;
			$scope.searchmodel.totalFares = 0;
			$scope.searchmodel.currentCity = $scope.searchmodel.cities[0];
			$scope.selectedCity = function(city){
				$scope.searchmodel.currentCity = city;
			};
			$scope.bookFlight = function(){
				/*ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');*/
				$scope.searchmodel.bookDetails = [];
				var selectedFlights = ShareDataService.getSharedData().selectedFlights;
				angular.forEach(selectedFlights, function(value, key){
					$scope.searchmodel.bookDetails.push(value.booked);
				});
				//$scope.searchmodel.bookDetails = ShareDataService.getSharedData().selectedFlights;
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
				$scope.searchmodel.showContainer ='review';
				($scope.searchmodel.localObj.allBooked)?$state.go('flightdetails'):"";
			};
			angular.forEach($scope.searchmodel.cities, function(value, key){
			      $scope.searchmodel.cities[key].from.key = $scope.searchmodel.cities[key].from.name.substring(0, 3);
			      $scope.searchmodel.cities[key].to.key = $scope.searchmodel.cities[key].to.name.substring(0, 3);
			 });
			 ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
            flightService.getAirlines().then(function(data) {
			 $scope.searchmodel.fares = data.travel.fares;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.searchmodel.totalFares = $scope.searchmodel.totalFares + parseInt(value.price);
			 });
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
