(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultRoundTrip', function () {
        var controller = ['$scope', '$log', '$uibModal', '$interval', 'flightService','ShareDataService', function ($scope, $log, $uibModal, $interval, flightService, ShareDataService) {
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
			$scope.results = {};
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.itinerary = ShareDataService.getSharedData().itinerary;
			flightService.getRoundTripAirlines().then(function(data) {
			 $scope.itinerary.travelInfo.fares = data.travel.fares;
			 //$scope.itinerary.travelDetails = data.travel;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.itinerary.travelInfo.totalFares = $scope.itinerary.travelInfo.totalFares + parseInt(value.price);
			 });
			 angular.forEach(data.itinerary.origin, function(value, key){
				 var duration = data.itinerary.origin[key].duration;
				if(duration < 60){
					data.itinerary.origin[key].duration = (duration) + 'm';        
				}
				else if(duration%60==0){
					data.itinerary.origin[key].duration = (duration-duration%60)/60 + 'h';        
				}
				else{
					 data.itinerary.origin[key].duration = ((duration-duration%60)/60 + 'h' + ' ' + duration%60 + 'm');
				}
			 });
			 angular.forEach(data.itinerary.destination, function(value, key){
				 var duration = data.itinerary.destination[key].duration;
				if(duration < 60){
					data.itinerary.destination[key].duration = (duration) + 'm';        
				}
				else if(duration%60==0){
					data.itinerary.destination[key].duration = (duration-duration%60)/60 + 'h';        
				}
				else{
					 data.itinerary.destination[key].duration = ((duration-duration%60)/60 + 'h' + ' ' + duration%60 + 'm');
				}
			 });
			 $scope.results.origin = data.itinerary.origin;
			 $scope.results.destination = data.itinerary.destination;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
			scope:{
				searchDataModel:"="
			},
            templateUrl: 'app-assets/flight/views/roundtrip/searchresultroundtrip.html',
            controller: controller,
        }
    });
}());
