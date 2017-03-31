(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlight', ['$log', searchFlight]);
    function searchFlight($log) {
        var controller = ['$scope','CONSTANTS', function ($scope, CONSTANTS) {
            $scope.searchmodel.travelType = $scope.searchmodel.travelType?$scope.searchmodel.travelType:"oneway";
			$scope.itinerary = $scope.searchmodel[$scope.searchmodel.travelType];
			var data = ["oneway", "roundtrip", "multi"];
            $scope.tripChanged = function (value) {
				angular.forEach(CONSTANTS.travelTypes,function(value){
					if(value === $scope.searchmodel.travelType) {
						$scope.itinerary = $scope.searchmodel[$scope.searchmodel.travelType];
					} else {
						$scope.searchmodel[value] = angular.copy(CONSTANTS.searchmodel[value])
					}
				});
            }
        }];

        return {
            restrict: 'E',
            scope: {
				searchmodel: "="
            },
            templateUrl: 'app-assets/flight/views/common/searchflight.html',
            controller: controller,
        }
    };
}());