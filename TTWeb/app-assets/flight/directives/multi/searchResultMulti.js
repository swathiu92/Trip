(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultMulti', ['$log', searchResultMulti]);
    function searchResultMulti() {
        var controller = ['$scope', '$log', '$state', '$uibModal', '$interval', 'flightService','ShareDataService', function ($scope, $log, $state, $uibModal, $interval, flightService, ShareDataService) {
			$scope.showLoader = function() {
				var modalInstance;
				modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'loader.html',
					backdrop: 'static',
					controller: function($scope, $timeout, $uibModalInstance) {
						var count  = 10;
						$scope.progressValue = 0;
						var interval = $interval(function (index) {
							if ($scope.progressValue < 100) {
								$scope.progressValue = count + 10;
								count = count +10;
							} else {
							  $uibModalInstance.close();
							  $interval.cancel(interval);
							}
						}, 500);
					},
					size: 'md'
				});
			};
			$scope.showLoader();
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.itinerary = ShareDataService.getSharedData().itinerary;
			$scope.itinerary.travelInfo.totalFares = 0;
			$scope.itinerary.localObj.currentCity = $scope.itinerary.itineraryDetails.cities[0];
			$scope.itinerary.localObj.bookFlight = function(){
				$scope.itinerary.bookDetails = [];
				var selectedFlights = ShareDataService.getSharedData().selectedFlights;
				angular.forEach(selectedFlights, function(value, key){
					$scope.itinerary.bookDetails.push(value.booked);
				});
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
