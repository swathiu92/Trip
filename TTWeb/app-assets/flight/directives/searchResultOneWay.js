(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultOneWay', ['$log', searchResultOneWay]);
    function searchResultOneWay() {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.searchmodel = ShareDataService.getSharedData().searchmodel;
			$scope.searchmodel.totalFares = 0;
            flightService.getAirlines().then(function(data) {
			 $scope.searchmodel.fares = data.travel.fares;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.searchmodel.totalFares = $scope.searchmodel.totalFares + parseInt(value.price);
			 });
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
			scope:{
				searchDataModel:"="
			},
            templateUrl: 'app-assets/flight/views/searchResultOneway.html',
            controller: controller,
        }
    };
}());
