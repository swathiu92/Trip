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
			//$scope.searchmodel.cities = $scope.searchmodel.cities?$scope.searchmodel.cities:[];
			//$scope.cities = new Array();
            if($scope.searchmodel.cities.length === 0){
				$scope.searchmodel.cities.push({
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
                    if (!angular.isUndefined($scope.searchmodel.cities[index]))
                        $scope.searchmodel.cities[index].showRemove = false;
                }
                $scope.searchmodel.cities.push({
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
                if (!angular.isUndefined($scope.searchmodel.cities[index]))
                    $scope.searchmodel.cities[index].showRemove = true;
                $scope.searchmodel.cities.splice($scope.searchmodel.cities.indexOf(city), 1);
                $scope.citiCount -= 1;
            };

            $scope.search = function () {
				//$scope.searchmodel.cities = $scope.cities;
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
                /*ShareDataService.setSharedData({
					cities: $scope.cities
	            }, 'cities');*/
				console.log($scope.searchmodel);
				flightService.mode = 3;
                $state.go('searchflight');
            }
        }];

        return {
            restrict: 'E',
			scope:{
				searchmodel: "="
			},
            templateUrl: 'app-assets/flight/views/searchflightmulti.html',
            controller: controller,
        }
    };
}());
