﻿(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultRoundTrip', function () {
        var controller = ['$scope', '$log', 'flightService','ShareDataService', function ($scope, $log, flightService, ShareDataService) {
			$scope.results = {};
			$scope.sortby = '';
			$scope.sorted = '';
			$scope.searchmodel = ShareDataService.getSharedData().searchmodel;
			flightService.getAirlines().then(function(data) {
			 $scope.searchmodel.fares = data.travel.fares;
			 $scope.searchmodel.travelDetails = data.travel;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.searchmodel.totalFares = $scope.searchmodel.totalFares + parseInt(value.price);
			 });
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
			scope:{
				searchDataModel:"="
			},
            templateUrl: 'app-assets/flight/views/searchresultroundtrip.html',
            controller: controller,
        }
    });
}());
