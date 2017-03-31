(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultOneWay', ['$log', searchResultOneWay]);
    function searchResultOneWay() {
        var controller = ['$scope', '$log', '$uibModal', '$timeout', '$interval', 'flightService','ShareDataService', function ($scope, $log, $uibModal, $timeout, $interval, flightService, ShareDataService) {
			$scope.showLoader = function() {
				var modalInstance;
				modalInstance = $uibModal.open({
					animation: true,
					backdrop: 'static',
					templateUrl: 'loader.html',
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
            flightService.getOneWayAirlines().then(function(data) {
			 $scope.itinerary.travelInfo.fares = data.travel.fares;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.itinerary.travelInfo.totalFares = $scope.itinerary.travelInfo.totalFares + parseInt(value.price);
			 });
			 angular.forEach(data.itinerary, function(value, key){
				 var duration = data.itinerary[key].duration;
				if(duration < 60){
					data.itinerary[key].duration = (duration) + 'm';        
				}
				else if(duration%60==0){
					data.itinerary[key].duration = (duration-duration%60)/60 + 'h';        
				}
				else{
					 data.itinerary[key].duration = ((duration-duration%60)/60 + 'h' + ' ' + duration%60 + 'm');
				}
			 });
			 $scope.itinerary.localObj.data = data;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/oneway/searchResultOneway.html',
            controller: controller,
        }
    };
}());

