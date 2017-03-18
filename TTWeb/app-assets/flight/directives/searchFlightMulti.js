(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlightMulti', ["flightService", "$log", searchFlightMulti]);
    function searchFlightMulti() {
        var controller = ['$scope', '$state', 'flightService', 'ShareDataService', '$log', function ($scope, $state, flightService, ShareDataService, $log) {
            $scope.departing = "DEPARTING ON";
            $scope.leftMargin2 = 0;
            $scope.citiCount = 1;
			$scope.city = {};
            $scope.cities = new Array();
            $scope.addCity = function () {
                if ($scope.citiCount > 4)
                    return;
                //hide remove button of previous city
                var index = $scope.citiCount - 2;//array is zero based, 1 item is statically added
                if (index >= 0) {
                    if (!angular.isUndefined($scope.cities[index]))
                        $scope.cities[index].showRemove = false;
                }
                $scope.cities.push({
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
                if (!angular.isUndefined($scope.cities[index]))
                    $scope.cities[index].showRemove = true;
                $scope.cities.splice($scope.cities.indexOf(city), 1);
                $scope.citiCount -= 1;
            };

            $scope.search = function () {
				$scope.cities.push($scope.city);
				ShareDataService.setSharedData({
					city: $scope.cities[0]
	            }, 'city');
                ShareDataService.setSharedData({
					cities: $scope.cities
	            }, 'cities');
				flightService.mode = 3;
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/searchflightmulti.html',
            controller: controller,
        }
    };
}());
