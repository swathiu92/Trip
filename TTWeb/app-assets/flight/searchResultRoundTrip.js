(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultRoundTrip', function () {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.results = {};
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.cityDetails = ShareDataService.getSharedData().city;
			flightService.getAirlines().then(function(data) {
			 angular.forEach(data.round.origin, function(value, key){
				 var duration = data.round.origin[key].duration;
				if(duration < 60){
					data.round.origin[key].duration = (duration) + 'm';        
				}
				else if(duration%60==0){
					data.round.origin[key].duration = (duration-duration%60)/60 + 'h';        
				}
				else{
					 data.round.origin[key].duration = ((duration-duration%60)/60 + 'h' + ' ' + duration%60 + 'm');
				}
			 });
			 angular.forEach(data.round.destination, function(value, key){
				 var duration = data.round.destination[key].duration;
				if(duration < 60){
					data.round.destination[key].duration = (duration) + 'm';        
				}
				else if(duration%60==0){
					data.round.destination[key].duration = (duration-duration%60)/60 + 'h';        
				}
				else{
					 data.round.destination[key].duration = ((duration-duration%60)/60 + 'h' + ' ' + duration%60 + 'm');
				}
			 });
			 $scope.results.origin = data.round.origin;
			 $scope.results.destination = data.round.destination;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/searchresultroundtrip.html',
            controller: controller,
        }
    });
}());
