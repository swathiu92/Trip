(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultMulti', ['$log', searchResultMulti]);
    function searchResultMulti() {
        var controller = ['$scope', '$log', '$state', 'flightService','ShareDataService', function ($scope, $log, $state, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.itinerary = ShareDataService.getSharedData().itinerary;
			$scope.itinerary.totalFares = 0;
			$scope.itinerary.localObj.currentCity = $scope.itinerary.itineraryDetails.cities[0];
			$scope.selectedCity = function(city){
				$scope.itinerary.localObj.currentCity = city;
			};
			$scope.bookFlight = function(){
				/*ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');*/
				$scope.itinerary.bookDetails = [];
				var selectedFlights = ShareDataService.getSharedData().selectedFlights;
				angular.forEach(selectedFlights, function(value, key){
					$scope.itinerary.bookDetails.push(value.booked);
				});
				//$scope.itinerary.bookDetails = ShareDataService.getSharedData().selectedFlights;
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
				$scope.itinerary.localObj.showContainer ='review';
				($scope.itinerary.localObj.allBooked)?$state.go('flightdetails'):"";
			};
			angular.forEach($scope.itinerary.itineraryDetails.cities, function(value, key){
			      $scope.itinerary.itineraryDetails.cities[key].from.key = $scope.itinerary.itineraryDetails.cities[key].from.name.substring(0, 3);
			      $scope.itinerary.itineraryDetails.cities[key].to.key = $scope.itinerary.itineraryDetails.cities[key].to.name.substring(0, 3);
			 });
			 ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
            flightService.getMultiAirlines().then(function(data) {
			 $scope.itinerary.travelInfo.fares = data.travel.fares;
			 //$scope.itinerary.travelDetails = data.travel;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.itinerary.travelInfo.totalFares = $scope.itinerary.travelInfo.totalFares + parseInt(value.price);
			 });
			 $scope.results = data;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/multi/searchResultMulti.html',
            controller: controller,
        }
    };
}());
