(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowMulti', function () {
        var controller = ['$scope', '$log', '$state', 'flightService', 'ShareDataService', function ($scope, $log, $state, flightService, ShareDataService) {
			var allBooked = false
			$scope.itinerary.localObj.selectedItinerary = $scope.itinerary.localObj.selectedItinerary?$scope.itinerary.localObj.selectedItinerary:[];
			$scope.itinerary.localObj.allBooked = $scope.itinerary.localObj.allBooked?$scope.itinerary.localObj.allBooked:false;
			$scope.itinerary.localObj.selectedFlights = $scope.itinerary.localObj.selectedFlights?$scope.itinerary.localObj.selectedFlights:[];
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			flightService.getMultiAirlines().then(function(data) {
			 $scope.itinerary.fares = data.travel.fares;
			 angular.forEach(data.travel.fares, function(value, key){
				 $scope.itinerary.travelInfo.totalFares = $scope.itinerary.travelInfo.totalFares + parseInt(value.price);
			 });
			 angular.forEach($scope.itinerary.itineraryDetails.cities,function(value, key){
				if(!$scope.itinerary.localObj.selectedItinerary[value.id]) {
					$scope.itinerary.localObj.selectedItinerary[value.id] = angular.copy(data);
				}	
			 });
          }, function(rejection) {
          });
			$scope.selectFlight = function(booked, index){
				var select = $scope.itinerary.localObj.selectedFlights.findIndex(x => x.id === $scope.itinerary.localObj.currentCity.id);
				if(select === -1){
					$scope.itinerary.localObj.selectedFlights.push({id:$scope.itinerary.localObj.currentCity.id, booked:booked});
				} else {
					$scope.itinerary.localObj.selectedFlights[select].booked = booked;
				}
				//selectedFlights.push({id:index, booked:booked});
				ShareDataService.setSharedData({
					selectedFlights: $scope.itinerary.localObj.selectedFlights
	            }, 'selectedFlights');
				angular.forEach($scope.data.itinerary, function(value, key){
					if(key === index) {
						$scope.itinerary.localObj.selectedItinerary[$scope.itinerary.localObj.currentCity.id].itinerary[key].selected = true;
					} else {
						$scope.itinerary.localObj.selectedItinerary[$scope.itinerary.localObj.currentCity.id].itinerary[key].selected = false;
					}
				});
				angular.forEach($scope.itinerary.itineraryDetails.cities, function(value, key){
					$scope.itinerary.itineraryDetails.cities[key].from.key = $scope.itinerary.itineraryDetails.cities[key].from.name.substring(0, 3);
					$scope.itinerary.itineraryDetails.cities[key].to.key = $scope.itinerary.itineraryDetails.cities[key].to.name.substring(0, 3);
					if((value.from.name === $scope.itinerary.localObj.currentCity.from.name) && (value.to.name === $scope.itinerary.localObj.currentCity.to.name)) {
						$scope.itinerary.itineraryDetails.cities[key].booked = true;
					}
				});
				var booked = $scope.itinerary.itineraryDetails.cities.findIndex(x => x.booked === undefined);
				$scope.itinerary.localObj.allBooked = (booked===-1)?true:false;
			};
			$scope.bookFlight = function(booked, index){
				$scope.itinerary.bookDetails = [];
				$scope.itinerary.showContainer ='review';
				//for(var i=0; i<$scope.itinerary.itineraryDetails.cities.length;i++){
					$scope.itinerary.bookDetails = selectedFlights;
				//}	
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
				var selectedCity = true;
				allBooked = true;
				angular.forEach($scope.itinerary.itineraryDetails.cities, function(value, key){
					if(!value.booked && selectedCity) {
						allBooked = false;
						selectedCity = false;
						$scope.itinerary.localObj.currentCity = $scope.itinerary.itineraryDetails.cities[key];
					}
				});
				if(allBooked) {
					$state.go('flightdetails');
				}
				console.log($scope.itinerary);
				//$state.go('flightdetails');
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/multi/flightRowMulti.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"=",
				itinerary:"="
            }
        }
    });
}());