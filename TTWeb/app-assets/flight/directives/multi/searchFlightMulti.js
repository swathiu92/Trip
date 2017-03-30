(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightMulti', ["flightService", "$log", searchFlightMulti]);
    function searchFlightMulti() {
        var controller = ['$scope', '$state', 'flightService', 'ShareDataService', '$log', function ($scope, $state, flightService, ShareDataService, $log) {
            $scope.departing = "DEPARTING ON";
            $scope.leftMargin2 = 0;
            $scope.citiCount = 1;
			//$scope.city = {};
			//$scope.itinerary.itineraryDetails.cities = $scope.itinerary.itineraryDetails.cities?$scope.itinerary.itineraryDetails.cities:[];
			//$scope.cities = new Array();
            if($scope.itinerary.itineraryDetails.cities.length === 0){
				$scope.itinerary.itineraryDetails.cities.push({
						id: 0,
						from: '',
						to: '',
						departure: '',
						showRemove: true
					});
			}
            $scope.addCity = function () {
                if ($scope.citiCount > 4)
                    return;
                //hide remove button of previous city
                var index = $scope.citiCount - 2;//array is zero based, 1 item is statically added
                if (index >= 0) {
                    if (!angular.isUndefined($scope.itinerary.itineraryDetails.cities[index]))
                        $scope.itinerary.itineraryDetails.cities[index].showRemove = false;
                }
                $scope.itinerary.itineraryDetails.cities.push({
                    id: $scope.citiCount,
					from: '',
                    to: '',
                    departure: '',
                    showRemove: true
                });

                $scope.citiCount += 1;
            };
            $scope.removeCity = function (city) {
                $log.info($scope.citiCount);
                if ($scope.citiCount < 1)
                    return;
                //show remove button of previous city
                var index = $scope.citiCount - 3;//array is zero based, 1st item is statically added, cann't be removed
                if (!angular.isUndefined($scope.itinerary.itineraryDetails.cities[index]))
                    $scope.itinerary.itineraryDetails.cities[index].showRemove = true;
                $scope.itinerary.itineraryDetails.cities.splice($scope.itinerary.itineraryDetails.cities.indexOf(city), 1);
                $scope.citiCount -= 1;
            };

            $scope.search = function () {
				//$scope.itinerary.itineraryDetails.cities = $scope.cities;
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
                /*ShareDataService.setSharedData({
					cities: $scope.cities
	            }, 'cities');*/
				console.log($scope.itinerary);
				flightService.mode = 3;
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
			scope:{
				itinerary: "="
			},
            templateUrl: 'app-assets/flight/views/multi/searchflightmulti.html',
            controller: controller,
        }
    };
}());
