(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowRound', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/flightrowround.html',
            controller: controller,
        }
    });
}());
