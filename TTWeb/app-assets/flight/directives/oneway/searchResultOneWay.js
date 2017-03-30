(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultOneWay', ['$log', searchResultOneWay]);
    function searchResultOneWay() {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.itinerary = ShareDataService.getSharedData().itinerary;
			//$scope.itinerary.totalFares = 0;
            flightService.getOneWayAirlines().then(function(data) {
			 $scope.itinerary.travelInfo.fares = data.travel.fares;
			 //$scope.itinerary.travelDetails = data.travel;
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
