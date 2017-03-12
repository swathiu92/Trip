(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlight', ['$log', searchFlight]);
    function searchFlight($log) {
        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.travelType = 1;
            $scope.onChange = function (value) {
               
            }
        }];

        return {
            restrict: 'E',
            scope: {
                locationss: "=",
            },
            templateUrl: 'app-assets/flight/searchflight.html',
            controller: controller,
        }
    };
}());