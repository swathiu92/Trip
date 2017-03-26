(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowMulti', function () {
        var controller = ['$scope', '$log', '$state', 'flightService', 'ShareDataService', function ($scope, $log, $state, flightService, ShareDataService) {
			var allBooked = false, selectedFlights = [];
			$scope.itenary = [];
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			flightService.getAirlines().then(function(data) {
			 $scope.searchmodel.fares = data.travel.fares;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.searchmodel.totalFares = $scope.searchmodel.totalFares + parseInt(value.price);
			 });
			 angular.forEach($scope.searchmodel.cities,function(value, key){
				 $scope.itenary[value.id] = angular.copy(data);
			 });
			 console.log($scope.itenary0);
          }, function(rejection) {
          });
			$scope.selectFlight = function(booked, index){
				selectedFlights.push(booked);
				angular.forEach($scope.data.oneway, function(value, key){
					if(key === index) {
						$scope.itenary[$scope.searchmodel.currentCity.id].oneway[key].selected = true;
					} else {
						$scope.itenary[$scope.searchmodel.currentCity.id].oneway[key].selected = false;
					}
				});
				angular.forEach($scope.searchmodel.cities, function(value, key){
					if(value.from.name === $scope.searchmodel.currentCity.from.name) {
						$scope.searchmodel.cities[key].booked = true;
					}
				});
			};
			$scope.bookFlight = function(booked, index){
				$scope.searchmodel.bookDetails = [];
				$scope.searchmodel.showContainer ='review';
				//for(var i=0; i<$scope.searchmodel.cities.length;i++){
					$scope.searchmodel.bookDetails = selectedFlights;
				//}	
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
				var selectedCity = true;
				allBooked = true;
				angular.forEach($scope.searchmodel.cities, function(value, key){
					if(!value.booked && selectedCity) {
						allBooked = false;
						selectedCity = false;
						$scope.searchmodel.currentCity = $scope.searchmodel.cities[key];
					}
				});
				if(allBooked) {
					$state.go('flightdetails');
				}
				console.log($scope.searchmodel);
				//$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/flightRowMulti.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"=",
				searchmodel:"="
            }
        }
    });
}());