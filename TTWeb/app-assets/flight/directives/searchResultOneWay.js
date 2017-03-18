(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultOneWay', ['$log', searchResultOneWay]);
    function searchResultOneWay() {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.travelDetails = ShareDataService.getSharedData().city;
            flightService.getAirlines().then(function(data) {
			 angular.forEach(data.oneway, function(value, key){
				 var duration = data.oneway[key].duration;
				if(duration < 60){
					data.oneway[key].duration = (duration) + 'm';        
				}
				else if(duration%60==0){
					data.oneway[key].duration = (duration-duration%60)/60 + 'h';        
				}
				else{
					 data.oneway[key].duration = ((duration-duration%60)/60 + 'h' + ' ' + duration%60 + 'm');
				}
			 });
			 $scope.results = data;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/searchResultOneway.html',
            controller: controller,
        }
    };
}());
