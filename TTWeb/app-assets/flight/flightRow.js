(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRow', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/flightrow.html',
            controller: controller,
        }
    });
}());
