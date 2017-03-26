(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlight', ['$log', searchFlight]);
    function searchFlight($log) {
        var controller = ['$scope', '$log','CONSTANTS', function ($scope, $log, CONSTANTS) {
            $scope.searchmodel.travelType = $scope.searchmodel.travelType?$scope.searchmodel.travelType:1;
            $scope.tripChanged = function (value) {
			   $scope.searchmodel = angular.copy(CONSTANTS.searchmodel);
			   $scope.searchmodel.travelType = value;
            }
        }];

        return {
            restrict: 'E',
            scope: {
				searchmodel: "="
            },
            templateUrl: 'app-assets/flight/views/searchflight.html',
            controller: controller,
        }
    };
}());