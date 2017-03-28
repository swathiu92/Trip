(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowMulti', function () {
        var controller = ['$scope', '$log', '$state', 'flightService', 'ShareDataService', function ($scope, $log, $state, flightService, ShareDataService) {
			var allBooked = false
			$scope.searchmodel.localObj.itenary = $scope.searchmodel.localObj.itenary?$scope.searchmodel.localObj.itenary:[];
			$scope.searchmodel.localObj.allBooked = $scope.searchmodel.localObj.allBooked?$scope.searchmodel.localObj.allBooked:false;
			$scope.searchmodel.localObj.selectedFlights = $scope.searchmodel.localObj.selectedFlights?$scope.searchmodel.localObj.selectedFlights:[];
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
				if(!$scope.searchmodel.localObj.itenary[value.id]) {
					$scope.searchmodel.localObj.itenary[value.id] = angular.copy(data);
				}	
			 });
          }, function(rejection) {
          });
			$scope.selectFlight = function(booked, index){
				var select = $scope.searchmodel.localObj.selectedFlights.findIndex(x => x.id === $scope.searchmodel.currentCity.id);
				if(select === -1){
					$scope.searchmodel.localObj.selectedFlights.push({id:$scope.searchmodel.currentCity.id, booked:booked});
				} else {
					$scope.searchmodel.localObj.selectedFlights[select].booked = booked;
				}
				//selectedFlights.push({id:index, booked:booked});
				ShareDataService.setSharedData({
					selectedFlights: $scope.searchmodel.localObj.selectedFlights
	            }, 'selectedFlights');
				angular.forEach($scope.data.oneway, function(value, key){
					if(key === index) {
						$scope.searchmodel.localObj.itenary[$scope.searchmodel.currentCity.id].oneway[key].selected = true;
					} else {
						$scope.searchmodel.localObj.itenary[$scope.searchmodel.currentCity.id].oneway[key].selected = false;
					}
				});
				angular.forEach($scope.searchmodel.cities, function(value, key){
					if((value.from.name === $scope.searchmodel.currentCity.from.name) && (value.to.name === $scope.searchmodel.currentCity.to.name)) {
						$scope.searchmodel.cities[key].booked = true;
					}
				});
				var booked = $scope.searchmodel.cities.findIndex(x => x.booked === undefined);
				$scope.searchmodel.localObj.allBooked = (booked===-1)?true:false;
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