(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultOneWay', ['$log', searchResultOneWay]);
    function searchResultOneWay() {
        var controller = ['$scope', '$log', 'flightService', function ($scope, $log, flightService) {
			$scope.sortby = '';
			$scope.sorted = '';
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
				console.log(data.oneway[key].duration);
			 });
			 $scope.results = data;
          }, function(rejection) {
          });
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/searchResultOneway.html',
            controller: controller,
        }
    };
}());
